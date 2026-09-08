"""Extract licensed range colors using a reviewed, global map registration.

Authoring tool only; production builds use committed GeoJSON and need no GIS
runtime. Requires numpy, opencv-python-headless, pyproj and shapely.
"""
import argparse
import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from pyproj import Proj
from shapely import make_valid
from shapely.affinity import translate
from shapely.geometry import Polygon, MultiPolygon, box, mapping, shape
from shapely.ops import unary_union


def polygon_parts(geometry):
    if geometry.geom_type == 'Polygon':
        yield geometry
    elif hasattr(geometry, 'geoms'):
        for child in geometry.geoms:
            yield from polygon_parts(child)


def vectorize(image_path, registration, colors):
    raw = cv2.imread(str(image_path))
    if raw is None:
        raise ValueError('Cannot decode reference image')
    height, width = raw.shape[:2]
    if (width, height) != (registration['image_width'], registration['image_height']):
        raise ValueError('Registration dimensions do not match the source')
    image = cv2.cvtColor(raw, cv2.COLOR_BGR2RGB)
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV).astype(np.int16)
    mask = np.zeros((height, width), np.uint8)
    for color in colors:
        rgb = np.array([[[int(color[i:i+2], 16) for i in (1, 3, 5)]]], dtype=np.uint8)
        hue = int(cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)[0, 0, 0])
        distance = np.abs(hsv[:, :, 0] - hue)
        distance = np.minimum(distance, 180 - distance)
        # Captions often describe the category with a slightly different RGB
        # swatch. Hue classification retains those solid printed blue/green
        # areas while excluding the pale basemap and tentative pale-green fill.
        mask |= ((distance <= 16) & (hsv[:, :, 1] >= 90) & (hsv[:, :, 2] >= 55)).astype(np.uint8)
    # Explicitly reviewed cartographic annotations (legends and arrows), in
    # source-image pixels. These rectangles never redefine geographic ranges.
    for left, top, right, bottom in registration.get('excluded_pixel_rectangles', []):
        mask[top:bottom, left:right] = 0
    thin_blue_radius = registration.get('thin_blue_radius', 0)
    if thin_blue_radius:
        # Gyrfalcon source: blue winter bands and dashed vagrancy annotations
        # share a color. Keep the three substantial winter bands; remove only
        # the separately reviewed thin blue annotation components.
        blue = ((hsv[:, :, 0] >= 95) & (hsv[:, :, 0] <= 115) &
                (hsv[:, :, 1] >= 90) & (hsv[:, :, 2] >= 55)).astype(np.uint8)
        radius = cv2.distanceTransform(blue, cv2.DIST_L2, 5)
        count, labels = cv2.connectedComponents(blue)
        for component in range(1, count):
            pixels = labels == component
            if radius[pixels].max() <= thin_blue_radius:
                mask[pixels] = 0
    # Rejoin the hairline white country borders overprinted on the source.
    # This is a documented, sub-pixel-at-card-size generalization, not new range.
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    minimum_radius = registration.get('minimum_component_radius', 0)
    if minimum_radius:
        radii = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
        count, labels = cv2.connectedComponents(mask)
        for component in range(1, count):
            pixels = labels == component
            if radii[pixels].max() <= minimum_radius:
                mask[pixels] = 0
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    if hierarchy is None:
        raise ValueError('No reference range colors found')
    projection = Proj(registration['proj_string'])
    sx, sy, tx, ty = registration['pixel_transform_native']

    def coordinates(contour):
        pixels = cv2.approxPolyDP(contour, 0.45, True).reshape(-1, 2).astype(float)
        x, y = (pixels[:, 0] - tx) / sx, (pixels[:, 1] - ty) / sy
        if '+proj=robin' in registration['proj_string']:
            # Robinson is linear in longitude at each latitude. Invert without
            # PROJ's +/-180 cutoff, then split the unwrapped geographic result.
            central = float(projection.crs.to_dict().get('lon_0', 0))
            _, lat = projection(np.zeros_like(x), y, inverse=True)
            unit, _ = projection(np.full_like(lat, central + 1), lat)
            lon = x / unit + central
        else:
            lon, lat = projection(x, y, inverse=True)
        lon = np.degrees(np.unwrap(np.radians(lon)))
        ring = np.column_stack([lon, lat])
        if not np.isfinite(ring).all() or np.abs(ring[:, 1]).max() > 90:
            raise ValueError('Contour lies outside the inverse projection')
        return ring

    pieces = []
    world = box(-180, -90, 180, 90)
    for i, contour in enumerate(contours):
        if hierarchy[0, i, 3] != -1 or cv2.contourArea(contour) < 4:
            continue
        outer = coordinates(contour)
        if len(outer) < 3:
            continue
        holes = []
        child = hierarchy[0, i, 2]
        while child != -1:
            if cv2.contourArea(contours[child]) >= 4:
                hole = coordinates(contours[child])
                # Put holes into the same unwrapped longitude interval.
                hole[:, 0] += round((outer[:, 0].mean() - hole[:, 0].mean()) / 360) * 360
                if len(hole) >= 3:
                    holes.append(hole)
            child = hierarchy[0, child, 0]
        geometry = make_valid(Polygon(outer, holes))
        for offset in (-720, -360, 0, 360, 720):
            shifted = translate(geometry, xoff=offset)
            if shifted.intersects(world):
                pieces.extend(polygon_parts(shifted.intersection(world)))
    merged = unary_union(pieces)
    # Documented source errata only: masks are preserved in the registration
    # metadata, so corrections remain explicit and reproducible.
    for exclusion in registration.get('excluded_geographic_geometries', []):
        merged = merged.difference(shape(exclusion))
    polygons = [p for p in polygon_parts(merged) if p.area > 1e-9]
    if not polygons:
        raise ValueError('Empty geographic range after extraction')
    return mapping(MultiPolygon(polygons))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image', required=True)
    parser.add_argument('--registration', required=True)
    parser.add_argument('--id', required=True)
    parser.add_argument('--palette', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    registration = json.loads(Path(args.registration).read_text())[args.id]
    palette = json.loads(Path(args.palette).read_text())[args.id]
    excluded = ('erloschen', 'möglicherweise', 'zugrouten')
    colors = [c['color'] for c in palette['legend'] if not any(word in c['label'].lower() for word in excluded)]
    image_path = Path(args.image)
    feature = {
        'type': 'Feature',
        'properties': {
            'id': args.id,
            'sourceUrl': palette['sourceUrl'],
            'author': palette['author'],
            'license': palette['license'],
            'licenseUrl': palette['licenseUrl'],
            'sourceImageSha256': hashlib.sha256(image_path.read_bytes()).hexdigest(),
            'registration': registration,
            'includedColors': colors,
            'adaptation': 'Inverse map projection; present seasonal range colors combined; 3px border closing; contours simplified by 0.45 source pixels; components below 4 source pixels omitted; split at the antimeridian.',
        },
        'geometry': vectorize(image_path, registration, colors),
    }
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.output).write_text(json.dumps(feature, separators=(',', ':')) + '\n')
    print(args.id, len(feature['geometry']['coordinates']), 'polygons')

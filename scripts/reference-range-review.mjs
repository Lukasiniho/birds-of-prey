import { createHash } from 'node:crypto';
import { geoContains } from 'd3-geo';
import { sphericalGeometry } from './range-geometry.mjs';

const https = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};
const point = (value) =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every(Number.isFinite) &&
  Math.abs(value[0]) <= 180 &&
  Math.abs(value[1]) <= 90;

export function validateReferenceSources(sources) {
  if (!Array.isArray(sources)) throw new Error('Invalid reference allowlist');
  const ids = new Set();
  for (const source of sources) {
    if (!/^[a-z][a-z0-9-]*$/.test(source.id) || ids.has(source.id))
      throw new Error('Invalid or duplicate reference id');
    ids.add(source.id);
    if (
      !source.author?.trim() ||
      !https(source.sourceUrl) ||
      !https(source.licenseUrl) ||
      ![
        'CC BY 2.5',
        'CC BY 3.0',
        'CC BY-SA 2.5',
        'CC BY-SA 3.0',
        'CC BY-SA 4.0',
        'CC0',
        'Public domain',
      ].includes(source.license) ||
      !/^[a-f0-9]{64}$/.test(source.sha256)
    )
      throw new Error(`Missing reference provenance: ${source.id}`);
    if (source.focusBounds !== undefined) {
      const b = source.focusBounds;
      if (
        !Array.isArray(b) ||
        b.length !== 4 ||
        !b.every(Number.isFinite) ||
        b[0] < -180 ||
        b[2] > 180 ||
        b[1] < -90 ||
        b[3] > 90 ||
        b[0] >= b[2] ||
        b[1] >= b[3]
      )
        throw new Error(`Invalid reference focus bounds: ${source.id}`);
    }
    // Small legacy illustrations have discrete source pixels. Permit at most
    // two native pixels for those images, while retaining the 6px/1000px gate
    // for higher-resolution sources. The native width is checked below too.
    const nativeWidth = source.review?.registrationNativeWidth;
    if (
      nativeWidth !== undefined &&
      (!Number.isInteger(nativeWidth) || nativeWidth < 200 || nativeWidth > 500)
    )
      throw new Error(`Invalid reference review resolution: ${source.id}`);
    const registrationLimit =
      nativeWidth === undefined ? 6 : Math.max(6, 2000 / nativeWidth);
    if (
      source.review?.status !== 'approved' ||
      !source.review.notes?.trim() ||
      !Number.isFinite(source.review.registrationErrorPx1000) ||
      source.review.registrationErrorPx1000 > registrationLimit ||
      !['inside', 'outside'].every(
        (key) =>
          Array.isArray(source.review[key]) &&
          source.review[key].length &&
          source.review[key].every(point),
      )
    )
      throw new Error(`Missing reference review: ${source.id}`);
  }
}

export function validateReferenceFeature(source, raw) {
  if (createHash('sha256').update(raw).digest('hex') !== source.sha256)
    throw new Error(`Reference geometry changed: ${source.id}`);
  const feature = JSON.parse(raw.toString());
  if (
    source.review.registrationNativeWidth !== undefined &&
    feature.properties?.registration?.image_width !==
      source.review.registrationNativeWidth
  )
    throw new Error(`Reference registration resolution mismatch: ${source.id}`);
  if (
    feature.type !== 'Feature' ||
    feature.properties?.id !== source.id ||
    (feature.properties?.sourceUrl ?? feature.properties?.source) !==
      source.sourceUrl ||
    feature.properties?.license !== source.license
  )
    throw new Error(`Reference source mismatch: ${source.id}`);
  const geometry = feature.geometry;
  if (!geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type))
    throw new Error(`Invalid reference geometry: ${source.id}`);
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  if (
    !polygons.length ||
    !polygons.every(
      (rings) =>
        rings.length &&
        rings.every(
          (ring) =>
            ring.length >= 4 &&
            ring.every(
              (p) =>
                p.length >= 2 &&
                p.every(Number.isFinite) &&
                Math.abs(p[0]) <= 180 &&
                Math.abs(p[1]) <= 90,
            ) &&
            ring[0][0] === ring.at(-1)[0] &&
            ring[0][1] === ring.at(-1)[1],
        ),
    )
  )
    throw new Error(`Invalid reference coordinates: ${source.id}`);
  const normalized = sphericalGeometry(geometry);
  for (const [key, expected] of [
    ['inside', true],
    ['outside', false],
  ]) {
    for (const point of source.review[key]) {
      if (geoContains(normalized, point) !== expected)
        throw new Error(
          `Reference point ${key} failed: ${source.id} at ${point}`,
        );
    }
  }
  return normalized;
}

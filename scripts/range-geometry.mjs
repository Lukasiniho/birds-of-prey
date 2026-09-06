// Normalize planar GeoJSON winding for D3's spherical polygon convention.
// Preserve coordinates, topology, holes, and rings enclosing over a hemisphere.
export function sphericalGeometry(geometry) {
  if (!['Polygon', 'MultiPolygon'].includes(geometry.type))
    throw new Error('A range must be polygonal');
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return {
    type: 'MultiPolygon',
    coordinates: polygons.map((rings) =>
      rings.map((ring, index) => {
        let signedArea = 0;
        for (let i = 0; i < ring.length - 1; i++) {
          signedArea +=
            ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
        }
        const reverse = index === 0 ? signedArea > 0 : signedArea < 0;
        return reverse ? [...ring].reverse() : ring;
      }),
    ),
  };
}

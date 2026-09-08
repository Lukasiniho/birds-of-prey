import { geoNaturalEarth1, geoPath } from 'd3-geo';

// One coordinate system for the shared basemap and every range source.
export const mapDrawing = geoPath(
  geoNaturalEarth1().fitExtent(
    [
      [14, 14],
      [986, 526],
    ],
    { type: 'Sphere' },
  ),
).digits(2);

export function projectRange(geometry, focus) {
  const path = mapDrawing(geometry);
  // Optional camera bounds never alter or clip the underlying range.
  const framing = focus
    ? {
        type: 'MultiPoint',
        coordinates: Array.from({ length: 101 }, (_, i) => {
          const lon = focus[0] + ((focus[2] - focus[0]) * i) / 100;
          const lat = focus[1] + ((focus[3] - focus[1]) * i) / 100;
          return [
            [lon, focus[1]],
            [lon, focus[3]],
            [focus[0], lat],
            [focus[2], lat],
          ];
        }).flat(),
      }
    : geometry;
  const [[left, top], [right, bottom]] = mapDrawing.bounds(framing);
  if (!path || ![left, top, right, bottom].every(Number.isFinite))
    throw new Error('Invalid projected range');
  const width = Math.min(
    1000,
    Math.max(
      focus ? 80 : 260,
      (right - left) * 1.18,
      (bottom - top) * 1.18 * 1.85,
    ),
  );
  const height = Math.min(540, width / 1.85);
  const x = Math.max(0, Math.min(1000 - width, (left + right - width) / 2));
  const y = Math.max(0, Math.min(540 - height, (top + bottom - height) / 2));
  return { path, viewBox: [x, y, width, height].map((n) => +n.toFixed(2)) };
}

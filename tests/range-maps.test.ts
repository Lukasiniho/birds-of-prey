import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
// @ts-expect-error Build-only geometry library has no bundled declarations.
import { geoContains } from 'd3-geo';
import { sphericalGeometry } from '../scripts/range-geometry.mjs';
import { rangeMaps, rangeBasemapUrl } from '../lib/range-maps.ts';

void test('the published range retains expected North American coverage, not its spherical complement', () => {
  const raw = JSON.parse(
    readFileSync('data/ranges/rotschwanzbussard.geojson', 'utf8'),
  );
  const range = sphericalGeometry(raw.geometry);
  assert.equal(raw.properties.name, 'Buteo jamaicensis');
  for (const point of [
    [-110.97, 32.22],
    [-74, 41],
    [-100, 40],
  ])
    assert(geoContains(range, point));
  for (const point of [
    [13.4, 52.5],
    [151.2, -33.8],
    [0, -85],
  ])
    assert(!geoContains(range, point));
});

void test('projection winding preserves polygon holes and does not mutate source coordinates', () => {
  const source = {
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10],
        [0, 0],
      ],
      [
        [3, 3],
        [3, 7],
        [7, 7],
        [7, 3],
        [3, 3],
      ],
    ],
  };
  const before = JSON.stringify(source);
  const geometry = sphericalGeometry(source);
  assert(geoContains(geometry, [1, 1]));
  assert(!geoContains(geometry, [5, 5]));
  assert(!geoContains(geometry, [50, 50]));
  assert.equal(JSON.stringify(source), before);
});

void test('only reviewed species ship; all referenced map files have valid hashes and viewport bounds', () => {
  const sources = JSON.parse(readFileSync('data/ranges/sources.json', 'utf8'));
  assert.deepEqual(
    Object.keys(rangeMaps).sort(),
    sources.map((s: { id: string }) => s.id).sort(),
  );
  assert.equal(rangeMaps.wuestenbussard, undefined);
  for (const url of [
    rangeBasemapUrl,
    ...Object.values(rangeMaps).map((r) => r.url),
  ]) {
    const body = readFileSync(`public${url}`);
    const hash = createHash('sha256').update(body).digest('hex').slice(0, 12);
    assert(url.endsWith(`-${hash}.json`));
    const data = JSON.parse(body.toString());
    const [x, y, width, height] = data.viewBox;
    assert(x >= 0 && y >= 0 && width > 0 && height > 0);
    assert(x + width <= 1000.02 && y + height <= 540.02);
    assert(!JSON.stringify(data).includes('NaN'));
  }
});

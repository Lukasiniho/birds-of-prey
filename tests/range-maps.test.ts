import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
// @ts-expect-error Build-only geometry library has no bundled declarations.
import { geoContains } from 'd3-geo';
import { sphericalGeometry } from '../scripts/range-geometry.mjs';
import { rangeMaps, rangeBasemapUrl } from '../lib/range-maps.ts';
import {
  validateRangeSources,
  validateRangeFeature,
} from '../scripts/range-review.mjs';
import {
  createMapLoader,
  parseBasemap,
  parseOverlay,
} from '../lib/range-map-data.ts';

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
  validateRangeSources(sources);
  for (const source of sources) {
    validateRangeFeature(
      source,
      readFileSync(`data/ranges/${source.id}.geojson`),
    );
    const entry = rangeMaps[source.id];
    assert(entry);
    assert.equal(entry.downloadedOn, source.downloadedOn);
    assert.equal(entry.referenceUrl, source.review.referenceUrl);
    assert.equal(entry.modelVersion, source.properties.geomodel_version);
  }
  assert.deepEqual(
    Object.keys(rangeMaps).sort(),
    sources.map((s: { id: string }) => s.id).sort(),
  );
  assert.equal(rangeMaps.wuestenbussard, undefined);
  for (const url of [
    rangeBasemapUrl,
    ...Object.values(rangeMaps).flatMap((r) => (r ? [r.url] : [])),
  ]) {
    const body = readFileSync(`public${url}`);
    const hash = createHash('sha256').update(body).digest('hex').slice(0, 12);
    assert(url.endsWith(`-${hash}.json`));
    const data = JSON.parse(body.toString());
    if (url === rangeBasemapUrl) parseBasemap(data);
    else parseOverlay(data);
    const [x, y, width, height] = data.viewBox;
    assert(x >= 0 && y >= 0 && width > 0 && height > 0);
    assert(x + width <= 1000.02 && y + height <= 540.02);
    assert(!JSON.stringify(data).includes('NaN'));
  }
});

void test('release gate rejects unreviewed, duplicate, changed and misidentified data', () => {
  const [source] = JSON.parse(readFileSync('data/ranges/sources.json', 'utf8'));
  const raw = readFileSync(`data/ranges/${source.id}.geojson`);
  assert.throws(
    () =>
      validateRangeSources([
        { ...source, review: { ...source.review, status: 'pending' } },
      ]),
    /approved review/,
  );
  assert.throws(() => validateRangeSources([source, source]), /duplicate/);
  assert.throws(
    () => validateRangeSources([{ ...source, id: '../unreviewed' }]),
    /Invalid/,
  );
  assert.throws(
    () => validateRangeSources([{ ...source, sha256: '' }]),
    /provenance/,
  );
  assert.throws(
    () => validateRangeFeature(source, Buffer.concat([raw, Buffer.from(' ')])),
    /Source changed/,
  );
  assert.throws(
    () => validateRangeFeature({ ...source, name: 'Wrong species' }, raw),
    /mismatch/,
  );
  assert.throws(
    () =>
      validateRangeFeature(
        { ...source, properties: { geomodel_version: 'new' } },
        raw,
      ),
    /mismatch/,
  );
  assert.throws(
    () =>
      validateRangeFeature(
        { ...source, review: { ...source.review, inside: [[13.4, 52.5]] } },
        raw,
      ),
    /Review point/,
  );
});

void test('invalid polygon coordinates fail even if the checksum is updated', () => {
  const [source] = JSON.parse(readFileSync('data/ranges/sources.json', 'utf8'));
  const feature = JSON.parse(
    readFileSync(`data/ranges/${source.id}.geojson`, 'utf8'),
  );
  feature.geometry = {
    type: 'Polygon',
    coordinates: [
      [
        [0, 0],
        [181, 0],
        [0, 1],
        [0, 0],
      ],
    ],
  };
  const raw = JSON.stringify(feature);
  assert.throws(
    () =>
      validateRangeFeature(
        { ...source, sha256: createHash('sha256').update(raw).digest('hex') },
        raw,
      ),
    /polygon coordinates/,
  );
});

void test('camera bounds cannot wrap or extend beyond geographic coordinates', () => {
  const [source] = JSON.parse(readFileSync('data/ranges/sources.json', 'utf8'));
  validateRangeSources([{ ...source, focusBounds: [-130, 15, -60, 75] }]);
  for (const focusBounds of [
    [170, 10, -170, 60],
    [-181, 0, 30, 80],
    [-20, 90, 30, 95],
    [0, 5, 0, 20],
  ])
    assert.throws(
      () => validateRangeSources([{ ...source, focusBounds }]),
      /Invalid focus bounds/,
    );
});

void test('map loader shares successful requests and retries failed or malformed responses', async (t) => {
  const overlay = { path: 'M0,0L1,0L0,1Z', viewBox: [0, 0, 260, 140] };
  const responses = [
    new Response('', { status: 503 }),
    Response.json({ path: '', viewBox: [0, 0, 0, 0] }),
    Response.json(overlay),
  ];
  const fetchMock = t.mock.method(globalThis, 'fetch', async () =>
    responses.shift()!,
  );
  const load = createMapLoader(parseOverlay);
  const first = load('/maps/test.json');
  assert.equal(load('/maps/test.json'), first);
  await assert.rejects(first, /unavailable/);
  await assert.rejects(load('/maps/test.json'), /Invalid range/);
  assert.deepEqual(await load('/maps/test.json'), overlay);
  assert.deepEqual(await load('/maps/test.json'), overlay);
  assert.equal(fetchMock.mock.callCount(), 3);
});

void test('map payload validation rejects non-finite and out-of-bounds viewports', () => {
  for (const viewBox of [
    [0, 0, NaN, 1],
    [0, 0, Infinity, 1],
    [-1, 0, 260, 140],
    [999, 0, 260, 140],
  ])
    assert.throws(() => parseOverlay({ path: 'M0,0Z', viewBox }), /Invalid/);
  assert.throws(
    () => parseBasemap({ paths: [], viewBox: [0, 0, 1000, 540] }),
    /Invalid/,
  );
});

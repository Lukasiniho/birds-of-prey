import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { referenceRangeMaps } from '../lib/reference-range-maps.ts';
import { parseOverlay } from '../lib/range-map-data.ts';
import {
  validateReferenceSources,
  validateReferenceFeature,
} from '../scripts/reference-range-review.mjs';
import { projectRange } from '../scripts/map-projection.mjs';
import { birds } from '../lib/birds.ts';
import { displayRangeMaps } from '../lib/range-map-catalog.ts';

const sources = JSON.parse(
  readFileSync('data/ranges/reference-vectors/sources.json', 'utf8'),
);

void test('all 19 European catalog species have reference vector overlays', () => {
  const europeanSpecies = [
    'habicht',
    'maeusebussard',
    'wanderfalke',
    'turmfalke',
    'steinadler',
    'seeadler',
    'fischadler',
    'kaiseradler',
    'wespenbussard',
    'bartgeier',
    'uhu',
    'schwarzmilan',
    'rotmilan',
    'gerfalke',
    'sakerfalke',
    'lannerfalke',
    'baumfalke',
    'weissstorch',
    'sperber',
  ];
  for (const id of europeanSpecies) assert(referenceRangeMaps[id], id);
});

void test('every catalog bird has a map and every map belongs to a catalog bird', () => {
  assert.equal(birds.length, 39);
  assert.deepEqual(
    Object.keys(displayRangeMaps).sort(),
    birds.map((bird) => bird.id).sort(),
  );
  for (const bird of birds) {
    const entry = displayRangeMaps[bird.id];
    assert(entry, bird.name);
    parseOverlay(JSON.parse(readFileSync(`public${entry.url}`, 'utf8')));
    assert(entry.sourceUrl.startsWith('https://'));
    assert(entry.licenseUrl.startsWith('https://'));
  }
});

void test('reference overlays preserve pinned geometry, attribution and the shared projection', () => {
  validateReferenceSources(sources);
  assert.deepEqual(
    Object.keys(referenceRangeMaps).sort(),
    sources.map((s: { id: string }) => s.id).sort(),
  );
  for (const source of sources) {
    const geometry = validateReferenceFeature(
      source,
      readFileSync(`data/ranges/reference-vectors/${source.id}.geojson`),
    );
    const entry = referenceRangeMaps[source.id];
    assert(entry);
    assert.equal(entry.sourceUrl, source.sourceUrl);
    assert.equal(entry.license, source.license);
    const raw = readFileSync(`public${entry.url}`);
    const hash = createHash('sha256').update(raw).digest('hex').slice(0, 12);
    assert(entry.url.endsWith(`-${hash}.json`));
    const overlay = parseOverlay(JSON.parse(raw.toString()));
    assert.deepEqual(overlay, projectRange(geometry, source.focusBounds));
  }
});

void test('legacy source pixel allowance is bounded and tied to the actual image resolution', () => {
  const source = sources.find((s: { id: string }) => s.id === 'aguja');
  const raw = readFileSync('data/ranges/reference-vectors/aguja.geojson');
  validateReferenceSources([source]);
  validateReferenceFeature(source, raw);
  assert.throws(
    () =>
      validateReferenceSources([
        {
          ...source,
          review: { ...source.review, registrationErrorPx1000: 20 },
        },
      ]),
    /review/,
  );
  assert.throws(
    () =>
      validateReferenceSources([
        {
          ...source,
          review: { ...source.review, registrationNativeWidth: 100 },
        },
      ]),
    /resolution/,
  );
  assert.throws(
    () =>
      validateReferenceFeature(
        {
          ...source,
          review: { ...source.review, registrationNativeWidth: 300 },
        },
        raw,
      ),
    /resolution mismatch/,
  );
});

void test('the island map has a useful regional frame without changing the geographic paths', () => {
  const source = sources.find(
    (s: { id: string }) => s.id === 'falklandkarakara',
  );
  const geometry = validateReferenceFeature(
    source,
    readFileSync('data/ranges/reference-vectors/falklandkarakara.geojson'),
  );
  const ordinary = projectRange(geometry);
  const focused = projectRange(geometry, source.focusBounds);
  assert.equal(focused.path, ordinary.path);
  assert(focused.viewBox[2] < 160);
  assert.throws(
    () =>
      validateReferenceSources([
        { ...source, focusBounds: [-190, -58, -54, -49] },
      ]),
    /focus bounds/,
  );
});

void test('unreviewed, poorly registered and changed reference geometry cannot be released', () => {
  const [source] = sources;
  const raw = readFileSync(
    `data/ranges/reference-vectors/${source.id}.geojson`,
  );
  assert.throws(
    () =>
      validateReferenceSources([
        { ...source, review: { ...source.review, status: 'pending' } },
      ]),
    /review/,
  );
  assert.throws(
    () =>
      validateReferenceSources([
        {
          ...source,
          review: { ...source.review, registrationErrorPx1000: 20 },
        },
      ]),
    /review/,
  );
  assert.throws(
    () => validateReferenceSources([{ ...source, author: '' }]),
    /provenance/,
  );
  assert.throws(() => validateReferenceSources([source, source]), /duplicate/);
  assert.throws(
    () =>
      validateReferenceFeature(source, Buffer.concat([raw, Buffer.from(' ')])),
    /changed/,
  );
  assert.throws(
    () =>
      validateReferenceFeature(
        { ...source, sourceUrl: 'https://example.com/wrong-map' },
        raw,
      ),
    /mismatch/,
  );
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { birds, birdImage, filterBirds } from '../lib/birds.ts';
import { birdRecordings } from '../lib/bird-recordings.ts';
import { displayRangeMaps } from '../lib/range-map-catalog.ts';
import { portraitImages } from '../lib/portrait-images.ts';
import { huntingImages } from '../lib/hunting-images.ts';
import { speciesById } from '../lib/ecology.ts';
const sharp = createRequire(import.meta.url)('sharp');
const ids = [
  'schreiseeadler',
  'gaensegeier',
  'schleiereule',
  'schreiadler',
  'keilschwanzadler',
  'philippinenadler',
];
const local = (url: string) => `public${url.split('?')[0]}`;

void test('new species have linked, transparent media and matching adult/juvenile silhouettes', async () => {
  const sources = JSON.parse(readFileSync('data/audio/sources.json', 'utf8'));
  for (const id of ids) {
    const bird = birds.find((b) => b.id === id)!;
    assert(bird);
    assert(filterBirds(bird.latin).some((b) => b.id === id));
    assert(displayRangeMaps[id]);
    assert(speciesById[id].ecology.food.length);
    const adult = local(birdImage(id, 'male'));
    const juvenile = local(birdImage(id, 'juvenile'));
    assert.notEqual(adult, juvenile);
    for (const path of [adult, juvenile, local(portraitImages[id]), local(huntingImages[id])]) {
      const im = sharp(path);
      assert((await im.metadata()).hasAlpha, path);
      const alpha = (await im.stats()).channels[3];
      assert(alpha.min === 0 && alpha.max === 255, path);
    }
    assert((await sharp(adult).extractChannel('alpha').raw().toBuffer()).equals(
      await sharp(juvenile).extractChannel('alpha').raw().toBuffer()), `${id}: variant moves`);
    const recording = birdRecordings[id]!;
    assert(recording && recording.peaks.length === 48);
    assert(recording.peaks.some((p) => p > 0));
    const source = sources.find((s: { birdId: string }) => s.birdId === id);
    assert.equal(createHash('sha256').update(readFileSync(local(recording.url))).digest('hex'), source.sha256);
    assert(source.author && source.licenseUrl && source.archiveIdentifier);
  }
});

void test('fish eagle historical name is searchable and owl data uses the western species scope', () => {
  assert(filterBirds('Haliaeetus vocifer').some((b) => b.id === 'schreiseeadler'));
  const owl = birds.find((b) => b.id === 'schleiereule')!;
  assert.equal(owl.latin, 'Tyto alba');
  assert(!owl.range.includes('Amerika') && !owl.range.includes('Australien'));
  assert.deepEqual(owl.weight, [290, 460]);
});

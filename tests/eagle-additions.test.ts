import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('sharp');
import { birds, birdImage, filterBirds } from '../lib/birds.ts';
import { birdRecordings } from '../lib/bird-recordings.ts';
import { displayRangeMaps } from '../lib/range-map-catalog.ts';
import { speciesById } from '../lib/ecology.ts';
import { speciesFacts } from '../lib/species-facts.ts';
import { portraitImages } from '../lib/portrait-images.ts';
import { huntingImages } from '../lib/hunting-images.ts';
import { getBirdMorphAppearance, getBirdMorphConfig } from '../lib/morphs.ts';

const ids = ['habichtsadler', 'iberienadler', 'klippenadler', 'zwergadler'];
const local = (url: string) => `public${url.split('?')[0]}`;

void test('all four added eagles have complete linked catalog records and real local media', async () => {
  const sources = JSON.parse(readFileSync('data/audio/sources.json', 'utf8'));
  for (const id of ids) {
    const bird = birds.find((b) => b.id === id)!;
    assert(bird);
    assert(filterBirds(bird.latin).some((b) => b.id === id));
    assert.equal(speciesById[id].ecology.habitatTags.length > 0, true);
    assert.equal(speciesById[id].ecology.huntingTags.length > 0, true);
    assert.equal(Object.keys(speciesFacts[id]).length, 5);
    assert(displayRangeMaps[id]);
    for (const url of [
      birdImage(id, 'male'),
      birdImage(id, 'juvenile'),
      portraitImages[id],
      huntingImages[id],
    ]) {
      assert(existsSync(local(url)), url);
    }
    for (const stage of ['male', 'juvenile'] as const) {
      const img = sharp(local(birdImage(id, stage)));
      const stats = await img.stats();
      assert((await img.metadata()).hasAlpha, `${id} ${stage}: missing alpha`);
      assert(
        stats.channels[3].min === 0 && stats.channels[3].max === 255,
        `${id} ${stage}: opaque background`,
      );
    }
    const recording = birdRecordings[id]!;
    assert(recording);
    assert(recording.durationSeconds >= 3 && recording.durationSeconds <= 10);
    const source = sources.find((s: { birdId: string }) => s.birdId === id);
    assert.equal(
      createHash('sha256')
        .update(readFileSync(local(recording.url)))
        .digest('hex'),
      source.sha256,
    );
    assert(source.author && source.license && source.sourceUrl && source.edit);
  }
});

void test('booted eagle morphs cover both life stages without duplicating species', async () => {
  assert.equal(birds.filter((b) => b.id === 'zwergadler').length, 1);
  const config = getBirdMorphConfig('zwergadler')!;
  assert.equal(config.defaultId, 'hell');
  assert.deepEqual(
    config.choices.map((c) => c.id),
    ['hell', 'dunkel'],
  );
  const adult = await sharp(local(birdImage('zwergadler', 'male'))).metadata();
  const adultAlpha = await sharp(local(birdImage('zwergadler', 'male')))
    .extractChannel('alpha')
    .raw()
    .toBuffer();
  const paths = new Set<string>();
  for (const morph of ['hell', 'dunkel']) {
    for (const stage of ['male', 'juvenile'] as const) {
      const appearance = getBirdMorphAppearance('zwergadler', morph, stage)!;
      const path = local(appearance.image ?? birdImage('zwergadler', stage));
      paths.add(path);
      const img = sharp(path);
      const metadata = await img.metadata();
      assert.equal(metadata.width, adult.width);
      assert.equal(metadata.height, adult.height);
      assert(
        metadata.hasAlpha && (await img.stats()).channels[3].min === 0,
        path,
      );
      assert(
        adultAlpha.equals(
          await sharp(path).extractChannel('alpha').raw().toBuffer(),
        ),
        `${path}: silhouette differs`,
      );
      assert(appearance.note && appearance.colors.length >= 2);
    }
  }
  assert.equal(paths.size, 4);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { birdImage } from '../lib/birds.ts';
import { getBirdMorphConfig } from '../lib/morphs.ts';

void test('new edits retain their normal adult canvas and exact transparent silhouette', async () => {
  for (const id of ['wespenbussard', 'gaukler', 'bartgeier', 'fischadler']) {
    const original = new URL(
      `../public${birdImage(id, 'male').split('?')[0]}`,
      import.meta.url,
    );
    const base = await sharp(original.pathname).metadata();
    const alpha = await sharp(original.pathname)
      .extractChannel('alpha')
      .raw()
      .toBuffer();
    const variants = new Set(
      getBirdMorphConfig(id)?.choices.flatMap((choice) =>
        Object.values(choice.images ?? {}),
      ) ?? [],
    );
    if (id === 'bartgeier') variants.add(birdImage(id, 'juvenile'));
    if (id === 'fischadler') variants.add(birdImage(id, 'female'));
    for (const variant of variants) {
      const file = new URL(`../public${variant.split('?')[0]}`, import.meta.url)
        .pathname;
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.width, base.width, variant);
      assert.equal(metadata.height, base.height, variant);
      assert.equal(metadata.hasAlpha, true, variant);
      const actualAlpha = await sharp(file)
        .extractChannel('alpha')
        .raw()
        .toBuffer();
      assert.ok(
        alpha.equals(actualAlpha),
        `${variant}: silhouette must match normal adult`,
      );
    }
  }
});

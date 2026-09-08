import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  birdMorphs,
  getBirdMorphChoice,
  getBirdMorphAppearance,
  getBirdMorphConfig,
} from '../lib/morphs.ts';
import { birdImage } from '../lib/birds.ts';
void test('every colour form has complete adult and juvenile illustrations', () => {
  let forms = 0;
  for (const [id, config] of Object.entries(birdMorphs)) {
    assert.equal(
      new Set(config.choices.map((choice) => choice.id)).size,
      config.choices.length,
    );
    for (const choice of config.choices) {
      forms++;
      for (const stage of ['male', 'juvenile'] as const) {
        const appearance = getBirdMorphAppearance(id, choice.id, stage)!;
        const path = (appearance.image ?? birdImage(id, stage)).split('?')[0];
        assert.ok(
          existsSync(new URL(`../public${path}`, import.meta.url)),
          path,
        );
        assert.ok(appearance.note.length > 30);
        assert.ok(appearance.colors.length >= 2);
      }
    }
  }
  assert.equal(forms, 11);
});
void test('colour choice resolves within the current species and has a valid default', () => {
  assert.equal(getBirdMorphChoice('maeusebussard', 'weiss')?.id, 'mittel');
  assert.equal(getBirdMorphChoice('gerfalke', 'rostbraun')?.id, 'grau');
  assert.equal(getBirdMorphConfig('habicht'), undefined);
  assert.equal(getBirdMorphAppearance('habicht', 'dunkel', 'male'), undefined);
  for (const [id, config] of Object.entries(birdMorphs))
    assert.equal(getBirdMorphChoice(id)?.id, config.defaultId);
});
void test('age selection changes images, notes and red-tail juvenile palettes', () => {
  for (const choice of birdMorphs.rotschwanzbussard.choices) {
    const adult = getBirdMorphAppearance(
      'rotschwanzbussard',
      choice.id,
      'male',
    )!;
    const young = getBirdMorphAppearance(
      'rotschwanzbussard',
      choice.id,
      'juvenile',
    )!;
    assert.notEqual(adult.note, young.note);
    assert.ok(!young.colors.some(([name]) => /rostrot|schwanzrot/i.test(name)));
    if (adult.image) assert.notEqual(adult.image, young.image);
  }
});

void test('prey framing uses valid visible bounds within the original image', async () => {
  const { preyFraming } = await import('../lib/prey-framing.ts');
  const { preyCatalog } = await import('../lib/diets.ts');
  assert.deepEqual(
    Object.keys(preyFraming).sort(),
    Object.keys(preyCatalog)
      .filter((id) => !preyCatalog[id].icon)
      .sort(),
  );
  for (const frame of Object.values(preyFraming)) {
    assert.ok(frame.width > 0 && frame.height > 0);
    assert.ok(frame.x >= 0 && frame.y >= 0);
    assert.ok(frame.x + frame.width <= frame.imageWidth);
    assert.ok(frame.y + frame.height <= frame.imageHeight);
  }
});

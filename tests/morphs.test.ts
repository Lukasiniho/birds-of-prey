import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  birdMorphs,
  getBirdMorphChoice,
  getBirdMorphAppearance,
  getBirdMorphConfig,
} from '../lib/morphs.ts';
import { birdImage, plumagesFor, plumageNoteFor } from '../lib/birds.ts';
void test('every colour form has illustrations for its supported plumages', () => {
  let forms = 0;
  for (const [id, config] of Object.entries(birdMorphs)) {
    assert.equal(
      new Set(config.choices.map((choice) => choice.id)).size,
      config.choices.length,
    );
    for (const choice of config.choices) {
      forms++;
      for (const { value: stage } of plumagesFor(id)) {
        if (!getBirdMorphConfig(id, stage)) continue;
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
  assert.equal(forms, 18);
});
void test('adult-only colour choices do not replace juvenile plumages', () => {
  for (const id of ['gaukler', 'bartgeier']) {
    const config = getBirdMorphConfig(id)!;
    for (const choice of config.choices) {
      assert.equal(getBirdMorphConfig(id, 'juvenile'), undefined);
      assert.equal(getBirdMorphChoice(id, choice.id, 'juvenile'), undefined);
      assert.equal(
        getBirdMorphAppearance(id, choice.id, 'juvenile'),
        undefined,
      );
    }
  }
});
void test('female Bateleur retains its own image and identification across morphs', () => {
  const male = getBirdMorphAppearance('gaukler', 'creme', 'male')!;
  const female = getBirdMorphAppearance('gaukler', 'creme', 'female')!;
  assert.notEqual(male.image, female.image);
  assert.match(female.image!, /female/);
  assert.match(male.note, /breiten/);
  assert.match(female.note, /schmalem/);
  assert.equal(
    getBirdMorphAppearance('gaukler', 'kastanienbraun', 'female')!.image,
    undefined,
  );
});
void test('Osprey offers sexes instead of invented colour morphs', () => {
  assert.equal(getBirdMorphConfig('fischadler'), undefined);
  assert.deepEqual(
    plumagesFor('fischadler').map(({ value }) => value),
    ['male', 'female', 'juvenile'],
  );
  assert.notEqual(
    birdImage('fischadler', 'male'),
    birdImage('fischadler', 'female'),
  );
  assert.match(plumageNoteFor('fischadler', 'male'), /schwach/);
  assert.match(
    plumageNoteFor('fischadler', 'female'),
    /keine sichere Geschlechtsbestimmung/,
  );
});
void test('default adult images remain the existing normal form', () => {
  for (const id of ['wespenbussard', 'gaukler', 'bartgeier']) {
    assert.equal(
      getBirdMorphAppearance(id, undefined, 'male')!.image,
      undefined,
    );
  }
  assert.match(birdMorphs.bartgeier.note, /keine genetischen Farbmorphen/);
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

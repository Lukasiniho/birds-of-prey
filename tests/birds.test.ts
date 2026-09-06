import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds, filterBirds, groupBirds, plumagesFor } from '../lib/birds.ts';
void test('German and scientific searches return the right species', () => {
  assert.equal(filterBirds('mäuse', false, [])[0]?.id, 'maeusebussard');
  assert.equal(filterBirds('FALCO', false, []).length, 6);
  assert.equal(filterBirds('   ', false, []).length, 27);
  assert.equal(filterBirds('unbekannt', false, []).length, 0);
});
void test('collection and text search compose', () => {
  assert.equal(filterBirds('', true, []).length, 0);
  assert.deepEqual(
    filterBirds('adler', true, ['habicht', 'seeadler']).map((b) => b.id),
    ['seeadler'],
  );
});
void test('genus grouping preserves every bird exactly once', () => {
  const groups = groupBirds(birds, 'genus');
  assert.equal(groups.length, 16);
  const all = groups.flatMap((g) => g.birds.map((b) => b.id));
  assert.equal(all.length, 27);
  assert.equal(new Set(all).size, 27);
  assert.equal(groups.find((g) => g.id === 'Falco')?.birds.length, 6);
});
void test('all grouping modes retain every matching species and no extras', () => {
  for (const mode of ['genus', 'region', 'range', 'habitat'] as const) {
    const filtered = filterBirds('adler', false, []);
    const ids = new Set(
      groupBirds(filtered, mode).flatMap((g) => g.birds.map((b) => b.id)),
    );
    assert.deepEqual([...ids].sort(), filtered.map((b) => b.id).sort());
    assert.equal(groupBirds([], mode).length, 0);
  }
});
void test('every bird has a distinct path for each life stage', async () => {
  const { birdImage, plumageNotes, colorsFor, hunts } =
    await import('../lib/birds.ts');
  for (const bird of birds) {
    const paths = plumagesFor(bird.id).map((p) => birdImage(bird.id, p.value));
    assert.equal(new Set(paths).size, plumagesFor(bird.id).length);
    assert(plumageNotes[bird.id].juvenile);
    assert(hunts[bird.id].text);
    for (const mode of ['male', 'female', 'juvenile'] as const)
      assert(
        colorsFor(bird, mode).length >= 2,
        `${bird.id} ${mode} colour palette missing`,
      );
  }
});

void test('new German species names, synonyms and umlaut-free IDs are searchable', () => {
  for (const [query, id] of [
    ['Weißkopf', 'weisskopfseeadler'],
    ['weisskopf', 'weisskopfseeadler'],
    ['Andenbussard', 'aguja'],
    ['Gerfalke', 'gerfalke'],
    ['Uhu', 'uhu'],
    ['Schwarzmilan', 'schwarzmilan'],
    ['Rotmilan', 'rotmilan'],
  ])
    assert(filterBirds(query, false, []).some((b) => b.id === id));
});
void test('all images exist and eye and leg colours follow the chosen age', async () => {
  const { existsSync } = await import('node:fs');
  const { birdImage, bodyColorsFor, hunts } = await import('../lib/birds.ts');
  for (const bird of birds) {
    assert.equal(bird.unit, 'g');
    assert.match(bird.weight, /(ca\.|bis)/);
    for (const { value: mode } of plumagesFor(bird.id)) {
      assert(
        existsSync(
          new URL('../public' + birdImage(bird.id, mode), import.meta.url),
        ),
        `${bird.id} ${mode} asset missing`,
      );
      const colors = bodyColorsFor(bird.id, mode);
      assert(colors.eyes.length);
      assert(colors.legs.length);
      for (const [, hex] of [...colors.eyes, ...colors.legs])
        assert.match(hex, /^#[0-9A-Fa-f]{6}$/);
    }
    if (hunts[bird.id].image)
      assert(
        existsSync(
          new URL('../public' + hunts[bird.id].image, import.meta.url),
        ),
      );
  }
  assert.notDeepEqual(
    bodyColorsFor('habicht', 'male').eyes,
    bodyColorsFor('habicht', 'juvenile').eyes,
  );
  assert.notDeepEqual(
    bodyColorsFor('wanderfalke', 'male').legs,
    bodyColorsFor('wanderfalke', 'juvenile').legs,
  );
});

void test('all species have reviewed diets, valid prey and illustrated habitats', async () => {
  const { existsSync } = await import('node:fs');
  const { diets, preyCatalog } = await import('../lib/diets.ts');
  const { landscapes, speciesLandscapes } = await import('../lib/habitats.ts');
  const { habitatImages } = await import('../lib/habitat-images.ts');
  const { huntingImages } = await import('../lib/hunting-images.ts');
  const { portraitImages } = await import('../lib/portrait-images.ts');
  for (const bird of birds) {
    assert(
      existsSync(
        new URL('../public' + portraitImages[bird.id], import.meta.url),
      ),
      `${bird.id} portrait missing`,
    );
    const diet = diets[bird.id];
    assert(diet.summary);
    assert(diet.sources.length);
    assert(diet.examples.length);
    for (const { key } of [...diet.examples, ...diet.occasionalExamples]) {
      const prey = preyCatalog[key];
      assert(prey);
      if (prey.image)
        assert(existsSync(new URL('../public' + prey.image, import.meta.url)));
    }
    for (const id of speciesLandscapes[bird.id]) {
      assert(landscapes[id]);
      assert(
        existsSync(new URL('../public' + habitatImages[id], import.meta.url)),
      );
    }
    assert(
      existsSync(
        new URL('../public' + huntingImages[bird.id], import.meta.url),
      ),
    );
    for (const n of bird.span.match(/\d+/g) ?? [])
      assert.equal(Number(n) % 5, 0);
  }
  assert.deepEqual(diets.fischadler.examples, [{ key: 'fisch' }]);
  assert(diets.steinadler.examples.some((p) => p.key === 'hase'));
  assert(diets.steinadler.occasionalExamples.some((p) => p.key === 'rehkitz'));
  assert(!diets.fischadler.examples.some((p) => p.key === 'aas'));
  assert.deepEqual(
    plumagesFor('gaukler').map((p) => p.value),
    ['male', 'female', 'juvenile'],
  );
  assert.deepEqual(
    plumagesFor('sperber').map((p) => p.value),
    ['male', 'female', 'juvenile'],
  );
  assert.deepEqual(
    plumagesFor('seeadler').map((p) => p.label),
    ['Altvogel', 'Jungvogel'],
  );
});

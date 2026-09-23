import assert from 'node:assert/strict';
import { test } from 'node:test';
import taxonomy from '../data/taxonomy.json' with { type: 'json' };
import { birds } from '../lib/birds.ts';
import { portraitImages } from '../lib/portrait-images.ts';

void test('Every atlas species occurs exactly once in the taxonomy and has a portrait', () => {
  const species = taxonomy.flatMap((order) =>
    order.families.flatMap((family) =>
      family.genera.flatMap((genus) => genus.species),
    ),
  );
  assert.equal(new Set(species.map((item) => item.latin)).size, species.length);
  for (const bird of birds) {
    assert.equal(
      species.filter((item) => item.latin === bird.latin).length,
      1,
      bird.latin,
    );
    assert.ok(portraitImages[bird.id], bird.id);
  }
});
void test('All species belong to the genus named by their binomial', () => {
  for (const order of taxonomy)
    for (const family of order.families)
      for (const genus of family.genera) {
        assert.ok(genus.species.length);
        for (const species of genus.species)
          assert.equal(species.latin.split(' ')[0], genus.latin);
      }
});

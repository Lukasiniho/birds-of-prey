import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  speciesRecords,
  predatorsFor,
  preyCategories,
  huntingTypes,
} from '../lib/ecology.ts';
import { landscapes } from '../lib/habitats.ts';
import { preyCatalog } from '../lib/diets.ts';
test('every species has complete structured ecology and valid references', () => {
  assert.equal(speciesRecords.length, 39);
  for (const b of speciesRecords) {
    assert(b.ecology.food.length, b.id);
    assert(b.ecology.huntingTags.length, b.id);
    assert(b.ecology.status.tags.length, b.id);
    assert.equal(b.ecology.status.region, 'DE');
    for (const id of b.ecology.habitatTags) assert(landscapes[id]);
    for (const id of b.ecology.huntingTags) assert(huntingTypes[id]);
    for (const p of b.ecology.prey) {
      assert(preyCatalog[p.key], `${b.id}: ${p.key}`);
      assert(preyCategories[p.category], `${b.id}: ${p.key}`);
    }
  }
});
test('category inversion includes occasional food without converting carrion into live mammals', () => {
  assert(predatorsFor('fische').some((b) => b.id === 'fischadler'));
  assert(!predatorsFor('kleinsaeuger').some((b) => b.id === 'fischadler'));
  assert(predatorsFor('aas').some((b) => b.id === 'andenkondor'));
  assert(!predatorsFor('kleinsaeuger').some((b) => b.id === 'andenkondor'));
  assert(predatorsFor('reptilien').some((b) => b.id === 'bartgeier'));
});
test('relative size is evaluated on the same predator-prey relationship', () => {
  assert(
    predatorsFor('kleinsaeuger', 'hase', 'groesser').some(
      (b) => b.id === 'wuestenbussard',
    ),
  );
  assert(
    !predatorsFor('kleinsaeuger', 'wuehlmaus', 'groesser').some(
      (b) => b.id === 'wuestenbussard',
    ),
  );
  assert.equal(predatorsFor('aas', undefined, 'groesser').length, 0);
});
test('status is geographically scoped and leaves tropical species outside German seasons', () => {
  assert.deepEqual(
    speciesRecords.find((b) => b.id === 'harpyie')!.ecology.status.tags,
    ['ausserhalb'],
  );
  assert(
    !speciesRecords
      .find((b) => b.id === 'wespenbussard')!
      .ecology.status.tags.includes('winter'),
  );
});

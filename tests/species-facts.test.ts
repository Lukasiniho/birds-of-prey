import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds } from '../lib/birds.ts';
import { conservationLabels, speciesFacts } from '../lib/species-facts.ts';

await test('every catalog species has exactly the five agreed facts with sources', () => {
  assert.deepEqual(
    Object.keys(speciesFacts).sort(),
    birds.map((b) => b.id).sort(),
  );
  for (const [id, facts] of Object.entries(speciesFacts)) {
    assert.deepEqual(Object.keys(facts).sort(), [
      'activity',
      'clutch',
      'conservation',
      'lifespan',
      'movement',
    ]);
    for (const fact of Object.values(facts)) {
      assert(fact.sources.length > 0, id);
      for (const source of fact.sources)
        assert.equal(new URL(source).protocol, 'https:', id);
      if ('value' in fact)
        assert(
          fact.value.trim().length > 0 && !/nicht gesichert/i.test(fact.value),
          id,
        );
    }
    assert(facts.conservation.code in conservationLabels, id);
    assert(facts.lifespan.context.length > 0, id);
  }
});

await test('lifespan scope and global conservation remain explicit', () => {
  assert.match(
    speciesFacts.kaiseradler.lifespan.context,
    /Höchstalter.*Wildbahn/,
  );
  assert.match(speciesFacts.aguja.lifespan.context, /Tierhaltung/);
  assert.match(speciesFacts.habicht.lifespan.context, /Ab Brutreife/);
  assert.equal(speciesFacts.rotmilan.conservation.code, 'LC');
  assert.equal(speciesFacts.kronenadler.conservation.code, 'NT');
  assert.equal(speciesFacts.harpyie.conservation.code, 'VU');
});

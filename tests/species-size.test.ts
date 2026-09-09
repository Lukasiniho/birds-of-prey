import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds, groupBirds, groupingOptions } from '../lib/birds.ts';
import { sizeBucketFor } from '../lib/species-size.ts';

test('five size groups retain each real species exactly once, in size order', () => {
  const groups = groupBirds(birds, 'size');
  assert.deepEqual(
    groups.map((group) => group.id),
    ['size-xs', 'size-s', 'size-m', 'size-l', 'size-xl'],
  );
  const ids = groups.flatMap((group) => group.birds.map((bird) => bird.id));
  assert.equal(ids.length, birds.length);
  assert.equal(new Set(ids).size, birds.length);
  assert.deepEqual([...ids].sort(), birds.map((bird) => bird.id).sort());
  assert(!groupingOptions.some((option) => option.label === 'Region'));
});

test('size boundaries are exclusive, ranges use midpoint and single values remain usable', () => {
  const bird = { span: '', weight: '100–200', unit: 'g' };
  assert.equal(sizeBucketFor({ ...bird, span: 'ca. 79' })?.id, 'size-xs');
  assert.equal(sizeBucketFor({ ...bird, span: '70–90' })?.id, 'size-s');
  assert.equal(sizeBucketFor({ ...bird, span: '120' })?.id, 'size-m');
  assert.equal(sizeBucketFor({ ...bird, span: '170' })?.id, 'size-l');
  assert.equal(sizeBucketFor({ ...bird, span: '220' })?.id, 'size-xl');
});

test('weight fallback handles units and does not treat span upper bounds as means', () => {
  assert.equal(
    sizeBucketFor({ span: 'bis 200', weight: '3,8–9,0', unit: 'kg' })?.id,
    'size-xl',
  );
  assert.equal(
    sizeBucketFor({ span: '', weight: '3.800–9.000', unit: 'g' })?.id,
    'size-xl',
  );
  assert.equal(
    sizeBucketFor({ span: '', weight: 'unbekannt', unit: 'g' }),
    undefined,
  );
  assert.equal(
    sizeBucketFor({ span: '', weight: '3–5', unit: 'lb' }),
    undefined,
  );
});

test('filtered and unknown species stay available without empty groups', () => {
  const subset = birds.filter((bird) => bird.name.includes('Adler'));
  assert.deepEqual(
    groupBirds(subset, 'size')
      .flatMap((g) => g.birds.map((b) => b.id))
      .sort(),
    subset.map((b) => b.id).sort(),
  );
  assert.deepEqual(groupBirds([], 'size'), []);
  const unknown = { ...birds[0], id: 'unknown', span: '', weight: '' };
  assert.equal(groupBirds([unknown], 'size')[0]?.id, 'size-unknown');
  assert.equal(groupBirds([unknown], 'size')[0]?.birds[0].id, 'unknown');
});

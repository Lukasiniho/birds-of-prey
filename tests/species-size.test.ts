import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds, groupBirds, groupingOptions } from '../lib/birds.ts';
import { sizeBucketFor } from '../lib/species-size.ts';

test('populated size groups retain each real species exactly once, in size order', () => {
  const groups = groupBirds(birds, 'size');
  assert.deepEqual(
    groups.map((group) => group.id),
    ['size-s', 'size-m', 'size-l', 'size-xl'],
  );
  const ids = groups.flatMap((group) => group.birds.map((bird) => bird.id));
  assert.equal(ids.length, birds.length);
  assert.equal(new Set(ids).size, birds.length);
  assert.deepEqual([...ids].sort(), birds.map((bird) => bird.id).sort());
  assert(!groupingOptions.some((option) => option.label === 'Region'));
});

test('size boundaries are exclusive, ranges use midpoint and single values remain usable', () => {
  const bird = { span: '', weight: '100–200', unit: 'g' };
  assert.equal(sizeBucketFor({ ...bird, span: 'ca. 69' })?.id, 'size-xs');
  assert.equal(sizeBucketFor({ ...bird, span: '60–80' })?.id, 'size-s');
  assert.equal(sizeBucketFor({ ...bird, span: '100' })?.id, 'size-m');
  assert.equal(sizeBucketFor({ ...bird, span: '150' })?.id, 'size-l');
  assert.equal(sizeBucketFor({ ...bird, span: '210' })?.id, 'size-xl');
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

test('both measurements determine size independently of the dataset mix', () => {
  const goshawk = birds.find(bird => bird.id === 'habicht')!;
  assert.equal(sizeBucketFor(goshawk)?.id, 'size-m');
  assert.equal(sizeBucketFor({ span: '80', weight: '1,1', unit: 'kg' })?.id, 'size-m');
  assert.equal(sizeBucketFor({ span: '80', weight: '1.000', unit: 'g' })?.id, 'size-m');
  assert.equal(sizeBucketFor({ span: '90', weight: '2.000', unit: 'g' })?.id, 'size-l');
  assert.equal(sizeBucketFor({ span: '210', weight: '500', unit: 'g' })?.id, 'size-xl');
  assert.equal(sizeBucketFor({ span: '90', weight: '5', unit: 'kg' })?.id, 'size-xl');
});

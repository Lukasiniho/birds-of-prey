import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds, groupBirds } from '../lib/birds.ts';
import { sizeBucketFor, compareSizeWithinGroup } from '../lib/species-size.ts';

void test('mass boundaries and units classify independently of wing length', () => {
  const cases: [[number, number], string][] = [[[199, 199], 'size-xs'], [[200, 200], 'size-s'], [[600, 600], 'size-m'], [[1000, 1000], 'size-m'], [[2000, 2000], 'size-l'], [[5000, 5000], 'size-xl']];
  for (const [weight, expected] of cases) {
    for (const span of [[60, 60], [250, 250]] as [number, number][]) assert.equal(sizeBucketFor({span,weight})?.id, expected);
  }
  // Grams are the only stored unit: 800 g stays medium, an empty range is unknown.
  assert.equal(sizeBucketFor({span:[200, 200],weight:[800, 800]})?.id,'size-m');
  assert.equal(sizeBucketFor({span:[200, 200],weight:[0, 1000]}),undefined);
});

void test('familiar medium birds remain together and steppe eagle is larger', () => {
  for (const id of ['habicht','maeusebussard','rotmilan','schwarzmilan']) {
    const bird = birds.find(b => b.id === id)!;
    assert(bird);
    assert.equal(sizeBucketFor(bird)?.id,'size-m',id);
  }
  assert.equal(sizeBucketFor(birds.find(b => b.id === 'steppenadler')!)?.id,'size-l');
});

void test('groups cover each species once and order within groups by wingspan', () => {
  const groups = groupBirds(birds,'size');
  const ids = groups.flatMap(g => g.birds.map(b => b.id));
  assert.equal(new Set(ids).size,birds.length);
  assert.equal(ids.length,birds.length);
  for (const g of groups) for (let i=1;i<g.birds.length;i++) assert(compareSizeWithinGroup(g.birds[i-1],g.birds[i]) <= 0);
  assert.deepEqual(groupBirds([],'size'),[]);
  assert.equal(groupBirds([{...birds[0],weight:[0, 0]}],'size')[0].id,'size-unknown');
});

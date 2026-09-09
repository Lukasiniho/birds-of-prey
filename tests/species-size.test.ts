import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds, groupBirds } from '../lib/birds.ts';
import { sizeBucketFor, compareSizeWithinGroup } from '../lib/species-size.ts';

test('mass boundaries and units classify independently of wing length', () => {
  for (const [weight, expected] of [['199', 'size-xs'], ['200','size-s'], ['600','size-m'], ['1.000','size-m'], ['2.000','size-l'], ['5.000','size-xl']]) {
    for (const span of ['60','250']) assert.equal(sizeBucketFor({span,weight,unit:'g'})?.id, expected);
  }
  assert.equal(sizeBucketFor({span:'200',weight:'0,8',unit:'kg'})?.id,'size-m');
  assert.equal(sizeBucketFor({span:'200',weight:'bis 1000',unit:'g'}),undefined);
});

test('familiar medium birds remain together and steppe eagle is larger', () => {
  for (const id of ['habicht','maeusebussard','rotmilan','schwarzmilan']) {
    const bird = birds.find(b => b.id === id)!;
    assert(bird);
    assert.equal(sizeBucketFor(bird)?.id,'size-m',id);
  }
  assert.equal(sizeBucketFor(birds.find(b => b.id === 'steppenadler')!)?.id,'size-l');
});

test('groups cover each species once and order within groups by wingspan', () => {
  const groups = groupBirds(birds,'size');
  const ids = groups.flatMap(g => g.birds.map(b => b.id));
  assert.equal(new Set(ids).size,birds.length);
  assert.equal(ids.length,birds.length);
  for (const g of groups) for (let i=1;i<g.birds.length;i++) assert(compareSizeWithinGroup(g.birds[i-1],g.birds[i]) <= 0);
  assert.deepEqual(groupBirds([],'size'),[]);
  assert.equal(groupBirds([{...birds[0],weight:''}],'size')[0].id,'size-unknown');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { closestWeightSlot } from '../lib/quiz-drag.ts';
import { moveBird } from '../lib/quiz-engine.ts';

void test('holding a drag over one slot does not oscillate as cards reorder', () => {
  const slots = [0, 100, 200, 300].map((x) => ({ x, y: 100 }));
  let order = ['a', 'b', 'c', 'd'];
  for (let i = 0; i < 20; i++) {
    order = moveBird(order, 'a', closestWeightSlot(slots, { x: 205, y: 100 }));
    assert.deepEqual(order, ['b', 'c', 'a', 'd']);
  }
  order = moveBird(order, 'a', closestWeightSlot(slots, { x: 300, y: 100 }));
  assert.deepEqual(order, ['b', 'c', 'd', 'a']);
  order = moveBird(order, 'a', closestWeightSlot(slots, { x: 0, y: 100 }));
  assert.deepEqual(order, ['a', 'b', 'c', 'd']);
});

void test('slot targeting supports wrapped grids and gaps between cards', () => {
  const slots = [
    { x: 50, y: 50 },
    { x: 170, y: 50 },
    { x: 50, y: 250 },
    { x: 170, y: 250 },
  ];
  assert.equal(closestWeightSlot(slots, { x: 50, y: 220 }), 2);
  assert.equal(closestWeightSlot(slots, { x: 170, y: 270 }), 3);
  assert.equal(closestWeightSlot(slots, { x: 115, y: 50 }), 1);
});

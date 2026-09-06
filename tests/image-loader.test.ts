import test from 'node:test';
import assert from 'node:assert/strict';
import { createImageLoader } from '../lib/image-loader.ts';

void test('image readiness waits for decoding and shares concurrent requests', async () => {
  let finish!: () => void;
  let calls = 0;
  const loader = createImageLoader(() => ({
    src: '',
    decoding: '',
    decode: () => {
      calls++;
      return new Promise<void>((resolve) => {
        finish = resolve;
      });
    },
  }));
  const first = loader('/bird.webp');
  assert.equal(loader('/bird.webp'), first);
  let ready = false;
  void first.then(() => {
    ready = true;
  });
  await Promise.resolve();
  assert.equal(ready, false);
  finish();
  await first;
  assert.equal(ready, true);
  assert.equal(calls, 1);
});

void test('failed decoding can be retried instead of poisoning the cache', async () => {
  let calls = 0;
  const loader = createImageLoader(() => ({
    src: '',
    decoding: '',
    decode: () =>
      ++calls === 1
        ? Promise.reject(new Error('network interrupted'))
        : Promise.resolve(),
  }));
  await assert.rejects(loader('/bird.webp'));
  await loader('/bird.webp');
  assert.equal(calls, 2);
});

void test('preloading retains only a bounded number of image promises', async () => {
  let calls = 0;
  const loader = createImageLoader(
    () => ({
      src: '',
      decoding: '',
      decode: () => {
        calls++;
        return Promise.resolve();
      },
    }),
    2,
  );
  await loader('/one.webp');
  await loader('/two.webp');
  await loader('/three.webp');
  await loader('/one.webp');
  assert.equal(calls, 4);
});

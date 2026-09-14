import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import sharp from 'sharp';
import { birdImage, birds, plumagesFor } from '../lib/birds.ts';
import { birdImages } from '../lib/bird-images.ts';
import { getBirdMorphConfig } from '../lib/morphs.ts';
import { portraitImages } from '../lib/portrait-images.ts';

/**
 * Flight images and portraits are framed in the file, never per species in
 * the app. One template, one loop: every species runs through the same box at
 * the same size, and an image that sits wrong is redrawn instead of nudged
 * with its own percentage, offset or stylesheet rule.
 */
const root = new URL('../', import.meta.url).pathname;
const speciesIds = new Set(birds.map((b) => b.id));

function sourcesUnder(dirs, pattern) {
  return dirs.flatMap((dir) =>
    readdirSync(root + dir, { recursive: true, encoding: 'utf8' })
      .filter((name) => pattern.test(name))
      .map((name) => ({
        path: `${dir}/${name}`,
        text: readFileSync(`${root}${dir}/${name}`, 'utf8'),
      })),
  );
}

/** A geometry value: a length, a factor, a transform — anything that scales,
 *  moves or crops the art rather than naming it. */
function isFramingValue(value) {
  return (
    /^-?\d+(\.\d+)?$/.test(value) ||
    /(?:^|[\s(])-?\d+(\.\d+)?(?:%|px|rem|em|vh|vw|deg|fr)(?![a-z])/.test(
      value,
    ) ||
    /\b(scale|translate|rotate|object-position|calc)\b/.test(value)
  );
}

void test('no species gets its own framing value in the view layer', () => {
  const entry =
    /(?:^|[{,(\s])'?([A-Za-z][A-Za-z0-9_]*)'?\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(-?\d+(?:\.\d+)?))/g;
  const offenders = [];
  for (const file of sourcesUnder(['app', 'components'], /\.tsx?$/)) {
    file.text.split('\n').forEach((line, index) => {
      for (const match of line.matchAll(entry)) {
        const key = match[1];
        const value = match[2] ?? match[3] ?? match[4] ?? match[5] ?? '';
        if (speciesIds.has(key) && isFramingValue(value))
          offenders.push(`${file.path}:${index + 1} ${key}: ${value}`);
      }
    });
  }
  assert.deepEqual(
    offenders,
    [],
    `per-species framing belongs in the image file:\n${offenders.join('\n')}`,
  );
});

void test('stylesheets never single out a species', () => {
  const offenders = [];
  for (const file of sourcesUnder(['app', 'components'], /\.css$/)) {
    file.text.split('\n').forEach((line, index) => {
      if (line.trimStart().startsWith('*')) return;
      for (const word of line.match(/[a-zäöüß]+/g) ?? [])
        if (speciesIds.has(word))
          offenders.push(`${file.path}:${index + 1} ${line.trim()}`);
    });
  }
  assert.deepEqual(
    offenders,
    [],
    `species rows and the art stage stay generic:\n${offenders.join('\n')}`,
  );
});

void test('every species is served by the same two loops', () => {
  assert.deepEqual(
    birds.map((b) => b.id).filter((id) => !portraitImages[id]),
    [],
  );
  // `birdImage` falls back to a guessed file name; nothing may rely on it, or
  // a species would quietly leave the shared set of flight images.
  assert.deepEqual(
    birds.flatMap((bird) =>
      plumagesFor(bird.id)
        .map((plumage) =>
          plumage.value === 'male'
            ? bird.id
            : `${plumage.value === 'female' ? 'female' : 'juvenile'}-${bird.id}`,
        )
        .filter((key) => !birdImages[key]),
    ),
    [],
  );
});

/** Where the opaque pixels sit on the canvas. */
async function frame(source) {
  const file = `${root}public${source.split('?')[0]}`;
  const meta = await sharp(file).metadata();
  const { info } = await sharp(file)
    .ensureAlpha()
    .extractChannel('alpha')
    .trim({ threshold: 16 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const left = -(info.trimOffsetLeft ?? 0);
  const top = -(info.trimOffsetTop ?? 0);
  return {
    square: meta.width === meta.height,
    clipped:
      left === 0 ||
      top === 0 ||
      left + info.width === meta.width ||
      top + info.height === meta.height,
    offsetX: (left + info.width / 2) / meta.width - 0.5,
    offsetY: (top + info.height / 2) / meta.height - 0.5,
  };
}

function flightSources() {
  const sources = new Set();
  for (const bird of birds) {
    for (const plumage of plumagesFor(bird.id))
      sources.add(birdImage(bird.id, plumage.value));
    for (const plumage of ['male', 'female', 'juvenile'])
      for (const choice of getBirdMorphConfig(bird.id, plumage)?.choices ?? [])
        for (const image of Object.values(choice.images ?? {}))
          sources.add(image);
  }
  return [...sources];
}

// The stage paints every flight image into the same square box, so the file
// itself has to be square, uncropped and centred.
void test('flight images carry their frame in the file', async () => {
  const offenders = [];
  for (const source of flightSources()) {
    const { square, clipped, offsetX, offsetY } = await frame(source);
    if (!square) offenders.push(`${source}: canvas is not square`);
    if (clipped) offenders.push(`${source}: bird touches the canvas edge`);
    if (Math.abs(offsetX) > 0.03 || Math.abs(offsetY) > 0.03)
      offenders.push(
        `${source}: off centre by ${(offsetX * 100).toFixed(1)}% / ${(offsetY * 100).toFixed(1)}%`,
      );
  }
  assert.deepEqual(offenders, [], offenders.join('\n'));
});

// Portraits share one square in every species row, so they share one grid
// too. Head shapes differ, hence the wider tolerance than in flight.
void test('portraits carry their frame in the file', async () => {
  const offenders = [];
  for (const [id, source] of Object.entries(portraitImages)) {
    const { square, clipped, offsetX, offsetY } = await frame(source);
    if (!square) offenders.push(`${id}: canvas is not square`);
    if (clipped) offenders.push(`${id}: head touches the canvas edge`);
    if (Math.abs(offsetX) > 0.06 || Math.abs(offsetY) > 0.06)
      offenders.push(
        `${id}: off centre by ${(offsetX * 100).toFixed(1)}% / ${(offsetY * 100).toFixed(1)}%`,
      );
  }
  assert.deepEqual(offenders, [], offenders.join('\n'));
});

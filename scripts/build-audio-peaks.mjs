// Waveform peaks for the call button, measured from the actual recordings.
//
// The atlas draws a small waveform beside the play control, and the bars have
// to be the shape of the call they belong to — a generated squiggle would be a
// decoration that lies about the sound. Decoding happens here, once, and the
// result is committed: the deploy is a static export and the browser must not
// download an mp3 just to draw 48 bars.
//
// Run on macOS (`afconvert` decodes the mp3); the output is checked in, so the
// Netlify build never runs this.
//
//   node scripts/build-audio-peaks.mjs
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BARS = 48;
// A bar this short still reads as a bar and not as a gap.
const FLOOR = 6;

const sources = JSON.parse(readFileSync('data/audio/sources.json', 'utf8'));
const work = mkdtempSync(join(tmpdir(), 'audio-peaks-'));

/** Mono 16-bit samples, normalised to -1…1. */
function decode(path) {
  const wav = join(work, 'decoded.wav');
  execFileSync('afconvert', [
    '-f',
    'WAVE',
    '-d',
    'LEI16@8000',
    '-c',
    '1',
    path,
    wav,
  ]);
  const file = readFileSync(wav);
  // Walk the RIFF chunks rather than assuming a 44-byte header; afconvert
  // writes a LIST chunk before the samples.
  let offset = 12;
  while (offset + 8 <= file.length) {
    const id = file.toString('ascii', offset, offset + 4);
    const size = file.readUInt32LE(offset + 4);
    if (id === 'data') {
      const samples = new Int16Array(size >> 1);
      for (let i = 0; i < samples.length; i++)
        samples[i] = file.readInt16LE(offset + 8 + i * 2);
      return samples;
    }
    offset += 8 + size + (size % 2);
  }
  throw new Error(`no data chunk in ${path}`);
}

/** RMS per bucket, normalised to the loudest bucket. */
function peaks(samples) {
  const bucket = samples.length / BARS;
  const values = [];
  for (let i = 0; i < BARS; i++) {
    const from = Math.floor(i * bucket);
    const to = Math.max(from + 1, Math.floor((i + 1) * bucket));
    let sum = 0;
    for (let s = from; s < to; s++) sum += (samples[s] / 32768) ** 2;
    values.push(Math.sqrt(sum / (to - from)));
  }
  const loudest = Math.max(...values);
  if (!loudest) return values.map(() => FLOOR);
  // The square root lifts the quiet half of the call: raptor recordings are
  // mostly silence between short bursts, and the raw RMS draws a flat line
  // with a few spikes.
  return values.map((value) =>
    Math.round(FLOOR + (100 - FLOOR) * Math.sqrt(value / loudest)),
  );
}

const result = {};
for (const source of sources.sort((a, b) => a.birdId.localeCompare(b.birdId))) {
  result[source.birdId] = peaks(decode(source.path));
  process.stdout.write(`${source.birdId} `);
}
rmSync(work, { recursive: true, force: true });

writeFileSync(
  'data/audio/peaks.json',
  JSON.stringify(result, null, 1).replace(/\n\s+(?=[\d\]])/g, ' ') + '\n',
);
console.log(
  `\n${Object.keys(result).length} recordings → data/audio/peaks.json`,
);

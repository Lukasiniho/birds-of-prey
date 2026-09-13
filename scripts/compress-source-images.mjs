import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Re-encode originals without resizing, palette reduction or lossy encoding.
// Dry run by default; --write replaces only smaller, pixel-identical PNGs.
const root = fileURLToPath(new URL('../', import.meta.url));
const directory = path.join(root, 'public');
const apply = process.argv.includes('--write');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const files = (await readdir(directory, { recursive: true }))
  .filter((file) => file.endsWith('.png') && !file.startsWith('optimized/'))
  .sort();
const results = [];
sharp.concurrency(2);

for (const file of files) {
  const source = path.join(directory, file);
  const original = await readFile(source);
  const metadata = await sharp(original).metadata();
  // Do not silently flatten animation or reduce higher-bit-depth originals.
  if (metadata.depth !== 'uchar' || (metadata.pages ?? 1) !== 1) {
    results.push({ file, before: original.length, after: original.length, skipped: true });
    continue;
  }
  const candidate = await sharp(original)
    .keepMetadata()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toBuffer();
  if (candidate.length >= original.length) {
    results.push({ file, before: original.length, after: original.length });
    continue;
  }
  const decoded = await sharp(original).raw().toBuffer({ resolveWithObject: true });
  const verified = await sharp(candidate).raw().toBuffer({ resolveWithObject: true });
  if (
    JSON.stringify(decoded.info) !== JSON.stringify(verified.info) ||
    !decoded.data.equals(verified.data)
  ) {
    throw new Error(`Pixel verification failed: ${file}; original retained`);
  }
  if (apply) {
    // Avoid overwriting an image that another task changed while we encoded it.
    if (!(await readFile(source)).equals(original))
      throw new Error(`Source changed during compression: ${file}`);
    const temporary = `${source}.compress-${process.pid}.tmp`;
    await writeFile(temporary, candidate, { flag: 'wx' });
    await rename(temporary, source);
  }
  results.push({
    file,
    before: original.length,
    after: candidate.length,
    originalSha256: hash(original),
    compressedSha256: hash(candidate),
    decodedPixelSha256: hash(decoded.data),
    pixelsIdentical: true,
  });
  if (results.length % 25 === 0) console.log(`Checked ${results.length}/${files.length} PNGs`);
}

const before = results.reduce((sum, row) => sum + row.before, 0);
const after = results.reduce((sum, row) => sum + row.after, 0);
const changed = results.filter((row) => row.after < row.before).length;
const report = { applied: apply, files: files.length, changed, before, after, results };
await mkdir(path.join(root, 'outputs'), { recursive: true });
await writeFile(
  path.join(root, 'outputs/lossless-compression.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(
  `${apply ? 'Compressed' : 'Dry run:'} ${changed}/${files.length} PNGs: ` +
  `${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB ` +
  `(${((before - after) / 1e6).toFixed(1)} MB / ${((1 - after / before) * 100).toFixed(1)}% saved).`,
);

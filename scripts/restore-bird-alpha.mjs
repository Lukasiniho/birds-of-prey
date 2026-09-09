// Restore the normal adult's exact silhouette after an Imagegen plumage edit.
// User-authorized local transparency cleanup; this never generates plumage.
// Usage: node scripts/restore-bird-alpha.mjs ORIGINAL EDIT OUTPUT
import sharp from 'sharp';

const [original, edit, output] = process.argv.slice(2);
if (!original || !edit || !output)
  throw new Error('Expected ORIGINAL EDIT OUTPUT');
const base = await sharp(original)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = base.info;
const editMetadata = await sharp(edit).metadata();
if (width / height !== editMetadata.width / editMetadata.height)
  throw new Error('Edit must retain the original aspect ratio');
const edited = await sharp(edit)
  .resize(width, height)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
if (
  width !== edited.info.width ||
  height !== edited.info.height ||
  channels !== 4
)
  throw new Error('Edit must retain the original canvas dimensions');

// Distance from the original transparent edge; use an interior feather sample
// for the narrow antialias band to remove baked-in checkerboard/white fringes.
const count = width * height;
const distance = new Uint16Array(count).fill(65535);
const queue = new Int32Array(count);
let head = 0;
let tail = 0;
for (let i = 0; i < count; i++) {
  if (base.data[i * 4 + 3] < 250) {
    distance[i] = 0;
    queue[tail++] = i;
  }
}
while (head < tail) {
  const i = queue[head++];
  const x = i % width;
  const y = Math.floor(i / width);
  const neighbors = [
    x > 0 ? i - 1 : -1,
    x + 1 < width ? i + 1 : -1,
    y > 0 ? i - width : -1,
    y + 1 < height ? i + width : -1,
  ];
  for (const n of neighbors) {
    if (n >= 0 && distance[n] > distance[i] + 1) {
      distance[n] = distance[i] + 1;
      queue[tail++] = n;
    }
  }
}
const rgb = Buffer.from(edited.data);
let cleaned = 0;
for (let i = 0; i < count; i++) {
  const p = i * 4;
  const alpha = base.data[p + 3];
  edited.data[p + 3] = alpha;
  if (!alpha) {
    edited.data.fill(0, p, p + 4);
    continue;
  }
  if (distance[i] > 2) continue;
  const x = i % width;
  const y = Math.floor(i / width);
  let best = -1;
  let bestDistance = Infinity;
  for (let dy = -6; dy <= 6; dy++) {
    for (let dx = -6; dx <= 6; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const n = ny * width + nx;
      const d = dx * dx + dy * dy;
      if (distance[n] < 3 || d >= bestDistance) continue;
      best = n;
      bestDistance = d;
    }
  }
  if (best >= 0) {
    rgb.copy(edited.data, p, best * 4, best * 4 + 3);
    cleaned++;
  } else {
    // Isolated near-transparent source pixels have no nearby feather sample.
    base.data.copy(edited.data, p, p, p + 3);
  }
}
await sharp(edited.data, { raw: edited.info }).png().toFile(output);
console.log(
  JSON.stringify({
    output,
    width,
    height,
    alpha: 'identical to original',
    edgePixelsCleaned: cleaned,
  }),
);

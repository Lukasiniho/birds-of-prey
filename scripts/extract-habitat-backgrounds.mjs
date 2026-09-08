import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sources = JSON.parse(await readFile(`${root}data/habitats/sketch-sources.json`, 'utf8'));
const images = [];

for (const source of sources.images) {
  const { data, info } = await sharp(`${root}public${source.image}`)
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const count = width * height;
  const samples = [[], [], []];
  for (let y = 0; y < height; y += 5) {
    for (let x = 0; x < width; x += 5) {
      if (x > 30 && y > 30 && x < width - 30 && y < height - 30) continue;
      const offset = (y * width + x) * channels;
      if (Math.min(data[offset], data[offset + 1], data[offset + 2]) <= 230) continue;
      for (let c = 0; c < 3; c++) samples[c].push(data[offset + c]);
    }
  }
  const paper = samples.map(values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)]);
  // Smooth paper grain in the mask only; keep the source painting sharp.
  const maskColors = await sharp(data, { raw: { width, height, channels } }).blur(0.8).raw().toBuffer();
  // Only paper connected to the canvas boundary is eligible. Enclosed white
  // details (snow, stone highlights, etc.) stay opaque.
  const distance = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    distance[i] = Math.max(...paper.map((value, c) => Math.abs(maskColors[i * channels + c] - value)));
  }
  const exterior = new Uint8Array(count);
  const queue = new Uint32Array(count);
  let head = 0;
  let tail = 0;
  function visit(i) {
    if (!exterior[i] && distance[i] <= 22) {
      exterior[i] = 1;
      queue[tail++] = i;
    }
  }
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    if (x) visit(i - 1);
    if (x < width - 1) visit(i + 1);
    if (i >= width) visit(i - width);
    if (i < count - width) visit(i + width);
  }
  const rgba = Buffer.alloc(count * 4);
  let transparent = 0;
  for (let i = 0; i < count; i++) {
    let alpha = 1;
    if (exterior[i]) {
      const t = Math.max(0, Math.min(1, (distance[i] - 10) / 12));
      alpha = t * t * (3 - 2 * t);
    }
    for (let c = 0; c < 3; c++) {
      // Remove the paper matte from partially transparent edge pixels.
      rgba[i * 4 + c] = alpha > 0
        ? Math.max(0, Math.min(255, Math.round((data[i * channels + c] - paper[c] * (1 - alpha)) / alpha)))
        : 0;
    }
    rgba[i * 4 + 3] = Math.round(alpha * 255);
    if (alpha === 0) transparent++;
  }
  const png = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const sha256 = createHash('sha256').update(png).digest('hex');
  const image = `/habitats/${source.id}-sketch-transparent-${sha256.slice(0, 10)}.png`;
  await writeFile(`${root}public${image}`, png);
  images.push({ id: source.id, reference: source.image, image, sha256, paper, transparentPixels: transparent });
  console.log(`${source.id}: ${(100 * transparent / count).toFixed(1)}% transparent`);
}

await writeFile(`${root}data/habitats/transparent-sources.json`, JSON.stringify({
  method: 'Border-connected paper extraction with soft alpha and paper-matte removal; original composition and opaque pixels preserved.',
  images,
}, null, 2) + '\n');
await writeFile(`${root}lib/habitat-images.ts`, `export const habitatImages: Record<string, string> = {\n${images.map(({ id, image }) => `  ${id}: '${image}',`).join('\n')}\n};\n`);

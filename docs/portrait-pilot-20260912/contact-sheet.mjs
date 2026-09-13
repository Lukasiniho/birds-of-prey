import fs from 'node:fs/promises';
import sharp from 'sharp';

const { records } = JSON.parse(await fs.readFile(new URL('./manifest.json', import.meta.url), 'utf8'));
const list = [{ id: 'Seeadler · Referenz', output: 'public/birds/portrait-seeadler.png' }, ...records];
const composites = [];
const backgrounds = ['#f4f2ed', '#25394b', '#769b85'];
for (let i = 0; i < list.length; i++) {
  const item = list[i];
  const left = i * 220;
  for (let b = 0; b < 3; b++) {
    composites.push({ input: await sharp(item.output).resize(208, 208).flatten({ background: backgrounds[b] }).png().toBuffer(), left: left + 6, top: 35 + b * 220 });
    for (let s = 0; s < 2; s++) {
      composites.push({ input: await sharp(item.output).resize(s ? 48 : 64, s ? 48 : 64).flatten({ background: backgrounds[b] }).png().toBuffer(), left: left + 42 + s * 85, top: 705 + b * 80 });
    }
  }
  composites.push({ input: Buffer.from(`<svg width="220" height="32"><text x="110" y="23" text-anchor="middle" font-family="Arial" font-size="16">${item.id}</text></svg>`), left, top: 0 });
}
await sharp({ create: { width: 1540, height: 950, channels: 3, background: '#dfe3e7' } }).composite(composites).webp({ quality: 95 }).toFile(new URL('./abnahme.webp', import.meta.url).pathname);

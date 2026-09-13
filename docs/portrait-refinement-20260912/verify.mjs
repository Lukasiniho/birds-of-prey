import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Historical generator must never restore mappings superseded by user feedback.
if (await fs.access('docs/portrait-user-refinements-20260913/manifest.json').then(() => true, () => false)) {
  throw new Error('Historical audit superseded. Use docs/portrait-user-refinements-20260913/verify.py; this script must not restore old mappings.');
}

const dir = 'docs/portrait-refinement-20260912/';
const manifest = JSON.parse(await fs.readFile(dir + 'manifest.json', 'utf8'));
let mapping = await fs.readFile('lib/portrait-images.ts', 'utf8');
for (const r of manifest.records) {
  r.outputSha256 = crypto.createHash('sha256').update(await fs.readFile(r.output)).digest('hex');
  mapping = mapping.replace(new RegExp(`(${r.id}: ')[^']+(')`), `$1${r.output.replace(/^public/, '')}?v=${r.outputSha256.slice(0, 12)}$2`);
}
const inventory = [];
for (const match of mapping.matchAll(/(\w+): '(\/birds\/[^']+)'/g)) {
  const id = match[1], path = 'public' + match[2].split('?')[0];
  const buffer = await fs.readFile(path);
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparentPixels = 0, opaqueEdgePixels = 0;
  const lo = [info.width, info.height], hi = [0, 0];
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const a = data[(y * info.width + x) * 4 + 3];
    if (a === 0) transparentPixels++;
    if ((x === 0 || y === 0 || x === info.width - 1 || y === info.height - 1) && a > 0) opaqueEdgePixels++;
    if (a > 128) { lo[0] = Math.min(lo[0], x); lo[1] = Math.min(lo[1], y); hi[0] = Math.max(hi[0], x); hi[1] = Math.max(hi[1], y); }
  }
  inventory.push({ id, path, sha256: crypto.createHash('sha256').update(buffer).digest('hex'), size: [info.width, info.height], transparentPixels, opaqueEdgePixels, bbox: [...lo, ...hi] });
}
const before = JSON.parse(await fs.readFile('docs/portrait-habicht-reference-20260912/inventory.json', 'utf8'));
for (const id of ['habicht', 'seeadler', 'aguja', 'wuestenbussard']) {
  if (before.find(x => x.id === id).sha256 !== inventory.find(x => x.id === id).sha256) throw Error('Approved portrait changed: ' + id);
}
if (inventory.length !== 39 || manifest.records.length !== 31 || inventory.some(x => x.opaqueEdgePixels)) throw Error('Inventory/edge check failed');
for (const r of manifest.records) {
  r.status = 'local-preview';
  r.finalAlphaCheck = inventory.find(x => x.id === r.id);
  r.visualReview = 'Original/revised comparison against unchanged Habicht at 196, 64 and 48px on light, dark and muted green backgrounds. Head, bill, crest, lower feather edge and framing visually inspected. User approval remains distinct.';
}
await fs.writeFile('lib/portrait-images.ts', mapping);
await fs.writeFile(dir + 'manifest.json', JSON.stringify(manifest, null, 2) + '\n');
await fs.writeFile(dir + 'inventory.json', JSON.stringify(inventory, null, 2) + '\n');
console.log({ portraits: inventory.length, revised: manifest.records.length, approvedUnchanged: 4, opaqueEdges: 0 });

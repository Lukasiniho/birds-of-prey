import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { birds } from '../../lib/birds.ts';
import { portraitImages } from '../../lib/portrait-images.ts';
import { imageSource } from '../../lib/optimized-images.ts';

const dir = 'docs/portrait-refinement-20260912/';
const inventory = JSON.parse(await fs.readFile(dir + 'inventory.json', 'utf8'));
const manifest = JSON.parse(await fs.readFile(dir + 'manifest.json', 'utf8'));
const approved = JSON.parse(await fs.readFile('docs/portrait-habicht-reference-20260912/inventory.json', 'utf8'));
const approvedIds = ['habicht', 'seeadler', 'aguja', 'wuestenbussard'];
const ids = birds.map(b => b.id);
const missing = ids.filter(id => !portraitImages[id]);
const extra = Object.keys(portraitImages).filter(id => !ids.includes(id));
const results = await Promise.allSettled(birds.map(async b => {
  const source = portraitImages[b.id], path = 'public' + source.split('?')[0];
  const data = await fs.readFile(path);
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  const inv = inventory.find(x => x.id === b.id);
  if (!inv || hash !== inv.sha256 || path !== inv.path) throw Error(b.id + ': inventory differs from source');
  const record = manifest.records.find(x => x.id === b.id);
  if (record && (record.output !== path || record.outputSha256 !== hash || !record.prompt || !record.referenceSha256 || !record.visualReview)) throw Error(b.id + ': provenance incomplete');
  if (approvedIds.includes(b.id) && approved.find(x => x.id === b.id).sha256 !== hash) throw Error(b.id + ': approved image changed');
  const meta = await sharp(data).metadata();
  if (!meta.hasAlpha || meta.width !== 1254 || meta.height !== 1254) throw Error(b.id + ': wrong canvas/alpha');
  const url = imageSource(source);
  if (!url.startsWith('/optimized/')) throw Error(b.id + ': optimized output missing');
  const response = await fetch('http://localhost:3000' + url);
  if (!response.ok || !response.headers.get('content-type')?.includes('image/')) throw Error(b.id + ': HTTP image failure');
  const served = Buffer.from(await response.arrayBuffer());
  const local = await fs.readFile('public' + url);
  if (!served.equals(local)) throw Error(b.id + ': served bytes differ');
  if (!(await sharp(served).metadata()).hasAlpha) throw Error(b.id + ': optimized transparency missing');
  return { id: b.id, source, sha256: hash, optimizedUrl: url, httpStatus: response.status };
}));
const failures = results.filter(x => x.status === 'rejected').map(x => String(x.reason));
console.log({ species: birds.length, mapped: Object.keys(portraitImages).length, revised: manifest.records.length, missing, extra, verified: results.filter(x => x.status === 'fulfilled').length, failures });
if (missing.length || extra.length || failures.length) process.exit(1);
await fs.writeFile(dir + 'completion-audit.json', JSON.stringify({
  checkedAt: new Date().toISOString(),
  scope: 'All existing portraits, user corrections, source integrity and localhost delivery',
  species: birds.length,
  revised: manifest.records.length,
  approvedUnchanged: approvedIds,
  visualEvidence: 'All three audit sheets and original/revised comparisons inspected; unchanged source hashes revalidated here. Actual browser rail checked separately.',
  images: results.map(x => x.value),
}, null, 2) + '\n');

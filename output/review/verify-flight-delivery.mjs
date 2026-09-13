import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { birds, plumagesFor, birdImage } from '../../lib/birds.ts';
import { getBirdMorphConfig, getBirdMorphAppearance } from '../../lib/morphs.ts';
import { imageSource } from '../../lib/optimized-images.ts';

const rows = birds.map(b => ({ id: b.id, name: b.name, states: plumagesFor(b.id).flatMap(p =>
  (getBirdMorphConfig(b.id, p.value)?.choices ?? [{ id: null, label: 'Normal' }]).map(m => {
    const src = getBirdMorphAppearance(b.id, m.id, p.value)?.image ?? birdImage(b.id, p.value);
    const bytes = fs.readFileSync('public' + src.split('?')[0]);
    return { stage: p.value, morph: m.id, label: p.label + ' / ' + m.label, src,
      optimized: imageSource(src), sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
  })
)}));
for (const row of rows) for (const state of row.states) {
  const response = await fetch('http://localhost:3000' + state.optimized);
  assert.equal(response.status, 200, state.optimized);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), fs.readFileSync('public' + state.optimized));
  state.httpVerified = true;
}
fs.writeFileSync('output/review/resolved-flight-states.json', JSON.stringify(rows, null, 2) + '\n');
fs.writeFileSync('output/review/current-flight-inventory.json', JSON.stringify(rows.map(r => ({id:r.id,
  images:[...new Map(r.states.map(s => [s.src, [s.label, s.src]])).values()]})), null, 2) + '\n');
for (const filename of ['edits.json', 'alignment-edits.json']) {
  const path = 'output/imagegen/remaining-refresh-20260913/' + filename;
  const manifest = JSON.parse(fs.readFileSync(path));
  for (const job of manifest.jobs) {
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(job.source)).digest('hex'), job.sourceSha256);
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(job.public)).digest('hex'), job.sha256);
  }
}
console.log(`Verified ${rows.length} species / ${rows.reduce((n, r) => n + r.states.length, 0)} states: optimized files served byte-exactly by localhost; nine new sources/outputs match their recorded hashes.`);

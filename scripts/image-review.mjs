// Local review board for the bird art: one grid per image type, one verdict
// per image, saved to docs/image-review/votes.json. Not part of the site.
//   npm run images:review   →   http://localhost:4300
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { birds, birdImage, plumagesFor } from '../lib/birds.ts';
import { getBirdMorphConfig } from '../lib/morphs.ts';
import { portraitImages } from '../lib/portrait-images.ts';
import { huntingImages } from '../lib/hunting-images.ts';

const root = new URL('../', import.meta.url).pathname;
const pub = resolve(root, 'public');
const votesFile = resolve(root, 'docs/image-review/votes.json');
const proposals = resolve(root, 'outputs/proposals');
const port = Number(process.env.PORT ?? 4300);

const stageLabel = { male: 'adult', female: 'female', juvenile: 'juvenile' };
const flight = birds.flatMap((b) => {
  const out = plumagesFor(b.id).map((p) => ({
    key: `${b.id}/${p.value}`,
    name: b.name,
    variant: p.label === 'Männchen' ? 'male' : stageLabel[p.value],
    src: birdImage(b.id, p.value),
  }));
  for (const c of getBirdMorphConfig(b.id)?.choices ?? [])
    for (const [stage, src] of Object.entries(c.images ?? {}))
      if (!out.some((e) => e.src === src))
        out.push({ key: `${b.id}/${c.id}-${stage}`, name: b.name, variant: `${c.label} · ${stage === 'male' && c.images.female ? 'male' : stageLabel[stage]}`, src });
  return out;
});
const single = (map) =>
  birds.filter((b) => map[b.id]).map((b) => ({ key: b.id, name: b.name, variant: '', src: map[b.id] }));
const pages = {
  portraits: { title: 'Portraits', entries: single(portraitImages) },
  flight: { title: 'Flight', entries: flight },
  hunting: { title: 'Hunting', entries: single(huntingImages) },
};
const tags = ['too painted', 'anatomy', 'legs/feet', 'wrong colours', 'pose/perspective', 'framing/size', 'cutout/halo'];

// Open questions for the reviewer, each shown as animated options (frames alternate).
const decisionsFile = resolve(proposals, 'decisions.json');
const loadDecisions = () => (existsSync(decisionsFile) ? JSON.parse(readFileSync(decisionsFile, 'utf8')) : []);
const loadVotes = () => (existsSync(votesFile) ? JSON.parse(readFileSync(votesFile, 'utf8')) : {});
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

const head = (title) => `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Image review · ${title}</title>`;
function navFor(current) {
  const votes = loadVotes(), open = loadDecisions().filter((d) => !votes.decisions?.[d.id]).length;
  return Object.entries(pages)
    .map(([t, p]) => `<a href="/${t}"${t === current ? ' aria-current="page"' : ''}>${p.title} (${Object.keys(votes[t] ?? {}).length}/${p.entries.length})</a>`)
    .join('') + `<a href="/decisions"${current === 'decisions' ? ' aria-current="page"' : ''}>Decisions${open ? ` (${open} open)` : ''}</a>`;
}

function decisionsPage() {
  const chosen = loadVotes().decisions ?? {};
  const items = loadDecisions().map((d) => `<section><h2>${esc(d.title)}</h2><div class="opts">${d.options
    .map((o) => `<label class="opt"><span class="flip">${o.frames.map((f) => `<img src="${esc(f)}" alt="">`).join('')}</span>
      <span><input type="radio" name="${esc(d.id)}" value="${esc(o.value)}"${chosen[d.id] === o.value ? ' checked' : ''}> ${esc(o.label)}</span></label>`)
    .join('')}</div></section>`);
  return `${head('Decisions')}
<style>
  :root { font: 14px/1.4 system-ui, sans-serif; color: #1d2421; background: #f6f6f3; }
  body { margin: 0; padding: 16px; } nav { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px; }
  nav a { color: inherit; } nav a[aria-current] { font-weight: 700; text-decoration: none; }
  h2 { font-size: 16px; } .opts { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .opt { background: #fff; border: 2px solid #ddd; border-radius: 8px; padding: 8px; display: grid; gap: 8px; cursor: pointer; }
  .opt:has(:checked) { border-color: #2a6fd6; }
  .flip { display: grid; background: #e8e8e4; border-radius: 4px; }
  .flip img { grid-area: 1 / 1; width: 100%; aspect-ratio: 1; object-fit: contain; }
  .flip img + img { animation: flip 1.6s steps(1) infinite; }
  @keyframes flip { 50% { opacity: 0; } }
</style>
<nav>${navFor('decisions')}</nav>${items.join('') || '<p>No open decisions.</p>'}
<script>
  document.addEventListener('change', (e) => fetch('/votes', { method: 'POST', body: JSON.stringify({ type: 'decisions', key: e.target.name, value: e.target.value }) }));
</script></html>`;
}

function page(type) {
  const { entries } = pages[type];
  const votes = loadVotes()[type] ?? {};
  const cards = entries.map(({ key, name, variant, src }) => {
    const v = votes[key] ?? {};
    const prop = resolve(proposals, type, key + '.png');
    const propSrc = existsSync(prop) && `/proposals/${type}/${key}.png?t=${statSync(prop).mtimeMs}`;
    // A decision belongs to the proposal file it was made on; a redone proposal starts open.
    const p = v.proposalSrc && v.proposalSrc !== propSrc ? {} : v;
    const radio = (field, value, label) =>
      `<label><input type="radio" name="${esc(key)}#${field}" value="${value}"${(field === 'proposal' ? p : v)[field] === value ? ' checked' : ''}> ${label}</label>`;
    const img = (s) => `<a href="${esc(s)}" target="_blank"><img loading="lazy" src="${esc(s)}" alt=""></a>`;
    return `<article class="card${propSrc ? ' has-prop' : ''}" data-key="${esc(key)}" data-src="${esc(src)}" data-prop="${esc(propSrc || '')}">
  ${propSrc ? `<div class="pair">${img(src)}${img(propSrc)}</div><div class="row"><small>current</small><small>proposal</small></div>` : img(src)}
  <h2>${esc(name)} <small>${esc(variant)}</small></h2>
  <div class="row verdict">${radio('verdict', 'good', 'Good')}${radio('verdict', 'issue', 'Issue')}${radio('verdict', 'reference', 'Reference')}</div>
  <div class="row issue">${tags.map((t) => `<label class="tag"><input type="checkbox" value="${t}"${v.tags?.includes(t) ? ' checked' : ''}> ${t}</label>`).join('')}</div>
  <textarea class="note" rows="2" placeholder="What is wrong? e.g. legs too long, looks painted">${esc(v.note ?? '')}</textarea>
  ${propSrc ? `<div class="row proposal"><b>Proposal:</b>${radio('proposal', 'accept', 'Accept')}${radio('proposal', 'reject', 'Reject')}</div>
  <textarea class="proposal-note" rows="2" placeholder="Feedback on the proposal">${esc(p.proposalNote ?? '')}</textarea>` : ''}
</article>`;
  });
  const nav = navFor(type);
  return `${head(pages[type].title)}
<style>
  :root { --bg: #e8e8e4; font: 14px/1.4 system-ui, sans-serif; color: #1d2421; background: #f6f6f3; }
  body { margin: 0; padding: 16px; }
  nav { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-bottom: 16px; }
  nav a { color: inherit; } nav a[aria-current] { font-weight: 700; text-decoration: none; }
  main { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .card { background: #fff; border: 2px solid #ddd; border-radius: 8px; padding: 8px; display: grid; gap: 8px; }
  .card:has([value=good]:checked) { border-color: #3a9a5b; }
  .card:has([value=issue]:checked) { border-color: #d0682c; }
  .card:has([value=reference]:checked) { border-color: #2a6fd6; }
  .card:not(:has([value=issue]:checked)) .issue { display: none; }
  body.open .card:not(.has-prop):has(.verdict :checked), body.open .card.has-prop:has(.proposal :checked) { display: none; }
  body.props .card:not(.has-prop) { display: none; }
  @media (min-width: 600px) { .card.has-prop { grid-column: span 2; } }
  .pair, .pair + .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  img { width: 100%; aspect-ratio: 1; object-fit: contain; background: var(--bg); border-radius: 4px; display: block; }
  h2 { font-size: 15px; margin: 0; } small { font-weight: 400; color: #667; }
  .row { display: flex; flex-wrap: wrap; gap: 4px 12px; }
  .tag { font-size: 12px; } textarea { font: inherit; width: 100%; box-sizing: border-box; }
</style>
<nav>${nav}
  <label><input type="checkbox" onchange="document.body.classList.toggle('open', this.checked)"> open only</label>
  <label><input type="checkbox" onchange="document.body.classList.toggle('props', this.checked)"> proposals only</label>
  <label>background <select onchange="document.documentElement.style.setProperty('--bg', this.value)">
    <option value="#e8e8e4">light</option><option value="#22282a">dark</option><option value="#2d7f7a">teal</option></select></label>
</nav>
<main>${cards.join('\n')}</main>
<script>
  document.addEventListener('change', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    fetch('/votes', { method: 'POST', body: JSON.stringify({
      type: ${JSON.stringify(type)}, key: card.dataset.key, src: card.dataset.src,
      verdict: card.querySelector('.verdict :checked')?.value ?? null,
      tags: [...card.querySelectorAll('.tag input:checked')].map((i) => i.value),
      note: card.querySelector('.note').value.trim(),
      ...(card.classList.contains('has-prop') && {
        proposal: card.querySelector('.proposal :checked')?.value ?? null,
        proposalSrc: card.dataset.prop,
        proposalNote: card.querySelector('.proposal-note').value.trim(),
      }),
    }) }).then((r) => { if (!r.ok) alert('Not saved: ' + r.status); });
  });
</script></html>`;
}

const types = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && pathname === '/votes') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const { type, key, ...vote } = JSON.parse(body);
      if (!pages[type] && type !== 'decisions') return res.writeHead(400).end();
      const votes = loadVotes();
      (votes[type] ??= {})[key] = type === 'decisions' ? vote.value : vote;
      mkdirSync(resolve(votesFile, '..'), { recursive: true });
      writeFileSync(votesFile, JSON.stringify(votes, null, 2) + '\n');
      res.writeHead(204).end();
    });
    return;
  }
  if (pathname === '/') return res.writeHead(302, { location: '/portraits' }).end();
  const type = pathname.slice(1);
  if (type === 'decisions') return res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(decisionsPage());
  if (pages[type]) return res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(page(type));
  const base = pathname.startsWith('/proposals/') ? proposals : pub;
  const file = resolve(base, '.' + decodeURIComponent(pathname.replace(/^\/proposals/, '')));
  if (!file.startsWith(base + '/') || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }).end(readFileSync(file));
}).listen(port, () => console.log(`Image review: http://localhost:${port}`));

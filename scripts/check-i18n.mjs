// Prüft, ob jeder deutsche Text eine englische Übersetzung hat.
// Run with --experimental-strip-types so the TypeScript data modules load.
//
// Schlüssel kommen aus zwei Quellen:
//   1. `t('…')` und `msg('…')` im Quelltext von app/, components/ und lib/
//   2. jeder Text in den exportierten Daten der Module in lib/ (Arten, Glossar …)
// Fehlende Schlüssel nennt das Skript; `--missing <datei>` schreibt sie als
// JSON-Gerüst `{ "deutsch": "" }` zum Übersetzen.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const keys = new Map(); // key → first place it was found

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'ui' && name !== 'node_modules') yield* files(path);
    } else if (/\.(ts|tsx)$/.test(name)) yield path;
  }
}

// 1. Literal arguments of t()/msg(), single-line or wrapped.
const call = /\b(?:t|msg)\(\s*(['"])((?:\\.|(?!\1).)*)\1\s*[,)]/gs;
for (const dir of ['app', 'components', 'lib'])
  for (const path of files(join(root, dir))) {
    const source = readFileSync(path, 'utf8');
    for (const match of source.matchAll(call)) {
      const key = match[2].replace(/\\(['"\\])/g, '$1');
      if (!keys.has(key)) keys.set(key, path.slice(root.length + 1));
    }
  }

// 2. Strings inside exported data. Same exclusions as localize() in lib/i18n.ts.
const fixedKeys = new Set([
  'id',
  'key',
  'href',
  'url',
  'src',
  'slug',
  'source',
  'sources',
  'image',
  'portrait',
  'latin',
  'licenseUrl',
]);
// Not display text: ids, paths, colours, file names, URLs.
// Lowercase ASCII words are ids (prey keys, tags); display words are capitalised.
const technical =
  /^(?:[a-z0-9]+(?:[_.:/-][a-z0-9]+)*|[0-9_.:/-]+|#[0-9a-fA-F]{3,8}|https?:.*|\/.*|.*\.(?:webp|png|jpg|svg|mp3|m4a|json))$/;
const skipModules = new Set([
  // Englische Artnamen kommen direkt aus data/taxonomy.json.
  'taxonomy.ts',
  'i18n.ts',
]);
function walk(value, key, where) {
  if (typeof value === 'string') {
    if (fixedKeys.has(key) || technical.test(value) || !/\p{L}{2}/u.test(value))
      return;
    if (!keys.has(value)) keys.set(value, where);
  } else if (Array.isArray(value)) value.forEach((item) => walk(item, key, where));
  else if (value && typeof value === 'object' && value.constructor === Object)
    for (const [k, v] of Object.entries(value)) walk(v, k, where);
}
const dataModules = [
  ...readdirSync(join(root, 'lib'))
    .sort()
    .filter((name) => !skipModules.has(name))
    .map((name) => `lib/${name}`),
  'app/wissen/knowledge-data.ts',
  'components/quiz/modes.ts',
].filter((path) => path.endsWith('.ts'));
for (const path of dataModules) {
  let exports;
  try {
    exports = await import(pathToFileURL(join(root, path)).href);
  } catch {
    continue; // Module with Next-only imports carry no data.
  }
  for (const [exportName, value] of Object.entries(exports))
    if (typeof value !== 'function') walk(value, exportName, path);
}

const dir = join(root, 'lib/i18n/en');
const dict = Object.assign(
  {},
  ...readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(readFileSync(join(dir, name), 'utf8'))),
);
const missing = [...keys].filter(([key]) => !dict[key]?.trim());

const out = process.argv.indexOf('--missing');
if (out > 0)
  writeFileSync(
    process.argv[out + 1],
    JSON.stringify(
      Object.fromEntries(missing.map(([key, where]) => [key, where])),
      null,
      2,
    ),
  );
if (missing.length) {
  for (const [key, where] of missing.slice(0, 40))
    console.error(`${where}: ${JSON.stringify(key)}`);
  console.error(
    `\n${missing.length} of ${keys.size} texts have no English translation in lib/i18n/en/.`,
  );
  process.exit(1);
}
console.log(`i18n: all ${keys.size} texts translated.`);

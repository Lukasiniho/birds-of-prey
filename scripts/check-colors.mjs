// Colour guard: literal colours belong in app/colors.css only, and color-mix
// call sites use the shared --tint-* steps. Runs as part of `npm run lint`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanRoots = ['app', 'components', 'hooks'];
const allowedFile = 'app/colors.css';
// Library primitives are not edited (see docs/design-system.md); species data
// in lib/ carries plumage swatches, which are content, not UI colours.
const skipDirs = new Set(['components/ui', 'node_modules']);
const extensions = new Set(['.css', '.tsx', '.ts']);

const literal =
  /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\boklab\(/g;
const freeMix = /color-mix\([^)]*?\b\d+(?:\.\d+)?%/g;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const rel = relative(root, path);
    if (skipDirs.has(rel)) continue;
    if (statSync(path).isDirectory()) yield* walk(path);
    else if ([...extensions].some((ext) => path.endsWith(ext))) yield rel;
  }
}

const findings = [];
for (const scanRoot of scanRoots) {
  for (const file of walk(join(root, scanRoot))) {
    if (file === allowedFile) continue;
    const lines = readFileSync(join(root, file), 'utf8').split('\n');
    lines.forEach((line, index) => {
      const code = line.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
      // URL fragments and CSS ids (#root) are not colours.
      const stripped = code.replace(/url\([^)]*\)/g, '').replace(/#[a-zA-Z_-][\w-]*(?![0-9a-fA-F])/g, '');
      for (const match of stripped.match(literal) ?? []) {
        findings.push(`${file}:${index + 1}: literal colour ${match.trim()}`);
      }
      for (const match of code.match(freeMix) ?? []) {
        findings.push(`${file}:${index + 1}: free percentage in ${match} — use var(--tint-N)`);
      }
    });
  }
}

if (findings.length) {
  console.error('Colour roles live in app/colors.css. Move these into a role:');
  for (const finding of findings) console.error('  ' + finding);
  process.exit(1);
}
console.log('check-colors: no literal colours outside app/colors.css');

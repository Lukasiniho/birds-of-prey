// Design-system guard. Roles are defined centrally; call sites use them.
// Runs as the first step of `npm run lint`.
//
// Checks
//   1. literal colours outside app/colors.css
//   2. color-mix with a free percentage instead of a --tint-N step
//   3. raw font-size outside app/typography.css
//   4. raw border-radius outside app/design-system.css
//   5. media-query widths outside the shared breakpoint set
//   6. a ui primitive that app/globals.css keeps out of the Tailwind scan but
//      that something imports again — its utilities would be missing
//
// A deliberate exception carries `design-lint-allow` in a comment on the same
// line or the line above, together with its reason.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanRoots = ['app', 'components', 'hooks'];
// Library primitives are not restyled (see docs/design-system.md); species data
// in lib/ carries plumage swatches, which are content, not UI colours.
const skipDirs = new Set(['components/ui', 'node_modules']);
const extensions = ['.css', '.tsx', '.ts'];

const colorFile = 'app/colors.css';
const typeFile = 'app/typography.css';
const radiusFile = 'app/design-system.css';
const breakpoints = [390, 640, 641, 760, 761, 980, 981, 1190, 1600];

const hex = /#[0-9a-fA-F]{3,8}(?![\w-])/g;
const colorFunction = /\b(?:rgba?|hsla?|oklch|oklab)\(/g;
const freeMix = /color-mix\([^)]*?\b\d+(?:\.\d+)?%/g;
const rawFontSize = /font-size:[^;]*?\d+(?:\.\d+)?(?:px|rem|em|pt)/g;
const rawRadius = /border-radius:\s*([^;]+)/g;
const mediaWidth = /\((?:min|max)-width:\s*(\d+)px\)/g;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const rel = relative(root, path);
    if (skipDirs.has(rel)) continue;
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (extensions.some((ext) => path.endsWith(ext))) yield rel;
  }
}

const findings = [];
for (const scanRoot of scanRoots) {
  for (const file of walk(join(root, scanRoot))) {
    const lines = readFileSync(join(root, file), 'utf8').split('\n');
    lines.forEach((line, index) => {
      const allowed =
        /design-lint-allow/.test(line) ||
        /design-lint-allow/.test(lines[index - 1] ?? '');
      if (allowed) return;
      const add = (message) =>
        findings.push(`${file}:${index + 1}: ${message}`);
      const code = line.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');

      if (file !== colorFile) {
        const stripped = code.replace(/url\([^)]*\)/g, '');
        for (const match of stripped.matchAll(hex)) {
          const digits = match[0].length - 1;
          // An id selector (#root) is not a colour, and neither is a hash that
          // is not a valid hex length. A colour always sits in a declaration or
          // a JSX prop, so it follows a colon on the same line.
          if (![3, 4, 6, 8].includes(digits)) continue;
          if (!stripped.slice(0, match.index).includes(':')) continue;
          add(`literal colour ${match[0]} — use a role from ${colorFile}`);
        }
        for (const match of stripped.match(colorFunction) ?? []) {
          add(`literal colour ${match}…) — use a role from ${colorFile}`);
        }
        for (const match of code.match(freeMix) ?? []) {
          add(`free percentage in ${match} — use var(--tint-N)`);
        }
      }
      if (file !== typeFile) {
        for (const match of code.match(rawFontSize) ?? []) {
          add(`raw size in "${match.trim()}" — use a --type-* role`);
        }
      }
      if (file !== radiusFile) {
        for (const [, value] of code.matchAll(rawRadius)) {
          const clean = value.trim();
          if (/var\(|^0$|^50%$|^inherit$/.test(clean)) continue;
          add(`raw border-radius ${clean} — use a --radius-* role`);
        }
      }
      // Container queries measure an element, not the viewport, so they are not
      // part of the shared breakpoint set.
      if (code.includes('@media')) {
        for (const [, width] of code.matchAll(mediaWidth)) {
          if (breakpoints.includes(Number(width))) continue;
          add(
            `breakpoint ${width}px is not in the shared set (${breakpoints.join(', ')})`,
          );
        }
      }
    });
  }
}

// app/globals.css drops the unused shadcn primitives from Tailwind's scan, which
// is only safe as long as nothing imports them: their utility classes would not
// be generated and the component would render unstyled.
const globals = readFileSync(join(root, 'app/globals.css'), 'utf8');
const excluded = [
  ...globals.matchAll(/@source not "\.\.\/components\/ui\/([\w-]+)\.tsx";/g),
].map(([, name]) => name);
for (const dir of scanRoots) {
  for (const path of walk(join(root, dir))) {
    if (!path.endsWith('.tsx') && !path.endsWith('.ts')) continue;
    const code = readFileSync(path, 'utf8');
    for (const name of excluded) {
      if (!code.includes(`components/ui/${name}'`)) continue;
      findings.push(
        `${relative(root, path)}: imports components/ui/${name}, which ` +
          'app/globals.css keeps out of the Tailwind scan — drop its ' +
          '`@source not` line there, or the component ships unstyled',
      );
    }
  }
}

if (findings.length) {
  console.error(
    'Design-system roles are defined centrally. Fix these call sites\n' +
      '(or mark a documented exception with a design-lint-allow comment):',
  );
  for (const finding of findings) console.error('  ' + finding);
  process.exit(1);
}
console.log(
  'check-design-system: colours, sizes, radii and breakpoints are on their roles',
);

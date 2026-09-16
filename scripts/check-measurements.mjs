// Measurement grid guard for the species data in lib/.
// Runs as a step of `npm run lint`.
//
// Körperlänge und Spannweite stehen immer auf dem 5-cm-Raster: beide Enden von
// `length: [min, max]` und `span: [min, max]` sind durch 5 teilbar. Quellen
// nennen zentimetergenaue Werte; auf der Seite wäre das Scheingenauigkeit.
// Wer abweicht, wird auf das nächste 5er-Increment gerundet — `--fix`
// schreibt die gerundeten Werte direkt in die Datei.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const dataRoot = 'lib';
const fix = process.argv.includes('--fix');
// Only the data literals: `  span: [110, 140],` on a line of its own.
const measurement = /^(\s*)(span|length): \[(\d+), (\d+)\],$/;

const toGrid = (cm) => Math.round(cm / 5) * 5;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (path.endsWith('.ts')) yield relative(root, path);
  }
}

const findings = [];
const fixed = [];
for (const file of walk(join(root, dataRoot))) {
  const lines = readFileSync(join(root, file), 'utf8').split('\n');
  let changed = false;
  lines.forEach((line, index) => {
    const match = measurement.exec(line);
    if (!match) return;
    const [, indent, key, rawMin, rawMax] = match;
    const [min, max] = [Number(rawMin), Number(rawMax)];
    if (min % 5 === 0 && max % 5 === 0) return;
    const rounded = [toGrid(min), toGrid(max)];
    const label = key === 'span' ? 'Spannweite' : 'Körperlänge';
    if (rounded[0] >= rounded[1]) {
      findings.push(
        `${file}:${index + 1}: ${label} [${min}, ${max}] — gerundet fiele die ` +
          'Spanne auf einen Wert zusammen; Quelle prüfen und eine echte ' +
          'Spanne auf dem 5er-Raster wählen',
      );
      return;
    }
    if (fix) {
      lines[index] = `${indent}${key}: [${rounded[0]}, ${rounded[1]}],`;
      changed = true;
      fixed.push(
        `${file}:${index + 1}: ${label} [${min}, ${max}] → ` +
          `[${rounded[0]}, ${rounded[1]}]`,
      );
      return;
    }
    findings.push(
      `${file}:${index + 1}: ${label} [${min}, ${max}] steht nicht auf dem ` +
        `5-cm-Raster — runden auf [${rounded[0]}, ${rounded[1]}]`,
    );
  });
  if (changed) writeFileSync(join(root, file), lines.join('\n'));
}

for (const entry of fixed) console.log('  ' + entry);
if (findings.length) {
  console.error(
    'Körperlänge und Spannweite stehen immer auf dem 5-cm-Raster.\n' +
      'Abweichungen auf das nächste 5er-Increment runden ' +
      '(`node scripts/check-measurements.mjs --fix`):',
  );
  for (const finding of findings) console.error('  ' + finding);
  process.exit(1);
}
console.log(
  `check-measurements: Körperlänge und Spannweite auf dem 5-cm-Raster${
    fixed.length ? ` (${fixed.length} gerundet)` : ''
  }`,
);

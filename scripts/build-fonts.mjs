/**
 * Erzeugt die selbst gehosteten Schriftsubsets in app/fonts/.
 *
 * Kein Teil von `npm run build`: die Dateien liegen im Repository. Von Hand
 * aufrufen, wenn der Zeichenvorrat wächst oder Google die Schrift neu baut.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i))
    .join('');

// Die Texte benutzen heute 129 Zeichen; das hier ist großzügig darüber, ohne
// das komplette Latin-1-Supplement mitzuschleppen.
const CHARSET =
  range(0x20, 0x7e) + // ASCII
  'ÄÖÜäöüß' + // Deutsch
  'ÀÁÂÃÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕØÙÚÛÝŸ' + // west- und südeuropäische Namen
  'àáâãåæçèéêëìíîïñòóôõøùúûýÿ' +
  'ĀāĒēĪīŌōŪū' + // Makronen aus wissenschaftlichen Namen
  'ĆćČčŁłŃńŘřŚśŠšŹźŻżŽž' + // ost- und mitteleuropäische Namen
  '–—‘’‚“”„†•…‹›′″·°' +
  '€→←↔≈≤≥×÷♀♂';

// Jede Familie bringt ihre eigene Achse mit: EB Garamond reicht bis 800,
// Inter endet bei 700 — eine gemeinsame Obergrenze würde eine der beiden
// entweder beschneiden oder über ihren Bereich hinaus anfragen.
const DISPLAY_AXES = { wght: { min: 400, max: 800 } };
const BODY_AXES = { wght: { min: 400, max: 700 } };

// Google liefert woff2 nur an Browser aus.
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

const families = [
  {
    file: 'eb-garamond-latin.woff2',
    css: 'family=EB+Garamond:wght@400..800',
    axes: DISPLAY_AXES,
  },
  {
    file: 'eb-garamond-latin-italic.woff2',
    css: 'family=EB+Garamond:ital,wght@1,400..800',
    axes: DISPLAY_AXES,
  },
  {
    file: 'inter-latin.woff2',
    css: 'family=Inter:wght@400..700',
    axes: BODY_AXES,
  },
];

const output = fileURLToPath(new URL('../app/fonts/', import.meta.url));
await mkdir(output, { recursive: true });

for (const { file, css, axes } of families) {
  const sheet = await fetch(
    `https://fonts.googleapis.com/css2?${css}&display=swap`,
    { headers: { 'User-Agent': BROWSER_UA } },
  ).then((response) => {
    if (!response.ok) throw new Error(`${css}: HTTP ${response.status}`);
    return response.text();
  });
  // Das Latin-Basis-Subset trägt die unicode-range ab U+0000-00FF.
  const block = sheet
    .split('@font-face')
    .find((part) => part.includes('U+0000-00FF'));
  if (!block) throw new Error(`${css}: kein Latin-Subset in der CSS-Antwort`);
  const url = /url\((https:[^)]+\.woff2)\)/.exec(block)?.[1];
  if (!url) throw new Error(`${css}: keine woff2-Quelle im Latin-Subset`);
  const source = Buffer.from(await (await fetch(url)).arrayBuffer());
  const subset = await subsetFont(source, CHARSET, {
    targetFormat: 'woff2',
    variationAxes: axes,
  });
  await writeFile(path.join(output, file), subset);
  const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
  console.log(`${file}: ${kb(source.length)} → ${kb(subset.length)}`);
}

/**
 * Stuft die `<link rel="modulepreload">` des Exports auf `fetchpriority="low"`.
 *
 * React meldet jeden Client-Chunk als modulepreload an; der Browser holt sie
 * dann so dringlich wie Stylesheet und Heldenbild, obwohl sie erst gebraucht
 * werden, wenn schon etwas zu sehen ist. Gemessen: FCP 2,6 s → 1,5 s.
 *
 * Als Nachbearbeitung, weil die Tags aus Reacts Float-Schicht kommen und weder
 * vinext noch Next einen Schalter dafür haben.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const client = fileURLToPath(new URL('../dist/client/', import.meta.url));

async function htmlFilesIn(directory) {
  const found = [];
  const entries = await readdir(directory, { withFileTypes: true }).catch(
    // Nur der statische Export legt HTML ab; sonst gibt es hier nichts zu tun.
    () => [],
  );
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFilesIn(full)));
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

const modulePreload = /<link rel="modulepreload"(?![^>]*fetchpriority)[^>]*?>/gi;
let files = 0;
let links = 0;
for (const file of await htmlFilesIn(client)) {
  const html = await readFile(file, 'utf8');
  let touched = 0;
  const next = html.replace(modulePreload, (tag) => {
    touched += 1;
    return `${tag.slice(0, -1).replace(/\/$/, '').trimEnd()} fetchpriority="low">`;
  });
  if (!touched) continue;
  await writeFile(file, next);
  files += 1;
  links += touched;
}
console.log(`Hydration preloads: ${links} links across ${files} pages set to low priority.`);

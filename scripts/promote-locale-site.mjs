/**
 * Schreibt das englische Wörterbuch als /i18n-en.js (im Dev-Server liefert es
 * app/i18n-en.js/route.ts; der statische Export übernimmt Route-Handler nicht).
 *
 * Die englische Netlify-Site (NEXT_PUBLIC_SITE_LOCALE=en, raptoratlas.com)
 * liefert den Export unter `en/` an der Wurzel aus: `en/wissen.html` →
 * `wissen.html`, `en.html` → `index.html`. Robots und Manifest folgen.
 * Die deutsche Site leitet `/en/*` per public/_redirects dorthin um.
 */
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { en } from '../lib/i18n/en.ts';

const client = fileURLToPath(new URL('../dist/client/', import.meta.url));
await writeFile(
  path.join(client, 'i18n-en.js'),
  `window.__I18N_EN__=${JSON.stringify(en)};`,
);

if (process.env.NEXT_PUBLIC_SITE_LOCALE === 'en') {
  const english = path.join(client, 'en');
  const move = async (from, to) => {
    await rm(to, { recursive: true, force: true });
    await rename(from, to);
  };
  for (const name of await readdir(english))
    await move(path.join(english, name), path.join(client, name));
  await rm(english, { recursive: true });
  for (const ext of ['html', 'rsc'])
    await move(
      path.join(client, `en.${ext}`),
      path.join(client, `index.${ext}`),
    );
  // Nur Deutsch, auf raptoratlas.com nicht erreichbar.
  for (const name of ['styleguide.html', 'styleguide.rsc'])
    await rm(path.join(client, name), { force: true });

  const robots = path.join(client, 'robots.txt');
  await writeFile(
    robots,
    (await readFile(robots, 'utf8')).replaceAll(
      'https://greifvogelkompass.de',
      'https://raptoratlas.com',
    ),
  );
  const manifestPath = path.join(client, 'site.webmanifest');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  await writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        ...manifest,
        name: 'Raptor Atlas',
        short_name: 'Raptor Atlas',
        description:
          'Discover birds of prey: species, habitats, plumage colours and prey.',
        lang: 'en',
      },
      null,
      2,
    )}\n`,
  );
  console.log('English site promoted to the export root.');
}

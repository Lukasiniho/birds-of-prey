// Writes public/sitemap.xml from the static routes and every species page.
// Run with --experimental-strip-types so the TypeScript data modules load.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { birdHref, birdsBySlug } from '../lib/bird-routes.ts';
import { SITE_URL } from '../lib/site.ts';

const sections = ['/', '/quiz', '/wissen', '/falknerei'];
const species = Object.values(birdsBySlug).map(birdHref).sort();
const entry = (path, priority, changefreq) =>
  `  <url>\n    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sections.map((path) =>
    entry(path, path === '/' ? '1.0' : '0.8', 'weekly'),
  ),
  ...species.map((path) => entry(path, '0.7', 'monthly')),
  '</urlset>',
  '',
].join('\n');
const target = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
await writeFile(target, xml);
console.log(
  `Sitemap: ${sections.length + species.length} URLs → public/sitemap.xml`,
);

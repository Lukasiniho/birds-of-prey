// Writes public/sitemap.xml from the static routes and every species page.
// Run with --experimental-strip-types so the TypeScript data modules load.
// The English Netlify site (NEXT_PUBLIC_SITE_LOCALE=en) lists raptoratlas.com.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import {
  birdHref,
  birdFullscreenHref,
  birdTaxonomyHref,
  birdsBySlug,
} from '../lib/bird-routes.ts';
import { siteUrl } from '../lib/i18n.ts';

const locale = process.env.NEXT_PUBLIC_SITE_LOCALE === 'en' ? 'en' : 'de';
const sections = ['/', '/quiz', '/wissen', '/falknerei'];
const species = Object.values(birdsBySlug)
  .flatMap((bird) => [
    birdHref(bird),
    birdFullscreenHref(bird),
    birdTaxonomyHref(bird),
  ])
  .sort();
const entry = (path, priority, changefreq) =>
  `  <url>\n    <loc>${siteUrl(path, locale)}</loc>\n${['de', 'en'].map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl(path, lang)}"/>\n`).join('')}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
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

// Writes public/sitemap.xml from the static routes and every species page.
// Run with --experimental-strip-types so the TypeScript data modules load.
// The English Netlify site (NEXT_PUBLIC_SITE_LOCALE=en) lists raptoratlas.com.
import { execFileSync } from 'node:child_process';
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
// Files whose last commit dates a page's content. Species data lives in lib/
// and data/, so every page counts those; sections add their own folders.
const contentPaths = ['lib', 'data'];
const sectionPaths = {
  '/': ['app/raptor-app.tsx', 'public/birds'],
  '/quiz': ['app/quiz', 'components/quiz'],
  '/wissen': ['app/wissen'],
  '/falknerei': ['app/falknerei', 'public/falknerei'],
};
// Last commit date (YYYY-MM-DD) for the paths, or undefined without git.
function lastModified(paths) {
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', ...contentPaths, ...paths],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return date || undefined;
  } catch {
    return undefined;
  }
}

const sections = Object.keys(sectionPaths);
const species = Object.values(birdsBySlug)
  .flatMap((bird) => [
    birdHref(bird),
    birdFullscreenHref(bird),
    birdTaxonomyHref(bird),
  ])
  .sort();
const speciesLastmod = lastModified([
  'app/raptor-app.tsx',
  'app/species-page.tsx',
  'public/birds',
]);
const entry = (path, priority, changefreq, lastmod) =>
  [
    '  <url>',
    `    <loc>${siteUrl(path, locale)}</loc>`,
    ...['de', 'en'].map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl(path, lang)}"/>`,
    ),
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sections.map((path) =>
    entry(
      path,
      path === '/' ? '1.0' : '0.8',
      'weekly',
      lastModified(sectionPaths[path]),
    ),
  ),
  ...species.map((path) => entry(path, '0.7', 'monthly', speciesLastmod)),
  '</urlset>',
  '',
].join('\n');
const target = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
await writeFile(target, xml);
console.log(
  `Sitemap: ${sections.length + species.length} URLs → public/sitemap.xml`,
);

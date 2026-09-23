// Run after NETLIFY=true npm run build: inspect the HTML actually served by Netlify.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { birds } from '../lib/birds.ts';
import { birdHref, birdFullscreenHref } from '../lib/bird-routes.ts';
import { SITE_URL } from '../lib/site.ts';

const readPage = (href) =>
  readFileSync(new URL(`../dist/client${href}.html`, import.meta.url), 'utf8');

void test('every exported fullscreen page has indexable content and its own canonical/share URL', () => {
  for (const bird of birds) {
    const href = birdFullscreenHref(bird);
    const html = readPage(href);
    // Text hidden inside hydration payloads does not count as rendered content.
    const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.match(rendered, /<main\b/, href);
    assert.match(rendered, /<h1\b[^>]*>[^<]+<\/h1>/, href);
    for (const section of ['Steckbrief', 'Nahrung', 'Vorkommen']) {
      assert.ok(
        rendered.includes(`aria-label="${section}"`),
        `${href}: ${section}`,
      );
    }
    for (const heading of [
      'Erkennungsmerkmale',
      'Nahrungsbeispiele',
      'Verbreitung',
      'Lebensraum',
    ]) {
      assert.ok(rendered.includes(`>${heading}</h2>`), `${href}: ${heading}`);
    }
    assert.ok(
      rendered.includes(`<link rel="canonical" href="${SITE_URL}${href}"`),
      href,
    );
    assert.ok(
      rendered.includes(`<meta property="og:url" content="${SITE_URL}${href}"`),
      href,
    );
    assert.match(rendered, /<meta name="robots" content="index, follow"/, href);
    assert.ok(
      readPage(birdHref(bird)).includes(`href="${href}"`),
      `${href}: discoverable from atlas`,
    );
  }
});

void test('sitemap lists both species views without creating indexed tab URLs', () => {
  const sitemap = readFileSync(
    new URL('../public/sitemap.xml', import.meta.url),
    'utf8',
  );
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => !url.includes('?')));
  for (const bird of birds) {
    assert.ok(urls.includes(SITE_URL + birdHref(bird)));
    assert.ok(urls.includes(SITE_URL + birdFullscreenHref(bird)));
  }
});

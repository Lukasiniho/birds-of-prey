import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds } from '../lib/birds.ts';
import {
  birdHref,
  birdForPath,
  birdsBySlug,
  birdFullscreenHref,
  isBirdFullscreenPath,
  birdInfoSearch,
  birdInfoTabForSearch,
} from '../lib/bird-routes.ts';
import { speciesRecords, huntingTypes } from '../lib/ecology.ts';
void test('all species have unique scientific-name routes that resolve on direct visits', () => {
  assert.equal(Object.keys(birdsBySlug).length, birds.length);
  assert.equal(
    birdHref(birds.find((b) => b.id === 'habicht')!),
    '/astur-gentilis',
  );
  for (const b of birds) {
    assert.match(birdHref(b), /^\/[a-z]+-[a-z-]+$/);
    assert.equal(birdForPath(birdHref(b))?.id, b.id);
    assert.equal(birdForPath(birdHref(b) + '/')?.id, b.id);
  }
  assert.equal(birdForPath('/nicht-vorhanden'), undefined);
});
void test('every fullscreen page resolves to its species without accepting unknown nested routes', () => {
  for (const bird of birds) {
    const href = birdFullscreenHref(bird);
    assert.equal(href, `${birdHref(bird)}/steckbrief`);
    assert.equal(birdForPath(href)?.id, bird.id);
    assert.equal(birdForPath(`${href}/`)?.id, bird.id);
    assert.equal(isBirdFullscreenPath(href), true);
    assert.equal(isBirdFullscreenPath(`${href}/`), true);
    assert.equal(isBirdFullscreenPath(birdHref(bird)), false);
    assert.equal(birdForPath(`${birdHref(bird)}/unknown`), undefined);
    assert.equal(birdForPath(`${href}/unknown`), undefined);
  }
  assert.equal(birdForPath('/nicht-vorhanden/steckbrief'), undefined);
  assert.equal(isBirdFullscreenPath('/nicht-vorhanden/steckbrief'), false);
});
void test('information tabs round-trip as query state with a clean default and safe fallback', () => {
  for (const tab of ['profil', 'nahrung', 'lebensraum'] as const) {
    assert.equal(birdInfoTabForSearch(birdInfoSearch('', tab)), tab);
    assert.equal(
      birdInfoTabForSearch(birdInfoSearch('?source=shared', tab)),
      tab,
    );
    assert.equal(
      new URLSearchParams(birdInfoSearch('?source=shared', tab)).get('source'),
      'shared',
    );
  }
  assert.equal(birdInfoSearch('', 'nahrung'), '?tab=nahrung');
  assert.equal(birdInfoSearch('?tab=nahrung', 'lebensraum'), '?tab=vorkommen');
  assert.equal(birdInfoSearch('?tab=vorkommen', 'profil'), '');
  assert.equal(birdInfoTabForSearch('?tab=steckbrief'), 'profil');
  assert.equal(birdInfoTabForSearch('?tab=unknown'), 'profil');
  assert.equal(birdInfoTabForSearch(''), 'profil');
});
void test('hunting titles and tags share one vocabulary and reviewed multi-technique species retain their methods', () => {
  for (const b of speciesRecords)
    assert.equal(
      b.ecology.hunting.title,
      b.ecology.huntingTags.map((id) => huntingTypes[id].label).join(' · '),
    );
  for (const [id, tags] of Object.entries({
    kronenadler: ['ansitz', 'deckung', 'kooperativ'],
    steppenadler: ['ansitz', 'boden', 'suchflug', 'aas'],
    uhu: ['ansitz', 'suchflug', 'lautlos'],
    weisskopfseeadler: ['ansitz', 'suchflug', 'wasser', 'beuteraub'],
    koenigsbussard: ['ansitz', 'suchflug', 'boden'],
  })) {
    const b = speciesRecords.find((b) => b.id === id)!;
    for (const tag of tags)
      assert(
        (b.ecology.huntingTags as string[]).includes(tag),
        `${id}: ${tag}`,
      );
  }
});

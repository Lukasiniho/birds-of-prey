import { test } from 'node:test';
import assert from 'node:assert/strict';
import { birds } from '../lib/birds.ts';
import { birdHref, birdForPath, birdsBySlug } from '../lib/bird-routes.ts';
import { speciesRecords, huntingTypes } from '../lib/ecology.ts';
test('all species have unique scientific-name routes that resolve on direct visits', () => {
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
test('hunting titles and tags share one vocabulary and reviewed multi-technique species retain their methods', () => {
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

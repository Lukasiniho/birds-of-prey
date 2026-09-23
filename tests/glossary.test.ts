import assert from 'node:assert/strict';
import test from 'node:test';
import {
  filterGlossary,
  glossaryEntries,
  glossaryHref,
} from '../lib/glossary.ts';
import { splitGlossaryText } from '../lib/glossary-matching.ts';

void test('each glossary term has a unique, reachable deep link', () => {
  assert.equal(
    new Set(glossaryEntries.map((entry) => entry.id)).size,
    glossaryEntries.length,
  );
  for (const entry of glossaryEntries) {
    const url = new URL(glossaryHref(entry.id), 'https://greifvogelkompass.de');
    assert.equal(url.searchParams.get('begriff'), entry.id);
    assert.equal(url.hash, '#glossar');
    for (const word of [entry.term, ...(entry.aliases ?? [])]) {
      assert.equal(splitGlossaryText(word)[0].id, entry.id, word);
    }
  }
});

void test('German word boundaries and longest matches preserve prose exactly', () => {
  const text =
    'Verlauf, Stoßflug, Fänge, Unterflügeldecken: Handschwingen und HANDSCHWINGEN.';
  const parts = splitGlossaryText(text);
  assert.equal(parts.map((part) => part.text).join(''), text);
  assert.deepEqual(
    parts.flatMap((part) => (part.id ? [part.id] : [])),
    ['stossflug', 'faenge', 'deckfedern', 'handschwingen'],
  );
  assert.equal(
    splitGlossaryText('Zulauf Läufer Brutreviergrenze')[0].id,
    undefined,
  );
});

void test('search finds aliases, umlaut transliterations and filtered results', () => {
  assert.ok(
    filterGlossary('ruettelflug').some((entry) => entry.id === 'ruettelflug'),
  );
  assert.ok(
    filterGlossary('Farbmorphen').some((entry) => entry.id === 'morphe'),
  );
  assert.ok(filterGlossary('Stoß').some((entry) => entry.id === 'stoss'));
  assert.ok(
    filterGlossary('Federn', 'Körper & Gefieder').every(
      (entry) => entry.category === 'Körper & Gefieder',
    ),
  );
  assert.deepEqual(filterGlossary('keinbegriffxyz'), []);
  assert.equal(filterGlossary('   ').length, glossaryEntries.length);
});

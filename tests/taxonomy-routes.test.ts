import assert from 'node:assert/strict';
import { test } from 'node:test';
import { birds } from '../lib/birds.ts';
import {
  birdForPath,
  birdHref,
  birdTaxonomyHref,
  isBirdTaxonomyPath,
  isBirdFullscreenPath,
} from '../lib/bird-routes.ts';
import {
  taxonomyRoot,
  taxonomyPath,
  type TaxonomyNode,
} from '../lib/taxonomy.ts';
import {
  taxonomyPathForSearch,
  taxonomySearch,
} from '../lib/taxonomy-routes.ts';

void test('every species has a distinct, directly resolvable Systematik route', () => {
  for (const bird of birds) {
    const href = birdTaxonomyHref(bird);
    assert.equal(href, `${birdHref(bird)}/systematik`);
    assert.equal(birdForPath(href)?.id, bird.id);
    assert.equal(birdForPath(`${href}/`)?.id, bird.id);
    assert.ok(isBirdTaxonomyPath(href));
    assert.ok(isBirdTaxonomyPath(`${href}/`));
    assert.equal(isBirdFullscreenPath(href), false);
    assert.equal(isBirdTaxonomyPath(birdHref(bird)), false);
    assert.equal(birdForPath(`${href}/unknown`), undefined);
  }
  assert.equal(isBirdTaxonomyPath('/unknown/systematik'), false);
});

void test('default URLs open each selected species and invalid taxa fall back safely', () => {
  for (const bird of birds) {
    const expected = taxonomyPath(bird.id).slice(0, -1);
    assert.deepEqual(taxonomyPathForSearch('', bird.id), expected);
    assert.deepEqual(
      taxonomyPathForSearch('?taxon=unknown', bird.id),
      expected,
    );
    assert.equal(taxonomySearch('', expected, bird.id), '');
    assert.equal(
      taxonomySearch('?source=shared&taxon=aves', expected, bird.id),
      '?source=shared',
    );
  }
});

void test('every selectable branch round-trips through its URL, including collapsed root', () => {
  const birdId = 'rotschwanzbussard';
  const walk = (node: TaxonomyNode, ancestors: string[] = []) => {
    if (!node.children.length) return;
    const path = [...ancestors, node.latin];
    const search = taxonomySearch('?source=shared', path, birdId);
    assert.deepEqual(taxonomyPathForSearch(search, birdId), path, node.latin);
    assert.equal(new URLSearchParams(search).get('source'), 'shared');
    node.children.forEach((child) => walk(child, path));
  };
  walk(taxonomyRoot);
  assert.equal(taxonomySearch('', [], birdId), '?taxon=');
  assert.deepEqual(taxonomyPathForSearch('?taxon=', birdId), []);
  assert.deepEqual(taxonomyPathForSearch('?taxon=FALCO', birdId), [
    'Aves',
    'Falconiformes',
    'Falconidae',
    'Falco',
  ]);
});

import { taxonomyPath, taxonomyRoot, type TaxonomyNode } from './taxonomy.ts';

const branches = new Map<string, string[]>();
function indexBranches(node: TaxonomyNode, ancestors: string[] = []) {
  if (!node.children.length) return;
  const path = [...ancestors, node.latin];
  branches.set(node.latin.toLowerCase(), path);
  node.children.forEach((child) => indexBranches(child, path));
}
indexBranches(taxonomyRoot);

/** The species opens its genus by default; an empty taxon closes every branch. */
export function taxonomyPathForSearch(
  search: string,
  birdId: string,
): string[] {
  const taxon = new URLSearchParams(search).get('taxon');
  if (taxon === '') return [];
  return (
    branches.get(taxon?.toLowerCase() ?? '') ??
    taxonomyPath(birdId).slice(0, -1)
  );
}

export function taxonomySearch(search: string, path: string[], birdId: string) {
  const params = new URLSearchParams(search);
  const defaultPath = taxonomyPath(birdId).slice(0, -1);
  if (path.join('/') === defaultPath.join('/')) params.delete('taxon');
  else params.set('taxon', path.at(-1)?.toLowerCase() ?? '');
  const query = params.toString();
  return query ? `?${query}` : '';
}

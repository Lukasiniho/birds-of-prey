import taxonomy from '../data/taxonomy.json' with { type: 'json' };
import names from '../data/taxonomy-names.de.json' with { type: 'json' };
import { birds } from './birds.ts';

export type TaxonomyNode = {
  latin: string;
  name?: string;
  rank: string;
  birdId?: string;
  atlasCount: number;
  totalCount: number;
  children: TaxonomyNode[];
};
const byLatin = new Map(birds.map((bird) => [bird.latin, bird]));
const germanNames: Record<string, string> = names;
const nameCollator = new Intl.Collator('de', { sensitivity: 'base' });

function branch(
  latin: string,
  name: string | undefined,
  rank: string,
  children: TaxonomyNode[],
): TaxonomyNode {
  return {
    latin,
    name,
    rank,
    children: [...children].sort((a, b) =>
      nameCollator.compare(a.name ?? a.latin, b.name ?? b.latin),
    ),
    atlasCount: children.reduce((count, child) => count + child.atlasCount, 0),
    totalCount: children.reduce((count, child) => count + child.totalCount, 0),
  };
}
export const taxonomyRoot = branch(
  'Aves',
  'Vögel',
  'Klasse',
  taxonomy.map((order) =>
    branch(
      order.latin,
      order.name,
      'Ordnung',
      order.families.map((family) =>
        branch(
          family.latin,
          family.name,
          'Familie',
          family.genera.map((genus) =>
            branch(
              genus.latin,
              undefined,
              'Gattung',
              genus.species.map((species) => {
                const bird = byLatin.get(species.latin);
                return {
                  latin: species.latin,
                  name: bird?.name ?? germanNames[species.latin],
                  rank: 'Art',
                  birdId: bird?.id,
                  atlasCount: bird ? 1 : 0,
                  totalCount: 1,
                  children: [],
                };
              }),
            ),
          ),
        ),
      ),
    ),
  ),
);
export function taxonomyPath(
  birdId: string,
  node: TaxonomyNode = taxonomyRoot,
): string[] {
  if (node.birdId === birdId) return [node.latin];
  for (const child of node.children) {
    const path = taxonomyPath(birdId, child);
    if (path.length) return [node.latin, ...path];
  }
  return [];
}

import taxonomy from '../data/taxonomy.json' with { type: 'json' };
import names from '../data/taxonomy-names.de.json' with { type: 'json' };
import { birds } from './birds.ts';
import { msg, translator, type Locale, type Translate } from './i18n.ts';

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

function build(locale: Locale, t: Translate): TaxonomyNode {
  const nameCollator = new Intl.Collator(locale, { sensitivity: 'base' });
  const branch = (
    latin: string,
    name: string | undefined,
    rank: string,
    children: TaxonomyNode[],
  ): TaxonomyNode => ({
    latin,
    name,
    rank,
    children: [...children].sort((a, b) =>
      nameCollator.compare(a.name ?? a.latin, b.name ?? b.latin),
    ),
    atlasCount: children.reduce((count, child) => count + child.atlasCount, 0),
    totalCount: children.reduce((count, child) => count + child.totalCount, 0),
  });
  return branch(
    'Aves',
    t(msg('Vögel')),
    t(msg('Klasse')),
    taxonomy.map((order) =>
      branch(
        order.latin,
        t(order.name),
        t(msg('Ordnung')),
        order.families.map((family) =>
          branch(
            family.latin,
            t(family.name),
            t(msg('Familie')),
            family.genera.map((genus) =>
              branch(
                genus.latin,
                undefined,
                t(msg('Gattung')),
                genus.species.map((species) => {
                  const bird = byLatin.get(species.latin);
                  return {
                    latin: species.latin,
                    // Englisch: IOC-Namen aus der Systematik, auch für Atlasarten.
                    name:
                      locale === 'en'
                        ? species.name
                        : (bird?.name ?? germanNames[species.latin]),
                    rank: t(msg('Art')),
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
}

const trees = new Map<Locale, TaxonomyNode>();
/** Systematikbaum in der Seitensprache, einmal je Sprache aufgebaut. */
export function taxonomyTree(
  locale: Locale = 'de',
  t: Translate = translator(null),
): TaxonomyNode {
  let tree = trees.get(locale);
  if (!tree) trees.set(locale, (tree = build(locale, t)));
  return tree;
}
export const taxonomyRoot = taxonomyTree();

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

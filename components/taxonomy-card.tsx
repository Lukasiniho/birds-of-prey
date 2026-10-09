'use client';
import { birds } from '@/lib/birds';
import type { TaxonomyNode } from '@/lib/taxonomy';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { SpeciesRowLink } from '@/components/species-row';
import { SpeciesName } from '@/components/species-name';
import { useI18n } from '@/components/i18n';
import { localePath } from '@/lib/i18n';
const byId = new Map(birds.map((bird) => [bird.id, bird]));

type NodeProps = {
  node: TaxonomyNode;
  selected: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
};
export function TaxonomyCard({
  node,
  selected,
  isOpen,
  onToggle,
  onSelect,
}: NodeProps) {
  const { locale, t } = useI18n();
  const bird = node.birdId ? byId.get(node.birdId) : undefined;
  const active = node.children.length ? isOpen : node.birdId === selected;
  const selectionStyle = {
    borderColor: active
      ? 'var(--selection-border)'
      : node.children.length
        ? 'var(--border)'
        : 'transparent',
  };
  if (node.children.length)
    return (
      <button
        style={selectionStyle}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        data-taxon={node.latin}
        className={`flex w-full items-center rounded-(--radius-control) p-2 text-left bg-surface hover:bg-accent border-(length:--border-selection) ${active ? 'border-primary' : 'border-border'}`}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-(length:--type-credit) uppercase tracking-(--tracking-normal) text-muted-foreground">
            {node.rank}
          </span>
          <span className="block wrap-anywhere font-(--weight-semibold)">
            {node.name ?? node.latin}
          </span>
          {node.name && (
            <span className="block text-(length:--type-caption) text-muted-foreground">
              {node.latin}
            </span>
          )}
          <span className="mt-1 block text-(length:--type-caption) text-muted-foreground">
            <span
              className={
                node.atlasCount ? 'text-primary font-(--weight-semibold)' : ''
              }
            >
              {t('{count} im Atlas', { count: node.atlasCount })}
            </span>{' '}
            ·{' '}
            {node.totalCount === 1
              ? t('{count} Art', { count: node.totalCount })
              : t('{count} Arten', { count: node.totalCount })}
          </span>
        </span>
      </button>
    );
  if (bird)
    return (
      <SpeciesRowLink
        data-taxon={node.latin}
        portrait={portraitImages[bird.id]}
        name={node.name ?? bird.name}
        latin={bird.latin}
        href={localePath(birdHref(bird), locale)}
        size="inline"
        aria-current={active ? 'page' : undefined}
        className="hover:bg-transparent!"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          onSelect(bird.id);
        }}
      />
    );
  return (
    <div
      data-taxon={node.latin}
      className="px-2 py-1"
      aria-label={t('{name}, {latin}, ohne Porträt', {
        name: node.name ?? '',
        latin: node.latin,
      })}
    >
      <SpeciesName name={node.name} latin={node.latin} variant="compact" />
    </div>
  );
}

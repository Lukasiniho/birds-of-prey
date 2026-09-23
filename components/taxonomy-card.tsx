'use client';
import { birds } from '@/lib/birds';
import type { TaxonomyNode } from '@/lib/taxonomy';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { SpeciesRowLink } from '@/components/species-row';
import { SpeciesName } from '@/components/species-name';
import { CaretRight } from '@/components/icons';
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
  const bird = node.birdId ? byId.get(node.birdId) : undefined;
  const active = node.children.length ? isOpen : node.birdId === selected;
  const selectionStyle = {
    borderColor: active
      ? 'var(--selection-border)'
      : node.children.length
        ? 'var(--border)'
        : 'transparent',
  };
  const border = `border-(length:--border-selection) ${active ? 'border-primary bg-accent' : 'border-transparent'}`;
  if (node.children.length)
    return (
      <button
        style={selectionStyle}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        data-taxon={node.latin}
        className={`flex w-full items-center gap-2 rounded-control p-2 text-left hover:bg-accent border-(length:--border-selection) ${active ? 'border-primary bg-accent' : 'border-border bg-background'}`}
      >
        <CaretRight
          className={`size-4 shrink-0 ${isOpen ? 'rotate-90' : ''}`}
        />
        <span className="min-w-0 flex-1">
          <span className="block text-(length:--type-caption) uppercase tracking-(--tracking-caps) text-muted-foreground">
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
              {node.atlasCount} im Atlas
            </span>{' '}
            · {node.totalCount} {node.totalCount === 1 ? 'Art' : 'Arten'}
          </span>
        </span>
      </button>
    );
  if (bird)
    return (
      <SpeciesRowLink
        style={selectionStyle}
        data-taxon={node.latin}
        portrait={portraitImages[bird.id]}
        name={bird.name}
        latin={bird.latin}
        href={birdHref(bird)}
        size="inline"
        aria-current={active ? 'page' : undefined}
        className={border}
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
      aria-label={`${node.name}, ${node.latin}, ohne Porträt`}
    >
      <SpeciesName name={node.name} latin={node.latin} variant="compact" />
    </div>
  );
}

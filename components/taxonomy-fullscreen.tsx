'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { birds } from '@/lib/birds';
import { taxonomyRoot, taxonomyPath, type TaxonomyNode } from '@/lib/taxonomy';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { SpeciesRowLink } from '@/components/species-row';
import { SpeciesName } from '@/components/species-name';
import { CaretRight, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/segmented-control';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { fullscreenSurface } from '@/components/fullscreen-styles';

const byId = new Map(birds.map((bird) => [bird.id, bird]));
type View = 'tree' | 'list';
const views = [
  { value: 'tree', label: 'Baum' },
  { value: 'list', label: 'Liste' },
] as const;

type NodeProps = {
  node: TaxonomyNode;
  view: View;
  expanded: Set<string>;
  selected: string;
  onToggle: (latin: string) => void;
  onSelect: (id: string) => void;
};
function Taxon({
  node,
  view,
  expanded,
  selected,
  onToggle,
  onSelect,
}: NodeProps) {
  const horizontal = view === 'tree';
  const hasChildren = node.children.length > 0;
  const isOpen = expanded.has(node.latin);
  const bird = node.birdId ? byId.get(node.birdId) : undefined;
  const selectedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (node.birdId !== selected) return;
    const frame = requestAnimationFrame(() =>
      selectedRef.current?.scrollIntoView({
        block: 'center',
        inline: 'nearest',
      }),
    );
    return () => cancelAnimationFrame(frame);
  }, [node.birdId, selected, view]);
  const panelId = `taxon-${node.latin.replaceAll(' ', '-')}`;
  return (
    <div className={horizontal ? 'flex w-max items-center' : 'min-w-0'}>
      <div
        ref={selectedRef}
        className={
          horizontal
            ? hasChildren
              ? isOpen
                ? 'w-60 self-stretch shrink-0'
                : 'w-52 self-stretch shrink-0'
              : bird
                ? 'w-64 shrink-0'
                : 'w-52 shrink-0'
            : ''
        }
      >
        <div
          className={`${horizontal && hasChildren ? 'sticky top-[calc(50%-var(--space-32))] flex items-center' : 'relative'} ${horizontal && node.latin !== 'Aves' ? 'before:absolute before:-left-8 before:top-1/2 before:w-8 before:border-t before:border-border' : ''}`}
        >
          {hasChildren ? (
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(node.latin)}
              className={`flex w-full items-center gap-2 rounded-control p-3 text-left hover:bg-accent ${horizontal ? 'border border-border bg-background' : ''}`}
            >
              <CaretRight
                className={`size-4 shrink-0 ${isOpen ? 'rotate-90' : ''}`}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-(length:--type-caption) text-muted-foreground">
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
                      node.atlasCount
                        ? 'text-primary font-(--weight-semibold)'
                        : ''
                    }
                  >
                    {node.atlasCount} im Atlas
                  </span>{' '}
                  · {node.totalCount} {node.totalCount === 1 ? 'Art' : 'Arten'}
                </span>
              </span>
            </button>
          ) : bird ? (
            <SpeciesRowLink
              portrait={portraitImages[bird.id]}
              name={bird.name}
              latin={bird.latin}
              href={birdHref(bird)}
              size="inline"
              aria-current={bird.id === selected ? 'page' : undefined}
              className={bird.id === selected ? 'bg-accent' : ''}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                onSelect(bird.id);
              }}
            />
          ) : (
            <div
              className="px-2 py-1"
              aria-label={`${node.name}, ${node.latin}, ohne Porträt`}
            >
              <SpeciesName
                name={node.name}
                latin={node.latin}
                variant="compact"
              />
            </div>
          )}
          {horizontal && hasChildren && isOpen && (
            <span
              aria-hidden="true"
              className="w-8 shrink-0 border-t border-border"
            />
          )}
        </div>
      </div>
      {hasChildren && (
        <div id={panelId} hidden={!isOpen}>
          {isOpen && (
            <div
              className={
                horizontal
                  ? 'flex items-center'
                  : 'ml-3 border-l border-border pl-3 sm:ml-5 sm:pl-5'
              }
            >
              <ul
                className={
                  horizontal ? 'flex flex-col' : 'flex flex-col gap-2 py-2'
                }
              >
                {node.children.map((child) => (
                  <li
                    key={child.latin}
                    className={
                      horizontal
                        ? `relative py-2 pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:border-l before:border-border ${child.children.length ? '' : 'first:before:top-1/2 last:before:bottom-1/2'}`
                        : ''
                    }
                  >
                    <Taxon
                      node={child}
                      view={view}
                      expanded={expanded}
                      selected={selected}
                      onToggle={onToggle}
                      onSelect={onSelect}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaxonomyExplorer({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [view, setView] = useState<View>('tree');
  const [expanded, setExpanded] = useState(
    () => new Set(taxonomyPath(selected)),
  );
  const onToggle = (latin: string) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(latin)) next.delete(latin);
      else next.add(latin);
      return next;
    });
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          label="Darstellung"
          group="taxonomy"
          value={view}
          options={views}
          onChange={setView}
        />
        <p className="text-(length:--type-caption) text-muted-foreground">
          {taxonomyRoot.atlasCount} im Atlas · {taxonomyRoot.totalCount} Arten
          insgesamt
        </p>
      </div>
      <div
        className="min-h-0 flex-1 overflow-auto overscroll-contain p-2"
        aria-label={
          view === 'tree' ? 'Horizontaler Systematikbaum' : 'Systematikliste'
        }
      >
        <div
          className={
            view === 'tree'
              ? 'w-max min-w-full py-6'
              : 'mx-auto w-full max-w-4xl'
          }
        >
          <Taxon
            node={taxonomyRoot}
            view={view}
            expanded={expanded}
            selected={selected}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        </div>
      </div>
      <p className="text-(length:--type-caption) text-muted-foreground">
        Systematik:{' '}
        <a
          className="text-primary"
          href="https://doi.org/10.2173/avilist.v2025b"
          target="_blank"
          rel="noreferrer"
        >
          AviList v2025b
        </a>{' '}
        (CC BY 4.0) · Deutsche Namen:{' '}
        <a
          className="text-primary"
          href="https://github.com/tphakala/openfauna"
          target="_blank"
          rel="noreferrer"
        >
          OpenFauna / BirdNET, Cornell Lab & IOC
        </a>{' '}
        (CC BY-SA 4.0).
      </p>
    </div>
  );
}

export function TaxonomyFullscreen({
  selected,
  onSelect,
  children,
}: {
  selected: string;
  onSelect: (id: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const bird = byId.get(selected)!;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="relative z-1 cursor-pointer rounded-control hover:bg-accent"
            aria-label={`Systematik von ${bird.name} öffnen`}
          />
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent className={fullscreenSurface} showCloseButton={false}>
        <div className="min-w-0 pr-12">
          <DialogTitle className="font-(family-name:--font-stack-display) text-(length:--type-heading)">
            Systematik der Vögel
          </DialogTitle>
          <DialogDescription className="mt-2 text-(length:--type-body)">
            Von der Ordnung bis zur Art. Äste aufklappen und Arten mit Porträt
            im Atlas öffnen.
          </DialogDescription>
        </div>
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-(--panel-padding) top-(--panel-padding)"
              aria-label="Vollbild schließen"
            />
          }
        >
          <X />
        </DialogClose>
        {open && (
          <TaxonomyExplorer
            selected={selected}
            onSelect={(id) => {
              onSelect(id);
              setOpen(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

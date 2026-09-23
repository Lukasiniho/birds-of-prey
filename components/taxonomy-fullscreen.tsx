'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { birds } from '@/lib/birds';
import { taxonomyRoot, taxonomyPath, type TaxonomyNode } from '@/lib/taxonomy';
import { X } from '@/components/icons';
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
import { TaxonomyCard } from '@/components/taxonomy-card';
import { TaxonomyTree } from '@/components/taxonomy-tree';
import { fullscreenSurface } from '@/components/fullscreen-styles';

const byId = new Map(birds.map((bird) => [bird.id, bird]));
type View = 'tree' | 'list';
const views = [
  { value: 'tree', label: 'Baum' },
  { value: 'list', label: 'Liste' },
] as const;

function TaxonList({
  node,
  selected,
  expanded,
  onToggle,
  onSelect,
}: {
  node: TaxonomyNode;
  selected: string;
  expanded: Set<string>;
  onToggle: (latin: string) => void;
  onSelect: (id: string) => void;
}) {
  const open = expanded.has(node.latin);
  const entry = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (node.birdId !== selected) return;
    const frame = requestAnimationFrame(() =>
      entry.current?.scrollIntoView({ block: 'center' }),
    );
    return () => cancelAnimationFrame(frame);
  }, [node.birdId, selected]);
  return (
    <div ref={entry}>
      <TaxonomyCard
        node={node}
        selected={selected}
        isOpen={open}
        onToggle={() => onToggle(node.latin)}
        onSelect={onSelect}
      />
      {open && node.children.length > 0 && (
        <ul className="ml-3 flex flex-col gap-2 border-l border-border py-2 pl-3 sm:ml-5 sm:pl-5">
          {node.children.map((child) => (
            <li key={child.latin}>
              <TaxonList
                node={child}
                selected={selected}
                expanded={expanded}
                onToggle={onToggle}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
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
      <div className={view === 'tree' ? 'flex min-h-0 flex-1' : 'hidden'}>
        <TaxonomyTree selected={selected} onSelect={onSelect} />
      </div>
      {view === 'list' && (
        <div
          className="min-h-0 flex-1 overflow-auto overscroll-contain p-2"
          aria-label="Systematikliste"
        >
          <div className="mx-auto w-full max-w-4xl">
            <TaxonList
              node={taxonomyRoot}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          </div>
        </div>
      )}
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

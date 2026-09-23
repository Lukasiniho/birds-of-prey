'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { birds } from '@/lib/birds';
import { taxonomyRoot } from '@/lib/taxonomy';
import { Info, X } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { birdTaxonomyHref } from '@/lib/bird-routes';
import { TaxonomyTree } from '@/components/taxonomy-tree';
import { fullscreenSurface } from '@/components/fullscreen-styles';

const byId = new Map(birds.map((bird) => [bird.id, bird]));
function TaxonomyExplorer({
  selected,
  onSelect,
  path,
  onPathChange,
}: {
  selected: string;
  onSelect: (id: string) => void;
  path: string[];
  onPathChange: (path: string[]) => void;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-3">
      <p className="text-(length:--type-caption) text-muted-foreground">
        {taxonomyRoot.atlasCount} im Atlas · {taxonomyRoot.totalCount} Arten
        insgesamt
      </p>
      <div className="flex min-h-0 flex-1">
        <TaxonomyTree
          selected={selected}
          onSelect={onSelect}
          path={path}
          onPathChange={onPathChange}
        />
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

export function TaxonomyTrigger({
  selected,
  onOpen,
  children,
}: {
  selected: string;
  onOpen: () => void;
  children: ReactNode;
}) {
  const bird = byId.get(selected)!;
  return (
    <a
      id="taxonomy-trigger"
      href={birdTaxonomyHref(bird)}
      className="relative z-1 inline-block max-w-full rounded-control hover:bg-hover"
      aria-label={`Systematik von ${bird.name} öffnen`}
      title="Systematik öffnen"
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onOpen();
      }}
    >
      <span className="t-stagger-line t-stagger-line--2 relative">
        {children}
        {/* Keep the name centered and its line height unchanged. The icon
            shares the name's reveal instead of remaining visible alone. */}
        <Info className="absolute left-full top-1/2 ml-2 size-5 -translate-y-1/2 text-primary" />
      </span>
    </a>
  );
}

export function TaxonomyFullscreen({
  selected,
  onSelect,
  path,
  onPathChange,
  atlasHref,
  onClose,
}: {
  selected: string;
  onSelect: (id: string) => void;
  path: string[];
  onPathChange: (path: string[]) => void;
  atlasHref: string;
  onClose: () => void;
}) {
  const page = useRef<HTMLElement>(null);
  useEffect(() => {
    page.current?.focus();
  }, []);
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.key !== 'Escape') return;
      event.preventDefault();
      onClose();
    }
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [onClose]);
  return (
    <div className="flow-root min-h-dvh bg-stage">
      <main
        ref={page}
        tabIndex={-1}
        id="main-content"
        aria-labelledby="taxonomy-title"
        className={`${fullscreenSurface} relative grid m-(--atlas-gutter) rounded-(--radius-surface) border-(length:--border-structure)`}
      >
        <div className="min-w-0 pr-12">
          <h1
            id="taxonomy-title"
            className="page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight)"
          >
            Systematik der Vögel
          </h1>
          <p className="mt-2 text-(length:--type-body) text-muted-foreground">
            Von der Ordnung bis zur Art. Äste aufklappen und Arten mit Porträt
            im Atlas öffnen.
          </p>
        </div>
        <a
          href={atlasHref}
          className={`${buttonVariants({ variant: 'ghost', size: 'icon' })} absolute right-(--panel-padding) top-(--panel-padding)`}
          aria-label="Systematik schließen"
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            event.preventDefault();
            onClose();
          }}
        >
          <X />
        </a>
        <TaxonomyExplorer
          selected={selected}
          onSelect={onSelect}
          path={path}
          onPathChange={onPathChange}
        />
      </main>
    </div>
  );
}

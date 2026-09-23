'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { birds } from '@/lib/birds';
import { taxonomyRoot } from '@/lib/taxonomy';
import { Info } from '@/components/icons';
import { birdTaxonomyHref } from '@/lib/bird-routes';
import { TaxonomyTree } from '@/components/taxonomy-tree';
import { TaxonomyMobileTree } from '@/components/taxonomy-mobile-tree';
import { FullscreenPage } from '@/components/fullscreen-page';
import { SurfaceHeader, SurfaceBody } from '@/components/surface';
import { CloseLink } from '@/components/close-control';

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
        <TaxonomyMobileTree
          selected={selected}
          onSelect={onSelect}
          path={path}
          onPathChange={onPathChange}
        />
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
      className="relative z-1 inline-block max-w-full rounded-(--radius-control) hover:bg-hover"
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
        {/* Source Serif's visible letters sit below the line-box center.
            The optical offset leaves the name's spacing and reveal intact. */}
        <Info className="absolute left-full top-1/2 ml-2 mt-half size-5 -translate-y-1/2 text-primary" />
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
    <FullscreenPage
      ref={page}
      tabIndex={-1}
      id="main-content"
      aria-labelledby="taxonomy-title"
    >
      <SurfaceHeader
        actions={
          <CloseLink
            href={atlasHref}
            label="Systematik schließen"
            onNavigate={onClose}
          />
        }
        description={
          <p className="text-(length:--type-body) text-muted-foreground">
            Von der Ordnung bis zur Art. Äste aufklappen und Arten mit Porträt
            im Atlas öffnen.
          </p>
        }
      >
        <h1
          id="taxonomy-title"
          className="page-title font-(family-name:--font-stack-display) text-(length:--type-page-title) font-(--weight-semibold) leading-(--leading-display) tracking-(--tracking-tight)"
        >
          Systematik der Vögel
        </h1>
      </SurfaceHeader>
      <SurfaceBody className="flex min-h-0 flex-1 flex-col">
        <TaxonomyExplorer
          selected={selected}
          onSelect={onSelect}
          path={path}
          onPathChange={onPathChange}
        />
      </SurfaceBody>
    </FullscreenPage>
  );
}

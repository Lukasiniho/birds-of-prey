'use client';

import { useState, type ReactNode } from 'react';
import { birds } from '@/lib/birds';
import { taxonomyRoot } from '@/lib/taxonomy';
import { X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { TaxonomyTree } from '@/components/taxonomy-tree';
import { fullscreenSurface } from '@/components/fullscreen-styles';

const byId = new Map(birds.map((bird) => [bird.id, bird]));
function TaxonomyExplorer({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-3">
      <p className="text-(length:--type-caption) text-muted-foreground">
        {taxonomyRoot.atlasCount} im Atlas · {taxonomyRoot.totalCount} Arten insgesamt
      </p>
      <div className="flex min-h-0 flex-1">
        <TaxonomyTree selected={selected} onSelect={onSelect} />
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

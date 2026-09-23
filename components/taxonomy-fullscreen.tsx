'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import taxonomy from '@/data/taxonomy.json';
import { birds } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { SpeciesRowLink } from '@/components/species-row';
import { SpeciesScientificName } from '@/components/species-name';
import { CaretRight, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { fullscreenSurface } from '@/components/fullscreen-styles';

const byLatin = new Map(birds.map((bird) => [bird.latin, bird]));

function Branch({
  latin,
  name,
  rank,
  open,
  children,
}: {
  latin: string;
  name?: string;
  rank: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <details open={open} className="min-w-0 [&[open]>summary>svg]:rotate-90">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-control px-2 py-3 hover:bg-accent [&::-webkit-details-marker]:hidden">
        <CaretRight className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 break-words">
          <span className="block font-(--weight-semibold)">
            {name ?? latin}
          </span>
          {name && (
            <span className="text-(length:--type-caption) text-muted-foreground">
              {latin}
            </span>
          )}
        </span>
        <span className="text-(length:--type-caption) text-muted-foreground">
          {rank}
        </span>
      </summary>
      <div className="ml-3 border-l border-border pl-3 sm:ml-5 sm:pl-5">
        {children}
      </div>
    </details>
  );
}

function TaxonomyTree({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const current = birds.find((bird) => bird.id === selected)!;
  const selectedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      selectedRef.current?.scrollIntoView({ block: 'center' }),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div
      className="min-h-0 overflow-y-auto overscroll-contain pr-2"
      aria-label="Taxonomische Einordnung"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-3 text-(length:--type-caption) text-muted-foreground">
          Klasse Vögel · Aves
        </p>
        {taxonomy.map((order) => (
          <Branch
            key={order.latin}
            {...order}
            rank="Ordnung"
            open={order.families.some((f) =>
              f.genera.some((g) =>
                g.species.some((s) => s.latin === current.latin),
              ),
            )}
          >
            {order.families.map((family) => (
              <Branch
                key={family.latin}
                {...family}
                rank="Familie"
                open={family.genera.some((g) =>
                  g.species.some((s) => s.latin === current.latin),
                )}
              >
                {family.genera.map((genus) => (
                  <Branch
                    key={genus.latin}
                    latin={genus.latin}
                    rank="Gattung"
                    open={genus.species.some((s) => s.latin === current.latin)}
                  >
                    <ul className="flex flex-col gap-2 py-2">
                      {genus.species.map((species) => {
                        const bird = byLatin.get(species.latin);
                        return (
                          <li key={species.latin}>
                            {bird ? (
                              <div
                                ref={
                                  bird.id === selected ? selectedRef : undefined
                                }
                                className={
                                  bird.id === selected
                                    ? 'rounded-control bg-accent'
                                    : ''
                                }
                              >
                                <SpeciesRowLink
                                  portrait={portraitImages[bird.id]}
                                  name={bird.name}
                                  latin={bird.latin}
                                  href={birdHref(bird)}
                                  size="inline"
                                  aria-current={
                                    bird.id === selected ? 'page' : undefined
                                  }
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
                              </div>
                            ) : (
                              <div
                                className="px-2 py-1 text-muted-foreground"
                                aria-label={`${species.latin}, ohne Porträt`}
                              >
                                <SpeciesScientificName>
                                  {species.latin}
                                </SpeciesScientificName>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </Branch>
                ))}
              </Branch>
            ))}
          </Branch>
        ))}
        <p className="mt-6 text-(length:--type-caption) text-muted-foreground">
          Die fünf Ordnungen unserer Arten · Systematik:{' '}
          <a
            className="text-primary"
            href="https://doi.org/10.2173/avilist.v2025b"
            target="_blank"
            rel="noreferrer"
          >
            AviList v2025b
          </a>
          , AviList Core Team (2026), CC BY 4.0. Auf Ordnungen, Familien,
          Gattungen und Arten gekürzt.
        </p>
      </div>
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
  const bird = birds.find((item) => item.id === selected)!;
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
            Entdecke die Verwandtschaft unserer {birds.length} Arten. Mit
            Porträt: im Atlas öffnen. Klein und grau: ohne Porträt.
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
          <TaxonomyTree
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

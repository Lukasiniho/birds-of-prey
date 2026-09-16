'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeftDuotone,
  ArrowRightDuotone,
  CornersOut as Expand,
  X,
} from '@/components/icons';
import { SpeciesName } from '@/components/species-name';
import { ArtImage } from '@/components/art-image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

export type InfoColumn = { value: string; label: string; content: ReactNode };

/* Die Info-Spalte zeigt immer nur einen der drei Reiter. Im Vollbild liegen
 * sie nebeneinander, damit sich Steckbrief, Nahrung und Vorkommen einer Art
 * ohne Umschalten vergleichen lassen; unter Tablet-Breite bleiben sie
 * untereinander, weil drei Spalten dort keine lesbare Zeile mehr ergeben. */
export function InfoFullscreen({
  name,
  latin,
  portrait,
  measurements,
  columns,
  onStep,
  picker,
}: {
  name: string;
  latin: string;
  portrait?: string;
  measurements?: ReactNode;
  columns: InfoColumn[];
  /** Klappmenü über alle Arten, sitzt am Namen. */
  picker?: ReactNode;
  /** Blättert zur vorigen (-1) oder nächsten (+1) Art der Artenliste. */
  onStep: (delta: number) => void;
}) {
  const [open, setOpen] = useState(false);
  // Am Dokument statt am Popup: der Fokus kann beim Blättern in einem der
  // Bedienelemente stehen, deren eigene Pfeiltasten das Ereignis sonst
  // abfangen, bevor es die Karte erreicht.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]'))
        return;
      const delta =
        event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      if (!delta) return;
      event.preventDefault();
      onStep(delta);
    }
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, onStep]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Der Knopf sitzt in derselben Box wie ein Reiter — gleiche Höhe,
          gleiche Fußzeile —, damit sein Zeichen mit der Beschriftung läuft,
          egal wie hoch die Leiste gerade ist. Die vier Pixel weniger Fußzeile
          holen ihn von der Mitte des Schriftfelds auf die Mitte der
          Kleinbuchstaben: „Steckbrief · Nahrung · Vorkommen“ füllt weder die
          Ober- noch die Unterlänge, die das Feld reserviert. */}
      <div className="info-expand-slot ml-auto flex h-(--control-height) items-center pb-[9px]">
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="info-expand"
              aria-label={`Informationen zum ${name} im Vollbild öffnen`}
            />
          }
        >
          <Expand />
        </DialogTrigger>
      </div>
      <DialogContent
        // Dieselbe Abstandsleiter wie die Info-Spalte, eine Stufe enger: hier
        // steht die Fensterhöhe fest und jede Spalte scrollt für sich, also
        // kosten die 24 px der schmalen Spalte sichtbare Zeilen statt Luft zu
        // machen.
        className="info-fullscreen [--rail-section-gap:var(--space-16)] [--rail-content-gap:var(--space-12)] [--rail-caption-gap:var(--space-8)] w-[calc(100vw-2*var(--atlas-gutter))] max-w-none sm:max-w-none h-[calc(100dvh-2*var(--atlas-gutter))] p-panel gap-(--rail-section-gap) grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background text-foreground"
        showCloseButton={false}
      >
        {/* Kopfzeile wie im Atlas: Porträt, Namenspaar — und rechts daneben
            dieselbe Maßleiste, nur auf Kopfzeilenbreite geschrumpft. */}
        <div className="info-fullscreen-head flex items-start gap-4 pr-[56px] min-w-0">
          {/* Alles in der Kopfzeile beginnt an derselben Oberkante: das hohe
              Porträt gibt die Zeilenhöhe vor, Pfeile, Name und Klappmenü
              hängen daran und stehen damit auf einer Linie mit der Maßleiste
              rechts, statt an der Mitte des Porträts zu kleben. */}
          <div className="flex min-w-0 items-start gap-4">
            {/* Größer als die Listenporträts: hier ist das Bild der Titel der
                Seite und nicht die Marke einer Zeile. */}
            {portrait && (
              <ArtImage
                className="block size-[88px] shrink-0 object-contain"
                src={portrait}
                alt=""
                width={88}
                height={88}
                displayWidth={88}
              />
            )}
            {/* Beide Pfeile vor dem Namen: hinter ihm würde der rechte mit
                jeder Artenlänge an eine andere Stelle springen. */}
            <div className="info-fullscreen-steps flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Vorige Art"
                onClick={() => onStep(-1)}
              >
                <ArrowLeftDuotone style={{ color: 'var(--main-color)' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Nächste Art"
                onClick={() => onStep(1)}
              >
                <ArrowRightDuotone style={{ color: 'var(--main-color)' }} />
              </Button>
            </div>
            {/* Buchstäblich der Namenskasten der Artenliste: gleiche Klasse,
                gleiche Variante, gleiche Rollen. */}
            <div className="flex min-w-0 items-start gap-1">
              <DialogTitle
                render={
                  <span className="species-row-name flex min-w-0 flex-col" />
                }
              >
                <SpeciesName
                  name={name}
                  latin={latin}
                  commonAs="strong"
                  variant="big"
                />
              </DialogTitle>
              {/* Der Haken hängt an der ersten Namenszeile, nicht am Kasten:
                  er bekommt deren Zeilenhöhe und zentriert sich darin, sonst
                  sitzt er an der Oberkante und damit zu hoch. */}
              <span className="flex h-[calc(var(--type-species-big)*var(--leading-heading))] shrink-0 items-center">
                {picker}
              </span>
            </div>
          </div>
          {measurements && (
            <div className="info-fullscreen-measurements [container:atlas-stage/inline-size] ml-auto min-w-0 w-full max-w-[720px] to-tablet:hidden">
              {measurements}
            </div>
          )}
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
        {/* Die Spalten trennt eine Linie in der Mitte ihres Zwischenraums, nicht
            nur Luft — nebeneinander laufende Fließtexte verschwimmen sonst. */}
        <div className="info-fullscreen-columns grid grid-cols-3 min-h-0 to-tablet:grid-cols-1 to-tablet:overflow-y-auto">
          {columns.map(({ value, label, content }) => (
            <section
              className="info-fullscreen-column flex flex-col min-w-0 min-h-0 gap-(--rail-content-gap) px-(--space-24) first:pl-0 last:pr-0 [&+section]:border-l-(length:--border-structure) to-tablet:px-0 to-tablet:[&+section]:border-l-0 to-tablet:[&+section]:mt-(--rail-section-gap)"
              key={value}
              aria-label={label}
            >
              <h2 className="info-fullscreen-heading shrink-0 font-(family-name:--font-stack-body) text-(length:--type-caption) font-(--weight-semibold) leading-(--leading-none) tracking-(--tracking-caps) uppercase text-(--main-color) pb-[13px] border-b-(length:--border-structure)">
                {label}
              </h2>
              <div className="info-fullscreen-scroll min-w-0 text-(length:--type-body) leading-(--leading-relaxed) from-tablet:min-h-0 from-tablet:flex-1 from-tablet:overflow-y-auto from-tablet:overscroll-contain from-tablet:[scrollbar-width:thin] from-tablet:[scrollbar-color:var(--border)_transparent]">
                {content}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

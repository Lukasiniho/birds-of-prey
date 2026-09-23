'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import {
  ArrowLeftDuotone,
  ArrowRightDuotone,
  CornersOut as Expand,
  X,
} from '@/components/icons';
import { fullscreenSurface } from '@/components/fullscreen-styles';
import { SpeciesName } from '@/components/species-name';
import { ArtImage } from '@/components/art-image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type InfoColumn = { value: string; label: string; content: ReactNode };

function ViewLink({
  href,
  label,
  onNavigate,
  children,
  className,
  small = false,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  children: ReactNode;
  className?: string;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        buttonVariants({ variant: 'ghost', size: small ? 'icon-sm' : 'icon' }),
        className,
      )}
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
        onNavigate();
      }}
    >
      {children}
    </a>
  );
}

export function InfoFullscreenTrigger({
  name,
  href,
  onOpen,
}: {
  name: string;
  href: string;
  onOpen: () => void;
}) {
  return (
    <div className="info-expand-slot ml-auto flex h-(--control-height) items-center pb-[9px]">
      <ViewLink
        href={href}
        label={`Informationen zum ${name} im Vollbild öffnen`}
        onNavigate={onOpen}
        className="info-expand"
        small
      >
        <Expand />
      </ViewLink>
    </div>
  );
}

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
  atlasHref,
  previousHref,
  nextHref,
  onClose,
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
  atlasHref: string;
  previousHref: string;
  nextHref: string;
  onClose: () => void;
}) {
  const pageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    pageRef.current?.focus();
    // Direct visits do not mount SiteHeader, which normally restores the theme.
    try {
      const theme = localStorage.getItem('raptor:theme');
      if (theme === 'dark' || theme === 'light')
        document.documentElement.dataset.theme = theme;
    } catch {}
  }, []);
  // Am Dokument statt am Popup: der Fokus kann beim Blättern in einem der
  // Bedienelemente stehen, deren eigene Pfeiltasten das Ereignis sonst
  // abfangen, bevor es die Karte erreicht.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]'))
        return;
      // Nested maps, menus and popovers keep their own keyboard controls.
      if (
        document.querySelector(
          '[role="dialog"], [role="listbox"], [role="menu"], [data-slot="popover-content"]',
        )
      )
        return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      const delta =
        event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      if (!delta) return;
      event.preventDefault();
      onStep(delta);
    }
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onStep, onClose]);
  return (
    <div className="flow-root min-h-dvh bg-stage">
      <main
        ref={pageRef}
        tabIndex={-1}
        id="main-content"
        aria-label={`Informationen zum ${name}`}
        className={`${fullscreenSurface} relative grid m-(--atlas-gutter) rounded-(--radius-surface) border-(length:--border-structure)`}
      >
        {/* Kopfzeile wie im Atlas: Porträt, Namenspaar — und rechts daneben
            dieselbe Maßleiste, nur auf Kopfzeilenbreite geschrumpft. */}
        <div className="info-fullscreen-head flex items-start gap-4 pr-[56px] min-w-0">
          {/* Alles in der Kopfzeile beginnt an derselben Oberkante: das hohe
              Porträt gibt die Zeilenhöhe vor, Pfeile, Name und Klappmenü
              hängen daran und stehen damit auf einer Linie mit der Maßleiste
              rechts, statt an der Mitte des Porträts zu kleben. */}
          <div className="flex min-w-0 items-start gap-4 to-phone:flex-wrap to-phone:gap-2">
            {/* Größer als die Listenporträts: hier ist das Bild der Titel der
                Seite und nicht die Marke einer Zeile. */}
            {portrait && (
              <ArtImage
                className="block size-[88px] shrink-0 object-contain to-phone:size-(--species-row-portrait)"
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
              <ViewLink
                href={previousHref}
                label="Vorige Art"
                onNavigate={() => onStep(-1)}
              >
                <ArrowLeftDuotone style={{ color: 'var(--main-color)' }} />
              </ViewLink>
              <ViewLink
                href={nextHref}
                label="Nächste Art"
                onNavigate={() => onStep(1)}
              >
                <ArrowRightDuotone style={{ color: 'var(--main-color)' }} />
              </ViewLink>
            </div>
            {/* Buchstäblich der Namenskasten der Artenliste: gleiche Klasse,
                gleiche Variante, gleiche Rollen. */}
            <div className="flex min-w-0 items-start gap-1 to-phone:basis-full">
              <div className="species-row-name flex min-w-0 flex-col">
                <SpeciesName
                  name={name}
                  latin={latin}
                  commonAs="h1"
                  variant="big"
                />
              </div>
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
        <ViewLink
          href={atlasHref}
          label="Vollbild schließen"
          onNavigate={onClose}
          className="absolute right-(--panel-padding) top-(--panel-padding)"
        >
          <X />
        </ViewLink>
        {/* Die Spalten trennt eine Linie in der Mitte ihres Zwischenraums, nicht
            nur Luft — nebeneinander laufende Fließtexte verschwimmen sonst. */}
        <div className="info-fullscreen-columns grid grid-cols-3 min-h-0 to-tablet:grid-cols-1 to-tablet:auto-rows-max to-tablet:overflow-y-auto">
          {columns.map(({ value, label, content }) => (
            <section
              className="info-fullscreen-column flex flex-col min-w-0 min-h-0 gap-(--rail-content-gap) px-(--space-24) first:pl-0 last:pr-0 [&+section]:border-l-(length:--border-structure) to-tablet:shrink-0 to-tablet:px-0 to-tablet:[&+section]:border-l-0 to-tablet:[&+section]:mt-(--rail-section-gap)"
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
      </main>
    </div>
  );
}

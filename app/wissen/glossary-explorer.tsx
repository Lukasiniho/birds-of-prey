'use client';

import { Surface, SurfaceHeader } from '@/components/surface';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { DetailHeading } from '@/components/detail-text';
import { EcologyTag } from '@/components/ecology-tag';
import { Info } from '@/components/icons';
import { SearchField } from '@/components/search-field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  filterGlossary,
  glossaryCategories,
  glossaryEntries,
  type GlossaryCategory,
} from '@/lib/glossary';

function subscribe(notify: () => void) {
  window.addEventListener('popstate', notify);
  window.addEventListener('hashchange', notify);
  return () => {
    window.removeEventListener('popstate', notify);
    window.removeEventListener('hashchange', notify);
  };
}

export default function GlossaryExplorer() {
  const selected = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get('begriff') ?? '',
    () => '',
  );
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory | 'Alle'>('Alle');
  const activeEntry = useRef<HTMLDivElement>(null);
  const entries = filterGlossary(query, category);
  const selectedVisible = entries.some((entry) => entry.id === selected);

  useEffect(() => {
    if (!selectedVisible) return;
    // Run after the parent tab has scrolled its active label into view.
    const frame = window.requestAnimationFrame(() => {
      activeEntry.current?.scrollIntoView({ block: 'center' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected, selectedVisible]);

  return (
    <section className="grid gap-6" aria-label="Glossar">
      <div className="flex items-center justify-between gap-4 to-desktop:flex-col to-desktop:items-stretch">
        <div
          className="flex shrink-0 flex-wrap gap-2"
          role="group"
          aria-label="Glossar nach Thema filtern"
        >
          {(['Alle', ...glossaryCategories] as const).map((item) => (
            <EcologyTag
              as="button"
              size="large"
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className="aria-pressed:bg-(--selected-strong) aria-pressed:text-(--main-color)"
            >
              {item}
            </EcologyTag>
          ))}
        </div>
        <SearchField
          query={query}
          onQueryChange={setQuery}
          label="Glossar durchsuchen"
          placeholder="Begriff suchen …"
          className="min-w-0 w-full max-w-xs to-desktop:max-w-none"
        />
      </div>
      <p
        role="status"
        className="text-(length:--type-caption) text-muted-foreground"
      >
        {entries.length} von {glossaryEntries.length} Begriffen
      </p>
      {entries.length ? (
        <dl className="grid grid-cols-2 to-phone:grid-cols-1 gap-x-8">
          {entries.map((entry) => (
            <div
              key={entry.id}
              ref={entry.id === selected ? activeEntry : undefined}
              id={`glossar-${entry.id}`}
              className="glossary-entry group grid content-start gap-half py-panel"
              data-selected={entry.id === selected}
            >
              <dt className="font-(family-name:--font-stack-display) text-(length:--type-detail-heading) font-(--weight-label-heading) leading-(--leading-heading) group-data-[selected=true]:underline group-data-[selected=true]:decoration-(--main-color) group-data-[selected=true]:decoration-2 group-data-[selected=true]:underline-offset-4">
                {entry.term}
              </dt>
              <dd className="grid gap-2 text-(length:--type-body) leading-(--leading-relaxed)">
                <span className="text-(length:--type-caption) text-muted-foreground">
                  {entry.category}
                </span>
                <p>{entry.definition}</p>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <Surface kind="card" className="grid gap-4 bg-stage">
          <SurfaceHeader><DetailHeading>Kein Begriff gefunden</DetailHeading></SurfaceHeader>
          <p className="text-(length:--type-body) text-muted-foreground">
            Versuche einen anderen Suchbegriff oder zeige alle Themen an.
          </p>
          <button
            type="button"
            className="justify-self-start text-(--main-color) underline underline-offset-4"
            onClick={() => {
              setQuery('');
              setCategory('Alle');
            }}
          >
            Filter zurücksetzen
          </button>
        </Surface>
      )}
      <Popover>
        <PopoverTrigger
          openOnHover
          className="justify-self-start inline-flex items-center gap-1 min-h-(--control-height-compact) border-0 bg-transparent p-0 text-(length:--type-caption) text-muted-foreground hover:text-foreground"
        >
          <Info size={14} aria-hidden="true" />
          Quellen
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          aria-label="Quellen zum Glossar"
        >
          <p className="app-tooltip-title">Zum Weiterlesen</p>
          <a
            className="underline underline-offset-4"
            href="https://academy.allaboutbirds.org/feathers-article/"
          >
            Cornell Lab: Federn und Flügel
          </a>
          <a
            className="underline underline-offset-4"
            href="https://www.nabu.de/imperia/md/content/nabude/vogelschutz/27.pdf"
          >
            NABU: Faszination Greifvögel
          </a>
          <a
            className="underline underline-offset-4"
            href="https://d-f-o.de/falknerei/falknerei-begrifflichkeiten/"
          >
            Deutscher Falkenorden: Falknersprache
          </a>
        </PopoverContent>
      </Popover>
    </section>
  );
}

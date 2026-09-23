'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { DetailHeading, DetailCopy } from '@/components/detail-text';
import { EcologyTag } from '@/components/ecology-tag';
import { SearchField } from '@/components/search-field';
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
      activeEntry.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected, selectedVisible]);

  return (
    <section className="grid gap-6" aria-labelledby="glossary-heading">
      <header className="flex items-start justify-between gap-6 to-phone:flex-col">
        <div className="grid gap-2">
          <DetailHeading as="h2">
            <span id="glossary-heading">Greifvögel von A bis Z</span>
          </DetailHeading>
          <DetailCopy>
            Von Armschwingen bis Zugvogel: die wichtigsten Begriffe einfach
            erklärt.
          </DetailCopy>
        </div>
        <SearchField
          query={query}
          onQueryChange={setQuery}
          label="Glossar durchsuchen"
          placeholder="Begriff suchen …"
          className="min-w-0 w-full max-w-xs to-desktop:max-w-none"
        />
      </header>
      <div
        className="flex flex-wrap gap-2"
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
              tabIndex={entry.id === selected ? -1 : undefined}
              id={`glossar-${entry.id}`}
              className="glossary-entry grid content-start gap-2 p-panel border-t-(length:--border-structure) rounded-(--radius-small) data-[selected=true]:bg-(--selected)"
              data-selected={entry.id === selected}
            >
              <dt className="font-(family-name:--font-stack-display) text-(length:--type-detail-heading) font-(--weight-label-heading) leading-(--leading-heading)">
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
        <div className="grid gap-3 p-panel bg-stage rounded-(--radius-card)">
          <DetailHeading>Kein Begriff gefunden</DetailHeading>
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
        </div>
      )}
      <p className="text-(length:--type-caption) text-muted-foreground leading-(--leading-relaxed)">
        Zum Weiterlesen:{' '}
        <a
          className="underline underline-offset-4"
          href="https://academy.allaboutbirds.org/feathers-article/"
        >
          Cornell Lab: Federn und Flügel
        </a>{' '}
        ·{' '}
        <a
          className="underline underline-offset-4"
          href="https://www.nabu.de/imperia/md/content/nabude/vogelschutz/27.pdf"
        >
          NABU: Faszination Greifvögel
        </a>
        {' · '}
        <a
          className="underline underline-offset-4"
          href="https://d-f-o.de/falknerei/falknerei-begrifflichkeiten/"
        >
          Deutscher Falkenorden: Falknersprache
        </a>
      </p>
    </section>
  );
}

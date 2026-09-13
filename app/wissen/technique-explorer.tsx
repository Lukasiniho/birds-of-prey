'use client';
import { cn } from '@/lib/utils';
import { explorerStyles } from '@/components/explorer-styles';
import { KnowledgeBirdGroup as HunterGroup } from '@/components/knowledge-bird-group';

import { DetailHeading, DetailCopy } from '@/components/detail-text';

import { useEffect, useState } from 'react';
import { ArtImage } from '@/components/art-image';
import { Crosshair } from '@/components/icons';
import type { TechniqueEntry, TechniqueHunter } from './knowledge-data';

function countLabel(count: number) {
  return count === 1 ? '1 Art' : `${count} Arten`;
}

export default function TechniqueExplorer({
  techniques,
}: {
  techniques: TechniqueEntry[];
}) {
  const [selected, setSelected] = useState(techniques[0]?.id ?? '');
  const [hovered, setHovered] = useState<TechniqueHunter | null>(null);
  // A hunting tag in the atlas links straight to its chapter: ?technik=<id>.
  useEffect(() => {
    function syncFromUrl() {
      const id = new URLSearchParams(window.location.search).get('technik');
      if (id && techniques.some((item) => item.id === id)) setSelected(id);
    }
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [techniques]);
  function choose(id: string) {
    setSelected(id);
    const url = new URL(window.location.href);
    url.searchParams.set('technik', id);
    window.history.replaceState(window.history.state, '', url);
  }
  const entry =
    techniques.find((item) => item.id === selected) ?? techniques[0];
  const typical = entry.hunters.filter((h) => h.importance === 'primary');
  const additional = entry.hunters.filter((h) => h.importance !== 'primary');

  return (
    <div
      className={cn('knowledge-split technique-explorer', explorerStyles.panel)}
    >
      <section
        className="knowledge-surface bg-stage min-w-0"
        aria-label="Jagdtechniken"
      >
        <header className="knowledge-surface-heading to-tablet:items-start to-tablet:flex-wrap flex items-center justify-between gap-4 p-panel">
          <div>
            <span className="knowledge-eyebrow text-muted-foreground text-(length:--type-caption) font-(--weight-medium) tracking-(--tracking-caps) block uppercase mb-1">
              Strategie & Beute
            </span>
            <DetailHeading>Wie Greifvögel jagen</DetailHeading>
          </div>
          <Crosshair size={24} aria-hidden="true" />
        </header>
        <fieldset
          className="knowledge-grid grid grid-cols-5 to-tablet:grid-cols-3 px-panel pb-panel gap-2"
          aria-label="Jagdtechnik wählen"
        >
          {techniques.map((item) => (
            <button
              type="button"
              key={item.id}
              className="knowledge-tile flex flex-col items-center gap-half py-3 px-2 text-center"
              aria-pressed={item.id === entry.id}
              data-related={
                hovered ? hovered.techniques.includes(item.id) : undefined
              }
              onClick={() => choose(item.id)}
            >
              <span className="knowledge-tile-art size-[72px] min-h-0 mb-2 grid place-items-center">
                <ArtImage
                  className="size-full object-contain"
                  src={item.image}
                  alt=""
                  width={72}
                  height={72}
                  displayWidth={72}
                />
              </span>
              <span className="knowledge-tile-name font-(--weight-medium) leading-(--leading-compact)">
                {item.label}
              </span>
              <span className="knowledge-tile-count text-(length:--type-caption) text-muted-foreground">
                {countLabel(item.hunters.length)}
              </span>
            </button>
          ))}
        </fieldset>
      </section>
      <aside
        className={cn(
          'knowledge-notes bg-(--atlas-info-surface) relative min-w-0',
          explorerStyles.notes,
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="knowledge-notes-scroll to-tablet:static to-tablet:overflow-visible absolute inset-0 overflow-y-auto detail-panel"
          key={entry.id}
        >
          <span className="knowledge-eyebrow text-muted-foreground text-(length:--type-caption) font-(--weight-medium) tracking-(--tracking-caps) block uppercase mb-1">
            Jagdtechnik · {countLabel(entry.hunters.length)}
          </span>
          <DetailHeading>{entry.label}</DetailHeading>
          <DetailCopy className="mt-3">{entry.text}</DetailCopy>
          {typical.length > 0 && (
            <HunterGroup
              title="Typische Technik"
              hunters={typical}
              onHover={setHovered}
            />
          )}
          {additional.length > 0 && (
            <HunterGroup
              title="Ergänzend"
              hunters={additional}
              onHover={setHovered}
            />
          )}
          <DetailCopy className="mt-3">
            Beim Überfahren einer Art leuchten links alle Techniken auf, die sie
            ebenfalls nutzt.
          </DetailCopy>
        </div>
      </aside>
    </div>
  );
}

'use client';

import { DetailHeading, DetailCopy } from '@/components/detail-text';

import { useState } from 'react';
import { ArrowUpRight, ForkKnife } from '@/components/icons';
import { PreyArt } from '@/components/prey-art';
import { SpeciesRowLink } from '@/components/species-row';
import { TooltipHint } from '@/components/ui/tooltip';
import type { PreyEntry, PreyHunter } from './knowledge-data';

function countLabel(count: number) {
  return count === 1 ? '1 Art' : `${count} Arten`;
}

export default function PreyExplorer({ prey }: { prey: PreyEntry[] }) {
  const [selected, setSelected] = useState(prey[0]?.key ?? '');
  const [hoveredHunter, setHoveredHunter] = useState<PreyHunter | null>(null);
  const entry = prey.find((item) => item.key === selected) ?? prey[0];
  const primary = entry.hunters.filter((h) => h.importance === 'primary');
  const occasional = entry.hunters.filter((h) => h.importance !== 'primary');

  return (
    <div className="explorer-layout knowledge-split prey-explorer">
      <section
        className="knowledge-surface bg-stage min-w-0"
        aria-label="Beutetiere"
      >
        <header className="knowledge-surface-heading to-tablet:items-start to-tablet:flex-wrap flex items-center justify-between gap-4 p-panel">
          <div>
            <span className="knowledge-eyebrow text-muted-foreground text-(length:--type-caption) font-(--weight-medium) tracking-(--tracking-caps) block uppercase mb-1">
              Beute & Jäger
            </span>
            <DetailHeading>Wer jagt was?</DetailHeading>
          </div>
          <ForkKnife size={24} aria-hidden="true" />
        </header>
        <fieldset
          className="knowledge-grid grid grid-cols-[repeat(auto-fill,minmax(124px,1fr))] to-tablet:grid-cols-[repeat(auto-fill,minmax(104px,1fr))] px-panel pb-panel gap-2"
          aria-label="Beutetier wählen"
        >
          {prey.map((item) => (
            <button
              type="button"
              key={item.key}
              className="knowledge-tile flex flex-col items-center gap-half py-3 px-2 text-center"
              aria-pressed={item.key === entry.key}
              data-related={
                hoveredHunter
                  ? hoveredHunter.prey.includes(item.key)
                  : undefined
              }
              onClick={() => setSelected(item.key)}
            >
              <PreyArt preyKey={item.key} variant="tile" />
              <span className="knowledge-tile-name font-(--weight-medium) leading-(--leading-compact)">
                {item.name}
              </span>
              <span className="knowledge-tile-count text-(length:--type-caption) text-muted-foreground">
                {countLabel(item.hunters.length)}
              </span>
            </button>
          ))}
        </fieldset>
      </section>
      <aside
        className="explorer-notes knowledge-notes bg-(--atlas-info-surface) relative min-w-0"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="knowledge-notes-scroll to-tablet:static to-tablet:overflow-visible absolute inset-0 overflow-y-auto detail-panel"
          key={entry.key}
        >
          <span className="knowledge-eyebrow text-muted-foreground text-(length:--type-caption) font-(--weight-medium) tracking-(--tracking-caps) block uppercase mb-1">
            Beutetier · {countLabel(entry.hunters.length)}
          </span>
          <DetailHeading>{entry.name}</DetailHeading>
          {primary.length > 0 && (
            <HunterGroup
              title="Hauptbeute"
              hunters={primary}
              onHover={setHoveredHunter}
            />
          )}
          {occasional.length > 0 && (
            <HunterGroup
              title="Gelegentlich"
              hunters={occasional}
              onHover={setHoveredHunter}
            />
          )}
          <DetailCopy className="mt-3">
            Beim Überfahren eines Greifvogels leuchten links alle Beutetiere
            auf, die er ebenfalls jagt.
          </DetailCopy>
        </div>
      </aside>
    </div>
  );
}

function HunterGroup({
  title,
  hunters,
  onHover,
}: {
  title: string;
  hunters: PreyHunter[];
  onHover: (hunter: PreyHunter | null) => void;
}) {
  return (
    <div className="knowledge-group">
      <h3 className="mt-(--space-24) text-(length:--type-ui) font-(--weight-medium) text-(--muted-foreground)">
        {title}
      </h3>
      <div className="knowledge-bird-list grid gap-2 mt-4">
        {hunters.map((hunter) => {
          const row = (
            <SpeciesRowLink
              size="inline"
              href={hunter.href}
              key={hunter.id}
              portrait={hunter.portrait}
              name={hunter.name}
              latin={hunter.latin}
              trailing={<ArrowUpRight size={16} aria-hidden="true" />}
              onMouseEnter={() => onHover(hunter)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(hunter)}
              onBlur={() => onHover(null)}
            />
          );
          return hunter.note ? (
            <TooltipHint key={hunter.id} content={hunter.note}>
              {row}
            </TooltipHint>
          ) : (
            row
          );
        })}
      </div>
    </div>
  );
}

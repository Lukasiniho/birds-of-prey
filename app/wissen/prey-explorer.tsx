'use client';

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
    <div className="knowledge-split prey-explorer">
      <section className="knowledge-surface" aria-label="Beutetiere">
        <header className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Beute & Jäger</span>
            <h2>Wer jagt was?</h2>
          </div>
          <ForkKnife size={24} aria-hidden="true" />
        </header>
        <fieldset className="knowledge-grid" aria-label="Beutetier wählen">
          {prey.map((item) => (
            <button
              type="button"
              key={item.key}
              className="knowledge-tile"
              aria-pressed={item.key === entry.key}
              data-related={
                hoveredHunter
                  ? hoveredHunter.prey.includes(item.key)
                  : undefined
              }
              onClick={() => setSelected(item.key)}
            >
              <PreyArt preyKey={item.key} />
              <span className="knowledge-tile-name">{item.name}</span>
              <span className="knowledge-tile-count">
                {countLabel(item.hunters.length)}
              </span>
            </button>
          ))}
        </fieldset>
      </section>
      <aside className="knowledge-notes" aria-live="polite" aria-atomic="true">
        <div className="knowledge-notes-scroll detail-panel" key={entry.key}>
          <span className="knowledge-eyebrow">
            Beutetier · {countLabel(entry.hunters.length)}
          </span>
          <h2>{entry.name}</h2>
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
          <p>
            Beim Überfahren eines Greifvogels leuchten links alle Beutetiere
            auf, die er ebenfalls jagt.
          </p>
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
      <h3>{title}</h3>
      <div className="knowledge-bird-list">
        {hunters.map((hunter) => {
          const row = (
            <SpeciesRowLink
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

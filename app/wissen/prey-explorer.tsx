'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ForkKnife } from '@/components/icons';
import { PreyArt } from '@/components/prey-art';
import { SpeciesName } from '@/components/species-name';
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
      <section className="prey-surface" aria-label="Beutetiere">
        <header className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Beute & Jäger</span>
            <h2>Wer jagt was?</h2>
          </div>
          <ForkKnife size={24} aria-hidden="true" />
        </header>
        <fieldset className="prey-grid" aria-label="Beutetier wählen">
          {prey.map((item) => (
            <button
              type="button"
              key={item.key}
              className="prey-tile"
              aria-pressed={item.key === entry.key}
              data-related={
                hoveredHunter
                  ? hoveredHunter.prey.includes(item.key)
                  : undefined
              }
              onClick={() => setSelected(item.key)}
            >
              <PreyArt preyKey={item.key} />
              <span className="prey-tile-name">{item.name}</span>
              <span className="prey-tile-count">
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
    <div className="prey-group">
      <h3>{title}</h3>
      <div className="knowledge-bird-list">
        {hunters.map((hunter) => {
          const row = (
            <a
              href={hunter.href}
              key={hunter.id}
              className="knowledge-bird"
              onMouseEnter={() => onHover(hunter)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(hunter)}
              onBlur={() => onHover(null)}
            >
              <Image
                src={hunter.portrait}
                alt=""
                width={52}
                height={52}
                unoptimized
              />
              <span className="knowledge-bird-name">
                <SpeciesName
                  name={hunter.name}
                  latin={hunter.latin}
                  variant="sidebar"
                  commonAs="span"
                  scientificAs="i"
                />
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
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

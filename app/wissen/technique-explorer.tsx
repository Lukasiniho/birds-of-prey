'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Crosshair } from '@/components/icons';
import { SpeciesName } from '@/components/species-name';
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
  const entry =
    techniques.find((item) => item.id === selected) ?? techniques[0];
  const typical = entry.hunters.filter((h) => h.importance === 'primary');
  const additional = entry.hunters.filter((h) => h.importance !== 'primary');

  return (
    <div className="knowledge-split technique-explorer">
      <section className="knowledge-surface" aria-label="Jagdtechniken">
        <header className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Strategie & Beute</span>
            <h2>Wie Greifvögel jagen</h2>
          </div>
          <Crosshair size={24} aria-hidden="true" />
        </header>
        <fieldset className="knowledge-grid" aria-label="Jagdtechnik wählen">
          {techniques.map((item) => (
            <button
              type="button"
              key={item.id}
              className="knowledge-tile"
              aria-pressed={item.id === entry.id}
              data-related={
                hovered ? hovered.techniques.includes(item.id) : undefined
              }
              onClick={() => setSelected(item.id)}
            >
              <span className="knowledge-tile-art">
                <Image
                  src={item.image}
                  alt=""
                  width={72}
                  height={72}
                  unoptimized
                />
              </span>
              <span className="knowledge-tile-name">{item.label}</span>
              <span className="knowledge-tile-count">
                {countLabel(item.hunters.length)}
              </span>
            </button>
          ))}
        </fieldset>
      </section>
      <aside className="knowledge-notes" aria-live="polite" aria-atomic="true">
        <div className="knowledge-notes-scroll detail-panel" key={entry.id}>
          <span className="knowledge-eyebrow">
            Jagdtechnik · {countLabel(entry.hunters.length)}
          </span>
          <h2>{entry.label}</h2>
          <p>{entry.text}</p>
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
          <p>
            Beim Überfahren einer Art leuchten links alle Techniken auf, die sie
            ebenfalls nutzt.
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
  hunters: TechniqueHunter[];
  onHover: (hunter: TechniqueHunter | null) => void;
}) {
  return (
    <div className="knowledge-group">
      <h3>{title}</h3>
      <div className="knowledge-bird-list">
        {hunters.map((hunter) => (
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
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Globe, Info } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TooltipHint } from '@/components/ui/tooltip';
import { SpeciesName } from '@/components/species-name';
import { rangeBasemapUrl } from '@/lib/range-maps';
import {
  createMapLoader,
  parseBasemap,
  type Basemap,
} from '@/lib/range-map-data';
import { falconryRegions, type KnowledgeBird } from './knowledge-data';

const loadBasemap = createMapLoader(parseBasemap);
// Projected through scripts/map-projection.mjs, exactly like the existing map.
const locations: Record<string, [number, number]> = {
  mongolei: [714.11, 116.95],
  arabien: [622.47, 192.66],
  europa: [524.44, 110.51],
  amerika: [215.89, 166.55],
  japan: [854.11, 158.07],
  persien: [703.24, 184.79],
  zentralasien: [684.24, 135.28],
  'britische-inseln': [495.36, 104.82],
  'nordischer-raum': [459.64, 70.42],
};

// Offset portraits keep nearby traditions selectable; lines retain geographic anchors.
const pinLocations: typeof locations = {
  amerika: [215, 166],
  'nordischer-raum': [415, 35],
  'britische-inseln': [360, 145],
  europa: [515, 185],
  arabien: [610, 300],
  persien: [770, 280],
  zentralasien: [610, 55],
  mongolei: [780, 105],
  japan: [920, 190],
};

export default function FalconryWorld({ birds }: { birds: KnowledgeBird[] }) {
  const [selected, setSelected] = useState('mongolei');
  const [base, setBase] = useState<Basemap | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const region = falconryRegions.find((item) => item.id === selected)!;
  useEffect(() => {
    let active = true;
    loadBasemap(rangeBasemapUrl)
      .then((data) => {
        if (active) setBase(data);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  return (
    <div className="knowledge-split falconry-world">
      <section
        className="falconry-map-surface"
        aria-label="Falknerei auf der Weltkarte"
      >
        <header className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Mensch & Greifvogel</span>
            <h2>Eine Kunst, viele Traditionen</h2>
          </div>
          <Globe size={24} aria-hidden="true" />
        </header>
        <div className="falconry-map">
          {base ? (
            <>
              <svg
                viewBox={base.viewBox.join(' ')}
                aria-hidden="true"
                className="falconry-basemap"
              >
                <g>
                  {base.paths.map((d, index) => (
                    <path
                      key={index}
                      d={d}
                      fillRule="evenodd"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
                {falconryRegions.map((item) => {
                  const [x, y] = locations[item.id];
                  const [pinX, pinY] = pinLocations[item.id];
                  return (
                    <g
                      key={item.id}
                      className="falconry-map-callout"
                      data-selected={selected === item.id}
                    >
                      <line
                        x1={x}
                        y1={y}
                        x2={pinX}
                        y2={pinY}
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle cx={x} cy={y} r={3} />
                    </g>
                  );
                })}
              </svg>
              {falconryRegions.map((item) => {
                const [x, y] = pinLocations[item.id];
                const bird = birds.find((bird) => bird.id === item.birds[0])!;
                return (
                  <button
                    type="button"
                    className="falconry-map-pin"
                    key={item.id}
                    style={{
                      left: `${((x - base.viewBox[0]) / base.viewBox[2]) * 100}%`,
                      top: `${((y - base.viewBox[1]) / base.viewBox[3]) * 100}%`,
                    }}
                    aria-label={`${item.name}: ${item.title}`}
                    aria-pressed={selected === item.id}
                    onClick={() => setSelected(item.id)}
                  >
                    <span className="falconry-pin-portrait">
                      <Image
                        src={bird.portrait}
                        alt=""
                        width={52}
                        height={52}
                        unoptimized
                      />
                    </span>
                    <span className="falconry-pin-label">{item.name}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <output className="falconry-map-status">
              {failed ? (
                <>
                  <p>
                    Die Karte konnte nicht geladen werden. Die Regionen bleiben
                    unten auswählbar.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFailed(false);
                      setAttempt((value) => value + 1);
                    }}
                  >
                    Erneut laden
                  </Button>
                </>
              ) : (
                'Weltkarte wird geladen …'
              )}
            </output>
          )}
          <FalconryMapInfo />
        </div>
        <fieldset
          className="falconry-region-choices"
          aria-label="Falknereiregion wählen"
        >
          {falconryRegions.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              aria-pressed={selected === item.id}
              onClick={() => setSelected(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </fieldset>
      </section>
      <aside
        className="knowledge-notes detail-panel"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="knowledge-eyebrow">{region.place}</span>
        <h2>{region.title}</h2>
        <span className="knowledge-tag falconry-region-tag">{region.tag}</span>
        <p>{region.text}</p>
        <div className="falconry-world-birds">
          {region.birds.map((id) => {
            const bird = birds.find((item) => item.id === id)!;
            return (
              <a href={bird.href} key={id} className="falconry-world-bird">
                <Image
                  src={bird.portrait}
                  alt=""
                  width={52}
                  height={52}
                  unoptimized
                />
                <span className="falconry-bird-name">
                  <SpeciesName
                    name={bird.name}
                    latin={bird.latin}
                    variant="sidebar"
                    commonAs="span"
                    scientificAs="i"
                  />
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <p className="knowledge-observe">{region.detail}</p>
        <a
          className="knowledge-source"
          href={region.source}
          target="_blank"
          rel="noreferrer"
        >
          {region.sourceName}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {'additionalSource' in region && (
          <a
            className="knowledge-source"
            href={region.additionalSource}
            target="_blank"
            rel="noreferrer"
          >
            {region.additionalSourceName}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        <Link href="/falknerei" className="knowledge-text-link">
          Grundlagen, Ausrüstung & Beizvögel entdecken
        </Link>
      </aside>
    </div>
  );
}

// Sources sit in the same info popover as on the distribution maps.
function FalconryMapInfo() {
  return (
    <Popover>
      <TooltipHint content="Karte, Quelle und Kulturerbe">
        <PopoverTrigger
          className="range-map-source"
          aria-label="Karte, Quelle und Kulturerbe"
        >
          <Info size={14} aria-hidden="true" />
        </PopoverTrigger>
      </TooltipHint>
      <PopoverContent
        side="top"
        align="start"
        className="range-map-source-details"
      >
        <div className="range-map-credits">
          <div>Ausgewählte Traditionen · keine Verbreitungskarte</div>
          <small>
            Basiskarte:{' '}
            <a
              href="https://www.naturalearthdata.com/about/terms-of-use/"
              target="_blank"
              rel="noreferrer"
            >
              Natural Earth
            </a>
          </small>
          <small>
            Falknerei ist von der UNESCO als immaterielles Kulturerbe anerkannt.{' '}
            <a
              href="https://ich.unesco.org/en/RL/falconry-a-living-human-heritage-01708"
              target="_blank"
              rel="noreferrer"
            >
              Zum Kulturerbe
            </a>
          </small>
        </div>
      </PopoverContent>
    </Popover>
  );
}

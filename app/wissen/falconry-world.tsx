'use client';

import { useEffect, useState } from 'react';
import { ArtImage } from '@/components/art-image';
import { ArrowUpRight, Info } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TooltipHint } from '@/components/ui/tooltip';
import { SpeciesRowLink } from '@/components/species-row';
import { rangeBasemapUrl } from '@/lib/range-maps';
import { SegmentedControl } from '@/components/segmented-control';
import {
  createMapLoader,
  parseBasemap,
  type Basemap,
} from '@/lib/range-map-data';
import {
  falconryEras,
  falconryRegions,
  type FalconryChapter,
  type KnowledgeBird,
} from './knowledge-data';

const loadBasemap = createMapLoader(parseBasemap);
// The basemap ships the whole globe; the falconry world sits between Alaska and
// Japan, so we crop off the empty Pacific and Antarctica and let the rest grow.
const mapView = [108, 6, 857, 450] as const;
// Projected through scripts/map-projection.mjs, exactly like the existing map.
const locations: Record<string, [number, number]> = {
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
  zentralasien: [780, 105],
  japan: [920, 190],
};

const views = [
  { value: 'karte', label: 'Karte' },
  { value: 'zeitstrahl', label: 'Zeitstrahl' },
] as const;
type View = (typeof views)[number]['value'];

export default function FalconryWorld({ birds }: { birds: KnowledgeBird[] }) {
  const [view, setView] = useState<View>('karte');
  const [selected, setSelected] = useState('zentralasien');
  const [era, setEra] = useState('ursprung');
  const [base, setBase] = useState<Basemap | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const region = falconryRegions.find((item) => item.id === selected)!;
  const chapter: FalconryChapter =
    view === 'karte' ? region : falconryEras.find((item) => item.id === era)!;
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
        aria-label={
          view === 'karte'
            ? 'Falknerei auf der Weltkarte'
            : 'Falknerei im Zeitstrahl'
        }
      >
        <header className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Mensch & Greifvogel</span>
            <h2>Eine Kunst, viele Traditionen</h2>
          </div>
          <SegmentedControl
            label="Karte oder Zeitstrahl"
            group="falknerei"
            value={view}
            options={views}
            onChange={setView}
          />
        </header>
        {view === 'zeitstrahl' ? (
          <div className="falconry-timeline-surface">
            <ol className="falconry-timeline" aria-label="Stationen wählen">
              {falconryEras.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="falconry-era"
                    aria-pressed={era === item.id}
                    onClick={() => setEra(item.id)}
                  >
                    <span className="falconry-era-date">{item.era}</span>
                    <span className="falconry-era-marker" aria-hidden="true" />
                    <span className="falconry-era-text">
                      <span className="falconry-era-name">{item.name}</span>
                      <span className="falconry-era-summary">
                        {item.summary}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <FalconryMapInfo chapter={chapter} basemap={false} />
          </div>
        ) : (
          <div className="falconry-map">
            {base ? (
              <>
                <svg
                  viewBox={mapView.join(' ')}
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
                        left: `${((x - mapView[0]) / mapView[2]) * 100}%`,
                        top: `${((y - mapView[1]) / mapView[3]) * 100}%`,
                      }}
                      aria-label={`${item.name}: ${item.title}`}
                      aria-pressed={selected === item.id}
                      onClick={() => setSelected(item.id)}
                    >
                      <span className="falconry-pin-portrait">
                        <ArtImage
                          src={bird.portrait}
                          alt=""
                          width={52}
                          height={52}
                          displayWidth={40}
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
                      Die Karte konnte nicht geladen werden. Die Regionen
                      bleiben unten auswählbar.
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
            <FalconryMapInfo chapter={chapter} basemap />
          </div>
        )}
        {view === 'karte' && (
          <fieldset
            className="ecology-tags falconry-region-choices"
            aria-label="Falknereiregion wählen"
          >
            {falconryRegions.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={selected === item.id}
                onClick={() => setSelected(item.id)}
              >
                {item.name}
              </button>
            ))}
          </fieldset>
        )}
      </section>
      <aside className="knowledge-notes" aria-live="polite" aria-atomic="true">
        <div
          className="knowledge-notes-scroll detail-panel"
          key={`${view}-${chapter.id}`}
        >
          <span className="knowledge-eyebrow">{chapter.place}</span>
          <h2>{chapter.title}</h2>
          <div className="knowledge-bird-list">
            {chapter.birds.map((id) => {
              const bird = birds.find((item) => item.id === id)!;
              return (
                <SpeciesRowLink
                  href={bird.href}
                  key={id}
                  portrait={bird.portrait}
                  name={bird.name}
                  latin={bird.latin}
                  trailing={<ArrowUpRight size={16} aria-hidden="true" />}
                />
              );
            })}
          </div>
          <p>{chapter.text}</p>
          <p>{chapter.detail}</p>
        </div>
      </aside>
    </div>
  );
}

// Sources sit in the same info popover as on the distribution maps.
function FalconryMapInfo({
  chapter,
  basemap,
}: {
  chapter: FalconryChapter;
  basemap: boolean;
}) {
  const label = basemap
    ? 'Quellen, Karte und Kulturerbe'
    : 'Quellen und Kulturerbe';
  return (
    <Popover>
      <TooltipHint content={label}>
        <PopoverTrigger className="range-map-source" aria-label={label}>
          <Info size={14} aria-hidden="true" />
        </PopoverTrigger>
      </TooltipHint>
      <PopoverContent
        side="top"
        align="start"
        className="range-map-source-details"
      >
        <div className="range-map-credits">
          {chapter.sources.map((source) => (
            <div key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.name}
              </a>
            </div>
          ))}
          {basemap ? (
            <>
              <small>Ausgewählte Traditionen · keine Verbreitungskarte</small>
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
            </>
          ) : (
            <small>Ausgewählte Wendepunkte · Zeitangaben gerundet</small>
          )}
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

'use client';
import {
  ExplorerPanel,
  ExplorerStage,
  ExplorerHeader,
  ExplorerNotes,
} from '@/components/explorer-panel';
import { EcologyTag } from '@/components/ecology-tag';
import { cn } from '@/lib/utils';

import { DetailCopy } from '@/components/detail-text';

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
    <ExplorerPanel className={'knowledge-split falconry-world'}>
      <ExplorerStage
        className="falconry-map-surface"
        aria-label={
          view === 'karte'
            ? 'Falknerei auf der Weltkarte'
            : 'Falknerei im Zeitstrahl'
        }
      >
        <ExplorerHeader
          eyebrow="Mensch & Greifvogel"
          title="Eine Kunst, viele Traditionen"
          actions={
            <SegmentedControl
              label="Karte oder Zeitstrahl"
              group="falknerei"
              value={view}
              options={views}
              onChange={setView}
            />
          }
        />
        {view === 'zeitstrahl' ? (
          <div className="falconry-timeline-surface relative">
            <ol
              className="falconry-timeline list-none m-0 p-0 grid"
              aria-label="Stationen wählen"
            >
              {falconryEras.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="falconry-era grid grid-cols-[132px_var(--space-16)_minmax(0,1fr)] to-tablet:grid-cols-[88px_var(--space-16)_minmax(0,1fr)] items-start gap-x-3 w-full py-3 px-2 text-left"
                    aria-pressed={era === item.id}
                    onClick={() => setEra(item.id)}
                  >
                    <span className="falconry-era-date text-(length:--type-caption) text-muted-foreground leading-(--leading-normal) pt-half text-right">
                      {item.era}
                    </span>
                    <FalconryTimelineMarker
                      first={index === 0}
                      last={index === falconryEras.length - 1}
                    />
                    <span className="falconry-era-text grid gap-half min-w-0">
                      <span className="falconry-era-name text-(length:--type-ui) font-(--weight-medium) leading-(--leading-normal)">
                        {item.name}
                      </span>
                      <span className="falconry-era-summary text-(length:--type-body) leading-(--leading-relaxed) text-muted-foreground">
                        {item.summary}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="falconry-map aspect-[857/450] to-tablet:my-6 to-tablet:mx-0 relative w-full">
            {base ? (
              <>
                <svg
                  viewBox={mapView.join(' ')}
                  aria-hidden="true"
                  className="falconry-basemap size-full block"
                >
                  <g>
                    {base.paths.map((d, index) => (
                      <path
                        key={index}
                        d={d}
                        fill="color-mix(in srgb, var(--main-color) var(--tint-3), var(--stage))"
                        stroke="color-mix(in srgb, var(--main-color) var(--tint-5), var(--stage))"
                        strokeWidth="0.55px"
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
                        className="falconry-map-callout text-muted-foreground data-[selected=true]:text-(--main-color) transition-[color] duration-(--duration-fast) ease-(--ease-smooth-out)"
                        data-selected={selected === item.id}
                      >
                        <line
                          stroke="currentColor"
                          strokeWidth={1}
                          opacity={0.5}
                          x1={x}
                          y1={y}
                          x2={pinX}
                          y2={pinY}
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle fill="currentColor" cx={x} cy={y} r={3} />
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
                      className="falconry-map-pin -translate-x-1/2 -translate-y-1/2 aria-pressed:z-2 to-compact:size-[48px] to-tablet:size-[44px] absolute size-[56px] z-1"
                      key={item.id}
                      style={{
                        left: `${((x - mapView[0]) / mapView[2]) * 100}%`,
                        top: `${((y - mapView[1]) / mapView[3]) * 100}%`,
                      }}
                      aria-label={`${item.name}: ${item.title}`}
                      aria-pressed={selected === item.id}
                      onClick={() => setSelected(item.id)}
                    >
                      <span className="falconry-pin-portrait bg-background grid place-items-center size-full">
                        <ArtImage
                          className="size-[46px] to-compact:size-[40px] to-tablet:size-[36px] object-contain"
                          src={bird.portrait}
                          alt=""
                          width={46}
                          height={46}
                          displayWidth={46}
                        />
                      </span>
                      <span className="falconry-pin-label transition-[color] duration-(--duration-quick) ease-(--ease-smooth-out) top-[calc(100%+var(--space-4))] -translate-x-1/2 bg-background rounded-(--radius-small) text-(length:--type-ui) text-muted-foreground pointer-events-none absolute left-[50%] py-half px-2 whitespace-nowrap">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </>
            ) : (
              <output className="falconry-map-status text-muted-foreground text-(length:--type-body) flex flex-col gap-3 items-center justify-center absolute inset-0 p-panel text-center">
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
          </div>
        )}
        {view === 'karte' && (
          <fieldset
            className="ecology-tags flex flex-wrap gap-2 falconry-region-choices m-0 p-0"
            aria-label="Falknereiregion wählen"
          >
            {falconryRegions.map((item) => (
              <EcologyTag
                as="button"
                type="button"
                key={item.id}
                aria-pressed={selected === item.id}
                onClick={() => setSelected(item.id)}
              >
                {item.name}
              </EcologyTag>
            ))}
          </fieldset>
        )}
        <FalconryMapInfo chapter={chapter} basemap={view === 'karte'} />
      </ExplorerStage>
      <ExplorerNotes
        className="knowledge-notes"
        aria-live="polite"
        aria-atomic="true"
        scrollKey={`${view}-${chapter.id}`}
      >
        <ExplorerHeader
          eyebrow={<> {chapter.place} </>}
          title={chapter.title}
        />
        <div className="knowledge-bird-list grid gap-2 mt-4">
          {chapter.birds.map((id) => {
            const bird = birds.find((item) => item.id === id)!;
            return (
              <SpeciesRowLink
                size="inline"
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
        <DetailCopy className="mt-3">{chapter.text}</DetailCopy>
        <DetailCopy className="mt-3">{chapter.detail}</DetailCopy>
      </ExplorerNotes>
    </ExplorerPanel>
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
        <PopoverTrigger
          className="range-map-source ml-auto grid place-items-center size-(--control-height-compact)"
          aria-label={label}
        >
          <Info size={14} aria-hidden="true" />
        </PopoverTrigger>
      </TooltipHint>
      <PopoverContent
        side="top"
        align="start"
        className="range-map-source-details"
      >
        <div className="range-map-credits text-muted-foreground text-(length:--type-caption) leading-(--leading-normal) flex flex-wrap gap-[5px] mt-[6px]">
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

function FalconryTimelineMarker({
  first,
  last,
}: {
  first: boolean;
  last: boolean;
}) {
  return (
    <span
      className="falconry-era-marker relative self-stretch block w-4 min-h-full"
      aria-hidden="true"
    >
      <span
        className={cn(
          'absolute left-1/2 w-px -translate-x-1/2 bg-border',
          first ? 'top-[10px]' : '-top-3',
          last ? 'bottom-auto h-[calc(10px+var(--space-12))]' : '-bottom-3',
        )}
      />
      <span className="falconry-era-dot absolute left-1/2 top-[5px] size-[10px] rounded-[50%] -translate-x-1/2" />
    </span>
  );
}

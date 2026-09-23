'use client';

import { useEffect, useId, useState } from 'react';
import { cn } from '@/lib/utils';
import { Info } from '@/components/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { rangeBasemapUrl } from '@/lib/range-maps';
import type { DisplayRangeMapEntry as RangeMapEntry } from '@/lib/range-map-entry';
import {
  createMapLoader,
  parseBasemap,
  parseOverlay,
  type MapData,
} from '@/lib/range-map-data';

const loadBasemap = createMapLoader(parseBasemap);
const loadOverlay = createMapLoader(parseOverlay);

/** Basemap and overlay for one species; null until both have arrived.
 *  Callers key the map on the species, so a switch mounts a fresh loader. */
export function useRangeMap(entry: RangeMapEntry | undefined) {
  const [data, setData] = useState<MapData | null>(null);
  const url = entry?.url;
  useEffect(() => {
    if (!url) return;
    let active = true;
    Promise.all([loadBasemap(rangeBasemapUrl), loadOverlay(url)])
      .then(([base, range]) => {
        if (active) setData({ base, range });
      })
      .catch(() => {
        // A missing or unavailable map leaves this optional section hidden.
      });
    return () => {
      active = false;
    };
  }, [url]);
  return data;
}

function MapLegend({ label }: { label: string }) {
  return (
    <div className="range-map-legend rounded-(--radius-control) text-(length:--type-caption) leading-(--leading-heading) bg-background text-foreground absolute top-[8px] right-[8px] flex items-center gap-[6px] py-1 px-2 pointer-events-none">
      <span
        className="size-[10px] rounded-(--radius-small) bg-(--map-range) flex-none"
        aria-hidden="true"
      />{' '}
      {label}
    </div>
  );
}

export function MapDrawing({
  data,
  name,
  label,
  world = false,
  framed = false,
}: {
  data: MapData;
  name: string;
  label: string;
  world?: boolean;
  framed?: boolean | 'card';
}) {
  const clip = `land-${useId()}`;
  return (
    <div className="range-map-frame relative">
      <svg
        className={cn(
          'range-map-svg block w-full h-auto aspect-[1.85] bg-(--map-water)',
          framed && 'border-(length:--border-structure)',
          framed &&
            (framed === 'card' ? 'rounded-(--radius-card)' : 'rounded-(--radius-control)'),
        )}
        viewBox={(world ? data.base.viewBox : data.range.viewBox).join(' ')}
        // SVG needs an explicit image role to expose its accessible name.
        role="img"
        aria-label={`${label}: ${name}`}
      >
        <defs>
          <clipPath id={clip}>
            {data.base.paths.map((d, i) => (
              <path key={i} d={d} clipRule="evenodd" />
            ))}
          </clipPath>
        </defs>
        <g className="range-map-land" fill="var(--map-land)">
          {data.base.paths.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" />
          ))}
        </g>
        <path
          className="range-map-overlay"
          fill="var(--map-range)"
          fillOpacity={0.82}
          d={data.range.path}
          fillRule="evenodd"
          clipPath={`url(#${clip})`}
        />
        <g
          className="range-map-borders"
          fill="none"
          stroke="var(--map-border)"
          strokeWidth={0.45}
        >
          {data.base.paths.map((d, i) => (
            <path key={i} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      <MapLegend label={label} />
    </div>
  );
}

export function MapCredits({ entry }: { entry: RangeMapEntry }) {
  return (
    <div className="range-map-credits text-muted-foreground text-(length:--type-caption) leading-(--leading-normal) flex flex-wrap gap-[5px] mt-[6px]">
      <div>
        <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
          {entry.sourceName}
        </a>
        <span aria-hidden="true"> · </span>
        <a href={entry.licenseUrl} target="_blank" rel="noreferrer">
          {entry.license}
        </a>
      </div>
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
      {entry.note && <small>{entry.note}</small>}
    </div>
  );
}

export function MapSourceInfo({ entry }: { entry: RangeMapEntry }) {
  return (
    <Popover>
      <PopoverTrigger
        className="range-map-source absolute left-[8px] bottom-[8px] grid place-items-center size-[26px]"
        aria-label="Kartenquellen und Lizenz"
      >
        <Info size={14} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="range-map-source-details"
      >
        <MapCredits entry={entry} />
      </PopoverContent>
    </Popover>
  );
}

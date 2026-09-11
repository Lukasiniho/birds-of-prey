'use client';

import { useEffect, useId, useState } from 'react';
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
    <div className="range-map-legend">
      <span aria-hidden="true" /> {label}
    </div>
  );
}

export function MapDrawing({
  data,
  name,
  label,
  world = false,
}: {
  data: MapData;
  name: string;
  label: string;
  world?: boolean;
}) {
  const clip = `land-${useId()}`;
  return (
    <div className="range-map-frame">
      <svg
        className="range-map-svg"
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
        <g className="range-map-land">
          {data.base.paths.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" />
          ))}
        </g>
        <path
          className="range-map-overlay"
          d={data.range.path}
          fillRule="evenodd"
          clipPath={`url(#${clip})`}
        />
        <g className="range-map-borders" fill="none">
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
    <div className="range-map-credits">
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
        className="range-map-source"
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

'use client';

import { useEffect, useId, useState } from 'react';
import { Expand, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { rangeBasemapUrl } from '@/lib/range-maps';
import { displayRangeMaps } from '@/lib/range-map-catalog';
import type { DisplayRangeMapEntry as RangeMapEntry } from '@/lib/range-map-entry';
import {
  createMapLoader,
  parseBasemap,
  parseOverlay,
  type MapData,
} from '@/lib/range-map-data';

const loadBasemap = createMapLoader(parseBasemap);
const loadOverlay = createMapLoader(parseOverlay);

function MapLegend({ label }: { label: string }) {
  return (
    <div className="range-map-legend">
      <span aria-hidden="true" /> {label}
    </div>
  );
}

function MapDrawing({
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
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
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

function MapCredits({ entry }: { entry: RangeMapEntry }) {
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

function MapSourceInfo({ entry }: { entry: RangeMapEntry }) {
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

export function RangeMap({ birdId, name }: { birdId: string; name: string }) {
  const entry = displayRangeMaps[birdId];
  if (!entry) return null;
  // Own the reset here so every caller gets safe species switches, including
  // while an earlier request is still pending or the expanded map is open.
  return (
    <ReviewedRangeMap
      key={`${birdId}:${entry.url}`}
      entry={entry}
      name={name}
    />
  );
}

function ReviewedRangeMap({
  entry,
  name,
}: {
  entry: RangeMapEntry;
  name: string;
}) {
  const [data, setData] = useState<MapData | null>(null);
  const [world, setWorld] = useState(false);
  useEffect(() => {
    let active = true;
    Promise.all([loadBasemap(rangeBasemapUrl), loadOverlay(entry.url)])
      .then(([base, range]) => {
        if (active) setData({ base, range });
      })
      .catch(() => {
        // A missing or unavailable map leaves this optional section hidden.
      });
    return () => {
      active = false;
    };
  }, [entry]);
  if (!data) return null;
  return (
    <div className="range-map">
      <Dialog>
        <div className="range-map-surface">
          <DialogTrigger
            className="range-map-preview"
            aria-label={`Verbreitungskarte für ${name} vergrößern`}
          >
            <MapDrawing data={data} name={name} label={entry.label} />
            <span className="range-map-expand">
              <Expand size={15} aria-hidden="true" /> Vergrößern
            </span>
          </DialogTrigger>
          <MapSourceInfo entry={entry} />
        </div>
        <DialogContent className="range-map-dialog" showCloseButton={false}>
          <DialogTitle>Verbreitung · {name}</DialogTitle>
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="range-map-close"
                aria-label="Karte schließen"
              />
            }
          >
            <X />
          </DialogClose>
          <fieldset
            className="range-map-view-controls"
            aria-label="Kartenausschnitt"
          >
            <Button
              variant="ghost"
              aria-pressed={!world}
              onClick={() => setWorld(false)}
            >
              Verbreitung
            </Button>
            <Button
              variant="ghost"
              aria-pressed={world}
              onClick={() => setWorld(true)}
            >
              Welt
            </Button>
          </fieldset>
          <div className="range-map-surface">
            <MapDrawing
              data={data}
              name={name}
              label={entry.label}
              world={world}
            />
            <MapSourceInfo entry={entry} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

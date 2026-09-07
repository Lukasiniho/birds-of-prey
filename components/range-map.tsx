'use client';

import { useEffect, useId, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  rangeBasemapUrl,
  rangeMaps,
  type RangeMapEntry,
} from '@/lib/range-maps';
import {
  createMapLoader,
  parseBasemap,
  parseOverlay,
  type MapData,
} from '@/lib/range-map-data';

const loadBasemap = createMapLoader(parseBasemap);
const loadOverlay = createMapLoader(parseOverlay);

function MapLegend() {
  return (
    <div className="range-map-legend">
      <span aria-hidden="true" /> Geschätztes Vorkommen
    </div>
  );
}

function MapDrawing({
  data,
  name,
  world = false,
}: {
  data: MapData;
  name: string;
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
        aria-label={`Geschätztes Vorkommen: ${name}`}
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
      <MapLegend />
    </div>
  );
}

function MapCredits({
  entry,
  detailed = false,
}: {
  entry: RangeMapEntry;
  detailed?: boolean;
}) {
  return (
    <div className="range-map-credits">
      <a href={entry.datasetUrl} target="_blank" rel="noreferrer">
        {detailed
          ? `iNaturalist Geomodell ${entry.modelVersion}`
          : 'iNaturalist'}
      </a>
      <span>·</span>
      <a href={entry.licenseUrl} target="_blank" rel="noreferrer">
        CC BY
      </a>
      <span>·</span>
      <a
        href="https://www.naturalearthdata.com/about/terms-of-use/"
        target="_blank"
        rel="noreferrer"
      >
        Natural Earth
      </a>
      {detailed && (
        <>
          <span>·</span>
          <span>Stand {entry.downloadedOn.split('-').reverse().join('.')}</span>
          <span>·</span>
          <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
            Datenquelle
          </a>
          <span>·</span>
          <a href={entry.referenceUrl} target="_blank" rel="noreferrer">
            Vergleichskarte
          </a>
        </>
      )}
    </div>
  );
}

export function RangeMap({ birdId, name }: { birdId: string; name: string }) {
  const entry = rangeMaps[birdId];
  if (!entry)
    return (
      <p className="range-map-unavailable">
        Noch keine Verbreitungskarte verfügbar.
      </p>
    );
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
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [world, setWorld] = useState(false);
  useEffect(() => {
    let active = true;
    Promise.all([loadBasemap(rangeBasemapUrl), loadOverlay(entry.url)])
      .then(([base, range]) => {
        if (active) setData({ base, range });
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [entry, attempt]);
  return (
    <div className="range-map">
      {data ? (
        <Dialog>
          <DialogTrigger
            className="range-map-preview"
            aria-label={`Verbreitungskarte für ${name} vergrößern`}
          >
            <MapDrawing data={data} name={name} />
            <span className="range-map-expand">
              <Expand size={15} aria-hidden="true" /> Vergrößern
            </span>
          </DialogTrigger>
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
            <MapDrawing data={data} name={name} world={world} />
            <MapCredits entry={entry} detailed />
          </DialogContent>
        </Dialog>
      ) : (
        <output className="range-map-placeholder">
          {error ? (
            <>
              <span>Karte konnte nicht geladen werden.</span>
              <Button
                variant="ghost"
                onClick={() => {
                  setError(false);
                  setAttempt((n) => n + 1);
                }}
              >
                Erneut versuchen
              </Button>
            </>
          ) : (
            'Karte wird geladen …'
          )}
        </output>
      )}
      <MapCredits entry={entry} />
    </div>
  );
}

'use client';

import { useEffect, useId, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { rangeBasemapUrl, rangeMaps } from '@/lib/range-maps';

type Basemap = { paths: string[]; viewBox: number[] };
type Overlay = { path: string; viewBox: number[] };
type MapData = { base: Basemap; range: Overlay };
const requests = new Map<string, Promise<unknown>>();
function load<T>(url: string): Promise<T> {
  let request = requests.get(url);
  if (!request) {
    request = fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Map unavailable');
        return response.json();
      })
      .catch((error: unknown) => {
        requests.delete(url);
        throw error;
      });
    requests.set(url, request);
  }
  return request as Promise<T>;
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
  );
}

function MapCredits({ taxonId }: { taxonId: number }) {
  return (
    <div className="range-map-credits">
      <a
        href={`https://www.inaturalist.org/taxa/${taxonId}`}
        target="_blank"
        rel="noreferrer"
      >
        iNaturalist
      </a>
      <span>· CC BY ·</span>
      <a
        href="https://www.naturalearthdata.com/about/terms-of-use/"
        target="_blank"
        rel="noreferrer"
      >
        Natural Earth
      </a>
    </div>
  );
}

export function RangeMap({ birdId, name }: { birdId: string; name: string }) {
  const entry = rangeMaps[birdId];
  const [data, setData] = useState<MapData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [world, setWorld] = useState(false);
  useEffect(() => {
    if (!entry) return;
    let active = true;
    Promise.all([load<Basemap>(rangeBasemapUrl), load<Overlay>(entry.url)])
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
  if (!entry) return null;
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
            <DialogDescription>
              Geschätztes Vorkommen aus Beobachtungsdaten. Keine Unterscheidung
              nach Brutzeit, Zug und Überwinterung.
            </DialogDescription>
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
            <div className="range-map-legend">
              <span aria-hidden="true" /> Geschätztes Vorkommen
            </div>
            <MapCredits taxonId={entry.taxonId} />
            <div className="range-map-method">
              iNaturalist Geomodell {entry.modelVersion} · Stand 06.09.2026. Die
              Aussagekraft hängt von der Dichte der Beobachtungen ab.
            </div>
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
      <div className="range-map-legend">
        <span aria-hidden="true" /> Geschätztes Vorkommen
      </div>
      <MapCredits taxonId={entry.taxonId} />
    </div>
  );
}

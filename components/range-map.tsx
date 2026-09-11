'use client';

import { useState } from 'react';
import { CornersOut as Expand, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { displayRangeMaps } from '@/lib/range-map-catalog';
import type { DisplayRangeMapEntry as RangeMapEntry } from '@/lib/range-map-entry';
import {
  MapDrawing,
  MapSourceInfo,
  useRangeMap,
} from '@/components/range-map-drawing';

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
  const data = useRangeMap(entry);
  const [world, setWorld] = useState(false);
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

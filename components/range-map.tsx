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
    <div className="range-map mt-[18px] min-w-0">
      <Dialog>
        <div className="range-map-surface relative">
          <DialogTrigger
            className="range-map-preview border-(length:--border-structure) rounded-(--radius-card) bg-(--map-water) relative block w-full p-0 overflow-hidden"
            aria-label={`Verbreitungskarte für ${name} vergrößern`}
          >
            <MapDrawing data={data} name={name} label={entry.label} />
            <span className="range-map-expand rounded-(--radius-control) text-(length:--type-ui) leading-(--leading-heading) bg-background text-foreground absolute right-[8px] bottom-[8px] flex items-center gap-[5px] py-1 px-2">
              <Expand size={15} aria-hidden="true" /> Vergrößern
            </span>
          </DialogTrigger>
          <MapSourceInfo entry={entry} />
        </div>
        <DialogContent
          className="range-map-dialog max-h-[calc(100dvh-32px)] overflow-y-auto p-panel gap-3 bg-background text-foreground"
          showCloseButton={false}
        >
          <DialogTitle className="pr-[42px] font-(family-name:--font-stack-display) text-(length:--type-heading) leading-(--leading-display)">
            Verbreitung · {name}
          </DialogTitle>
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="range-map-close absolute right-[12px] top-[12px]"
                aria-label="Karte schließen"
              />
            }
          >
            <X />
          </DialogClose>
          <fieldset
            className="range-map-view-controls border-0 m-0 p-0 flex gap-[6px]"
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
          <div className="range-map-surface relative">
            <MapDrawing
              data={data}
              name={name}
              label={entry.label}
              world={world}
              framed
            />
            <MapSourceInfo entry={entry} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

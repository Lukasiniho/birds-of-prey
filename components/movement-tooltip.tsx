'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SpeciesFact } from '@/lib/species-facts';

// Ordered from sedentary to long-distance migration.
const scale = [
  ['stand', 'Standvogel'],
  ['teil', 'Teilzieher'],
  ['zug', 'Zugvogel'],
  ['lang', 'Langstreckenzieher'],
] as const;
type MovementType = (typeof scale)[number][0];
const explanations: Record<MovementType, string> = {
  stand:
    'Bleibt das ganze Jahr im Brutgebiet. Nur Jungvögel streifen auf der Suche nach einem eigenen Revier umher; manche Arten weichen bei Kälte oder Nahrungsmangel vorübergehend in nahe Gebiete aus.',
  teil: 'Ein Teil der Population zieht, der andere bleibt. Oft entscheidet die Region: nördliche Brutvögel ziehen, südliche bleiben. Auch Alter und Geschlecht spielen eine Rolle.',
  zug: 'Verlässt das Brutgebiet regelmäßig für den Winter und kehrt im Frühjahr zurück, meist innerhalb des Kontinents oder bis in den Mittelmeerraum.',
  lang: 'Zieht jedes Jahr über große Entfernungen; europäische Brutvögel überwintern meist südlich der Sahara.',
};

function movementType(value: string): MovementType {
  if (value.startsWith('Langstrecken')) return 'lang';
  if (value.includes('Zugvogel')) return 'zug';
  if (value.includes('Teilzieher')) return 'teil';
  return 'stand';
}

export function MovementTooltip({ fact }: { fact: SpeciesFact }) {
  const [open, setOpen] = useState(false);
  const type = movementType(fact.value);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        type="button"
        closeOnClick={false}
        onClick={() => setOpen(true)}
        className="cursor-help rounded-sm border-0 bg-transparent p-0 text-right font-inherit text-inherit underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        style={{ font: 'inherit', color: 'inherit' }}
        aria-label={`${fact.value}: Zugverhalten erklären`}
      >
        {fact.value}
      </TooltipTrigger>
      <TooltipContent side="top" align="end" variant="detail">
        <p className="m-0 font-semibold">Zugverhalten</p>
        <ol
          className="my-3 grid list-none grid-cols-4 gap-1 p-0"
          aria-label="Skala von Standvogel bis Langstreckenzieher"
        >
          {scale.map(([level, label]) => (
            <li
              key={level}
              aria-current={level === type ? 'step' : undefined}
              aria-label={`${label}${level === type ? ' – aktuelle Einstufung' : ''}`}
              className="h-1.5 rounded-full"
              style={
                level === type
                  ? {
                      background: 'var(--main-color)',
                      outline: '2px solid var(--main-color)',
                      outlineOffset: 2,
                    }
                  : { background: 'var(--border)' }
              }
            />
          ))}
        </ol>
        <div
          className="mb-3 flex justify-between gap-4 text-muted-foreground"
          aria-hidden="true"
        >
          <span>Standvogel</span>
          <span>Langstreckenzieher</span>
        </div>
        <p className="m-0 font-semibold">{fact.value}</p>
        <p className="mt-1 mb-0 font-normal leading-normal">
          {explanations[type]}
        </p>
        {fact.note && (
          <p className="mt-2 mb-0 font-normal leading-normal text-muted-foreground">
            {fact.note}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

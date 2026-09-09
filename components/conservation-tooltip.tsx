'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { conservationLabels } from '@/lib/species-facts';

// IUCN Categories and Criteria v3.1:
// https://portals.iucn.org/library/sites/library/files/documents/RL-2001-001-2nd.pdf
const scale = [
  ['LC', 'Nicht gefährdet'],
  ['NT', 'Potenziell gefährdet'],
  ['VU', 'Gefährdet'],
  ['EN', 'Stark gefährdet'],
  ['CR', 'Vom Aussterben bedroht'],
  ['EW', 'In der Natur ausgestorben'],
  ['EX', 'Ausgestorben'],
] as const;
const explanations = {
  LC: 'Die Art erfüllt weltweit derzeit keine Kriterien einer Gefährdungs- oder Vorwarnstufe. Regionale Bestände können trotzdem bedroht sein.',
  NT: 'Die Art liegt nahe an einer Gefährdungsstufe oder dürfte deren Kriterien in naher Zukunft erfüllen.',
  VU: 'Für die Art besteht ein hohes Risiko, in der Natur auszusterben.',
  EN: 'Für die Art besteht ein sehr hohes Risiko, in der Natur auszusterben.',
} as const;

export function ConservationTooltip({
  code,
}: {
  code: keyof typeof conservationLabels;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        type="button"
        closeOnClick={false}
        onClick={() => setOpen(true)}
        className="cursor-help rounded-sm border-0 bg-transparent p-0 text-right font-inherit text-inherit underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        style={{ font: 'inherit', color: 'inherit' }}
        aria-label={`${conservationLabels[code]}: IUCN-Einstufung erklären`}
      >
        {conservationLabels[code]}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="end"
        className="block w-80 max-w-[calc(100vw-2rem)] rounded-control border border-border bg-background p-4 font-sans text-sm text-foreground shadow-floating [&>svg]:hidden"
      >
        <p className="m-0 font-semibold">Gefährdung weltweit</p>
        <ol
          className="my-3 grid list-none grid-cols-7 gap-1 p-0"
          aria-label="IUCN-Skala von nicht gefährdet bis ausgestorben"
        >
          {scale.map(([level, label]) => (
            <li
              key={level}
              aria-current={level === code ? 'step' : undefined}
              aria-label={`${level}: ${label}${level === code ? ' – aktuelle Einstufung' : ''}`}
              title={label}
              className="flex aspect-square items-center justify-center rounded-full border text-xs font-semibold"
              style={
                level === code
                  ? {
                      background: 'var(--main-color)',
                      borderColor: 'var(--main-color)',
                      color: 'var(--primary-foreground)',
                      outline: '2px solid var(--main-color)',
                      outlineOffset: 2,
                    }
                  : {
                      borderColor: 'var(--border)',
                      color: 'var(--muted-foreground)',
                    }
              }
            >
              {level}
            </li>
          ))}
        </ol>
        <div
          className="mb-3 flex justify-between gap-4 text-xs text-muted-foreground"
          aria-hidden="true"
        >
          <span>Nicht gefährdet</span>
          <span>Ausgestorben</span>
        </div>
        <p className="m-0 font-semibold">
          {code} · {conservationLabels[code]}
        </p>
        <p className="mt-1 mb-0 font-normal leading-normal">
          {explanations[code]}
        </p>
        <p className="mt-3 mb-0 text-xs font-normal text-muted-foreground">
          VU, EN und CR bilden die bedrohten Arten. Fehlende Daten (DD) und
          nicht bewertete Arten (NE) stehen außerhalb dieser Skala.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

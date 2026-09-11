'use client';

import { FactTooltip } from '@/components/fact-tooltip';
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
  return (
    <FactTooltip
      value={conservationLabels[code]}
      describe={`${conservationLabels[code]}: IUCN-Einstufung erklären`}
    >
      <p className="app-tooltip-title">Gefährdung weltweit</p>
      <ol
        className="grid list-none grid-cols-7 gap-2 p-0"
        aria-label="IUCN-Skala von nicht gefährdet bis ausgestorben"
      >
        {scale.map(([level, label]) => (
          <li
            key={level}
            aria-current={level === code ? 'step' : undefined}
            aria-label={`${level}: ${label}${level === code ? ' – aktuelle Einstufung' : ''}`}
            className="flex aspect-square items-center justify-center rounded-full border font-semibold"
            style={
              level === code
                ? {
                    background: 'var(--main-color)',
                    borderColor: 'var(--main-color)',
                    color: 'var(--primary-foreground)',
                    outline: '2px solid var(--main-color)',
                    outlineOffset: 1,
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
        className="flex justify-between gap-4 text-muted-foreground"
        aria-hidden="true"
      >
        <span>Nicht gefährdet</span>
        <span>Ausgestorben</span>
      </div>
      <p className="app-tooltip-title">
        {code} · {conservationLabels[code]}
      </p>
      <p>{explanations[code]}</p>
    </FactTooltip>
  );
}

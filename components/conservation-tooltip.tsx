'use client';

import { FactTooltip } from '@/components/fact-tooltip';
import { conservationLabels } from '@/lib/species-facts';
import { useI18n } from '@/components/i18n';
import { msg } from '@/lib/i18n';

// IUCN Categories and Criteria v3.1:
// https://portals.iucn.org/library/sites/library/files/documents/RL-2001-001-2nd.pdf
const scale = [
  ['LC', msg('Nicht gefährdet')],
  ['NT', msg('Potenziell gefährdet')],
  ['VU', msg('Gefährdet')],
  ['EN', msg('Stark gefährdet')],
  ['CR', msg('Vom Aussterben bedroht')],
  ['EW', msg('In der Natur ausgestorben')],
  ['EX', msg('Ausgestorben')],
] as const;
const explanations = {
  LC: msg(
    'Die Art erfüllt weltweit derzeit keine Kriterien einer Gefährdungs- oder Vorwarnstufe. Regionale Bestände können trotzdem bedroht sein.',
  ),
  NT: msg(
    'Die Art liegt nahe an einer Gefährdungsstufe oder dürfte deren Kriterien in naher Zukunft erfüllen.',
  ),
  VU: msg('Für die Art besteht ein hohes Risiko, in der Natur auszusterben.'),
  EN: msg(
    'Für die Art besteht ein sehr hohes Risiko, in der Natur auszusterben.',
  ),
  CR: msg(
    'Für die Art besteht ein extrem hohes Risiko, in der Natur auszusterben.',
  ),
} as const;

export function ConservationTooltip({
  code,
}: {
  code: keyof typeof conservationLabels;
}) {
  const { t } = useI18n();
  const value = t(conservationLabels[code]);
  return (
    <FactTooltip
      value={value}
      describe={t('{value}: IUCN-Einstufung erklären', { value })}
    >
      <p className="app-tooltip-title">{t('Gefährdung weltweit')}</p>
      <ol
        className="grid list-none grid-cols-7 gap-2 p-0"
        aria-label={t('IUCN-Skala von nicht gefährdet bis ausgestorben')}
      >
        {scale.map(([level, label]) => (
          <li
            key={level}
            aria-current={level === code ? 'step' : undefined}
            aria-label={`${level}: ${
              level === code
                ? t('{label} – aktuelle Einstufung', { label: t(label) })
                : t(label)
            }`}
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
        <span>{t('Nicht gefährdet')}</span>
        <span>{t('Ausgestorben')}</span>
      </div>
      <p className="app-tooltip-title">
        {code} · {value}
      </p>
      <p>{t(explanations[code])}</p>
    </FactTooltip>
  );
}

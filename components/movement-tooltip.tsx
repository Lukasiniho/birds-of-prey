'use client';

import { FactTooltip } from '@/components/fact-tooltip';
import type { SpeciesFact } from '@/lib/species-facts';
import { useI18n } from '@/components/i18n';
import { msg } from '@/lib/i18n';

// Ordered from sedentary to long-distance migration.
const scale = [
  ['stand', msg('Standvogel')],
  ['teil', msg('Teilzieher')],
  ['zug', msg('Zugvogel')],
  ['lang', msg('Langstreckenzieher')],
] as const;
type MovementType = (typeof scale)[number][0];
const explanations: Record<MovementType, string> = {
  stand: msg(
    'Bleibt das ganze Jahr im Brutgebiet. Nur Jungvögel streifen auf der Suche nach einem eigenen Revier umher; manche Arten weichen bei Kälte oder Nahrungsmangel vorübergehend in nahe Gebiete aus.',
  ),
  teil: msg(
    'Ein Teil der Population zieht, der andere bleibt. Oft entscheidet die Region: nördliche Brutvögel ziehen, südliche bleiben. Auch Alter und Geschlecht spielen eine Rolle.',
  ),
  zug: msg(
    'Verlässt das Brutgebiet regelmäßig für den Winter und kehrt im Frühjahr zurück, meist innerhalb des Kontinents oder bis in den Mittelmeerraum.',
  ),
  lang: msg(
    'Zieht jedes Jahr über große Entfernungen; europäische Brutvögel überwintern meist südlich der Sahara.',
  ),
};

function movementType(value: string): MovementType {
  if (value.startsWith('Langstrecken')) return 'lang';
  if (value.includes('Zugvogel')) return 'zug';
  if (value.includes('Teilzieher')) return 'teil';
  return 'stand';
}

export function MovementTooltip({ fact }: { fact: SpeciesFact }) {
  const { t } = useI18n();
  const type = movementType(fact.value);
  const value = t(fact.value);
  return (
    <FactTooltip
      value={value}
      describe={t('{value}: Zugverhalten erklären', { value })}
    >
      <p className="app-tooltip-title">{t('Zugverhalten')}</p>
      <ol
        className="grid list-none grid-cols-4 gap-2 p-0"
        aria-label={t('Skala von Standvogel bis Langstreckenzieher')}
      >
        {scale.map(([level, label]) => (
          <li
            key={level}
            aria-current={level === type ? 'step' : undefined}
            aria-label={
              level === type
                ? t('{label} – aktuelle Einstufung', { label: t(label) })
                : t(label)
            }
            className="h-2.5 rounded-full"
            style={
              level === type
                ? {
                    background: 'var(--main-color)',
                    outline: '2px solid var(--main-color)',
                    outlineOffset: 1,
                  }
                : { background: 'var(--border)' }
            }
          />
        ))}
      </ol>
      <div
        className="flex justify-between gap-4 text-muted-foreground"
        aria-hidden="true"
      >
        <span>{t('Standvogel')}</span>
        <span>{t('Langstreckenzieher')}</span>
      </div>
      <p className="app-tooltip-title">{value}</p>
      <p>{t(explanations[type])}</p>
      {fact.note && <p className="text-muted-foreground">{t(fact.note)}</p>}
    </FactTooltip>
  );
}

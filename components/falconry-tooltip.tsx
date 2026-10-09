'use client';

import { FactTooltip } from '@/components/fact-tooltip';
import type { FalconryBird } from '@/lib/falconry';
import { useI18n } from '@/components/i18n';

/* Der Steckbrief nennt nur das Wort; warum gerade diese Art geflogen wird,
 * steht in der Blase. */
export function FalconryTooltip({ bird }: { bird: FalconryBird }) {
  const { t } = useI18n();
  return (
    <FactTooltip
      value={t('Beizvogel')}
      describe={t('Beizvogel: Einsatz in der Falknerei erklären')}
    >
      <p className="app-tooltip-title">{t(bird.subtitle)}</p>
      <p>{t(bird.text)}</p>
    </FactTooltip>
  );
}

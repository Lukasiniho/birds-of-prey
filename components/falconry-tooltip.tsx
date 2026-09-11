'use client';

import { FactTooltip } from '@/components/fact-tooltip';
import type { FalconryBird } from '@/lib/falconry';

/* Der Steckbrief nennt nur das Wort; warum gerade diese Art geflogen wird,
 * steht in der Blase. */
export function FalconryTooltip({ bird }: { bird: FalconryBird }) {
  return (
    <FactTooltip
      value="Beizvogel"
      describe="Beizvogel: Einsatz in der Falknerei erklären"
    >
      <p className="app-tooltip-title">{bird.subtitle}</p>
      <p>{bird.text}</p>
    </FactTooltip>
  );
}

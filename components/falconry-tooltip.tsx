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
      <p className="m-0 font-semibold">{bird.subtitle}</p>
      <p className="mt-1 mb-0 font-normal leading-normal">{bird.text}</p>
    </FactTooltip>
  );
}

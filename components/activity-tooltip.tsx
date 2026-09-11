'use client';

import { FactTooltip } from '@/components/fact-tooltip';
import type { SpeciesFact } from '@/lib/species-facts';

/* Der Tagesbogen: ein 24-Stunden-Zifferblatt, Mitternacht unten, Mittag oben.
 * Die Linie in der Mitte ist der Horizont — darüber liegt der Tag, darunter die
 * Nacht. Der Akzentbogen ist das Zeitfenster, in dem die Art unterwegs ist. */
const CENTER = 100;
const MIDDLE = 55;
const RADIUS = 38;
const OVERHANG = 16;

// Von wann bis wann, in Stunden; Fenster dürfen über Mitternacht laufen.
const windows = {
  tag: [6, 18],
  'tag-daemmerung': [4.5, 19.5],
  'daemmerung-nacht': [16.5, 7.5],
} as const;
type ActivityType = keyof typeof windows;
const explanations: Record<ActivityType, string> = {
  tag: 'Die Art jagt und fliegt bei Tageslicht. Viele Greifvögel warten dabei den Vormittag ab, bis die Sonne die Luft erwärmt und die Thermik das Kreisen trägt.',
  'tag-daemmerung':
    'Der Schwerpunkt liegt am Tag, doch die Art nutzt auch die Stunden um Sonnenauf- und Sonnenuntergang, wenn viele Beutetiere in Bewegung sind.',
  'daemmerung-nacht':
    'Die Art jagt in der Dämmerung und bei Dunkelheit. Tagsüber ruht sie meist gut getarnt an einem festen Ansitz.',
};

function activityType(value: string): ActivityType {
  if (value.startsWith('Dämmerungs')) return 'daemmerung-nacht';
  if (value.includes('dämmerungsaktiv')) return 'tag-daemmerung';
  return 'tag';
}

/** Punkt auf dem Zifferblatt: 0 Uhr unten, 6 links, 12 oben, 18 rechts. */
function pointAt(hour: number) {
  const angle = (hour / 24) * 2 * Math.PI;
  return [
    CENTER - RADIUS * Math.sin(angle),
    MIDDLE + RADIUS * Math.cos(angle),
  ] as const;
}

function arc(from: number, to: number) {
  const [x1, y1] = pointAt(from);
  const [x2, y2] = pointAt(to);
  const span = (to - from + 24) % 24;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${span > 12 ? 1 : 0} 1 ${x2} ${y2}`;
}

export function ActivityTooltip({ fact }: { fact: SpeciesFact }) {
  const type = activityType(fact.value);
  const [from, to] = windows[type];
  return (
    <FactTooltip
      value={fact.value}
      describe={`${fact.value}: Aktivitätszeit erklären`}
    >
      <p className="m-0 font-semibold">Aktivitätszeit</p>
      <svg
        /* Zugeschnitten auf Horizontlinie und Ring — der Bogen ist 5 breit
           und hat runde Enden, der Rahmen lässt ihm die halbe Strichbreite
           nach außen. */
        viewBox="44 12 112 86"
        className="mx-auto my-3 block w-[150px] max-w-full"
        role="img"
        aria-label={`Tagesbogen: aktiv von etwa ${from} bis ${to} Uhr`}
      >
        {/* Tageshälfte über dem Horizont, als ruhige Fläche hinter dem Bogen. */}
        <path d={`${arc(6, 18)} Z`} fill="var(--line-soft)" stroke="none" />
        <line
          x1={CENTER - RADIUS - OVERHANG}
          y1={MIDDLE}
          x2={CENTER + RADIUS + OVERHANG}
          y2={MIDDLE}
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <circle
          cx={CENTER}
          cy={MIDDLE}
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth="3"
        />
        <path
          d={arc(from, to)}
          fill="none"
          stroke="var(--main-color)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Mittag und Mitternacht als Marken, damit der Ring als Uhr lesbar wird. */}
        {[0, 12].map((hour) => {
          const [x, y] = pointAt(hour);
          const inner = hour === 12 ? y + 7 : y - 7;
          return (
            <line
              key={hour}
              x1={x}
              y1={y}
              x2={x}
              y2={inner}
              stroke="var(--border)"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div
        className="mb-3 flex justify-between gap-4 text-muted-foreground"
        aria-hidden="true"
      >
        <span>Sonnenaufgang</span>
        <span>Sonnenuntergang</span>
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
    </FactTooltip>
  );
}

'use client';

import { useState } from 'react';
import { ArtImage } from '@/components/art-image';
import { SegmentedControl } from '@/components/segmented-control';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Part = {
  id: string;
  name: string;
  function: string;
  text: string;
  falcon: string;
  buzzard: string;
  positions: [[number, number], [number, number]];
};

const parts: Part[] = [
  {
    id: 'schnabel',
    name: 'Schnabel',
    function: 'Nahrung zerteilen',
    text: 'Der hakenförmige Schnabel dient zum Zerteilen der Nahrung. An seiner Basis liegt die Wachshaut mit den Nasenöffnungen.',
    falcon:
      'Der Wanderfalke hat zusätzlich einen Falkenzahn: eine scharfe Ausbuchtung am Oberschnabel, die beim Töten der Beute hilft.',
    buzzard:
      'Der Mäusebussard hält seine Beute mit den Fängen fest und zerteilt sie mit dem kräftigen Hakenschnabel.',
    positions: [
      [28.5, 42.5],
      [34.5, 47.8],
    ],
  },
  {
    id: 'augen',
    name: 'Augen',
    function: 'Sehen und orientieren',
    text: 'Die Augen helfen, Beute und Bewegungen zu erkennen und sich im Flug zu orientieren.',
    falcon: '',
    buzzard: '',
    positions: [
      [34, 40.5],
      [39, 45.3],
    ],
  },
  {
    id: 'deckfedern',
    name: 'Deckfedern',
    function: 'Schützen und glätten',
    text: 'Deckfedern überlappen sich wie Dachziegel. Sie bedecken unter anderem die Ansätze der großen Flugfedern und bilden eine geschlossene, strömungsgünstige Oberfläche.',
    falcon:
      'Die Unterseite des erwachsenen Wanderfalken zeigt eine feine dunkle Querbänderung.',
    buzzard:
      'Beim Mäusebussard ist die Zeichnung sehr variabel: Von fast weiß bis dunkelbraun kommen viele Gefiederfarben vor.',
    positions: [
      [51, 30],
      [67, 35],
    ],
  },
  {
    id: 'handschwingen',
    name: 'Handschwingen',
    function: 'Vortrieb und Flugkontrolle',
    text: 'Die langen Federn am äußeren Flügel sitzen an der Hand. Sie sind besonders wichtig für den Vortrieb beim Flügelschlag und helfen, den Flug zu steuern.',
    falcon:
      'Die langen, spitzen Flügel des Wanderfalken eignen sich für schnellen Flug und rasante Jagdmanöver.',
    buzzard:
      'Die äußeren Handschwingen des Mäusebussards wirken im Segelflug wie gespreizte Finger.',
    positions: [
      [71, 19],
      [83, 20],
    ],
  },
  {
    id: 'armschwingen',
    name: 'Armschwingen',
    function: 'Tragen im Flug',
    text: 'Die Armschwingen sitzen am Unterarm. Zusammen mit den übrigen Flügelfedern bilden sie die Tragfläche und tragen wesentlich zum Auftrieb bei.',
    falcon:
      'Beim Wanderfalken gehen Arm- und Handflügel in eine schlanke, spitz zulaufende Flügelform über.',
    buzzard:
      'Die breiten Flügel des Mäusebussards bieten viel Tragfläche. So kann er ausdauernd in aufsteigender Luft kreisen.',
    positions: [
      [37, 61],
      [44, 71],
    ],
  },
  {
    id: 'koerpergefieder',
    name: 'Körpergefieder',
    function: 'Wärmen und schützen',
    text: 'Die äußeren Konturfedern geben dem Körper seine glatte Form und schützen die Haut. Darunter hält das lockere Daunengefieder eine isolierende Luftschicht fest.',
    falcon:
      'Das dicht anliegende Gefieder unterstützt die stromlinienförmige Gestalt des Wanderfalken.',
    buzzard:
      'Das Körpergefieder schützt den Mäusebussard auch dann vor Wärmeverlust, wenn er lange auf einer Warte sitzt.',
    positions: [
      [47, 44],
      [52, 53],
    ],
  },
  {
    id: 'faenge',
    name: 'Fänge & Krallen',
    function: 'Greifen und festhalten',
    text: 'Die Füße der Greifvögel heißen Fänge. Ihre Zehen tragen gebogene, spitze Krallen. Damit packen sie Beute und halten sich auf Ästen oder anderen Sitzplätzen fest.',
    falcon:
      'Der Wanderfalke fängt vor allem Vögel. Seine langen Zehen helfen ihm, die Beute sicher zu greifen.',
    buzzard:
      'Der Mäusebussard erbeutet häufig kleine Säugetiere am Boden und packt sie mit seinen kräftigen Fängen.',
    positions: [
      [64, 50],
      [66, 64],
    ],
  },
  {
    id: 'schwanz',
    name: 'Schwanzfedern',
    function: 'Steuern und bremsen',
    text: 'Die Schwanzfedern heißen auch Steuerfedern. Der Vogel verändert ihre Stellung und spreizt sie, um zu steuern, das Gleichgewicht zu halten und bei der Landung abzubremsen.',
    falcon:
      'Im schnellen Flug hält der Wanderfalke den Schwanz eher schmal; bei Manövern kann er ihn auffächern.',
    buzzard:
      'Beim kreisenden Mäusebussard ist der relativ kurze, breite Schwanz oft deutlich aufgefächert.',
    positions: [
      [75, 53],
      [77, 68],
    ],
  },
];

const speciesOptions = [
  { value: '0', label: 'Wanderfalke' },
  { value: '1', label: 'Mäusebussard' },
];

export default function AnatomyExplorer({
  images,
}: {
  images: [string, string];
}) {
  const [species, setSpecies] = useState<0 | 1>(0);
  const [selected, setSelected] = useState('schnabel');
  const [open, setOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const name = speciesOptions[species].label;

  return (
    <div className="anatomy-layout">
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- pointer-down only dismisses the pinned label; buttons stay the interactive controls */}
      <section
        className="anatomy-stage"
        aria-label={`Körperbau des ${name === 'Wanderfalke' ? 'Wanderfalken' : 'Mäusebussards'}`}
        onPointerDown={(event) => {
          if (!(event.target as HTMLElement).closest('button')) {
            setPinned(null);
            setOpen(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setPinned(null);
            setOpen(null);
          }
        }}
      >
        <div className="anatomy-stage-heading">
          <div>
            <span className="knowledge-eyebrow">Form & Funktion</span>
            <h2>Jedes Detail hat eine Aufgabe</h2>
          </div>
          <SegmentedControl
            label="Beispielvogel wählen"
            group="anatomie"
            value={String(species)}
            options={speciesOptions}
            onChange={(value) => {
              setSpecies(Number(value) as 0 | 1);
              setOpen(null);
              setPinned(null);
            }}
          />
        </div>
        <div className="anatomy-canvas">
          <ArtImage
            className="anatomy-bird"
            src={images[species]}
            alt={`${name} im Flug, von schräg unten mit ausgebreiteten Flügeln`}
            width={1400}
            height={1400}
            sizes="(max-width: 780px) 100vw, 730px"
            priority
            draggable={false}
          />
          <TooltipProvider delay={80}>
            {parts.map((part) => (
              <Tooltip
                key={`${species}-${part.id}`}
                triggerId={`anatomy-${species}-${part.id}`}
                open={(pinned ?? open) === part.id}
                onOpenChange={(nextOpen, details) => {
                  if (nextOpen && pinned !== part.id) setPinned(null);
                  if (
                    details.reason === 'escape-key' ||
                    details.reason === 'outside-press'
                  )
                    setPinned(null);
                  setOpen((current) =>
                    nextOpen ? part.id : current === part.id ? null : current,
                  );
                }}
              >
                <TooltipTrigger
                  id={`anatomy-${species}-${part.id}`}
                  closeOnClick={false}
                  className="anatomy-point"
                  style={{
                    left: `${part.positions[species][0]}%`,
                    top: `${part.positions[species][1]}%`,
                  }}
                  aria-label={part.name}
                  aria-pressed={selected === part.id}
                  onClick={() => {
                    setSelected(part.id);
                    setPinned(pinned === part.id ? null : part.id);
                    setOpen(null);
                  }}
                >
                  <span className="anatomy-point-core" />
                </TooltipTrigger>
                <TooltipContent variant="detail" sideOffset={8}>
                  <strong className="app-tooltip-title">{part.name}</strong>
                  <span>{part.text}</span>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </section>
      <aside
        className="anatomy-notes detail-panel"
        aria-label="Körperteile entdecken"
      >
        <div className="anatomy-notes-heading">
          <h2>Der Körperbau</h2>
        </div>
        <p className="anatomy-notes-intro">
          Wähle ein Körperteil und sieh, wofür es gebaut ist.
        </p>
        <div
          className="anatomy-part-list"
          role="group"
          aria-label="Körperteil wählen"
        >
          {parts.map((part) => (
            <button
              type="button"
              key={part.id}
              aria-pressed={selected === part.id}
              onClick={() => {
                setSelected(part.id);
                setPinned(part.id);
                setOpen(null);
              }}
            >
              <span className="anatomy-list-dot" />
              {part.name}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

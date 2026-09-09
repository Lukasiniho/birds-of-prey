'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  ArrowCounterClockwise,
  ArrowRight,
  CircleDashed,
  Pause,
  Play,
  Wind,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SpeciesName } from '@/components/species-name';
import {
  flightModes,
  type KnowledgeBird,
  type FlightMode,
} from './knowledge-data';
import FlightStage from './flight-stage';

export default function FlightExplorer({ birds }: { birds: KnowledgeBird[] }) {
  const [mode, setMode] = useState<FlightMode>('kreisen');
  const [manualPause, setPaused] = useState<boolean | null>(null);
  const [restart, setRestart] = useState(0);
  const reducedMotion = useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      media.addEventListener('change', notify);
      return () => media.removeEventListener('change', notify);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
  const paused = manualPause ?? reducedMotion;
  const flight = flightModes.find((item) => item.id === mode)!;
  const bird = birds.find((item) => item.id === flight.bird)!;
  return (
    <div className="knowledge-split">
      <section className="flight-surface" aria-label="Animierte Flugstudie">
        <div className="knowledge-surface-heading">
          <div>
            <span className="knowledge-eyebrow">Flugstudie</span>
            <SpeciesName
              name={bird.name}
              latin={bird.latin}
              variant="knowledge"
            />
          </div>
          <span className="knowledge-tag">{flight.name}</span>
        </div>
        <FlightStage
          key={`${mode}-${restart}`}
          mode={mode}
          image={bird.image}
          paused={paused}
          name={bird.name}
        />
        <div className="flight-toolbar">
          <Button
            variant="outline"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Animation abspielen' : 'Animation pausieren'}
          >
            {paused ? (
              <Play aria-hidden="true" />
            ) : (
              <Pause aria-hidden="true" />
            )}
            {paused ? 'Abspielen' : 'Pause'}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRestart((value) => value + 1)}
            aria-label="Animation von vorn beginnen"
          >
            <ArrowCounterClockwise aria-hidden="true" />
          </Button>
          <span>
            Schematische Bewegung · keine maßstabsgetreue Flugsimulation
          </span>
        </div>
      </section>
      <aside className="knowledge-notes detail-panel">
        <h2>Vier Wege durch die Luft</h2>
        <fieldset
          className="knowledge-choice-list"
          aria-label="Flugweise auswählen"
        >
          {flightModes.map((item, index) => {
            const Icon = [CircleDashed, ArrowRight, Wind, ArrowRight][index];
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={mode === item.id}
                onClick={() => setMode(item.id)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </fieldset>
        <div className="knowledge-description" aria-live="polite">
          <h3>{flight.title}</h3>
          <p>{flight.text}</p>
          <dl className="flight-facts">
            <div>
              <dt>Antrieb / Energie</dt>
              <dd>{flight.force}</dd>
            </div>
            <div>
              <dt>Bewegung</dt>
              <dd>{flight.movement}</dd>
            </div>
          </dl>
          <div className="knowledge-observe">
            <h3>Darauf kannst du achten</h3>
            <p>{flight.watch}</p>
          </div>
          <a className="knowledge-text-link" href={bird.href}>
            Zum Vogelporträt
          </a>
        </div>
        <a
          className="knowledge-source"
          href="https://www.rspb.org.uk/birds-and-wildlife/identifying-birds/whats-that-bird-of-prey"
          target="_blank"
          rel="noreferrer"
        >
          Weiterlesen: RSPB · Greifvögel erkennen
        </a>
      </aside>
    </div>
  );
}

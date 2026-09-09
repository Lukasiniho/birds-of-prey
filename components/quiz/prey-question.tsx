'use client';

import { SpeciesName } from '@/components/species-name';
import { useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Check, Grip, Utensils, X } from 'lucide-react';
import { PreyArt } from '@/components/prey-art';
import { preyCatalog } from '@/lib/diets';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import './new-questions.css';

export function PreyQuestion({
  question,
  bird,
  selected,
  answered,
  onChange,
}: {
  question: Extract<QuizQuestion, { kind: 'prey' }>;
  bird: QuizBird;
  selected: string[];
  answered: boolean;
  onChange: (selected: string[]) => void;
}) {
  const root = useRef<HTMLFieldSetElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const active = useRef<{
    id: string;
    pointerId: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(
    null,
  );
  const [over, setOver] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  function select(id: string, toggle = false) {
    if (answered) return;
    const remove = toggle && selected.includes(id);
    onChange(
      remove
        ? selected.filter((value) => value !== id)
        : [...new Set([...selected, id])],
    );
    setAnnouncement(
      `${preyCatalog[id].name} ${remove ? 'entfernt' : 'zugeordnet'}.`,
    );
  }
  function isOver(x: number, y: number) {
    const element = document.elementFromPoint(x, y);
    return Boolean(element && target.current?.contains(element));
  }
  function cancel(event: PointerEvent<HTMLFieldSetElement>) {
    if (active.current?.pointerId !== event.pointerId) return;
    active.current = null;
    setDrag(null);
    setOver(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return (
    <fieldset
      ref={root}
      aria-label="Typische Nahrung zusammenstellen"
      className="q-prey-task"
      onPointerMove={(event) => {
        const current = active.current;
        if (!current || current.pointerId !== event.pointerId) return;
        if (
          !current.moved &&
          Math.hypot(event.clientX - current.x, event.clientY - current.y) < 5
        )
          return;
        current.moved = true;
        suppressClick.current = true;
        setDrag({ id: current.id, x: event.clientX, y: event.clientY });
        setOver(isOver(event.clientX, event.clientY));
      }}
      onPointerUp={(event) => {
        const current = active.current;
        if (current?.pointerId === event.pointerId) {
          if (current.moved) {
            if (isOver(event.clientX, event.clientY)) select(current.id);
          } else select(current.id, true);
          suppressClick.current = true;
        }
        cancel(event);
      }}
      onPointerCancel={cancel}
      onLostPointerCapture={cancel}
    >
      <div className="q-new-heading">
        <span className="q-task-label">
          <Utensils size={17} /> Speiseplan zusammenstellen
        </span>
        <h2 id="q-question-title" tabIndex={-1}>
          Was frisst dieser Vogel?
        </h2>
        <p>
          Ziehe die typische Nahrung zum Vogel oder tippe sie an. Mehrere
          Antworten sind möglich.
        </p>
      </div>
      <div className="q-prey-layout">
        <div className="q-prey-options" aria-label="Nahrung zur Auswahl">
          {question.options.map((id) => {
            const picked = selected.includes(id);
            const correct = question.correct.includes(id);
            return (
              <button
                key={id}
                type="button"
                className="q-prey-option"
                aria-label={preyCatalog[id].name}
                aria-pressed={picked}
                disabled={answered}
                data-selected={picked}
                data-dragging={drag?.id === id}
                data-correct={answered && correct}
                data-wrong={answered && picked && !correct}
                onPointerDown={(event) => {
                  if (event.button !== 0 || active.current || answered) return;
                  suppressClick.current = false;
                  active.current = {
                    id,
                    pointerId: event.pointerId,
                    x: event.clientX,
                    y: event.clientY,
                    moved: false,
                  };
                  // Capture on the stable board, independent of card selection state.
                  root.current?.setPointerCapture(event.pointerId);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && active.current) {
                    const id = active.current.pointerId;
                    active.current = null;
                    setDrag(null);
                    setOver(false);
                    if (root.current?.hasPointerCapture(id))
                      root.current.releasePointerCapture(id);
                  }
                }}
                onClick={(event) => {
                  if (event.detail > 0 && suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  select(id, true);
                }}
              >
                <span className="q-prey-mark" aria-hidden="true">
                  {answered ? (
                    correct ? (
                      <Check size={17} />
                    ) : picked ? (
                      <X size={17} />
                    ) : null
                  ) : picked ? (
                    <Check size={17} />
                  ) : (
                    <Grip size={17} />
                  )}
                </span>
                <span className="q-prey-art">
                  <PreyArt preyKey={id} />
                </span>
                <strong>{preyCatalog[id].name}</strong>
              </button>
            );
          })}
        </div>
        <div
          ref={target}
          className="q-prey-target"
          data-over={over}
          data-answered={answered}
          aria-label={`Nahrung für ${bird.name}`}
        >
          <div className="q-specimen-label">
            <SpeciesName
              variant="quiz"
              name={bird.name}
              latin={bird.latin}
              commonAs="span"
              scientificAs="i"
            />
          </div>
          <Image
            className="q-prey-bird"
            src={bird.portrait}
            alt={bird.name}
            width={300}
            height={300}
            unoptimized
            draggable={false}
          />
          <div className="q-prey-plate">
            {selected.length ? (
              selected.map((id) => (
                <button
                  type="button"
                  key={id}
                  disabled={answered}
                  aria-label={`${preyCatalog[id].name} entfernen`}
                  onClick={() => select(id, true)}
                >
                  <PreyArt preyKey={id} />
                  <span>{preyCatalog[id].name}</span>
                  {!answered && <X size={14} aria-hidden="true" />}
                </button>
              ))
            ) : (
              <span className="q-prey-empty">Nahrung hier ablegen</span>
            )}
          </div>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      {drag &&
        createPortal(
          <div
            className="q-prey-drag"
            style={{ left: drag.x + 12, top: drag.y - 65 }}
            aria-hidden="true"
          >
            <PreyArt preyKey={drag.id} />
            <strong>{preyCatalog[drag.id].name}</strong>
          </div>,
          document.body,
        )}
    </fieldset>
  );
}

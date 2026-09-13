'use client';

import { QuizChoiceHeading } from '@/components/quiz/task-heading';
import { SpeciesName } from '@/components/species-name';
import { useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArtImage } from '@/components/art-image';
import {
  Check,
  DotsSix as Grip,
  ForkKnife as Utensils,
  X,
} from '@/components/icons';
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
      className="q-prey-task p-panel min-w-0 m-0 border-0 bg-stage"
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
      <QuizChoiceHeading
        label={
          <>
            <Utensils size={17} /> Speiseplan zusammenstellen
          </>
        }
        description={
          <>
            Ziehe die typische Nahrung zum Vogel oder tippe sie an. Mehrere
            Antworten sind möglich.
          </>
        }
      >
        Was frisst dieser Vogel?
      </QuizChoiceHeading>
      <div className="q-prey-layout grid grid-cols-[1.15fr_1fr] to-compact:grid-cols-[1fr] gap-6 items-stretch">
        <div
          className="q-prey-options grid grid-cols-2 gap-3"
          aria-label="Nahrung zur Auswahl"
          data-quiz-confirm
        >
          {question.options.map((id) => {
            const picked = selected.includes(id);
            const correct = question.correct.includes(id);
            return (
              <button
                key={id}
                type="button"
                className="q-card q-prey-option data-[dragging=true]:opacity-[0.45] pt-6 px-3 pb-4 bg-surface text-foreground relative flex flex-col items-center justify-center gap-3 min-w-0 select-none"
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
                <span
                  className="q-prey-mark absolute top-[10px] right-[10px]"
                  aria-hidden="true"
                >
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
                <span className="q-prey-art to-phone:size-[64px] to-phone:min-h-[64px] grid place-items-center size-[100px] max-w-full min-h-[100px] overflow-hidden pointer-events-none">
                  <PreyArt preyKey={id} variant="choice" />
                </span>
                <strong className="text-(length:--type-ui) font-(--weight-medium) leading-(--leading-compact)">
                  {preyCatalog[id].name}
                </strong>
              </button>
            );
          })}
        </div>
        <div
          ref={target}
          className="q-card q-prey-target to-compact:grid to-compact:grid-cols-[1fr_120px] to-compact:gap-[10px] to-compact:p-panel to-phone:p-panel to-phone:grid-cols-[1fr_76px] rounded-(--radius-card) bg-surface min-w-0 flex flex-col items-center p-panel"
          data-over={over}
          data-answered={answered}
          aria-label={`Nahrung für ${bird.name}`}
        >
          <div className="q-specimen-label self-stretch p-0 flex flex-col items-start gap-0 relative z-1">
            <SpeciesName
              variant="quiz"
              name={bird.name}
              latin={bird.latin}
              commonAs="span"
              scientificAs="i"
            />
          </div>
          <ArtImage
            className="q-prey-bird to-compact:col-start-2 to-compact:row-[1/3] to-compact:h-[98px] to-compact:m-0 w-full h-[190px] object-contain my-3 mx-0 pointer-events-none"
            src={bird.portrait}
            alt={bird.name}
            width={300}
            height={300}
            displayWidth={190}
            draggable={false}
          />
          <div className="q-prey-plate to-compact:justify-start flex flex-wrap items-center justify-center gap-2 min-h-[48px] mt-auto">
            {selected.length ? (
              selected.map((id) => (
                <button
                  className="flex items-center gap-(--space-8) py-(--space-8) px-(--space-12)"
                  type="button"
                  key={id}
                  disabled={answered}
                  aria-label={`${preyCatalog[id].name} entfernen`}
                  onClick={() => select(id, true)}
                >
                  <PreyArt preyKey={id} variant="placed" />
                  <span>{preyCatalog[id].name}</span>
                  {!answered && <X size={14} aria-hidden="true" />}
                </button>
              ))
            ) : (
              <span className="q-prey-empty text-(length:--type-ui) text-muted-foreground">
                Nahrung hier ablegen
              </span>
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
            className="q-prey-drag border-(length:--border-structure) text-foreground rounded-(--radius-card) bg-background shadow-(--shadow-floating) fixed z-1000 pointer-events-none w-[130px] p-3 text-center"
            style={{ left: drag.x + 12, top: drag.y - 65 }}
            aria-hidden="true"
          >
            <PreyArt preyKey={drag.id} variant="drag" />
            <strong className="block mt-2 text-(length:--type-ui)">
              {preyCatalog[drag.id].name}
            </strong>
          </div>,
          document.body,
        )}
    </fieldset>
  );
}

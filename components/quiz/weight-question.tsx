'use client';

import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DotsSix as Grip,
  Scales as Scale,
  X,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import { closestWeightSlot } from '@/lib/quiz-drag';
import { moveBird, weightOrder } from '@/lib/quiz-engine';
import type { BirdMap, QuizDraft as Draft } from '@/lib/quiz-answer';
import { BirdArt } from './bird-art';
import { QuizTaskHeading, QuizCardFooter } from './task-heading';
import { formatWeight } from './format-measurement';

export function WeightQuestion({
  birds,
  draft,
  answered,
  onChange,
}: {
  birds: BirdMap;
  draft: Draft;
  answered: boolean;
  onChange: (draft: Draft) => void;
}) {
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(
    null,
  );
  const [announcement, setAnnouncement] = useState('');
  const boardRef = useRef<HTMLOListElement>(null);
  const positions = useRef<Map<string, DOMRect>>(new Map());
  const activeDrag = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    slots: { x: number; y: number }[];
    order: string[];
    moved: boolean;
  } | null>(null);
  const correct = weightOrder(draft.order, birds);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board || !positions.current.size) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const duration =
        parseFloat(
          getComputedStyle(board).getPropertyValue('--duration-fast'),
        ) || 250;
      const easing =
        getComputedStyle(board).getPropertyValue('--ease-smooth-out').trim() ||
        'ease-out';
      board
        .querySelectorAll<HTMLElement>('[data-weight-card]')
        .forEach((card) => {
          const before = positions.current.get(card.dataset.weightCard!);
          const after = card.getBoundingClientRect();
          if (before)
            card.animate(
              [
                {
                  transform: `translate(${before.x - after.x}px, ${before.y - after.y}px)`,
                },
                { transform: 'translate(0, 0)' },
              ],
              { duration, easing },
            );
        });
    }
    positions.current.clear();
  }, [draft.order]);

  function move(id: string, index: number) {
    const order = activeDrag.current?.order ?? draft.order;
    if (
      answered ||
      index < 0 ||
      index >= order.length ||
      order.indexOf(id) === index
    )
      return;
    boardRef.current
      ?.querySelectorAll<HTMLElement>('[data-weight-card]')
      .forEach((card) => {
        positions.current.set(
          card.dataset.weightCard!,
          card.getBoundingClientRect(),
        );
        card.getAnimations().forEach((animation) => animation.cancel());
      });
    const nextOrder = moveBird(order, id, index);
    if (activeDrag.current) activeDrag.current.order = nextOrder;
    onChange({ ...draft, order: nextOrder });
    setAnnouncement(`${birds[id].name} auf Platz ${index + 1} von 4.`);
  }
  function startDrag(event: PointerEvent<HTMLButtonElement>, id: string) {
    const board = boardRef.current;
    if (answered || !board || event.button !== 0 || activeDrag.current) return;
    const cards = [
      ...board.querySelectorAll<HTMLElement>('[data-weight-card]'),
    ];
    // Measure resting slots, never the moving FLIP animations.
    cards.forEach((card) =>
      card.getAnimations().forEach((animation) => animation.cancel()),
    );
    const slots = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.x + rect.width / 2 + window.scrollX,
        y: rect.y + rect.height / 2 + window.scrollY,
      };
    });
    const slot = slots[draft.order.indexOf(id)];
    activeDrag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX + window.scrollX - slot.x,
      offsetY: event.clientY + window.scrollY - slot.y,
      slots,
      order: [...draft.order],
      moved: false,
    };
    // The board stays mounted in place when its keyed cards are reordered.
    board.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLOListElement>) {
    const active = activeDrag.current;
    if (!active || event.pointerId !== active.pointerId) return;
    if (
      !active.moved &&
      Math.hypot(event.clientX - active.startX, event.clientY - active.startY) <
        5
    )
      return;
    active.moved = true;
    setDrag({ id: active.id, x: event.clientX, y: event.clientY });
    move(
      active.id,
      closestWeightSlot(active.slots, {
        x: event.clientX + window.scrollX - active.offsetX,
        y: event.clientY + window.scrollY - active.offsetY,
      }),
    );
  }

  function endDrag(event: PointerEvent<HTMLOListElement>) {
    if (activeDrag.current?.pointerId !== event.pointerId) return;
    activeDrag.current = null;
    setDrag(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="q-weight-task p-panel bg-stage">
      <QuizTaskHeading
        className="q-weight-heading"
        label={
          <>
            <Scale size={17} /> Vier Vögel, eine Reihenfolge
          </>
        }
        description="Ordne die vier Arten nach ihrem typischen Gewicht – von leicht nach schwer."
      >
        Von federleicht zu schwer.
      </QuizTaskHeading>
      <ol
        ref={boardRef}
        className="q-weight-board grid grid-cols-4 to-tablet:grid-cols-2 gap-4 list-none p-0 m-0"
        data-quiz-confirm
        aria-label="Vögel vom leichtesten zum schwersten"
        onPointerMove={pointerMove}
        onPointerUp={(event) => {
          pointerMove(event);
          endDrag(event);
        }}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        {draft.order.map((id, index) => (
          <li
            key={id}
            data-weight-card={id}
            className="q-card q-weight-card rounded-(--radius-card) bg-surface shadow-(--shadow-none) relative p-4 min-w-0"
            data-dragging={drag?.id === id}
            data-correct={answered && correct[index] === id}
            data-wrong={answered && correct[index] !== id}
          >
            <div className="q-card-top inset-x-4 top-4 absolute z-1 flex items-center justify-between">
              <span className="q-card-rank rounded-[50%] text-(length:--type-caption) bg-stage text-muted-foreground grid place-items-center size-[26px]">
                {index + 1}
              </span>
              <button
                className="q-drag-handle border-0 -my-[5px] -mr-1 ml-0 bg-transparent disabled:opacity-25 text-muted-foreground grid place-items-center size-[35px]"
                disabled={answered}
                aria-label={`${birds[id].name} verschieben. Pfeiltasten ändern den Platz.`}
                onPointerDown={(event) => startDrag(event, id)}
                onKeyDown={(event) => {
                  const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key)
                    ? -1
                    : ['ArrowRight', 'ArrowDown'].includes(event.key)
                      ? 1
                      : 0;
                  if (direction) {
                    event.preventDefault();
                    move(id, index + direction);
                  }
                }}
              >
                <Grip size={21} />
              </button>
            </div>
            <BirdArt
              bird={birds[id]}
              className="q-card-bird to-tablet:h-[128px] to-small:h-[108px] w-full h-auto aspect-square max-h-[280px] object-contain p-0 pointer-events-none"
              displayWidth={280}
            />
            <div className="q-card-name min-h-[44px] text-center px-half">
              <SpeciesName
                variant="quiz"
                name={birds[id].name}
                latin={birds[id].latin}
                commonAs="h3"
                scientificAs="i"
              />
            </div>
            {answered ? (
              <QuizCardFooter className="q-card-weight font-(--weight-medium) gap-2">
                {formatWeight(birds[id])}
                {correct[index] === id ? (
                  <Check size={16} aria-label="Richtiger Platz" />
                ) : (
                  <X size={16} aria-label="Falscher Platz" />
                )}
              </QuizCardFooter>
            ) : (
              <QuizCardFooter className="q-card-moves">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-[30px]"
                  disabled={index === 0}
                  aria-label={`${birds[id].name} einen Platz nach vorne`}
                  onClick={() => move(id, index - 1)}
                >
                  <ArrowLeft size={16} />
                </Button>
                <span>Platz {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-[30px]"
                  disabled={index === 3}
                  aria-label={`${birds[id].name} einen Platz nach hinten`}
                  onClick={() => move(id, index + 1)}
                >
                  <ArrowRight size={16} />
                </Button>
              </QuizCardFooter>
            )}
          </li>
        ))}
      </ol>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      {drag &&
        createPortal(
          <div
            className="q-drag-ghost rotate-[5deg] border-(length:--border-structure) text-foreground rounded-(--radius-card) bg-background shadow-(--shadow-floating) fixed z-1000 w-[170px] py-3 px-4 pointer-events-none text-center"
            style={{ left: drag.x + 14, top: drag.y - 75 }}
            aria-hidden="true"
          >
            <BirdArt
              className="w-full h-[115px] object-contain"
              bird={birds[drag.id]}
              displayWidth={120}
            />
            <SpeciesCommonName variant="quiz" as="strong">
              {birds[drag.id].name}
            </SpeciesCommonName>
          </div>,
          document.body,
        )}
    </div>
  );
}

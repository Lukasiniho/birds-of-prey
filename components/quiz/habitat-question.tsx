'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArtImage } from '@/components/art-image';
import { SpeciesCommonName } from '@/components/species-name';
import { Check, DotsSix as Grip, MapPin, Plus, X } from '@/components/icons';
import type { QuizHabitat, QuizQuestion } from '@/lib/quiz-engine';
import type { BirdMap, QuizDraft as Draft } from '@/lib/quiz-answer';
import { BirdArt } from './bird-art';
import { QuizTaskHeading } from './task-heading';

export function HabitatQuestion({
  question,
  birds,
  habitats,
  draft,
  answered,
  onChange,
}: {
  question: Extract<QuizQuestion, { kind: 'habitat' }>;
  birds: BirdMap;
  habitats: QuizHabitat[];
  draft: Draft;
  answered: boolean;
  onChange: (draft: Draft) => void;
}) {
  const [selected, setSelected] = useState(question.birdIds[0]);
  const [drag, setDrag] = useState<{
    id: string;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const startPoint = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const boardRef = useRef<HTMLDivElement>(null);

  function place(id: string, habitatId: string) {
    if (answered || !question.habitatIds.includes(habitatId)) return;
    onChange({
      ...draft,
      placements: { ...draft.placements, [id]: habitatId },
    });
    setSelected(
      question.birdIds.find(
        (birdId) => birdId !== id && !draft.placements[birdId],
      ) ?? id,
    );
    setAnnouncement(
      `${birds[id].name} zu ${habitats.find((habitat) => habitat.id === habitatId)!.label} zugeordnet.`,
    );
  }
  function targetAt(x: number, y: number) {
    const target = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>('[data-habitat-zone]');
    return target && boardRef.current?.contains(target)
      ? target.dataset.habitatZone!
      : null;
  }
  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!drag) return;
    const moved =
      drag.moved ||
      Math.hypot(
        event.clientX - startPoint.current.x,
        event.clientY - startPoint.current.y,
      ) > 6;
    setDrag({ ...drag, x: event.clientX, y: event.clientY, moved });
    if (moved) {
      dragged.current = true;
      setHover(targetAt(event.clientX, event.clientY));
    }
  }
  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (drag?.moved) {
      const target = targetAt(event.clientX, event.clientY);
      if (target) place(drag.id, target);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    setDrag(null);
    setHover(null);
  }
  return (
    <div className="q-habitat-task bg-stage">
      <QuizTaskHeading
        className="q-habitat-heading"
        label={
          <>
            <MapPin size={17} /> Finde ein passendes Zuhause
          </>
        }
        description="Ordne die Vögel durch Ziehen oder Antippen zu. Mehrere Vögel dürfen dieselbe Landschaft teilen."
      >
        Wer lebt denn hier?
      </QuizTaskHeading>
      <div
        className="q-habitat-birds grid grid-cols-4 gap-3 to-desktop:grid-cols-2 to-tablet:gap-2 to-phone:grid-cols-1"
        aria-label="Vögel zum Zuordnen"
        data-quiz-confirm
      >
        {question.birdIds.map((id) => {
          const placement = habitats.find(
            (habitat) => habitat.id === draft.placements[id],
          );
          const correct =
            answered && birds[id].habitats.includes(draft.placements[id]);
          return (
            <button
              key={id}
              className="q-card q-habitat-bird data-[dragging=true]:opacity-35 to-desktop:flex-wrap to-desktop:gap-2 to-desktop:p-3 to-tablet:py-2 to-tablet:px-3 to-tablet:flex-nowrap to-tablet:gap-3 bg-surface min-w-0 flex items-center gap-2 p-3 text-left"
              disabled={answered}
              aria-pressed={selected === id}
              data-placed={Boolean(placement)}
              data-correct={correct}
              data-wrong={answered && !correct}
              data-dragging={drag?.moved && drag.id === id}
              aria-label={`${birds[id].name}${placement ? `, zugeordnet zu ${placement.label}` : ', noch nicht zugeordnet'}`}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                setSelected(id);
              }}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                dragged.current = false;
                startPoint.current = { x: event.clientX, y: event.clientY };
                event.currentTarget.setPointerCapture(event.pointerId);
                setSelected(id);
                setDrag({
                  id,
                  x: event.clientX,
                  y: event.clientY,
                  moved: false,
                });
              }}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={() => {
                setDrag(null);
                setHover(null);
              }}
              onLostPointerCapture={() => {
                setDrag(null);
                setHover(null);
              }}
            >
              <BirdArt
                className="w-[57px] h-[60px] to-desktop:w-[48px] to-desktop:h-[46px] to-tablet:w-[40px] to-tablet:h-[45px] object-contain pointer-events-none"
                bird={birds[id]}
                portrait
                displayWidth={60}
              />
              <span className="flex-1 min-w-0">
                <SpeciesCommonName
                  variant="quiz"
                  as="strong"
                  className="block wrap-anywhere"
                >
                  {birds[id].name}
                </SpeciesCommonName>
                <small className="text-(length:--type-body) mt-half block leading-(--leading-compact) text-(--muted-foreground)">
                  {placement ? placement.label : 'Noch auf der Suche'}
                </small>
              </span>
              {correct ? (
                <Check
                  className="shrink-0 w-[14px] to-desktop:hidden"
                  size={16}
                  aria-label="Richtig zugeordnet"
                />
              ) : answered ? (
                <X
                  className="shrink-0 w-[14px] to-desktop:hidden"
                  size={16}
                  aria-label="Falsch zugeordnet"
                />
              ) : (
                <Grip
                  className="shrink-0 w-[14px] to-desktop:hidden"
                  size={16}
                />
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className="q-habitat-selection to-tablet:leading-(--leading-normal) text-(length:--type-ui) text-muted-foreground flex justify-center items-center gap-2 min-h-[44px] py-[10px]"
          aria-live="polite"
        >
          <Check size={15} /> Alle vier Vögel zugeordnet
        </div>
      )}
      <div
        ref={boardRef}
        className="q-habitat-board [&:is(.q-habitat-birds+*)]:mt-5 grid grid-cols-4 gap-4 to-tablet:grid-cols-[1fr_1fr] to-tablet:gap-3"
        aria-label="Landschaften"
        data-quiz-confirm
      >
        {habitats.map((habitat) => {
          const residents = question.birdIds.filter(
            (id) => draft.placements[id] === habitat.id,
          );
          return (
            <button
              key={habitat.id}
              className="q-card q-habitat-zone text-foreground to-tablet:min-h-[178px] bg-surface relative flex flex-col text-left min-h-[230px] p-0 overflow-hidden"
              data-habitat-zone={habitat.id}
              data-hover={hover === habitat.id}
              disabled={answered}
              aria-label={`${birds[selected].name} zu ${habitat.label} zuordnen${residents.length ? `. Hier: ${residents.map((id) => birds[id].name).join(', ')}` : ''}`}
              onClick={() => place(selected, habitat.id)}
            >
              <div className="q-landscape relative w-full shrink-0 overflow-hidden">
                <ArtImage
                  className="q-landscape-image to-tablet:h-[100px] block h-[150px] w-full object-cover pointer-events-none"
                  src={habitat.image}
                  alt={habitat.description}
                  width={640}
                  height={480}
                  displayWidth={640}
                  draggable={false}
                />
                <div className="q-landscape-title inset-x-0 bottom-0 px-4 pt-0 pb-[10px] to-tablet:px-3 to-tablet:pb-[7px] to-tablet:text-(length:--type-lead) leading-(--leading-none) text-(--on-image) font-(family-name:--font-stack-display) text-(length:--type-card-title) font-(--weight-semibold) absolute z-1 flex items-center justify-between gap-2">
                  <span>{habitat.label}</span>
                  <MapPin size={17} className="shrink-0" />
                </div>
              </div>
              <div className="q-habitat-residents p-3 flex-1 flex flex-col gap-2">
                {residents.length ? (
                  residents.map((id) => (
                    <span
                      className="flex items-center gap-(--space-8) min-h-[56px] py-(--space-8) px-(--space-12) font-(--weight-medium) leading-(--leading-compact) text-left"
                      key={id}
                      data-correct={
                        answered
                          ? birds[id].habitats.includes(habitat.id)
                          : undefined
                      }
                      data-wrong={
                        answered && !birds[id].habitats.includes(habitat.id)
                      }
                    >
                      <ArtImage
                        className="size-[36px] shrink-0 object-contain"
                        src={birds[id].portrait}
                        alt=""
                        width={36}
                        height={36}
                        displayWidth={36}
                      />
                      <SpeciesCommonName
                        variant="quiz"
                        as="span"
                        className="q-resident-name wrap-anywhere min-w-0"
                      >
                        {birds[id].name}
                      </SpeciesCommonName>
                      {answered &&
                        (birds[id].habitats.includes(habitat.id) ? (
                          <Check
                            className="shrink-0 ml-auto"
                            size={18}
                            aria-label="Richtig zugeordnet"
                          />
                        ) : (
                          <X
                            className="shrink-0 ml-auto"
                            size={18}
                            aria-label="Falsch zugeordnet"
                          />
                        ))}
                    </span>
                  ))
                ) : (
                  <span className="q-drop-label justify-center h-[34px] mt-auto flex items-center gap-(--space-8) min-h-[56px] py-(--space-8) px-(--space-12) font-(--weight-medium) leading-(--leading-compact) text-left">
                    <Plus className="shrink-0" size={16} /> Hier zuordnen
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      {drag?.moved &&
        createPortal(
          <div
            className="q-drag-ghost border-(length:--border-structure) text-foreground rounded-(--radius-card) bg-background shadow-(--shadow-floating) fixed z-1000 w-[170px] py-3 px-4 pointer-events-none text-center"
            style={{ left: drag.x + 14, top: drag.y - 75 }}
            aria-hidden="true"
          >
            <BirdArt
              className="w-full h-[115px] object-contain"
              bird={birds[drag.id]}
              portrait
              displayWidth={60}
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

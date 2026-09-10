'use client';

import {
  AppSelectTrigger as SelectTrigger,
  AppSelectContent as SelectContent,
} from '@/components/app-select';
import { QuizQuestionTitle } from '@/components/quiz/question-title';
import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { ArtImage } from '@/components/art-image';
import {
  ArrowLeft,
  ArrowsLeftRight as ArrowLeftRight,
  ForkKnife as Utensils,
  ArrowRight,
  Check,
  CaretRight as ChevronRight,
  Crosshair,
  Eye,
  Ear,
  DotsSix as Grip,
  MapPin,
  Minus,
  Plus,
  ArrowCounterClockwise as RotateCcw,
  Ruler,
  Scales as Scale,
  X,
} from '@/components/icons';
import { SiteHeader } from '@/components/site-header';
import { PreyQuestion } from '@/components/quiz/prey-question';
import { WingComparison } from '@/components/quiz/wing-comparison';
import { QuizFeedback } from '@/components/quiz/answer-feedback';
import { QuizCallInfo, QuizCallPlayer } from '@/components/quiz/call-player';
import { closestWeightSlot } from '@/lib/quiz-drag';
import { Button } from '@/components/ui/button';
import { Select, SelectValue, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  createQuizRound,
  quizHistory,
  type QuizHistory,
  moveBird,
  scoreOrder,
  scoreSpan,
  scoreWeight,
  weightEstimateScale,
  scoreHabitats,
  scorePrey,
  weightOrder,
  type QuizBird,
  type QuizHabitat,
  type QuizQuestion,
} from '@/lib/quiz-engine';

type BirdMap = Record<string, QuizBird>;
type HuntingTypes = Record<string, { label: string; text: string }>;
type Draft = {
  span: number;
  weight: number;
  choice: string | null;
  order: string[];
  placements: Record<string, string>;
  food: string[];
};
type Answer = Draft & { points: number };
const modes = [
  { id: 'identify', label: 'Art erkennen', verb: 'Erkennen', Icon: Eye },
  { id: 'call', label: 'Ruf erkennen', verb: 'Erkennen', Icon: Ear },
  { id: 'span', label: 'Spannweite', verb: 'Schätzen', Icon: Ruler },
  { id: 'hunt', label: 'Jagdweise', verb: 'Erkennen', Icon: Crosshair },
  { id: 'weight', label: 'Gewicht sortieren', verb: 'Sortieren', Icon: Scale },
  {
    id: 'weight-estimate',
    label: 'Gewicht schätzen',
    verb: 'Schätzen',
    Icon: Scale,
  },
  { id: 'habitat', label: 'Lebensraum', verb: 'Zuordnen', Icon: MapPin },
  { id: 'prey', label: 'Nahrung', verb: 'Zusammenstellen', Icon: Utensils },
  {
    id: 'compare',
    label: 'Flügelvergleich',
    verb: 'Vergleichen',
    Icon: ArrowLeftRight,
  },
] as const;
const questionCounts = [5, 8, 12, 16].map((count) => ({
  value: String(count),
  label: `${count} Fragen`,
}));
const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
const weightNumber = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 3,
});
const formatSpan = (bird: QuizBird) => `${bird.span[0]}–${bird.span[1]} cm`;
function formatWeight(bird: QuizBird) {
  const divisor = bird.weight[0] >= 1000 ? 1000 : 1;
  return `${weightNumber.format(bird.weight[0] / divisor)}–${weightNumber.format(bird.weight[1] / divisor)} ${divisor === 1000 ? 'kg' : 'g'}`;
}
function initialDraft(question: QuizQuestion, birds: BirdMap): Draft {
  return {
    span: 150,
    weight:
      question.kind === 'weight-estimate'
        ? weightEstimateScale(birds[question.birdId]).initial
        : 500,
    choice: null,
    order: question.kind === 'weight' ? [...question.birdIds] : [],
    placements: {},
    food: [],
  };
}
function BirdArt({
  bird,
  className = '',
  priority = false,
  portrait = false,
  alt = bird.name,
  displayWidth = 350,
}: {
  bird: QuizBird;
  className?: string;
  priority?: boolean;
  portrait?: boolean;
  alt?: string;
  /** Widest this bird is painted, in CSS pixels. Defaults to the flying stage. */
  displayWidth?: number;
}) {
  return (
    <ArtImage
      className={className}
      src={portrait ? bird.portrait : bird.image}
      alt={alt}
      width={1000}
      height={1000}
      displayWidth={displayWidth}
      priority={priority}
      draggable={false}
    />
  );
}

function EstimateQuestion({
  kind,
  bird,
  draft,
  answered,
  onChange,
}: {
  kind: 'span' | 'weight-estimate';
  bird: QuizBird;
  draft: Draft;
  answered: boolean;
  onChange: (draft: Draft) => void;
}) {
  const isWeight = kind === 'weight-estimate';
  const scale = isWeight
    ? weightEstimateScale(bird)
    : {
        min: 40,
        max: 350,
        step: 10,
        divisor: 1,
        unit: 'centimeter',
        ticks: 32,
      };
  const value = isWeight ? draft.weight : draft.span;
  const unit = isWeight ? (scale.divisor === 1 ? 'g' : 'kg') : 'cm';
  const label = isWeight ? 'Gewicht' : 'Spannweite';
  const midpoint = isWeight ? scale.max / 2 : 200;
  const Icon = isWeight ? Scale : Ruler;
  const formatValue = (amount: number) =>
    `${number.format(amount / scale.divisor)} ${unit}`;
  const update = (value: number) =>
    onChange({
      ...draft,
      [isWeight ? 'weight' : 'span']: Math.max(
        scale.min,
        Math.min(scale.max, Math.round(value / scale.step) * scale.step),
      ),
    });
  return (
    <div className="q-split q-estimate-question">
      <div className="q-specimen q-span-specimen">
        <div className="q-specimen-label">
          <SpeciesName
            variant="quiz"
            name={bird.name}
            latin={bird.latin}
            commonAs="span"
            scientificAs="i"
          />
        </div>
        <div className="q-bird-space">
          <div className="q-orbit" aria-hidden="true" />
          <BirdArt bird={bird} className="q-flying-bird" priority />
        </div>
        <div className="q-measure-slot">
          {!isWeight && (
            <div
              className="q-measure-line"
              style={
                {
                  '--measure-width': `${32 + (draft.span / 350) * 58}%`,
                } as CSSProperties
              }
              aria-hidden="true"
            >
              <span />
              <b>{draft.span} cm</b>
              <span />
            </div>
          )}
        </div>
        <p className="q-art-note">Illustration · nicht maßstabsgetreu</p>
      </div>
      <div className="q-question-controls">
        <span className="q-task-label">
          <Icon size={17} /> Dein Augenmaß ist gefragt
        </span>
        <QuizQuestionTitle>
          {isWeight ? (
            <>
              Wie schwer ist <br />
              dieser Vogel?
            </>
          ) : (
            <>
              Wie weit reichen <br />
              diese Flügel?
            </>
          )}
        </QuizQuestionTitle>
        <p>
          {isWeight
            ? 'Schätze das Körpergewicht des Vogels.'
            : 'Schätze die Spannweite. Gemessen wird von einer Flügelspitze zur anderen.'}
        </p>
        <div className="q-answer-controls">
          <div className="q-estimate">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`${label} um ${formatValue(scale.step)} verringern`}
              disabled={answered || value <= scale.min}
              onClick={() => update(value - scale.step)}
            >
              <Minus size={18} />
            </Button>
            <output
              aria-label={
                isWeight
                  ? 'Dein geschätztes Gewicht'
                  : 'Deine geschätzte Spannweite'
              }
            >
              <strong>{number.format(value / scale.divisor)}</strong>
              <span>{unit}</span>
            </output>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`${label} um ${formatValue(scale.step)} erhöhen`}
              disabled={answered || value >= scale.max}
              onClick={() => update(value + scale.step)}
            >
              <Plus size={18} />
            </Button>
          </div>
          <div className="q-slider-wrap">
            <span id="q-estimate-label" className="sr-only">
              {label} in{' '}
              {isWeight
                ? scale.divisor === 1
                  ? 'Gramm'
                  : 'Kilogramm'
                : 'Zentimetern'}{' '}
              schätzen
            </span>
            <Slider
              className="q-slider"
              value={[value / scale.divisor]}
              min={scale.min / scale.divisor}
              max={scale.max / scale.divisor}
              step={scale.step / scale.divisor}
              disabled={answered}
              aria-labelledby="q-estimate-label"
              locale="de-DE"
              format={{
                style: 'unit',
                unit: scale.unit,
                maximumFractionDigits: 1,
              }}
              thumbAlignment="center"
              onValueChange={(value) =>
                update(
                  (Array.isArray(value) ? value[0] : value) * scale.divisor,
                )
              }
            />
            <div className="q-ruler-ticks" aria-hidden="true">
              {Array.from({ length: scale.ticks }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="q-slider-labels">
              <span>{formatValue(scale.min)}</span>
              <span
                style={{
                  left: `${((midpoint - scale.min) / (scale.max - scale.min)) * 100}%`,
                }}
              >
                {formatValue(midpoint)}
              </span>
              <span>{formatValue(scale.max)}</span>
            </div>
            <div
              className="q-range-reveal"
              data-revealed={answered}
              aria-hidden={!answered}
            >
              <span>
                <Check size={16} aria-hidden="true" />
                Natürlicher Bereich
              </span>
              <strong>
                {isWeight ? formatWeight(bird) : formatSpan(bird)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MultipleChoiceQuestion({
  question,
  bird,
  draft,
  answered,
  onChange,
  huntingTypes,
  birds,
}: {
  question: Extract<QuizQuestion, { kind: 'hunt' | 'identify' | 'call' }>;
  bird: QuizBird;
  draft: Draft;
  answered: boolean;
  onChange: (draft: Draft) => void;
  huntingTypes: HuntingTypes;
  birds: BirdMap;
}) {
  const isIdentify = question.kind === 'identify';
  const isCall = question.kind === 'call';
  const showName = question.kind === 'hunt' || answered;
  const Icon = isCall ? Ear : isIdentify ? Eye : Crosshair;
  return (
    <div className="q-split q-hunt-split">
      <div className="q-specimen q-hunt-specimen" data-call={isCall}>
        <div className="q-specimen-label">
          {showName ? (
            <SpeciesName
              variant="quiz"
              name={bird.name}
              latin={bird.latin}
              commonAs="span"
              scientificAs="i"
            />
          ) : (
            <SpeciesCommonName variant="quiz">
              {isCall ? 'Vogelruf' : 'Flugbild'}
            </SpeciesCommonName>
          )}
        </div>
        <div className="q-bird-space">
          {(!isCall || answered) && (
            <>
              <div className="q-orbit" aria-hidden="true" />
              <BirdArt
                bird={bird}
                className="q-flying-bird"
                alt={
                  showName ? bird.name : 'Greifvogel im Flug – bestimme die Art'
                }
              />
            </>
          )}
          {isCall && bird.recording && (
            <QuizCallPlayer recording={bird.recording} revealed={answered} />
          )}
        </div>
        {isCall && bird.recording && (
          <QuizCallInfo recording={bird.recording} />
        )}
      </div>
      <div className="q-question-controls">
        <span className="q-task-label">
          <Icon size={17} />{' '}
          {isCall
            ? 'Ruf erkennen'
            : isIdentify
              ? 'Art erkennen'
              : 'Jagdweisen erkennen'}
        </span>
        <QuizQuestionTitle>
          {isCall ? (
            <>
              Welcher Greifvogel <br />
              ruft hier?
            </>
          ) : isIdentify ? (
            <>
              Welcher Greifvogel <br />
              ist das?
            </>
          ) : (
            <>
              Wie kommt dieser <br />
              Vogel an seine Beute?
            </>
          )}
        </QuizQuestionTitle>
        <p>
          {isCall
            ? 'Höre dir die Aufnahme an und wähle die passende Art aus.'
            : isIdentify
              ? 'Wähle die passende Art aus.'
              : `Wähle die typische Jagdweise der Art ${bird.name}.`}
        </p>
        <RadioGroup
          className="q-options q-answer-controls"
          value={draft.choice ?? ''}
          onValueChange={(value) =>
            onChange({ ...draft, choice: String(value) })
          }
          disabled={answered}
          aria-labelledby="q-question-title"
        >
          {question.options.map((option, index) => {
            const optionLabel =
              isIdentify || isCall
                ? birds[option].name
                : huntingTypes[option].label;
            const isCorrect = answered && question.correct === option;
            const isWrong = answered && draft.choice === option && !isCorrect;
            return (
              <label
                key={option}
                className="q-option"
                data-selected={draft.choice === option}
                data-correct={isCorrect}
                data-wrong={isWrong}
              >
                <span className="q-option-letter" aria-hidden="true">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>
                  <strong>{optionLabel}</strong>
                </span>
                <RadioGroupItem value={option} aria-label={optionLabel} />
                {isCorrect && (
                  <Check
                    className="q-option-correct"
                    size={18}
                    aria-label="Richtige Antwort"
                  />
                )}
                {isWrong && (
                  <X
                    className="q-option-wrong"
                    size={18}
                    aria-label="Falsche Antwort"
                  />
                )}
              </label>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}

function WeightQuestion({
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
    <div className="q-weight-task">
      <div className="q-weight-heading">
        <div>
          <span className="q-task-label">
            <Scale size={17} /> Vier Vögel, eine Reihenfolge
          </span>
          <QuizQuestionTitle>Von federleicht zu schwer.</QuizQuestionTitle>
          <p>
            Ordne die vier Arten nach ihrem typischen Gewicht – von leicht nach
            schwer.
          </p>
        </div>
      </div>
      <ol
        ref={boardRef}
        className="q-weight-board"
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
            className="q-weight-card"
            data-dragging={drag?.id === id}
            data-correct={answered && correct[index] === id}
            data-wrong={answered && correct[index] !== id}
          >
            <div className="q-card-top">
              <span className="q-card-rank">{index + 1}</span>
              <button
                className="q-drag-handle"
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
              className="q-card-bird"
              displayWidth={175}
            />
            <div className="q-card-name">
              <SpeciesName
                variant="quiz"
                name={birds[id].name}
                latin={birds[id].latin}
                commonAs="h3"
                scientificAs="i"
              />
            </div>
            {answered ? (
              <div className="q-card-weight">
                {formatWeight(birds[id])}
                {correct[index] === id ? (
                  <Check size={16} aria-label="Richtiger Platz" />
                ) : (
                  <X size={16} aria-label="Falscher Platz" />
                )}
              </div>
            ) : (
              <div className="q-card-moves">
                <Button
                  variant="ghost"
                  size="icon"
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
                  disabled={index === 3}
                  aria-label={`${birds[id].name} einen Platz nach hinten`}
                  onClick={() => move(id, index + 1)}
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
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
            className="q-drag-ghost"
            style={{ left: drag.x + 14, top: drag.y - 75 }}
            aria-hidden="true"
          >
            <BirdArt bird={birds[drag.id]} displayWidth={120} />
            <SpeciesCommonName variant="quiz" as="strong">
              {birds[drag.id].name}
            </SpeciesCommonName>
          </div>,
          document.body,
        )}
    </div>
  );
}

function HabitatQuestion({
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
    <div className="q-habitat-task">
      <div className="q-habitat-heading">
        <div>
          <span className="q-task-label">
            <MapPin size={17} /> Finde ein passendes Zuhause
          </span>
          <QuizQuestionTitle>Wer lebt denn hier?</QuizQuestionTitle>
          <p>
            Ordne die Vögel durch Ziehen oder Antippen zu. Mehrere Vögel dürfen
            dieselbe Landschaft teilen.
          </p>
        </div>
      </div>
      <div className="q-habitat-birds" aria-label="Vögel zum Zuordnen">
        {question.birdIds.map((id) => {
          const placement = habitats.find(
            (habitat) => habitat.id === draft.placements[id],
          );
          const correct =
            answered && birds[id].habitats.includes(draft.placements[id]);
          return (
            <button
              key={id}
              className="q-habitat-bird"
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
              <BirdArt bird={birds[id]} portrait displayWidth={60} />
              <span>
                <SpeciesCommonName variant="quiz" as="strong">
                  {birds[id].name}
                </SpeciesCommonName>
                <small>
                  {placement ? placement.label : 'Noch auf der Suche'}
                </small>
              </span>
              {correct ? (
                <Check size={16} aria-label="Richtig zugeordnet" />
              ) : answered ? (
                <X size={16} aria-label="Falsch zugeordnet" />
              ) : (
                <Grip size={16} />
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="q-habitat-selection" aria-live="polite">
          <Check size={15} /> Alle vier Vögel zugeordnet
        </div>
      )}
      <div ref={boardRef} className="q-habitat-board" aria-label="Landschaften">
        {habitats.map((habitat) => {
          const residents = question.birdIds.filter(
            (id) => draft.placements[id] === habitat.id,
          );
          return (
            <button
              key={habitat.id}
              className="q-habitat-zone"
              data-habitat-zone={habitat.id}
              data-hover={hover === habitat.id}
              disabled={answered}
              aria-label={`${birds[selected].name} zu ${habitat.label} zuordnen${residents.length ? `. Hier: ${residents.map((id) => birds[id].name).join(', ')}` : ''}`}
              onClick={() => place(selected, habitat.id)}
            >
              <div className="q-landscape">
                <ArtImage
                  className="q-landscape-image"
                  src={habitat.image}
                  alt={habitat.description}
                  width={640}
                  height={480}
                  displayWidth={640}
                  draggable={false}
                />
                <div className="q-landscape-title">
                  <span>{habitat.label}</span>
                  <MapPin size={17} />
                </div>
              </div>
              <div className="q-habitat-residents">
                {residents.length ? (
                  residents.map((id) => (
                    <span
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
                        src={birds[id].portrait}
                        alt=""
                        width={36}
                        height={36}
                        displayWidth={36}
                      />
                      <SpeciesCommonName
                        variant="quiz"
                        as="span"
                        className="q-resident-name "
                      >
                        {birds[id].name}
                      </SpeciesCommonName>
                      {answered &&
                        (birds[id].habitats.includes(habitat.id) ? (
                          <Check size={18} aria-label="Richtig zugeordnet" />
                        ) : (
                          <X size={18} aria-label="Falsch zugeordnet" />
                        ))}
                    </span>
                  ))
                ) : (
                  <span className="q-drop-label">
                    <Plus size={16} /> Hier zuordnen
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
            className="q-drag-ghost"
            style={{ left: drag.x + 14, top: drag.y - 75 }}
            aria-hidden="true"
          >
            <BirdArt bird={birds[drag.id]} portrait displayWidth={60} />
            <SpeciesCommonName variant="quiz" as="strong">
              {birds[drag.id].name}
            </SpeciesCommonName>
          </div>,
          document.body,
        )}
    </div>
  );
}

function QuestionFeedback({
  question,
  answer,
  birds,
  huntingTypes,
}: {
  question: QuizQuestion;
  answer: Answer;
  birds: BirdMap;
  huntingTypes: HuntingTypes;
}) {
  const bird = 'birdId' in question ? birds[question.birdId] : null;
  return (
    <QuizFeedback points={answer.points}>
      {question.kind === 'span' && bird && (
        <p>Spannweite: {formatSpan(bird)}.</p>
      )}
      {question.kind === 'weight-estimate' && bird && (
        <p>Gewicht: {formatWeight(bird)}.</p>
      )}
      {question.kind === 'hunt' && (
        <p>Richtig: {huntingTypes[question.correct].label}.</p>
      )}
      {question.kind === 'identify' && bird && (
        <p>
          Richtig: {bird.name}. {bird.identification}
        </p>
      )}
      {question.kind === 'call' && bird && (
        <p>Das ist der Ruf von {bird.name}.</p>
      )}
      {question.kind === 'habitat' && (
        <p>{answer.points / 25} von 4 Vögeln passend zugeordnet.</p>
      )}
      {question.kind === 'prey' && (
        <p>
          {answer.food.filter((id) => question.correct.includes(id)).length} von{' '}
          {question.correct.length} passenden Beutetieren gewählt
          {answer.food.some((id) => !question.correct.includes(id))
            ? `; ${answer.food.filter((id) => !question.correct.includes(id)).length} unpassend`
            : ''}
          .
        </p>
      )}
      {question.kind === 'compare' && (
        <p>
          Größte Spannweite: {birds[question.correct].name} (
          {formatSpan(birds[question.correct])}).
        </p>
      )}
      {question.kind === 'weight' && (
        <p>
          Am leichtesten: {birds[weightOrder(question.birdIds, birds)[0]].name}.
        </p>
      )}
    </QuizFeedback>
  );
}

function QuizResults({
  questions,
  answers,
  birds,
  onRestart,
  onReview,
}: {
  questions: QuizQuestion[];
  answers: Record<string, Answer>;
  birds: BirdMap;
  onRestart: () => void;
  onReview: (index: number) => void;
}) {
  const total = Object.values(answers).reduce(
    (sum, answer) => sum + answer.points,
    0,
  );
  const perfect = Object.values(answers).filter(
    (answer) => answer.points === 100,
  ).length;
  return (
    <section className="q-results" aria-labelledby="q-result-title">
      <div className="q-result-overview">
        <div className="q-result-main">
          <div
            className="q-result-score"
            style={
              {
                '--score-angle': `${(total / (questions.length * 100)) * 360}deg`,
              } as CSSProperties
            }
          >
            <div>
              <strong>{total}</strong>
              <span>von {questions.length * 100} Punkten</span>
            </div>
          </div>
          <div className="q-result-copy">
            <span className="q-task-label">Deine Runde ist komplett</span>
            <h1 id="q-result-title" tabIndex={-1}>
              {total >= questions.length * 80
                ? 'Was für ein Adlerauge.'
                : total >= questions.length * 50
                  ? 'Ein guter Blick fürs Detail.'
                  : 'Jede Runde schärft deinen Blick.'}
            </h1>
            <p>
              {perfect} von {questions.length} Aufgaben mit voller Punktzahl.
            </p>
            <Button className="q-primary" onClick={onRestart}>
              <RotateCcw size={17} /> Noch eine Runde
            </Button>
          </div>
        </div>
        <div className="q-result-breakdown">
          {modes.map(({ id, label, Icon }) => {
            const maxScore =
              questions.filter((q) => q.kind === id).length * 100;
            if (!maxScore) return null;
            const score = questions
              .filter((q) => q.kind === id)
              .reduce((sum, q) => sum + answers[q.id].points, 0);
            return (
              <div key={id}>
                <Icon size={21} />
                <span>{label}</span>
                <strong>
                  {score}
                  <small> / {maxScore}</small>
                </strong>
                <div className="q-result-meter">
                  <span
                    style={{
                      width: `${maxScore ? (score / maxScore) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="q-review-heading">
        <h2>Deine Entdeckungen</h2>
      </div>
      <div className="q-review-list">
        {questions.map((question, index) => {
          const bird =
            birds['birdId' in question ? question.birdId : question.birdIds[0]];
          const mode = modes.find((mode) => mode.id === question.kind)!;
          return (
            <button key={question.id} onClick={() => onReview(index)}>
              <ArtImage
                src={bird.portrait}
                alt=""
                width={64}
                height={64}
                displayWidth={64}
              />
              <span>
                {'birdId' in question ? (
                  <SpeciesCommonName
                    variant="quiz"
                    as="strong"
                    className="q-review-title"
                  >
                    {bird.name}
                  </SpeciesCommonName>
                ) : (
                  <strong className="q-review-title">
                    {question.kind === 'weight'
                      ? 'Von federleicht zu schwer.'
                      : question.kind === 'habitat'
                        ? 'Wer lebt denn hier?'
                        : question.kind === 'compare'
                          ? 'Welcher dieser vier Vögel hat die größte Spannweite?'
                          : bird.name}
                  </strong>
                )}
                <small className="q-review-subtitle">{mode.label}</small>
              </span>
              <b className="q-review-score">
                {answers[question.id].points}
                <small> / 100</small>
              </b>
              <ChevronRight size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function QuizExperience({
  birds,
  huntingTypes,
  habitats,
}: {
  birds: BirdMap;
  huntingTypes: HuntingTypes;
  habitats: QuizHabitat[];
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const ready = questions.length > 0;
  const [questionCount, setQuestionCount] = useState(8);
  const initialized = useRef(false);
  const historyKey = 'bird-quiz:last-round:v1';
  const freshRound = useCallback(
    (previous?: QuizHistory, count = questionCount) => {
      const nextQuestions = createQuizRound(
        birds,
        Object.keys(huntingTypes),
        habitats.map((habitat) => habitat.id),
        {
          seed: crypto.getRandomValues(new Uint32Array(1))[0],
          previous,
          count,
        },
      );
      try {
        sessionStorage.setItem(
          historyKey,
          JSON.stringify(quizHistory(nextQuestions)),
        );
      } catch {
        /* Storage may be disabled. */
      }
      return nextQuestions;
    },
    [birds, huntingTypes, habitats, questionCount],
  );
  useLayoutEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let previous: QuizHistory | undefined;
    try {
      const saved = JSON.parse(sessionStorage.getItem(historyKey) ?? 'null');
      if (
        Array.isArray(saved?.questionKeys) &&
        saved.questionKeys.every((key: unknown) => typeof key === 'string') &&
        Array.isArray(saved?.birdIds) &&
        saved.birdIds.every((id: unknown) => typeof id === 'string')
      )
        previous = saved;
    } catch {
      /* Ignore obsolete or unavailable browser history. */
    }
    setQuestions(freshRound(previous));
  }, [freshRound]);
  const [current, setCurrent] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResults, setShowResults] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const answerBarRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const main = mainRef.current;
    const bar = answerBarRef.current;
    if (!main || !bar) return;
    const update = () =>
      main.style.setProperty(
        '--answer-bar-height',
        `${bar.getBoundingClientRect().height}px`,
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      main.style.removeProperty('--answer-bar-height');
    };
  }, [showResults, ready]);

  const completed = Object.keys(answers).length;
  const roundSettings = (
    <div className="q-round-settings">
      <span id="q-count-label">Fragenzahl</span>
      <Select
        value={String(questionCount)}
        items={questionCounts}
        disabled={completed > 0 && !showResults}
        onValueChange={(value) => {
          if (!value) return;
          const count = Number(value);
          if (count === questionCount) return;
          setQuestionCount(count);
          if (!showResults) {
            setQuestions(freshRound(quizHistory(questions), count));
            setCurrent(0);
            setDrafts({});
          }
        }}
      >
        <SelectTrigger aria-labelledby="q-count-label">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {questionCounts.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  // Static HTML and the first client render must agree. Never show a throwaway
  // server round before selecting the browser's history-aware round. The
  // heading row already has its final shape so nothing shifts once it arrives.
  if (!ready) {
    return (
      <div className="app-shell section-shell quiz-shell">
        <SiteHeader activeSection="quiz" />
        <main className="q-main page-content" ref={mainRef} aria-busy="true">
          <div className="q-heading-row">
            <div className="q-title-controls">
              <h1 className="page-title">Das Greifvogel-Quiz</h1>
              {roundSettings}
            </div>
            <div className="q-question-progress" aria-hidden="true">
              <p className="q-progress-label">Frage 1 von {questionCount}</p>
              <div className="q-step-dots">
                {Array.from({ length: questionCount }, (_, index) => (
                  <span
                    key={index}
                    aria-current={index === 0 ? 'step' : undefined}
                  >
                    <span />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = questions[current];
  const draft = drafts[question.id] ?? initialDraft(question, birds);
  const answer = answers[question.id];
  const bird = 'birdId' in question ? birds[question.birdId] : null;

  function navigate(index: number) {
    setCurrent(index);
    setShowResults(false);
  }
  const canSubmit =
    question.kind === 'hunt' ||
    question.kind === 'compare' ||
    question.kind === 'identify' ||
    question.kind === 'call'
      ? Boolean(draft.choice)
      : question.kind === 'prey'
        ? draft.food.length > 0
        : question.kind === 'habitat'
          ? question.birdIds.every((id) => Boolean(draft.placements[id]))
          : true;
  function submit() {
    if (answer || !canSubmit) return;
    const points =
      question.kind === 'span'
        ? scoreSpan(draft.span, birds[question.birdId].span)
        : question.kind === 'weight-estimate'
          ? scoreWeight(draft.weight, birds[question.birdId].weight)
          : question.kind === 'hunt' ||
              question.kind === 'compare' ||
              question.kind === 'identify' ||
              question.kind === 'call'
            ? draft.choice === question.correct
              ? 100
              : 0
            : question.kind === 'prey'
              ? scorePrey(draft.food, question.correct, question.options)
              : question.kind === 'weight'
                ? scoreOrder(draft.order, weightOrder(question.birdIds, birds))
                : scoreHabitats(question.birdIds, draft.placements, birds);
    setAnswers((previous) =>
      previous[question.id]
        ? previous
        : { ...previous, [question.id]: { ...draft, points } },
    );
  }
  function next() {
    if (completed === questions.length) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.requestAnimationFrame(() =>
        document
          .getElementById('q-result-title')
          ?.focus({ preventScroll: true }),
      );
      return;
    }
    for (let step = 1; step <= questions.length; step++) {
      const index = (current + step) % questions.length;
      if (!answers[questions[index].id]) {
        navigate(index);
        break;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.requestAnimationFrame(() =>
      document
        .getElementById('q-question-title')
        ?.focus({ preventScroll: true }),
    );
  }
  function restart() {
    setQuestions(freshRound(quizHistory(questions)));
    setCurrent(0);
    setDrafts({});
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const onChange = (value: Draft) =>
    setDrafts((previous) => ({ ...previous, [question.id]: value }));

  return (
    <div className="app-shell section-shell quiz-shell">
      <SiteHeader activeSection="quiz" />
      <main className="q-main page-content" ref={mainRef}>
        {showResults ? (
          <>
            {roundSettings}
            <QuizResults
              questions={questions}
              answers={answers}
              birds={birds}
              onRestart={restart}
              onReview={navigate}
            />
          </>
        ) : (
          <>
            <div className="q-heading-row">
              <div className="q-title-controls">
                <h1 className="page-title" ref={headingRef} tabIndex={-1}>
                  Das Greifvogel-Quiz
                </h1>
                {roundSettings}
              </div>
              <div className="q-question-progress">
                <p
                  className="q-progress-label"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Frage {current + 1} von {questions.length}
                </p>
                <nav className="q-step-dots" aria-label="Quiz-Fragen">
                  {questions.map((item, index) => (
                    <button
                      key={item.id}
                      aria-label={`Frage ${index + 1} von ${questions.length}: ${modes.find((mode) => mode.id === item.kind)!.label}${answers[item.id] ? ', beantwortet' : ''}`}
                      aria-current={current === index ? 'step' : undefined}
                      data-done={Boolean(answers[item.id])}
                      onClick={() => navigate(index)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="q-workspace">
              <div key={`question-${question.id}`} className="q-question-scene">
                {(question.kind === 'span' ||
                  question.kind === 'weight-estimate') &&
                  bird && (
                    <EstimateQuestion
                      kind={question.kind}
                      bird={bird}
                      draft={draft}
                      answered={Boolean(answer)}
                      onChange={onChange}
                    />
                  )}
                {(question.kind === 'hunt' ||
                  question.kind === 'identify' ||
                  question.kind === 'call') &&
                  bird && (
                    <MultipleChoiceQuestion
                      question={question}
                      bird={bird}
                      draft={draft}
                      answered={Boolean(answer)}
                      onChange={onChange}
                      huntingTypes={huntingTypes}
                      birds={birds}
                    />
                  )}
                {question.kind === 'weight' && (
                  <WeightQuestion
                    birds={birds}
                    draft={draft}
                    answered={Boolean(answer)}
                    onChange={onChange}
                  />
                )}
                {question.kind === 'prey' && bird && (
                  <PreyQuestion
                    question={question}
                    bird={bird}
                    selected={draft.food}
                    answered={Boolean(answer)}
                    onChange={(food) => onChange({ ...draft, food })}
                  />
                )}
                {question.kind === 'compare' && (
                  <WingComparison
                    question={question}
                    birds={birds}
                    choice={draft.choice}
                    answered={Boolean(answer)}
                    onChange={(choice) => onChange({ ...draft, choice })}
                  />
                )}
                {question.kind === 'habitat' && (
                  <HabitatQuestion
                    question={question}
                    birds={birds}
                    habitats={question.habitatIds.map((id) =>
                      habitats.find((habitat) => habitat.id === id)!,
                    )}
                    draft={draft}
                    answered={Boolean(answer)}
                    onChange={onChange}
                  />
                )}
              </div>
            </div>
            <div className="q-answer-bar" ref={answerBarRef}>
              {answer && (
                <QuestionFeedback
                  key={`feedback-${question.id}`}
                  question={question}
                  answer={answer}
                  birds={birds}
                  huntingTypes={huntingTypes}
                />
              )}
              <Button
                className="q-primary"
                disabled={!answer && !canSubmit}
                onClick={answer ? next : submit}
              >
                {answer
                  ? completed === questions.length
                    ? 'Ergebnis ansehen'
                    : 'Nächste Aufgabe'
                  : question.kind === 'span' ||
                      question.kind === 'weight-estimate'
                    ? 'Schätzung prüfen'
                    : question.kind === 'weight'
                      ? 'Reihenfolge prüfen'
                      : question.kind === 'habitat'
                        ? 'Zuordnung prüfen'
                        : question.kind === 'prey'
                          ? 'Auswahl prüfen'
                          : 'Antwort prüfen'}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

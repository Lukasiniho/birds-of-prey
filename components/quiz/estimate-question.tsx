'use client';
import {
  QuizSplit,
  QuizOrbit,
  QuizSpecimen,
  QuizBirdSpace,
  QuizPrompt,
} from '@/components/quiz/question-layout';

import { QuizSpanGuide } from './span-guide';
import { SpeciesName } from '@/components/species-name';
import { Check, Minus, Plus, Ruler, Scales as Scale } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { weightEstimateScale, type QuizBird } from '@/lib/quiz-engine';
import type { QuizDraft as Draft } from '@/lib/quiz-answer';
import { BirdArt, QUIZ_FLIGHT_FRAME } from './bird-art';
import { formatSpan, formatWeight } from './format-measurement';

const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });

export function EstimateQuestion({
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
    <QuizSplit className="q-estimate-question">
      <QuizSpecimen className="q-span-specimen">
        <div className="q-specimen-label flex flex-col items-start gap-0 relative z-1">
          <SpeciesName
            variant="quiz"
            name={bird.name}
            latin={bird.latin}
            commonAs="span"
            scientificAs="i"
          />
        </div>
        <QuizBirdSpace>
          <QuizOrbit />
          <BirdArt bird={bird} className={QUIZ_FLIGHT_FRAME} priority />
        </QuizBirdSpace>
        <div className="q-measure-slot min-h-[30px]">
          {!isWeight && <QuizSpanGuide span={draft.span} />}
        </div>
        <p className="q-art-note mt-[14px] text-(length:--type-caption) text-muted-foreground text-center">
          Illustration · nicht maßstabsgetreu
        </p>
      </QuizSpecimen>
      <QuizPrompt
        label={
          <>
            <Icon size={17} /> Dein Augenmaß ist gefragt
          </>
        }
        title={
          isWeight ? (
            <>
              Wie schwer ist <br />
              dieser Vogel?
            </>
          ) : (
            <>
              Wie weit reichen <br />
              diese Flügel?
            </>
          )
        }
        description={
          isWeight
            ? 'Schätze das Körpergewicht des Vogels.'
            : 'Schätze die Spannweite. Gemessen wird von einer Flügelspitze zur anderen.'
        }
        reserveLines
      >
        <div className="q-answer-controls mt-0 pt-6 mb-0" data-quiz-confirm>
          <div className="q-estimate my-[18px] to-tablet:mt-[25px] to-tablet:mb-5 flex items-center justify-center gap-6 to-small:gap-3">
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
              className="flex items-baseline min-w-[170px] to-small:min-w-0 to-small:flex-1 justify-center gap-3"
              aria-label={
                isWeight
                  ? 'Dein geschätztes Gewicht'
                  : 'Deine geschätzte Spannweite'
              }
            >
              <strong className="text-(length:--text-5xl) font-(--weight-bold) tabular-nums tracking-(--tracking-tight) leading-(--leading-none)">
                {number.format(value / scale.divisor)}
              </strong>
              <span className="text-(length:--type-label-title) text-muted-foreground">
                {unit}
              </span>
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
          <div className="q-slider-wrap py-0 px-[10px]">
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
              className="q-slider py-3"
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
            <div
              className="q-ruler-ticks mt-px mb-[7px] flex justify-between h-[10px]"
              aria-hidden="true"
            >
              {Array.from({ length: scale.ticks }, (_, index) => (
                <span className="bg-border w-px" key={index} />
              ))}
            </div>
            <div className="q-slider-labels text-muted-foreground text-(length:--type-caption) relative flex justify-between">
              <span>{formatValue(scale.min)}</span>
              <span
                className="absolute -translate-x-1/2"
                style={{
                  left: `${((midpoint - scale.min) / (scale.max - scale.min)) * 100}%`,
                }}
              >
                {formatValue(midpoint)}
              </span>
              <span>{formatValue(scale.max)}</span>
            </div>
            <div
              className="q-range-reveal data-[revealed=false]:invisible text-(length:--type-ui) text-success flex flex-col items-center justify-center gap-1 mt-[22px]"
              data-revealed={answered}
              aria-hidden={!answered}
            >
              <span className="flex items-center gap-[6px] leading-(--leading-compact)">
                <Check size={16} aria-hidden="true" />
                Natürlicher Bereich
              </span>
              <strong className="text-(length:--text-2xl) font-(--weight-bold) leading-(--leading-heading)">
                {isWeight ? formatWeight(bird) : formatSpan(bird)}
              </strong>
            </div>
          </div>
        </div>
      </QuizPrompt>
    </QuizSplit>
  );
}

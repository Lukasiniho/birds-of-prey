'use client';
import { QuizActionButton } from '@/components/quiz/action-button';

import type { CSSProperties } from 'react';
import { ArtImage } from '@/components/art-image';
import { SpeciesCommonName } from '@/components/species-name';
import {
  ArrowCounterClockwise as RotateCcw,
  CaretRight as ChevronRight,
} from '@/components/icons';
import type { QuizQuestion } from '@/lib/quiz-engine';
import type { BirdMap, QuizAnswer as Answer } from '@/lib/quiz-answer';
import { modes } from './modes';

export function QuizResults({
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
    <section className="q-results py-4 px-0" aria-labelledby="q-result-title">
      <div className="q-result-overview grid grid-cols-2 items-center gap-8 to-desktop:grid-cols-1 to-desktop:gap-4">
        <div className="q-result-main min-w-0 flex gap-8 items-center pb-5 to-tablet:pb-4 to-tablet:flex-row to-tablet:flex-wrap to-tablet:text-left to-tablet:gap-4">
          <div
            className="q-result-score size-[180px] rounded-[50%] p-2 shrink-0"
            style={
              {
                '--score-angle': `${(total / (questions.length * 100)) * 360}deg`,
              } as CSSProperties
            }
          >
            <div className="bg-surface h-full flex flex-col justify-center items-center border-[8px] rounded-[50%]">
              <strong className="text-(length:--text-5xl) font-(--weight-bold) tracking-(--tracking-tight) leading-(--leading-heading)">
                {total}
              </strong>
              <span className="text-muted-foreground text-(length:--type-caption)">
                von {questions.length * 100} Punkten
              </span>
            </div>
          </div>
          <div className="q-result-copy max-w-[590px]">
            <span className="q-task-label to-tablet:justify-start to-tablet:mb-3 text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-4">
              Deine Runde ist komplett
            </span>
            <h1
              className="text-(length:--type-heading) font-(family-name:--font-stack-display) leading-(--leading-display) font-(--weight-semibold) tracking-(--tracking-tight)"
              id="q-result-title"
              tabIndex={-1}
            >
              {total >= questions.length * 80
                ? 'Was für ein Adlerauge.'
                : total >= questions.length * 50
                  ? 'Ein guter Blick fürs Detail.'
                  : 'Jede Runde schärft deinen Blick.'}
            </h1>
            <p className="text-(length:--type-body) mt-2 mb-3 leading-(--leading-relaxed) text-muted-foreground">
              {perfect} von {questions.length} Aufgaben mit voller Punktzahl.
            </p>
            <QuizActionButton onClick={onRestart}>
              <RotateCcw size={17} /> Noch eine Runde
            </QuizActionButton>
          </div>
        </div>
        <div className="q-result-breakdown grid grid-cols-2 gap-x-6 gap-y-3 py-4 px-0 to-desktop:grid-cols-[repeat(2,1fr)] to-desktop:gap-6">
          {modes.map(({ id, label, Icon }) => {
            const maxScore =
              questions.filter((q) => q.kind === id).length * 100;
            if (!maxScore) return null;
            const score = questions
              .filter((q) => q.kind === id)
              .reduce((sum, q) => sum + answers[q.id].points, 0);
            return (
              <div
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-[15px] text-(length:--type-ui) to-tablet:px-0"
                key={id}
              >
                <Icon size={21} className="text-(--main-color)" />
                <span>{label}</span>
                <strong className="to-tablet:text-(length:--type-ui)">
                  {score}
                  <small className="font-(--weight-regular) text-muted-foreground text-(length:--type-caption)">
                    {' '}
                    / {maxScore}
                  </small>
                </strong>
                <div className="q-result-meter rounded-(--radius-small) h-[4px] bg-border col-span-full">
                  <span
                    className="block h-full bg-(--main-color) rounded-[inherit] transition-[width] duration-(--duration-slow) ease-(--ease-smooth-out)"
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
      <div className="q-review-heading to-tablet:items-start to-tablet:flex-col to-tablet:gap-5 flex justify-between items-center gap-5 mt-10 mb-5">
        <h2 className="text-(length:--type-heading)">Deine Entdeckungen</h2>
      </div>
      <div className="q-review-list grid grid-cols-[1fr_1fr] gap-3 to-tablet:grid-cols-1">
        {questions.map((question, index) => {
          const bird =
            birds['birdId' in question ? question.birdId : question.birdIds[0]];
          const mode = modes.find((mode) => mode.id === question.kind)!;
          return (
            <button
              className="text-left py-3 px-4 flex items-center gap-4 border-(length:--border-structure) border-border rounded-(--radius-card) bg-surface"
              key={question.id}
              onClick={() => onReview(index)}
            >
              <ArtImage
                className="size-[50px] object-contain"
                src={bird.portrait}
                alt=""
                width={64}
                height={64}
                displayWidth={64}
              />
              <span className="flex-1 min-w-0">
                {'birdId' in question ? (
                  <SpeciesCommonName
                    variant="quiz"
                    as="strong"
                    className="q-review-title font-(family-name:--font-stack-display) text-(length:--type-species-quiz) wrap-anywhere font-(--weight-bold) leading-(--leading-heading) block"
                  >
                    {bird.name}
                  </SpeciesCommonName>
                ) : (
                  <strong className="q-review-title font-(family-name:--font-stack-display) text-(length:--type-species-quiz) wrap-anywhere font-(--weight-bold) leading-(--leading-heading) block">
                    {question.kind === 'weight'
                      ? 'Von federleicht zu schwer.'
                      : question.kind === 'habitat'
                        ? 'Wer lebt denn hier?'
                        : question.kind === 'compare'
                          ? 'Welcher dieser vier Vögel hat die größte Spannweite?'
                          : bird.name}
                  </strong>
                )}
                <small className="q-review-subtitle font-(family-name:--font-stack-body) text-(length:--text-sm) font-(--weight-regular) leading-(--leading-heading) text-muted-foreground block mt-half">
                  {mode.label}
                </small>
              </span>
              <b className="q-review-score tabular-nums font-(family-name:--font-stack-body) text-(length:--text-sm) font-(--weight-semibold) leading-(--leading-compact) shrink-0 whitespace-nowrap">
                {answers[question.id].points}
                <small className="font-(--weight-regular) text-muted-foreground text-(length:--type-caption)">
                  {' '}
                  / 100
                </small>
              </b>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

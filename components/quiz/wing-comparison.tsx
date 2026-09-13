'use client';

import { QuizChoiceHeading } from '@/components/quiz/task-heading';
import { SpeciesName } from '@/components/species-name';
import { ArtImage } from '@/components/art-image';
import {
  ArrowsLeftRight as ArrowLeftRight,
  Check,
  X,
} from '@/components/icons';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import './new-questions.css';

export function WingComparison({
  question,
  birds,
  choice,
  answered,
  onChange,
}: {
  question: Extract<QuizQuestion, { kind: 'compare' }>;
  birds: Record<string, QuizBird>;
  choice: string | null;
  answered: boolean;
  onChange: (id: string) => void;
}) {
  return (
    <div
      className="q-comparison-task min-w-0 m-0 border-0 bg-stage"
      data-answered={answered}
    >
      <QuizChoiceHeading
        label={
          <>
            <ArrowLeftRight size={17} /> Flügel im Vergleich
          </>
        }
        description={<>Wähle den Vogel mit der größten Spannweite.</>}
      >
        Welcher dieser vier Vögel hat die größte Spannweite?
      </QuizChoiceHeading>
      <fieldset
        className="q-comparison-options border-0 grid-cols-4 to-compact:grid-cols-2 to-phone:grid-cols-[1fr] to-phone:gap-3 min-w-0 m-0 p-0 grid gap-4"
        data-quiz-confirm
        aria-label="Vogel mit der größten Spannweite wählen"
      >
        {question.birdIds.map((id) => {
          const bird = birds[id];
          const correct = id === question.correct;
          return (
            <button
              type="button"
              key={id}
              className="q-card q-comparison-card text-foreground grid-rows-[1fr_auto] to-phone:grid-cols-[minmax(0,1fr)_auto] to-phone:grid-rows-[auto] to-phone:items-center bg-surface relative min-w-0 p-4 grid grid-cols-1 gap-0 text-left"
              disabled={answered}
              aria-label={bird.name}
              aria-pressed={choice === id}
              data-selected={choice === id}
              data-correct={answered && correct}
              data-wrong={answered && choice === id && !correct}
              onClick={() => onChange(id)}
            >
              <span
                className="q-compare-radio to-phone:top-[10px] to-phone:right-[10px] to-phone:size-[18px] absolute top-[16px] right-[16px] grid place-items-center size-[22px]"
                aria-hidden="true"
              >
                {answered && correct && <Check size={17} />}
                {answered && choice === id && !correct && <X size={17} />}
              </span>
              <div className="q-comparison-name min-w-0 pr-6">
                <SpeciesName
                  variant="quiz"
                  name={bird.name}
                  latin={bird.latin}
                  commonAs="h3"
                  scientificAs="i"
                />
                <div
                  className="q-comparison-range text-(length:--type-body) mt-1"
                  style={{ visibility: answered ? 'visible' : 'hidden' }}
                >
                  <strong>
                    {bird.span[0]}–{bird.span[1]} cm
                  </strong>
                </div>
              </div>
              <div className="q-comparison-art -mt-6 -mb-3 to-phone:my-0 to-phone:-translate-x-4 to-phone:w-auto to-phone:h-[110px] w-full aspect-square grid place-items-center">
                <ArtImage
                  className="size-full object-contain pointer-events-none"
                  src={bird.image}
                  alt=""
                  width={1000}
                  height={1000}
                  displayWidth={260}
                  draggable={false}
                />
              </div>
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}

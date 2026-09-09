'use client';

import { QuizQuestionTitle } from '@/components/quiz/question-title';
import { SpeciesName } from '@/components/species-name';
import Image from 'next/image';
import { ArrowLeftRight, Check, X } from 'lucide-react';
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
    <div className="q-comparison-task" data-answered={answered}>
      <div className="q-new-heading">
        <span className="q-task-label">
          <ArrowLeftRight size={17} /> Flügel im Vergleich
        </span>
        <QuizQuestionTitle>Wer hat die größere Spannweite?</QuizQuestionTitle>
        <p>Wähle den Vogel mit der größeren Spannweite.</p>
      </div>
      <fieldset
        className="q-comparison-options"
        aria-label="Vogel mit der größeren Spannweite wählen"
      >
        {question.birdIds.map((id) => {
          const bird = birds[id];
          const correct = id === question.correct;
          return (
            <button
              type="button"
              key={id}
              className="q-comparison-card"
              disabled={answered}
              aria-label={bird.name}
              aria-pressed={choice === id}
              data-selected={choice === id}
              data-correct={answered && correct}
              data-wrong={answered && choice === id && !correct}
              onClick={() => onChange(id)}
            >
              <span className="q-compare-radio" aria-hidden="true">
                {answered && correct && <Check size={17} />}
                {answered && choice === id && !correct && <X size={17} />}
              </span>
              <div className="q-comparison-name">
              <SpeciesName
                variant="quiz"
                name={bird.name}
                latin={bird.latin}
                commonAs="h3"
                scientificAs="i"
              />
                <div className="q-comparison-range" style={{ visibility: answered ? 'visible' : 'hidden' }}>
                  <strong>{bird.span[0]}–{bird.span[1]} cm</strong>
                </div>
              </div>
              <div className="q-comparison-art">
                <Image
                  src={bird.image}
                  alt=""
                  width={1000}
                  height={1000}
                  unoptimized
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

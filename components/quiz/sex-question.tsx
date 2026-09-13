'use client';

import { ArtImage } from '@/components/art-image';
import { ArrowsLeftRight } from '@/components/icons';
import { SpeciesName } from '@/components/species-name';
import { QuizChoices } from './choice-options';
import { QuizQuestionTitle } from './question-title';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import './sex-question.css';

export function SexQuestion({
  question,
  bird,
  choice,
  answered,
  onChange,
}: {
  question: Extract<QuizQuestion, { kind: 'sex' }>;
  bird: QuizBird;
  choice: string | null;
  answered: boolean;
  onChange: (choice: string) => void;
}) {
  return (
    <div className="q-split q-hunt-split">
      <div className="q-specimen q-hunt-specimen">
        <div className="q-specimen-label">
          <SpeciesName
            variant="quiz"
            name={bird.name}
            latin={bird.latin}
            commonAs="span"
            scientificAs="i"
          />
        </div>
        <div className="q-bird-space q-sex-pair">
          {question.images.map((image, index) => {
            const female =
              (question.correct === 'female-first') === (index === 0);
            return (
              <figure key={index} className="q-sex-bird">
                <ArtImage
                  className="q-flying-bird"
                  src={image}
                  alt={`Bild ${index + 1}: ${bird.name} im Flug`}
                  width={1000}
                  height={1000}
                  displayWidth={260}
                  draggable={false}
                />
                <figcaption className="q-art-note">
                  Bild {index + 1}
                  {answered && ` · ${female ? 'Weibchen' : 'Männchen'}`}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <div className="q-question-controls">
        <span className="q-task-label">
          <ArrowsLeftRight size={17} /> Geschlechter zuordnen
        </span>
        <QuizQuestionTitle>Weibchen oder Männchen?</QuizQuestionTitle>
        <p>Vergleiche die beiden Altvögel und ordne die Geschlechter zu.</p>
        <QuizChoices
          options={question.options}
          label={(option) =>
            option === 'female-first'
              ? 'Bild 1: Weibchen · Bild 2: Männchen'
              : 'Bild 1: Männchen · Bild 2: Weibchen'
          }
          choice={choice}
          correct={question.correct}
          answered={answered}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

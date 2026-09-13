'use client';

import { ArtImage } from '@/components/art-image';
import { ArrowsLeftRight } from '@/components/icons';
import { SpeciesName } from '@/components/species-name';
import { QuizChoices } from './choice-options';
import { QuizQuestionTitle } from './question-title';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import { QUIZ_FLIGHT_FRAME } from './bird-art';

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
    <div className="q-split grid min-h-[500px] q-hunt-split">
      <div className="q-specimen to-tablet:py-3 bg-stage flex relative flex-col overflow-hidden q-hunt-specimen">
        <div className="q-specimen-label flex flex-col items-start gap-0 relative z-1">
          <SpeciesName
            variant="quiz"
            name={bird.name}
            latin={bird.latin}
            commonAs="span"
            scientificAs="i"
          />
        </div>
        <div className="q-bird-space to-tablet:min-h-[180px] relative flex-1 grid place-items-center min-h-[280px] q-sex-pair grid-cols-2 gap-3">
          {question.images.map((image, index) => {
            const female =
              (question.correct === 'female-first') === (index === 0);
            return (
              <figure
                key={index}
                className="q-sex-bird min-w-0 w-full m-0 text-center"
              >
                <ArtImage
                  className={`${QUIZ_FLIGHT_FRAME} block mx-auto`}
                  src={image}
                  alt={`Bild ${index + 1}: ${bird.name} im Flug`}
                  width={1000}
                  height={1000}
                  displayWidth={260}
                  draggable={false}
                />
                <figcaption className="q-art-note mt-2 text-(length:--type-ui) text-muted-foreground text-center">
                  Bild {index + 1}
                  {answered && ` · ${female ? 'Weibchen' : 'Männchen'}`}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <div className="q-question-controls flex flex-col items-stretch">
        <span className="q-task-label to-tablet:mb-3 text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-4">
          <ArrowsLeftRight size={17} /> Geschlechter zuordnen
        </span>
        <QuizQuestionTitle>Weibchen oder Männchen?</QuizQuestionTitle>
        <p className="text-(--muted-foreground) leading-(--leading-relaxed)">
          Vergleiche die beiden Altvögel und ordne die Geschlechter zu.
        </p>
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

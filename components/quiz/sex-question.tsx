'use client';
import { useI18n } from '@/components/i18n';
import {
  QuizSplit,
  QuizSpecimen,
  QuizBirdSpace,
  QuizPrompt,
} from '@/components/quiz/question-layout';

import { ArtImage } from '@/components/art-image';
import { ArrowsLeftRight } from '@/components/icons';
import { SpeciesName } from '@/components/species-name';
import { QuizChoices } from './choice-options';
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
  const { t } = useI18n();
  return (
    <QuizSplit className="q-hunt-split">
      <QuizSpecimen className="q-hunt-specimen">
        <div className="q-specimen-label flex flex-col items-start gap-0 relative z-1">
          <SpeciesName
            variant="quiz"
            name={bird.name}
            latin={bird.latin}
            commonAs="span"
            scientificAs="i"
          />
        </div>
        <QuizBirdSpace className="q-sex-pair grid-cols-2 gap-3">
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
                  alt={t('Bild {index}: {name} im Flug', {
                    index: index + 1,
                    name: bird.name,
                  })}
                  width={1000}
                  height={1000}
                  displayWidth={260}
                  draggable={false}
                />
                <figcaption className="q-art-note mt-2 text-(length:--type-ui) text-muted-foreground text-center">
                  {t('Bild {index}', { index: index + 1 })}
                  {answered && ` · ${female ? t('Weibchen') : t('Männchen')}`}
                </figcaption>
              </figure>
            );
          })}
        </QuizBirdSpace>
      </QuizSpecimen>
      <QuizPrompt
        label={
          <>
            <ArrowsLeftRight size={17} /> {t('Geschlechter zuordnen')}
          </>
        }
        title={t('Weibchen oder Männchen?')}
        description={t(
          'Vergleiche die beiden Altvögel und ordne die Geschlechter zu.',
        )}
      >
        <QuizChoices
          options={question.options}
          label={(option) =>
            option === 'female-first'
              ? t('Bild 1: Weibchen · Bild 2: Männchen')
              : t('Bild 1: Männchen · Bild 2: Weibchen')
          }
          choice={choice}
          correct={question.correct}
          answered={answered}
          onChange={onChange}
        />
      </QuizPrompt>
    </QuizSplit>
  );
}

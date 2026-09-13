'use client';

import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import { Ear, Eye, Crosshair } from '@/components/icons';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import type {
  BirdMap,
  HuntingTypes,
  QuizDraft as Draft,
} from '@/lib/quiz-answer';
import { BirdArt, QUIZ_FLIGHT_FRAME } from './bird-art';
import { QuizQuestionTitle } from './question-title';
import { QuizCallInfo, QuizCallPlayer } from './call-player';
import { QuizChoices } from './choice-options';

export function MultipleChoiceQuestion({
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
    <div className="q-split grid min-h-[500px] q-hunt-split">
      <div
        className="q-specimen to-tablet:py-3 bg-stage flex relative flex-col overflow-hidden q-hunt-specimen"
        data-call={isCall}
      >
        <div className="q-specimen-label flex flex-col items-start gap-0 relative z-1">
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
        <div className="q-bird-space to-tablet:min-h-[180px] relative flex-1 grid place-items-center min-h-[280px]">
          {(!isCall || answered) && (
            <>
              <div
                className="q-orbit to-tablet:max-w-[175px] absolute w-[85%] max-w-[340px] aspect-square"
                aria-hidden="true"
              />
              <BirdArt
                bird={
                  isIdentify
                    ? { ...bird, image: question.appearance.image }
                    : bird
                }
                className={QUIZ_FLIGHT_FRAME}
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
      <div className="q-question-controls flex flex-col items-stretch">
        <span className="q-task-label to-tablet:mb-3 text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-4">
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
        <p className="text-(--muted-foreground) leading-(--leading-relaxed)">
          {isCall
            ? 'Höre dir die Aufnahme an und wähle die passende Art aus.'
            : isIdentify
              ? 'Wähle die passende Art aus.'
              : `Wähle die typische Jagdweise der Art ${bird.name}.`}
        </p>
        <QuizChoices
          options={question.options}
          label={(option) =>
            isIdentify || isCall
              ? birds[option].name
              : huntingTypes[option].label
          }
          choice={draft.choice}
          correct={question.correct}
          answered={answered}
          onChange={(choice) => onChange({ ...draft, choice })}
        />
      </div>
    </div>
  );
}

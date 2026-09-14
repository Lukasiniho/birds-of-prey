'use client';
import {
  QuizSplit,
  QuizOrbit,
  QuizSpecimen,
  QuizBirdSpace,
  QuizPrompt,
} from '@/components/quiz/question-layout';

import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import { Ear, Eye, Crosshair } from '@/components/icons';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import type {
  BirdMap,
  HuntingTypes,
  QuizDraft as Draft,
} from '@/lib/quiz-answer';
import { BirdArt, QUIZ_FLIGHT_FRAME } from './bird-art';
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
    <QuizSplit className="q-hunt-split">
      <QuizSpecimen className="q-hunt-specimen" data-call={isCall}>
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
        <QuizBirdSpace call={isCall}>
          {(!isCall || answered) && (
            <>
              <QuizOrbit />
              <BirdArt
                bird={bird}
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
        </QuizBirdSpace>
        {isCall && bird.recording && (
          <QuizCallInfo recording={bird.recording} />
        )}
      </QuizSpecimen>
      <QuizPrompt
        label={
          <>
            <Icon size={17} />{' '}
            {isCall
              ? 'Ruf erkennen'
              : isIdentify
                ? 'Art erkennen'
                : 'Jagdweisen erkennen'}
          </>
        }
        title={
          isCall ? (
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
          )
        }
        description={
          isCall
            ? 'Höre dir die Aufnahme an und wähle die passende Art aus.'
            : isIdentify
              ? 'Wähle die passende Art aus.'
              : `Wähle die typische Jagdweise der Art ${bird.name}.`
        }
      >
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
      </QuizPrompt>
    </QuizSplit>
  );
}

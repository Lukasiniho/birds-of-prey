'use client';
import { useI18n } from '@/components/i18n';
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
  const { t } = useI18n();
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
              {isCall ? t('Vogelruf') : t('Flugbild')}
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
                  showName
                    ? bird.name
                    : t('Greifvogel im Flug – bestimme die Art')
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
              ? t('Ruf erkennen')
              : isIdentify
                ? t('Art erkennen')
                : t('Jagdweisen erkennen')}
          </>
        }
        title={
          isCall ? (
            <>
              {t('Welcher Greifvogel')} <br />
              {t('ruft hier?')}
            </>
          ) : isIdentify ? (
            <>
              {t('Welcher Greifvogel')} <br />
              {t('ist das?')}
            </>
          ) : (
            <>
              {t('Wie kommt dieser')} <br />
              {t('Vogel an seine Beute?')}
            </>
          )
        }
        description={
          isCall
            ? t('Höre dir die Aufnahme an und wähle die passende Art aus.')
            : isIdentify
              ? t('Wähle die passende Art aus.')
              : t('Wähle die typische Jagdweise der Art {name}.', {
                  name: bird.name,
                })
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

'use client';

import { QuizQuestionTitle } from '@/components/quiz/question-title';
import { QuizChoices } from '@/components/quiz/choice-options';
import { SpeciesName, SpeciesCommonName } from '@/components/species-name';
import { GlobeHemisphereWest } from '@/components/icons';
import {
  MapDrawing,
  MapSourceInfo,
  useRangeMap,
} from '@/components/range-map-drawing';
import type { QuizBird, QuizQuestion } from '@/lib/quiz-engine';
import './new-questions.css';

export function RangeQuestion({
  question,
  bird,
  birds,
  choice,
  answered,
  onChange,
}: {
  question: Extract<QuizQuestion, { kind: 'range' }>;
  bird: QuizBird;
  birds: Record<string, QuizBird>;
  choice: string | null;
  answered: boolean;
  onChange: (choice: string) => void;
}) {
  const entry = bird.range;
  const data = useRangeMap(entry);
  return (
    <div className="q-split">
      <div className="q-specimen">
        <div className="q-specimen-label">
          {answered ? (
            <SpeciesName
              variant="quiz"
              name={bird.name}
              latin={bird.latin}
              commonAs="span"
              scientificAs="i"
            />
          ) : (
            <SpeciesCommonName variant="quiz">
              Verbreitungsgebiet
            </SpeciesCommonName>
          )}
        </div>
        <div className="q-range-space">
          {entry && data ? (
            <div className="range-map-surface q-range-map">
              <MapDrawing
                data={data}
                world
                label={entry.label}
                // The map is the puzzle: it stays anonymous until the answer is in.
                name={answered ? bird.name : 'gesuchte Art'}
              />
              <MapSourceInfo entry={entry} />
            </div>
          ) : (
            <p className="range-map-placeholder">Karte wird geladen …</p>
          )}
        </div>
      </div>
      <div className="q-question-controls">
        <span className="q-task-label">
          <GlobeHemisphereWest size={17} /> Verbreitung erkennen
        </span>
        <QuizQuestionTitle>
          Welcher Greifvogel <br />
          lebt hier?
        </QuizQuestionTitle>
        <p>
          Die Karte zeigt das Verbreitungsgebiet einer Art. Wähle aus, zu wem es
          gehört.
        </p>
        <QuizChoices
          options={question.options}
          label={(option) => birds[option].name}
          choice={choice}
          correct={question.correct}
          answered={answered}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

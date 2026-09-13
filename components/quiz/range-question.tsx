'use client';
import {
  QuizSplit,
  QuizSpecimen,
  QuizPrompt,
} from '@/components/quiz/question-layout';

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
    <QuizSplit>
      <QuizSpecimen>
        <div className="q-specimen-label flex flex-col items-start gap-0 relative z-1">
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
        <div className="q-range-space content-center to-tablet:min-h-0 to-tablet:mt-3 flex-1 grid min-h-[280px] mt-4">
          {entry && data ? (
            <div className="range-map-surface relative q-range-map">
              <MapDrawing
                framed="card"
                data={data}
                world
                label={entry.label}
                // The map is the puzzle: it stays anonymous until the answer is in.
                name={answered ? bird.name : 'gesuchte Art'}
              />
              <MapSourceInfo entry={entry} />
            </div>
          ) : (
            <p className="range-map-placeholder m-0 border-(length:--border-structure) rounded-(--radius-card) text-muted-foreground text-(length:--type-ui) min-h-[160px] flex flex-col items-center justify-center gap-[10px]">
              Karte wird geladen …
            </p>
          )}
        </div>
      </QuizSpecimen>
      <QuizPrompt
        label={
          <>
            <GlobeHemisphereWest size={17} /> Verbreitung erkennen
          </>
        }
        title={
          <>
            Welcher Greifvogel <br />
            lebt hier?
          </>
        }
        description="Die Karte zeigt das Verbreitungsgebiet einer Art. Wähle aus, zu wem es gehört."
      >
        <QuizChoices
          options={question.options}
          label={(option) => birds[option].name}
          choice={choice}
          correct={question.correct}
          answered={answered}
          onChange={onChange}
        />
      </QuizPrompt>
    </QuizSplit>
  );
}

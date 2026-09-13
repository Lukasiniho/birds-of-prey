'use client';

import { Check, X } from '@/components/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

/** The lettered answer list every single-choice quiz mode shares. */
export function QuizChoices({
  options,
  label,
  choice,
  correct,
  answered,
  onChange,
}: {
  options: string[];
  label: (option: string) => string;
  choice: string | null;
  correct: string;
  answered: boolean;
  onChange: (choice: string) => void;
}) {
  return (
    <RadioGroup
      className="q-options grid gap-3 q-answer-controls mt-auto pt-6 mb-0"
      value={choice ?? ''}
      onValueChange={(value) => onChange(String(value))}
      disabled={answered}
      aria-labelledby="q-question-title"
    >
      {options.map((option, index) => {
        const optionLabel = label(option);
        const isCorrect = answered && correct === option;
        const isWrong = answered && choice === option && !isCorrect;
        return (
          <label
            key={option}
            className="q-card q-option rounded-(--radius-control) relative min-h-[59px] flex gap-3 items-center py-3 px-4"
            data-selected={choice === option}
            data-correct={isCorrect}
            data-wrong={isWrong}
          >
            <span
              className="q-option-letter rounded-(--radius-small) bg-stage text-(length:--type-caption) text-muted-foreground grid place-items-center size-[26px]"
              aria-hidden="true"
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span>
              <strong className="text-(length:--type-ui) font-(--weight-medium)">
                {optionLabel}
              </strong>
            </span>
            {/* The verdict sits left of the radio: the radio stays
                pinned to the edge instead of shifting when it appears. */}
            {isCorrect && (
              <Check
                className="q-option-correct text-success"
                size={18}
                aria-label="Richtige Antwort"
              />
            )}
            {isWrong && (
              <X
                className="q-option-wrong text-danger"
                size={18}
                aria-label="Falsche Antwort"
              />
            )}
            <RadioGroupItem
              className="shrink-0"
              value={option}
              aria-label={optionLabel}
            />
          </label>
        );
      })}
    </RadioGroup>
  );
}

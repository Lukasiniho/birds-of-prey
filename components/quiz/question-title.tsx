import type { ReactNode } from 'react';

/** Shared task heading for every quiz mode; focus target for question navigation. */
export function QuizQuestionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      id="q-question-title"
      className="q-question-title m-0 font-(family-name:--font-stack-display) text-(length:--type-quiz-question) font-(--weight-bold) leading-(--leading-display) tracking-(--tracking-normal) text-foreground"
      tabIndex={-1}
    >
      {children}
    </h2>
  );
}

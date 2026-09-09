import type { ReactNode } from 'react';

/** Shared task heading for every quiz mode; focus target for question navigation. */
export function QuizQuestionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 id="q-question-title" className="q-question-title" tabIndex={-1}>
      {children}
    </h2>
  );
}

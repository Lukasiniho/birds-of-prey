import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Shared task heading for every quiz mode; focus target for question navigation. */
export function QuizQuestionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id="q-question-title"
      className={cn(
        'q-question-title m-0 font-(family-name:--font-stack-display) text-(length:--type-quiz-question) font-(--weight-bold) leading-(--leading-display) tracking-(--tracking-normal) text-foreground',
        className,
      )}
      tabIndex={-1}
    >
      {children}
    </h2>
  );
}

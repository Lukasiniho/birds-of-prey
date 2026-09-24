import type { ReactNode } from 'react';
import { QuizQuestionTitle } from './question-title';
import { cn } from '@/lib/utils';

/** One rhythm for every question, with optional reserved lines for estimates. */
export function QuizQuestionHeader({
  label,
  title,
  description,
  reserveLines = false,
}: {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  reserveLines?: boolean;
}) {
  return (
    <header className="grid gap-2 min-w-0">
      {/* Die Dachzeile gehört zum Titel: 4 px wie in jedem Flächenkopf. */}
      <div className="grid gap-1 min-w-0">
        <span className="q-task-label text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2">
          {label}
        </span>
        <QuizQuestionTitle
          className={cn(
            'to-tablet:[&_br]:hidden',
            reserveLines && 'from-tablet:min-h-[2lh]',
          )}
        >
          {title}
        </QuizQuestionTitle>
      </div>
      <p
        className={cn(
          'text-muted-foreground text-(length:--type-quiz-description) leading-(--leading-relaxed)',
          reserveLines && 'from-tablet:min-h-[2lh]',
        )}
      >
        {description}
      </p>
    </header>
  );
}

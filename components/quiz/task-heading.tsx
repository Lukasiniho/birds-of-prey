import type { ReactNode } from 'react';
import { QuizQuestionTitle } from './question-title';

/** Shared introduction for the sorting and habitat boards. */
export function QuizTaskHeading({
  className,
  label,
  children,
  description,
}: {
  className: string;
  label: ReactNode;
  children: ReactNode;
  description: ReactNode;
}) {
  return (
    <div
      className={`${className} flex items-end justify-between gap-6 mb-section`}
    >
      <div>
        <span className="q-task-label text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-[10px]">
          {label}
        </span>
        <QuizQuestionTitle>{children}</QuizQuestionTitle>
        <p className="text-muted-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-[10px] max-w-[62ch]">
          {description}
        </p>
      </div>
    </div>
  );
}

/** Choice boards share the same label, title and short instruction. */
export function QuizChoiceHeading({
  label,
  description,
  children,
}: {
  label: ReactNode;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="q-new-heading mb-section">
      <span className="q-task-label text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-3">
        {label}
      </span>
      <QuizQuestionTitle>{children}</QuizQuestionTitle>
      <p className="text-muted-foreground text-(length:--type-body) leading-(--leading-normal) mt-3 max-w-[70ch]">
        {description}
      </p>
    </div>
  );
}

/** Sorting controls and the revealed weight occupy the same card footer. */
export function QuizCardFooter({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${className} flex items-center justify-between border-t-(length:--border-structure) mt-2 pt-2 min-h-[42px] text-muted-foreground text-(length:--type-caption)`}
    >
      {children}
    </div>
  );
}

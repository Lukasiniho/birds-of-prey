import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { QuizQuestionTitle } from './question-title';

export function QuizOrbit() {
  return (
    <div
      className="q-orbit to-tablet:max-w-[175px] absolute w-[85%] max-w-[340px] aspect-square border-(length:--border-structure) rounded-[50%] opacity-90 before:content-[''] before:absolute before:inset-[15%] before:border-(length:--border-structure) before:border-dashed before:border-border before:rounded-[50%]"
      aria-hidden="true"
    />
  );
}

export function QuizSplit({
  as: Tag = 'div',
  className,
  ...props
}: ComponentProps<'div'> & { as?: 'div' | 'section' }) {
  return (
    <Tag
      {...props}
      className={cn(
        className,
        'q-split grid grid-cols-[1.02fr_1fr] min-h-[500px] from-tablet:min-h-[450px] to-tablet:grid-cols-1',
      )}
    />
  );
}

export function QuizSpecimen({
  start = false,
  className,
  ...props
}: ComponentProps<'div'> & { start?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'q-specimen bg-stage relative flex-col overflow-hidden',
        start
          ? 'q-start-stage grid place-items-center p-10 to-tablet:p-panel'
          : 'flex p-panel',
      )}
    />
  );
}

export function QuizBirdSpace({
  call = false,
  className,
  ...props
}: ComponentProps<'div'> & { call?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'q-bird-space relative flex-1 min-h-[280px]',
        call
          ? 'flex flex-col justify-center items-center to-tablet:min-h-[180px]'
          : 'grid place-items-center to-tablet:min-h-0',
      )}
    />
  );
}

/** The introduction and answer controls have one layout across recognition tasks. */
export function QuizPrompt({
  label,
  title,
  description,
  reserveLines = false,
  children,
}: {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  reserveLines?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="q-question-controls flex flex-col items-stretch p-panel">
      <span className="q-task-label to-tablet:mb-3 text-(length:--type-ui) font-(--weight-medium) text-(--main-color) flex items-center gap-2 mb-4">
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
      <p
        className={cn(
          'text-muted-foreground text-(length:--type-body) leading-(--leading-relaxed) mt-4 max-w-[45ch] to-tablet:mt-3 to-tablet:max-w-none',
          reserveLines && 'from-tablet:min-h-[2lh]',
        )}
      >
        {description}
      </p>
      {children}
    </div>
  );
}

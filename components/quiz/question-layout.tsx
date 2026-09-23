import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { QuizQuestionHeader } from './question-header';
import { Surface, SurfaceBody } from '@/components/surface';

export function QuizOrbit() {
  return (
    <div
      className="q-orbit to-tablet:max-w-[175px] absolute w-[85%] max-w-[340px] aspect-square border-(length:--border-structure) rounded-[50%] opacity-90 before:content-[''] before:absolute before:inset-[15%] before:border-(length:--border-structure) before:border-dashed before:border-border before:rounded-[50%]"
      aria-hidden="true"
    />
  );
}

export function QuizSplit({
  as = 'div',
  surface = false,
  className,
  ...props
}: ComponentProps<'div'> & { as?: 'div' | 'section'; surface?: boolean }) {
  const layout = cn(
    className,
    'q-split grid grid-cols-[1.02fr_1fr] min-h-[500px] from-tablet:min-h-[450px] to-tablet:grid-cols-1',
  );
  const Tag = as;
  return surface ? (
    <Surface {...props} as={as} padding="none" className={layout} />
  ) : (
    <Tag {...props} className={layout} />
  );
}

export function QuizSpecimen({
  start = false,
  className,
  ...props
}: ComponentProps<'div'> & { start?: boolean }) {
  return (
    <SurfaceBody
      {...props}
      padding={start ? 'hero' : 'panel'}
      className={cn(
        className,
        'q-specimen bg-stage relative flex-col overflow-hidden',
        start ? 'q-start-stage grid place-items-center' : 'flex',
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
    <SurfaceBody
      padding="panel"
      className="q-question-controls flex flex-col items-stretch"
    >
      <QuizQuestionHeader
        label={label}
        title={title}
        description={description}
        reserveLines={reserveLines}
      />
      {children}
    </SurfaceBody>
  );
}

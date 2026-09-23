import type { ReactNode } from 'react';
import { QuizQuestionHeader } from './question-header';
import { SurfaceFooter } from '@/components/surface';

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
    <div className={`${className} mb-section`}>
      <QuizQuestionHeader
        label={label}
        title={children}
        description={description}
      />
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
      <QuizQuestionHeader
        label={label}
        title={children}
        description={description}
      />
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
    <SurfaceFooter
      className={`${className} justify-between mt-2 min-h-[42px] text-muted-foreground text-(length:--type-caption)`}
    >
      {children}
    </SurfaceFooter>
  );
}

import type { ComponentProps } from 'react';

/** Keeps the action anchored while the feedback row grows above it on phones. */
export function QuizAnswerBar({
  open,
  children,
  ...props
}: ComponentProps<'div'> & { open: boolean }) {
  return (
    <div
      {...props}
      className="q-answer-bar inset-x-0 bottom-0 fixed z-40 w-full bg-surface border-t-(length:--border-structure) shadow-(--shadow-floating)"
    >
      <div
        className="q-answer-content t-resize w-full max-w-(--site-max-width) mx-auto grid grid-cols-[max-content_minmax(0,1fr)_224px] [grid-template-areas:'exit_feedback_action'] grid-rows-1 items-center gap-6 pt-3 px-4 pb-[calc(var(--space-12)+env(safe-area-inset-bottom))] to-tablet:grid-cols-[minmax(0,1fr)] to-tablet:[grid-template-areas:'feedback'_'action'] to-tablet:grid-rows-[minmax(0,1fr)_3rem] to-tablet:gap-x-3 to-tablet:gap-y-0 to-tablet:data-[open=true]:pt-0"
        data-open={open}
      >
        {children}
      </div>
    </div>
  );
}

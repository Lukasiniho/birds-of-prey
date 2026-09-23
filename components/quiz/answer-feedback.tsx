'use client';
import { cn } from '@/lib/utils';

import { useLayoutEffect, useRef } from 'react';
import { Check, X } from '@/components/icons';
import './answer-feedback.css';

type QuizFeedbackProps = {
  points: number;
  text: string;
};

export function QuizFeedback({ points, text }: QuizFeedbackProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    // Record the closed style before opening the newly mounted feedback.
    // Each question mounts afresh, so the entrance also replays on review.
    void panel.offsetHeight;
    const frame = requestAnimationFrame(() => {
      panel.dataset.open = 'true';
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const perfect = points === 100;
  const Icon = perfect ? Check : X;
  const title = perfect
    ? 'Volltreffer!'
    : points >= 60
      ? 'Fast richtig.'
      : 'Noch nicht ganz.';

  return (
    <div
      ref={panelRef}
      className="q-feedback [--feedback-icon-size:2.25rem] grid-cols-[var(--feedback-icon-size)_minmax(0,1fr)_auto] [grid-area:feedback] self-center min-h-0 max-h-full overflow-hidden flex-1 min-w-0 grid items-center gap-3 t-panel-slide"
      data-open="false"
      data-perfect={perfect}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className={cn(
          'q-feedback-icon rounded-[50%] grid place-items-center size-(--feedback-icon-size)',
          perfect
            ? 'text-success bg-success-soft'
            : 'text-danger bg-danger-soft',
        )}
        aria-hidden="true"
      >
        <Icon size={24} className="block" />
      </span>
      <div className="q-feedback-copy min-w-0">
        <p className="q-feedback-title text-(length:--type-feedback-title) font-(--weight-bold) leading-(--leading-compact) text-foreground">
          {title}
        </p>
        <p
          className="q-feedback-detail mt-1 text-(length:--type-ui) text-foreground font-(--weight-regular) leading-(--leading-compact)"
          title={text}
        >
          {text}
        </p>
      </div>
      <span className="q-points-earned text-(length:--type-metric) tabular-nums text-success font-(--weight-semibold) leading-(--leading-display) whitespace-nowrap text-right">
        +{points}
        <small className="text-(length:--type-ui) text-inherit block mt-0 font-(--weight-regular) leading-(--leading-display)">
          Punkte
        </small>
      </span>
    </div>
  );
}

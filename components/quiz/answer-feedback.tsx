'use client';

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
      className="q-feedback t-panel-slide"
      data-open="false"
      data-perfect={perfect}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="q-feedback-icon" aria-hidden="true">
        <Icon size={24} />
      </span>
      <div className="q-feedback-copy">
        <p className="q-feedback-title">{title}</p>
        <p className="q-feedback-detail" title={text}>
          {text}
        </p>
      </div>
      <span className="q-points-earned">
        +{points}
        <small>Punkte</small>
      </span>
    </div>
  );
}

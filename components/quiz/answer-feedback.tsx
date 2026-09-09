import type { ReactNode } from 'react';
import { Check, X } from '@/components/icons';
import './answer-feedback.css';

type QuizFeedbackProps = {
  points: number;
  children: ReactNode;
};

export function QuizFeedback({ points, children }: QuizFeedbackProps) {
  const perfect = points === 100;
  const Icon = perfect ? Check : X;
  const title = perfect
    ? 'Volltreffer!'
    : points >= 60
      ? 'Fast richtig.'
      : 'Noch nicht ganz.';

  return (
    <div
      className="q-feedback"
      data-perfect={perfect}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="q-feedback-icon" aria-hidden="true">
        <Icon size={24} />
      </span>
      <div className="q-feedback-copy">
        <p className="q-feedback-title">{title}</p>
        <div className="q-feedback-detail">{children}</div>
      </div>
      <span className="q-points-earned">
        +{points}
        <small>Punkte</small>
      </span>
    </div>
  );
}

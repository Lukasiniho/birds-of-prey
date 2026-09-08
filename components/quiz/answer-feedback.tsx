import type { ReactNode } from 'react';
import { Check, Lightbulb } from 'lucide-react';
import './answer-feedback.css';

type QuizFeedbackProps = {
  points: number;
  children: ReactNode;
};

export function QuizFeedback({ points, children }: QuizFeedbackProps) {
  const perfect = points === 100;
  const Icon = perfect ? Check : Lightbulb;
  const title = perfect
    ? 'Volltreffer. Gut beobachtet!'
    : points >= 60
      ? 'Schon ziemlich nah dran!'
      : 'Wieder etwas gelernt.';

  return (
    <div
      className="q-feedback"
      data-perfect={perfect}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="q-feedback-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.75} />
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

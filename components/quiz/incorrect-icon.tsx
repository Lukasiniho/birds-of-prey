import type { ComponentProps } from 'react';
import { X } from '@/components/icons';

/** A verdict, never a dismissal action. Keep it separate from CloseControl. */
export function QuizIncorrectIcon(props: ComponentProps<typeof X>) {
  return <X aria-label="Falsche Antwort" {...props} />;
}

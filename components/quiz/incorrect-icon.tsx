import type { ComponentProps } from 'react';
import { useI18n } from '@/components/i18n';
import { X } from '@/components/icons';

/** A verdict, never a dismissal action. Keep it separate from CloseControl. */
export function QuizIncorrectIcon(props: ComponentProps<typeof X>) {
  const { t } = useI18n();
  return <X aria-label={t('Falsche Antwort')} {...props} />;
}

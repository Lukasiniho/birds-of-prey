import type { QuizBird } from '@/lib/quiz-engine';
import { localeTags, type Locale } from '@/lib/i18n';

export const formatSpan = (bird: QuizBird) =>
  `${bird.span[0]}–${bird.span[1]} cm`;
export function formatWeight(bird: QuizBird, locale: Locale = 'de') {
  const weightNumber = new Intl.NumberFormat(localeTags[locale], {
    maximumFractionDigits: 3,
  });
  const divisor = bird.weight[0] >= 1000 ? 1000 : 1;
  return `${weightNumber.format(bird.weight[0] / divisor)}–${weightNumber.format(bird.weight[1] / divisor)} ${divisor === 1000 ? 'kg' : 'g'}`;
}

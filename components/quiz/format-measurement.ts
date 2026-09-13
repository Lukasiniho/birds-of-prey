import type { QuizBird } from '@/lib/quiz-engine';

const weightNumber = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 3,
});
export const formatSpan = (bird: QuizBird) =>
  `${bird.span[0]}–${bird.span[1]} cm`;
export function formatWeight(bird: QuizBird) {
  const divisor = bird.weight[0] >= 1000 ? 1000 : 1;
  return `${weightNumber.format(bird.weight[0] / divisor)}–${weightNumber.format(bird.weight[1] / divisor)} ${divisor === 1000 ? 'kg' : 'g'}`;
}

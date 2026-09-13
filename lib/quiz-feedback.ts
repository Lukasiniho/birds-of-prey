import {
  weightOrder,
  type QuizBird,
  type QuizQuestion,
} from './quiz-engine.ts';

const number = new Intl.NumberFormat('de-DE');
const span = (bird: QuizBird) => `${bird.span[0]}–${bird.span[1]} cm`;

/** Footer copy contains only the result, never an appearance description. */
export function quizFeedbackText(
  question: QuizQuestion,
  answer: { points: number; food: string[] },
  birds: Record<string, QuizBird>,
  huntingTypes: Record<string, { label: string }>,
): string {
  switch (question.kind) {
    case 'span':
      return `Spannweite: ${span(birds[question.birdId])}.`;
    case 'weight-estimate': {
      const bird = birds[question.birdId];
      return `Gewicht: ${number.format(bird.weight[0])}–${number.format(bird.weight[1])} g.`;
    }
    case 'hunt':
      return `Richtig: ${huntingTypes[question.correct].label}.`;
    case 'identify':
    case 'range':
      return `Richtig: ${birds[question.birdId].name}.`;
    case 'sex':
      return question.correct === 'female-first'
        ? 'Bild 1: Weibchen; Bild 2: Männchen.'
        : 'Bild 1: Männchen; Bild 2: Weibchen.';
    case 'call':
      return `Ruf: ${birds[question.birdId].name}.`;
    case 'habitat':
      return `${answer.points / 25} von 4 Vögeln passend zugeordnet.`;
    case 'prey': {
      const correct = answer.food.filter((id) =>
        question.correct.includes(id),
      ).length;
      const wrong = answer.food.length - correct;
      return `${correct} von ${question.correct.length} Beutetieren richtig${wrong ? `, ${wrong} unpassend` : ''}.`;
    }
    case 'compare':
      return `${birds[question.correct].name}: ${span(birds[question.correct])}.`;
    case 'weight':
      return `Am leichtesten: ${birds[weightOrder(question.birdIds, birds)[0]].name}.`;
  }
}

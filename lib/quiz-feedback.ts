import {
  weightOrder,
  type QuizBird,
  type QuizQuestion,
} from './quiz-engine.ts';
import { landscapes } from './habitats.ts';
import type { QuizAnswer } from './quiz-answer.ts';

const number = new Intl.NumberFormat('de-DE');
const span = (bird: QuizBird) => `${bird.span[0]}–${bird.span[1]} cm`;

/** Only offer habitats that are available on this question's board. */
export function quizHabitatCorrections(
  question: Extract<QuizQuestion, { kind: 'habitat' }>,
  placements: Record<string, string>,
  birds: Record<string, QuizBird>,
) {
  return question.birdIds
    .filter((id) => !birds[id].habitats.includes(placements[id]))
    .map((id) => ({
      birdId: id,
      habitats: question.habitatIds
        .filter((habitat) => birds[id].habitats.includes(habitat))
        .map((habitat) => landscapes[habitat].label),
    }));
}

/** Footer copy contains only the result, never an appearance description. */
export function quizFeedbackText(
  question: QuizQuestion,
  answer: Pick<QuizAnswer, 'points' | 'food' | 'placements'>,
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
    case 'habitat': {
      const corrections = quizHabitatCorrections(
        question,
        answer.placements,
        birds,
      );
      if (!corrections.length)
        return `${question.birdIds.length} von ${question.birdIds.length} Vögeln passend zugeordnet.`;
      const results = corrections.map(
        ({ birdId, habitats }) => `${birds[birdId].name}: ${habitats[0]}`,
      );
      // Keep whole corrections; the cards show every wrong bird's solution.
      for (let count = results.length; count > 0; count--) {
        const remaining = results.length - count;
        const text = `${results.slice(0, count).join('; ')}${remaining ? `; +${remaining} weitere` : ''}.`;
        if (text.length <= 80) return text;
      }
      return 'Die passenden Lebensräume stehen bei den falsch zugeordneten Vögeln.';
    }
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

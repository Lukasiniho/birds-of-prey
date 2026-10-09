import {
  weightOrder,
  type QuizBird,
  type QuizQuestion,
} from './quiz-engine.ts';
import { landscapes } from './habitats.ts';
import type { QuizAnswer } from './quiz-answer.ts';
import {
  localeTags,
  translator,
  type Locale,
  type Translate,
} from './i18n.ts';

const span = (bird: QuizBird) => `${bird.span[0]}–${bird.span[1]} cm`;

/** Only offer habitats that are available on this question's board. */
export function quizHabitatCorrections(
  question: Extract<QuizQuestion, { kind: 'habitat' }>,
  placements: Record<string, string>,
  birds: Record<string, QuizBird>,
  t: Translate = translator(null),
) {
  return question.birdIds
    .filter((id) => !birds[id].habitats.includes(placements[id]))
    .map((id) => ({
      birdId: id,
      habitats: question.habitatIds
        .filter((habitat) => birds[id].habitats.includes(habitat))
        .map((habitat) => t(landscapes[habitat].label)),
    }));
}

/** Footer copy contains only the result, never an appearance description. */
export function quizFeedbackText(
  question: QuizQuestion,
  answer: Pick<QuizAnswer, 'points' | 'food' | 'placements'>,
  birds: Record<string, QuizBird>,
  huntingTypes: Record<string, { label: string }>,
  t: Translate = translator(null),
  locale: Locale = 'de',
): string {
  const number = new Intl.NumberFormat(localeTags[locale]);
  switch (question.kind) {
    case 'span':
      return t('Spannweite: {span}.', { span: span(birds[question.birdId]) });
    case 'weight-estimate': {
      const bird = birds[question.birdId];
      return t('Gewicht: {min}–{max} g.', {
        min: number.format(bird.weight[0]),
        max: number.format(bird.weight[1]),
      });
    }
    case 'hunt':
      return t('Richtig: {answer}.', {
        answer: huntingTypes[question.correct].label,
      });
    case 'identify':
    case 'range':
      return t('Richtig: {answer}.', { answer: birds[question.birdId].name });
    case 'sex':
      return question.correct === 'female-first'
        ? t('Bild 1: Weibchen; Bild 2: Männchen.')
        : t('Bild 1: Männchen; Bild 2: Weibchen.');
    case 'call':
      return t('Ruf: {name}.', { name: birds[question.birdId].name });
    case 'habitat': {
      const corrections = quizHabitatCorrections(
        question,
        answer.placements,
        birds,
        t,
      );
      if (!corrections.length)
        return t('{count} von {total} Vögeln passend zugeordnet.', {
          count: question.birdIds.length,
          total: question.birdIds.length,
        });
      const results = corrections.map(
        ({ birdId, habitats }) => `${birds[birdId].name}: ${habitats[0]}`,
      );
      // Keep whole corrections; the cards show every wrong bird's solution.
      for (let count = results.length; count > 0; count--) {
        const remaining = results.length - count;
        const text = `${results.slice(0, count).join('; ')}${remaining ? t('; +{count} weitere', { count: remaining }) : ''}.`;
        if (text.length <= 80) return text;
      }
      return t(
        'Die passenden Lebensräume stehen bei den falsch zugeordneten Vögeln.',
      );
    }
    case 'prey': {
      const correct = answer.food.filter((id) =>
        question.correct.includes(id),
      ).length;
      const wrong = answer.food.length - correct;
      return wrong
        ? t('{count} von {total} Beutetieren richtig, {wrong} unpassend.', {
            count: correct,
            total: question.correct.length,
            wrong,
          })
        : t('{count} von {total} Beutetieren richtig.', {
            count: correct,
            total: question.correct.length,
          });
    }
    case 'compare':
      return `${birds[question.correct].name}: ${span(birds[question.correct])}.`;
    case 'weight':
      return t('Am leichtesten: {name}.', {
        name: birds[weightOrder(question.birdIds, birds)[0]].name,
      });
  }
}

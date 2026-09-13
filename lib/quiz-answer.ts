import {
  scoreHabitats,
  scoreOrder,
  scorePrey,
  scoreSpan,
  scoreWeight,
  weightEstimateScale,
  weightOrder,
  type QuizBird,
  type QuizQuestion,
} from './quiz-engine.ts';

export type BirdMap = Record<string, QuizBird>;
export type HuntingTypes = Record<string, { label: string; text: string }>;
export type QuizDraft = {
  span: number;
  weight: number;
  choice: string | null;
  order: string[];
  placements: Record<string, string>;
  food: string[];
};
export type QuizAnswer = QuizDraft & { points: number };

export function initialDraft(
  question: QuizQuestion,
  birds: BirdMap,
): QuizDraft {
  return {
    span: 150,
    weight:
      question.kind === 'weight-estimate'
        ? weightEstimateScale(birds[question.birdId]).initial
        : 500,
    choice: null,
    order: question.kind === 'weight' ? [...question.birdIds] : [],
    placements: {},
    food: [],
  };
}

export function canSubmitAnswer(
  question: QuizQuestion,
  draft: QuizDraft,
): boolean {
  switch (question.kind) {
    case 'hunt':
    case 'compare':
    case 'identify':
    case 'sex':
    case 'call':
    case 'range':
      return Boolean(draft.choice);
    case 'prey':
      return draft.food.length > 0;
    case 'habitat':
      return question.birdIds.every((id) => Boolean(draft.placements[id]));
    case 'span':
    case 'weight-estimate':
    case 'weight':
      return true;
  }
}

export function scoreAnswer(
  question: QuizQuestion,
  draft: QuizDraft,
  birds: BirdMap,
): number {
  switch (question.kind) {
    case 'span':
      return scoreSpan(draft.span, birds[question.birdId].span);
    case 'weight-estimate':
      return scoreWeight(draft.weight, birds[question.birdId].weight);
    case 'hunt':
    case 'compare':
    case 'identify':
    case 'sex':
    case 'call':
    case 'range':
      return draft.choice === question.correct ? 100 : 0;
    case 'prey':
      return scorePrey(draft.food, question.correct, question.options);
    case 'weight':
      return scoreOrder(draft.order, weightOrder(question.birdIds, birds));
    case 'habitat':
      return scoreHabitats(question.birdIds, draft.placements, birds);
  }
}

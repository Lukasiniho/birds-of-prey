import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuizBirds } from '../lib/quiz-data.ts';
import { huntingTypes } from '../lib/ecology.ts';
import { habitatImages } from '../lib/habitat-images.ts';
import { createQuizRound, quizKinds, weightOrder } from '../lib/quiz-engine.ts';
import {
  canSubmitAnswer,
  initialDraft,
  scoreAnswer,
} from '../lib/quiz-answer.ts';

const birds = buildQuizBirds();
const questions = createQuizRound(
  birds,
  Object.keys(huntingTypes),
  Object.keys(habitatImages),
  { seed: 42, count: 16 },
);

void test('a complete round accepts and awards full credit for every task kind', () => {
  assert.deepEqual(
    new Set(questions.map((question) => question.kind)),
    new Set(quizKinds),
  );
  for (const question of questions) {
    const draft = initialDraft(question, birds);
    if ('options' in question && question.kind !== 'prey') {
      assert.equal(canSubmitAnswer(question, draft), false, question.kind);
      draft.choice = question.correct;
    } else if (question.kind === 'compare') {
      assert.equal(canSubmitAnswer(question, draft), false);
      draft.choice = question.correct;
    } else if (question.kind === 'prey') {
      assert.equal(canSubmitAnswer(question, draft), false);
      draft.food = [...question.correct];
    } else if (question.kind === 'habitat') {
      assert.equal(canSubmitAnswer(question, draft), false);
      for (const id of question.birdIds) {
        draft.placements[id] = question.habitatIds.find((habitat) =>
          birds[id].habitats.includes(habitat),
        )!;
      }
    } else if (question.kind === 'weight') {
      assert.equal(canSubmitAnswer(question, draft), true);
      assert.notEqual(draft.order, question.birdIds);
      draft.order = weightOrder(question.birdIds, birds);
    } else {
      assert.equal(canSubmitAnswer(question, draft), true);
      const bird = birds[question.birdId];
      draft.span = bird.span[0];
      draft.weight = bird.weight[0];
    }
    const before = structuredClone(draft);
    assert.equal(canSubmitAnswer(question, draft), true, question.kind);
    assert.equal(scoreAnswer(question, draft, birds), 100, question.kind);
    assert.deepEqual(draft, before, 'grading must not modify the answer');
  }
});

void test('wrong choices earn no points across all choice-based tasks', () => {
  for (const question of questions) {
    if (!('correct' in question) || Array.isArray(question.correct)) continue;
    const draft = { ...initialDraft(question, birds), choice: 'wrong-answer' };
    assert.equal(scoreAnswer(question, draft, birds), 0, question.kind);
  }
});

void test('habitat submission waits for every bird while grading retains partial credit', () => {
  const question = questions.find((question) => question.kind === 'habitat')!;
  const draft = initialDraft(question, birds);
  const [first, ...rest] = question.birdIds;
  draft.placements[first] = birds[first].habitats[0];
  assert.equal(canSubmitAnswer(question, draft), false);
  assert.equal(scoreAnswer(question, draft, birds), 25);
  for (const id of rest) draft.placements[id] = 'wrong-habitat';
  assert.equal(canSubmitAnswer(question, draft), true);
  assert.equal(scoreAnswer(question, draft, birds), 25);
});

void test('fresh drafts never reuse answers or mutable collections', () => {
  const question = questions[0];
  const first = initialDraft(question, birds);
  first.choice = 'previous-choice';
  first.food.push('previous-prey');
  first.placements.bird = 'previous-habitat';
  const fresh = initialDraft(question, birds);
  assert.equal(fresh.choice, null);
  assert.deepEqual(fresh.food, []);
  assert.deepEqual(fresh.placements, {});
  assert.notEqual(fresh.order, first.order);
});

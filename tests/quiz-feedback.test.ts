import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildQuizBirds } from '../lib/quiz-data.ts';
import { huntingTypes } from '../lib/ecology.ts';
import { habitatImages } from '../lib/habitat-images.ts';
import { createQuizRound, quizKinds } from '../lib/quiz-engine.ts';
import { quizFeedbackText } from '../lib/quiz-feedback.ts';

const birds = buildQuizBirds();
const answer = { points: 100, food: [] as string[] };

void test('every species and appearance has a short identification result without descriptive paragraphs', () => {
  for (const bird of Object.values(birds)) {
    for (const appearance of bird.identificationImages) {
      const text = quizFeedbackText(
        {
          id: `identify-${bird.id}`,
          kind: 'identify',
          birdId: bird.id,
          correct: bird.id,
          options: [bird.id],
          appearance,
        },
        answer,
        birds,
        huntingTypes,
      );
      assert.equal(text, `Richtig: ${bird.name}.`);
      assert(text.length <= 80, text);
      assert(!/[\r\n]/.test(text), text);
    }
  }
});

void test('Bartgeier feedback never includes the long rust-orange plumage explanation', () => {
  const bird = birds.bartgeier;
  const text = quizFeedbackText(
    {
      id: 'bartgeier-regression',
      kind: 'identify',
      birdId: bird.id,
      correct: bird.id,
      options: [bird.id],
      appearance: {
        image: bird.image,
        label: 'Gefiederfärbung: Rostorange',
        note: 'Kopf, Hals und Unterseite sind durch äußere Eisenoxideinlagerungen rostorange gefärbt. Flügel und Schwanz bleiben dunkel.',
      },
    },
    answer,
    birds,
    huntingTypes,
  );
  assert.equal(text, 'Richtig: Bartgeier.');
});

void test('all question types keep feedback within 80 characters, including wrong and mixed answers', () => {
  const seen = new Set<string>();
  for (let seed = 0; seed < 128; seed++) {
    const questions = createQuizRound(
      birds,
      Object.keys(huntingTypes),
      Object.keys(habitatImages),
      { seed, count: 16 },
    );
    for (const question of questions) {
      seen.add(question.kind);
      for (const points of [0, 50, 100]) {
        const food = question.kind === 'prey' ? question.options : [];
        const text = quizFeedbackText(
          question,
          { points, food },
          birds,
          huntingTypes,
        );
        assert(
          text.length > 0 && text.length <= 80,
          `${question.kind}: ${text}`,
        );
        assert(!/[\r\n]/.test(text), `${question.kind}: ${text}`);
      }
    }
  }
  assert.deepEqual([...seen].sort(), [...quizKinds].sort());
});

void test('shared feedback style enforces a single line even when the viewport is narrow', () => {
  const css = readFileSync(
    new URL('../components/quiz/answer-feedback.css', import.meta.url),
    'utf8',
  );
  const detail = css.match(/\.q-feedback-detail\s*\{([^}]+)\}/)?.[1] ?? '';
  assert.match(detail, /white-space:\s*nowrap\s*;/);
  assert.match(detail, /overflow:\s*hidden\s*;/);
  assert.match(detail, /text-overflow:\s*ellipsis\s*;/);
});

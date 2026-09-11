import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { preyCatalog } from '../lib/diets.ts';
import { preyFraming } from '../lib/prey-framing.ts';
import { buildQuizBirds } from '../lib/quiz-data.ts';
import { speciesById, huntingTypes, preyCategoryById } from '../lib/ecology.ts';
import { habitatImages } from '../lib/habitat-images.ts';
import {
  createQuizRound,
  PREY_OPTION_COUNT,
  quizKinds,
  scorePrey,
  moveBird,
  parseMeasurementRange,
  quizHistory,
  quizQuestionKey,
  scoreHabitats,
  scoreOrder,
  scoreSpan,
  scoreWeight,
  weightEstimateScale,
  weightOrder,
} from '../lib/quiz-engine.ts';

const quizBirds = buildQuizBirds();
const roundFor = (seed: number, previous?: ReturnType<typeof quizHistory>) =>
  createQuizRound(quizBirds, Object.keys(huntingTypes), availableHabitats, {
    seed,
    previous,
    count: 12,
  });
const availableHabitats = Object.keys(habitatImages);

void test('German ranges retain decimals and distinguish thousands separators', () => {
  assert.deepEqual(parseMeasurementRange('ca. 3.000–6.600'), [3000, 6600]);
  assert.deepEqual(parseMeasurementRange('ca. 1,1–2,1'), [1.1, 2.1]);
  assert.throws(() => parseMeasurementRange('unknown'));
});

void test('every value in the natural wingspan range earns full points; distant guesses do not', () => {
  for (const guess of [195, 210, 230])
    assert.equal(scoreSpan(guess, [195, 230]), 100);
  assert(scoreSpan(190, [195, 230]) < 100);
  assert(scoreSpan(190, [195, 230]) > scoreSpan(150, [195, 230]));
  assert.equal(scoreSpan(350, [70, 80]), 0);
  assert.equal(scoreSpan(Number.NaN, [195, 230]), 0);
});

void test('sort grading awards partial credit per pair and rejects duplicated or missing cards', () => {
  const correct = ['turmfalke', 'wanderfalke', 'steinadler', 'andenkondor'];
  assert.equal(scoreOrder(correct, correct), 100);
  assert.equal(scoreOrder([...correct].reverse(), correct), 0);
  assert.equal(
    scoreOrder(
      ['wanderfalke', 'turmfalke', 'steinadler', 'andenkondor'],
      correct,
    ),
    83,
  );
  assert.equal(
    scoreOrder(
      ['turmfalke', 'turmfalke', 'steinadler', 'andenkondor'],
      correct,
    ),
    0,
  );
  assert.equal(scoreOrder(correct.slice(1), correct), 0);
});

void test('moving a card preserves every bird and ignores out-of-bounds keyboard moves', () => {
  const order = ['a', 'b', 'c', 'd'];
  assert.deepEqual(moveBird(order, 'a', 3), ['b', 'c', 'd', 'a']);
  assert.deepEqual(moveBird(order, 'd', 0), ['d', 'a', 'b', 'c']);
  assert.deepEqual(moveBird(order, 'a', -1), order);
  assert.deepEqual(moveBird(order, 'd', 4), order);
  assert.deepEqual(order, ['a', 'b', 'c', 'd']);
});

void test('habitat grading accepts alternative valid destinations and gives partial credit', () => {
  const ids = ['andenkondor', 'rotschwanzbussard', 'wanderfalke', 'baumfalke'];
  assert.equal(
    scoreHabitats(
      ids,
      {
        andenkondor: 'gebirge',
        rotschwanzbussard: 'wald',
        wanderfalke: 'kueste',
        baumfalke: 'feldflur',
      },
      quizBirds,
    ),
    100,
  );
  assert.equal(
    scoreHabitats(
      ids,
      {
        andenkondor: 'kueste',
        rotschwanzbussard: 'feldflur',
        wanderfalke: 'kueste',
        baumfalke: 'wald',
      },
      quizBirds,
    ),
    100,
  );
  assert.equal(
    scoreHabitats(
      ids,
      {
        andenkondor: 'wald',
        rotschwanzbussard: 'feldflur',
        wanderfalke: 'kueste',
        baumfalke: 'wald',
      },
      quizBirds,
    ),
    75,
  );
  assert.equal(scoreHabitats(ids, {}, quizBirds), 0);
});

void test('twelve-question rounds contain answerable tasks across all nine kinds', () => {
  for (let seed = 0; seed < 300; seed++) {
    const round = roundFor(seed);
    assert.equal(round.length, 12);
    assert.equal(new Set(round.map((q) => q.id)).size, 12);
    assert.equal(new Set(round.map(quizQuestionKey)).size, 12);
    for (const question of round)
      if ('birdIds' in question)
        assert.equal(
          new Set(question.birdIds).size,
          4,
        );
    for (const kind of quizKinds) {
      const count = round.filter((q) => q.kind === kind).length;
      assert(count >= 1 && count <= 2);
    }
    for (const question of round) {
      if ('birdId' in question) assert(quizBirds[question.birdId]);
      if (question.kind === 'identify') {
        assert.equal(question.options.length, 4);
        assert.equal(new Set(question.options).size, 4);
        assert.equal(
          new Set(question.options.map((id) => quizBirds[id].name)).size,
          4,
        );
        assert.equal(question.correct, question.birdId);
        assert.equal(
          question.options.filter((id) => id === question.correct).length,
          1,
        );
        assert(quizBirds[question.birdId].identification);
        for (const other of round.filter((item) => item !== question)) {
          const namedBirds = 'birdId' in other ? [other.birdId] : other.birdIds;
          assert(
            !namedBirds.includes(question.birdId),
            'Other questions must not reveal the mystery bird',
          );
        }
      }
      if (question.kind === 'call') {
        assert.equal(question.options.length, 4);
        assert.equal(new Set(question.options).size, 4);
        assert.equal(
          new Set(question.options.map((id) => quizBirds[id].name)).size,
          4,
        );
        assert.equal(question.correct, question.birdId);
        assert.equal(
          question.options.filter((id) => id === question.correct).length,
          1,
        );
        for (const id of question.options) {
          const recording = quizBirds[id].recording;
          assert(recording);
          assert(existsSync(`public${recording.url}`));
          assert(
            recording.durationSeconds > 0 && recording.durationSeconds <= 10,
          );
          assert(
            recording.author &&
              recording.license &&
              recording.licenseUrl &&
              recording.sourceUrl,
          );
        }
        for (const other of round.filter((item) => item !== question)) {
          const namedBirds = 'birdId' in other ? [other.birdId] : other.birdIds;
          assert(!namedBirds.includes(question.birdId));
        }
      }
      if (question.kind === 'weight-estimate') {
        const bird = quizBirds[question.birdId];
        const scale = weightEstimateScale(bird);
        assert(bird.weight[1] <= scale.max);
        const validGuess = Math.ceil(bird.weight[0] / scale.step) * scale.step;
        assert.equal(scoreWeight(validGuess, bird.weight), 100);
      }
      if (question.kind === 'hunt') {
        assert.equal(question.options.length, 4);
        assert.equal(new Set(question.options).size, 4);
        const valid = speciesById[question.birdId].ecology
          .huntingTags as string[];
        assert.deepEqual(
          question.options.filter((option) => valid.includes(option)),
          [question.correct],
        );
        for (const option of question.options) assert(option in huntingTypes);
      }
      if (question.kind === 'prey') {
        const bird = quizBirds[question.birdId];
        assert.equal(question.options.length, PREY_OPTION_COUNT);
        assert.equal(new Set(question.options).size, PREY_OPTION_COUNT);
        assert(question.correct.length >= 1 && question.correct.length <= 2);
        assert.deepEqual(
          question.options.filter((id) => bird.typicalPrey.includes(id)).sort(),
          [...question.correct].sort(),
        );
        for (const id of question.options) {
          assert(preyCatalog[id]);
          const frame = preyFraming[id];
          assert(frame || preyCatalog[id].icon);
          if (frame) assert(existsSync(`public${frame.src.split('?')[0]}`));
          if (!question.correct.includes(id)) {
            assert(bird.preyDistractors.includes(id));
            assert(
              !speciesById[bird.id].ecology.categoryTags.includes(
                preyCategoryById[id],
              ),
            );
            assert(
              !speciesById[bird.id].ecology.prey.some(
                (prey) => prey.key === id,
              ),
            );
          }
        }
      }
      if (question.kind === 'compare') {
        assert(question.birdIds.includes(question.correct));
        const winner = quizBirds[question.correct];
        for (const id of question.birdIds.filter((id) => id !== question.correct)) {
          assert(winner.span[0] > quizBirds[id].span[1]);
        }
      }
      if (question.kind === 'habitat') {
        assert.equal(question.habitatIds.length, 4);
        assert.equal(new Set(question.habitatIds).size, 4);
        for (const id of question.habitatIds)
          assert(availableHabitats.includes(id));
        for (const id of question.birdIds)
          assert(
            question.habitatIds.some((habitat) =>
              quizBirds[id].habitats.includes(habitat),
            ),
            id,
          );
      }
      if (question.kind === 'weight') {
        const correct = weightOrder(question.birdIds, quizBirds);
        assert.notDeepEqual(question.birdIds, correct);
        for (let index = 1; index < correct.length; index++) {
          assert(
            quizBirds[correct[index - 1]].weight[1] <
              quizBirds[correct[index]].weight[0],
            'Weight ranges must not overlap for an unambiguous answer',
          );
        }
      }
    }
  }
  assert.notDeepEqual(
    roundFor(0).map((q) => ('birdId' in q ? q.birdId : q.birdIds)),
    roundFor(1).map((q) => ('birdId' in q ? q.birdId : q.birdIds)),
  );
});

void test('habitat landscapes vary across rounds and cover every selected bird', () => {
  const seen = new Set<string>();
  let previous = quizHistory(roundFor(0));
  for (let seed = 1; seed <= 150; seed++) {
    const round = roundFor(seed, previous);
    const question = round.find((task) => task.kind === 'habitat')!;
    assert.notDeepEqual(
      [...question.habitatIds].sort(),
      [...previous.habitatIds!].sort(),
    );
    question.habitatIds.forEach((id) => seen.add(id));
    for (const id of question.birdIds) {
      const matching = question.habitatIds.find((habitat) =>
        quizBirds[id].habitats.includes(habitat),
      );
      assert(matching, `No visible habitat for ${id}`);
    }
    const placements = Object.fromEntries(
      question.birdIds.map((id) => [
        id,
        question.habitatIds.find((habitat) =>
          quizBirds[id].habitats.includes(habitat),
        )!,
      ]),
    );
    assert.equal(scoreHabitats(question.birdIds, placements, quizBirds), 100);
    previous = quizHistory(round);
  }
  const playable = availableHabitats.filter((id) =>
    Object.values(quizBirds).some((bird) => bird.habitats.includes(id)),
  );
  assert.deepEqual([...seen].sort(), playable.sort());
});

void test('weight estimates use the entire natural range and proportional partial credit', () => {
  for (const range of [
    [130, 340],
    [3000, 6600],
    [8000, 15000],
  ] as [number, number][]) {
    for (const guess of [range[0], (range[0] + range[1]) / 2, range[1]])
      assert.equal(scoreWeight(guess, range), 100);
    assert(scoreWeight(range[0] * 0.9, range) < 100);
    assert(
      scoreWeight(range[0] * 0.9, range) > scoreWeight(range[0] * 0.5, range),
    );
    assert.equal(scoreWeight(range[1] * 3, range), 0);
  }
  assert.equal(scoreWeight(250, [300, 500]), scoreWeight(2500, [3000, 5000]));
  assert.equal(scoreWeight(Number.NaN, [130, 340]), 0);
  assert.equal(scoreWeight(Infinity, [130, 340]), 0);
});

void test('weight scales cover all species with round steps and reachable full-credit guesses', () => {
  const units = new Set<string>();
  for (const bird of Object.values(quizBirds)) {
    const scale = weightEstimateScale(bird);
    units.add(scale.unit);
    assert(scale.min <= bird.weight[0] && scale.max >= bird.weight[1]);
    assert(scale.initial > scale.min && scale.initial < scale.max);
    assert.equal(scale.initial % scale.step, 0);
    assert.equal(scale.max % scale.step, 0);
    assert.equal((scale.max / (scale.ticks - 1)) % scale.step, 0);
    const guess = Math.ceil(bird.weight[0] / scale.step) * scale.step;
    assert(guess <= bird.weight[1], bird.id);
    assert.equal(scoreWeight(guess, bird.weight), 100);
  }
  assert.deepEqual([...units].sort(), ['gram', 'kilogram']);
});

void test('every puzzle uses existing bird and landscape images', () => {
  for (const bird of Object.values(quizBirds)) {
    assert(existsSync(`public${bird.image.split('?')[0]}`), bird.id);
    assert(existsSync(`public${bird.portrait.split('?')[0]}`), bird.id);
  }
  for (const id of availableHabitats)
    assert(existsSync(`public${habitatImages[id]}`), id);
});

void test('seeded rounds are reproducible, varied, and leave source data unchanged', () => {
  const original = JSON.stringify(quizBirds);
  assert.deepEqual(roundFor(123456), roundFor(123456));
  const sequences = new Set<string>();
  const species = new Set<string>();
  const correctPositions = new Set<number>();
  const identificationPositions = new Set<number>();
  const callPositions = new Set<number>();
  for (let seed = 0; seed < 100; seed++) {
    const round = roundFor(seed);
    sequences.add(round.map((q) => q.kind).join(','));
    for (const id of quizHistory(round).birdIds) species.add(id);
    for (const q of round)
      if (q.kind === 'hunt') correctPositions.add(q.options.indexOf(q.correct));
      else if (q.kind === 'identify')
        identificationPositions.add(q.options.indexOf(q.correct));
      else if (q.kind === 'call')
        callPositions.add(q.options.indexOf(q.correct));
  }
  assert(sequences.size > 30);
  assert.equal(species.size, Object.keys(quizBirds).length);
  assert.equal(correctPositions.size, 4);
  assert.equal(identificationPositions.size, 4);
  assert.equal(callPositions.size, 4);
  assert.equal(JSON.stringify(quizBirds), original);
});

void test('successive rounds avoid repeating the same species question or card combination', () => {
  let previous = quizHistory(roundFor(0));
  for (let seed = 1; seed <= 100; seed++) {
    const round = roundFor(seed, previous);
    const current = quizHistory(round);
    assert.equal(
      current.questionKeys.filter((key) => previous.questionKeys.includes(key))
        .length,
      0,
    );
    const appearances = round.flatMap((q) =>
      'birdId' in q ? [q.birdId] : q.birdIds,
    ).length;
    assert(current.birdIds.length >= appearances - 2);
    previous = current;
  }
});

void test('every quiz bird carries proper [min, max] ranges in cm and grams', () => {
  assert(Object.keys(quizBirds).length > 10);
  assert(quizBirds.weisskopfseeadler); // Now stored as a real wingspan range.
  for (const bird of Object.values(quizBirds)) {
    assert(bird.span[0] > 0 && bird.span[1] >= bird.span[0]);
    assert(bird.weight[0] > 0 && bird.weight[1] >= bird.weight[0]);
  }
});

void test('food grading gives partial credit without rewarding selecting everything', () => {
  const correct = ['mouse', 'rabbit', 'bird'];
  const options = [...correct, 'fish', 'worm', 'bone'];
  assert.equal(scorePrey(correct, correct, options), 100);
  assert.equal(scorePrey(['mouse'], correct, options), 33);
  assert.equal(scorePrey(['mouse', 'rabbit'], correct, options), 67);
  assert.equal(scorePrey(['mouse', 'fish'], correct, options), 0);
  assert.equal(scorePrey(options, correct, options), 0);
  assert.equal(scorePrey([], correct, options), 0);
  assert.equal(scorePrey(['mouse', 'mouse'], correct, options), 0);
  assert.equal(scorePrey(['unknown'], correct, options), 0);
});

void test('selected round lengths have balanced modes and unique questions', () => {
  for (const count of [5, 8, 12, 16]) {
    for (const seed of [1, 42, 1234]) {
      const round = createQuizRound(quizBirds, Object.keys(huntingTypes), availableHabitats, { seed, count });
      assert.equal(round.length, count);
      assert.equal(new Set(round.map(q => q.id)).size, count);
      assert.equal(new Set(round.map(quizQuestionKey)).size, count);
      const counts = quizKinds.map(kind => round.filter(q => q.kind === kind).length);
      assert(Math.max(...counts) - Math.min(...counts) <= 1);
    }
  }
  for (const count of [0, 17, 2.5, NaN]) {
    assert.throws(() => createQuizRound(quizBirds, Object.keys(huntingTypes), availableHabitats, { seed: 1, count }), RangeError);
  }
});

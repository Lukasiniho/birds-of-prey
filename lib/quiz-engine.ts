import type { BirdRecording } from './bird-recordings.ts';

export const quizKinds = [
  'span',
  'hunt',
  'weight',
  'weight-estimate',
  'habitat',
  'prey',
  'compare',
  'identify',
  'call',
] as const;
export type QuizKind = (typeof quizKinds)[number];
export type QuizHabitat = {
  id: string;
  label: string;
  description: string;
  image: string;
};
export type QuizBird = {
  id: string;
  name: string;
  latin: string;
  group: string;
  identification: string;
  recording?: BirdRecording;
  image: string;
  portrait: string;
  span: [number, number];
  weight: [number, number];
  hunting: string;
  huntingTags: string[];
  habitats: string[];
  typicalPrey: string[];
  preyDistractors: string[];
  href: string;
};
type QuizTask =
  | { kind: 'span'; birdId: string }
  | { kind: 'weight-estimate'; birdId: string }
  | { kind: 'identify'; birdId: string; correct: string; options: string[] }
  | { kind: 'call'; birdId: string; correct: string; options: string[] }
  | {
      kind: 'hunt';
      birdId: string;
      correct: string;
      options: string[];
    }
  | { kind: 'weight'; birdIds: string[] }
  | { kind: 'habitat'; birdIds: string[]; habitatIds: string[] }
  | { kind: 'prey'; birdId: string; options: string[]; correct: string[] }
  | { kind: 'compare'; birdIds: [string, string]; correct: string };

export type QuizQuestion = QuizTask & { id: string };
export type QuizHistory = {
  questionKeys: string[];
  birdIds: string[];
  habitatIds?: string[];
};

export function parseMeasurementRange(value: string): [number, number] {
  const values = value
    .replace(/\./g, '')
    .replace(/,/g, '.')
    .match(/\d+(?:\.\d+)?/g)
    ?.map(Number);
  if (!values || values.length !== 2 || values[0] > values[1]) {
    throw new Error(`Invalid measurement range: ${value}`);
  }
  return [values[0], values[1]];
}

function scoreRange(guess: number, [min, max]: [number, number]) {
  if (!Number.isFinite(guess)) return 0;
  const distance = Math.max(min - guess, guess - max, 0);
  return Math.max(0, Math.round(100 - (distance / ((min + max) / 2)) * 200));
}

export function scoreSpan(guess: number, range: [number, number]) {
  return scoreRange(guess, range);
}

/** Both the guess and the natural weight range are stored in grams. */
export function scoreWeight(guess: number, range: [number, number]) {
  return scoreRange(guess, range);
}

/** Broad, shared scales keep small species adjustable without exposing the answer. */
export function weightEstimateScale(bird: QuizBird) {
  if (bird.weight[1] <= 1500)
    return {
      min: 0,
      max: 2000,
      step: 10,
      initial: 500,
      divisor: 1,
      unit: 'gram',
      ticks: 41,
    } as const;
  if (bird.weight[1] <= 7000)
    return {
      min: 0,
      max: 10000,
      step: 100,
      initial: 2500,
      divisor: 1000,
      unit: 'kilogram',
      ticks: 21,
    } as const;
  return {
    min: 0,
    max: 20000,
    step: 500,
    initial: 5000,
    divisor: 1000,
    unit: 'kilogram',
    ticks: 41,
  } as const;
}

export function weightOrder(ids: string[], birds: Record<string, QuizBird>) {
  return [...ids].sort((a, b) => {
    const [aMin, aMax] = birds[a].weight;
    const [bMin, bMax] = birds[b].weight;
    return aMin + aMax - bMin - bMax;
  });
}

export function scoreOrder(order: string[], correct: string[]) {
  if (
    order.length !== correct.length ||
    new Set(order).size !== order.length ||
    order.some((id) => !correct.includes(id))
  )
    return 0;
  let pairs = 0;
  let right = 0;
  for (let i = 0; i < order.length; i++) {
    for (let j = i + 1; j < order.length; j++) {
      pairs++;
      if (correct.indexOf(order[i]) < correct.indexOf(order[j])) right++;
    }
  }
  return pairs ? Math.round((right / pairs) * 100) : 0;
}

export function moveBird(order: string[], id: string, targetIndex: number) {
  const currentIndex = order.indexOf(id);
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= order.length)
    return order;
  const next = order.filter((item) => item !== id);
  next.splice(targetIndex, 0, id);
  return next;
}

export function scoreHabitats(
  ids: string[],
  placements: Record<string, string>,
  birds: Record<string, QuizBird>,
) {
  if (!ids.length) return 0;
  const correct = ids.filter((id) =>
    birds[id].habitats.includes(placements[id]),
  ).length;
  return Math.round((correct / ids.length) * 100);
}

export function scorePrey(
  selected: string[],
  correct: string[],
  options: string[],
) {
  if (
    !correct.length ||
    new Set(selected).size !== selected.length ||
    selected.some((id) => !options.includes(id))
  )
    return 0;
  const hits = selected.filter((id) => correct.includes(id)).length;
  const errors = selected.length - hits;
  return Math.max(0, Math.round((100 * (hits - errors)) / correct.length));
}

export function meanSpan(bird: QuizBird) {
  return (bird.span[0] + bird.span[1]) / 2;
}

function shuffled<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function taskBirds(task: QuizTask) {
  return 'birdId' in task ? [task.birdId] : task.birdIds;
}

export function quizQuestionKey(task: QuizTask) {
  return `${task.kind}:${[...taskBirds(task)].sort().join(',')}`;
}

export function quizHistory(questions: QuizQuestion[]): QuizHistory {
  return {
    questionKeys: questions.map(quizQuestionKey),
    birdIds: [...new Set(questions.flatMap(taskBirds))],
    habitatIds: [
      ...new Set(
        questions.flatMap((question) =>
          question.kind === 'habitat' ? question.habitatIds : [],
        ),
      ),
    ],
  };
}

export function createQuizRound(
  birds: Record<string, QuizBird>,
  huntingOptions: readonly string[],
  habitatIds: readonly string[],
  { seed, previous }: { seed: number; previous?: QuizHistory },
): QuizQuestion[] {
  // Seeded randomness keeps a round reproducible without changing it on renders.
  let state = seed >>> 0;
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const used = new Map<string, number>();
  const previousBirds = new Set(previous?.birdIds);
  const previousKeys = new Set(previous?.questionKeys);
  const tasks: QuizTask[] = [];
  const penalty = (ids: string[]) =>
    ids.reduce(
      (sum, id) =>
        sum + (used.get(id) ?? 0) * 100 + (previousBirds.has(id) ? 1 : 0),
      0,
    );
  const add = (task: QuizTask) => {
    tasks.push(task);
    for (const id of taskBirds(task)) used.set(id, (used.get(id) ?? 0) + 1);
  };
  function choose<T extends QuizTask>(candidates: T[]): T {
    const unused = candidates.filter(
      (task) =>
        !tasks.some(
          (existing) => quizQuestionKey(existing) === quizQuestionKey(task),
        ),
    );
    const fresh = unused.filter(
      (task) => !previousKeys.has(quizQuestionKey(task)),
    );
    const pool = fresh.length ? fresh : unused;
    const selected = shuffled(pool, random).sort(
      (a, b) => penalty(taskBirds(a)) - penalty(taskBirds(b)),
    )[0];
    if (!selected)
      throw new Error('Not enough suitable birds for a complete quiz round.');
    return selected;
  }

  const counts = Object.fromEntries(
    quizKinds.map((kind) => [kind, 1]),
  ) as Record<QuizKind, number>;
  for (const kind of shuffled(quizKinds, random).slice(
    0,
    Math.max(0, 8 - quizKinds.length),
  ))
    counts[kind]++;
  const eligible = Object.values(birds);
  // Enumerate compatible sets from the data: each next range must start above
  // the preceding maximum, so neither sex nor natural variation reverses the order.
  const byWeight = [...eligible].sort((a, b) => a.weight[0] - b.weight[0]);
  const weightTasks: Extract<QuizTask, { kind: 'weight' }>[] = [];
  function collectWeights(ids: string[], start: number) {
    if (ids.length === 4) {
      weightTasks.push({ kind: 'weight', birdIds: ids });
      return;
    }
    for (let i = start; i <= byWeight.length - (4 - ids.length); i++) {
      const bird = byWeight[i];
      if (!ids.length || birds[ids[ids.length - 1]].weight[1] < bird.weight[0])
        collectWeights([...ids, bird.id], i + 1);
    }
  }
  collectWeights([], 0);
  for (let i = 0; i < counts.weight; i++) {
    const task = choose(weightTasks);
    let order = shuffled(task.birdIds, random);
    // Never present an already solved sorting task.
    if (order.every((id, index) => id === task.birdIds[index]))
      order = [...order.slice(1), order[0]];
    add({ ...task, birdIds: order });
  }

  const hunts = eligible.flatMap(
    (bird): Extract<QuizTask, { kind: 'hunt' }>[] => {
      const valid = bird.huntingTags.filter((tag) =>
        huntingOptions.includes(tag),
      );
      const wrong = huntingOptions.filter(
        (tag) => !bird.huntingTags.includes(tag),
      );
      if (!valid.length || wrong.length < 3) return [];
      // The first source tag describes the primary technique. Incidental carrion
      // feeding remains excluded from distractors, without becoming the main answer.
      const correct = valid[0];
      return [
        {
          kind: 'hunt',
          birdId: bird.id,
          correct,
          options: shuffled(
            [correct, ...shuffled(wrong, random).slice(0, 3)],
            random,
          ),
        },
      ];
    },
  );
  for (let i = 0; i < counts.hunt; i++) add(choose(hunts));

  const spans = eligible
    .filter((bird) => bird.span[0] >= 40 && bird.span[1] <= 350)
    .map(
      (bird): Extract<QuizTask, { kind: 'span' }> => ({
        kind: 'span',
        birdId: bird.id,
      }),
    );
  for (let i = 0; i < counts.span; i++) add(choose(spans));

  const weightEstimates = eligible
    .filter((bird) => bird.weight[1] <= weightEstimateScale(bird).max)
    .map(
      (bird): Extract<QuizTask, { kind: 'weight-estimate' }> => ({
        kind: 'weight-estimate',
        birdId: bird.id,
      }),
    );
  for (let i = 0; i < counts['weight-estimate']; i++)
    add(choose(weightEstimates));

  const preyTasks = eligible.flatMap(
    (bird): Extract<QuizTask, { kind: 'prey' }>[] => {
      const correct = shuffled([...new Set(bird.typicalPrey)], random).slice(
        0,
        3,
      );
      const wrong = shuffled(
        [...new Set(bird.preyDistractors)].filter(
          (id) => !bird.typicalPrey.includes(id),
        ),
        random,
      ).slice(0, 6 - correct.length);
      if (!correct.length || correct.length + wrong.length !== 6) return [];
      return [
        {
          kind: 'prey',
          birdId: bird.id,
          correct,
          options: shuffled([...correct, ...wrong], random),
        },
      ];
    },
  );
  for (let i = 0; i < counts.prey; i++) add(choose(preyTasks));

  const comparisons: Extract<QuizTask, { kind: 'compare' }>[] = [];
  eligible.forEach((a, index) =>
    eligible.slice(index + 1).forEach((b) => {
      if (a.span[1] < b.span[0] || b.span[1] < a.span[0]) {
        comparisons.push({
          kind: 'compare',
          birdIds: shuffled([a.id, b.id], random) as [string, string],
          correct: meanSpan(a) > meanSpan(b) ? a.id : b.id,
        });
      }
    }),
  );
  for (let i = 0; i < counts.compare; i++) add(choose(comparisons));

  const habitatBirds = eligible.filter((bird) =>
    bird.habitats.some((id) => habitatIds.includes(id)),
  );
  const playableHabitats = [...new Set(habitatIds)].filter((id) =>
    habitatBirds.some((bird) => bird.habitats.includes(id)),
  );
  if (habitatBirds.length < 4)
    throw new Error('Not enough birds with a playable habitat.');
  if (playableHabitats.length < 4)
    throw new Error(
      'Not enough illustrated habitats for a complete quiz round.',
    );
  for (let i = 0; i < counts.habitat; i++) {
    // Include one valid home per bird before filling the four landscape slots.
    const candidates = Array.from(
      { length: 32 },
      (): Extract<QuizTask, { kind: 'habitat' }> => {
        const selectedBirds = shuffled(habitatBirds, random)
          .sort((a, b) => penalty([a.id]) - penalty([b.id]))
          .slice(0, 4);
        const selectedHabitats = new Set(
          selectedBirds.map(
            (bird) =>
              shuffled(
                bird.habitats.filter((id) => playableHabitats.includes(id)),
                random,
              )[0],
          ),
        );
        for (const id of shuffled(playableHabitats, random)) {
          if (selectedHabitats.size === 4) break;
          selectedHabitats.add(id);
        }
        return {
          kind: 'habitat',
          birdIds: selectedBirds.map((bird) => bird.id),
          habitatIds: shuffled([...selectedHabitats], random),
        };
      },
    );
    const previousHabitats = Array.isArray(previous?.habitatIds)
      ? previous.habitatIds
      : [];
    const differentLandscapes = candidates.filter((task) =>
      task.habitatIds.some((id) => !previousHabitats.includes(id)),
    );
    add(choose(differentLandscapes.length ? differentLandscapes : candidates));
  }
  // Keep the mystery bird out of the named illustrations in the other tasks.
  const identificationTasks = eligible
    .filter((bird) => !used.has(bird.id) && bird.identification)
    .flatMap((bird): Extract<QuizTask, { kind: 'identify' }>[] => {
      const alternatives = shuffled(
        eligible.filter(
          (other) => other.id !== bird.id && other.name !== bird.name,
        ),
        random,
      ).sort(
        (a, b) =>
          Number(b.group === bird.group) - Number(a.group === bird.group),
      );
      const wrong = [
        ...new Map(
          alternatives.map((other) => [other.name, other.id]),
        ).values(),
      ].slice(0, 3);
      if (wrong.length !== 3) return [];
      return [
        {
          kind: 'identify',
          birdId: bird.id,
          correct: bird.id,
          options: shuffled([bird.id, ...wrong], random),
        },
      ];
    });
  for (let i = 0; i < counts.identify; i++) add(choose(identificationTasks));

  const callTasks = eligible
    .filter((bird) => bird.recording && !used.has(bird.id))
    .flatMap((bird): Extract<QuizTask, { kind: 'call' }>[] => {
      const alternatives = shuffled(
        eligible.filter(
          (other) =>
            other.recording && other.id !== bird.id && other.name !== bird.name,
        ),
        random,
      ).sort(
        (a, b) =>
          Number(b.group === bird.group) - Number(a.group === bird.group),
      );
      const wrong = [
        ...new Map(
          alternatives.map((other) => [other.name, other.id]),
        ).values(),
      ].slice(0, 3);
      if (wrong.length !== 3) return [];
      return [
        {
          kind: 'call',
          birdId: bird.id,
          correct: bird.id,
          options: shuffled([bird.id, ...wrong], random),
        },
      ];
    });
  for (let i = 0; i < counts.call; i++) add(choose(callTasks));

  return shuffled(tasks, random).map((task, index) => ({
    ...task,
    id: `${seed}-${index}`,
  }));
}

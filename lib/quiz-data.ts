import { birds, birdImage, hunts } from './birds.ts';
import { portraitImages } from './portrait-images.ts';
import { speciesById, preyCategoryById } from './ecology.ts';
import { preyCatalog } from './diets.ts';
import { preyFraming } from './prey-framing.ts';
import { speciesLandscapes } from './habitats.ts';
import { quizIdentification } from './quiz-identification.ts';
import { birdRecordings } from './bird-recordings.ts';
import type { QuizBird } from './quiz-engine.ts';

/** Include species with actual ranges; measurements are stored as [min, max] in cm and grams. */
export function buildQuizBirds(): Record<string, QuizBird> {
  return Object.fromEntries(
    birds.flatMap((bird) => {
      const { span, weight } = bird;
      if (!(span[0] > 0) || span[1] < span[0]) return [];
      if (!(weight[0] > 0) || weight[1] < weight[0]) return [];
      const image = birdImage(bird.id, 'male');
      const portrait = portraitImages[bird.id];
      if (!image || !portrait) return [];
      const ecology = speciesById[bird.id]?.ecology;
      const illustratedPrey = Object.keys(preyCatalog).filter(
        (id) => preyFraming[id] || preyCatalog[id].icon,
      );
      return [
        [
          bird.id,
          {
            id: bird.id,
            name: bird.name,
            latin: bird.latin,
            group: bird.group,
            identification: quizIdentification[bird.id] ?? '',
            recording: birdRecordings[bird.id],
            image,
            portrait,
            span,
            weight,
            href: '',
            hunting: hunts[bird.id]?.text ?? '',
            huntingTags: [...(speciesById[bird.id]?.ecology.huntingTags ?? [])],
            habitats: speciesLandscapes[bird.id] ?? [],
            typicalPrey: (ecology?.prey ?? [])
              .filter(
                (prey) =>
                  prey.importance === 'primary' &&
                  !prey.note &&
                  illustratedPrey.includes(prey.key),
              )
              .map((prey) => prey.key),
            preyDistractors: illustratedPrey.filter(
              (id) =>
                preyCategoryById[id] &&
                !ecology?.categoryTags.includes(preyCategoryById[id]) &&
                !ecology?.prey.some((prey) => prey.key === id),
            ),
          },
        ],
      ];
    }),
  );
}

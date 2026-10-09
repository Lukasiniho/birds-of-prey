import {
  birds,
  birdImage,
  hunts,
  plumagesFor,
  plumageNoteFor,
} from './birds.ts';
import { birdImages } from './bird-images.ts';
import { getBirdMorphConfig } from './morphs.ts';
import { portraitImages } from './portrait-images.ts';
import { speciesById, preyCategoryById } from './ecology.ts';
import { preyCatalog } from './diets.ts';
import { preyFraming } from './prey-framing.ts';
import { speciesLandscapes } from './habitats.ts';
import { quizIdentification } from './quiz-identification.ts';
import { birdRecordings } from './bird-recordings.ts';
import { displayRangeMaps } from './range-map-catalog.ts';
import type { QuizBird } from './quiz-engine.ts';
import { localize, translator, type Translate } from './i18n.ts';

/** Include species with actual ranges; measurements are stored as [min, max] in cm and grams. */
export function buildQuizBirds(
  t: Translate = translator(null),
): Record<string, QuizBird> {
  return Object.fromEntries(
    birds.flatMap((bird) => {
      const { span, weight } = bird;
      if (!(span[0] > 0) || span[1] < span[0]) return [];
      if (!(weight[0] > 0) || weight[1] < weight[0]) return [];
      const image = birdImage(bird.id, 'male');
      const portrait = portraitImages[bird.id];
      if (!image || !portrait) return [];
      const morphs = getBirdMorphConfig(bird.id, 'male');
      const identificationImages = morphs
        ? morphs.choices.flatMap((morph) => {
            const src =
              morph.images?.male ??
              (morph.id === morphs.defaultId ? image : undefined);
            return src
              ? [
                  {
                    image: src,
                    note: t(morph.adultNote),
                    label: `${t(morphs.label)}: ${t(morph.label)}`,
                  },
                ]
              : [];
          })
        : [
            {
              image,
              note: t(quizIdentification[bird.id] ?? ''),
              label: '',
            },
          ];
      const femaleImage = birdImages[`female-${bird.id}`];
      const sexImages =
        femaleImage &&
        femaleImage !== image &&
        plumagesFor(bird.id).some((stage) => stage.value === 'female')
          ? {
              male: image,
              female: femaleImage,
              maleNote: t(plumageNoteFor(bird.id, 'male')),
              femaleNote: t(plumageNoteFor(bird.id, 'female')),
            }
          : undefined;
      const ecology = speciesById[bird.id]?.ecology;
      const illustratedPrey = Object.keys(preyCatalog).filter(
        (id) => preyFraming[id] || preyCatalog[id].icon,
      );
      return [
        [
          bird.id,
          {
            id: bird.id,
            name: t(bird.name),
            latin: bird.latin,
            group: bird.group,
            identification: t(quizIdentification[bird.id] ?? ''),
            identificationImages,
            sexImages,
            recording: birdRecordings[bird.id],
            range: displayRangeMaps[bird.id] && localize(displayRangeMaps[bird.id], t),
            image,
            portrait,
            span,
            weight,
            href: '',
            hunting: t(hunts[bird.id]?.text ?? ''),
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

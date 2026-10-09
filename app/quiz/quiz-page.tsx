import type { Metadata } from 'next';
import QuizExperience from './quiz-experience';
import { birds } from '@/lib/birds';
import { buildQuizBirds } from '@/lib/quiz-data';
import { birdHref } from '@/lib/bird-routes';
import { imageSource } from '@/lib/optimized-images';
import { huntingTypes } from '@/lib/ecology';
import { landscapes } from '@/lib/habitats';
import { habitatImages } from '@/lib/habitat-images';
import {
  languageAlternates,
  localePath,
  localize,
  type Locale,
} from '@/lib/i18n';
import { serverTranslator } from '@/lib/i18n/en';
import './quiz.css';

export function pageMetadata(locale: Locale): Metadata {
  const t = serverTranslator(locale);
  return {
    title: t('Quiz'),
    alternates: languageAlternates('/quiz', locale),
    description: t(
      'Greifvogelarten, Rufe und Verbreitungsgebiete erkennen, Spannweiten schätzen und vergleichen, Jagdweisen erkennen, Gewicht schätzen und sortieren, Lebensräume und Nahrung zuordnen. Das dynamische Greifvogel-Quiz.',
    ),
  };
}

export default function QuizPage({ locale }: { locale: Locale }) {
  const t = serverTranslator(locale);
  const quizBirds = Object.fromEntries(
    Object.entries(buildQuizBirds(t)).map(([id, bird]) => [
      id,
      {
        ...bird,
        image: imageSource(bird.image),
        portrait: imageSource(bird.portrait),
        href: localePath(
          birdHref(birds.find((species) => species.id === id)!),
          locale,
        ),
      },
    ]),
  );
  const habitats = Object.keys(landscapes)
    .filter((id) => habitatImages[id])
    .map((id) => ({
      id,
      ...localize(landscapes[id], t),
      image: imageSource(habitatImages[id]),
    }));
  return (
    <QuizExperience
      birds={quizBirds}
      huntingTypes={localize(huntingTypes, t)}
      habitats={habitats}
    />
  );
}

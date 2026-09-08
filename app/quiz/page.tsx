import type { Metadata } from 'next';
import QuizExperience from './quiz-experience';
import { birds } from '@/lib/birds';
import { buildQuizBirds } from '@/lib/quiz-data';
import { birdHref } from '@/lib/bird-routes';
import { imageSource } from '@/lib/optimized-images';
import { huntingTypes } from '@/lib/ecology';
import { landscapes } from '@/lib/habitats';
import { habitatImages } from '@/lib/habitat-images';
import { createQuizRound } from '@/lib/quiz-engine';
import './quiz.css';

export const metadata: Metadata = {
  title: 'Quiz · Greifvogelkompass',
  description:
    'Greifvogelarten und Rufe erkennen, Spannweiten schätzen und vergleichen, Jagdweisen erkennen, Gewicht schätzen und sortieren, Lebensräume und Nahrung zuordnen. Das dynamische Greifvogel-Quiz.',
};

export default function QuizPage() {
  const quizBirds = Object.fromEntries(
    Object.entries(buildQuizBirds()).map(([id, bird]) => [
      id,
      {
        ...bird,
        image: imageSource(bird.image),
        portrait: imageSource(bird.portrait),
        href: birdHref(birds.find((species) => species.id === id)!),
      },
    ]),
  );
  const habitats = Object.keys(landscapes)
    .filter((id) => habitatImages[id])
    .map((id) => ({
      id,
      ...landscapes[id],
      image: imageSource(habitatImages[id]),
    }));
  return (
    <QuizExperience
      initialQuestions={createQuizRound(
        quizBirds,
        Object.keys(huntingTypes),
        habitats.map((habitat) => habitat.id),
        {
          seed: crypto.getRandomValues(new Uint32Array(1))[0],
        },
      )}
      birds={quizBirds}
      huntingTypes={huntingTypes}
      habitats={habitats}
    />
  );
}

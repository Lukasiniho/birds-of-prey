import type { Metadata } from 'next';
import { birds, birdImage } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { imageSource } from '@/lib/optimized-images';
import FalconryExplorer from './falconry-explorer';
import './falknerei.css';

export const metadata: Metadata = {
  title: 'Falknerei',
  alternates: { canonical: '/falknerei' },
  description:
    'Falknerei kennenlernen: Beizjagd, Ausrüstung, Beizvögel und der verantwortungsvolle Umgang mit Greifvögeln.',
};

const descriptions: Record<string, { subtitle: string; text: string }> = {
  wanderfalke: {
    subtitle: 'Jagd im freien Luftraum',
    text: 'Seine langen, spitzen Flügel machen den Wanderfalken zu einem ausdauernden und schnellen Flugjäger. Bei der Beizjagd wird er vor allem in offenem Gelände eingesetzt.',
  },
  habicht: {
    subtitle: 'Wendig im deckungsreichen Gelände',
    text: 'Mit kurzen, breiten Flügeln und einem langen Schwanz kann der Habicht schnell beschleunigen und enge Kurven fliegen. Er gehört zu den klassischen Beizvögeln.',
  },
  wuestenbussard: {
    subtitle: 'Auch als Harris Hawk bekannt',
    text: 'Der Wüstenbussard stammt aus Amerika und ist für sein ausgeprägtes Sozialverhalten bekannt. Auch in der europäischen Falknerei wird er als Beizvogel eingesetzt.',
  },
};

export default function FalknereiPage() {
  const species = Object.keys(descriptions).flatMap((id) => {
    const bird = birds.find((item) => item.id === id);
    return bird
      ? [
          {
            id,
            name: bird.name,
            latin: bird.latin,
            href: birdHref(bird),
            image: imageSource(birdImage(id, 'male')),
            portrait: imageSource(portraitImages[id]),
            ...descriptions[id],
          },
        ]
      : [];
  });
  return <FalconryExplorer species={species} />;
}

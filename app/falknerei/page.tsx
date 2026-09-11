import type { Metadata } from 'next';
import { birds, birdImage } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { imageSource } from '@/lib/optimized-images';
import { falconryBirds } from '@/lib/falconry';
import FalconryExplorer from './falconry-explorer';
import './falknerei.css';

export const metadata: Metadata = {
  title: 'Falknerei',
  alternates: { canonical: '/falknerei' },
  description:
    'Falknerei kennenlernen: Beizjagd, Ausrüstung, Beizvögel und der verantwortungsvolle Umgang mit Greifvögeln.',
};

export default function FalknereiPage() {
  /* Die Seite zeigt eine Auswahl; den vollen Satz Beizvögel tragen die
   * Steckbriefe der Arten. */
  const species = Object.entries(falconryBirds).flatMap(([id, falconry]) => {
    if (!falconry.featured) return [];
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
            subtitle: falconry.subtitle,
            text: falconry.text,
          },
        ]
      : [];
  });
  return <FalconryExplorer species={species} />;
}

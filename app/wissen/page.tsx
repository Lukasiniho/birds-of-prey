import type { Metadata } from 'next';
import { birdImage, birds } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { imageSource } from '@/lib/optimized-images';
import KnowledgeExplorer from './knowledge-explorer';
import './wissen.css';

export const metadata: Metadata = {
  title: 'Wissen · Greifvogelkompass',
  description:
    'Greifvögel verstehen: Körperbau entdecken und Falknereitraditionen auf der Weltkarte erkunden.',
};

export default function WissenPage() {
  return (
    <KnowledgeExplorer
      birds={birds
        .filter((bird) =>
          [
            'wanderfalke',
            'maeusebussard',
            'steinadler',
            'sakerfalke',
            'lannerfalke',
            'habicht',
            'sperber',
            'gerfalke',
            'wuestenbussard',
            'rotschwanzbussard',
          ].includes(bird.id),
        )
        .map((bird) => ({
          id: bird.id,
          name: bird.name,
          latin: bird.latin,
          href: birdHref(bird),
          image: imageSource(birdImage(bird.id, 'male')),
          portrait: imageSource(portraitImages[bird.id]),
        }))}
    />
  );
}

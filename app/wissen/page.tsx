import type { Metadata } from 'next';
import { birdImage, birds } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { imageSource } from '@/lib/optimized-images';
import { preyCatalog } from '@/lib/diets';
import { speciesRecords } from '@/lib/ecology';
import type { PreyEntry } from './knowledge-data';
import KnowledgeExplorer from './knowledge-explorer';
import './wissen.css';

export const metadata: Metadata = {
  title: 'Wissen · Greifvogelkompass',
  description:
    'Greifvögel verstehen: Körperbau entdecken, Falknereitraditionen auf der Weltkarte erkunden und nachschlagen, welche Arten welche Beute jagen.',
};

// Reverse lookup: every prey with at least one hunter, busiest prey first.
const preyEntries: PreyEntry[] = Object.entries(preyCatalog)
  .map(([key, { name }]) => ({
    key,
    name,
    hunters: speciesRecords.flatMap((bird) => {
      const match = bird.ecology.prey.find((item) => item.key === key);
      if (!match) return [];
      return [
        {
          id: bird.id,
          name: bird.name,
          latin: bird.latin,
          href: birdHref(bird),
          portrait: imageSource(portraitImages[bird.id]),
          importance: match.importance,
          note: match.note,
          prey: bird.ecology.prey.map((item) => item.key),
        },
      ];
    }),
  }))
  .filter((entry) => entry.hunters.length > 0)
  .sort(
    (a, b) =>
      b.hunters.length - a.hunters.length || a.name.localeCompare(b.name, 'de'),
  );

export default function WissenPage() {
  return (
    <KnowledgeExplorer
      prey={preyEntries}
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

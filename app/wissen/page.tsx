import type { Metadata } from 'next';
import { birdImage, birds } from '@/lib/birds';
import { birdHref } from '@/lib/bird-routes';
import { portraitImages } from '@/lib/portrait-images';
import { imageSource } from '@/lib/optimized-images';
import { preyCatalog } from '@/lib/diets';
import { huntingTypes, speciesRecords } from '@/lib/ecology';
import { huntingImages } from '@/lib/hunting-images';
import type { PreyEntry, TechniqueEntry } from './knowledge-data';
import KnowledgeExplorer from './knowledge-explorer';
import './wissen.css';

export const metadata: Metadata = {
  title: 'Wissen · Greifvogelkompass',
  description:
    'Greifvögel verstehen: Körperbau entdecken, Falknereitraditionen auf der Weltkarte erkunden und nachschlagen, welche Arten welche Beute jagen und wie sie dabei vorgehen.',
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

// Techniques with their species; the tile shows a hunting scene of a species
// whose leading technique this is, falling back to any scene, then a portrait.
const techniqueEntries: TechniqueEntry[] = Object.entries(huntingTypes)
  .map(([id, { label, text }]) => {
    const hunters = speciesRecords.flatMap((bird) => {
      if (!bird.ecology.huntingTags.includes(id as never)) return [];
      return [
        {
          id: bird.id,
          name: bird.name,
          latin: bird.latin,
          href: birdHref(bird),
          portrait: imageSource(portraitImages[bird.id]),
          importance:
            bird.ecology.huntingTags[0] === id
              ? ('primary' as const)
              : ('occasional' as const),
          techniques: [...bird.ecology.huntingTags] as string[],
        },
      ];
    });
    const scene =
      hunters.find((h) => h.importance === 'primary' && huntingImages[h.id]) ??
      hunters.find((h) => huntingImages[h.id]);
    return {
      id,
      label,
      text,
      image: scene
        ? imageSource(huntingImages[scene.id])
        : (hunters[0]?.portrait ?? ''),
      hunters,
    };
  })
  .filter((entry) => entry.hunters.length > 0)
  .sort(
    (a, b) =>
      b.hunters.length - a.hunters.length ||
      a.label.localeCompare(b.label, 'de'),
  );

export default function WissenPage() {
  return (
    <KnowledgeExplorer
      prey={preyEntries}
      techniques={techniqueEntries}
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

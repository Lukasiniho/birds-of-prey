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
import {
  languageAlternates,
  localePath,
  localeTags,
  localize,
  type Locale,
} from '@/lib/i18n';
import { serverTranslator } from '@/lib/i18n/en';
import './wissen.css';

export function pageMetadata(locale: Locale): Metadata {
  const t = serverTranslator(locale);
  return {
    title: t('Wissen'),
    alternates: languageAlternates('/wissen', locale),
    description: t(
      'Greifvögel verstehen: Fachbegriffe im Glossar nachschlagen, Körperbau entdecken, Falknereitraditionen auf der Weltkarte erkunden und nachschlagen, welche Arten welche Beute jagen und wie sie dabei vorgehen.',
    ),
  };
}

function knowledgeData(locale: Locale) {
  const t = serverTranslator(locale);
  const tag = localeTags[locale];
  const href = (bird: Parameters<typeof birdHref>[0]) =>
    localePath(birdHref(bird), locale);
  // Reverse lookup: every prey with at least one hunter, busiest prey first.
  const preyEntries: PreyEntry[] = localize(
    Object.entries(preyCatalog)
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
              href: href(bird),
              portrait: imageSource(portraitImages[bird.id]),
              importance: match.importance,
              note: match.note,
              prey: bird.ecology.prey.map((item) => item.key),
            },
          ];
        }),
      }))
      .filter((entry) => entry.hunters.length > 0),
    t,
  ).sort(
    (a, b) =>
      b.hunters.length - a.hunters.length || a.name.localeCompare(b.name, tag),
  );

  // Techniques with their species; the tile shows a hunting scene of a species
  // whose leading technique this is, falling back to any scene, then a portrait.
  const techniqueEntries: TechniqueEntry[] = localize(
    Object.entries(huntingTypes)
      .map(([id, { label, text }]) => {
        const hunters = speciesRecords.flatMap((bird) => {
          if (!bird.ecology.huntingTags.includes(id as never)) return [];
          return [
            {
              id: bird.id,
              name: bird.name,
              latin: bird.latin,
              href: href(bird),
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
          hunters.find(
            (h) => h.importance === 'primary' && huntingImages[h.id],
          ) ?? hunters.find((h) => huntingImages[h.id]);
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
      .filter((entry) => entry.hunters.length > 0),
    t,
  ).sort(
    (a, b) =>
      b.hunters.length - a.hunters.length ||
      a.label.localeCompare(b.label, tag),
  );
  return { preyEntries, techniqueEntries, t, href };
}

export default function WissenPage({ locale }: { locale: Locale }) {
  const { preyEntries, techniqueEntries, t, href } = knowledgeData(locale);
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
          name: t(bird.name),
          latin: bird.latin,
          href: href(bird),
          image: imageSource(birdImage(bird.id, 'male')),
          portrait: imageSource(portraitImages[bird.id]),
        }))}
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from './raptor-app';
import type { BirdSpecies } from '@/lib/birds';
import { birdPageTitle, birdsBySlug, birdTaxonomyHref } from '@/lib/bird-routes';
import { birdMetadata } from '@/lib/bird-metadata';
import { birdStructuredData } from '@/lib/bird-structured-data';
import { JsonLd } from '@/components/json-ld';
import { serverTranslator } from '@/lib/i18n/en';
import { languageAlternates, type Locale } from '@/lib/i18n';

type View = 'atlas' | 'steckbrief' | 'systematik';
type Props = { params: Promise<{ species: string }> };

function pageTitle(bird: BirdSpecies, view: View, locale: Locale) {
  const t = serverTranslator(locale);
  return view === 'systematik'
    ? `${t(bird.name)} (${bird.latin}) – ${t('Systematik')}`
    : birdPageTitle(bird, view === 'steckbrief', t);
}

/** Artseiten in beiden Sprachen: `/[species]` und `/en/[species]`. */
export function speciesRoute(view: View, locale: Locale) {
  return {
    dynamicParams: false,
    generateStaticParams: () =>
      Object.keys(birdsBySlug).map((species) => ({ species })),
    generateMetadata: async ({ params }: Props): Promise<Metadata> => {
      const bird = birdsBySlug[(await params).species];
      if (!bird) return {};
      const metadata = birdMetadata(bird, view === 'steckbrief', locale);
      if (view !== 'systematik') return metadata;
      const title = pageTitle(bird, view, locale);
      const alternates = languageAlternates(birdTaxonomyHref(bird), locale);
      return {
        ...metadata,
        title,
        alternates,
        openGraph: { ...metadata.openGraph, title, url: alternates.canonical },
      };
    },
    Page: async ({ params }: Props) => {
      const bird = birdsBySlug[(await params).species];
      if (!bird) notFound();
      return (
        <>
          <JsonLd
            data={birdStructuredData(
              bird,
              view === 'atlas' ? 'overview' : view,
              pageTitle(bird, view, locale),
              locale,
            )}
          />
          <RaptorApp
            initialBirdId={bird.id}
            initialFullscreen={view === 'steckbrief'}
            initialTaxonomy={view === 'systematik'}
          />
        </>
      );
    },
  };
}

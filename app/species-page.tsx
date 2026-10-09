import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from './raptor-app';
import { birdsBySlug, birdTaxonomyHref } from '@/lib/bird-routes';
import { birdMetadata } from '@/lib/bird-metadata';
import { serverTranslator } from '@/lib/i18n/en';
import { languageAlternates, type Locale } from '@/lib/i18n';

type View = 'atlas' | 'steckbrief' | 'systematik';
type Props = { params: Promise<{ species: string }> };

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
      const t = serverTranslator(locale);
      const title = `${t(bird.name)} (${bird.latin}) – ${t('Systematik')}`;
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
        <RaptorApp
          initialBirdId={bird.id}
          initialFullscreen={view === 'steckbrief'}
          initialTaxonomy={view === 'systematik'}
        />
      );
    },
  };
}

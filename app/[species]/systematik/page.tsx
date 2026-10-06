import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../../raptor-app';
import type { BirdSpecies } from '@/lib/birds';
import { birdsBySlug, birdTaxonomyHref } from '@/lib/bird-routes';
import { birdMetadata } from '@/lib/bird-metadata';
import { birdStructuredData } from '@/lib/bird-structured-data';
import { JsonLd } from '@/components/json-ld';

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(birdsBySlug).map((species) => ({ species }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string }>;
}): Promise<Metadata> {
  const bird = birdsBySlug[(await params).species];
  if (!bird) return {};
  const metadata = birdMetadata(bird);
  const title = taxonomyTitle(bird);
  const href = birdTaxonomyHref(bird);
  return {
    ...metadata,
    title,
    alternates: { canonical: href },
    openGraph: { ...metadata.openGraph, title, url: href },
  };
}
function taxonomyTitle(bird: BirdSpecies) {
  return `${bird.name} (${bird.latin}) – Systematik`;
}
export default async function Page({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const bird = birdsBySlug[(await params).species];
  if (!bird) notFound();
  return (
    <>
      <JsonLd
        data={birdStructuredData(bird, 'systematik', taxonomyTitle(bird))}
      />
      <RaptorApp initialBirdId={bird.id} initialTaxonomy />
    </>
  );
}

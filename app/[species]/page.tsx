import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../raptor-app';
import { birdPageTitle, birdsBySlug } from '@/lib/bird-routes';
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
  const { species } = await params;
  const bird = birdsBySlug[species];
  if (!bird) return {};
  return birdMetadata(bird);
}
export default async function Page({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const bird = birdsBySlug[species];
  if (!bird) notFound();
  return (
    <>
      <JsonLd
        data={birdStructuredData(bird, 'overview', birdPageTitle(bird))}
      />
      <RaptorApp initialBirdId={bird.id} />
    </>
  );
}

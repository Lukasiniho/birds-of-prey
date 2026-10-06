import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../../raptor-app';
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
  const bird = birdsBySlug[(await params).species];
  return bird ? birdMetadata(bird, true) : {};
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
        data={birdStructuredData(bird, 'steckbrief', birdPageTitle(bird, true))}
      />
      <RaptorApp initialBirdId={bird.id} initialFullscreen />
    </>
  );
}

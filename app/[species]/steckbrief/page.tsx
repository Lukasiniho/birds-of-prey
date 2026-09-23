import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../../raptor-app';
import { birdsBySlug } from '@/lib/bird-routes';
import { birdMetadata } from '@/lib/bird-metadata';

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
  return <RaptorApp initialBirdId={bird.id} initialFullscreen />;
}

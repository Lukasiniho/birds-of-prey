import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../raptor-app';
import { birdsBySlug, birdHref } from '@/lib/bird-routes';
import { birdImage } from '@/lib/birds';
import { imageSource } from '@/lib/optimized-images';
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
  const title = `${bird.name} (${bird.latin})`;
  return {
    title,
    description: bird.intro,
    alternates: { canonical: birdHref(bird) },
    openGraph: {
      title,
      description: bird.intro,
      url: birdHref(bird),
      images: [{ url: imageSource(birdImage(bird.id, 'male')), alt: bird.name }],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const bird = birdsBySlug[species];
  if (!bird) notFound();
  return <RaptorApp initialBirdId={bird.id} />;
}

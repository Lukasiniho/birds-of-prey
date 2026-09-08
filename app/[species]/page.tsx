import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../raptor-app';
import { birdsBySlug, birdHref } from '@/lib/bird-routes';
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
  return {
    title: `${bird.name} · Greifvogelkompass`,
    description: bird.intro,
    alternates: { canonical: birdHref(bird) },
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

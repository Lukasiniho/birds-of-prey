import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RaptorApp from '../../raptor-app';
import { birdsBySlug, birdTaxonomyHref } from '@/lib/bird-routes';
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
  if (!bird) return {};
  const metadata = birdMetadata(bird);
  const title = `${bird.name} (${bird.latin}) – Systematik`;
  const href = birdTaxonomyHref(bird);
  return {
    ...metadata,
    title,
    alternates: { canonical: href },
    openGraph: { ...metadata.openGraph, title, url: href },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const bird = birdsBySlug[(await params).species];
  if (!bird) notFound();
  return <RaptorApp initialBirdId={bird.id} initialTaxonomy />;
}

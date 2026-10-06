import type { Metadata } from 'next';
import RaptorApp from './raptor-app';
import { BASE_OPEN_GRAPH, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';
export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  alternates: { canonical: '/' },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
  },
};
export default function Home() {
  return <RaptorApp />;
}

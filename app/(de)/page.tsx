import type { Metadata } from 'next';
import RaptorApp from '../raptor-app';
import { languageAlternates } from '@/lib/i18n';
export const metadata: Metadata = { alternates: languageAlternates('/', 'de') };
export default function Home() {
  return <RaptorApp />;
}

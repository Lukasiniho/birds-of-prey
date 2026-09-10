import type { Metadata } from 'next';
import RaptorApp from './raptor-app';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() { return <RaptorApp />; }

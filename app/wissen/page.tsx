import type { Metadata } from 'next';
import { birdImage } from '@/lib/birds';
import { imageSource } from '@/lib/optimized-images';
import AnatomyExplorer from './anatomy-explorer';
import './wissen.css';

export const metadata: Metadata = {
  title: 'Wissen · Greifvogelkompass',
  description:
    'Den Körperbau von Wanderfalke und Mäusebussard interaktiv entdecken: Schnabel, Gefieder, Flügel, Fänge und Schwanzfedern.',
};

export default function WissenPage() {
  return (
    <AnatomyExplorer
      images={[
        imageSource(birdImage('wanderfalke', 'male')),
        imageSource(birdImage('maeusebussard', 'male')),
      ]}
    />
  );
}

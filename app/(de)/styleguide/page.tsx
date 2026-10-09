import type { Metadata } from 'next';
import StyleguideView from '@/app/styleguide/styleguide-view';
import '@/app/styleguide/styleguide.css';

export const metadata: Metadata = {
  title: 'Design-System',
  robots: { index: false, follow: false },
  description:
    'Musterseite: jede Farb-, Text-, Abstands-, Steuerungs- und Bewegungsrolle des Greifvogelkompass in hell und dunkel.',
};

export default function StyleguidePage() {
  return <StyleguideView />;
}

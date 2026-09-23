import type { Metadata } from 'next';
import { birdImage, type BirdSpecies } from './birds';
import { birdFullscreenHref, birdHref, birdPageTitle } from './bird-routes';
import { imageSource } from './optimized-images';

export function birdMetadata(bird: BirdSpecies, fullscreen = false): Metadata {
  const title = birdPageTitle(bird, fullscreen);
  const href = fullscreen ? birdFullscreenHref(bird) : birdHref(bird);
  return {
    title,
    description: bird.intro,
    alternates: { canonical: href },
    openGraph: {
      title,
      description: bird.intro,
      url: href,
      images: [
        { url: imageSource(birdImage(bird.id, 'male')), alt: bird.name },
      ],
    },
  };
}

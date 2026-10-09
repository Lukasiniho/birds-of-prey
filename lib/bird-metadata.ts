import type { Metadata } from 'next';
import { birdImage, type BirdSpecies } from './birds';
import { birdFullscreenHref, birdHref, birdPageTitle } from './bird-routes';
import { imageSource } from './optimized-images';
import { languageAlternates, type Locale } from './i18n';
import { serverTranslator } from './i18n/en';

export function birdMetadata(
  bird: BirdSpecies,
  fullscreen = false,
  locale: Locale = 'de',
): Metadata {
  const t = serverTranslator(locale);
  const title = birdPageTitle(bird, fullscreen, t);
  const alternates = languageAlternates(
    fullscreen ? birdFullscreenHref(bird) : birdHref(bird),
    locale,
  );
  return {
    title,
    description: t(bird.intro),
    alternates,
    openGraph: {
      title,
      description: t(bird.intro),
      url: alternates.canonical,
      images: [
        { url: imageSource(birdImage(bird.id, 'male')), alt: t(bird.name) },
      ],
    },
  };
}

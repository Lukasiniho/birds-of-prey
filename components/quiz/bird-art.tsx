'use client';

import { ArtImage } from '@/components/art-image';
import type { QuizBird } from '@/lib/quiz-engine';

/** Shared flight frame for identification, estimates and the sex comparison. */
export const QUIZ_FLIGHT_FRAME =
  'q-flying-bird drop-shadow-[0_20px_20px_var(--shadow-color-drop)] from-tablet:h-[320px] to-tablet:max-h-[175px] to-tablet:max-w-[300px] relative w-full h-auto object-contain z-1';

export function BirdArt({
  bird,
  className = '',
  priority = false,
  portrait = false,
  alt = bird.name,
  displayWidth = 350,
}: {
  bird: QuizBird;
  className?: string;
  priority?: boolean;
  portrait?: boolean;
  alt?: string;
  /** Widest this bird is painted, in CSS pixels. Defaults to the flying stage. */
  displayWidth?: number;
}) {
  return (
    <ArtImage
      className={className}
      src={portrait ? bird.portrait : bird.image}
      alt={alt}
      width={1000}
      height={1000}
      displayWidth={displayWidth}
      priority={priority}
      draggable={false}
    />
  );
}

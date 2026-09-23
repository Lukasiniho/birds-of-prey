import type { ComponentProps } from 'react';
import { Surface, surfaceStyles } from '@/components/surface';
import { cn } from '@/lib/utils';

export function FullscreenPage({
  className,
  ...props
}: ComponentProps<typeof Surface>) {
  return (
    <div className="flow-root min-h-dvh bg-stage">
      <Surface
        {...props}
        as="main"
        className={cn(
          surfaceStyles.stack,
          'info-fullscreen [--rail-section-gap:var(--space-16)] [--rail-content-gap:var(--space-12)] [--rail-caption-gap:var(--space-8)] relative m-(--atlas-gutter) w-[calc(100%-2*var(--atlas-gutter))] h-[calc(100dvh-2*var(--atlas-gutter))] overflow-hidden',
          className,
        )}
      />
    </div>
  );
}

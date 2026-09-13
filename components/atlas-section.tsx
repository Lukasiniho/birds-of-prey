import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** A separated section in the atlas information rail. */
export function AtlasSection({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'mt-(--rail-section-gap) pt-(--rail-section-gap) border-t-(length:--border-structure)',
        className,
      )}
    >
      {children}
    </section>
  );
}

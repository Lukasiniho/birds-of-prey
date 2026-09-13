import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextProps = { children: ReactNode; className?: string };

export function DetailHeading({
  as: Element = 'h2',
  leading = 'heading',
  className,
  children,
}: TextProps & { as?: 'h2' | 'h3' | 'dt'; leading?: 'heading' | 'display' }) {
  return (
    <Element
      className={cn(
        'font-(family-name:--font-stack-display) text-(length:--type-detail-heading) font-(--weight-label-heading)',
        leading === 'display'
          ? 'leading-(--leading-display)'
          : 'leading-(--leading-heading)',
        className,
      )}
    >
      {children}
    </Element>
  );
}

export function DetailCopy({
  as: Element = 'p',
  size = 'body',
  leading = 'relaxed',
  className,
  children,
}: TextProps & {
  as?: 'p' | 'dd';
  size?: 'body' | 'caption';
  leading?: 'normal' | 'relaxed';
}) {
  return (
    <Element
      className={cn(
        'text-muted-foreground',
        size === 'caption'
          ? 'text-(length:--type-caption)'
          : 'text-(length:--type-body)',
        leading === 'normal'
          ? 'leading-(--leading-normal)'
          : 'leading-(--leading-relaxed)',
        className,
      )}
    >
      {children}
    </Element>
  );
}

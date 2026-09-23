import { createElement, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** A status label, knowledge link or region choice uses the same tag geometry. */
export function EcologyTag<T extends 'span' | 'a' | 'button' = 'span'>({
  as,
  size = 'default',
  className,
  ...props
}: { as?: T; size?: 'default' | 'large' } & ComponentProps<T>) {
  return createElement(as ?? 'span', {
    ...props,
    className: cn(
      'ecology-tag inline-flex items-center py-1 border-0 bg-(--tag-surface) font-(--weight-medium) leading-(--leading-normal) tracking-(--tracking-normal)',
      size === 'large'
        ? 'min-h-(--pill-height-large) px-4 to-tablet:px-3 [--tag-font-size:var(--type-tag-large)] to-tablet:[--tag-font-size:var(--type-tag)]'
        : 'min-h-[25px] px-3',
      as &&
        as !== 'span' &&
        'transition-[background] duration-(--duration-quick) ease-(--ease-out)',
      className,
    ),
  });
}

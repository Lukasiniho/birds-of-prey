import { createElement, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** A status label, knowledge link or region choice uses the same tag geometry. */
export function EcologyTag<T extends 'span' | 'a' | 'button' = 'span'>({
  as,
  className,
  ...props
}: { as?: T } & ComponentProps<T>) {
  return createElement(as ?? 'span', {
    ...props,
    className: cn(
      'ecology-tag inline-flex items-center min-h-[25px] py-1 px-3 border-0 bg-(--tag-surface) font-(--weight-medium) leading-(--leading-normal) tracking-(--tracking-normal)',
      as &&
        as !== 'span' &&
        'transition-[background] duration-(--duration-quick) ease-(--ease-out)',
      className,
    ),
  });
}

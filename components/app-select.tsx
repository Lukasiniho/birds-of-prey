'use client';

import type { ComponentProps } from 'react';
import { SelectTrigger, SelectContent } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type WithStringClass<T> = Omit<T, 'className'> & { className?: string };

export function AppSelectTrigger({
  className,
  ...props
}: WithStringClass<ComponentProps<typeof SelectTrigger>>) {
  return (
    <SelectTrigger
      {...props}
      className={cn(
        'app-select w-full data-[size=default]:h-(--control-height) text-(length:--type-ui) to-phone:w-[180px] to-phone:text-(length:--type-button)',
        className,
      )}
    />
  );
}

export function AppSelectContent({
  className,
  ...props
}: WithStringClass<ComponentProps<typeof SelectContent>>) {
  return (
    <SelectContent
      align="start"
      sideOffset={6}
      alignItemWithTrigger={false}
      data-origin="top-left"
      {...props}
      className={cn(
        'app-select-options t-dropdown origin-top-left data-[origin=top-right]:origin-top-right data-[origin=top-center]:origin-top data-[origin=bottom-left]:origin-bottom-left data-[origin=bottom-center]:origin-bottom data-[origin=bottom-right]:origin-bottom-right',
        className,
      )}
    />
  );
}

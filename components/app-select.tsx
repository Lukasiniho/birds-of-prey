'use client';

import type { ComponentProps } from 'react';
import { SelectTrigger, SelectContent } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type WithStringClass<T> = Omit<T, 'className'> & { className?: string };

export function AppSelectTrigger({
  className,
  ...props
}: WithStringClass<ComponentProps<typeof SelectTrigger>>) {
  return <SelectTrigger {...props} className={cn('app-select', className)} />;
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
      className={cn('app-select-options t-dropdown', className)}
    />
  );
}

'use client';

import type { ComponentProps } from 'react';
import { SelectTrigger, SelectContent } from '@/components/ui/select';

export function AppSelectTrigger({ className = '', ...props }: ComponentProps<typeof SelectTrigger>) {
  return <SelectTrigger {...props} className={`app-select ${className}`} />;
}

export function AppSelectContent({ className = '', ...props }: ComponentProps<typeof SelectContent>) {
  return <SelectContent align="start" sideOffset={6} alignItemWithTrigger={false}
    data-origin="top-left" {...props} className={`app-select-options t-dropdown ${className}`} />;
}

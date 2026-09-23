'use client';

import { useRef } from 'react';
import { MagnifyingGlass } from '@/components/icons';
import { FieldClear } from '@/components/close-control';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/** The navbar search, shared by every search surface in the app. */
export function SearchField({
  query,
  onQueryChange,
  label,
  placeholder = label,
  className,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('search-field relative flex items-center', className)}>
      <MagnifyingGlass
        className="absolute left-[11px] z-1"
        size={17}
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        type="text"
        role="searchbox"
        className="w-full h-(--control-height) py-0 pl-[36px] pr-10 border-(length:--border-structure) rounded-(--radius-control) shadow-none text-foreground"
        aria-label={label}
        placeholder={placeholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && (
        <span className="clear-search absolute right-1 inline-flex">
          <FieldClear
            aria-label="Suche leeren"
            onClick={() => {
              onQueryChange('');
              inputRef.current?.focus();
            }}
          />
        </span>
      )}
    </div>
  );
}

'use client';

import { MagnifyingGlass, X } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/** One controlled search field for the header and the mobile species picker. */
export function BirdSearch({
  query,
  onQueryChange,
  inHeader = false,
  className,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  inHeader?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'search-wrap relative flex items-center',
        inHeader && 'topbar-search',
        className,
      )}
    >
      <MagnifyingGlass className="absolute left-[11px] z-1" size={17} />
      <Input
        className={cn(
          'w-full py-0 pl-[36px] pr-[30px] border-(length:--border-structure) rounded-lg shadow-none text-foreground',
          inHeader
            ? 'h-(--header-control-height)'
            : 'h-(--control-height) to-phone:h-[35px]',
        )}
        aria-label="Vogelart suchen"
        placeholder="Vogelart suchen"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && (
        <button
          className="clear-search text-muted-foreground absolute right-[10px]"
          aria-label="Suche leeren"
          onClick={() => onQueryChange('')}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

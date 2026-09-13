'use client';

import { ArrowUpRight } from '@/components/icons';
import { SpeciesRowLink } from '@/components/species-row';
import { TooltipHint } from '@/components/ui/tooltip';

type Hunter = {
  id: string;
  href: string;
  portrait: string;
  name: string;
  latin: string;
  note?: string;
};

/** Shared species group for the prey and hunting-technique explorers. */
export function KnowledgeBirdGroup<T extends Hunter>({
  title,
  hunters,
  onHover,
}: {
  title: string;
  hunters: T[];
  onHover: (hunter: T | null) => void;
}) {
  return (
    <div className="knowledge-group">
      <h3 className="mt-6 text-(length:--type-ui) font-(--weight-medium) text-muted-foreground">
        {title}
      </h3>
      <div className="knowledge-bird-list grid gap-2 mt-2">
        {hunters.map((hunter) => {
          const row = (
            <SpeciesRowLink
              size="inline"
              href={hunter.href}
              key={hunter.id}
              portrait={hunter.portrait}
              name={hunter.name}
              latin={hunter.latin}
              trailing={<ArrowUpRight size={16} aria-hidden="true" />}
              onMouseEnter={() => onHover(hunter)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(hunter)}
              onBlur={() => onHover(null)}
            />
          );
          return hunter.note ? (
            <TooltipHint key={hunter.id} content={hunter.note}>
              {row}
            </TooltipHint>
          ) : (
            row
          );
        })}
      </div>
    </div>
  );
}

'use client';

import type { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getGlossaryEntry, glossaryHref } from '@/lib/glossary';

/** One definition source for the hover explanation and the glossary page. */
export function GlossaryLink({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const entry = getGlossaryEntry(id);
  if (!entry) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={glossaryHref(entry.id)}
            className="glossary-link text-(--glossary-link)! font-(--weight-semibold) no-underline transition-colors duration-(--duration-quick) ease-(--ease-out) hover:text-(--glossary-link-hover)! focus-visible:text-(--glossary-link-hover)!"
          >
            {children}
          </a>
        }
      />
      <TooltipContent variant="detail" side="top">
        <p className="app-tooltip-title">{entry.term}</p>
        <p>{entry.definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}

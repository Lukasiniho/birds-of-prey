'use client';

import type { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getGlossaryEntry, glossaryHref } from '@/lib/glossary';
import { useI18n } from '@/components/i18n';
import { localePath } from '@/lib/i18n';

/** One definition source for the hover explanation and the glossary page. */
export function GlossaryLink({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { locale, t } = useI18n();
  const entry = getGlossaryEntry(id);
  if (!entry) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={localePath(glossaryHref(entry.id), locale)}
            className="glossary-link text-(--glossary-link)! font-(--weight-semibold) no-underline transition-colors duration-(--duration-quick) ease-(--ease-out) hover:text-(--glossary-link-hover)! focus-visible:text-(--glossary-link-hover)!"
          >
            {children}
          </a>
        }
      />
      <TooltipContent variant="detail" side="top">
        <p className="app-tooltip-title">{t(entry.term)}</p>
        <p>{t(entry.definition)}</p>
      </TooltipContent>
    </Tooltip>
  );
}

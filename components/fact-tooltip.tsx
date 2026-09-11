'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/* Ein Faktenwert, der seine Erklärung selbst trägt: der Zeiger schwebt, der
 * Finger tippt. Ohne den Klick bliebe die Blase auf dem Telefon stumm. */
export function FactTooltip({
  value,
  describe,
  variant = 'detail',
  children,
}: {
  value: ReactNode;
  describe: string;
  /* Karten mit Skala stehen in der breiten Blase, kurze Hinweise schrumpfen
   * auf ihren Text. */
  variant?: 'compact' | 'detail';
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        type="button"
        closeOnClick={false}
        onClick={() => setOpen(true)}
        className="cursor-help rounded-sm border-0 bg-transparent p-0 text-right font-inherit text-inherit underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        style={{ font: 'inherit', color: 'inherit' }}
        aria-label={describe}
      >
        {value}
      </TooltipTrigger>
      <TooltipContent side="top" align="end" variant={variant}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

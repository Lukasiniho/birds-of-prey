'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { ComponentProps, ReactNode } from 'react';
import { X } from '@/components/icons';
import { cn } from '@/lib/utils';

const control =
  'inline-flex shrink-0 items-center justify-center rounded-(--radius-control) p-0 text-foreground bg-background hover:bg-(--hover) disabled:opacity-50';
const closeGeometry =
  'size-(--control-height) to-tablet:size-(--control-height-touch) border-(length:--border-structure) border-border';

/** Base UI supplies event handlers/ref through render; geometry stays private. */
export function CloseControl({
  'aria-label': label = 'Schließen',
  ...props
}: Omit<ButtonPrimitive.Props, 'className' | 'style' | 'children'>) {
  return (
    <ButtonPrimitive
      {...props}
      aria-label={label}
      data-close-control="surface"
      className={cn(control, closeGeometry)}
    >
      <X className="size-5 pointer-events-none" aria-hidden="true" />
    </ButtonPrimitive>
  );
}

export function CloseLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      data-close-control="surface"
      className={cn(control, closeGeometry)}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onNavigate();
      }}
    >
      <X className="size-5 pointer-events-none" aria-hidden="true" />
    </a>
  );
}

export function FieldClear({
  'aria-label': label = 'Auswahl leeren',
  ...props
}: Omit<ButtonPrimitive.Props, 'className' | 'style' | 'children'>) {
  return (
    <ButtonPrimitive
      {...props}
      aria-label={label}
      data-close-control="field"
      className={cn(
        control,
        'size-(--control-height-compact) border-0 bg-transparent text-muted-foreground',
      )}
    >
      <X className="size-4 pointer-events-none" aria-hidden="true" />
    </ButtonPrimitive>
  );
}

export function RemovableChip({
  children,
  ...props
}: Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      {...props}
      data-removable-chip
      className="inline-flex items-center gap-2 py-2 px-3 rounded-(--radius-control) border-(length:--border-structure) border-border bg-stage text-foreground text-(length:--type-ui)"
    >
      <span className="inline-flex items-center gap-2">{children}</span>
      {!props.disabled && <X className="size-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}

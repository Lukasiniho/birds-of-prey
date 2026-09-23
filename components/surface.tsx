import {
  createElement,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '@/lib/utils';

/** Geometry is owned here, including the primitive adapters in components/ui. */
export const surfaceStyles = {
  largePanel:
    'rounded-(--radius-surface-large) border-(length:--border-structure) border-border',
  panel:
    'rounded-(--radius-surface) border-(length:--border-structure) border-border',
  card: 'rounded-(--radius-card) border-(length:--border-structure) border-border',
  padding: {
    panel: 'p-panel',
    compact: 'p-panel-compact',
    hero: 'p-10 to-tablet:p-panel',
    none: '',
  },
  stack: 'flex flex-col gap-4 min-w-0 min-h-0',
  title:
    'font-(family-name:--font-stack-display) text-(length:--type-heading) font-(--weight-semibold) leading-(--leading-display)',
} as const;

type Padding = keyof typeof surfaceStyles.padding;
type BlockProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'aside' | 'main' | 'article';
  ref?: Ref<HTMLElement>;
};

export function Surface({
  as = 'section',
  kind = 'panel',
  padding,
  className,
  ...props
}: BlockProps & {
  kind?: 'panel' | 'largePanel' | 'card';
  padding?: Padding;
}) {
  return createElement(as, {
    ...props,
    'data-surface': kind,
    className: cn(
      'bg-background text-foreground min-w-0',
      surfaceStyles[kind],
      surfaceStyles.padding[padding ?? (kind === 'card' ? 'compact' : 'panel')],
      className,
    ),
  });
}

/** Actions occupy a real column; a wrapping title never needs reserved pixels. */
export function SurfaceHeader({
  children,
  actions,
  description,
  eyebrow,
  wrapActions = false,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  wrapActions?: boolean;
}) {
  return (
    <header
      {...props}
      data-surface-header
      className={cn(
        'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 shrink-0',
        wrapActions && 'to-tablet:grid-cols-1',
        className,
      )}
    >
      <div className="min-w-0 flex flex-col gap-2">
        <div className="min-w-0 flex flex-col gap-1">
          {eyebrow && (
            <span className="text-muted-foreground text-(length:--type-caption) font-(--weight-medium) tracking-(--tracking-caps) uppercase">
              {eyebrow}
            </span>
          )}
          <div className="min-w-0 flex flex-col gap-2">{children}</div>
        </div>
        {description}
      </div>
      {actions && (
        <div data-surface-actions className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}

export function SurfaceBody({
  as = 'div',
  padding = 'none',
  className,
  ...props
}: BlockProps & { padding?: Padding }) {
  return createElement(as, {
    ...props,
    'data-surface-body': '',
    className: cn('min-w-0 min-h-0', surfaceStyles.padding[padding], className),
  });
}

export function SurfaceFooter({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <footer
      {...props}
      data-surface-footer
      className={cn(
        'flex shrink-0 flex-wrap items-center justify-end gap-2 border-t-(length:--border-structure) pt-4',
        className,
      )}
    />
  );
}

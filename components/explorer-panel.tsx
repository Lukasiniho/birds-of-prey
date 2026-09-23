import type { ComponentProps, ReactNode } from 'react';
import {
  Surface,
  SurfaceBody,
  SurfaceHeader,
  surfaceStyles,
} from '@/components/surface';
import { DetailHeading } from '@/components/detail-text';
import { cn } from '@/lib/utils';

export function ExplorerPanel({
  className,
  ...props
}: ComponentProps<typeof Surface>) {
  return (
    <Surface
      {...props}
      as="div"
      padding="none"
      className={cn(
        'explorer-layout [--explorer-aside:350px] [--explorer-aside-compact:310px] grid grid-cols-[minmax(0,1fr)_var(--explorer-aside)] overflow-hidden [&[hidden]]:hidden to-compact:grid-cols-[minmax(0,1fr)_var(--explorer-aside-compact)] to-tablet:grid-cols-[minmax(0,1fr)]',
        className,
      )}
    />
  );
}

export function ExplorerStage({
  className,
  ...props
}: ComponentProps<typeof SurfaceBody>) {
  return (
    <SurfaceBody
      {...props}
      as="section"
      padding="panel"
      className={cn(surfaceStyles.stack, 'bg-stage relative', className)}
    />
  );
}

export function ExplorerHeader({
  title,
  eyebrow,
  actions,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <SurfaceHeader eyebrow={eyebrow} actions={actions} wrapActions>
      <DetailHeading>{title}</DetailHeading>
    </SurfaceHeader>
  );
}

export function ExplorerNotes({
  children,
  className,
  scrollKey,
  ...props
}: ComponentProps<typeof SurfaceBody> & { scrollKey?: string }) {
  const border =
    'border-l-(length:--border-structure) to-tablet:border-l-0 to-tablet:border-t-(length:--border-structure) bg-(--atlas-info-surface)';
  return scrollKey !== undefined ? (
    <aside {...props} className={cn('relative min-w-0', border, className)}>
      <SurfaceBody
        padding="panel"
        key={scrollKey}
        className="knowledge-notes-scroll to-tablet:static to-tablet:overflow-visible absolute inset-0 overflow-y-auto"
      >
        {children}
      </SurfaceBody>
    </aside>
  ) : (
    <SurfaceBody
      {...props}
      as="aside"
      padding="panel"
      className={cn(border, className)}
    >
      {children}
    </SurfaceBody>
  );
}

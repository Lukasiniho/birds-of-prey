import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Surface,
  SurfaceHeader,
  SurfaceBody,
  SurfaceFooter,
} from '@/components/surface';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <Surface
      as="div"
      kind="card"
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-4 overflow-hidden bg-card text-sm text-card-foreground',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const content: React.ReactNode[] = [];
  let actions: React.ReactNode;
  let description: React.ReactNode;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CardAction)
      actions = child;
    else if (React.isValidElement(child) && child.type === CardDescription)
      description = child;
    else content.push(child);
  });
  return (
    <SurfaceHeader
      data-slot="card-header"
      className={className}
      actions={actions}
      description={description}
      {...props}
    >
      {content}
    </SurfaceHeader>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <SurfaceBody data-slot="card-content" className={className} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <SurfaceFooter
      data-slot="card-footer"
      className={cn('justify-start', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

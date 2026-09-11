'use client';

import * as React from 'react';
import { isValidElement } from 'react';
import type { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { createLazyModule } from '@/lib/lazy-module';
import { cn } from '@/lib/utils';

// Wie beim Tooltip: erst im Leerlauf nach dem ersten Anblick.
const usePopoverPrimitive = createLazyModule(
  async () => (await import('@base-ui/react/popover')).Popover,
);

function Popover({ children, ...props }: PopoverPrimitive.Root.Props) {
  const primitive = usePopoverPrimitive();
  if (!primitive) return <>{children}</>;
  return (
    <primitive.Root data-slot="popover" {...props}>
      {children}
    </primitive.Root>
  );
}

function PopoverTrigger({ render, ...props }: PopoverPrimitive.Trigger.Props) {
  const primitive = usePopoverPrimitive();
  if (primitive)
    return (
      <primitive.Trigger data-slot="popover-trigger" render={render} {...props} />
    );
  if (isValidElement(render)) return render;
  return <button type="button" {...(props as React.ComponentProps<'button'>)} />;
}

function PopoverContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  const primitive = usePopoverPrimitive();
  if (!primitive) return null;
  return (
    <primitive.Portal>
      <primitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <primitive.Popup
          data-slot="popover-content"
          className={cn(
            'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 origin-(--transform-origin) outline-hidden',
            className,
          )}
          {...props}
        />
      </primitive.Positioner>
    </primitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-0.5 text-sm', className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  const primitive = usePopoverPrimitive();
  if (!primitive) return null;
  return (
    <primitive.Title
      data-slot="popover-title"
      className={cn('font-medium', className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  const primitive = usePopoverPrimitive();
  if (!primitive) return null;
  return (
    <primitive.Description
      data-slot="popover-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};

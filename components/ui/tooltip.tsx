'use client';

import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { createContext, isValidElement, useContext } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createLazyModule } from '@/lib/lazy-module';
import { cn } from '@/lib/utils';

// Base UI kommt erst nach dem ersten Anblick; bis dahin steht der Auslöser
// als schlichtes Element da und die Blase bleibt ungerendert.
const useTooltipPrimitive = createLazyModule(
  async () => (await import('@base-ui/react/tooltip')).Tooltip,
);

// Base UIs Verzögerung sitzt am Provider, und der lässt sich nicht nachträglich
// über die Seite legen, ohne ihren Baum neu zu mounten. Also merkt sich dieser
// Provider nur den Wert und jeder Tooltip legt sich seinen eigenen an.
const DelayContext = createContext(0);

function TooltipProvider({
  delay = 0,
  children,
}: {
  delay?: number;
  children: ReactNode;
}) {
  return <DelayContext.Provider value={delay}>{children}</DelayContext.Provider>;
}

function Tooltip({ children, ...props }: TooltipPrimitive.Root.Props) {
  const primitive = useTooltipPrimitive();
  const delay = useContext(DelayContext);
  if (!primitive) return <>{children}</>;
  return (
    <primitive.Provider delay={delay}>
      <primitive.Root data-slot="tooltip" {...props}>
        {children}
      </primitive.Root>
    </primitive.Provider>
  );
}

function TooltipTrigger({
  render,
  closeOnClick,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  const primitive = useTooltipPrimitive();
  if (primitive)
    return (
      <primitive.Trigger
        data-slot="tooltip-trigger"
        render={render}
        closeOnClick={closeOnClick}
        {...props}
      />
    );
  // Ohne Modul dieselbe Auszeichnung, nur ohne die Verdrahtung der Blase.
  // `render` als Funktion braucht deren Kontext und wartet darauf.
  if (isValidElement(render)) return render;
  return <button type="button" {...(props as React.ComponentProps<'button'>)} />;
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  variant = 'compact',
  ...props
}: TooltipPrimitive.Popup.Props & { variant?: 'compact' | 'detail' } & Pick<
    TooltipPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  const primitive = useTooltipPrimitive();
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
          data-slot="tooltip-content"
          data-variant={variant}
          className={cn('app-tooltip', className)}
          {...props}
        >
          <div className="app-tooltip-surface">{children}</div>
          <primitive.Arrow className="app-tooltip-arrow" />
        </primitive.Popup>
      </primitive.Positioner>
    </primitive.Portal>
  );
}

function TooltipHint({
  children,
  content,
}: {
  children: ReactElement;
  content: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipHint,
};

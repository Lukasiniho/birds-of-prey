import type { ComponentProps } from 'react';
import { Surface, SurfaceBody } from '@/components/surface';
import { cn } from '@/lib/utils';

/** The rail attaches to the page below the desktop split; only its free corners round. */
export function AtlasInfoPanel(props: ComponentProps<typeof Surface>) {
  return (
    <Surface
      {...props}
      as="aside"
      padding="none"
      className="info-panel overflow-x-hidden from-compact:h-[calc(100%-2*var(--atlas-gutter))] from-compact:my-(--atlas-gutter) from-compact:bg-(--atlas-info-surface) from-compact:relative from-compact:overflow-hidden to-compact:col-[1/-1] to-compact:rounded-none to-compact:border-x-0 to-compact:border-b-0 flex min-h-0 flex-col"
    />
  );
}

export function AtlasPanelBody({
  className,
  ...props
}: ComponentProps<typeof SurfaceBody>) {
  return (
    <SurfaceBody
      {...props}
      padding="panel"
      className={cn(
        'info-scroll from-compact:[scrollbar-width:thin] from-compact:[scrollbar-color:var(--border)_transparent] from-compact:flex-1 from-compact:overflow-y-auto from-compact:overscroll-contain from-compact:pb-(--rail-fade-height)',
        className,
      )}
    />
  );
}

export function SpecimenHeader(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className="specimen-heading to-phone:[--species-picker-size:34px] pt-panel px-panel to-phone:grid to-phone:grid-cols-[minmax(0,max-content)_var(--species-picker-size)] to-phone:items-start to-phone:justify-center to-phone:gap-x-1 to-phone:gap-y-0 justify-between gap-2 items-start z-2 relative block text-center"
    />
  );
}

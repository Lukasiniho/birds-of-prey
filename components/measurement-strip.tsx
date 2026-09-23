import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Stage width controls the columns; fixed rows reserve the largest label and
 * value so switching species cannot move the centred call button. */
export function MeasurementStrip({
  withAudio,
  children,
}: {
  withAudio: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-label="Größe und Gewicht"
      data-with-audio={withAudio}
      className={cn(
        'measurements specimen-measurements grid gap-0 shrink-0 self-center max-w-[760px] rounded-(--radius-surface) border-(length:--border-structure) border-(--line-tint) bg-(--atlas-measurement-surface) w-[calc(100%-56px)] mt-2 mx-[28px] py-[calc(var(--space-8)+5px)] to-phone:w-[calc(100%-40px)] to-phone:mx-5 to-phone:py-4 [&>div+div]:border-l-(length:--border-structure)',
        withAudio
          ? '[--call-column:minmax(88px,0.75fr)] stage-compact:[--call-column:68px] grid-cols-[repeat(3,minmax(0,1fr))_var(--call-column)] stage-small:grid-cols-[repeat(2,minmax(0,1fr))_var(--call-column)] grid-rows-[calc(var(--space-24)+var(--space-2)+var(--type-metric)*var(--leading-normal))] [&>.measurement-cell]:grid-rows-[var(--space-24)_minmax(0,1fr)] [&>.measurement-cell]:min-h-0 px-0 items-stretch'
          : 'grid-cols-3 to-phone:grid-cols-1 stage-small:grid-cols-2 px-3 to-phone:px-6 to-phone:[&>div+div]:border-l-0 to-phone:[&>div+div]:border-t-(length:--border-structure) to-phone:[&>div+div]:mt-[14px] to-phone:[&>div+div]:pt-[14px]',
      )}
    >
      {children}
    </section>
  );
}

import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** The quiz footer, start and results share one action-button size. */
export function QuizActionButton({
  appearance = 'primary',
  className,
  ...props
}: ComponentProps<typeof Button> & {
  appearance?: 'primary' | 'exit';
}) {
  return (
    <Button
      {...props}
      className={cn(
        'inline-flex items-center justify-center leading-(--leading-compact) gap-3 py-0 px-6 min-h-[3rem] h-[3rem] border-0 font-(--weight-medium) whitespace-nowrap',
        appearance === 'exit'
          ? 'q-desktop-exit w-auto to-tablet:hidden'
          : 'q-primary to-tablet:w-full',
        className,
      )}
    />
  );
}

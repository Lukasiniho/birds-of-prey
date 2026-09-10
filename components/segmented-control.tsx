'use client';

import { cn } from '@/lib/utils';
import { useSlidingPill } from '@/lib/use-sliding-pill';

/**
 * The one pill switch for "pick exactly one of these". It is a radio group,
 * not a tab list: the choices label no panel, they set a value. Tab lists stay
 * for the section tabs that really do swap panels (.t-tabs-line).
 * See docs/design-system.md → Tabs.
 */

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  /** Names the group for screen readers; pair it with a visible label. */
  label: string;
  /** Changing this snaps the pill instead of sliding it — a new subject. */
  group: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  /** Called on hover and focus, for prefetching what the choice will show. */
  onPreload?: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  label,
  group,
  value,
  options,
  onChange,
  onPreload,
  className,
}: SegmentedControlProps<T>) {
  const { barRef, pillRef } = useSlidingPill(group, value);
  return (
    <div
      className={cn('t-tabs', className)}
      role="radiogroup"
      aria-label={label}
      ref={barRef}
    >
      <span className="t-tabs-pill" aria-hidden="true" ref={pillRef} />
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          role="radio"
          className="t-tab"
          aria-checked={value === option.value}
          onPointerEnter={() => onPreload?.(option.value)}
          onFocus={() => onPreload?.(option.value)}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

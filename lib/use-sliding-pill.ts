'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * Measures the selected `.t-tab` and writes the pill's transform and width
 * inline so the transitions.dev tabs slide between measured positions.
 * The first paint and every change of `group` snap without animating.
 */
export function useSlidingPill(group: string, active: string) {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lastGroup = useRef<string | null>(null);
  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    function moveTo(animate: boolean) {
      const tab = bar!.querySelector<HTMLElement>(
        '.t-tab[aria-selected="true"], .t-tab[aria-pressed="true"]',
      );
      if (!tab) return;
      if (!animate) {
        const prev = pill!.style.transition;
        pill!.style.transition = 'none';
        pill!.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill!.style.width = `${tab.offsetWidth}px`;
        void pill!.offsetWidth;
        pill!.style.transition = prev;
      } else {
        pill!.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill!.style.width = `${tab.offsetWidth}px`;
      }
    }
    const firstPaint = lastGroup.current === null;
    moveTo(!firstPaint && lastGroup.current === group);
    lastGroup.current = group;
    const snap = () => moveTo(false);
    window.addEventListener('resize', snap);
    // Web fonts can land after the first measurement; re-snap once they do.
    if (firstPaint) document.fonts?.ready.then(snap).catch(() => {});
    return () => window.removeEventListener('resize', snap);
  }, [group, active]);
  return { barRef, pillRef };
}

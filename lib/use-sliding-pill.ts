'use client';

import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

/** The pill a `.t-tabs` bar currently marks, whatever role its items carry. */
const ACTIVE_TAB =
  '.t-tab:is([aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-active])';

/**
 * Gives a `.t-tabs` bar built from buttons the same keyboard model as the
 * Base UI tab lists: one tab stop for the group, arrow keys to move, Home and
 * End to jump, and activation on focus. Tab lists bring their own roving
 * focus, so the bar is left alone when it holds real tabs.
 */
function usePillKeys(barRef: RefObject<HTMLDivElement | null>) {
  // Runs after every render: the pill bars mount and unmount with the bird,
  // and re-rendering is also what changes aria-pressed, so this keeps the tab
  // stop on the pressed pill without watching the DOM for mutations.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || bar.querySelector('[role="tab"]')) return;
    const pills = [
      ...bar.querySelectorAll<HTMLElement>('.t-tab:not([disabled])'),
    ];
    if (pills.length === 0) return;
    const pressed = pills.findIndex((pill) => pill.matches(ACTIVE_TAB));
    // The pressed pill is the group's single tab stop, as in a tab list.
    pills.forEach((pill, index) => {
      pill.tabIndex = index === Math.max(pressed, 0) ? 0 : -1;
    });
    function onKeyDown(event: KeyboardEvent) {
      const current = (event.target as HTMLElement | null)?.closest('.t-tab');
      const index = current ? pills.indexOf(current as HTMLElement) : -1;
      if (index === -1) return;
      const step =
        event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? -1
            : 0;
      const next = step
        ? (index + step + pills.length) % pills.length
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? pills.length - 1
            : -1;
      if (next === -1) return;
      event.preventDefault();
      // Tab lists activate on arrow keys, so the button pills do too.
      pills[next].focus();
      pills[next].click();
    }
    bar.addEventListener('keydown', onKeyDown);
    return () => bar.removeEventListener('keydown', onKeyDown);
  });
}

/** Keyboard-navigable pill group without a sliding pill (the stage tabs). */
export function usePillGroup() {
  const barRef = useRef<HTMLDivElement>(null);
  usePillKeys(barRef);
  return barRef;
}

/**
 * Measures the selected `.t-tab` and writes the pill's transform and width
 * inline so the transitions.dev tabs slide between measured positions.
 * The first paint and every change of `group` snap without animating.
 */
export function useSlidingPill(group: string, active: string) {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lastGroup = useRef<string | null>(null);
  usePillKeys(barRef);
  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    function moveTo(animate: boolean) {
      const tab = bar!.querySelector<HTMLElement>(ACTIVE_TAB);
      if (!tab) return;
      pill!.dataset.measured = 'true';
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

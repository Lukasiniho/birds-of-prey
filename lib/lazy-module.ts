'use client';

import { useEffect, useSyncExternalStore } from 'react';

/**
 * Lädt ein Modul erst nach `load` im Leerlauf und gibt es danach synchron zurück.
 *
 * Es geht um Bandbreite: alles, was vor dem größten Bildinhalt über die Leitung
 * geht, verzögert ihn. Nicht beim ersten Hover, weil der Tausch den Auslöser im
 * Baum ersetzt — mitten in einer Geste kostet das den Fokus.
 */
export function createLazyModule<T>(load: () => Promise<T>) {
  let value: T | null = null;
  let started = false;
  const listeners = new Set<() => void>();

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function start() {
    if (started) return;
    started = true;
    const run = () => {
      void load().then((module) => {
        value = module;
        for (const listener of listeners) listener();
      });
    };
    const idle = () => {
      if ('requestIdleCallback' in window)
        window.requestIdleCallback(run, { timeout: 2000 });
      else setTimeout(run, 200);
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
  }

  return function useLazyModule(): T | null {
    useEffect(start, []);
    return useSyncExternalStore(
      subscribe,
      () => value,
      () => null,
    );
  };
}

'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  localePath,
  localize,
  translator,
  type Dictionary,
  type Locale,
  type Translate,
} from '@/lib/i18n';

declare global {
  interface Window {
    __I18N_EN__?: Dictionary;
  }
}
// Server: direkt importiert. Browser: aus /i18n-en.js, das die englische
// Layout-Datei vor der Hydrierung lädt (einmal gecacht statt in jeder Seite).
const ssrDict: Dictionary | undefined = (
  import.meta as { env?: { SSR?: boolean } }
).env?.SSR
  ? (await import('@/lib/i18n/en')).en
  : undefined;

const I18nContext = createContext<{ locale: Locale; t: Translate }>({
  locale: 'de',
  t: translator(null),
});

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo(() => {
    const dict =
      locale === 'de'
        ? undefined
        : typeof window === 'undefined'
          ? ssrDict
          : window.__I18N_EN__;
    return { locale, t: translator(dict) };
  }, [locale]);
  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const useLocale = () => useContext(I18nContext).locale;
export const useT = () => useContext(I18nContext).t;

/** Pfad mit Sprachpräfix der aktuellen Seite. */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => localePath(path, locale);
}

/** Übersetzt ein Datenobjekt einmal pro Sprache. */
export function useLocalized<T>(value: T): T {
  const { locale, t } = useContext(I18nContext);
  return useMemo(
    () => (locale === 'de' ? value : localize(value, t)),
    [value, locale, t],
  );
}

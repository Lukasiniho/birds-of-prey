/**
 * Zweisprachigkeit: Deutsch ist die Quellsprache und zugleich der Schlüssel.
 * `t('Vögel')` liefert auf Englisch den Eintrag aus `lib/i18n/en/*.json`,
 * sonst den deutschen Text. Platzhalter stehen als `{name}` im Schlüssel.
 */
import { SITE_URLS } from './site.ts';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = Record<string, string>;
export type TranslateParams = Record<string, string | number>;
export type Translate = (text: string, params?: TranslateParams) => string;

/** BCP-47-Tags für Zahlen, Sortierung und `<html lang>`. */
export const localeTags: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-GB',
};

/** Markiert einen Text zur Übersetzung, wo noch kein `t` greifbar ist. */
export const msg = <T extends string>(text: T) => text;

export function translator(dict: Dictionary | null | undefined): Translate {
  return (text, params) => {
    const out = dict?.[text] ?? text;
    return params
      ? out.replace(/\{(\w+)\}/g, (match, key: string) =>
          key in params ? String(params[key]) : match,
        )
      : out;
  };
}

// Kennungen, Pfade und wissenschaftliche Namen bleiben unübersetzt.
const fixedKeys = new Set([
  'id',
  'key',
  'href',
  'url',
  'src',
  'slug',
  'source',
  'sources',
  'image',
  'portrait',
  'latin',
  'licenseUrl',
]);

/** Übersetzt jeden Text eines Datenobjekts; Struktur und Zahlen bleiben. */
export function localize<T>(value: T, t: Translate, key = ''): T {
  if (typeof value === 'string')
    return (fixedKeys.has(key) ? value : t(value)) as T;
  if (Array.isArray(value))
    return value.map((item) => localize(item, t, key)) as T;
  if (value && typeof value === 'object' && value.constructor === Object)
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, t, k)]),
    ) as T;
  return value;
}

/**
 * Die Sprache, die dieser Build an der Wurzel ausliefert. Netlify baut zwei
 * Sites aus demselben Repo: `de` (greifvogelkompass.de) und `en`
 * (raptoratlas.com). Ohne Wert (lokal) liegt Englisch unter `/en`.
 */
export const siteLocale: Locale | undefined = (() => {
  try {
    const value = process.env.NEXT_PUBLIC_SITE_LOCALE;
    return value === 'de' || value === 'en' ? value : undefined;
  } catch {
    return undefined; // Browser ohne eingesetzten Wert.
  }
})();

/**
 * Englische URL-Wörter. Intern bleibt jede Adresse deutsch; `localePath`
 * übersetzt beim Schreiben, `germanPath` beim Lesen zurück. Übersetzt werden
 * Pfadsegmente, Query-Namen, Werte von `tab` und der Hash.
 */
const englishUrlWords: Record<string, string> = {
  wissen: 'knowledge',
  falknerei: 'falconry',
  steckbrief: 'profile',
  systematik: 'taxonomy',
  technik: 'technique',
  begriff: 'term',
  nahrung: 'diet',
  vorkommen: 'range',
  jagdtiere: 'prey',
  jagdtechniken: 'hunting-techniques',
  koerperbau: 'anatomy',
  glossar: 'glossary',
};
const germanUrlWords = Object.fromEntries(
  Object.entries(englishUrlWords).map(([de, en]) => [en, de]),
);

function translateUrl(url: string, words: Record<string, string>) {
  const word = (part: string) => words[part] ?? part;
  const [, path, query, hash] = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(url)!;
  let out = path.split('/').map(word).join('/');
  if (query) {
    const params = new URLSearchParams(query);
    const next = new URLSearchParams();
    for (const [key, value] of params)
      next.append(
        word(key),
        key === 'tab' || words[key] === 'tab' ? word(value) : value,
      );
    const text = next.toString();
    if (text) out += `?${text}`;
  }
  if (hash) out += `#${word(hash.slice(1))}`;
  return out;
}

/** Link to a page in a language: relative on its own site, absolute across domains. */
export function localePath(path: string, locale: Locale) {
  if (!path.startsWith('/')) return path;
  const url = locale === 'en' ? translateUrl(path, englishUrlWords) : path;
  if (siteLocale) return locale === siteLocale ? url : siteUrl(path, locale);
  if (locale === 'de') return url;
  return url === '/'
    ? '/en'
    : `/en${url.startsWith('/?') || url.startsWith('/#') ? url.slice(1) : url}`;
}

/**
 * Liest eine Adresse dieser Site in ihre deutsche Form zurück:
 * `/en/falco-peregrinus/profile` → `{ locale: 'en', path: '/falco-peregrinus/steckbrief' }`.
 */
export function splitLocalePath(path: string): {
  locale: Locale;
  path: string;
} {
  const match = /^\/en(?=[/?#]|$)/.exec(path);
  const locale = match ? 'en' : (siteLocale ?? 'de');
  const rest = match ? path.slice(3) || '/' : path;
  return {
    locale,
    path:
      locale === 'en'
        ? translateUrl(rest.startsWith('/') ? rest : `/${rest}`, germanUrlWords)
        : rest,
  };
}

/** Die aktuelle Adresse in deutscher Form, zum Auslesen von Pfad, Query und Hash. */
export function currentUrl() {
  const { pathname, search, hash, origin } = window.location;
  return new URL(splitLocalePath(pathname + search + hash).path, origin);
}

/** Öffentliche Adresse einer Seite auf der Domain ihrer Sprache. */
export function siteUrl(path: string, locale: Locale) {
  const url = locale === 'en' ? translateUrl(path, englishUrlWords) : path;
  return `${SITE_URLS[locale]}${url === '/' ? '' : url}`;
}

/** Canonical und hreflang für eine Seite und ihr Gegenstück in der anderen Sprache. */
export function languageAlternates(path: string, locale: Locale) {
  return {
    canonical: siteUrl(path, locale),
    languages: {
      de: siteUrl(path, 'de'),
      en: siteUrl(path, 'en'),
      'x-default': siteUrl(path, 'de'),
    },
  };
}

import { glossaryEntries, type GlossaryEntry } from './glossary.ts';
import { translator, type Locale, type Translate } from './i18n.ts';

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type Matcher = { terms: Map<string, GlossaryEntry>; pattern: RegExp };

function buildMatcher(locale: Locale, t: Translate): Matcher {
  const terms = new Map(
    glossaryEntries.flatMap((entry) =>
      [entry.term, ...(entry.aliases ?? [])].map(
        (term) => [t(term).toLocaleLowerCase(locale), entry] as const,
      ),
    ),
  );
  // Unicode boundaries prevent links inside compounds (e.g. Lauf in Verlauf).
  // Longest first: a specific term wins over one of its shorter alternatives.
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...terms.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join('|')})(?![\\p{L}\\p{N}_])`,
    'giu',
  );
  return { terms, pattern };
}

// One matcher per language, built on first use; `t` is stable per locale.
const matchers = new Map<Locale, Matcher>();

export type GlossaryPart = { text: string; id?: string; term?: string };
export function splitGlossaryText(
  text: string,
  seen = new Set<string>(),
  locale: Locale = 'de',
  t: Translate = translator(null),
): GlossaryPart[] {
  let matcher = matchers.get(locale);
  if (!matcher) matchers.set(locale, (matcher = buildMatcher(locale, t)));
  const parts: GlossaryPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(matcher.pattern)) {
    const entry = matcher.terms.get(match[0].toLocaleLowerCase(locale))!;
    if (seen.has(entry.id)) continue;
    if (match.index > cursor)
      parts.push({ text: text.slice(cursor, match.index) });
    parts.push({ text: match[0], id: entry.id, term: t(entry.term) });
    seen.add(entry.id);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts;
}

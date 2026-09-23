import { glossaryEntries } from './glossary.ts';

const terms = new Map(
  glossaryEntries.flatMap((entry) =>
    [entry.term, ...(entry.aliases ?? [])].map(
      (term) => [term.toLocaleLowerCase('de'), entry] as const,
    ),
  ),
);
const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Unicode boundaries prevent links inside compounds (e.g. Lauf in Verlauf).
// Longest first: a specific term wins over one of its shorter alternatives.
const pattern = new RegExp(
  `(?<![\\p{L}\\p{N}_])(${[...terms.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join('|')})(?![\\p{L}\\p{N}_])`,
  'giu',
);

export type GlossaryPart = { text: string; id?: string; term?: string };
export function splitGlossaryText(
  text: string,
  seen = new Set<string>(),
): GlossaryPart[] {
  const parts: GlossaryPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const entry = terms.get(match[0].toLocaleLowerCase('de'))!;
    if (seen.has(entry.id)) continue;
    if (match.index > cursor)
      parts.push({ text: text.slice(cursor, match.index) });
    parts.push({ text: match[0], id: entry.id, term: entry.term });
    seen.add(entry.id);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts;
}

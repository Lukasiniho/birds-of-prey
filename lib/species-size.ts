import { parseMeasurementRange } from './quiz-engine.ts';

type Measurements = { span: string; weight: string; unit: string };

/** Navigation classes, not biological/taxonomic categories. Both measurements count independently; the larger class wins.
 * Upper bounds alone are not treated as averages. */
export const sizeBuckets = [
  { id: 'size-xs', title: 'Sehr klein', spanBelow: 70, weightBelow: 200 },
  { id: 'size-s', title: 'Klein', spanBelow: 100, weightBelow: 750 },
  { id: 'size-m', title: 'Mittelgroß', spanBelow: 150, weightBelow: 2000 },
  { id: 'size-l', title: 'Groß', spanBelow: 210, weightBelow: 5000 },
  {
    id: 'size-xl',
    title: 'Sehr groß',
    spanBelow: Infinity,
    weightBelow: Infinity,
  },
] as const;

function representativeValue(text: string): number | undefined {
  if (/\b(?:bis|über|unter|mehr|weniger)\b|[<>≤≥]/i.test(text)) return;
  try {
    const [min, max] = parseMeasurementRange(text);
    if (min > 0) return (min + max) / 2;
  } catch {
    const single = text.trim().match(/^(?:ca\.?\s*)?(\d[\d.]*(?:,\d+)?)$/i);
    if (single) {
      const value = Number(single[1].replace(/\./g, '').replace(',', '.'));
      if (value > 0) return value;
    }
  }
}

export function sizeBucketFor(bird: Measurements) {
  const span = representativeValue(bird.span);
  const weight = representativeValue(bird.weight);
  const grams = weight !== undefined && ['g', 'kg'].includes(bird.unit)
    ? weight * (bird.unit === 'kg' ? 1000 : 1)
    : undefined;
  if (span === undefined && grams === undefined) return;
  // A heavy, short-winged species must not be classified as small.
  return sizeBuckets.find((bucket) =>
    (span === undefined || span < bucket.spanBelow) &&
    (grams === undefined || grams < bucket.weightBelow)
  )!;
}

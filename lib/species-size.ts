import { parseMeasurementRange } from './quiz-engine.ts';

type Measurements = { span: string; weight: string; unit: string };

/** Navigation classes, not biological/taxonomic categories. Upper bounds alone
 * are not treated as averages: use the weight fallback in that case. */
export const sizeBuckets = [
  { id: 'size-xs', title: 'Sehr klein', spanBelow: 80, weightBelow: 300 },
  { id: 'size-s', title: 'Klein', spanBelow: 120, weightBelow: 1000 },
  { id: 'size-m', title: 'Mittelgroß', spanBelow: 170, weightBelow: 2500 },
  { id: 'size-l', title: 'Groß', spanBelow: 220, weightBelow: 5000 },
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
  if (span !== undefined)
    return sizeBuckets.find((bucket) => span < bucket.spanBelow)!;
  const weight = representativeValue(bird.weight);
  if (weight === undefined || !['g', 'kg'].includes(bird.unit)) return;
  const grams = bird.unit === 'kg' ? weight * 1000 : weight;
  return sizeBuckets.find((bucket) => grams < bucket.weightBelow)!;
}

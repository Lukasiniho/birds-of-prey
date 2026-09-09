import { parseMeasurementRange } from './quiz-engine.ts';

type Measurements = { span: string; weight: string; unit: string };

/** Fixed mass classes: wingspan never promotes a light, long-winged bird. */
export const sizeBuckets = [
  { id: 'size-xs', title: 'Sehr klein', weightBelow: 200 },
  { id: 'size-s', title: 'Klein', weightBelow: 600 },
  { id: 'size-m', title: 'Mittelgroß', weightBelow: 2000 },
  { id: 'size-l', title: 'Groß', weightBelow: 5000 },
  { id: 'size-xl', title: 'Sehr groß', weightBelow: Infinity },
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
  const weight = representativeValue(bird.weight);
  if (weight === undefined || !['g', 'kg'].includes(bird.unit)) return;
  const grams = weight * (bird.unit === 'kg' ? 1000 : 1);
  return sizeBuckets.find(bucket => grams < bucket.weightBelow)!;
}

export function compareSizeWithinGroup(a: Measurements, b: Measurements) {
  return (representativeValue(a.span) ?? Infinity) -
    (representativeValue(b.span) ?? Infinity) || 0;
}

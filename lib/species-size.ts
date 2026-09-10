import type { MeasurementRange } from './birds.ts';

type Measurements = { span: MeasurementRange; weight: MeasurementRange };

/** Fixed mass classes: wingspan never promotes a light, long-winged bird. */
export const sizeBuckets = [
  { id: 'size-xs', title: 'Sehr klein', weightBelow: 200 },
  { id: 'size-s', title: 'Klein', weightBelow: 600 },
  { id: 'size-m', title: 'Mittelgroß', weightBelow: 2000 },
  { id: 'size-l', title: 'Groß', weightBelow: 5000 },
  { id: 'size-xl', title: 'Sehr groß', weightBelow: Infinity },
] as const;

function representativeValue([min, max]: MeasurementRange): number | undefined {
  if (!(min > 0) || !(max >= min)) return;
  return (min + max) / 2;
}

export function sizeBucketFor(bird: Measurements) {
  const grams = representativeValue(bird.weight);
  if (grams === undefined) return;
  return sizeBuckets.find(bucket => grams < bucket.weightBelow)!;
}

export function compareSizeWithinGroup(a: Measurements, b: Measurements) {
  return (representativeValue(a.span) ?? Infinity) -
    (representativeValue(b.span) ?? Infinity) || 0;
}

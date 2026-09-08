import { rangeMaps } from './range-maps.ts';
import { referenceRangeMaps } from './reference-range-maps.ts';
import type { DisplayRangeMapEntry } from './range-map-entry';

// Source adapters supply provenance; every entry uses the same SVG renderer.
export const displayRangeMaps: Partial<Record<string, DisplayRangeMapEntry>> = {
  ...Object.fromEntries(
    Object.entries(rangeMaps).flatMap(([id, entry]) =>
      entry
        ? [
            [
              id,
              {
                url: entry.url,
                label: 'Geschätztes Vorkommen',
                sourceName: 'iNaturalist',
                sourceUrl: entry.datasetUrl,
                license: 'CC BY',
                licenseUrl: entry.licenseUrl,
              },
            ],
          ]
        : [],
    ),
  ),
  ...referenceRangeMaps,
};

import type { ViewBox } from './range-map-data';

export type DisplayRangeMapEntry = {
  url: string;
  /** The range's own frame in basemap coordinates: where on Earth the species lives. */
  bounds: ViewBox;
  label: string;
  sourceName: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  note?: string;
};

# Distribution map pilot

The first published overlay is **Buteo jamaicensis / Rotschwanzbussard**.
The UI labels the layer “Geschätztes Vorkommen”: it is a modeled estimate,
not an expert-drawn boundary, a census, or a seasonal breeding map.

## Sources and attribution

- Range: iNaturalist Open Range Map Dataset, taxon 5212, geomodel 2.33,
  downloaded 2026-09-06 from the URL in `sources.json`. CC BY.
  Dataset and methods: https://www.inaturalist.org/pages/range_maps
- Basemap: Natural Earth 1:110m Admin 0 Countries, public domain.
  Download: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
  Terms: https://www.naturalearthdata.com/about/terms-of-use/
- Broad range cross-check: https://www.allaboutbirds.org/guide/Red-tailed_Hawk/maps-range

Retain attribution and the modeled-data label. Raw coordinates are stored here
for reproducibility. The build helper normalizes polygon winding, applies the
same Natural Earth projection to both datasets, and rounds SVG coordinates to
two decimals. Display clips overlays to the basemap's land outlines; coastal
boundaries are therefore generalized to the basemap resolution. Original
range polygons are not hand-drawn or edited.

Run `npm run maps:build` after deliberately reviewing a data update. Generated
JSON paths and the manifest are checked in so deployment needs no remote API,
credentials, or mapping service. Sources are not downloaded during the build.

## Review boundary

Other catalog species are intentionally not enabled yet. Available open-model
geometry alone is not sufficient validation: e.g. the Harris's hawk model
includes European areas outside its natural range. Keep those unpublished
until appropriate range data has been sourced and reviewed. No seasonal
categories are fabricated. `sources.json` is the explicit release allowlist.

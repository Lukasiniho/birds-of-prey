# Distribution map pilot

Published overlays: **Buteo jamaicensis / Rotschwanzbussard** (pilot, 2026-09-06),
**Haliaeetus leucocephalus / Weißkopfseeadler** and **Buteo regalis / Königsbussard**
(both reviewed and released 2026-09-07).
The UI labels the layer “Geschätztes Vorkommen”: it is a modeled estimate,
not an expert-drawn boundary, a census, or a seasonal breeding map.

## Sources and attribution

- Ranges: iNaturalist Open Range Map Dataset, geomodel 2.33, CC BY. Taxon 5212
  downloaded 2026-09-06; taxa 5305 and 5181 downloaded 2026-09-07. URLs,
  checksums and review records are in `sources.json`.
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

## Repeatable release checks

The release allowlist now records a download date, the SHA-256 of the **raw
file bytes**, dataset/license links, and an approved review with a date,
independent reference, notes, and longitude/latitude points expected inside
and outside the range. The pilot's approval/date are carried forward from the
original review above; the point checks are its existing regression fixtures,
not a new expert biological assessment. The dataset page states CC BY without
specifying a version, so the license link points to that declaration.

`npm run maps:build` validates all source reviews and raw inputs before writing
assets. It rejects missing approval, duplicate IDs, changed bytes, mismatched
taxonomy/model versions, invalid polygon coordinates and failed review points.
The build remains entirely offline. Adding a GeoJSON file by itself never
enables a map. Do not update a checksum merely to make the build pass: a changed
source requires a fresh review. Automated checks cannot establish biological
accuracy and do not replace visual comparison of the whole geometry.

The generated manifest supplies each map's data date and attribution links.
The compact preview retains “Geschätztes Vorkommen”; the expanded view links to
the dataset, license declaration, original download and independent comparison
map. Dates mean **download dates**, not field observation dates. Original and
comparison links are external references; the displayed geometry is always the
checked-in, checksum-pinned copy. Species without approved data retain their
textual distribution and show a brief unavailable-map message.

## Next species (not released)

See [REVIEW-QUEUE.md](REVIEW-QUEUE.md) for candidate sources and remaining work.
On 2026-09-07 the Weißkopfseeadler and Königsbussard candidates were downloaded,
reviewed against the Cornell range maps and released; their accepted model
deviations are recorded in the review notes in `sources.json`.

For each candidate:

1. Download the original GeoJSON outside the release allowlist. Record the URL,
   download date, source taxonomy, model version, license and raw-byte checksum.
2. Compare the **entire** range at regional and world scale with an independent
   ornithological source. Check remote islands, introduced/captive outliers,
   holes, missing core areas and antimeridian behavior; compare taxonomy too.
3. Document the review outcome and limitations. Reject material discrepancies;
   do not trim bad model polygons by hand or invent seasonal categories.
4. Only after approval, add the raw file and complete review record to
   `sources.json`. Include representative inside/outside regression points.
5. Run `npm run maps:build` and
   `node --experimental-strip-types --test tests/range-maps.test.ts`. Review the
   generated regional/world views and attribution before releasing the change.

The habitat tab now places distribution first, then habitat text and a compact
two-column gallery (one column below 250px of available panel width).

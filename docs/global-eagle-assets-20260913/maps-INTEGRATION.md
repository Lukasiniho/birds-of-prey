# Three eagle map additions — 2026-09-13

All files here are assets or JSON entry patches; the project checkout was not edited.

## Integrate

1. Copy `schreiadler.png`, `keilschwanzadler.png`, `philippinenadler.png` into `data/ranges/reference-originals/` (original downloaded bytes, also the authoring inputs).
2. Copy matching `.geojson` files into `data/ranges/reference-vectors/`.
3. Append the three array entries from `sources.json` to `data/ranges/reference-vectors/sources.json`.
4. Append the three array entries from `reference-sources.json` to `data/ranges/reference-sources.json`.
5. Merge object keys from `registrations.json` and `palettes.json` into the corresponding files under `data/ranges/reference-vectors/`.
6. Run `node scripts/build-reference-range-maps.mjs`. This generates `lib/reference-range-maps.ts` and public payloads; the generated additions already supplied under `public/maps/` and `reference-range-map-entries.json` are byte-identical to that builder. `lib/range-map-catalog.ts` spreads the reference manifest, so requires no manual change.
7. Add all three species to the bird catalog under the exact ids. Update the explicit count in `tests/reference-range-maps.test.ts` from 42 to 45 (or whichever final count matches the integration batch). Run the reference-map tests.

## Source attribution and map scope

- Schreiadler: Alexander Kürthy, BirdLife International / IUCN Red List (2016), published February 2019, IUCN map version 2018.2. CC BY-SA 3.0. Extracted the actual green breeding, cyan passage and blue nonbreeding filled contours. Fine printed country-border gaps remain (as for existing source adaptations); these are cartographic artifacts, not habitat exclusions.
- Keilschwanzadler: Alexander Kürthy, BirdLife International / IUCN Red List (2016), published July 2019, map version 2019.1. CC BY-SA 3.0. Extracted source green resident areas in Australia, Tasmania and source islands. No country shapes substituted.
- Philippinenadler: Kleomarlo, November 2008; Commons public-domain dedication. Extracted the actual teal illustrated areas, including eastern Luzon and Samar/Leyte/Mindanao. The gray western Luzon, Mindoro, Palawan, Cebu and other uncolored islands stay excluded. Lakes remain holes where the source colors exclude them. This is a generalized old illustration, clearly identified as such in the map note.

All Commons source URLs, license URLs, original-image SHA-256s, original dimensions and geometry SHA-256s are in the JSON patches. No live occurrence or modern survey precision is claimed.

## Registration and review

One inverse spherical Mercator projection plus global X/Y scale and translation per source. No local warping, biological edits, invented boundaries, annotation masks or country-polygon replacements. Geographic coastline was used only to fit the source-to-coordinate transform. The actual range shape comes exclusively from the source image's colored area.

The fit uses the repository's Natural Earth 1:50m land, with its file checksum embedded in registration. Odd interleaved coastline samples were withheld from fitting; nearby samples remain correlated. P90 residuals at normalized source width 1000 pixels:

| Species          | Native width | Coast P90 px/1000 |
| ---------------- | -----------: | ----------------: |
| Schreiadler      |         1858 |              3.90 |
| Keilschwanzadler |         3507 |              1.95 |
| Philippinenadler |         2000 |              1.76 |

All pass the <=6 pixel gate. Review images: `registration/*-overlay.png` draws the fitted Natural Earth coastline in red over the source; `*-extraction.png` shows reprojected extracted boundaries in magenta. Whole-source overlays and all three extraction images were visually inspected. Registration fitting was performed with the included `fit.py` and `fit-config.json`; `prepare.py` reproduces extraction using the unchanged project CLI.

The existing `validateReferenceSources`, `validateReferenceFeature`, `projectRange` functions all passed for the three additions, including hash pinning, source/license matching, coordinates and inside/outside fixtures. One initial test point exactly on a printed Schreiadler country-border gap was replaced with nearby interior Belarus (25E,54N); no geometry was changed to satisfy the test.

All source data are still original dated illustrations. Residuals measure cartographic agreement rather than accuracy of ornithological boundaries.

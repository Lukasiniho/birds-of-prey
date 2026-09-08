# Distribution maps

The app renders **all 35 catalog species** with one shared Natural Earth SVG basemap:
32 species from licensed, georeferenced reference illustrations,
and the three original reviewed American iNaturalist model overlays.
There is one renderer and one geographic-to-SVG projection, regardless of source.
No raster map is used by the UI. Missing or unavailable maps remain hidden.

## Architecture

- `world.geojson`: Natural Earth 1:50m country polygons, public domain.
- `scripts/map-projection.mjs`: common Natural Earth projection and viewport fit.
- `scripts/build-range-maps.mjs`: the three modeled American overlays.
- `scripts/build-reference-range-maps.mjs`: licensed reference-derived overlays.
- `lib/range-map-catalog.ts`: source metadata adapters for the common renderer.
- `components/range-map.tsx`: cached basemap plus per-species SVG paths, land clip,
  regional/world views and a compact attribution control inside the map.

`npm run maps:build` is completely offline and validates each allowlist before
writing its hash-named JSON paths. Deployment needs no map service, API or credentials.
The web bundle receives SVG geometry, not the original authoring illustrations.

## Sources

Natural Earth download:
https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
Terms: https://www.naturalearthdata.com/about/terms-of-use/

The finer 1:50m coastline keeps island and coastal species readable.
`basemap-sources.json` pins both this display source and the retained 1:110m
registration reference (`world-registration-110m.geojson`). The projection stays
identical; existing species overlays do not need new geographic coordinates.
Falklandkarakara has an explicitly bounded, closer camera view.

The American model inputs are pinned in `sources.json`: Rotschwanzbussard,
Weißkopfseeadler and Königsbussard. Dataset/methods and CC BY declaration:
https://www.inaturalist.org/pages/range_maps
Their label remains “Geschätztes Vorkommen”. They are modeled occurrence estimates,
not seasonal expert boundaries. The original geographic reviews and inside/outside
regression points remain in the allowlist. Winding conversion preserves source
coordinates and polygon holes; the display clips all overlays to shared land.

Reference source images, attribution and download checksums are recorded in
`reference-sources.json`; originals are authoring inputs under `reference-originals/`.
The derived GeoJSON, registration, adaptation notes, licenses and review records
are in `reference-vectors/`. See [conversion details](reference-vectors/README.md).
The label “Verbreitung” combines the current seasonal colors in each reference.
These are derived cartographic illustrations, not original expert GIS data or
live observations. Source age, taxonomy and generalized boundaries remain relevant.

## Review boundary

All 13 previously missing species were added on 2026-09-08: Wüstenbussard,
Steppenadler, Sekretär, Andenkondor, Kronenadler, Riesenseeadler, Gaukler, Aguja,
Falklandkarakara, Schopfkarakara, Harpyie, Kampfadler and Virginia-Uhu.
The catalog coverage test fails if a bird loses its map or an orphan map remains.

Both model and reference builds require explicit reviewed entries, pinned raw-byte
checksums, correct provenance, valid coordinates and passing geographic fixtures.
Reference conversion additionally records measured registration residuals and whole-map
comparisons. Automated tests do not establish biological currency or replace review.

The attempted European iNaturalist files were largely unsuitable: complete ranges
were compared against independent references, with major missing areas or overestimates
recorded in [the review queue](REVIEW-QUEUE.md). They were not trimmed by hand.

Run:

```sh
npm run maps:build
node --experimental-strip-types --test tests/range-maps.test.ts tests/reference-range-maps.test.ts
```

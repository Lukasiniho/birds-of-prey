# Reference vectors — 2026-09-08

32 catalog species (19 European and 13 additional species) are rendered as
separate SVG overlays over the same Natural Earth 1:50m base as the three modeled
American species. No source-image raster is sent
to the map component.

## What these files are

These are **georeferenced adaptations of licensed reference illustrations**, not
original ornithological GIS polygons. Commons source links, authors, licenses,
raw geometry checksums and review fixtures are in `sources.json`; the full image
provenance is in `../reference-sources.json`. Derived works retain the applicable CC BY-SA 2.5/3.0/4.0, CC0 or public-domain
terms recorded per source. Attribution is accessible from the map info button.

Current seasonal colors are combined into one total illustrated range; no seasonal
categories or observation dates are claimed. Historical/red areas and explicitly
uncertain pale-green areas are excluded. Black-kite and osprey source taxonomic
scope is disclosed in their map attribution. The stork is a schematic source.

## Geographic registration

Only one global projection and X/Y scale/translation were fitted for each image.
No local warping and no hand-drawn biological boundary correction was applied.
The inverse projection converts source contours to longitude/latitude; the common
build projects those coordinates into the app's Natural Earth coordinate system.

- 14 Alexander Kürthy maps: spherical Mercator. Coastline P90 residuals at 1000px
  source width: 1.05–3.39px. Independent inland-border P90: 0.74–5.25px.
- Rotmilan: Miller cylindrical. Held-out coast P90: 2.66px at 1000px.
- Weißstorch: Plate Carrée. Held-out coast P90: 1.51px at 1000px.
- Gerfalke: Robinson, fitted central meridian. Held-out coast P90: 4.96px at 1000px.
- Fischadler/Wanderfalke: Robinson; coast P95: 4.34/4.03px at 1200px.

All fitted parameters and checks are embedded in each GeoJSON. The 17 raster
registrations are also in `registrations.json`. These residuals measure agreement
between cartographic bases, not surveyed biological boundary accuracy. Source
coastline generalization and historical map dates still limit precision.

The release gate normally permits at most 6px of the recorded P90/P95 registration
metric at a normalized 1000px width; whole-map visual comparison is also required.
For legacy originals 200–500 pixels wide, an explicit two-native-pixel quantization
floor applies. It is used for Aguja: its 212px original has a measured P90 of 1.45
native pixels (6.83px/1000). The declared native width must match the pinned
feature registration. This accommodates source pixelation, not geographic warping.

## Extraction and adaptations

`scripts/vectorize-reference-map.py` is an optional authoring tool, requiring
numpy, OpenCV, pyproj and shapely. The deployment/build needs none of those packages.
Example, from the repository root:

```sh
python scripts/vectorize-reference-map.py \
  --image data/ranges/reference-originals/habicht.png \
  --registration data/ranges/reference-vectors/registrations.json \
  --id habicht \
  --palette data/ranges/reference-vectors/palettes.json \
  --output /tmp/habicht-review.geojson
```

The 17 raster adaptations classify saturated category hues, rejoin hairline printed
country-border gaps with a 3px morphological close, simplify contours by 0.45 source
pixels and omit components below 4 source pixels. This small-scale generalization
is documented in the feature properties. Holes and dateline topology are retained.
Gerfalke additionally removes separately reviewed thin blue annotation components
(maximum interior radius <=2.2 native pixels); all three substantial winter bands
remain. Stork migration arrows are excluded, not converted into range corridors.

Fischadler was extracted directly from the original filled SVG paths, sampled at
approximately 0.64px or finer at a 1200px reference width, preserving even-odd holes.
Wanderfalke retains the source's chromatic raster contours without smoothing;
white printed state-border gaps remain. Both use inverse Robinson latitude and
its linear longitude relationship before geographic dateline splitting.

Fine printed border/arrow gaps can remain in individual layers. They are graphic
artifacts, not claims of unoccupied narrow strips. Source polygons, derivatives,
licenses and original image checksums are retained for review and reproduction.


## Additional 13 sources — 2026-09-08

| Species | Inverse projection | P90 px at 1000 source px |
| --- | --- | ---: |
| Wüstenbussard | Robinson, central meridian 10° | 3.69 |
| Steppenadler | Mercator | 2.04 |
| Sekretär | Lambert azimuthal equal-area, 15°E / 0° | 1.54 |
| Andenkondor | Robinson, 10° | 3.00 |
| Kronenadler | Robinson, 10° | 2.57 |
| Riesenseeadler | Robinson, 10° | 4.90 |
| Gaukler | Robinson, 10° | 2.34 |
| Aguja | Robinson, 9° | 6.83 (1.45 native pixels) |
| Falklandkarakara | Plate Carrée | 4.50 |
| Schopfkarakara | Robinson, 10° | 1.85 |
| Harpyie | Robinson, 10° | 1.28 |
| Kampfadler | Robinson, 0° | 2.84 |
| Virginia-Uhu | Robinson, 10° | 5.33 |

Interleaved coastline samples were withheld from fitting; neighboring samples
remain correlated, so this is a cartographic residual rather than independent
survey accuracy. Wüstenbussard, Aguja, Virginia-Uhu and Falklandkarakara residuals
are measured in the recorded range-bearing geographic window, excluding irrelevant
high-Arctic or northern-continental coastline. The projection itself remains one
global transform. Plate Carrée for Falklandkarakara also agrees with straight
constant-latitude provincial borders in the source.

The displayed land now comes from 1:50m Natural Earth; the original 1:110m geometry
used for registration is retained separately, with pinned source checksums.

Extraction changes are explicit and reproducible in each registration:

- Riesenseeadler: combine breeding, resident and winter coastal bands. Exclude
  lavender vagrant areas and two ocean arrows. Narrow bands cannot locate exact
  city points; regression samples use mapped coastal land near the named places.
- Schopfkarakara: combine both living subspecies and their overlap. Exclude legend
  rectangles and the extinct Guadalupe caracara annotation.
- Harpyie: the encyclopedia source caption explicitly flags Trinidad and ABC
  island coverage as erroneous. Subtract Trinidad and Tobago using the shared
  1:50m land geometry (embedded as a reproducible exclusion); ABC islands are
  already absent after contour extraction.
- Virginia-Uhu: this reference excludes the separately recognized Magellanuhu.

SVG originals and rasterized authoring inputs are retained. PNG originals are
used at native dimensions except the 3507px Steppenadler, rendered to 1800px width
for authoring. All source and authoring checksums/paths are in
`../reference-sources.json`. The committed GeoJSON and offline map builds require
no image conversion or network access. The existing vectorization CLI reproduces
the new ranges using their authoring paths, registrations and palettes.

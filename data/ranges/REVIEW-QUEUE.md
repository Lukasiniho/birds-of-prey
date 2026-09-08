# Range review queue — 2026-09-07

These are research candidates, **not approvals**. This file is never consumed
by the build. No candidate below has downloadable geometry checked into the
release inputs yet.

Released on 2026-09-07 after review (see `sources.json`): Weißkopfseeadler
(taxon 5305) and Königsbussard (taxon 5181).

| Catalog species | Candidate taxonomy / geometry | Independent comparison | State |
| --- | --- | --- | --- |
| Wüstenbussard (`wuestenbussard`) | Harris's hawk model considered during the original pilot. | Obtain an appropriate independent reference and alternative licensed geometry. | Remains rejected: original pilot found modeled European areas outside the natural range. Do not enable the existing model without resolving this discrepancy. |

Candidate URLs follow the [iNaturalist dataset download scheme](https://www.inaturalist.org/pages/range_maps).
Availability and model versions have **not** been verified. Cornell/FWS pages
are comparison references only; no geometry is copied from them. Do not infer
approval from a matching name or a few passing point checks.


## European models reviewed 2026-09-08

The complete geometries were compared with the attributed range references in
`reference-sources.json`. The attempted raster-map UI was removed in favor of
one shared vector basemap. The records below are **not releases**.

- Bartgeier 2.33 passed the model screen; the final UI uses the derived reference
  geometry for this species as well. The temporary model release was removed.
- Habicht 2.32: substantial Central Asian gaps in the reference are filled.
- Mäusebussard 2.33: Iran/Central Asia overestimated, extra Madagascar range.
- Turmfalke 2.33: central Sahara gap filled.
- Steinadler 2.32: extensive northern Siberian reference area missing.
- Seeadler 2.20: eastern Siberian core and Asian winter areas missing.
- Kaiseradler 2.33: eastern Asian winter areas missing.
- Wespenbussard 2.33: Sahara/Central Asia overestimated, extra Madagascar.
- Uhu 2.33: substantial Central Asian/Siberian gaps.
- Schwarzmilan 2.33: Sahara/Tibet filled; reference includes yellow-billed kite.
- Rotmilan 2.33: continuous North African coastal area unsupported by the
  selected reference; UK/Ireland reintroductions are not a reason for rejection.
- Sakerfalke 2.33: much of African/Arabian winter range missing.
- Lannerfalke 2.33: Sahara overestimated, European range underrepresented.
- Baumfalke 2.33: India/Tibet overestimated, Sahel belt missing, extra Madagascar.
- Weißstorch 2.33: Sahara/Congo/Arabia filled between real seasonal ranges.
- Sperber 2.32: central Kazakhstan/Tibet gaps filled, East African strip shortened.
- Wanderfalke and Fischadler: versions 2.20–2.33 tried; none suitable. Global
  fills, Antarctic artifacts, absent core ranges, or major inland overestimates.
- Gerfalke: 2.22 best among candidates but substantial Siberian gaps remain;
  not released. Later versions contain severe global/polar artifacts.

These comparisons are release-screening decisions, not new expert range maps.
No rejected polygons were manually patched, trimmed, or labeled approved.

The final European layer uses georeferenced Commons reference illustrations,
not these rejected models. See `reference-vectors/README.md` for the completed
19-species conversion and its independently checked registration.


## Remaining catalog species — 2026-09-08

All 13 missing species now use licensed reference-derived geographic overlays.
Candidate iNaturalist 2.33 files were reviewed but none added to the model allowlist:

- Wüstenbussard included introduced/escaped occurrences in Europe and Australia.
- Steppenadler omitted most African winter range; Sekretär omitted western/northern
  sub-Saharan range. Harpyie omitted much of the northern historical reference range.
- Andenkondor, Falklandkarakara, Schopfkarakara and Virginia-Uhu included remote
  oceanic/high-latitude outliers; Riesenseeadler included American vagrancy.
- Kronenadler, Gaukler and Kampfadler differed substantially from the reference
  forest/savanna exclusions. Aguja's modeled Brazilian occurrence was fragmented
  relative to the generalized reference, so the reference was also used there.

Source illustrations, licenses, whole-map comparison records, registrations and
geographic fixtures are pinned under `reference-vectors/`. They remain generalized
illustrations with source-age limits, not newly surveyed expert GIS boundaries.

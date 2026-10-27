# Zwergadler – Bildvorschläge

Status: fünf Vorschläge zur späteren Nutzerfreigabe, nichts eingebunden. Ausschließlich bestehendes Porträt und die vorhandene Matrix hell/adult, hell/juvenil, dunkel/adult, dunkel/juvenil. `male` ist die bestehende Dateikonvention für adult, keine zusätzlich erzeugte Geschlechtsvariante.

AGENTS.md, docs/vogelbild-standard.md sowie beide festen Promptvorlagen gelesen. Aktive Quellen in lib/bird-images.ts, lib/portrait-images.ts und lib/morphs.ts geprüft. Keine Änderungen an public/, lib/, app/, tests/, docs/ oder Bildzuordnungen. Alle selbst geschriebenen Dateien liegen unter outputs/proposals/. Der eingebaute Imagegen-Dienst legt seine Rohbilder automatisch in seinem eigenen Cache ab; diese wurden anschließend in den Vorschlagsordner kopiert.

## Ergebnis und Prüfung

Alle Ausgaben: RGBA-PNG, 1254 × 1254. Sichtprüfung aller fünf Bilder auf #e8e8e4, #22282a und #2d7f7a bei 1254 px; zusätzlich Porträt bei den aktuellen UI-Rollen 64 und 48 px, Flugbilder bei 360 px. Keine sichtbaren grünen/weißen Freistellungssäume, Löcher im Gefieder oder abgeschnittenen Schnabel-, Flügel- oder Schwanzspitzen im finalen Prüfstand. Feine Halsfedern bleiben erhalten. Die endgültige gestalterische Freigabe liegt beim Nutzer.

Porträtraster: Augenmitte ungefähr (575, 400), also 31,9 % Höhe; unterster Alpha-Pixel y=1095, also 87,3 %. Mindestens 11,6 % Außenabstand; vollständiger geschlossener Hakenschnabel. Referenzvergleich in zwergadler-work/portrait-reference-check.png, einschließlich 64-/48-px-Ansicht. Kopfgröße, Augenhöhe und kurzer Halsansatz wurden visuell mit dem Habicht verglichen.

Flugrahmen: Altbestand x=91…1169, y=88…1146 (1079 × 1059); Vorschläge x=88…1173, y=92…1143 (1086 × 1052). Breite +0,65 %, Höhe −0,66 %, Mittelpunkt jeweils nur +0,5 px; alle Werte innerhalb 2 %. Die neue adulte Geometrie ersetzt die alte Geometrie. Zwischen den neuen Varianten gibt es keinerlei individuelle Rahmenanpassung.

Vor Alpha-Vereinheitlichung wurden die unbearbeiteten Variantenmasken und 50-%-Überlagerungen geprüft. Kopf, Auge, Schnabel, Flügelgelenke und Schwanzende zeigen keine sichtbare innere Verschiebung. Die Rohmasken deckten sich zu 99,40–99,60 % (IoU bei Alpha >127); Abweichungen lagen an der Antialias-Kante. Nach lokaler Kantenkorrektur ist der vollständige Alpha-Kanal jeder Flugvariante byteidentisch zum neuen adulten Original. Identischer Alpha allein war nicht das Abnahmekriterium: auch die inneren Strukturen wurden visuell kontrolliert.

- Vergleich Bestand/Vorschlag: `outputs/proposals/zwergadler-check.png`.
- Originalgroße Hintergrundprüfungen: `outputs/proposals/zwergadler-work/{id}-{light,dark,teal}.png`.
- Kleine Ansichten: `outputs/proposals/zwergadler-work/display-check.png` sowie einzelne Größen-PNGs.
- 50-%-Überlagerungen: `outputs/proposals/zwergadler-work/{juvenile,dunkel-male,dunkel-juvenile}-overlay.png`.
- Rohmaskendifferenzen: gleichnamige `-alpha-difference.png`; Rot = Original, Cyan = rohe Variantenmaske.
- Messwerte: `zwergadler-work/checks.json`, `variant-metrics.json`, `processing.json`.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png`: ausschließlich Porträtkomposition, Kopfgröße, Augenhöhe und kurzer Halsansatz.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich Rendering und natürlicher Federabschluss, keine Anatomie oder Farben.
- `public/birds/steinadler.png` und `public/birds/seeadler.png`: ausschließlich Flug-Rendering gemäß flight.md. In der ersten Generierung als Bildeingaben verwendet, beim Neuansatz nur zuvor geprüfte Stilreferenzen; niemals anatomische Vorlagen.
- `public/birds/zwergadler-20260913-v2.png`: aktive helle adulte Gefieder- und Kopf-Farbreferenz; Rahmenmessung. Nicht als verbindliche Fluggeometrie behandelt.
- Die jeweilige alte Variante: ausschließlich recherchierte Gefiedermerkmale; ergänzt durch die Zwergadler-Einträge in `lib/morphs.ts`.
- [Sylvain Uriot / Oiseaux.net, adultes Porträt syur219048](https://www.oiseaux.net/photos/sylvain.uriot/aigle.botte.3.html): echte Artanatomie, vollständiger Schnabel, Wachshaut, Iris und Kopfgefieder. Im Browser visuell geprüft, nicht lokal gespeichert und nicht als Imagegen-Bildeingabe angehängt.
- [Iranbirds, Zwergadler-Flugfoto](https://iranbirds.com/images/species/accipitriformes/hieraaetus-pennatus/gallery/wm/fb288536579db67c192019a53db75046.jpg): echte Flugunterseite mit plausiblen Schulteransätzen, Flügelgelenken und Verkürzung. Im Browser visuell geprüft, nicht lokal gespeichert und nicht als Imagegen-Bildeingabe angehängt.

## Lokale Verarbeitung

Python cv2, numpy und PIL waren nicht verfügbar. Node mit vorhandenem sharp verwendet. `process.mjs` adaptiert die Grün-Entmischung aus `docs/portrait-user-refinements-20260913/extract.py`: Alpha aus Grünüberschuss, größte zusammenhängende Vogelkomponente plus 2-px-Nachbarschaft, Hintergrund algebraisch aus RGB entmischt. Zusätzliche lokale Randfarbschätzung verwendet benachbarte deckende Federn. Es wurde weder Weiß noch Grau entfernt.

Das adulte Flugbild wurde einmal proportional in den bestehenden Rahmen gesetzt: ursprüngliche freigestellte Begrenzung 1168 × 1131; Ausgabe 1086 × 1052, links 88, oben 92. Rundung auf ganze Pixel; keine Rotation oder anatomische Verformung. Das Porträt wurde einheitlich auf 1166 × 1166 skaliert und bei (22,8) in die 1254er-Leinwand gesetzt, ohne den Hals separat zu stauchen.

Die Varianten gingen jeweils direkt vom festgelegten neuen adulten Original aus. Die grüne Eingabefassung `adult-original-green.png` ist dessen verlustfreie Komposition auf #00FF00. Es gab keine Variantenkette. Jede generierte Variante wurde separat durch Grün-Entmischung freigestellt. Nach geometrischer Überlagerungsprüfung wurde exakt das adulte Alpha eingesetzt; keine individuelle Skalierung oder Verschiebung. Der zunächst geprüfte allgemeine Helfer `scripts/restore-bird-alpha.mjs` wurde für die endgültige Kantenbehandlung durch `zwergadler-work/final-edges.mjs` ersetzt: lokale Farbverhältnisse aus deckenden Nachbarfedern, geglättete Schätzung, Übergang nur im schmalen Randbereich. Alpha, Federspitzen und RGB-Details im Inneren bleiben erhalten. Für das adulte Original wurden nachträglich 67 vereinzelte Restpixel mit Grünüberschuss in RGB neutralisiert, ohne Alpha- oder Geometrieänderung; das erklärt die geringe Farbabweichung gegenüber der zuvor gespeicherten grünen Variantenbasis. Die verworfenen lokalen Kantenversuche sind nicht Bestandteil der Enddateien.

Generierungsbudget: adult 4/4, Porträt 2/4, jede Variante 1/4. Alle neun Prompts enthalten die drei festen Blöcke wörtlich und in der vorgeschriebenen Reihenfolge; nur Art-/Auftrags-/Variantenblöcke wurden ergänzt.

## Nachweis je Ausgabedatei

### outputs/proposals/portraits/zwergadler.png

- Quelle: `public/birds/portrait-zwergadler-20260913-v2.png`
- Quellen-SHA256: `30ca1c1b84f2ea77dade7023f78d41264e1810833c01f629fc027e09df59d699`
- Ausgabe-SHA256: `0b2972b6e8cdeab13559b6290b9d54ea346a5289e0ba632d777d2dd2781cdb87`
- Alpha-SHA256: `e5c2aba5a51947faef5413f70ebc089d7ab6604396f54e7291c2f10047c18134`
- Finaler Prompt: `outputs/proposals/zwergadler-work/portrait-prompt-2.txt`; vollständig unten wiedergegeben.
- Gewähltes Rohbild: `outputs/proposals/zwergadler-work/portrait-generated-2.png`
- Ursprünglicher Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-4e7c8b72-64b9-44bf-a3b9-297198699f78.png`
- Referenzrollen: Habicht = Komposition; Gerfalke = Rendering/Federabschluss; aktive adulte Flugquelle = Kopffarben; Uriot-Foto = Artanatomie. Lokale Schritte: Grün-Entmischung, proportionaler Rasterabgleich, Randfarbkorrektur.
- Prüfergebnis: vollständige Silhouette, echtes Alpha, 3 Hintergründe in voller und Anzeigegröße geprüft; keine sichtbaren Freistellungsfehler im finalen Stand. Begrenzung: `{'left': 178, 'top': 145, 'width': 929, 'height': 951}`. Porträtraster visuell geprüft.

### outputs/proposals/flight/zwergadler/male.png

- Quelle: `public/birds/zwergadler-20260913-v2.png`
- Quellen-SHA256: `4ea5266beb301fa9fb5bde1345c5fddbbab8c165ef99f3fb55c7f9b14e59215f`
- Ausgabe-SHA256: `409279e50f0d3e19861947a67e46e61f748de90ae1897932a31fa5cd8b1ede9e`
- Alpha-SHA256: `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`
- Finaler Prompt: `outputs/proposals/zwergadler-work/flight-prompt-4.txt`; vollständig unten wiedergegeben.
- Gewähltes Rohbild: `outputs/proposals/zwergadler-work/flight-generated-4.png`
- Ursprünglicher Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-dfc64fbf-8abd-4b70-be09-15d996743b47.png`
- Referenzrollen: aktive adulte Quelle = Gefieder und Rahmen; Steinadler/Seeadler = Rendering; Iranbirds-Foto = Anatomie. Finale Generierung aus der vorherigen Entwicklungsstufe des neuen adulten Originals, nicht aus einer Morphe. Lokale Schritte: Grün-Entmischung, einmaliger proportionaler Rahmenabgleich, Restgrünkorrektur.
- Prüfergebnis: vollständige Silhouette, echtes Alpha, 3 Hintergründe in voller und Anzeigegröße geprüft; keine sichtbaren Freistellungsfehler im finalen Stand. Begrenzung: `{'left': 88, 'top': 92, 'width': 1086, 'height': 1052}`. Flugrahmen innerhalb 2 %, identischer finaler Alpha-Kanal.

### outputs/proposals/flight/zwergadler/juvenile.png

- Quelle: `public/birds/juvenile-zwergadler-20260913-v2.png`
- Quellen-SHA256: `7a96638c913b01ece52281609ebe2052342fe0b3f49fe4999a8fa62e2fe6deba`
- Ausgabe-SHA256: `2e3cc1562fee57fc862f8718ad37ce70911a4abcad42219fa791a1f6b3afeecb`
- Alpha-SHA256: `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`
- Finaler Prompt: `outputs/proposals/zwergadler-work/juvenile-prompt.txt`; vollständig unten wiedergegeben.
- Gewähltes Rohbild: `outputs/proposals/zwergadler-work/juvenile-generated-1.png`
- Ursprünglicher Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-d25d15db-491e-4c2f-846d-fbe80b088d3d.png`
- Referenzrollen: `outputs/proposals/zwergadler-work/adult-original-green.png` = einziges Bearbeitungsoriginal (SHA256 `829616f0573ffe884a6349d5fbf4e8c71d8a5413570d130cee2323af5332d1f2`); `public/birds/juvenile-zwergadler-20260913-v2.png` = nur Gefieder. Lokale Schritte: Grün-Entmischung, Overlay-Prüfung, Randfarbkorrektur, byteidentisches adultes Alpha; keine Skalierung/Positionierung. Rohmasken-IoU: 0.996033.
- Prüfergebnis: vollständige Silhouette, echtes Alpha, 3 Hintergründe in voller und Anzeigegröße geprüft; keine sichtbaren Freistellungsfehler im finalen Stand. Begrenzung: `{'left': 88, 'top': 92, 'width': 1086, 'height': 1052}`. Flugrahmen innerhalb 2 %, identischer finaler Alpha-Kanal.

### outputs/proposals/flight/zwergadler/dunkel-male.png

- Quelle: `public/birds/morph-zwergadler-dark-adult-20260913-v2.png`
- Quellen-SHA256: `7c20c86fe7b09fedfa382f54b04d15297b8b5b2a3a8092e1fd82c07e13594d37`
- Ausgabe-SHA256: `424b17bfab484f7032330f379703bc1821c606cd35943b87269517c22cc354fb`
- Alpha-SHA256: `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`
- Finaler Prompt: `outputs/proposals/zwergadler-work/dunkel-male-prompt.txt`; vollständig unten wiedergegeben.
- Gewähltes Rohbild: `outputs/proposals/zwergadler-work/dunkel-male-generated-1.png`
- Ursprünglicher Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-126509be-21cd-42fd-8294-8e10b3b3d977.png`
- Referenzrollen: `outputs/proposals/zwergadler-work/adult-original-green.png` = einziges Bearbeitungsoriginal (SHA256 `829616f0573ffe884a6349d5fbf4e8c71d8a5413570d130cee2323af5332d1f2`); `public/birds/morph-zwergadler-dark-adult-20260913-v2.png` = nur Gefieder. Lokale Schritte: Grün-Entmischung, Overlay-Prüfung, Randfarbkorrektur, byteidentisches adultes Alpha; keine Skalierung/Positionierung. Rohmasken-IoU: 0.994093.
- Prüfergebnis: vollständige Silhouette, echtes Alpha, 3 Hintergründe in voller und Anzeigegröße geprüft; keine sichtbaren Freistellungsfehler im finalen Stand. Begrenzung: `{'left': 88, 'top': 92, 'width': 1086, 'height': 1052}`. Flugrahmen innerhalb 2 %, identischer finaler Alpha-Kanal.

### outputs/proposals/flight/zwergadler/dunkel-juvenile.png

- Quelle: `public/birds/morph-zwergadler-dark-juvenile-20260913-v2.png`
- Quellen-SHA256: `37d5ffc487375adc91951767fde175ae168f1717fff286763b00a0c99e5dbd52`
- Ausgabe-SHA256: `a7c4c8f611c571df11941dd790ac49e06f61f1b5af1bf20b895e3929aa4753f7`
- Alpha-SHA256: `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`
- Finaler Prompt: `outputs/proposals/zwergadler-work/dunkel-juvenile-prompt.txt`; vollständig unten wiedergegeben.
- Gewähltes Rohbild: `outputs/proposals/zwergadler-work/dunkel-juvenile-generated-1.png`
- Ursprünglicher Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-d80fd984-74ba-4617-a109-1c1ec7bd27c3.png`
- Referenzrollen: `outputs/proposals/zwergadler-work/adult-original-green.png` = einziges Bearbeitungsoriginal (SHA256 `829616f0573ffe884a6349d5fbf4e8c71d8a5413570d130cee2323af5332d1f2`); `public/birds/morph-zwergadler-dark-juvenile-20260913-v2.png` = nur Gefieder. Lokale Schritte: Grün-Entmischung, Overlay-Prüfung, Randfarbkorrektur, byteidentisches adultes Alpha; keine Skalierung/Positionierung. Rohmasken-IoU: 0.994336.
- Prüfergebnis: vollständige Silhouette, echtes Alpha, 3 Hintergründe in voller und Anzeigegröße geprüft; keine sichtbaren Freistellungsfehler im finalen Stand. Begrenzung: `{'left': 88, 'top': 92, 'width': 1086, 'height': 1052}`. Flugrahmen innerhalb 2 %, identischer finaler Alpha-Kanal.

## Vollständige Prompts und Generierungsprotokoll

### flight-prompt.txt

Verworfen: zu nahe am gemalten Bestand. Referenzen: aktives adultes Flugbild, Steinadler, Seeadler.

Rohbild: `outputs/proposals/zwergadler-work/flight-generated-1.png`

Rohbild-SHA256: `d8b9f12b0f7c41fbf53057e25b3cc8a497980ae3c883dabfdcff5ccb5a8feb01`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-5b4acef0-6dda-4f5e-8b63-a4b44bd4412e.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Underside identity: creamy whitish body and underwing coverts contrasting with dark brown flight feathers; modest warmer streaking at throat, small pale shoulder lights, lighter grey-brown tail with subtle bands; compact warm buff-brown streaked head, dark brown iris, yellow cere, small dark hooked bill, feathered tarsi and tucked yellow feet. Broad near-parallel wing edges, six separated primary fingers, moderately long tail. Anatomy and proportions
from real photographs of this species only.
Task: NEW adult original replacing an overly painted old image. Input 1 is the current pale adult for plumage identity and framing only, never its old geometry or style. Inputs 2 and 3 are golden eagle and white-tailed eagle for soft feather rendering only, never anatomy or pose. Use natural Booted Eagle soaring anatomy seen from below, leftward head, wings diagonal bottom-left to top-right. Square canvas; all bird pixels within a bounding box approximately x=7.3% to 93.2%, y=7.0% to 91.4%. The bird must be visibly photographic, with natural fine feather texture, not visibly illustrated. No excessive carpal spots or exaggerated tail barring.
```

### flight-prompt-2.txt

Neue Generierung ohne Bildeingabe; plausible neue Fluggeometrie, Bänderung noch zu kräftig.

Rohbild: `outputs/proposals/zwergadler-work/flight-generated-2.png`

Rohbild-SHA256: `d228f0ba9881fec7f78a3e8a55d0f425f87f0491045b9f6772e7508409031501`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-311a02f3-7dbd-4f96-a7a5-fee44e69c2c4.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Underside identity: creamy whitish body and underwing coverts contrasting with dark brown flight feathers; modest warmer streaking at throat, small pale shoulder lights, lighter grey-brown tail with subtle bands; compact warm buff-brown streaked head, dark brown iris, yellow cere, small dark hooked bill, feathered tarsi and tucked yellow feet. Broad near-parallel wing edges, six separated primary fingers, moderately long tail. Anatomy and proportions
from real photographs of this species only.
Task: NEW standalone photographic replacement, a real living Booted Eagle in flight isolated on opaque solid chroma green RGB(0,255,0). Generate from scratch, do not preserve the painted old bird. Use natural soaring anatomy as in real underside photographs of Hieraaetus pennatus: straight extended wings with soft foreshortening, naturally compact head, subtle nonrepeating vane texture. Wings span diagonally lower left to upper right; full bird has bounding box x 7.3% to 93.2%, y 7.0% to 91.4% on a square canvas. Neutral overcast light. Soft creamy underwing coverts, nearly unmarked pale belly, dark flight feathers with subtle grey primary bases, no large dark carpal patches. This is a photograph, not a painting. No transparent background in this generation; the opaque green is required for local extraction.
```

### flight-prompt-3.txt

Direkte Bearbeitung von flight-generated-2.png: Bänderung korrigiert; helle Randbeleuchtung noch zu stark.

Rohbild: `outputs/proposals/zwergadler-work/flight-generated-3.png`

Rohbild-SHA256: `41a41f924970b511370e183ff1796d9a48c9395baa3c29582db9ce78748a599d`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-4e2d127c-d1a1-45f0-9beb-4dcb81b252ac.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Underside identity: creamy whitish body and underwing coverts contrasting with dark brown flight feathers; modest warmer streaking at throat, small pale shoulder lights, lighter grey-brown tail with subtle bands; compact warm buff-brown streaked head, dark brown iris, yellow cere, small dark hooked bill, feathered tarsi and tucked yellow feet. Broad near-parallel wing edges, six separated primary fingers, moderately long tail. Anatomy and proportions
from real photographs of this species only.
Task: Refine input image 1, the new adult pale morph original under development. Keep its plausible flight pose, head position, body, wings and overall silhouette. Correct only flight-feather pigmentation: all secondaries form a continuous almost solid dark chocolate brown trailing panel, WITHOUT pale transverse stripes. Outer primaries are blackish-brown with subtle greyish bases and only very faint barring. Underwing coverts remain creamy off-white with fine brown sparse flecks, no heavy dark carpal patch. Tail light grey-brown with only faint low-contrast narrow bars and a moderately darker terminal zone; remove the heavy buzzard-like broad white/dark bars. Keep the natural fine photographic soft feather rendering. Retain the opaque solid green #00FF00 background.
```

### flight-prompt-4.txt

Direkte Bearbeitung von flight-generated-3.png: Randbeleuchtung reduziert. Gewähltes adultes Original vor Freistellung und Rahmenanpassung.

Rohbild: `outputs/proposals/zwergadler-work/flight-generated-4.png`

Rohbild-SHA256: `88716c605d50c5e12cf6bda41dae2d801e3780bc7c5c9c1f4e33324f0f4e8504`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-dfc64fbf-8abd-4b70-be09-15d996743b47.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Underside identity: creamy whitish body and underwing coverts contrasting with dark brown flight feathers; modest warmer streaking at throat, small pale shoulder lights, lighter grey-brown tail with subtle bands; compact warm buff-brown streaked head, dark brown iris, yellow cere, small dark hooked bill, feathered tarsi and tucked yellow feet. Broad near-parallel wing edges, six separated primary fingers, moderately long tail. Anatomy and proportions
from real photographs of this species only.
Task: Final photographic lighting correction to input image 1, the new adult pale original. Preserve its exact pose, anatomy and accurate pale-morph plumage. REMOVE the artificial bright outline and pale rim lighting along the wing leading edges, dark secondary tips and tail tip: dark flight feathers must stay brown right to their soft natural edges, not outlined in ivory. Soft neutral overcast frontal illumination with no backlighting. Fine irregular natural feather vane texture, realistic detail without oily painted smoothing. Keep the opaque flat pure green #00FF00. Do not change silhouette or geometry.
```

### portrait-prompt.txt

Verworfen: Ausgabe trotz Grün-Anforderung mit problematischem Alpha/Farbrändern; nicht zur Freistellung verwendet. Eingaben: Habicht, Gerfalke, aktives adultes Flugbild.

Rohbild: `outputs/proposals/zwergadler-work/portrait-generated-1.png`

Rohbild-SHA256: `5e9185542cd5f061fe4b442672d17fc00346da74d8a7d6df9a34278559f93dde`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-43c0cc58-0be9-4f88-8f00-b797aadb5bdd.png`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Identity: compact eagle head, warm buff-brown dark-streaked crown, darker brown cheek, pale buff throat, dark brown iris, yellow cere and complete dark hooked closed bill. Anatomy from real photographs of this species only.
Task: NEW replacement portrait. Reference input 1 is composition only (goshawk); input 2 rendering and natural lower feather tips only (gyrfalcon); input 3 is current pale adult flight for head colours only. Preserve Booted Eagle anatomy, no falcon or goshawk anatomy. Fully intact hooked bill, correct slight three-quarter view and compact short neck. Eye at 32% canvas height and lowest feathers at 87%; keep bill and all feathers inside 8% margins.
```

### portrait-prompt-2.txt

Gewählte neue Porträtgenerierung ohne Bildeingabe; zuvor geprüfte Referenzen informierten den Art-/Auftragsblock.

Rohbild: `outputs/proposals/zwergadler-work/portrait-generated-2.png`

Rohbild-SHA256: `bff068e81457dc52b397361252285037aea629535bb6504608fae6f131e54f99`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-4e7c8b72-64b9-44bf-a3b9-297198699f78.png`

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult pale morph.
Identity: compact eagle head, warm buff-brown dark-streaked crown, darker brown cheek, pale buff throat, dark brown iris, yellow cere and complete dark hooked closed bill. Anatomy from real photographs of this species only.
Task: NEW standalone photographic replacement portrait from scratch, a real living Booted Eagle head isolated against opaque solid chroma green RGB(0,255,0). The bill must be completely present, naturally hooked and closed, with clear space around it. Compact short-necked head in slight three-quarter view. Fine matte feather strands, soft photographic shading, nothing illustrated. Eye centre y=32% and lowest feathers y=87%; no shoulders. Keep all pixels including the bill inside 8% margins. Do not create transparency in the generation: opaque green is required for local extraction.
```

### juvenile-prompt.txt

Direkte Bearbeitung von adult-original-green.png. Eingabe 2: public/birds/juvenile-zwergadler-20260913-v2.png, nur Gefiederreferenz.

Rohbild: `outputs/proposals/zwergadler-work/juvenile-generated-1.png`

Rohbild-SHA256: `5b8cae9128667368ad1fc7033552075a7481188442a40bd8fbb20cf4fc5aa5e4`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-d25d15db-491e-4c2f-846d-fbe80b088d3d.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), juvenile pale morph.
Underside identity: warmer cream-beige body and underwing coverts, subtle fresh pale feather edges, dark iris; retain the pale-versus-dark wing contrast and grey-brown tail, only modest warm buff shift from adult. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile pale morph: warmer cream-beige body and underwing coverts, subtle fresh pale feather edges, dark iris; retain the pale-versus-dark wing contrast and grey-brown tail, only modest warm buff shift from adult. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.
Task: Input 1 is the final new pale adult original on green; it is the sole edit target and geometry source. Input 2 is the former juvenile pale morph for researched plumage features only, never its old rendering or geometry. This must be a slight recolouring of image 1. Keep the head, eye, bill, every wing joint, each feather boundary and tail tip exactly in place on the 1254x1254 canvas. Maintain the photographic rendering and opaque uniform green #00FF00 background. Do not introduce rim lighting or pale outline.
```

### dunkel-male-prompt.txt

Direkte Bearbeitung von adult-original-green.png. Eingabe 2: public/birds/morph-zwergadler-dark-adult-20260913-v2.png, nur Gefiederreferenz.

Rohbild: `outputs/proposals/zwergadler-work/dunkel-male-generated-1.png`

Rohbild-SHA256: `57e217bf8684fe98b9ebddb3b7f1e6bad9b0a59cd8ccd91efb9bc26d4b3efa40`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-126509be-21cd-42fd-8294-8e10b3b3d977.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult dark morph.
Underside identity: chocolate-brown body, brown head and dark chocolate underwing coverts; slightly lighter grey-brown flight feathers, small pale shoulder lights, yellow cere and feet, brown iris, grey-brown tail with only faint bands. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to adult dark morph: chocolate-brown body, brown head and dark chocolate underwing coverts; slightly lighter grey-brown flight feathers, small pale shoulder lights, yellow cere and feet, brown iris, grey-brown tail with only faint bands. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.
Task: Input 1 is the final new pale adult original on green; it is the sole edit target and geometry source. Input 2 is the former adult dark morph for researched plumage features only, never its old rendering or geometry. This must be a slight recolouring of image 1. Keep the head, eye, bill, every wing joint, each feather boundary and tail tip exactly in place on the 1254x1254 canvas. Maintain the photographic rendering and opaque uniform green #00FF00 background. Do not introduce rim lighting or pale outline.
```

### dunkel-juvenile-prompt.txt

Direkte Bearbeitung von adult-original-green.png. Eingabe 2: public/birds/morph-zwergadler-dark-juvenile-20260913-v2.png, nur Gefiederreferenz.

Rohbild: `outputs/proposals/zwergadler-work/dunkel-juvenile-generated-1.png`

Rohbild-SHA256: `cb5c3120c67c6263ad4823c5b1efd2b8a6f9b8faa237b2ef99b33e0e5043d06f`

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6e2-7503-9cf5-1f302f55d3d9/exec-d80fd984-74ba-4617-a109-1c1ec7bd27c3.png`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), juvenile dark morph.
Underside identity: dark brown body, head and underwing coverts with subtly fresh pale ochre-buff edging to covert feathers, dark iris; lighter grey-brown flight feathers and tail, small pale shoulder lights, yellow cere and feet; maintain dark adult-like overall ground colour. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile dark morph: dark brown body, head and underwing coverts with subtly fresh pale ochre-buff edging to covert feathers, dark iris; lighter grey-brown flight feathers and tail, small pale shoulder lights, yellow cere and feet; maintain dark adult-like overall ground colour. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.
Task: Input 1 is the final new pale adult original on green; it is the sole edit target and geometry source. Input 2 is the former juvenile dark morph for researched plumage features only, never its old rendering or geometry. This must be a slight recolouring of image 1. Keep the head, eye, bill, every wing joint, each feather boundary and tail tip exactly in place on the 1254x1254 canvas. Maintain the photographic rendering and opaque uniform green #00FF00 background. Do not introduce rim lighting or pale outline.
```


## Round 2 dark morph

Status: ausschließlich die beiden bestehenden dunklen Varianten neu bearbeitet und unter ihren bisherigen Vorschlagspfaden ersetzt. Keine neuen Varianten, kein Eingriff in public/, lib/, app/, tests/ oder docs/. `male` ist weiterhin die bestehende Dateikonvention für adult. Die Ablehnung der Runde 1 wird durch diese Runde ersetzt; historische Prüfsummen oben beziehen sich auf die archivierte Runde 1. Jagdbild zuerst abgeschlossen, danach diese Runde.

Einzige Bearbeitungsbasis für beide Altersstufen und jeden Versuch: `outputs/proposals/flight/zwergadler/male.png`, SHA256 `409279e50f0d3e19861947a67e46e61f748de90ae1897932a31fa5cd8b1ede9e`. Das akzeptierte Original bleibt unverändert. In jedem Aufruf ist es Input 1. Keine Variantenkette. Vollständige vorhandene dunkle Matrix aus lib/morphs.ts: adult + juvenil, beide hier aktualisiert.

### Referenzrollen

- `public/birds/morph-zwergadler-dark-adult-20260913-v2.png` — Input 2, ausschließlich Farbton, Dunkelheit und Gefiedermuster; keine Pose/Geometrie und kein Rendering. SHA256 `7c20c86fe7b09fedfa382f54b04d15297b8b5b2a3a8092e1fd82c07e13594d37`.
- `public/birds/morph-zwergadler-dark-juvenile-20260913-v2.png` — Input 2, ausschließlich Farbton, Dunkelheit und Gefiedermuster; keine Pose/Geometrie und kein Rendering. SHA256 `37d5ffc487375adc91951767fde175ae168f1717fff286763b00a0c99e5dbd52`.
- `outputs/proposals/zwergadler-dark-round2/accepted-original-green.png` — Input 3 ausschließlich bei Versuch 2: exakt unskalierte Komposition desselben akzeptierten Originals auf #00FF00, keine weitere Vogelvorlage. SHA256 `766f346de0afe66988376a4c401edd7f8f707b6ecc722f1304dcbc8017427905`.
- `lib/morphs.ts`, Zwergadler/dunkel — fachliche Merkmale und vorhandene Farbrollen. Rendering und Anatomie stammen vom akzeptierten Original.

### Verarbeitung und Prüfung

Je Altersstufe zwei direkte Imagegen-Bearbeitungen des akzeptierten Originals. Versuch 1 wegen noch rötlichem Ton und sichtbarer Konturverschiebung (Rohmasken-IoU etwa 97 %) verworfen. Versuch 2 mit zusätzlicher geometrisch identischer Grün-Komposition als Kontrollreferenz gewählt. Beide finalen Rohbilder kamen trotz wörtlich enthaltenem Grünblock mit echtem Alpha zurück. Dieses vorhandene Alpha wurde geprüft; kein Weiß-/Grau-Key und keine fingierte Grün-Entmischung dieser bereits transparenten finalen Dateien. Die verworfenen Grünfassungen wurden mit dem vorhandenen process.mjs tatsächlich per Grün-Entmischung geprüft.

Vor Alpha-Wiederherstellung: 50-%-Überlagerungen und Rohmaskendifferenzen in voller Auflösung geprüft. Schnabel, Auge, Kopf, Flügelgelenke, Schwanz und Hauptfederpositionen visuell deckungsgleich; Restabweichungen an der generierten Kontur und Antialias-Pixeln. Rohmasken-IoU bei Alpha >127: adult 99.410 %, juvenil 98.750 %. Die IoU beschreibt nur die rohe Maske, nicht den Nachweis identischer innerer Bildstrukturen.

Final: exakter Alpha-Kanal des akzeptierten Originals übernommen. Keine Größenänderung, Translation, Rotation oder Verformung. Der zuerst geprüfte Standardhelfer restore-bird-alpha.mjs wurde wegen sichtbarer kopierter Randtextur nicht für den finalen Stand verwendet. `finish.mjs` beginnt erneut bei den unbearbeiteten finalen Rohbildern: Farbschätzung aus deckenden Nachbarn für schwach gedeckte Randpixel; im maximal 6 px breiten Randband lokale geglättete RGB-Verhältnisse zwischen Original und Variante auf die Original-Randtextur anwenden. Das verhindert helle/gefärbte Konturen, ohne die Silhouette oder innere Gefiederdetails zu verschieben. Rest-Grünüberschuss wird nur an RGB korrigiert, niemals durch Löschen neutraler Federn.

Alle sechs Vollansichten auf #e8e8e4, #22282a und #2d7f7a sowie 360-px-Ansichten und die finalen 50-%-Überlagerungen selbst visuell geprüft. Keine sichtbaren Freistellungssäume, Löcher oder abgeschnittenen Spitzen im finalen Prüfstand. Farbwirkung näher an den alten Referenzen: braun/schokoladenbraune Körper und Decken, graubraune hellere Schwungfedern, kleine helle Schulterflecken. Juvenil mit frisch hellen Deckfedersäumen. Endgültige gestalterische Freigabe durch den Nutzer bleibt offen.

Automatisch nachgewiesen: Leinwand 1254×1254; kompletter Alpha-Kanal byteidentisch zum Original, 0 abweichende Alpha-Pixel; identische Begrenzung x=88, y=92, 1086×1052. Pixelidentität ist für Alpha/Silhouette mathematisch geprüft; innere Pose/Federgeometrie wurde durch Überlagerung visuell geprüft, nicht durch einen unabhängigen pixelweisen Landmarken-Nachweis.

Prüfdateien: `outputs/proposals/zwergadler-dark-round2/final-check.png`, `*-final-overlay.png`, `*-raw-overlay-2.png`, `*-raw-alpha-difference-2.png`, `*-colour-comparison-2.png` (Alt / verworfene Runde 1 / roher Runde-2-Vorschlag). Vollansichten `*-{light,dark,teal}.png`, kleine Ansichten `*-360.png`. Reproduzierbare lokale Skripte: `finish.mjs`, `final-check.mjs`; Messwerte: `final-metrics.json`. Runde 1 als `*-rejected-round1.png` archiviert.

### dunkel-male

Ausgabe: `outputs/proposals/flight/zwergadler/dunkel-male.png`, SHA256 `71e8ed5e7e19419e9fd5d06a63be01b1f1a3f3740b75cae904ffbc6610ea75d0`. Alpha-SHA256 `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`. Grünüberschuss-Pixel: 0.

#### Versuch 1 – verworfen

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-ac3500e0-dea0-49e2-af56-125eed9727f2.png`.
Lokale Kopie: `outputs/proposals/zwergadler-dark-round2/dunkel-male-generated.png`, SHA256 `15e3495d2da5ef4926264f5d5303997480308d410677a95e39ae3541b9e1a9c7`. Exakter Prompt: `outputs/proposals/zwergadler-dark-round2/dunkel-male-prompt.txt`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult dark morph.
Underside identity: neutral deep chocolate-brown head, breast, belly and underwing coverts matching the hue and darkness of input 2 closely; slightly lighter muted grey-brown flight feathers and tail with subtle existing barring; the small pale shoulder spots remain. No red, rust, chestnut or copper cast; no pale cream belly or broad white covert panels. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to adult dark morph: neutral deep chocolate-brown head, breast, belly and underwing coverts matching the hue and darkness of input 2 closely; slightly lighter muted grey-brown flight feathers and tail with subtle existing barring; the small pale shoulder spots remain. No red, rust, chestnut or copper cast; no pale cream belly or broad white covert panels. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Input 1 is outputs/proposals/flight/zwergadler/male.png, the user-ACCEPTED new pale adult original. It is the ONLY EDIT BASE. Input 2 is the OLD adult dark morph, COLOUR AND PATTERN REFERENCE ONLY: match its neutral brown/chocolate hue, darkness, muted saturation and grey-brown flight feathers much more closely. Never use its old pose or painted rendering. This is a slight plumage-colour edit of image 1, not a new bird. Retain its exact photographic feather texture, all feather boundaries, head shape, eye and beak coordinates, joints, every feather tip, tucked feet, silhouette, pose, wings, tail, 1254x1254 canvas, scale and position pixel-identical. Do not resize, rotate, redraw the silhouette, move feathers, add rim lighting, or change lighting. Change cream body and cream underwing coverts to neutral dark chocolate brown. Do not reproduce the rejected reddish-brown colour. Keep yellow cere and feet. Preserve the subtle relative contrast with slightly paler, desaturated grey-brown flight feathers and tail. Background must be opaque flat #00FF00 for local green unmixing; no checkerboard. The old colour reference must not influence geometry or rendering.
```

#### Versuch 2 – final

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-7be74e79-dce0-448c-8975-8f362a24a4f6.png`.
Lokale Kopie: `outputs/proposals/zwergadler-dark-round2/dunkel-male-generated-2.png`, SHA256 `f9d128e132a0182c2818f005f39b417d71eef1c8dccd1301d9e4897f3aaa0121`. Exakter Prompt: `outputs/proposals/zwergadler-dark-round2/dunkel-male-prompt-2.txt`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), adult dark morph.
Underside identity: neutral deep chocolate-brown head, breast, belly and underwing coverts matching the hue and darkness of input 2 closely; slightly lighter muted grey-brown flight feathers and tail with subtle existing barring; the small pale shoulder spots remain. No red, rust, chestnut or copper cast; no pale cream belly or broad white covert panels. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to adult dark morph: neutral deep chocolate-brown head, breast, belly and underwing coverts matching the hue and darkness of input 2 closely; slightly lighter muted grey-brown flight feathers and tail with subtle existing barring; the small pale shoulder spots remain. No red, rust, chestnut or copper cast; no pale cream belly or broad white covert panels. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Input 1 is outputs/proposals/flight/zwergadler/male.png, the user-ACCEPTED new pale adult original. It is the ONLY EDIT BASE. Input 2 is the OLD adult dark morph, COLOUR AND PATTERN REFERENCE ONLY: match its neutral brown/chocolate hue, darkness, muted saturation and grey-brown flight feathers much more closely. Never use its old pose or painted rendering. This is a slight plumage-colour edit of image 1, not a new bird. Retain its exact photographic feather texture, all feather boundaries, head shape, eye and beak coordinates, joints, every feather tip, tucked feet, silhouette, pose, wings, tail, 1254x1254 canvas, scale and position pixel-identical. Do not resize, rotate, redraw the silhouette, move feathers, add rim lighting, or change lighting. Change cream body and cream underwing coverts to neutral dark chocolate brown. Do not reproduce the rejected reddish-brown colour. Keep yellow cere and feet. Preserve the subtle relative contrast with slightly paler, desaturated grey-brown flight feathers and tail. Background must be opaque flat #00FF00 for local green unmixing; no checkerboard. The old colour reference must not influence geometry or rendering.

STRICT CORRECTION: Input 3 is an EXACT unscaled compositing of input 1 onto pure green, not a different bird. Use this to preserve every contour coordinate and avoid any silhouette expansion when replacing transparency. All colour edits must be locked to the geometry of input 1. Do not redraw, broaden or shift flight feathers. Retain feather tips at their exact original coordinates. Hue priority: match input 2 neutral umber-brown, not reddish mahogany. The current proposal remains too red: dark body midtones should have neutral earthy chocolate/umber hue with reference palette #493326 for adult dark areas and #57412E for juvenile dark areas, lighter desaturated grey-brown #948878 feathers. No pink, mauve, red, orange or copper cast in the brown. The dark coverts/body must be visibly darker than the flight feathers. Do not add bright rims to dark feather tips; preserve original lighting. This is precision recolouring of the approved original, with original texture retained.
```

### dunkel-juvenile

Ausgabe: `outputs/proposals/flight/zwergadler/dunkel-juvenile.png`, SHA256 `97ff05ff88989b3009998bb2e8327086be78c90f3f1956806491d673026a7503`. Alpha-SHA256 `34a8514a353e422eb1bd9616d412c07f31fd10e6b41fdf2ba2fec455a7317b47`. Grünüberschuss-Pixel: 0.

#### Versuch 1 – verworfen

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-4cb93daa-4c25-4cc0-989d-154634f0e4e6.png`.
Lokale Kopie: `outputs/proposals/zwergadler-dark-round2/dunkel-juvenile-generated.png`, SHA256 `5adc0243697873f2d1a984f6f43cc6f8905069ea263478729ffa96468dd441f6`. Exakter Prompt: `outputs/proposals/zwergadler-dark-round2/dunkel-juvenile-prompt.txt`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), juvenile dark morph.
Underside identity: neutral dark brown head, breast, belly and underwing coverts matching input 2 closely; fresh narrow subdued beige feather edges on the coverts, dark iris, slightly lighter muted grey-brown flight feathers and tail, small pale shoulder spots. Overall ground colour remains dark chocolate brown like the adult, never orange, rufous, rust-red, cinnamon or copper. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile dark morph: neutral dark brown head, breast, belly and underwing coverts matching input 2 closely; fresh narrow subdued beige feather edges on the coverts, dark iris, slightly lighter muted grey-brown flight feathers and tail, small pale shoulder spots. Overall ground colour remains dark chocolate brown like the adult, never orange, rufous, rust-red, cinnamon or copper. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Input 1 is outputs/proposals/flight/zwergadler/male.png, the user-ACCEPTED new pale adult original. It is the ONLY EDIT BASE. Input 2 is the OLD juvenile dark morph, COLOUR AND PATTERN REFERENCE ONLY: match its neutral brown/chocolate hue, darkness, muted saturation and grey-brown flight feathers much more closely. Never use its old pose or painted rendering. This is a slight plumage-colour edit of image 1, not a new bird. Retain its exact photographic feather texture, all feather boundaries, head shape, eye and beak coordinates, joints, every feather tip, tucked feet, silhouette, pose, wings, tail, 1254x1254 canvas, scale and position pixel-identical. Do not resize, rotate, redraw the silhouette, move feathers, add rim lighting, or change lighting. Change cream body and cream underwing coverts to neutral dark chocolate brown. Do not reproduce the rejected reddish-brown colour. Keep yellow cere and feet. Preserve the subtle relative contrast with slightly paler, desaturated grey-brown flight feathers and tail. Background must be opaque flat #00FF00 for local green unmixing; no checkerboard. The old colour reference must not influence geometry or rendering.
```

#### Versuch 2 – final

Dienstpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c393-79b0-a294-585669ebc32a/exec-bdcec84d-d717-4e09-8b3d-00e88479eacc.png`.
Lokale Kopie: `outputs/proposals/zwergadler-dark-round2/dunkel-juvenile-generated-2.png`, SHA256 `00c61f719b59685e560cd8d6615781753e159637685754cdebe244cd7e9b27a2`. Exakter Prompt: `outputs/proposals/zwergadler-dark-round2/dunkel-juvenile-prompt-2.txt`.

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Booted Eagle (Hieraaetus pennatus), juvenile dark morph.
Underside identity: neutral dark brown head, breast, belly and underwing coverts matching input 2 closely; fresh narrow subdued beige feather edges on the coverts, dark iris, slightly lighter muted grey-brown flight feathers and tail, small pale shoulder spots. Overall ground colour remains dark chocolate brown like the adult, never orange, rufous, rust-red, cinnamon or copper. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile dark morph: neutral dark brown head, breast, belly and underwing coverts matching input 2 closely; fresh narrow subdued beige feather edges on the coverts, dark iris, slightly lighter muted grey-brown flight feathers and tail, small pale shoulder spots. Overall ground colour remains dark chocolate brown like the adult, never orange, rufous, rust-red, cinnamon or copper. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Input 1 is outputs/proposals/flight/zwergadler/male.png, the user-ACCEPTED new pale adult original. It is the ONLY EDIT BASE. Input 2 is the OLD juvenile dark morph, COLOUR AND PATTERN REFERENCE ONLY: match its neutral brown/chocolate hue, darkness, muted saturation and grey-brown flight feathers much more closely. Never use its old pose or painted rendering. This is a slight plumage-colour edit of image 1, not a new bird. Retain its exact photographic feather texture, all feather boundaries, head shape, eye and beak coordinates, joints, every feather tip, tucked feet, silhouette, pose, wings, tail, 1254x1254 canvas, scale and position pixel-identical. Do not resize, rotate, redraw the silhouette, move feathers, add rim lighting, or change lighting. Change cream body and cream underwing coverts to neutral dark chocolate brown. Do not reproduce the rejected reddish-brown colour. Keep yellow cere and feet. Preserve the subtle relative contrast with slightly paler, desaturated grey-brown flight feathers and tail. Background must be opaque flat #00FF00 for local green unmixing; no checkerboard. The old colour reference must not influence geometry or rendering.

STRICT CORRECTION: Input 3 is an EXACT unscaled compositing of input 1 onto pure green, not a different bird. Use this to preserve every contour coordinate and avoid any silhouette expansion when replacing transparency. All colour edits must be locked to the geometry of input 1. Do not redraw, broaden or shift flight feathers. Retain feather tips at their exact original coordinates. Hue priority: match input 2 neutral umber-brown, not reddish mahogany. The current proposal remains too red: dark body midtones should have neutral earthy chocolate/umber hue with reference palette #493326 for adult dark areas and #57412E for juvenile dark areas, lighter desaturated grey-brown #948878 feathers. No pink, mauve, red, orange or copper cast in the brown. The dark coverts/body must be visibly darker than the flight feathers. Do not add bright rims to dark feather tips; preserve original lighting. This is precision recolouring of the approved original, with original texture retained.
```


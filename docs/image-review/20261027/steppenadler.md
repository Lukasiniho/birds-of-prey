# Steppenadler – Bildvorschläge, keine Einbindung
Stand: 26.10.2026. Verbindlich gelesen: `AGENTS.md`, `docs/vogelbild-standard.md`, beide festen Promptvorlagen und `docs/portrait-user-refinements-20260913/extract.py`. Imagegen-Skill verwendet; ausschließlich eingebautes `image_gen`, kein API-/CLI-Fallback.

**Status: Vorschläge mit offenen Abnahmepunkten.** Drei RGBA-Dateien vorhanden. Technische Transparenz-, Leinwand- und Rahmenprüfungen bestanden. Flugstil noch teilweise illustrativ; vollständige innere Pixeldeckung der Flugvariante nicht belegt. Nicht als uneingeschränkt bestandene Überarbeitung einbinden. Die vom Nutzer gesetzte Grenze wurde eingehalten: Porträt 2, Adult 4, Jungvogel 4 Generierungen.

Alle selbst angelegten Projektdateien liegen unter `outputs/proposals/`; `public/`, `lib/`, `app/`, `tests/`, `docs/` und Zuordnungen wurden nicht verändert. Der Bilddienst speichert automatisch zusätzlich im unten dokumentierten eigenen Generierungscache; diese Rohdateien wurden in den Vorschlagsordner kopiert. Es erfolgte keine Produktintegration und kein WebP-Build.

Aktive Bestandsmatrix anhand `lib/bird-images.ts:86–87` und `lib/portrait-images.ts:47`: normales adultes Flugbild, vorhandener Jungvogel, ein Porträt. Keine zusätzliche Geschlechtsvariante oder Morphe. Der angeforderte Name `male.png` bezeichnet hier das normale adulte Original; kein zusätzlich erfundenes männliches Erscheinungsbild.

Vergleich: [steppenadler-check.png](steppenadler-check.png). Ergänzend [Darstellungsgrößen](steppenadler-work/display-sizes.png), [50-%-Überlagerung](steppenadler-work/final-overlay.png), [Alpha-Vergleich](steppenadler-work/final-alpha.png), [Messdaten](steppenadler-work/qa.json). Die Kontrolle erfolgte an exportierten Ansichten; keine Produktzuordnung wurde dafür geändert.

## Anatomische Fotoreferenz

[Steppe eagle (Aquila nipalensis), Sepand Bakhtiari, 18.03.2015](https://commons.wikimedia.org/wiki/File:Steppe_eagle_(Aquila_nipalensis).jpg), [direktes Foto](https://upload.wikimedia.org/wikipedia/commons/b/b3/Steppe_eagle_%28Aquila_nipalensis%29.jpg). Im Browser sichtbar geprüft: Unterflügel, durchgehender Körper, Schulterverbindungen, Primärfinger, Flügelproportionen und räumliche Verkürzung. Das Foto zeigt einen jüngeren Vogel und diente nur der Anatomieprüfung, nicht der adulten Gefiederfarbe. Keine lokale Fotodatei gespeichert: Der Download war nicht möglich bzw. wurde verweigert; nach der Browser-Verweigerung kein weiterer Downloadversuch. Kein Foto-Pixelmaterial in die Ausgabe montiert.

## Lokale Verarbeitung

Python-PIL/cv2 nicht verfügbar; deshalb Node mit vorhandenem `sharp`. Grün-Entmischung nach dem dokumentierten Verfahren: Hintergrundfarbe als Randmedian, Alpha aus Grünüberschuss, nahe neutrale/weiße Federfarben nicht ausgekeyt, größte zusammenhängende Vogelfläche mit kleinem Rand behalten, Hintergrundanteil aus RGB herausgerechnet. Teiltransparente Randpixel zusätzlich mit lokaler unverunreinigter Federfarbe geschätzt. Ausschließlich schmaler Randfarbenausgleich, keine pauschale Weiß-/Grau-Entfernung.

Skripte: `steppenadler-work/process.cjs`, `edge-finish.cjs`, `compare.cjs`, `qa.cjs`; bestehendes `scripts/restore-bird-alpha.mjs` nur ausgeführt, nicht geändert. Automatische Prüfausführung: `node outputs/proposals/steppenadler-work/qa.cjs` und `node outputs/proposals/steppenadler-work/compare.cjs outputs/proposals/flight/steppenadler/juvenile.png final`. Die ersten drei festen Promptblöcke jedes gespeicherten Generierungsprompts wurden zusätzlich wörtlich und in Reihenfolge gegen die Vorlagen geprüft.

## Portrait: `outputs/proposals/portraits/steppenadler.png`

Quelle: `public/birds/portrait-steppenadler-20260913-v2.png`

Quell-SHA256: `6b06326c6983e2f2f208577a9fb416a7053a2c6830ccad868a04cf926f5d1677`

Ausgabe-SHA256: `bac81886b65ab7158d06f4baa26d77e9a62704df555d3baeb1117d441ef09364`

Format: RGBA PNG, 1254 × 1254. Alpha > 0,5: `[105, 154, 1156, 1161]`; gesamte sichtbare Alpha-Begrenzung: `[101, 150, 1157, 1163]`.

Referenzen und Rollen:
- `public/birds/portrait-steppenadler-20260913-v2.png` — Bearbeitungsziel/artspezifische Identität; SHA256 `6b06326c6983e2f2f208577a9fb416a7053a2c6830ccad868a04cf926f5d1677`.
- `public/birds/portrait-habicht-20260912.png` — nur Komposition; SHA256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png` — nur Rendering und Federabschluss; SHA256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.

Gewählte Rohgenerierung: `outputs/proposals/steppenadler-work/portrait-generated-2.png`; SHA256 `ab299b021ecaf5aa74e366c6c6a8dd75e61c5f9cd8012601ff3c4b8fb4a55058`. Automatischer Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-6ad77ca1-34ff-4ba9-9dde-6397b2a27367.png`.

Lokale Schritte: Originalleinwand einheitlich von 1314 auf die verlangten 1254 px verkleinert. Generierung 2 auf Grün freigestellt. Nur den Bereich ab y=930 übernommen; sanfter, premultiplizierter Übergang bis y=985 innerhalb des Gefieders. Oberhalb y=930 Originalpixel unverändert. Kein Stauchen oder Strecken des Halses. Randfarbenkorrektur nur im unteren Bereich; übrige grüne Verunreinigung dort über den Grünkanal begrenzt (`G <= 0.55 R + 0.45 B` bei messbarem Überschuss), Alpha unverändert. Helle Federn nicht gelöscht.

Prüfergebnis: Zweiter Entwurf gewählt. Unterer Abschluss mit unregelmäßig überlappenden, vollständig sichtbaren Federspitzen; kein gerader Schnitt. Kopf, Auge und Schnabel sind nach der einheitlichen Leinwandverkleinerung bis Zeile 929 byte-identisch mit dem Original. Sichtkontrolle bei 1254 px sowie 64/48 px auf allen drei Hintergründen: kein durchgehender heller/grüner Saum, keine ausgeschnittenen hellen Federn, kein abgeschnittener Schnabel. Die untersten feinen Barben haben normales Antialiasing. Vorhandene Kopfproportionen und Halslänge wurden bewusst bewahrt. Das ursprüngliche Auge liegt höher als das allgemeine 32-%-Raster, die unteren Spitzen bei etwa 92,6 % statt 87 %; diese Rasterabweichung ist zugunsten des ausdrücklich begrenzten Bearbeitungsauftrags NICHT korrigiert. Deshalb keine pauschale Bestätigung vollständiger Rasterkonformität.

Exakter finaler Prompt (auch separat `outputs/proposals/steppenadler-work/portrait-prompt-2.txt` und neben der jeweiligen PNG gespeichert):

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

Species: Steppe Eagle (Aquila nipalensis), adult.
Identity: warm brown iris, deep heavy brow, yellow cere and long yellow gape reaching behind the eye, strong grey hooked bill, brown crown and neck. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: the lowest feather edge, replacing its wonky cut-off scalloped line with natural irregular overlapping intact feather tips. Keep the SAME neck length and placement. Each terminal feather should have a clear intact opaque brown vane and a few fine barbs, not a shredded broom fringe, not long wispy hairs, not translucent streaks, not glow, not a blurred feather fade. The boundary should resemble input 3 in rendering and clean intact feather tips, using the Steppe Eagle's original brown plumage. Input 2 is composition reference only; input 3 is rendering/lower-edge reference only. Preserve the entire head, bill, eye and all anatomy. Fit the original complete square canvas uniformly to 1254x1254, and then keep its exact positions. Background must be uniform pure green #00FF00 up to the clean feather boundary.
Keep everything else pixel-identical in size and position.
```

## Adult: `outputs/proposals/flight/steppenadler/male.png`

Quelle: `public/birds/steppenadler-20260913-v4.png`

Quell-SHA256: `e8173a08daa218ff7e7b5d40775e5568c96da7be55461c92ac4b4951ba5a050d`

Ausgabe-SHA256: `e0bce810955d13e2c5ec652aa5c2613b82ed489c1b8661391558eedf8d59a956`

Format: RGBA PNG, 1160 × 1160. Alpha > 0,5: `[142, 116, 1075, 1044]`; gesamte sichtbare Alpha-Begrenzung: `[139, 113, 1078, 1047]`.

Referenzen und Rollen:
- `public/birds/steppenadler-20260913-v4.png` — aktive Quelle, Gefiedermerkmale und Rahmen; im finalen Neuentwurf keine alte Geometrie als Bindung; SHA256 `e8173a08daa218ff7e7b5d40775e5568c96da7be55461c92ac4b4951ba5a050d`.
- `public/birds/steinadler.png` — nur Stilreferenz, gesichtet; Bildeingabe nur in verworfenem Versuch 1; SHA256 `6fb083db67da364d2480c2a8fd1620ce81f9c3fb138d14c15c2012caa6c50e7a`.
- `public/birds/seeadler.png` — nur Stilreferenz, gesichtet; Bildeingabe nur in verworfenem Versuch 1; SHA256 `d40e057ea4f943d98b8ce824cf4a9a1237626b169b03bdb11c316ea023da68d5`.

Gewählte Rohgenerierung: `outputs/proposals/steppenadler-work/adult-generated-4.png`; SHA256 `f9d68d7998bf15001530a820df05eeb9ab72f1fb80472161175b0ed911be4ffe`. Automatischer Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-7482a06f-60d2-433c-bb1d-14da2fcb4c66.png`.

Lokale Schritte: Generierung 4 freigestellt, gesamte neue adulte Zeichnung um −1° gedreht, proportional skaliert und auf der bisherigen 1160-px-Leinwand zentriert. Keine nichtproportionale Verformung. Gemeinsamer neuer Rahmen vor der Variantenproduktion fixiert; Details in `steppenadler-work/framing.json`. Anschließend schmale lokale Randfarbenkorrektur. Rahmenabweichungen: Breite 0 %, Höhe −0,3219 %, Zentrum x 0 px / y +0,5 px; deutlich innerhalb 2 %.

Prüfergebnis: Vierter und letzter Entwurf gewählt. Unteransicht, Kopf links, Flügelachse unten links nach oben rechts, zusammenhängender Körper, plausible Schulteransätze, vollständige Schwingen und Schwanzspitzen. Nach Grün-Entmischung und lokaler Randfarbenkorrektur auf hell/dunkel/petrol bei 1160 px und 400 px geprüft: keine auffälligen Farbsäume, Löcher oder abgeschnittenen Spitzen. Maßprüfung bestanden. OFFEN: Der Eindruck ist weicher als der Bestand, aber weiterhin teilweise illustrativ, insbesondere in den wiederholten Federreihen. Das verlangte fotografische Stilziel wird nach vier Generierungen nicht als vollständig erfüllt abgenommen. Die lange gelbe Schnabelspalte ist im Flugvorschlag außerdem weniger ausgeprägt als im bisherigen Bild; fachliche Freigabe erforderlich.

Exakter finaler Prompt (auch separat `outputs/proposals/steppenadler-work/adult-prompt-4.txt` und neben der jeweiligen PNG gespeichert):

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

Species: Steppe Eagle (Aquila nipalensis), normal adult.
Underside identity: dark warm brown body and underwing coverts, paler grey-brown flight feathers with subtle narrow dark barring and dark trailing edges, dark separated primary fingers, brown lightly barred rounded tail, brown head with a long yellow gape, yellow cere and dark hooked bill. No juvenile cream greater-covert band. Broad long wings with seven prominent primary fingers, comparatively small head, compact body and relatively short tail; feet tucked naturally beneath the rear body. Anatomy and proportions from real photographs of this species only.
Task: create a NEW genuinely photographic original. Emulate a softly resolved RAW photograph of a living wild eagle taken with a 600mm lens, ISO 800, diffuse flat overcast light, realistic modest tonal contrast. The belly and breast must have fine dense brown feather strands merging into soft irregular texture, no large scales or individually outlined decorative feathers. The bird is dark chocolate brown, with muted grey-brown underwing flight feathers and faint barring, no luminous cream edges. Absolutely no uniform bright rim around the bird, no backlight, no glossy shading. Preserve the species-specific LONG YELLOW GAPE reaching well behind the eye, relatively small head, long broad wings with long primary fingers, compact body and modest rounded tail. View slightly obliquely from underneath, head to the left, one continuous body, far wing upper right, near wing lower left. Both wings are anatomically extended with natural shoulders, wrists and overlapping secondary feathers. Square image with entire bird occupying only 80% of canvas width and height, generous pure green margin around every tip. All background is flat pure #00FF00. No text or objects. The desired result should be indistinguishable in rendering from a camera photograph, not the drawn field-guide artwork of previous attempts.
```

## Juvenile: `outputs/proposals/flight/steppenadler/juvenile.png`

Quelle: `public/birds/juvenile-steppenadler-20260913-v4.png`

Quell-SHA256: `e19cea9da5bb4f8c947527147be8057d9ef8ee558f5dcd71fdec3ab3e0f8a8d9`

Ausgabe-SHA256: `13ec85f069904b6a1c772caae7a9427839c763c986c068c645f41cacd547e7f3`

Format: RGBA PNG, 1160 × 1160. Alpha > 0,5: `[142, 116, 1075, 1044]`; gesamte sichtbare Alpha-Begrenzung: `[139, 113, 1078, 1047]`.

Referenzen und Rollen:
- `outputs/proposals/flight/steppenadler/male.png` — einzige neue adulte Originalbasis, Eingabebild 1 bei allen vier Versuchen; SHA256 `e0bce810955d13e2c5ec652aa5c2613b82ed489c1b8661391558eedf8d59a956`.
- `outputs/proposals/steppenadler-work/adult-green-reference.png` — exakte Komposition desselben adulten Originals auf Grün, zusätzlicher Ausrichtungsbeleg in Versuch 3/4; SHA256 `415c9ca98444c0a3960e9e5c0e4ebcfe04ca41fd8ba22cf7082f2a55dfc5f43e`.
- `public/birds/juvenile-steppenadler-20260913-v4.png` — vorhandene recherchierte Jungvogel-Gefiedermerkmale, keine Stil-/Geometrievorlage; Bildeingabe nur in Versuch 1; SHA256 `e19cea9da5bb4f8c947527147be8057d9ef8ee558f5dcd71fdec3ab3e0f8a8d9`.

Gewählte Rohgenerierung: `outputs/proposals/steppenadler-work/juvenile-generated-4.png`; SHA256 `8f3a168fa8b5260975f0f3e13c1dacb8b1280ab86f1b5913e007604072224a94`. Automatischer Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-da7bd1f8-fb6e-47cf-9d61-0914b127628d.png`.

Lokale Schritte: Generierung 4 von Grün freigestellt. Gesamte Leinwand proportional auf 1160 px normalisiert. Vor der Alpha-Übernahme 50-%-Überlagerung und Differenzbild kontrolliert; keine nachträgliche Poseverformung oder individuelle Vogel-Positionierung. Exakte adulte Alpha-Maske mit `scripts/restore-bird-alpha.mjs` übernommen und schmale Randfarbenkorrektur angewandt. Endgültige Alpha-SHA256 beider Flugdateien: `54192d7b5fa60bc258d7c4b7c16464e5c8c8323440abca8bfe24c0160cbb5f6f`. Volle innere Deckung wird dadurch nicht garantiert; siehe Prüfergebnis.

Prüfergebnis: Vierter und letzter Entwurf direkt aus dem neuen adulten Original gewählt. Gegenüber Versuch 3 deutliches helles Band der großen Unterflügeldecken auf beiden Flügeln. Helle Endsäume und bufffarbene Federkanten erhalten. 50-%-Überlagerung vor Alpha-Übernahme geprüft: äußere Geometrie sehr nah, Silhouetten-IoU 96,8114 %, kleine Kontur- und Detailunterschiede vorhanden. Anschließend exakter adulter Alpha-Kanal gemäß dem freigegebenen lokalen Verfahren übernommen, finale Alpha-Differenz 0. Keine eigene Verschiebung, Rotation oder individuelle Vogel-Skalierung der Variante; nur gleichmäßige Normalisierung der gesamten generierten Leinwand von 1254 auf 1160 px. Sichtkontrolle auf drei Hintergründen bei 1160 und 400 px: alle Spitzen vollständig, keine auffälligen Säume oder Löcher. OFFEN: Die innere Federzeichnung wurde vom Modell zum Teil neu interpretiert; vollständige pixel-identische innere Geometrie ist nicht nachgewiesen. Identisches Alpha ist ausdrücklich kein Beweis dafür. Daher keine uneingeschränkte Freigabe als sprungfreie finale Produktvariante. Auch das fotografische Stilziel bleibt wie beim adulten Original offen.

Exakter finaler Prompt (auch separat `outputs/proposals/steppenadler-work/juvenile-prompt-4.txt` und neben der jeweiligen PNG gespeichert):

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

Species: Steppe Eagle (Aquila nipalensis), juvenile.
Underside identity: a continuous cream-buff band across the tips of the greater underwing coverts of each wing, subtly buff-edged body feathers and narrow pale tail and wing trailing edges. Anatomy and proportions from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: recolour the distal tips of the greater underwing covert feathers pale ivory cream, making one conspicuous, continuous, narrow whitish band from near the wing root across the inner underwing and curving to the carpal region on EACH wing. This white-buff greater-covert stripe is the essential juvenile identification mark. It separates the dark brown coverts toward the leading edge from the grey-brown flight feathers toward the trailing edge. Keep the rest of the remiges grey-brown, not pale cream. Add restrained buff feather edges to the body and narrow buff edges to the wing and tail trailing feathers. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.
Task: strict minimal recolouring of the provided image. Do not redraw or reshape anything. All wing fingers, wrists, shoulders, eye, bill, feet and tail must remain in precisely the same pixel locations. Do not rotate, translate, zoom, stretch or reframe the bird. Preserve its entire original silhouette and soft feather texture exactly. Background flat pure #00FF00, with the exact same empty margins as the input. Input canvas 1160x1160; preserve it.
Input image 2 is an EXACT colour-background composite of input 1 on the required green, supplied as a pixel-alignment guide. Use the canvas geometry of image 2 exactly. Previous edits shifted the bird upwards and changed its outer contour: this must not happen. Paint the cream covert band onto the existing feathers as a local recolour; retain all existing pixel coordinates. Keep the overall bird dark brown; the broad pale band should be clear but narrow, not turn all remiges cream.
The narrow continuous pale greater-covert bands must remain conspicuous when the full image is reduced to 300 pixels. Preserve all geometry of the adult; no shift of any part.
```

## Generierungsverlauf und vollständige Provenienz

- `outputs/proposals/steppenadler-work/portrait-generated-1.png` — verworfen: feiner Abschluss zu wispenartig/transluzent.
  - SHA256 `b20c300565eb0dd1def9b459f170f39f0d484494215cdb4fbaab90a8b8d69519`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-2f396e36-b651-476d-856e-08e3e90b1001.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/portrait-prompt.txt` (SHA256 `286a38d40a6f789d5a793d743a2e4a3a5ca04f49494f0ba4fdf84b80ec406741`).
- `outputs/proposals/steppenadler-work/portrait-generated-2.png` — gewählt; nur untersten Bereich übernommen.
  - SHA256 `ab299b021ecaf5aa74e366c6c6a8dd75e61c5f9cd8012601ff3c4b8fb4a55058`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-6ad77ca1-34ff-4ba9-9dde-6397b2a27367.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/portrait-prompt-2.txt` (SHA256 `a95573212524a2a2ccc63fae77f2b9329dec857b1e6c64fdc40d54c505c6cacb`).
- `outputs/proposals/steppenadler-work/adult-generated-1-rejected.png` — verworfen: alter gemalter Stil und kein Grünhintergrund.
  - SHA256 `f0d822c3f4343394bcf50aff721a9898742d505cb2f6fb325410efd9d6718ce0`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-25b08509-5add-4be7-8f94-4cb9f974b5ab.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/adult-prompt.txt` (SHA256 `faf15601f4d5e74b541972c7da1c971996e0f0b6c5366fd2dc38494699e09770`).
- `outputs/proposals/steppenadler-work/adult-generated-2.png` — verworfen: helle Randbeleuchtung, zu illustrativ.
  - SHA256 `16865a59a719a0696a5bccbb5ea4821f5331e638b54c9207b8a5ebc314242183`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-363c8f5d-012d-45a4-b810-dbc06fef7604.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/adult-prompt-2.txt` (SHA256 `d6fdabd8bdb97bb341753dd2a21e322bf5a185fe1c095d2a7f59e525785b6df0`).
- `outputs/proposals/steppenadler-work/adult-generated-3.png` — verworfen: weiterhin zu illustrativ, geringerer Nutzen als Versuch 4.
  - SHA256 `1e3dbcc7363619b393a0150283b76b2f476c73b91b6ba710037eb72548ef81f9`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-73d6d1b0-c874-499b-91e9-e06ea01ab0be.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/adult-prompt-3.txt` (SHA256 `4cf9096301bbba8bfcf77ab8a9d0e40a08de95971838b90a69c9bfe6d272df17`).
- `outputs/proposals/steppenadler-work/adult-generated-4.png` — gewählter Vorschlag; Stilabnahme offen.
  - SHA256 `f9d68d7998bf15001530a820df05eeb9ab72f1fb80472161175b0ed911be4ffe`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-7482a06f-60d2-433c-bb1d-14da2fcb4c66.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/adult-prompt-4.txt` (SHA256 `ae145fe9cc78e7d6e9e5d0bfa0ad97e6ab8351393e169d10fc8dbf05cd75cf4b`).
- `outputs/proposals/steppenadler-work/juvenile-generated-1.png` — verworfen: IoU 84,6265 %, sichtbare Geometrieverschiebung.
  - SHA256 `87734bb87c2ba736f21c8b8f141f3ca81faa099fec8709e50102861cc6f932d5`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-f371648d-c9b6-4476-96ee-ec535691ceda.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/juvenile-prompt-1.txt` (SHA256 `416db281f800ecca6fcd70d3c54520d66837eaf510412e45994222b1df79f2bd`).
- `outputs/proposals/steppenadler-work/juvenile-generated-2.png` — verworfen: IoU 82,9266 %, sichtbare Geometrieverschiebung.
  - SHA256 `6f6875def1077a8aeaea8cc4ba3c4aeac302399bd952ca452630e353d88510f1`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-e8dbe191-d75e-4abc-aba3-28b8a1b06803.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/juvenile-prompt-2.txt` (SHA256 `8d14bc6fb3d5e0b4a28298c17928824ca689de12dc1d8dc1a9d41d4a50f86018`).
- `outputs/proposals/steppenadler-work/juvenile-generated-3.png` — ersetzt: IoU 98,1231 %, juveniles Band in Darstellungsgröße zu schwach.
  - SHA256 `07c8295e8ab076e36894df89c33f6ad6765deb9a1f7c4b4372a47f5a7423aac1`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-f0fdcb24-2c74-464e-814b-00b39ceb0257.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/juvenile-prompt-3.txt` (SHA256 `e415cc72b5e92ec9c5165d7bcf3c4e9ffb6612bd4a4f303bb00e61847b0659a1`).
- `outputs/proposals/steppenadler-work/juvenile-generated-4.png` — gewählt: deutlicheres juveniles Band; IoU vor Alpha-Übernahme 96,8114 %, finale Alpha-IoU 100 %, innere Exaktheit offen.
  - SHA256 `8f3a168fa8b5260975f0f3e13c1dacb8b1280ab86f1b5913e007604072224a94`
  - Dienstpfad `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abaa-77a3-9f56-cec451129800/exec-da7bd1f8-fb6e-47cf-9d61-0914b127628d.png`
  - Exakter Prompt `outputs/proposals/steppenadler-work/juvenile-prompt-4.txt` (SHA256 `8269d7d08993864ab7dcb0df39c4db02c480715adc4fdb4ac381fc1986a66e03`).

Die Bezeichnung „approved adult original“ in den festen Varianten-Prompts meint die intern fixierte neue adulte Vorschlagsbasis. Sie behauptet keine Nutzerfreigabe. Alle drei Dateien bleiben Vorschläge.

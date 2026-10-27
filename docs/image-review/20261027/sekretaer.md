# Sekretär – Porträtvorschlag

**Status: Vorschlag, nicht vollständig abnahmefähig. Vier von maximal vier Generierungen verbraucht.**

Generation 4 verbessert die beanstandete leuchtend rote Gesichtshaut und den wilden Federfächer: ruhigerer Blick, natürlichere orange Gesichtshaut, locker nach hinten liegende schwarze Nackenfedern, weicheres hellgraues Gefieder und grauer Hakenschnabel. Die Komposition bleibt jedoch unzureichend: Augenmitte etwa y=300 (23,9 %) statt etwa y=401 (32 %), und zu viel sichtbarer Hals. Die optische Kopfgröße wirkt neben dem Habicht bei 64/48 px kleiner. Daher **keine vollständige Standardkonformität und keine Empfehlung zur unveränderten Einbindung**. Nach vier Generierungen wurde das gesetzte Limit eingehalten. Die Anatomie wurde nicht nachträglich gestaucht oder gestreckt.

## Lieferdateien und Herkunft

- `outputs/proposals/portraits/sekretaer.png`: RGBA PNG, 1254 × 1254. SHA-256 `a2afcf6d9e4992212b926a33f1997e38b4dde8d6e56a2fb8be0ef4c6cbe6d869`. Neuer Ersatzvorschlag für `public/birds/portrait-sekretaer-20260913.png`; Original-SHA-256 `73f28265e4c9e39cbe6e24bfda707bb5e9ea5f716dccae651c5eb7eedede44ba`. Direkte Bildquelle: `outputs/proposals/sekretaer-work/generation-4.png`, SHA-256 `40a781613010635ecdb1649fb8c4b5e68f9470ee00816a235df098a23989cde3`.
- `outputs/proposals/sekretaer-check.png`: Vergleich aktuell/Vorschlag auf #e8e8e4, #22282a und #2d7f7a; unten aktuell/Vorschlag/Habicht bei 64 und 48 px. SHA-256 `7c8380485d25a583ed318798fed0bbe3c583579ee9e19e479a527554d3b074a8`. Quellen: obiges unverändertes Original, obiger finaler Vorschlag und Habicht-Kompositionsreferenz (Prüfsumme unten).
- `outputs/proposals/sekretaer-work/`: Rohgenerierungen, exakte Prompts, reproduzierbare lokale Bearbeitung, Einzelansichten in voller Auflösung und Prüfwerte. Vollständige Dateiprüfsummen: `artifact-sha256.json`.

Aktive Zuordnung vor Beginn geprüft: `lib/portrait-images.ts:48`, `/birds/portrait-sekretaer-20260913.png?v=a7d0a92b8af1`. Original und Zuordnung blieben unverändert. Keine Flugbilder oder zusätzlichen Varianten bearbeitet. Sämtliche selbst angelegten Projektdateien liegen unter `outputs/proposals/`. Der eingebaute Bildgenerator legt seine Rohbilder zusätzlich automatisch in seinem systemverwalteten Cache ab; sie wurden von dort in den Vorschlagsordner kopiert.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png` – ausschließlich Komposition, optische Kopfgröße und kurzer Halsausschnitt. SHA-256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png` – ausschließlich Rendering und natürlicher Federabschluss. SHA-256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- [Andy Hensel, Sekretär](https://www.tier-fotos.eu/bild/voegel~greifvoegel~sekretare-sagittarius/13990/sekretaer.html), Bildadresse `https://www.tier-fotos.eu/1024/sekretaer--13990.jpg` – reale Anatomie: Seitenansicht, Schnabel, Auge, orange Haut und rückwärts liegende Nackenfedern. Im Browser visuell geprüft.
- [Nik Borrow, Secretarybird](https://www.eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Index.html), Bildadresse `https://www.eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Sagittarius_serpentarius-01.jpg` – reale Anatomie: Frontalansicht, Auge, feine Gesichts- und Kopffedern. Die aufgestellte Federhaltung wurde ausdrücklich nicht als Zielhaltung übernommen. Im Browser visuell geprüft.

Die Fremdart-Referenzen wurden vorab lokal angesehen und bei Versuch 1 und 2 in dieser Reihenfolge als Bildeingaben verwendet. Versuch 3 und 4 erhielten keine Bildeingaben, um die Übernahme der harten Zeichnung und der Habicht-Kopfform zu vermeiden; Rollen, Raster und anhand echter Fotos geprüfte Artmerkmale wurden im Prompt angegeben. Die realen Fotos wurden nicht an den Generator übermittelt. Direkter Abruf über Web-Werkzeug scheiterte; die Browseransichten funktionierten. Ein anschließender Fotodownload wurde von der Browser-Freigabe abgelehnt und nicht umgangen.

## Generierungsweg und Auswahl

Eingebautes `image_gen.imagegen`, kein CLI/API-Fallback. Vier eigenständige Ersatzentwürfe, keine neuen biologischen Varianten. Alle Prompts beginnen wortgetreu mit den Blöcken Stil, Komposition und Hintergrund aus `docs/image-prompts/portrait.md`, in dieser Reihenfolge; per lokalem Prefix-Check verifiziert. Die eigenen Angaben stehen danach im Art-/Auftragsblock.

1. Versuch 1: verworfen – zu harte Federn, künstlicher Glanz, breiter adlerartiger Schnabel, unzureichender rechter Rand.
2. Versuch 2: verworfen – weiterhin harte Textur und zu künstlicher Augen-/Hautbereich; Rand und Halsausschnitt unzureichend.
3. Versuch 3: verworfen – bessere artgemäße Anatomie und weichere Textur, aber Kopf zu klein und Hals zu lang.
4. Versuch 4: bester Farb-/Ausdrucksvorschlag, als finale Vorschlagsdatei gespeichert; weiterhin Kompositionsmängel wie oben beschrieben.

## Lokale Verarbeitung

`node outputs/proposals/sekretaer-work/process.cjs` verwendet `sharp` aus den vorhandenen `node_modules`, weil Python/Pillow nicht verfügbar war. Implementierung nach `docs/portrait-user-refinements-20260913/extract.py`:

1. Randmedian als tatsächliches Grün des generierten Hintergrunds bestimmen (Versuch 4: RGB 5/249/3; angefordert wurde unverändert #00FF00).
2. Excess Green `G-max(R,B)` in Alpha umrechnen; Excess <10 wird deckend, Alpha <0,045 transparent.
3. Größte zusammenhängende Vordergrundkomponente bei Alpha >0,15 bestimmen und einen 5×5-Nahbereich für feine Kanten erhalten. Entfernt werden nur isolierte Hintergrund-Mattenreste.
4. Hintergrundfarbe mit `foreground=(RGB-(1-alpha)*background)/alpha` entmischen. Weiße und graue Pixel werden weder gekeyt noch entfernt.
5. Generation 4 als gesamtes Bild gleichmäßig von 1254 auf 1166 px skalieren und unverformt bei (0,20) auf eine transparente 1254er Leinwand setzen. Damit bleiben Schnabel und alle Nackenfedern innerhalb der 8-%-Ränder. Keine getrennte Hals-/Kopfskalierung und kein Abschneiden von Gefieder.
6. Nach dem Resampling verbliebenen positiven Grünüberschuss >2 ausschließlich farblich auf `max(R,B)` begrenzen; Alpha, weiße/graue Federn und Geometrie bleiben erhalten. Zählung in `despill.json`.
7. Vergleichsbogen und drei Vollauflösungsansichten aus dem finalen RGBA erzeugen.

## Prüfung

Finale Version auf allen drei geforderten Hintergründen bei 1254 × 1254 sowie bei den aktuellen UI-Größen 64 und 48 px selbst visuell geprüft. Auch verworfene Generationen wurden lokal freigestellt und auf drei Hintergründen in voller Auflösung und in Anzeigegröße kontrolliert.

- Echte Transparenz: 995.799 völlig transparente, 503.751 deckende und 72.966 teiltransparente Pixel; keine sichtbaren Pixel am Leinwandrand.
- Alpha-Begrenzung >0: x=108…1132, y=109…1113. Alle Ränder mindestens 8 %; sämtliche Schnabel- und Nackenfederspitzen vollständig.
- Keine Löcher im Kopf oder Hals erkennbar, keine breite weiße oder grüne Kontur, kein eingebranntes Schachbrett. Sehr feine helle Federfäden sind auf Dunkel sichtbar und gehören zur Silhouette. Keine pauschale Neutralfarbenentfernung.
- Hintergrundgrün-Nachprüfung: 0 sichtbare Pixel mit Grünüberschuss >10 nach lokaler Korrektur.
- Unterer Abschluss besteht aus unregelmäßigen einzelnen Federspitzen; weder horizontaler Schnitt noch Blur/Fade.
- Farbe/Ausdruck und entspannte Federhaltung gegenüber dem Original verbessert.
- **Nicht bestanden:** Augenhöhe, Verhältnis Kopf/Hals und optischer Größenabgleich zum Habicht. Keine falsche Gesamtfreigabe aufgrund bestandener Alpha-Prüfung.
- Produktansicht nicht verändert oder als integriert getestet: Auftrag ist ausdrücklich auf Vorschläge begrenzt. Anzeigegrößen aus `app/species-row.css` gelesen und in der Prüftafel nachgebildet.

## Exakte verwendete Prompts und Generierungspfade

### Versuch 1 – verworfen

Systempfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abc6-7992-93b2-eb7a6309df2a/exec-e288d470-d8af-49a3-b76f-f8f6d52bebdf.png`

Lokale Kopie: `outputs/proposals/sekretaer-work/generation-1.png`

SHA-256: `1a0f0f091e4eca5f6a568f8a9f39c989792667b86ff9ca01d285a1e5169649c8`

Promptdatei: `outputs/proposals/sekretaer-work/prompt-1.txt`

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: natural warm orange-red bare facial skin around the eye, with subdued real-life saturation and fine shallow folds; brown iris with a naturally large dark pupil and fine eyelashes; hooked cool-grey bill with pale yellowish cere; pale grey head and softly textured fine neck plumage; long slender black-tipped nape quills lying loosely backwards and down, not an erect radial fan. Calm natural expression, no staring oversized eye, no inflated red eyelids. Anatomy from real photographs of this species only.
Reference roles: input image 1 (portrait-habicht-20260912.png) is composition only; input image 2 (portrait-gerfalke-20260913-v2.png) is rendering and lower feather termination only. Neither is a source of Secretarybird anatomy. Real Secretarybird photographs reviewed: Andy Hensel, tier-fotos.eu/1024/sekretaer--13990.jpg, for bill, eye, skin and backwards nape quills; Nik Borrow, eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Sagittarius_serpentarius-01.jpg, for head, eye, bill and fine facial feathers. Do not copy the erect crest pose from the frontal photograph.
Task: create a full replacement portrait, not a retouch of the current illustration. Keep the species' characteristic long narrow nape quills complete, comfortably inside the canvas, relaxed and trailing backwards rather than spiking in all directions. Render a compact portrait crop of the naturally slender neck, ending with distinct soft individual feather tips at the common portrait baseline. No text.
```

### Versuch 2 – verworfen

Systempfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abc6-7992-93b2-eb7a6309df2a/exec-243abc4f-0075-4614-be64-1c495b9b70f1.png`

Lokale Kopie: `outputs/proposals/sekretaer-work/generation-2.png`

SHA-256: `0440d9fc72bbb88f6400239772e0a87e5126d2f8860afd48436432ca76118b1d`

Promptdatei: `outputs/proposals/sekretaer-work/prompt-2.txt`

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: natural warm orange-red bare facial skin around the eye, with subdued real-life saturation and fine shallow folds; brown iris with a naturally large dark pupil and fine eyelashes; hooked cool-grey bill with pale yellowish cere; pale grey head and softly textured fine neck plumage; long slender black-tipped nape quills lying loosely backwards and down, not an erect radial fan. Calm natural expression, no staring oversized eye, no inflated red eyelids. Anatomy from real photographs of this species only.
Reference roles: input image 1 (portrait-habicht-20260912.png) is composition only; input image 2 (portrait-gerfalke-20260913-v2.png) is rendering and lower feather termination only. Neither is a source of Secretarybird anatomy. Real Secretarybird photographs reviewed: Andy Hensel, tier-fotos.eu/1024/sekretaer--13990.jpg, for bill, eye, skin and backwards nape quills; Nik Borrow, eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Sagittarius_serpentarius-01.jpg, for head, eye, bill and fine facial feathers. Do not copy the erect crest pose from the frontal photograph.
Task: create a full replacement portrait, not a retouch of the current illustration. Keep the species' characteristic long narrow nape quills complete, comfortably inside the canvas, relaxed and trailing backwards rather than spiking in all directions. Render a compact portrait crop of the naturally slender neck, ending with distinct soft individual feather tips at the common portrait baseline. No text.

Task refinement: prioritize the photographic realism of a real living Secretarybird over the illustration references. Facial skin is matte muted warm ochre-orange with a subdued rusty-orange upper area, never scarlet or luminous. Skin folds are shallow and understated, not carved or inflated. The iris is a narrow brown ring around the pupil, not a giant glossy amber marble. The grey bill has smooth natural horn texture, no marbling, no decorative cracks or engraved markings. Fine grey head feathers have soft continuous strands rather than sharp white outlines. Nape quills are naturally slender and separate, swept rearwards and down in a relaxed grouping. The bare face is long and relatively slender, not a bulky eagle head. Keep the whole bill, every quill and neck tip within 8% canvas margins. Render the eye centre at y=401 and the lowest neck feather at y=1091 on the 1254 square. This is a full newly rendered replacement; do not preserve the artificial engraving texture of the old portrait or import the hawk's anatomy.
```

### Versuch 3 – verworfen

Systempfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abc6-7992-93b2-eb7a6309df2a/exec-9cbe7d2d-12e9-4aef-a95e-9ad98d1f392c.png`

Lokale Kopie: `outputs/proposals/sekretaer-work/generation-3.png`

SHA-256: `fe6365dfc06d58224b0039de82e3bcd4ddf1f37004a78fc7a1178b35967264c3`

Promptdatei: `outputs/proposals/sekretaer-work/prompt-3.txt`

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: matte subdued orange bare skin from the bill base around the eye; dark brown iris with a large natural pupil and fine eyelashes; smoothly textured pale cool-grey hooked bill with pale straw-yellow cere; pale grey head; long narrow black-tipped nape plumes swept loosely backwards and downwards. Calm natural expression. Anatomy from real photographs of this species only.
Task: entirely new portrait of a living Secretarybird with photographic feather softness, natural skin, and true species anatomy. Facial skin is restrained rusty orange, never fluorescent red or glossy swollen eyelids. Relaxed eye and nape feathers. A naturally slender secretarybird head, not a chunky eagle or hawk head. Each long nape plume has a grey shaft and narrow dark tip, lying back loosely, not an erect symmetrical fan. Neck is shown only as a compact upper-neck crop, without shoulder or breast. Keep the eye near y=401, neck end near y=1091, the bill and every plume at least 101 pixels inside the square edges. Reference roles: public/birds/portrait-habicht-20260912.png supplies only optical head scale and short-neck framing; public/birds/portrait-gerfalke-20260913-v2.png supplies only soft feather rendering and distinct irregular feather termination. Do not reproduce an engraved illustration texture. Anatomy is informed by real photos reviewed at https://www.tier-fotos.eu/1024/sekretaer--13990.jpg and https://www.eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Sagittarius_serpentarius-01.jpg. No lettering.
```

### Versuch 4 – ausgewählter Vorschlag

Systempfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-abc6-7992-93b2-eb7a6309df2a/exec-f0ac5f3a-9d74-44b7-8ded-86cbbf4ec80d.png`

Lokale Kopie: `outputs/proposals/sekretaer-work/generation-4.png`

SHA-256: `40a781613010635ecdb1649fb8c4b5e68f9470ee00816a235df098a23989cde3`

Promptdatei: `outputs/proposals/sekretaer-work/prompt-4.txt`

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: matte subdued orange bare skin from the bill base around the eye; dark brown iris with a large natural pupil and fine eyelashes; smoothly textured pale cool-grey hooked bill with pale straw-yellow cere; pale grey head; long narrow black-tipped nape plumes swept loosely backwards and downwards. Calm natural expression. Anatomy from real photographs of this species only.
Task: entirely new portrait of a living Secretarybird with photographic feather softness, natural skin, and true species anatomy. Facial skin is restrained rusty orange, never fluorescent red or glossy swollen eyelids. Relaxed eye and nape feathers. A naturally slender secretarybird head, not a chunky eagle or hawk head. Each long nape plume has a grey shaft and narrow dark tip, lying back loosely, not an erect symmetrical fan. Neck is shown only as a compact upper-neck crop, without shoulder or breast. Keep the eye near y=401, neck end near y=1091, the bill and every plume at least 101 pixels inside the square edges. Reference roles: public/birds/portrait-habicht-20260912.png supplies only optical head scale and short-neck framing; public/birds/portrait-gerfalke-20260913-v2.png supplies only soft feather rendering and distinct irregular feather termination. Do not reproduce an engraved illustration texture. Anatomy is informed by real photos reviewed at https://www.tier-fotos.eu/1024/sekretaer--13990.jpg and https://www.eaglewatch.nl/roofvogels/Sagittarii/Sagittariidae/Secretarisvogel/Sagittarius_serpentarius-01.jpg. No lettering.

Task refinement for the shared portrait grid: the optical skull must be large, matching the Goshawk composition reference, without changing Secretarybird anatomy. The crown is near y=135 rather than low in the frame; the eye remains near y=401. Show a substantial full-sized head, cheek and throat extending to about y=760, followed by ONLY 300 pixels of visible upper neck ending around y=1091. Keep the head-to-neck ratio like a tight headshot, not a long neck bust. The neck must not look like a tall cylinder. Preserve a naturally slender Secretarybird skull and its long bill, with complete relaxed nape feathers inside the right margin. Calm brown eye with a modest catchlight; softly lit muted rusty orange facial skin, no bright red glow. No hard or etched feather outlines.
```


## Round 2

27. Oktober 2026. **Gezielte Halskorrektur als Vorschlag; nicht vollständig rasterkonform.** Der Hals ist gegenüber Round 1 auf ungefähr die Hälfte gekürzt, mit neu gezeichneten, unregelmäßig überlappenden Federspitzen. Gesicht, orange Gesichtshaut, Auge, Schnabel, Scheitel und vollständige Schopffedern sind aus Round 1 übernommen, ohne Umzeichnen oder Formänderung. Das gesamte fertige Porträt wurde ausschließlich um 101 px nach unten versetzt. Keine Produktionseinbindung, keine zusätzlichen Varianten. Zwei von höchstens vier Generierungen dieser Runde verwendet.

### Herkunft und Referenzrollen

- Bearbeitungsziel zuerst auf SHA-256 `a2afcf6d9e4992212b926a33f1997e38b4dde8d6e56a2fb8be0ef4c6cbe6d869` geprüft und unverändert nach `outputs/proposals/sekretaer-work/round1.png` kopiert. Beide Generierungen verwenden diese Kopie als **Input 1**, keine Generierung baut auf dem anderen Versuch auf.
- Input 2: `public/birds/portrait-habicht-20260912.png`, ausschließlich Komposition, optische Kopfgröße und kurzer Halsanteil.
- Input 3: `public/birds/portrait-gerfalke-20260913-v2.png`, ausschließlich Rendering und natürlicher unterer Federabschluss.
- Kopfidentität und Anatomie stammen aus dem vom Nutzer akzeptierten Round-1-Kopf. Kein erneuter anatomischer Entwurf, keine Übernahme fremder Artmerkmale.
- Regeln gelesen: `AGENTS.md`, `docs/vogelbild-standard.md`, `docs/image-prompts/portrait.md`; Grün-Entmischung nach `docs/portrait-user-refinements-20260913/extract.py`.
- Generierungsweg: eingebautes `image_gen`-Werkzeug, Bildbearbeitung mit drei Referenzbildern in obiger Reihenfolge. Die automatische Werkzeugablage liegt systembedingt unter `.codex/generated_images`; alle eigenen Schreib-/Kopier-/Verarbeitungsschritte und Lieferdateien ausschließlich unter `outputs/proposals/`.
- Final: `outputs/proposals/portraits/sekretaer.png`, 1254 × 1254, RGBA, SHA-256 `47ff10162670e2b5a2e5bfc0d02527648d20631810caa5dfd3f060157b7b835f`.
- Prüfblatt aktualisiert: `outputs/proposals/sekretaer-check.png`. Vollauflösender Vergleich mit je drei 1254er Bildern: `outputs/proposals/sekretaer-work/round2-compare-{light,dark,teal}-full.png`. Einzelansichten: `round2-{light,dark,teal}-full.png` im selben Ordner.
- Prüfsummen aller Quellen, Referenzen und Lieferbilder: `outputs/proposals/sekretaer-work/round2-sha256.json`.

### Bearbeitungsschritte

1. Versuch 1 verkürzt den Hals, verändert aber den Kopf und liefert trotz Grünanforderung bereits Transparenz mit unsauberen Randresten. Verworfen; keinerlei Pixel daraus im finalen Bild.
2. Versuch 2 erneut direkt von `round1.png`, mit ausdrücklich opakem grünen Hintergrund. Der neu gezeichnete Halsabschluss ist brauchbar, der generierte Kopf bleibt wegen Abweichungen unbrauchbar. Ausschließlich der Halsbereich wird verwendet.
3. Lokale Freistellung mit Node + vorhandenem `sharp` in `round2-process.cjs`, entsprechend dem vorgegebenen Python-Verfahren: Randmedian RGB (4,249,3); Excess Green `G-max(R,B)` bestimmt Alpha; Excess <10 deckend, Alpha <0,045 transparent. Größte 8-fach verbundene Vordergrundkomponente bei Alpha >0,15, 5×5-Nahbereich für feine Federränder. RGB durch `(RGB-(1-alpha)*background)/alpha` entmischt. Kein Weiß-/Grau-Key, keine pauschale Entfernung heller Federn.
4. Den neuen Halsabschluss aus Versuch 2 ohne Skalierung, Stauchung oder Streckung um 120 px nach oben versetzt. Er ersetzt ausschließlich den unteren Hals. Geschützt bleiben alle Source-Pixel mit `y <= 540` sowie `x >= 760 + 0.5*(y-500)`; letztere Region umfasst die vollständigen Schopffedern. Im Halsinneren verbindet ein 65-px-Übergang den originalen oberen Hals mit dem neuen unteren Hals; die Silhouette selbst besteht aus den generierten einzelnen Federspitzen, ohne Blur/Fade. Der Übergang zur geschützten rechten Region umfasst 25 px. Kopf und Schopffedern wurden nicht generativ verändert.
5. Positiven restlichen Grünüberschuss ausschließlich im neuen Hals und dessen Mischbereich farblich begrenzt; Alpha bleibt erhalten. Geschützte Kopf-/Schopfpixel werden dabei nicht angefasst.
6. Endgültige Platzierung: Gesamtmaßstab **1,0**, Translation **(0,+101 px)** auf transparente 1254er Leinwand. Eine erprobte gleichmäßige Vergrößerung um 2 % brachte kaum optischen Gewinn und erzeugte zusätzliche Randfarbabweichungen beim Resampling. Daher endgültig keine Größenänderung und keine Neuberechnung der geschützten Kopfpixel. Keine anatomische Deformation, keine abgeschnittenen Federn.
7. Reproduzierbar mit `node outputs/proposals/sekretaer-work/round2-process.cjs` und `node outputs/proposals/sekretaer-work/round2-review.cjs`. Beide Skripte schreiben nur in den Vorschlagsordner.

### Prüfung und verbleibender Rasterkonflikt

- Finales Porträt selbst visuell auf **#e8e8e4**, **#22282a** und **#2d7f7a** in 1254 px geprüft; daneben Habicht und Round 1 im Vollauflösungsbogen sowie bei **64 und 48 px** verglichen. Keine erkennbaren Löcher, keine breite grüne/weiße Randkontur, keine abgeschnittenen Schopffedern. Feine helle Federfäden bleiben erhalten.
- Schutzprüfung vor Platzierung: **888.927 geschützte Pixel, 0 geänderte Farb-/Alpha-Werte**. Zusätzlicher Vergleich nach gleicher Platzierung: **992.523 Pixel einschließlich transparentem Umfeld geprüft, 0 abweichende Pixel**; konservativer Abstand zur Hals-Mischzone. Die Werte stehen in `round2-checks.json` und `round2-head-check.json`.
- Alpha >0: **x=108…1132, y=210…1034**. Freie Ränder links 108 px (8,6 %), rechts 121 px (9,6 %), oben 210 px (16,7 %), unten 219 px (17,5 %). Alle vollständigen Schopffedern bleiben innerhalb der geforderten 8-%-Ränder.
- Transparenz: **1.175.453 vollständig transparente**, **339.065 deckende**, **57.998 teiltransparente** Pixel. Keine sichtbaren Randpixel der Leinwand; **0 sichtbare Pixel mit Grünüberschuss >10**.
- Auge: etwa **(458,401)**, also **32,0 % von oben**. Kinn ungefähr y=561 nach Platzierung, neue Halsfederspitzen ungefähr y=885–890: etwa 324–329 px sichtbarer Hals gegenüber rund 653 px in Round 1, also ungefähr die Hälfte. Natürlicher unregelmäßiger Abschluss ohne geraden Schnitt oder Sockel.
- **Nicht vollständig erfüllt:** Die tiefste Schopffederspitze liegt bei **82,5 %**, der Halsabschluss bei ungefähr **71 %**, statt einer gemeinsamen unteren Abschlusslinie bei etwa 87 %. Die eigentliche Kopfgröße wirkt neben dem Habicht weiterhin kleiner, besonders in 64/48 px. Keine vollständige Rasterfreigabe.
- Der Konflikt ist geometrisch: Bei unverändertem Kopf/Schopf beträgt die Breite etwa 1025 px. Mit beidseitig mindestens 101 px Rand ist maximal etwa 1,026-fache gleichmäßige Vergrößerung möglich. Um bei Auge y≈401 die unveränderte tiefste Schopffederspitze von ihrem relativen Abstand von etwa 633 px auf y≈1091 zu bringen, wäre rund 1,09-fache Vergrößerung nötig; die Breite würde den zulässigen Rahmen überschreiten. Ein größerer Kopf wie beim Habicht bei unveränderten Schopffedern ist ebenfalls nicht innerhalb dieses Rahmens erreichbar. Die exakte Kopf-/Schopferhaltung wurde beibehalten und dieser Zielkonflikt nicht durch Stauchen, Kürzen oder Umzeichnen verdeckt.
- Mehr Generierungen würden diesen festen Geometriekonflikt nicht lösen; deshalb nach zwei Versuchen beendet, statt Kopf oder Schopf zur Rasteranpassung zu verändern.
- Durch diesen Auftrag keine Dateien unter `public/`, `lib/`, `app/`, `tests/` oder `docs/` geändert. Während der Arbeit sind weitere externe Änderungen im gemeinsamen Workspace erschienen; sie wurden nicht angefasst. Keine UI-/Produkttests erforderlich, da ausschließlich ein Bildvorschlag geliefert wird.

### Exakte Prompts dieser Runde

#### Round 2 – Versuch 1

Systemablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec0-31c9-7be0-8c7d-654afd6779f8/exec-fd3bc2a3-7ecd-4ca9-b46b-945fbdb78f56.png`.

Lokale Kopie: `outputs/proposals/sekretaer-work/round2-generation-1.png`, SHA-256 `b6a12a06f362055e9b73ddf1d76d52f4959b253eca7a389df82c5b0084a49377`.

Promptdatei: `outputs/proposals/sekretaer-work/round2-prompt-1.txt`.

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: exactly the approved input-1 head: muted orange facial skin, brown iris with large dark pupil and fine eyelashes, cool-grey hooked bill and pale yellow cere, pale grey crown, complete long narrow dark-tipped crest quills swept backwards. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: the visible neck below the chin, shortening it to HALF its present visible length or less, with a compact natural feather termination. In input-1 coordinates the chin is approximately y=460 and the old neck reaches y=1113: the new lowest NECK feather tips should end around y=760-790, not y=1113. Remove the excess lower neck and redraw ONLY its lower termination as distinct naturally irregular overlapping feather tips. Do not squash or stretch the neck. Preserve the original head, face, orange skin, eye, bill, crown and EVERY crest quill exactly in shape, colour, rendering, size and position. The long diagonal black-tipped quills on the right belong to the protected crest and MUST NOT be shortened, cut off, moved, or repainted. The whole region above y=540 is protected. Outside the shortened neck use flat #00FF00, including currently transparent areas. The global portrait-grid placement will be completed locally afterwards with uniform scaling and translation only; preserve the head geometry during this edit.
Keep everything else pixel-identical in size and position.

Reference roles: input image 1 is outputs/proposals/sekretaer-work/round1.png, the ONLY edit target and sole source of head identity and geometry. Input image 2 is public/birds/portrait-habicht-20260912.png, composition and compact neck proportion only. Input image 3 is public/birds/portrait-gerfalke-20260913-v2.png, natural overlapping lower feather tips only. Do not borrow anatomy or head rendering from images 2 or 3. No text.
```

#### Round 2 – Versuch 2

Systemablage: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec0-31c9-7be0-8c7d-654afd6779f8/exec-912d0242-eb2d-4f3e-a611-f1bcd45b2fa8.png`.

Lokale Kopie: `outputs/proposals/sekretaer-work/round2-generation-2.png`, SHA-256 `0d03f2af4aae18f17ba590e6a066c75314e32ff12e8d0c608259bdb548b60e46`.

Promptdatei: `outputs/proposals/sekretaer-work/round2-prompt-2.txt`.

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

Species: Secretarybird (Sagittarius serpentarius), adult.
Identity: exactly the approved input-1 head: muted orange facial skin, brown iris with large dark pupil and fine eyelashes, cool-grey hooked bill and pale yellow cere, pale grey crown, complete long narrow dark-tipped crest quills swept backwards. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: the visible neck below the chin, shortening it to HALF its present visible length or less, with a compact natural feather termination. In input-1 coordinates the chin is approximately y=460 and the old neck reaches y=1113: the new lowest NECK feather tips should end around y=760-790, not y=1113. Remove the excess lower neck and redraw ONLY its lower termination as distinct naturally irregular overlapping feather tips. Do not squash or stretch the neck. Preserve the original head, face, orange skin, eye, bill, crown and EVERY crest quill exactly in shape, colour, rendering, size and position. The long diagonal black-tipped quills on the right belong to the protected crest and MUST NOT be shortened, cut off, moved, or repainted. The whole region above y=540 is protected. Outside the shortened neck use flat #00FF00, including currently transparent areas. The global portrait-grid placement will be completed locally afterwards with uniform scaling and translation only; preserve the head geometry during this edit.
Keep everything else pixel-identical in size and position.

Reference roles: input image 1 is outputs/proposals/sekretaer-work/round1.png, the ONLY edit target and sole source of head identity and geometry. Input image 2 is public/birds/portrait-habicht-20260912.png, composition and compact neck proportion only. Input image 3 is public/birds/portrait-gerfalke-20260913-v2.png, natural overlapping lower feather tips only. Do not borrow anatomy or head rendering from images 2 or 3. No text.

CRITICAL OUTPUT REQUIREMENT: return an OPAQUE RGB image with a visible solid pure chroma green #00FF00 background across all empty areas, including between quills. Do not produce transparency, do not remove the background, do not return an alpha cutout. Green extraction will be done locally. Keep the input-1 bird at its original exact scale and position: eye x=458,y=300, bill tip x=109,y=538. Do not enlarge or redesign the head. Neck should end around y=780 while the protected long crest still extends to its original y=930. This asymmetry is intended. Short neck, complete long crest. Preserve the source head texture and colours.
```

## Round 3

Vorschlag vom 27. Oktober 2026. Ausschließlich Dateien unter `outputs/proposals/` geschrieben; keine Integration und keine zusätzlichen Arten-, Alters- oder Geschlechtsvarianten. AGENTS.md, `docs/vogelbild-standard.md` und die verbindlichen Promptblöcke gelesen und angewendet.

### Quelle und Referenzrollen

- Bearbeitungsziel: `outputs/proposals/sekretaer-work/round2.png`, SHA-256 `47ff10162670e2b5a2e5bfc0d02527648d20631810caa5dfd3f060157b7b835f`; unverändert erhalten und erneut verifiziert.
- `public/birds/portrait-habicht-20261027.png`: gemeinsame Komposition und optische Kopfgröße, keine Anatomievorlage.
- `public/birds/portrait-sekretaer-20260913.png`: ausschließlich Haltung der Schopffedern, keine Übernahme von Gesicht, Haut oder Rendering. Aktive Bestandszuordnung in `lib/portrait-images.ts` bestätigt.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich natürlicher Federabschluss; der akzeptierte kurze Hals aus Runde 2 bleibt Grundlage.

### Drei Generierungen mit dem eingebauten image_gen-Werkzeug

Die vollständigen tatsächlich verwendeten Prompts liegen in `sekretaer-work/round3-prompt-1.txt`, `round3-prompt-2.txt` und `round3-prompt-3.txt`. Stil-, Kompositions- und Hintergrundblock wurden wörtlich und in der vorgeschriebenen Reihenfolge übernommen; Artblock ausgefüllt, Auftragsblock 5 verwendet. Der automatische Prefix-Check besteht für alle drei Prompts. Angefordert wurde jeweils sichtbarer, deckender Hintergrund #00FF00.

1. `round3-generation-1.png`: Schopf angehoben, aber noch zu weit nach rechts ausladend; verworfen.
2. `round3-generation-2.png`: eng am Nacken liegende Federkiele mit leicht angehobener oberster Feder. Nur der Schopfbereich verwendet, Gesicht und Hals der Generierung verworfen.
3. `round3-generation-3.png`: gezielte Reparatur des hinteren Scheitel-/Nackenübergangs im lokal zusammengesetzten Vorschlag. Ausschließlich die kleine rechte Übergangsregion übernommen; Gesicht und kurzer Hals bleiben aus Runde 2.

Systemablagen unter `/Users/lukasvonhohnhorst/.codex/generated_images/01a17eca-1cd9-7470-8ba4-31af77b695d5/`: Versuch 1 `exec-cf4ace72-0ccd-4fd6-85ed-f72a4ba88233.png`, Versuch 2 `exec-7f7551ea-aa2e-4687-85d2-042adafbb4bb.png`, Versuch 3 `exec-10ce7deb-70f3-4a60-ba2e-9a0ad7f7584c.png`. Die systemverwalteten Ausgaben wurden nach `outputs/proposals/sekretaer-work/` kopiert; sämtliche eigenen Dateioperationen blieben im Vorschlagsverzeichnis.

### Lokale Verarbeitung und Erhaltung des Gesichts

Reproduzierbar mit `node outputs/proposals/sekretaer-work/round3-process.cjs`, anschließend `node outputs/proposals/sekretaer-work/round3-finish.cjs`. Die Zwischenvorlage für Versuch 3 ist als `round3-before-nape-repair.png` erhalten.

Grün-Entmischung mit Node und sharp entsprechend dem bestehenden Verfahren: tatsächliches Hintergrundgrün am Rand bestimmen, Alpha aus Grünüberschuss berechnen, größte zusammenhängende Vogelkomponente samt feinen Randpixeln erhalten, RGB mit `foreground=(RGB-(1-alpha)*background)/alpha` entmischen. Keine Entfernung weißer oder grauer Pixel. Gemessenes Hintergrundgrün: Versuch 2 RGB 4/248/3, Versuch 3 RGB 4/249/4. Positiven Grünüberschuss nach dem Resampling rein farblich entfernen; Federsilhouette und Alpha nicht erodieren.

Der bearbeitete Schopf aus Versuch 2 wird in die Ausgangsgeometrie eingefügt; Kopf, Gesicht und kurzer Hals stammen aus Runde 2. Anschließend das gesamte zusammengesetzte Porträt einheitlich von 1254 auf 1756 px skalieren (Faktor 1,400319) und bei x=−52/y=−161 auf der 1254er Leinwand platzieren. Dieser gegenüber dem ungefähren Auftrag 1,3 etwas größere Faktor gleicht den tatsächlichen Kopf an den Habicht an und erreicht zugleich den unteren Rasterabschluss. Keine gesonderte Vergrößerung des Kopfes, keine Stauchung oder Verlängerung des Halses. Es werden ausschließlich leere Außenflächen abgeschnitten.

Versuch 3 repariert den natürlichen Übergang der neuen Federkiele am rechten Hinterkopf. Die Übernahme bleibt auf x>840 und 170<y<570 beschränkt, mit Übergang innerhalb des Gefieders. Die vollständigen Kontrollwerte und Maskenkoordinaten stehen in `round3-checks.json` und `round3-final-checks.json`.

### Abnahme und Dateien

- Endvorschlag: `outputs/proposals/portraits/sekretaer.png`; Sicherung derselben Endfassung: `sekretaer-work/round3.png`. SHA-256 `d4903dcffbd2e9c5d8b262c7440a1e2d39dbcbfc49b1f17c17976691a525ccc9`.
- `outputs/proposals/sekretaer-check.png` aktualisiert: Habicht, Runde 2 und Runde 3 nebeneinander, auf Hell #e8e8e4, Dunkel #22282a und Petrol #2d7f7a, jeweils mit echten 64-/48-px-Prüfansichten.
- Vollauflösungsvergleiche: `sekretaer-work/round3-compare-{light,dark,teal}-full.png`, je 3762×1254. Einzelansichten: `round3-{light,dark,teal}-full.png`, je 1254×1254. Vollauflösung und kleine Anzeigegrößen selbst visuell geprüft: Kopfgröße zum Habicht vergleichbar, Gesicht und kurzer Hals erhalten, alle Schopffederspitzen vollständig, oberste Feder leicht angehoben, übrige kompakt am Nacken. Kein auffälliger grüner/weißer Saum, keine Löcher oder abgeschnittenen Spitzen; feine helle Federfäden bleiben erhalten.
- Auge y≈400,53 = 31,94 %; tiefste Federspitzen y=1088 = 86,76 %. Alpha-Begrenzung x=100…1174/y=134…1088. Rand links 7,97 %, oben 10,69 %, rechts 6,30 %, unten 13,16 %. Der rechte Rand folgt der ausdrücklich für diesen Auftrag erlaubten Untergrenze 6 %; die allgemeine 8-%-Vorgabe wird dort nicht behauptet.
- Echte RGBA-Transparenz: 901.864 völlig transparente, 606.224 deckende und 64.428 teiltransparente Pixel. Kein Vordergrund am Leinwandrand; 0 sichtbare Pixel mit Grünüberschuss >10.
- `node outputs/proposals/sekretaer-work/round3-validate.cjs` bestanden: Quellprüfsumme, drei wörtliche Promptpräfixe, Mindestabstand 6 %, finale Prüfsumme und Erhalt des Gesichts. 1.040.820 Pixel im Bereich x=0…829 über die gesamte Höhe gegen Runde 2 nach identischer gleichmäßiger Skalierung, Translation und Randfarbenkorrektur verglichen: **0 abweichende Pixel**. Die abschließende Nackenreparatur verändert außerhalb ihres Bereichs ebenfalls 0 Pixel.
- Kein Produktcode, keine Bildzuordnung und keine Dateien unter `public/`, `lib/`, `app/`, `tests/` oder `docs/` durch diesen Auftrag geändert. Es handelt sich ausschließlich um einen Vorschlag; keine Integration oder Produktabnahme behauptet.

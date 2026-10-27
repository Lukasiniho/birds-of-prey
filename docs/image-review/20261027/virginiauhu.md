# Virginia-Uhu – Porträtvorschlag

Stand: 26.10.2026. Ausschließlich Vorschlagsdateien; keine Einbindung und keine Änderung an public/, lib/, app/, tests/, docs/ oder Bildzuordnungen. Keine zusätzlichen Varianten.

## Ergebnis und Status

Vorschlag: `outputs/proposals/portraits/virginiauhu.png` — RGBA-PNG, 1254 × 1254. Ausgewählt wurde Generierung 3 von maximal 4. Die Ansicht ist seitlicher als beim bisherigen Porträt, das zweite Auge ist verdeckt, die Ohrbüschel sind weniger hoch.

**Noch keine uneingeschränkte Standardabnahme:** Die Augenmitte liegt visuell etwa bei y=430–440 (34–35 %), statt bei ungefähr 32 %. Der Mindestfreiraum ist eingehalten; der unterste Federrand liegt bei y=1104 (88,0 %, Ziel etwa 87 %). Eine noch stärker seitliche Drehung kann die Koordination ebenfalls gegen die Habichtreferenz bewerten. Das Generierungslimit ist ausgeschöpft. Der Vorschlag bleibt zur ausdrücklichen Nutzerprüfung liegen.

## Quelldatei und Referenzen

- Aktive Quelle laut lib/portrait-images.ts: `public/birds/portrait-virginiauhu.png`. SHA-256: `91127eea6d8d56813ff92f17ccb83c8f97511cf432851c37c54607dc3f7d489f` (vorher und abschließend unverändert).
- `public/birds/portrait-habicht-20260912.png`: ausschließlich Komposition, Kamerarichtung, optische Kopfgröße und Ausschnitt. SHA-256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich Rendering und natürlicher unterer Federabschluss. SHA-256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- [Michel Lamarche: reales Artfoto](https://www.oiseaux.net/photos/michel.lamarche/great.horned.owl.3.html), [direkte Fotodatei](https://www.oiseaux.net/photos/michel.lamarche/images/grand-duc.d.amerique.mila.3g.jpg): Anatomie, kurzer dunkler Schnabel, Gesichtsschleier, Iris, Kehlfleck und Federstruktur. Im Chrome-Browser visuell betrachtet; keine Kopie des Fotos in das Ergebnis montiert. Rechteinhaber: Michel Lamarche / FindNature.com. Das nach rechts gerichtete Foto ist keine Kompositionsvorlage.
- [Cornell Lab, Great Horned Owl Fotogalerie](https://www.allaboutbirds.org/guide/Great_Horned_Owl/photo-gallery): ergänzender Abgleich der beschriebenen Artmerkmale, insbesondere gelbe Augen, zimtfarbener Schleier und weißer Kehlfleck.

## Ausgaben und Herkunft

- `outputs/proposals/portraits/virginiauhu.png`: Ersatzvorschlag zur oben nachgewiesenen Quelldatei; Bildbasis `outputs/proposals/virginiauhu-work/generation-03.png`. SHA-256: `cd1dcd158ee5d48ef82fc0bc0cc9c05dae7d58b701059798d4defe5f7c22de0d`.
- `outputs/proposals/virginiauhu-check.png`: aktuelles Original (oben) gegen fertigen Vorschlag (unten), jeweils hell, dunkel und petrol; zusätzlich unvergrößerte 64-/48-px-Ansichten. Quellen sind das Original und das fertige Vorschlags-PNG mit den oben genannten Prüfsummen. SHA-256: `9b8c83346e0ee14fec255a50279479407bc697d4112397d06c80976915a3ffe6`.
- `outputs/proposals/virginiauhu-work/manifest.json`: Pfad-/SHA-256-Verzeichnis aller Arbeitsdateien. generation-01…04 sind unbearbeitete Toolausgaben; cutout-01…04 entstehen jeweils unmittelbar aus der gleichnamigen Generierung. final-*-full sind Hintergrundkomposite des fertigen Vorschlags. attempt-*-full und attempts-* sind ausschließlich Kontrollbilder der jeweiligen Freistellungen. reference-check vergleicht Habicht, Vorschlag und Gerfalke.

## Generierungsweg

Verwendet wurde das eingebaute Tool image_gen.imagegen. Versuch 1 erhielt das alte Porträt, Habicht und Gerfalke in dieser Reihenfolge als Bildinputs; Versuche 2–4 wurden ohne Bildinput als vollständige Neuerstellung ausgeführt. Alle Prompts enthalten die drei festen Blöcke aus docs/image-prompts/portrait.md wörtlich und in Reihenfolge; dies wurde automatisch geprüft. Nur Art- und Auftragsblock wurden ergänzt. Angefordert wurde immer flaches #00FF00. Das Tool lieferte geringfügig abweichendes Grün; die lokale Entmischung misst daher die tatsächliche Randfarbe.

### Versuch 1

Verworfen: zu nahe an alter Frontalansicht, übergroße Ohrbüschel, Randabstände und Augenhöhe unzureichend.

- Tool-Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a78b-7091-9799-8e8fdc4b0e81/exec-e57cecf1-d376-439c-baf0-4a577f819ade.png` (automatisch vom Tool angelegt).
- Gesicherte Kopie: `outputs/proposals/virginiauhu-work/generation-01.png`.
- SHA-256: `fac4f910e1eb3fcc8c7b328efb0c29af46fe431abd28f4eec56096129b4ac3e9`.
- Exakter übergebener Prompt (äußere Abschlusszeile getrimmt):

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

Species: Great Horned Owl (Bubo virginianus), adult.
Identity: widely set feather ear tufts, yellow iris, rufous facial disc with a black rim, dark hooked bill partly enclosed by pale facial bristles, white throat bib, finely mottled grey-brown barred plumage. Anatomy from real photographs of this species only.
The broad owl skull and facial disc must retain natural owl anatomy. The far eye is hidden at the requested near-profile angle; do not recreate the frontal two-eye view of the old portrait.

Task: NEW PORTRAIT, full replacement of the current Virginia-Uhu portrait, correcting its pose and perspective. Input image 1 is the old portrait being replaced, not a geometry constraint. Input image 2 (portrait-habicht-20260912.png) is exclusively the composition reference. Input image 3 (portrait-gerfalke-20260913-v2.png) is exclusively the rendering and lower feather-edge reference. Never copy hawk or falcon anatomy or feather colours. Follow the composition grid above, with the main visible yellow eye centred near y=401 on the 1254-square canvas, complete widely spaced ear tufts, compact neck and lowest individual tips near y=1091. Anatomical reference inspected: the real Great Horned Owl photograph by Michel Lamarche at https://www.oiseaux.net/photos/michel.lamarche/great.horned.owl.3.html (anatomy only, not its rightward direction or body crop). Create only the single requested replacement portrait, no text.
```

### Versuch 2

Verworfen: Auge weiterhin zu tief, zu hohe Ohrbüschel; grünlich-olivfarbene Randreste nach einfacher Entmischung.

- Tool-Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a78b-7091-9799-8e8fdc4b0e81/exec-aeef1135-3359-4b41-ac53-5a8e39d9b146.png` (automatisch vom Tool angelegt).
- Gesicherte Kopie: `outputs/proposals/virginiauhu-work/generation-02.png`.
- SHA-256: `d7a4d0684aa9e6ea892efb24e2c4ee0d67afc26c630742ccbe16435712185ebf`.
- Exakter übergebener Prompt (äußere Abschlusszeile getrimmt):

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

Species: Great Horned Owl (Bubo virginianus), adult.
Identity: widely set feather ear tufts, yellow iris, rufous facial disc with a black rim, dark hooked bill partly enclosed by pale facial bristles, white throat bib, finely mottled grey-brown barred plumage. Anatomy from real photographs of this species only.
The broad owl skull and facial disc must retain natural owl anatomy. The far eye is hidden at the requested near-profile angle; do not recreate the frontal two-eye view of the old portrait.

Task: NEW PORTRAIT, draw a completely new Great Horned Owl in the requested leftward near-profile view. Correct the old frontal perspective: the bill points clearly toward the left side of the canvas; the one visible eye is at x=455, y=401; the facial disc is foreshortened, and the far eye is fully occluded behind the bridge. The ear tufts are natural, modest feather tufts angled slightly outward, never oversized horns; their highest tips sit around y=110. Optical head and compact neck fill the frame down to individual lower tips around y=1091, with empty margins. Composition reference: public/birds/portrait-habicht-20260912.png, only camera angle and framing. Rendering reference: public/birds/portrait-gerfalke-20260913-v2.png, only lifelike soft plumage and individual lower feather tips. Anatomy reference: real Great Horned Owl profile photographed by Michel Lamarche at https://www.oiseaux.net/photos/michel.lamarche/great.horned.owl.3.html, visually inspected; use this species' round face, short hooked bill and dense feathering, not falcon or hawk anatomy. Single portrait, no text.
```

### Versuch 3

Ausgewählt: beste Augenhöhe und niedrigere, seitlich auslaufende Ohrbüschel; lokal freigestellt und nachbearbeitet.

- Tool-Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a78b-7091-9799-8e8fdc4b0e81/exec-097d942d-18aa-402a-a3eb-0e85b199f753.png` (automatisch vom Tool angelegt).
- Gesicherte Kopie: `outputs/proposals/virginiauhu-work/generation-03.png`.
- SHA-256: `2212865a95fd03fc331d0ede7cfa28f5dd579bf27025e64e6afa8db6c29a7441`.
- Exakter übergebener Prompt (äußere Abschlusszeile getrimmt):

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

Species: Great Horned Owl (Bubo virginianus), adult.
Identity: widely set feather ear tufts, yellow iris, rufous facial disc with a black rim, dark hooked bill partly enclosed by pale facial bristles, white throat bib, finely mottled grey-brown barred plumage. Anatomy from real photographs of this species only.
The broad owl skull and facial disc must retain natural owl anatomy. The far eye is hidden at the requested near-profile angle; do not recreate the frontal two-eye view of the old portrait.

Task: NEW PORTRAIT. Start fresh with a visibly side-on Great Horned Owl, almost a left profile with only the slight 20-degree turn toward camera specified above. The bill and brow project well to the LEFT of the visible eye, the full round rear cranium is on the RIGHT. It is crucial that this is not a frontal owl face with its bill pointing down toward the viewer. Match the camera direction of the previously shown goshawk composition reference public/birds/portrait-habicht-20260912.png without copying its anatomy. Rendering reference public/birds/portrait-gerfalke-20260913-v2.png is for soft realistic feathers and individual lower tips only. The true-species photographic reference inspected is Michel Lamarche's Great Horned Owl profile https://www.oiseaux.net/photos/michel.lamarche/great.horned.owl.3.html. Draw the rounded owl head from this lateral camera direction. Keep ear tufts SHORT and outward-swept, not tall rabbit ears. Set the visible eye at exactly (455,401), the ear tuft tops no higher than y=105, bill tip around (240,600), back of skull around x=1000 and individual lower neck tips near y=1091. All head and neck anatomy follows the real owl; no shoulders. Keep ample empty green margin. No text.
```

### Versuch 4

Verworfen: Auge deutlich zu tief, höhere Ohrbüschel; grünlich-olivfarbene Randreste nach einfacher Entmischung.

- Tool-Generierungspfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a78b-7091-9799-8e8fdc4b0e81/exec-727cdcbc-85ef-4861-ab86-2f97563edaaa.png` (automatisch vom Tool angelegt).
- Gesicherte Kopie: `outputs/proposals/virginiauhu-work/generation-04.png`.
- SHA-256: `ed719655d48e9642535f13127f65b4489d453e49f6dba1b02b760b6f77ccd4df`.
- Exakter übergebener Prompt (äußere Abschlusszeile getrimmt):

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

Species: Great Horned Owl (Bubo virginianus), adult.
Identity: widely set feather ear tufts, yellow iris, rufous facial disc with a black rim, dark hooked bill partly enclosed by pale facial bristles, white throat bib, finely mottled grey-brown barred plumage. Anatomy from real photographs of this species only.
The broad owl skull and facial disc must retain natural owl anatomy. The far eye is hidden at the requested near-profile angle; do not recreate the frontal two-eye view of the old portrait.

Task: NEW PORTRAIT, a complete replacement with corrected perspective. Depict a natural Great Horned Owl in LEFT LATERAL PROFILE with just a small amount of the front of its face visible, 20 degrees toward the viewer. The very short hooked owl bill protrudes at the left contour, not in the middle of the face. Only one eye is visible, and it must sit HIGH in the image at (455,401). The rounded cranium is low and broad with short widely separated outward ear tufts; top of feather tufts around y=110. The lower outline of the short neck ends at y=1091 with real irregular feather tips. No chest or shoulders. Think of the attached earlier goshawk reference public/birds/portrait-habicht-20260912.png only for the leftward camera angle and frame; the gyrfalcon reference public/birds/portrait-gerfalke-20260913-v2.png only for soft natural rendering and clean feather tips. Preserve the owl's own broad round skull and round rufous facial disc, no hawk anatomy. Real anatomy reference inspected: Michel Lamarche's Great Horned Owl side-view photograph at https://www.oiseaux.net/photos/michel.lamarche/great.horned.owl.3.html. The same species' profile in that photograph has a small concealed bill, fine soft plumage and clearly lateral view: use that anatomy with a mirror-reversed direction, SHORT neck crop and the grid above. Keep all margins at least 100 pixels. No text.
```

## Lokale Verarbeitung

Reproduzierbar mit `node outputs/proposals/virginiauhu-work/process.cjs`. Python cv2 fehlte; daher Node mit vorhandenem sharp 0.34.5.

1. Tatsächliche Hintergrundfarbe als Median der Bildränder bestimmt; bei Versuch 3 RGB [4,249,3].
2. Nach extract.py: Grünüberschuss G−max(R,B), Alpha=clamp(1−Überschuss/Hintergrundüberschuss). Überschuss <10 bleibt opak; Alpha <0,045 wird transparent.
3. Größte zusammenhängende Komponente bei Alpha >0,15 gewählt, 5×5-Nachbarschaft bewahrt; isoliertes Mattenrauschen entfernt.
4. RGB mit (RGB−(1−Alpha)×Hintergrund)/Alpha entmischt. Kein Weiß-/Grau-Key, keine pauschale Löschung heller Federn.
5. Versuch 3 gleichmäßig von 1254 auf 1204 px skaliert und um (−25,−15) px versetzt, in transparente 1254×1254-Leinwand eingesetzt. Nur leerer Rand fällt außerhalb; keine anatomische Verzerrung und keine getrennte Halskorrektur.
6. Restgrün nach Resampling an teiltransparenten Pixeln begrenzt; Grünanteil anhand nächster opaker Federfarbe innerhalb von 8 px korrigiert. Bei gelbgrünem Randüberschuss nur den Grünkanal abgesenkt. Alpha bleibt dabei unverändert; keine Erosion von Federspitzen.
7. Vergleichs- und Kontrollkomposite auf #e8e8e4, #22282a und #2d7f7a erstellt.

## Prüfung

Alle vier Versuche auf drei Hintergründen in voller Auflösung sowie bei 64/48 px visuell kontrolliert. Verworfenes Material ist als solches gekennzeichnet und kein zusätzlicher Bildvorschlag. Der fertige Vorschlag wurde nach den lokalen Korrekturen erneut auf allen drei Hintergründen geprüft.

- Echte Transparenz: 857657 vollständig transparente, 39485 teiltransparente und 675374 opake Pixel.
- Alpha-Begrenzung [157,104,1099,1104], kein sichtbarer Pixel berührt den Leinwandrand; kleinster Rand 104 px = 8,29 %.
- Schnabel, Ohrbüschel, feine Gesichtsfedern und unterer Federabschluss vollständig; kein angeschnittener Kopf. Keine erkennbaren Löcher im Gesicht oder Kehlfleck, kein weißer Halo oder sichtbarer zusammenhängender grüner Saum am fertigen Vorschlag.
- Technischer Restgrün-Test: 0 Pixel mit Alpha >20 und G−max(R,B)>12. Diese Messung ergänzt die Sichtprüfung und ersetzt sie nicht.
- Gelbe Iris, dunkler Schnabel, rötlicher Schleier mit dunklem Rand und weißer Kehlfleck erhalten. Auf 64/48 px ist die seitlichere Blickrichtung gegenüber dem Original erkennbar.
- Komposition: siehe ausdrücklich verbleibende Augenhöhenabweichung oben. Keine Behauptung vollständiger Rasterkonformität. Keine Einbindung oder echte Produktansicht verändert.
- Original-Prüfsumme, RGBA-Abmessungen, leerer Außenrand und feste Promptblöcke automatisch abschließend geprüft.

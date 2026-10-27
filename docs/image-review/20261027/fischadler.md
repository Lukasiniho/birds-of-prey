# Fischadler – Freistellungsvorschlag

Status: Vorschlag zur Nutzerprüfung, nicht eingebunden. Ausschließlich das vorhandene Porträt bearbeitet; keine Varianten angelegt. AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/portrait.md und docs/portrait-user-refinements-20260913/extract.py wurden gelesen.

## Quelle und Referenzen

Quelle: `public/birds/portrait-fischadler-20260913-v4.png`

SHA-256: `b646207f06adfab477e398992982af64d97bce21ed30956423bae57c8b76a6f6`

Die Prüfsumme stimmt mit dem Auftrag überein. Aktive Zuordnung in lib/portrait-images.ts bestätigt. Originalformat: 1194 × 1194 RGBA; die Cutout-only-Ausnahme erhält diese Leinwand statt 1254 × 1254.

- `public/birds/portrait-habicht-20260912.png` — Nur Komposition; keine Anatomievorlage, keine Anpassung des bestehenden Ausschnitts.
  SHA-256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`
- `public/birds/portrait-gerfalke-20260913-v2.png` — Nur Rendering und Federabschluss; keine Übernahme von Farben oder Anatomie.
  SHA-256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`

## Lieferdateien und Ableitung

| Datei | Quelle / Ableitung | SHA-256 |
| --- | --- | --- |
| outputs/proposals/portraits/fischadler.png | Unmittelbar aus obigem Original; Maske aus grünem Hintergrunddurchgang, lokale Randdekontamination | 424aab117242e8f985b55a02448920a5e2bcb0fe105894f8badd9b310fcceaa4 |
| outputs/proposals/fischadler-check.png | Original (Prüfsumme oben) und fertiger Vorschlag (Prüfsumme links oben); Hell/Dunkel/Petrol, jeweils zusätzlich 64/48 px | 48a6439caf5ceb8207990e9518e3b0a8709a32399f03437107d1832c2ca282e9 |
| outputs/proposals/fischadler-work/generated-1.png | Einziger Imagegen-Durchgang aus Original plus beiden Referenzen | 1c46b58065dde01f6c67ef01652d71220d4230fd28e440bc2cba1425982681de |
| outputs/proposals/fischadler-work/green-cutout-1.png | Lokale Grün-Entmischung von generated-1.png | 2995cb5ccd0775d8c2c04ba0c49c91c362c4e7abef98f38fa5905c9b75a15da4 |

Bericht: outputs/proposals/fischadler.md. Technische Messwerte: outputs/proposals/fischadler-work/verification.json. Vollformat-Prüfansichten des finalen Stands: outputs/proposals/fischadler-work/trial-2-light.png, trial-2-dark.png und trial-2-teal.png. Separater Kontaktbogen in tatsächlicher Anzeigegröße: outputs/proposals/fischadler-work/display-size-check.png.

## Generierungsweg und exakter Prompt

Built-in image_gen.imagegen, ein Aufruf (1 von maximal 4). Eingaben in dieser Reihenfolge: Original, Habicht-Kompositionsreferenz, Gerfalke-Renderingreferenz. Tool-Ausgabe:

`/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a6cc-7fe0-bce1-71e03904be1c/exec-098c32f9-b042-4c22-9f15-4e0de2b9704b.png`

Unverändert nach `outputs/proposals/fischadler-work/generated-1.png` kopiert. Das Tool legt seine eigene Ausgabe außerhalb des Repos an; sämtliche von mir geschriebenen Projektdateien liegen ausschließlich unter outputs/proposals/.

Die ersten drei Promptblöcke wurden programmgesteuert wortgleich und in derselben Reihenfolge aus docs/image-prompts/portrait.md übernommen. Nur Art- und Auftragsblock ergänzt. Exakter gesendeter Prompt, ebenfalls in outputs/proposals/fischadler-work/prompt-1.txt:

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

Species: Osprey (Pandion haliaetus), adult.
Identity: preserve the existing golden-yellow iris, dark hooked bill, grey cere, white crown and throat, broad brown eye stripe and brown nape feathers. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: TECHNICAL BACKGROUND-ONLY MATTE REPAIR. Replace the existing transparent background AND the baked-in checkerboard remnants around the top-right crown/nape and lower feather edges with flat pure green #00FF00. Every actual bird pixel must retain its exact position, shape and color. Preserve all feather tips, white plumage, closed bill, eye, head, neck and existing rendering. No redrawing, relighting, recoloring, cropping, scaling, recentering, feather erosion, or anatomy changes. For this CUTOUT ONLY task preserve the ORIGINAL 1194x1194 canvas and original framing exactly; do not adopt a new composition. Input image 2 is composition reference only; input image 3 is rendering/feather-ending reference only. Neither reference authorizes any change to this bird. Output the identical bird on flat green for local background unmixing.
Keep everything else pixel-identical in size and position.
```

## Lokale Bearbeitung

1. Python besitzt hier kein PIL. Verarbeitung deshalb mit Node und dem vorhandenen sharp; keine Installation und keine Änderungen an Projektabhängigkeiten.
2. Grün-Hintergrund anhand der Randmediane gemessen: RGB (4, 249, 6). Alphaberechnung analog extract.py aus dem Grünüberschuss G − max(R, B); Überschuss unter 10 als deckend, Alpha unter 0,045 als transparent. Hintergrundfarbanteil anschließend mathematisch entmischt. Kein Weiß-/Grau-Key und keine helligkeitsabhängige Löschung von Gefieder.
3. Die Generierung lieferte 1254 × 1254 und kleine Abweichungen an Textur und Position. Deshalb ist sie ausdrücklich **nicht** das neue Porträt. Lokale Bildblöcke wurden verglichen; die generierte Maske wird mit x' = 1,003x + 0,4 und y' = 1,0015y + 1,25 in das Originalraster abgetastet. Das Original selbst wird weder reskaliert noch verschoben oder beschnitten.
4. Finales Alpha = Minimum aus Originalalpha und der registrierten Grünmaske. So werden die eingebrannten Außenreste entfernt, ohne neue sichtbare Bildbereiche hinzuzufügen. Keine Erosion der Maske.
5. Randdekontamination ausschließlich im geometrisch bestimmten schmalen Saum: Für sichtbare Pixel mit Abstand unter 3 Pixeln zur teiltransparenten Maske werden Farben aus dem nächstgelegenen sicheren Original-Innenpixel übernommen (Suchradius 7 Pixel). Keine generierten RGB-Werte im finalen Porträt. Keine Auswahl anhand weißer/grauer Farbe. Der übrige Bildinhalt stammt unverändert aus dem Original.
6. Erste lokale Variante mit unregistrierter Maske zeigte noch Säume und wurde verworfen. Zweite lokale Variante ist der finale Vorschlag. Eine zusätzliche lokale Probe mit generierten Randfarben zeigte Grünreste und wurde verworfen. Es gab keine zweite Bildgenerierung.

Reproduktion: process.cjs erzeugt die Grün-Entmischung und Diagnose; refine-v2.cjs erzeugt den ausgewählten Stand trial-2.png; dieser ist bytegleich mit portraits/fischadler.png. refine.cjs dokumentiert nur die **verworfene** dritte lokale Probe. check.cjs erzeugt Vergleich und Messwerte.

## Prüfung und Grenzen

- Alle drei finalen Vollformat-Kompositionen selbst angesehen: #e8e8e4, #22282a, #2d7f7a. Zusätzlich den rechten Scheitel/Nacken vergrößert geprüft.
- Den Vergleichsbogen und 64-/48-Pixel-Ansichten selbst angesehen; diese Größen entsprechen app/species-row.css.
- Die breite eingebrannte Schachbrettfläche am rechten Scheitel/Nacken und rechten unteren Rand ist entfernt. Kein sichtbarer zusammenhängender Weiß- oder Grünsaum in diesen Prüfansichten. Keine sichtbaren neuen Löcher im Gefieder; Schnabel und markante Federspitzen vollständig im Bild.
- RGBA PNG, 1194 × 1194. Alpha-Begrenzung bei beiden Dateien identisch: [85, 85, 1107, 1094]. Kein neuer sichtbarer Pixel außerhalb der Originalmaske.
- 654.354 geprüfte Kernpixel (ringsum mindestens 6 Pixel deckender Vorschlag) sind in RGB und Alpha exakt unverändert; 0 Abweichungen. Auge, innere Schnabelzeichnung und innere Gefiederzeichnung wurden nicht neu generiert.
- Transparenzkorrektur: 34.320 Pixel mit verändertem Alpha; 34.297 Pixel mit veränderten RGB-Randwerten. **Damit ist nicht jeder ursprüngliche Vogel-Randpixel bitidentisch.** Die zulässige lokale Randdekontamination verändert Kantenfarben; die generativ gewonnene Matte ist keine Garantie einer mathematisch identischen Einzelfederkontur. Der Vorschlag bewahrt das Originalraster und den Bildkern, ist aber unter einer wörtlichen Forderung nach völlig identischen Vogelpixeln nur eingeschränkt konform. Diese Grenze soll bei der Nutzerfreigabe ausdrücklich sichtbar bleiben.
- Originaldatei nach Verarbeitung erneut geprüft: unveränderte SHA-256. Keine Änderung an public/, lib/, app/, tests/, docs/ oder Bildzuordnungen. Keine zusätzlichen Geschlechts- oder sonstigen Varianten.

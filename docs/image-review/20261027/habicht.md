# Habicht – Freistellungsvorschlag

Status: Vorschlag zur Nutzerprüfung, nicht eingebunden. Ein Generierungsdurchlauf; keine Varianten erzeugt. AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/portrait.md und das vorgegebene extract.py wurden gelesen.

## Ausgaben und Herkunft

- Finale RGBA-PNG: `outputs/proposals/portraits/habicht.png`, 1254 × 1254. SHA-256: `8657af308f6cfba1fd0e8e4eba35d52ce02533044ed536270b2127b163aab99f`.
- Quelle/Bearbeitungsziel für diese PNG: `public/birds/portrait-habicht-20260912.png`. SHA-256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`. Aktive Zuordnung in `lib/portrait-images.ts` geprüft.
- Vergleichsbogen: `outputs/proposals/habicht-check.png`. SHA-256: `9fb73ae1a49e4407ac61415734d320925c99d92baec923607dfe6eb38338c56b`. Quellen sind exakt die oben genannte Originaldatei und finale PNG mit den dort genannten Prüfsummen. Links Original, rechts Vorschlag; drei Hintergrundfarben; volle 1254-px-Bilder plus 64-/48-px-Ansichten.
- Zusätzliche Prüfansichten: `habicht-work/full-light.png`, `full-dark.png`, `full-teal.png`, `display-check.png`; jeweils ausschließlich aus der finalen PNG zusammengesetzt. Detailausschnitte liegen ebenfalls dort.

## Referenzen

- `public/birds/portrait-habicht-20260912.png`: Bearbeitungsziel und verbindliche Komposition. Keine Transformation, kein Beschnitt, keine Skalierung. Prüfsumme oben.
- `public/birds/portrait-gerfalke-20260913-v2.png`: visuell geprüfte Referenz ausschließlich für Rendering/Federabschluss, nicht für Anatomie. SHA-256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`. Nicht als Bildinput verwendet, weil der Habicht selbst unverändert bleiben soll.

## Generierungsweg

Built-in image_gen, edit mit genau dem Original als referenced_image_paths. Eine Generation, keine API-/CLI-Generierung. Automatischer Toolpfad:
`/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a7e8-7d31-a64c-d6d37c192af4/exec-7c92c396-1a19-438e-b76a-74fc53897331.png`.

Arbeitskopie: `outputs/proposals/habicht-work/matte-green.png`, SHA-256: `9366cf2812c410673cd3b5ac2d8238e6f9be15008a14f561ecf108e4fab277a2`. Der automatische Toolpfad wurde vom Bilddienst angelegt; sämtliche selbst geschriebenen Projektdateien liegen ausschließlich unter outputs/proposals/.

Der generierte Vogel hatte geänderte Farbwerte (mittlere absolute RGB-Differenz im gemeinsam deckenden Bereich 7,26), daher wurde sein Rendering verworfen. Nur die Grün-Maske dient zur Freistellung der originalen Bilddaten.

## Exakter verwendeter Prompt

Die ersten drei Blöcke wurden unverändert und in Reihenfolge aus portrait.md übernommen. Nur Art- und Auftragsblock wurden ausgefüllt. Separat gespeichert in `habicht-work/matte-prompt.txt`.

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

Species: Eurasian Goshawk (Accipiter gentilis), adult.
Identity: preserve the exact current orange-red iris, yellow cere, dark hooked bill, white eyebrow, slate-grey crown and barred pale neck. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: replace all transparent background and baked-in checkerboard remnants around the crown and lower feather edge with flat #00FF00. This is a background-only matte pass. Do not repaint, re-render, resize, translate, crop, beautify or alter ANY bird pixels. Precisely retain every feather tip and the bill tip. Input image 1 is itself the definitive composition reference; its exact 1254x1254 pixel geometry overrides any approximate framing specification above. Preserve the existing bird exactly and paint green only outside its actual feather contour, including the small checkerboard wedges.
Keep everything else pixel-identical in size and position.
```

## Lokale Verarbeitung

Reproduzierbar mit Node/sharp, da Python-PIL/cv2 in der verfügbaren Umgebung fehlten:

```sh
node outputs/proposals/habicht-work/finish.mjs outputs/proposals/habicht-work/matte-green.png
node outputs/proposals/habicht-work/check.mjs
```

1. Grün-Entmischung wie in extract.py: excess = G − max(R,B); Alpha = clamp(1 − excess/255). excess < 10 wird deckend, Alpha < 0,045 transparent. Die entmischte Generierung wird ausschließlich als Zwischenprüfung gespeichert.
2. Original-RGB übernehmen; finale Randmaske aus dem Minimum von originalem Alpha und Grün-Maske bilden. Keine Weiß-/Grau-Key-Segmentierung.
3. Zusammenhängende Hauptsilhouette bestimmen; abgelöste Maskenreste entfernen, mit 2-px-Nachbarschaft für Antialiasing. Keine Erosion des Vogels.
4. Randkontamination durch nahe intakte Original-Federfarben korrigieren (Suchradius maximal 4 px). Die Maske bleibt dabei unverändert. Voll deckende Randpixel werden nur bei deutlicher Farbabweichung korrigiert. Keine generierten Vogel-Farbwerte übernommen.
5. Alle Originalpixel mindestens 20 px innerhalb der bestehenden Originalkontur vollständig schützen und RGBA unverändert übernehmen. Kein geometrischer Filter, Warp, Versatz oder Resampling des Originals.

Die finale Datei ist wegen der ausdrücklich erlaubten Matten-/Randkorrektur nicht insgesamt pixelidentisch: 22342 Alpha-Werte und 13460 Rand-RGB-Pixel unterscheiden sich, darunter 537 deckende Randpixel. Im geschützten Inneren sind sämtliche 627751 Pixel exakt unverändert. Der Vergleich der Alpha-Begrenzung allein beweist keine vollständige Identität einzelner Randfedern; diese wurden zusätzlich visuell verglichen.

## Prüfung

- Leinwand: unverändert 1254 × 1254, echtes RGBA.
- Alpha > 50 %: Original und Vorschlag beide [120,145,1133,1107]. Kein Beschnitt, keine Verschiebung oder Größenänderung.
- Geschütztes Inneres: 0 geänderte RGBA-Pixel; zusätzlicher zentraler Bildausschnitt ebenfalls 0 Änderungen. Auge, Schnabel und Gefiederzeichnung bleiben aus dem Original erhalten.
- Visuell auf #e8e8e4, #22282a und #2d7f7a geprüft, jeweils bei 1254 px und in tatsächlichen 64-/48-px-Anzeigegrößen aus app/species-row.css. Scheitel und untere Federspitzen zusätzlich als Detailausschnitt geprüft.
- Ergebnis: der auffällige weiße Schachbrettrand oben rechts und die Schachbrettreste am Halsabschluss sind beseitigt; kein sichtbarer zusammenhängender Halo, keine grünen Säume, keine sichtbaren Löcher oder abgeschnittenen Schnabel-/Federspitzen. Feine helle Gefiederanteile bleiben erhalten.
- Nur Vorschlag. public/, lib/, app/, tests/, docs/ und Bildzuordnungen wurden nicht geändert. Die abschließende Nutzerfreigabe steht aus.

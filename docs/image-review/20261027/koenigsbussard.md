# Königsbussard – Porträt-Freistellung (Vorschlag)

Status: lokal geprüft, ausschließlich Vorschlag; Freigabe durch den Nutzer steht aus. Keine Einbindung, keine neue Variante. AGENTS.md, docs/vogelbild-standard.md und docs/image-prompts/portrait.md gelesen und angewandt. Der ausdrückliche CUTOUT-ONLY-Auftrag erhält die vorhandene Komposition.

## Ergebnis und Quelle

- Ausgabe: `outputs/proposals/portraits/koenigsbussard.png` — RGBA PNG, 1254 × 1254 Pixel.
- Ausgabe-SHA256: `aa6206d087a7f9d6bfb8d13f3f8fb60cc8ab71eccbd1241e6c4477aa6e11d49a`.
- Quelle/Bearbeitungsziel: `public/birds/portrait-koenigsbussard-20260912-v3.png`.
- Quellen-SHA256: `f02b3e373fe5d41c19f2e9df1f455f65b22d7fba324537c23c64bb5ad84bc382`; vor und nach der Verarbeitung bestätigt.
- Aktive Zuordnung in `lib/portrait-images.ts` gelesen und bestätigt, nicht verändert.
- Vergleich: `outputs/proposals/koenigsbussard-check.png` (aktuell / Vorschlag auf #e8e8e4, #22282a, #2d7f7a; zusätzlich tatsächliche 64-/48-px-Anzeigegrößen aus app/species-row.css).
- Vergleich-SHA256: `705ecca99a4d11b7303c0ac33dffdf62aaa2fd68f3aa6e7c50bfdee15f83e90d`. Quellen des Vergleichs sind das oben genannte unveränderte Original und der oben genannte Vorschlag.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png`: nur Komposition; kein Geometrieabgleich, keine Anatomieübernahme. SHA256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png`: nur Rendering und Federabschluss; keine Anatomie-/Farbübernahme. SHA256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.

Die historische Generierungsdatei aus docs/portrait-refinement-20260912/manifest.json wurde zur Diagnose angesehen: Sie zeigt ein eingebranntes Schachbrett. Sie wurde weder als Bearbeitungsbasis noch als Pixelquelle verwendet.

## Generierung

Ein einziger Hintergrunddurchlauf mit dem eingebauten image_gen.imagegen; keine CLI/API-Ersatzlösung. Bild 1 = aktives Original, Bild 2 = Habicht, Bild 3 = Gerfalke. Gefordert wurde flaches #00FF00. Der tatsächliche Randmedian des generierten Bildes ist RGB [4,249,7], weshalb die Grün-Entmischung diesen gemessenen Wert verwendet.

Tool-Ausgabe: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-aa94-7cc0-82aa-e15ba99543ec/exec-c4b0ff55-2857-4040-be63-03922cb95c14.png` (automatischer Speicherort des Bildwerkzeugs). Arbeitskopie: `outputs/proposals/koenigsbussard-work/generated-1-green.png`, SHA256 `25d855aeac37691cf75c27fc3bf805be42dd89369b5c24f9c67efc00ffb50870`. Alle von mir geschriebenen Projektdateien liegen unter outputs/proposals/.

### Exakter verwendeter Prompt

Unveränderte feste Blöcke 1–3, anschließend Art- und Auftragsblock; programmatisch gegen die Vorlage geprüft. Gesondert gespeichert in `outputs/proposals/koenigsbussard-work/prompt-1.txt`.

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

Species: Ferruginous Hawk (Buteo regalis), adult.
Identity: warm brown iris, yellow cere and gape, dark hooked bill, pale cream-white head with rusty brown streaking, no crest. Preserve the exact identity of the supplied current portrait. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: replace the transparent background and erroneous jagged white/checkerboard matte fringe with flat pure green #00FF00. This is CUTOUT ONLY, a background-only matte pass. Retain every true bird pixel, every white feather, fine feather tip, bill tip, and all existing feather markings. Keep exact original 1254x1254 canvas, bird geometry, pose, size and position; do not redraw, restyle, resize, recenter, shorten the neck, or change lighting. Preserve the existing feather ends while replacing only background residue between and beyond them. Input image 2 is composition reference ONLY; input image 3 is rendering and feather-edge reference ONLY, never anatomy. Existing portrait geometry takes precedence over generic composition targets for this cutout-only task.
Keep everything else pixel-identical in size and position.
```

## Lokale Verarbeitung

1. Node.js mit vorhandenem sharp, da Python-PIL fehlt. Reproduzierbares Skript: `outputs/proposals/koenigsbussard-work/process.mjs`.
2. Gemessener grüner Randmedian B = [4,249,7]. Grünüberschuss e = G − max(R,B); Alpha = clamp(1 − e / 242, 0, 1). Wie in der vorgegebenen extract.py: e < 10 setzt Alpha auf 1, Alpha < 0,045 auf 0. RGB-Entmischung F = (C − (1 − Alpha) × B) / Alpha. Das vollständig entmischte Zwischenergebnis und die Maske sind als green-unmixed.png und green-alpha.png archiviert.
3. Für das finale CUTOUT-ONLY-Bild ausschließlich die Maske übernommen: Alpha_final = min(Alpha_Original, Alpha_Grün). Sämtliche RGB-Kanäle bleiben bytegenau aus dem Original. Keine generierten RGB-Pixel im finalen Vogel; keine Verschiebung, Skalierung, Drehung oder Beschneidung.
4. 13 Pixel eingeschlossener kleiner Mattenfehler durch ihre ursprüngliche Deckung ersetzt: 8-Nachbarschaft, Hintergrundzugang bei Alpha < 250. Kein Erodieren oder Weichzeichnen der Federspitzen. Kein Weiß-/Grau-Key und keine farbbasierte Entfernung heller Originalfedern.
5. Original und Vorschlag für die Kontrollbilder identisch skaliert und auf die drei vorgeschriebenen Hintergründe komponiert.

## Prüfung

- Canvas exakt 1254 × 1254; RGB-Unterschied zum Original: **0 Pixel** (auch unsichtbare RGB-Kanäle unverändert).
- Alpha an 22265 Pixeln korrigiert; nirgends gegenüber dem Original erweitert. 831287 vollständig transparente, 17023 teiltransparente und 724206 deckende Pixel.
- Keine eingeschlossenen Mattenlöcher bei Alpha < 250. Sämtliche Alpha-Änderungen liegen höchstens 37 Pixel (Manhattan-Abstand) vom alten Mattenrand entfernt; der innere Vogel bleibt auch im Alpha unverändert.
- Alpha-Begrenzung vorher [99,125,1179,1129], danach [99,125,1179,1124]. Die 5 Pixel Differenz unten entstehen durch Entfernen des Hintergrundrests, nicht durch Verschieben oder Verkleinern des Vogels.
- Selbst visuell geprüft: vollständige 1254-px-Bilder auf Hell/Dunkel/Petrol, untere Federkante in nativer Auflösung und vergrößerten Ausschnitten, Vergleich bei 64 und 48 px. Keine sichtbaren rechteckigen Schachbrettreste, weißen/ grünen Halos oder Löcher; Schnabel und echte Federspitzen vollständig, helle Federn erhalten. Kopf, Auge, Zeichnung und Position unverändert.
- Visuelle Einschätzung gilt als lokale Vorschlagsprüfung, nicht als Nutzerfreigabe. Kein App-Screenshot nötig, da keinerlei Zuordnung geändert wurde; die tatsächlichen Anzeigegrößen wurden im Kontrollbogen reproduziert.

Prüfskript und Messwerte: `outputs/proposals/koenigsbussard-work/check.mjs`, `outputs/proposals/koenigsbussard-work/report.mjs`, `outputs/proposals/koenigsbussard-work/checks.json`. Alle Bildausgaben einschließlich Arbeitsdateien sind mit Quelle, Quellen-SHA256 und eigener SHA256 in `outputs/proposals/koenigsbussard-work/manifest.json` erfasst.

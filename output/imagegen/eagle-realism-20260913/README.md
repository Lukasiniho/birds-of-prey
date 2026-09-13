# Adler: realistischere Federn, 13. September 2026

Auftrag: Klippenadler nach Steinadler-Stil; Steppenadler und Kaiseradler nach ihren aktuellen Jagdbildern. Nur bestehende Flug-Altvögel und direkt daraus abgeleitete bestehende Jungvögel. Keine weiteren Varianten, Porträts oder Jagdbilder ändern.

Aktive v2-Originale und Jungvögel anhand `lib/bird-images.ts` ermittelt. Jede Art besitzt genau Altvogel und Jungvogel, keine zusätzlichen Morphen.

## Festgelegte neue adulte Originale vor Variantenbearbeitung

- `public/birds/klippenadler-20260913-v3.png`: SHA256 cc59521d48b44b11b1b612d545d3d6c1b3346c7631e075d3f45bf2030ae3f0db
- `public/birds/steppenadler-20260913-v3.png`: SHA256 789665a1fc0ad04fdd7355d5af63880bad6d19c055a27ab329c627817eb94149
- `public/birds/kaiseradler-20260913-v3.png`: SHA256 c34b407ca6f0c098b4e11e6ae53e2780e93d405b55ae1bd73ecb87df0c120577

Stilreferenzen: `public/birds/steinadler.png`, `public/birds/hunting-steppenadler.png`, `public/birds/hunting-kaiseradler.png`, jeweils nur Licht und Federdarstellung, keine Übernahme der Jagdpose.

Erzeugung: eingebautes Imagegen, zuerst Stilbearbeitung, anschließend technische Grünhintergrundbearbeitung desselben adulten Entwurfs. Die Rohfassungen hatten eingebranntes Schachbrett. Direkte Übernahme der alten Alpha-Maske sowie GrabCut-Versuche verworfen, da Kantenreste bzw. Verlust heller Federn sichtbar waren. Finale Freistellung durch `chroma.py`: explizite Grünmaske, Randfarben aus innerem Gefieder; keine Entfernung weißer oder grauer Gefiederfarben. Neue adulte Originale gleichmäßig auf die bisherigen artspezifischen Bildgrenzen eingepasst. Varianten verwenden unmittelbar diese neuen Originale.

Fachliche Kontrolle Klippenadler: https://www.sanbi.org/animal-of-the-week/verreauxs-eagle/ (adultes Schwarz-Weiß; Jungvogel gelb-/rotbraun mit dunklem Gesicht und Kehle). Flugfoto-Vergleich: https://www.warwicktarboton.co.za/birdpgs/131VeEgl.html .

## Abnahme

Alle sechs v3-PNGs in `public/birds/` eingebunden. Je Art ist `juvenile-ART-20260913-v3.png` unmittelbar aus `ART-20260913-v3.png` bearbeitet. Unveränderte Leinwand; keine Größenanpassung der Jungvögel. Exakte gemeinsame Alpha-Maske; rohe Silhouetten-IoU 98,58–99,27 %. Die mediane Verschiebung übereinstimmender innerer Merkmale beträgt 0,68–1,13 Pixel bei 1254 Pixeln Leinwand. Überlagerungen und helle/dunkle/farbige Hintergründe visuell kontrolliert; Kopf/Schnabel, Flügelfenster und weiße Schulterflecken erhalten.

Browser: auf localhost:3000 alle drei Arten mit Altvogel/Jungvogel geöffnet, sechs v3-WebP-Quellen geladen und Alterswechsel visuell geprüft. `npm run images`, `npm run lint` und `npm run build` erfolgreich. Keine Veröffentlichung ausgeführt.

Vollständige Prompts: `prompts.json`; Quell- und Ausgabepfade mit SHA256: `files.json`; Vorschau: `preview.png`.

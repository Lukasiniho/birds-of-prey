# Weißkopfseeadler — Freistellungsvorschlag

Status: Vorschlag zur späteren Freigabe, nicht eingebunden. Ausschließlich das zugewiesene vorhandene Porträt bearbeitet. AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/portrait.md und die lokale Freistellungsvorlage gelesen. Keine zusätzlichen Varianten.

## Dateien und Herkunft

- Ergebnis: `outputs/proposals/portraits/weisskopfseeadler.png` — RGBA-PNG, 1254 × 1254, unveränderte Leinwand, Position und Maßstab. SHA-256: `6670255d23bea93ffb470dca26c7515938d466a033d724cf5eac1941b146619d`.
- Direkte und einzige Bildquelle: `public/birds/portrait-weisskopfseeadler-20260913-v2.png`. SHA-256: `3d3810cc49baa72c9a4ed99e2012363f688e1f5e6367e03c93d778a383b71709` — entspricht der vorgegebenen Prüfsumme. Die aktive Zuordnung in lib/portrait-images.ts wurde lesend bestätigt.
- Vergleich: `outputs/proposals/weisskopfseeadler-check.png`. SHA-256: `39e186823c1198802618c3fcf27100a02465119d485c5a931921022c2da0cb33`. Links aktuelle Quelle, rechts Vorschlag; Zeilen hell #e8e8e4, dunkel #22282a, petrol #2d7f7a. Jedes Bildfeld enthält die unverkleinerten 1254 × 1254 Pixel.
- Anzeigegrößen: `outputs/proposals/weisskopfseeadler-work/display-check.png` — aktuelles Bild und Vorschlag in 64 und 48 px auf denselben drei Hintergründen. Größen aus app/species-row.css.
- Finale Vollformat-Prüfansichten: `outputs/proposals/weisskopfseeadler-work/light.png`, `dark.png`, `teal.png`. Quelle jeweils das oben dokumentierte finale Ergebnis. Keine weiteren Vogelvorschläge.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png` — ausschließlich Kompositionsvergleich; SHA-256 `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png` — ausschließlich Rendering und Federabschluss; SHA-256 `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.

Beide Referenzen selbst angesehen. Keine Anatomie, Maske oder Pixel einer anderen Art übernommen. Wegen CUTOUT ONLY wurde die bestehende Komposition nicht an ein neues Raster angepasst.

## Prompts und Generierungswege

Keine Bildgenerierung verwendet: 0 von maximal 4 Generierungen. Daher keine verwendeten Generierungsprompts und keine Generierungsdateipfade. Die ausdrücklich erlaubte sorgfältige lokale Kantenkorrektur wurde gewählt, um eine Neuzeichnung oder Verschiebung des Vogels zu vermeiden. Ein Grünhintergrund-Render mit anschließender Grün-Entmischung war in diesem lokalen Verfahren nicht erforderlich. Die festen Promptblöcke wurden nicht verändert oder durch einen abweichenden Generierungsprompt ersetzt.

## Lokale Bearbeitung

Reproduzierbares Verfahren: `node outputs/proposals/weisskopfseeadler-work/finish.cjs`. Prüfung und Vergleich: `node outputs/proposals/weisskopfseeadler-work/check.cjs`. Verwendet wird das vorhandene Node/sharp; Python PIL ist nicht installiert.

1. Original-RGBA unverändert eingelesen; kein Resize, Warp, Versatz oder neues Rendering.
2. Rechteckige Schachbrettreste am Scheitel, rechten Kopf-/Halsrand sowie einzelne Reste an Schnabel und linker Kontur anhand vergrößerter Ansichten räumlich maskiert. Die antialiasierte Kontur ist im Skript ausdrücklich hinterlegt. Keine globale Erosion oder pauschale Entfernung weißer/grauer Pixel.
3. An gelbem Schnabel und braunem unteren Gefieder lokal verunreinigte Randfarben entmischt: Vordergrundfarbe aus benachbarten sicheren Innenpixeln, Mischung mit dem alten Hintergrund nur in einem höchstens 13 px tiefen Randband geschätzt. Kein Weiß-/Grau-Farbschlüssel; die Farbe allein entscheidet nicht über Transparenz. Das weiße Kopfgefieder ist von dieser Farbentmischung ausgeschlossen.
4. Durch die Entmischung entstandene eingeschlossene transparente Einzelpixel verworfen und deren ursprüngliches Alpha wiederhergestellt.
5. RGBA verlustfrei gespeichert und die drei Hintergrundansichten sowie den Vergleich direkt daraus erzeugt.

## Prüfergebnis

- Finale Ansichten selbst auf #e8e8e4, #22282a und #2d7f7a in 1254 px sowie 64/48 px angesehen. Die groben rechteckigen Treppen und der umlaufende helle Saum sind beseitigt; keine sichtbaren Löcher oder am Bildrand abgeschnittenen Schnabel-/Federpartien. Die natürlichen hellen weißen Federränder bleiben erhalten.
- Technisch: echter Alpha-Kanal; 0 eingeschlossene transparente Pixel bei Alpha &lt; 128. Auge, innerer Schnabel, innerer Kopf und innerer Hals in den dokumentierten Prüfregionen byte-identisch zur Quelle.
- 19067 Randpixel mit korrigiertem RGB; 31338 Pixel mit korrigiertem Alpha. Keine RGB-Änderung mehr als 13 px innerhalb der ursprünglichen Außenkante. Die manuelle Maskenkorrektur reicht an einzelnen Schachbrettstellen bis 18 px innerhalb der alten, fehlerhaften Alphakante. Prüfwerte in `outputs/proposals/weisskopfseeadler-work/metrics.json` und `verification.json`.
- Präzisierung zu „pixel-identisch“: Die eigentliche Zeichnung wurde weder neu erzeugt noch geometrisch transformiert. Masken- und verunreinigte Randpixel ändern sich bei dieser Reparatur ausdrücklich. Eine exakte Rekonstruktion jedes ursprünglich vor dem eingebrannten Schachbrett vorhandenen feinsten Federhaars ist aus dieser Quelle nicht nachweisbar; die betroffenen Konturen wurden anhand der sichtbaren Federzeichnung rekonstruiert.

Alle Schreibzugriffe dieser Bearbeitung lagen unter outputs/proposals/. public/, lib/, app/, tests/, docs/ und Bildzuordnungen wurden nicht geändert.

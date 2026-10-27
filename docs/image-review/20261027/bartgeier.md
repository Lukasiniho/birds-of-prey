# Bartgeier — Porträtvorschlag, ausschließlich Freistellung

Status: Vorschlag zur Freigabe, nicht eingebunden. `AGENTS.md`, `docs/vogelbild-standard.md`, `docs/image-prompts/portrait.md` und die lokale Entmischungsvorlage wurden gelesen. Ausschließlich Dateien unter `outputs/proposals/` geschrieben.

## Ergebnis und Quelle

- Ergebnis: `outputs/proposals/portraits/bartgeier.png`, RGBA-PNG, **1120 × 1120 Pixel** (Originalleinwand gemäß CUTOUT ONLY).
- Bearbeitungsquelle: `public/birds/portrait-bartgeier-20260913.png`.
- Quellen-SHA256: `d79a866acdae337f67e35642252e898de1aaaff91968a880f791acf88d505541` — stimmt mit dem Auftrag überein.
- Ergebnis-SHA256: `f5e98df66f57af4f5199279cca4eefa4d712d9c0f084a4802fd3c1d69a9ab1c2`.
- Aktive Zuordnung in `lib/portrait-images.ts` lesend bestätigt; keine Zuordnung geändert.

Die sichtbare Störung bestand aus eingebrannten weißen/grauen Schachbrettflächen zwischen den rechten Federn. Diese Hintergrundflächen wurden entfernt und ihre Mischpixel lokal entmischt. Kopf, Auge, Schnabel, Bart, Stirn und übriges Gefieder wurden nicht neu gezeichnet. Kein Zuschnitt, kein Skalieren, keine Positionsänderung. Die ursprüngliche Komposition bleibt wegen des ausdrücklichen CUTOUT-ONLY-Auftrags erhalten.

## Referenzen und Rollen

- `public/birds/portrait-habicht-20260912.png`: ausschließlich Kompositionsreferenz, visuell gelesen. SHA256: `e033a1c495ac48e7bd25e9a9369ad110853a61e6cd6be06b0d8204b627ba4018`.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich Rendering/Federabschluss, visuell gelesen. SHA256: `7ed04fe91653ea7de31d40c1fc71650cd92f234d15e62c0b8c79590d56f569eb`.
- Keine Anatomie, Pixel oder Masken anderer Arten übernommen.

## Prompts und Generierungsweg

**Keine Bildgenerierung; 0 Generierungen. Keine verwendeten Bildprompts oder Generierungspfade.** Der Auftrag erlaubt ausdrücklich vorsichtige lokale Kantenbereinigung. Diese wurde gewählt, um das vorhandene Motiv zu erhalten. Die feste Promptvorlage ist daher nicht zur Anwendung gekommen. Es wurde kein Bild auf einem andersfarbigen Hintergrund neu gerendert und kein Grünpass benötigt.

## Lokale Verarbeitung

Reproduzierbares Skript: `outputs/proposals/bartgeier-work/refine.cjs`, Node.js mit dem vorhandenen `sharp`; Python PIL ist lokal nicht verfügbar.

1. Original verlustfrei als RGBA eingelesen, unveränderte Kopie als Arbeitsbasis.
2. Acht räumlich begrenzte Polygonbereiche an den sichtbar kontaminierten rechten Federzwischenräumen festgelegt. Nur diese Bereiche und ein schmaler Unsicherheitsrand werden bearbeitet; keine globale Weiß-/Grau-Freistellung.
3. Innerhalb dieser Maske lokale Vordergrundfarben aus unmittelbar benachbarten warmen Federn geschätzt. Fraktionale Deckung aus der lokalen Vordergrund/Hintergrund-Mischung bestimmt und Kantenfarben entmischt. Dunkle Gefiederpixel werden vor falscher Hintergrundzuordnung geschützt.
4. Alpha ausschließlich an diesen Hintergrundresten und ihren Mischkanten korrigiert. Keine Erosion, keine geometrische Transformation, kein Weichzeichnen und kein Löschen heller Stirnfedern.
5. Ergebnis als RGBA-PNG auf der ursprünglichen Leinwand geschrieben.

Die Zahlenprüfung erfasst **9028 geänderte Pixel**, begrenzt auf `x=894…1040, y=154…654`. Außerhalb der lokalen Bearbeitungsregion sind alle vier Kanäle bytegleich. Die sichtbare Alpha-Begrenzung bleibt **[55, 28, 1068, 1007]**. Korrigierte Mischpixel an den betroffenen Kanten haben notwendigerweise geänderte RGB-/Alpha-Werte; das übrige Motiv bleibt pixelgleich.

## Vergleich und Prüfung

- Vergleich: `outputs/proposals/bartgeier-check.png`, 3360 × 2540 Pixel. Oben Original, unten Vorschlag; Spalten hell `#e8e8e4`, dunkel `#22282a`, petrol `#2d7f7a`. Jede Hauptansicht liegt im Blatt bei 1120 × 1120 Pixeln; zusätzlich 64-/48-Pixel-Ansichten.
- Quellen des Vergleichs: obiger Originalpfad mit obiger SHA256 sowie `outputs/proposals/portraits/bartgeier.png` mit der obigen Ergebnis-SHA256.
- Vergleich-SHA256: `61cf2002260e9b6794abb86907c0fcd9ee422477ed89c1aa0a78541103143ee8`.
- Vergleichsverarbeitung: ausschließlich Alpha-Compositing auf die drei vorgeschriebenen Farben; Lanczos-Verkleinerungen für die Anzeigen. Skript: `outputs/proposals/bartgeier-work/check.cjs`. Keine Generierung und kein Prompt.
- Alle drei Ergebnisansichten in Originalgröße selbst visuell geprüft, zusätzlich vergrößerte Randdetails und die **aktuellen UI-Größen 64/48 px** aus `app/species-row.css`.
- Ergebnis der Sichtprüfung: sichtbare Schachbrettflächen entfernt; kein störender weißer Saum, keine sichtbaren Löcher im Gefieder, keine abgeschnittenen Schnabel- oder Federspitzen. Natürliche helle Federstrukturen bleiben erhalten. Größe und Position springen im Vergleich nicht.
- Der technische Null-Alpha-Komponententest zählt 427 neu transparente Pixel ohne rein nulltransparenten Weg zum Außenrand. Die zwei größeren Gruppen liegen in den zuvor sichtbaren Schachbrett-Zwischenräumen bei `[957,387…990,420]` und `[996,602…999,605]`; dies sind freigelegte Hintergrundtaschen, keine als Gefieder entfernten Innenflächen. Der Test ersetzt deshalb nicht die vorgenommene Sichtprüfung.
- Einzelansichten und Messwerte liegen unter `outputs/proposals/bartgeier-work/`; `metrics.json` enthält Dateihashes und Pixelvergleich.

Keine öffentlichen Bilder, Datenzuordnungen oder Produktdateien geändert. Keine weiteren Arten oder Varianten erzeugt.

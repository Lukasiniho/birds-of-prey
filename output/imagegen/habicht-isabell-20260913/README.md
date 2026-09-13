# Habicht: isabellfarbene Variante

13. September 2026. Der Nutzer hat die zuvor besprochene zusätzliche isabellfarbene Gefiederform beauftragt und anschließend kurze Auswahltexte verlangt. Die Auswahl lautet **Normal / Weiß / Isabell**; die Abgrenzung zur weißen Morphe der Unterart albidus steht rechts im Gefiedertext.

## Bilder

- `public/birds/morph-habicht-isabell-adult-20260913.png`
- `public/birds/morph-habicht-isabell-juvenile-20260913.png`

Beide wurden mit dem eingebauten Imagegen direkt aus dem aktiven adulten Original `public/birds/habicht.png` bearbeitet. Vollständige Prompts, Referenzrolle, Prüfsummen und Freistellung stehen in `manifest.json`. Die Jungvogeldarstellung kombiniert die allgemein belegte beige Farbabweichung mit der artspezifischen Jugendzeichnung; sie ist im UI ausdrücklich als illustrative Darstellung bezeichnet, nicht als Wiedergabe eines dokumentierten Einzelvogels.

## Prüfung

- Original/Raw-Überlagerungen: Schnabel, Augen, Flügelansätze, Spitzen, Schwanz und Füße visuell deckungsgleich.
- Freistellung auf Weiß, Dunkel und Grün kontrolliert; keine sichtbaren Schachbrettreste, helle Federn erhalten.
- Die vollständige Matrix Normal/Weiß/Isabell × Alt-/Jungvogel ist in `matrix.png` abgebildet. Alle sechs Bilder sind 1282 × 1282 mit Alpha.
- Beide neuen Bilder in der lokalen Artansicht geladen und visuell geprüft; Wechsel auf Jungvogel aktualisiert Bild, Irisfarbe und Beschreibung.
- Mobile Auswahl auf schmalem Viewport geprüft: kein horizontaler Seitenüberlauf; zu breite Auswahlgruppen scrollen innerhalb ihrer Begrenzung. Temporärer Viewport anschließend zurückgesetzt.
- `npm run build`, `npm run lint:design`, gezielter Oxlint für Morphendaten und deren Testdatei sowie `git diff --check` erfolgreich.
- Gesamter Lint-Lauf: bestehende Fehler in `components/ui/carousel.tsx:101` sowie `components/ui/chart.tsx:155`, `:203`, `:302`; diese Dateien wurden nicht verändert.
- `tests/morphs.test.ts`: 7 von 8 Tests erfolgreich. Der verbleibende Fischadler-Test erwartet die alte Geschlechterreihenfolge (male/female statt female/male); unabhängig von dieser Habicht-Ergänzung. Habicht-bezogene veraltete Erwartungen wurden aktualisiert.

# Bildrunde nach Nutzerbewertung, 26./27. Oktober 2026

Bewertet über `npm run images:review` (Stimmen und Entscheidungen:
`docs/image-review/votes.json`). Je Art ein paralleler Codex-Lauf mit
Pflichtbriefing; Prompts aus den festen Bausteinen in `docs/image-prompts/`.
Die Einzelberichte in diesem Ordner nennen Quelle mit Prüfsumme,
Referenzrollen, finale Prompts, lokale Schritte und Prüfergebnis. Neue Dateien
tragen das Suffix `-20261027`; die Vorgänger bleiben in `public/birds/`.

## Porträts (14 übernommen)

| Porträt | Änderung | Nachträgliche Skalierung |
|---|---|---|
| Habicht, Fischadler, Bartgeier, Weißkopfseeadler, Königsbussard | nur Freistellung, Vogel pixelgleich | – |
| Baumfalke | Freistellung; halbtransparenter Verlauf rechts unten und grünlicher Saum entfernt (2. Runde), Kopf pixelgleich | – |
| Steppenadler | unterer Federabschluss neu | – |
| Lannerfalke | etwas weniger Hals | – |
| Schleiereule, Uhu, Virginiauhu | neu, nach links gewandt | 1,112 / 1,04 / 1,048 |
| Aguja, Zwergadler | neu, natürlicheres Gefieder bzw. Perspektive und Schnabel | 1,172 / 1,106 |
| Sekretär | neu; 3. Runde: kurzer Hals, Kopf auf Habicht-Größe, Schopf kompakt | im Bild enthalten |

Die Skalierung ist linear und gleichmäßig um die Mitte der Vogelbegrenzung;
sie gleicht die sichtbare Vogelfläche der Vorgängerdatei an, damit die am
13. September abgestimmten Größen erhalten bleiben.

## Flugbilder (8 übernommen)

Habichtsadler, Iberienadler, Klippenadler und Steppenadler, jeweils Altvogel
und Jungvogel: fotografischer neu gerendert, Rahmen innerhalb 1 %. Der
Jungvogel ist jeweils eine Bearbeitung des neuen Altvogels.

Nicht übernommen: Kronenadler (markante Schwingenbänderung ging verloren,
Nutzer behält alt) und Zwergadler. Beim Zwergadler wären neuer heller
Altvogel und alte dunkle Morphe nicht deckungsgleich gewesen (Umriss-IoU
0,81); die neue dunkle Morphe überzeugte nicht. Entscheidung „alles alt“:
alle vier Zwergadler-Flugbilder bleiben beim Stand vom 13. September.

## Jagdbilder (4 übernommen)

Iberienadler, Klippenadler, Zwergadler: gleiche Komposition, fotografischer
gerendert, Gefieder nach dem neuen Flugbild. Habichtsadler: in der alten
Komposition blieb er gemalt, daher in Runde 2 als neue Szene erzeugt (gleiche
Beute, ähnlicher Rahmen, dunkles Unterflügelband wie im Flugbild).

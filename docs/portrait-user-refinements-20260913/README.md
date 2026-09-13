# Porträtkorrekturen nach Nutzerfeedback, 13. September 2026

Dieser Stand ersetzt für die folgenden 16 Porträts die Bewertungen des vorherigen Audits. Frühere Prüfberichte sind historische Zwischenstände und keine Nutzerfreigabe.

| Porträt | Änderung gegenüber dem jeweiligen Ausgangsbild |
|---|---|
| Gerfalke | insgesamt 12 % kleiner |
| Turmfalke | alter Kopf, kürzerer Halsabschluss; anschließend auf Nutzerwunsch 7 % größer als v4 |
| Lannerfalke | 7 % kleiner |
| Sakerfalke | 5 % größer |
| Weißkopfseeadler | 7 % größer |
| Zwergadler | 8 % kleiner |
| Gaukler | 10 % größer |
| Kronenadler | 8 % größer |
| Falklandkarakara | 8 % größer |
| Andenkondor | 9 % größer |
| Steppenadler | 7 % größer |
| Baumfalke | kürzerer Hals mit natürlichem Federabschluss |
| Fischadler | etwas mehr Hals; überlange Generierung lokal begrenzt |
| Habichtsadler | flacherer, längerer Kopf, dunklere Ohrdecken; Anatomie und Gefieder anhand Artvorlagen korrigiert |
| Kaiseradler | Gesicht und Kehle dunkler; Gold auf Scheitel und Nacken begrenzt |
| Iberienadler | heller Scheitel-/Nackenbereich und dunkles Gesicht passend zum Flugbild |

Die Prozentangaben sind lineare Größenänderungen, keine Flächenwerte. Bei reinen Größenkorrekturen wird der gesamte Vogel gleichmäßig skaliert. Halsbereiche werden nicht gestaucht oder gedehnt. Quellpfade, Prüfsummen, Generierungen, Maskierung und abschließende Platzierung stehen in `manifest.json`. Beim Turmfalken gilt der pixelgenaue Kopfvergleich für v4 vor der anschließenden einheitlichen Vergrößerung.

`final-portraits.png` zeigt den finalen Stand bei 128, 64 und 48 Pixeln auf hellem, dunklem und grünlichem Hintergrund. Der Vorher-nachher-Bogen `content-comparisons.png` zeigt den Turmfalken noch vor seiner abschließenden Vergrößerung. Die endgültigen Quellen wurden auf Alpha, vollständigen Rand, Schnabel, Kopf und Federabschluss geprüft. Die localhost-Artenleiste verwendet 64-Pixel-Bildboxen; Falken und Adler wurden dort kontrolliert, helle Federn zusätzlich im Dunkelmodus.

`verify.py` liest die aktive Zuordnung und prüft alle 39 Dateien: 16 überarbeitet, 23 unverändert. Habicht, Seeadler, Aguja und Wüstenbussard bleiben unverändert. Der Prüflauf schreibt nur `verification.json`, niemals Bildzuordnungen. `npm run images` wurde erfolgreich ausgeführt. Eine visuelle Prüfung durch den Agenten ist keine Bestätigung durch den Nutzer.

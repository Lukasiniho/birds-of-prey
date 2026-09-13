> Historischer Zwischenstand: Spätere Nutzerkorrekturen und aktuelle Prüfung stehen in [portrait-user-refinements-20260913](../portrait-user-refinements-20260913/README.md).

# Porträts: erneute Korrektur nach Nutzerprüfung

Die v2-Fassungen der drei Buteo-Bussarde und des Wanderfalken wurden am 12. September als zu kurz, die des Turmfalken als zu lang abgelehnt. Ursache im bisherigen Verfahren: Nach der Generierung wurde der untere Hals zusätzlich vertikal skaliert. Dieses Verfahren wird für weitere Korrekturen nicht verwendet. Die bereits bestätigten Referenzen bleiben unverändert.

## Verbindliche Rückmeldungen

| Art | Auftrag / Status |
| --- | --- |
| Habicht | Perfekt, feste Kompositionsreferenz; unverändert lassen. |
| Seeadler | Perfekt; unverändert lassen. |
| Wüstenbussard | Aktuelle aufgehellte Fassung perfekt; unverändert lassen. |
| Aguja | Perfekt; unverändert lassen. |
| Rotschwanzbussard | Gegenüber v2 etwas mehr Hals. |
| Mäusebussard | Gegenüber v2 etwas mehr Hals. |
| Königsbussard | Gegenüber v2 etwas mehr Hals. |
| Turmfalke | Gegenüber v2 weniger Hals, vorsichtig zwischen den abgelehnten Extremen. |
| Wanderfalke | Gegenüber v2 etwas mehr Hals. |
| Lannerfalke | Fast perfekt; nur minimal weniger Hals. |
| Sakerfalke | Gesamtdarstellung zu klein; tatsächliche Kopfgröße und transparente Ränder prüfen. |
| Baumfalke | Unteren Federabschluss sauber und natürlich ausarbeiten. |
| Kaiseradler | Zu rund und zu ähnlich zu den anderen drei Adlern; Artmerkmale und Kopfform prüfen. |
| Habichtsadler | Zu rund und zu ähnlich zu den anderen drei Adlern; Artmerkmale und Kopfform prüfen. |
| Iberienadler | Zu rund und zu ähnlich zu den anderen drei Adlern; Artmerkmale und Kopfform prüfen. |
| Klippenadler | Zu rund und zu ähnlich zu den anderen drei Adlern; Artmerkmale und Kopfform prüfen. |
| Steinadler | Fast perfekt; nur ein bisschen weniger Hals. |
| Riesenseeadler | Etwas weniger Hals. |
| Zwergadler | Minimal mehr Hals. |
| Gaukler | Weniger Hals. |

## Prüfung

Jedes neue Bild wird vor der Zuordnung neben dem unveränderten Habicht betrachtet: gleiche Leinwand, Kopfmaßstab, Augenhöhe, sichtbarer Hals, natürliche Federkontur und Vollständigkeit. Zusätzlich echter Alpha-Kanal, heller/dunkler/farbiger Hintergrund sowie 64/48 px. Keine pauschale Freigabe aus Alpha-Daten ableiten. Abgelehnte Zwischenstände bleiben als solche dokumentiert.

## Abgeschlossener lokaler Stand

Alle 39 aktiven Porträts geprüft, 31 überarbeitet und 8 beibehalten. Die vier ausdrücklich bestätigten Bilder sind bytegleich. Die Einzelbefunde stehen in [audit.md](audit.md), Quellen, Prompts, verworfene Entwürfe, Freistellung und finale Prüfsummen in [manifest.json](manifest.json).

Bei Schopfkarakara, Sekretär und Weißstorch erwies sich die erste Freistellung als ungeeignet: Sie hinterließ Schachbrettreste oder verletzte Teile der Kontur. Die finale Fassung stammt aus einem separaten Hintergrundtausch auf Grün und anschließender Alpha-Rückgewinnung; helle und graue Gefiederpixel werden dabei nicht nach ihrer Helligkeit entfernt.

Proportionale Platzierungen betreffen immer den gesamten Vogel und sind je Bild dokumentiert. Kein Hals wurde gestaucht oder gestreckt. Die Vergleichsbögen zeigen finale Dateien einschließlich dieser Platzierung. `verify.mjs` kontrolliert die 39 aktiven Dateien und die vier unveränderten Referenzen; es ist ein Bestandscheck, kein Ersatz für die Sichtprüfung.

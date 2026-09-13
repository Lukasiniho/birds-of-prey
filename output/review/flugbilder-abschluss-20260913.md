# Abschlussprüfung der Flugbilder · 13. September 2026

Der aktuelle Flugbildbestand wurde vollständig als Artmatrizen geprüft: **39 Arten, 108 auswählbare Zustände**. Diese Prüfung umfasst vorhandene Altersstufen, Morphen und bereits vorhandene optisch unterschiedliche Geschlechter. Keine zusätzlichen Geschlechtsvarianten angelegt. Porträts gehören zur getrennten Porträtbearbeitung.

## Prüfumfang und Nachweise

- Sichtprüfung sämtlicher aktueller Artmatrizen: Flugrichtung nach links, Unteransicht, natürliche Flügel-/Körperanschlüsse, artspezifische Proportionen, lesbarer Kopf, Farben, Federkanten und Position beim Alters-/Morphenwechsel. Die Arten bleiben in ihrer eigenen Anatomie; keine Übertragung von Bussardkörpern auf Falken.
- Nach der ersten Restbestandsprüfung nochmals alle 108 tatsächlich durch die Website auswählbaren Zustände aus `birds`, `plumagesFor`, `getBirdMorphConfig` und `getBirdMorphAppearance` aufgelöst. Dadurch werden auch altersabhängige Morphen und Fallbacks erfasst.
- Aktuelle Quellen, SHA-256-Hashes, Bildmaße, Boundingboxen und HTTP-Ergebnisse stehen in [resolved-flight-states.json](resolved-flight-states.json). Alle 108 Bilder besitzen transparente Pixel und berühren mit ihrem sichtbaren Motiv keine äußere Bildkante. Jeder optimierte Bildpfad wurde vom laufenden localhost-Server abgerufen und bytegenau mit der lokalen Datei verglichen.
- Neun zusätzliche Korrekturen aus diesem letzten Durchgang: jede direkt aus der aktuellen normalen adulten Originaldatei derselben Art. Vor der lokalen Freistellung die inneren Landmarken geprüft; anschließend exakt gleiche adulte Alpha-Maske und Leinwand nachgewiesen. Helle/dunkle Hintergründe visuell kontrolliert. Identische Alpha-Masken allein wurden nicht als Anatomienachweis verwendet.
- Die neun neuen Zustände wurden zusätzlich in der Website ausgewählt; `currentSrc`, erfolgreiches Laden und Bildversion geprüft. Alle angeforderten Artgrößen bleiben zentral in `BirdArt` und gelten für alle Varianten der Art.
- Aufgemalte Schachbretter verworfen; finale Hintergründe lokal entfernt. Echte weiße Federn erhalten. Keine Veröffentlichung oder Produktionseinbindung vorgenommen.
- `npm run images`, `npm run build`, `npm run lint:design`, Lint der geänderten Quelldateien, vorhandener Morphenbildtest und `git diff --check` erfolgreich. Der vollständige Lint meldet weiterhin vier bestehende Fehler in `components/ui/carousel.tsx:101` und `components/ui/chart.tsx:155,203,302`; diese Dateien wurden in der Bildbearbeitung nicht verändert.

## Artweise Sichtprüfung

| Art | Zustände | Ergebnis | Aktuelle Matrix |
| --- | ---: | --- | --- |
| Rotschwanzbussard | 6 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/rotschwanzbussard.jpg) |
| Habicht | 4 | Sehr helle Form Adult/Juvenil erneuert, Stirnfarben bereinigt; normaler Jungvogel zusätzlich neu aus Adult. Alle vier Zustände geprüft. | [Ansehen](final-matrices/habicht.jpg) |
| Mäusebussard | 6 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/maeusebussard.jpg) |
| Wanderfalke | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/wanderfalke.jpg) |
| Turmfalke | 3 | Neue Serie v5 anhand echter Turmfalkenreferenz; Weibchen/Jungvogel direkt aus neuem Adult. Frühere abgelehnte Puppenfassungen nicht aktiv. | [Ansehen](final-matrices/turmfalke.jpg) |
| Steinadler | 2 | Adult erhalten; Jungvogel neu direkt daraus, Fußstellung und Konturen angeglichen. | [Ansehen](final-matrices/steinadler.jpg) |
| Seeadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/seeadler.jpg) |
| Fischadler | 3 | Adult/Weibchen erhalten; Jungvogel neu mit orangefarbener Iris und passender Adult-Geometrie. | [Ansehen](final-matrices/fischadler.jpg) |
| Wüstenbussard | 2 | Vom Nutzer ausdrücklich bestätigte Bilder unverändert erhalten. | [Ansehen](final-matrices/wuestenbussard.jpg) |
| Kaiseradler | 2 | Verkürzte Flügel im Verhältnis zum Körper und direkt abgeleiteter Jungvogel geprüft. | [Ansehen](final-matrices/kaiseradler.jpg) |
| Steppenadler | 2 | Bestätigte v2-Geometrie und Jungvogel geprüft. | [Ansehen](final-matrices/steppenadler.jpg) |
| Sekretär | 2 | Jungvogel neu direkt aus Adult, Schwanz- und Beinposition angeglichen. | [Ansehen](final-matrices/sekretaer.jpg) |
| Andenkondor | 3 | Männlicher Kopf rötlicher wie gewünscht; weibliche/juvenile Kopfmerkmale erhalten. Alle drei Zustände geprüft. | [Ansehen](final-matrices/andenkondor.jpg) |
| Wespenbussard | 6 | Korrigierte v3-Serie mit kürzerem sichtbaren Hals und breiterem Schwanzfächer: sechs Zustände geprüft. | [Ansehen](final-matrices/wespenbussard.jpg) |
| Bartgeier | 3 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/bartgeier.jpg) |
| Kronenadler | 2 | Neue v2-Serie mit direkt abgeleitetem Jungvogel geprüft. | [Ansehen](final-matrices/kronenadler.jpg) |
| Habichtsadler | 2 | Bestätigte realistischere Fassung erhalten, Adult/Juvenil in Bilddatei gleich zentriert, Darstellung 89%. | [Ansehen](final-matrices/habichtsadler.jpg) |
| Iberienadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/iberienadler.jpg) |
| Klippenadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/klippenadler.jpg) |
| Zwergadler | 4 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/zwergadler.jpg) |
| Weißkopfseeadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/weisskopfseeadler.jpg) |
| Riesenseeadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/riesenseeadler.jpg) |
| Gaukler | 5 | Jungvogel neu direkt aus Adult, Schwanzansatz/Position korrigiert; bestehende zwei weibliche und zwei männliche Formen geprüft. | [Ansehen](final-matrices/gaukler.jpg) |
| Aguja | 2 | Adult erhalten; Jungvogel neu direkt daraus. Weißer Schwanz-Federrand im Detail auf dunklem Grund geprüft und erhalten. | [Ansehen](final-matrices/aguja.jpg) |
| Uhu | 2 | Alterspaar visuell geprüft; feine altersbedingte Federstruktur variiert, keine auffällige Verlagerung von Kopf/Körper/Flügeln. | [Ansehen](final-matrices/uhu.jpg) |
| Schwarzmilan | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/schwarzmilan.jpg) |
| Rotmilan | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/rotmilan.jpg) |
| Gerfalke | 6 | Bestätigte adulte Geometrie erhalten; sechs vorhandene Zustände geprüft. | [Ansehen](final-matrices/gerfalke.jpg) |
| Sakerfalke | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/sakerfalke.jpg) |
| Lannerfalke | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/lannerfalke.jpg) |
| Baumfalke | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/baumfalke.jpg) |
| Falklandkarakara | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/falklandkarakara.jpg) |
| Schopfkarakara | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/schopfkarakara.jpg) |
| Königsbussard | 4 | Vier Zustände geprüft, juvenile Stirn zusätzlich im Detail kontrolliert; gemeinsame Darstellung 95%. | [Ansehen](final-matrices/koenigsbussard.jpg) |
| Harpyie | 2 | Gelbere Adultfüße und sauber freigestellter, direkt abgeleiteter Jungvogel geprüft. | [Ansehen](final-matrices/harpyie.jpg) |
| Kampfadler | 2 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/kampfadler.jpg) |
| Virginia-Uhu | 2 | Jungvogel neu direkt aus Adult, Kopf- und Fußstellung angeglichen. | [Ansehen](final-matrices/virginiauhu.jpg) |
| Weißstorch | 2 | Proportionen korrigierte v2-Serie; beide Altersstufen geprüft. | [Ansehen](final-matrices/weissstorch.jpg) |
| Sperber | 3 | Alle vorhandenen Zustände visuell geprüft; aktuelle Serie beibehalten, kein weiterer konkreter Korrekturbedarf festgestellt. | [Ansehen](final-matrices/sperber.jpg) |

## Neue Dateien und Generierung

Eingebaute Bildgenerierung, anschließend lokale Freistellung. Vollständige Prompts, unveränderte Adultquellen, verworfene Schachbrettfassungen und finale Hashes:

- [Sechs erste Korrekturen](../imagegen/remaining-refresh-20260913/edits.json)
- [Drei weitere Geometriekorrekturen](../imagegen/remaining-refresh-20260913/alignment-edits.json)

- [juvenile-sekretaer-20260913-v3.png](../../public/birds/juvenile-sekretaer-20260913-v3.png)
- [juvenile-virginiauhu-20260913-v3.png](../../public/birds/juvenile-virginiauhu-20260913-v3.png)
- [juvenile-gaukler-20260913-v3.png](../../public/birds/juvenile-gaukler-20260913-v3.png)
- [juvenile-fischadler-20260913-v3.png](../../public/birds/juvenile-fischadler-20260913-v3.png)
- [morph-habicht-albidus-male-20260913-v3.png](../../public/birds/morph-habicht-albidus-male-20260913-v3.png)
- [morph-habicht-albidus-juvenile-20260913-v3.png](../../public/birds/morph-habicht-albidus-juvenile-20260913-v3.png)
- [juvenile-habicht-20260913-v3.png](../../public/birds/juvenile-habicht-20260913-v3.png)
- [juvenile-steinadler-20260913-v3.png](../../public/birds/juvenile-steinadler-20260913-v3.png)
- [juvenile-aguja-20260913-v3.png](../../public/birds/juvenile-aguja-20260913-v3.png)

Die früheren offenen Listen im laufenden Statusprotokoll sind historisch. Dieser Abschluss bezieht sich auf den hier verzeichneten aktuellen Stand; spätere Nutzerkorrekturen können auf diesen Dateien aufbauen.

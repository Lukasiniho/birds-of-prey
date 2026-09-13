# Verbindlicher Standard für Vogelbilder

Stand: 12. September 2026. Gilt für die vorhandenen Flugbilder und Porträts sowie alle daraus entstehenden Varianten. Diese Vorgaben konkretisieren `AGENTS.md` und haben Vorrang vor älteren Bildprompts und Gestaltungsvorschlägen, insbesondere dem Porträt-Audit vom 9. September. Das Audit bleibt als Bestandsaufnahme nutzbar.

## Umfang der aktuellen Überarbeitung

Ausschließlich vorhandene Bilder verbessern: unpassenden Stil, schlechte Freistellung, falsche Farben, falsche Perspektiven und uneinheitliche Ausschnitte korrigieren. Keine neuen Arten, zusätzlichen Geschlechtsvarianten oder sonstigen Varianten einbauen. Bereits vorhandene Geschlechtsvarianten nur berücksichtigen, wenn sie sich optisch unterscheiden. Die Regeln zur Ableitung von Varianten beschreiben die Bearbeitung des vorhandenen Bestands und sind kein Auftrag, weitere Varianten zu erzeugen.

Verbessern umfasst ausdrücklich die vollständige Neuerstellung als Ersatz für ungeeignete Bilder bestehender Arten. Je Bild entscheiden: behalten, gezielt korrigieren oder vollständig ersetzen. Eine Neuerstellung ist sinnvoll, wenn Anatomie, Perspektive, Stil oder Bildqualität durch einzelne Korrekturen nicht zuverlässig dem Standard entsprechen. Das gilt für Flugbilder und Porträts unabhängig voneinander.

Bei einem neu erstellten adulten Flugoriginal muss die fehlerhafte Pose oder Silhouette des alten Bildes nicht erhalten bleiben: Maßgeblich ist die gemeinsame Zielperspektive bei korrekter artspezifischer Anatomie. Danach dieses neue Original festlegen und alle zu ersetzenden vorhandenen Varianten direkt daraus bearbeiten. Geometrisch unpassende Altvarianten müssen ebenfalls ersetzt werden. Die unveränderliche Geometrie gilt zwischen dem neuen Original und seinen Varianten. Varianten werden auch beim vollständigen Ersatz nicht unabhängig generiert. Neue Porträts folgen derselben gemeinsamen Ausschnitt- und Stilreferenz. Echte Transparenz und gegebenenfalls lokale Freistellung sind auch für Neuerstellungen verpflichtend.

## Gemeinsame Bildsprache

Naturalistische, fachlich zutreffende Vogelillustrationen mit vergleichbarem Detailgrad, Licht, Kontrast und Federdarstellung. Den Stil anhand festgelegter Referenzbilder angleichen. Eine andere Art liefert nur Stil und Komposition, niemals die anatomische Vorlage. Keine erfundenen Merkmale zur stärkeren Unterscheidung ähnlicher Arten.

## Flugbilder: Original zuerst

- Ansicht von unten, Kopf und Blick nach links. Die Flügelachse verläuft aus Sicht des Betrachters von unten links nach oben rechts.
- Anatomische und räumliche Plausibilität vor bloßer Ausrichtung prüfen: ein zusammenhängender Körper mit plausiblen Schulteransätzen, Flügelgelenken, Überdeckungen und perspektivischer Verkürzung. Echte Flugfotos der Art als Geometrievorlage verwenden. Keine aufgesetzten Flügel, verdrehten Brust-/Rückenansichten oder widersprüchlichen Ansichten in einem Bild. Ein Fehler im adulten Original darf nicht aus Gründen der Deckungsgleichheit festgeschrieben werden; diese gilt erst für Varianten des korrigierten Originals.
- Den Vogel vollständig zeigen, einschließlich Flügelspitzen, Schwanz und gegebenenfalls langen Beinen. Gemeinsame Perspektive bedeutet nicht gleiche Flügel- oder Körperproportionen für alle Arten.
- Aktuelle Quellen über `lib/bird-images.ts`, `lib/birds.ts` (einschließlich Fallbacks) und `lib/morphs.ts` ermitteln. URL-Abfrageparameter gehören nicht zum lokalen Dateipfad. Nicht eingebundene Altdaten nicht versehentlich bearbeiten.
- Pro Art die normale adulte Morphe als Original festlegen. Wenn deren Perspektive oder Stil abweicht, zuerst dieses Bild überarbeiten. Das fertige adulte Bild wird vor der Variantenproduktion als gemeinsame Basis dokumentiert.
- Jungvögel, helle/dunkle Morphen und männliche/weibliche Varianten immer unmittelbar aus demselben Original bearbeiten. Auch kombinierte Varianten wie „dunkler Jungvogel“ gehen direkt vom normalen adulten Original aus.
- Bei allen Varianten sind Leinwand, Position, Maßstab, Perspektive, Pose, Flügelstellung, Schwanzhaltung, Silhouette und Stil unveränderlich. Nur fachlich erforderliche Gefieder-, Farb-, Zeichnungs- und sonstige Alters-/Geschlechtsmerkmale ändern. Tatsächliche Größenunterschiede zwischen Geschlechtern nicht durch einen anderen Bildmaßstab darstellen.
- Keine Kette Original → Morphe → Jungvogel. Eine neue Version des Originals macht eine erneute Prüfung aller davon abhängigen Varianten erforderlich.
- Eine Morphenüberarbeitung umfasst immer auch deren vorhandene Jungvogelbilder und alle weiteren vorhandenen Altersstufen. Die gesamte vorhandene Matrix aus Morphen und Altersstufen erfassen und aktualisieren; adulte Korrekturen nicht mit veralteten Jungvogelmorphen kombinieren. Jede Kombination wird direkt vom normalen adulten Original bearbeitet.

## Bestätigte Flugreferenzen und Bildrahmen

- Der am 13. September bestätigte Habichtsadler (`public/birds/habichtsadler-20260913-v2.png`) dient als Referenz für weichere, realistische Federstruktur und Licht, niemals als Anatomievorlage anderer Arten.
- Die bestätigte Proportionskorrektur des Steppenadlers liegt in `public/birds/steppenadler-20260913-v2.png`. Die verworfenen v1-Neuerstellungen sind keine Referenzen.
- Darstellungsrahmen auf der Artseite: Maßgeblich sind die aktuellen artspezifischen Werte in `BirdArt` (`app/raptor-app.tsx`) nach den Nutzerkorrekturen vom 13. September. Habichtsadler89%, Zwergadler88,35%, Iberienadler85,36%; die vollständigen Änderungen stehen in `output/review/flugbilder-status-20260913.md`. Alle Alter/Morphen einer Art teilen denselben Rahmen. `.hero-art` zentriert verkleinerte Bildboxen horizontal und vertikal; Verkleinern darf keinen Versatz nach oben links erzeugen. Diese Werte sind Bildkorrekturen, keine neuen UI-Größenrollen.

## Porträts: ein gemeinsamer Ausschnitt

- Linksgerichtetes Halbporträt: Kopf mit kurzem Halsansatz, vergleichbarer Kopfgröße und sichtbarem Halsanteil. Einheitliche leichte Drehung und Kamerahöhe anhand derselben Kompositionsreferenz.
- Gleiche Leinwand und ein gemeinsames Raster für Augenhöhe, optische Kopfgröße, Randabstand und unteren Halsabschluss. Diese Positionen vor einer Serie anhand der Pilotbilder festlegen und dokumentieren; keine wechselnden Ausschnitte je Auftrag.
- Die eigentliche Kopfgröße vergleichen, nicht nur die äußere Begrenzung: lange Schnäbel, Hauben und Ohrfedern brauchen zusätzlichen Platz, ohne abgeschnitten oder anatomisch verkürzt zu werden. Halsanteil relativ zum Kopf angleichen, die natürliche Anatomie erhalten.
- Kopf, Schnabel und charakteristische Kopffedern vollständig. Unterer Abschluss entlang klar gezeichneter, einzeln erkennbarer Federspitzen mit natürlich unregelmäßiger Kontur; kein Sockel, keine harte horizontale Kante, kein Blur, kein Ausblenden und kein weißer Nebel. Am 13. September ausdrücklich bestätigte Referenzen für diesen Federabschluss: `public/birds/portrait-baumfalke-20260913-v3.png` und `public/birds/portrait-gerfalke-20260913-v2.png`. Sie dienen anderen Arten nur als Referenz für den Abschluss, nicht für Anatomie oder Gefiederfarben.
- Die aktive Quelle steht in `lib/portrait-images.ts`. Verbindliche, vom Nutzer bestätigte Kompositionsreferenz ist `public/birds/portrait-habicht-20260912.png`. Seeadler, Aguja und der aufgehellte Wüstenbussard sind ebenfalls bestätigt und bleiben unverändert. Ältere Vorschläge mit Kaiseradler oder Wanderfalke als Ausschnittreferenz sind überholt.
- Halskorrekturen betreffen den sichtbaren Ausschnitt und natürlich gezeichnete Federn. Halsbereiche nicht nachträglich stauchen oder strecken. Eine bestandene technische Alpha-Prüfung ist keine Abnahme der Proportionen; diese separat im direkten Vergleich mit dem Habicht und in der tatsächlichen Artenleiste beurteilen.
- Größenabgleich vom 13. September: Der erste Screenshot stammte aus Produktion; für weitere Korrekturen den aktuellen lokalen Stand verwenden. Nach der neuesten Nutzerkorrektur (Screenshot 15:07 Uhr) steht der Zwergadler wieder bei 100 % des ursprünglichen Maßstabs; Aguja bei 110 %, Kronenadler weiterhin bei 108 % (`app/species-row.css`). Die 64-/48-px-Layoutrollen bleiben gleich. Der Gaukler verwendet lokal `portrait-gaukler-20260913-v3.png` mit kürzerem, neu gezeichnetem Halsabschluss. Maßgeblich ist die Kopfgröße ohne Haube und Hals, nicht nur die Alpha-Begrenzung.
- Referenzköpfe anderer Arten nur für Ausschnitt/Stil verwenden. Die Identität und Anatomie stammen aus dem Bild und passenden fachlichen Referenzen der bearbeiteten Art.
- Weitere Nutzerkorrektur vom 13. September: Bartgeier-Porträt in den gemeinsamen Artenzeilen auf 112 % vergrößert, ohne den Ausschnitt der Bilddatei zu verändern (`app/species-row.css`).
- Optimierte Porträts werden zentral in 160, 280 und 560 px Breite ausgegeben. Die größere Stufe erhält Details bei Browser-Zoom auf hochauflösenden Displays; die Darstellungsgröße der Artenzeilen bleibt unverändert.

## Transparenz lokal fertigstellen

1. Bei der Bildgenerierung einen wirklich transparenten Hintergrund anfordern.
2. Alpha-Kanal und Bild visuell prüfen: Ein vorhandener Alpha-Kanal allein beweist keine saubere Freistellung. Auch innerhalb sichtbarer Pixel kann ein Schachbrett eingebrannt sein.
3. Bei Schachbrett- oder sonstigem eingebrannten Hintergrund lokal freistellen. Dieser lokale Bearbeitungsschritt ist ausdrücklich vom Nutzer gewünscht. Eine Segmentierungsmaske mit kontrollierten Kanten verwenden; nicht pauschal helle Farben löschen, da diese auch zum Gefieder gehören.
4. Für bereits deckungsgleiche Flugvarianten mit sauber freigestelltem Original kann `node scripts/restore-bird-alpha.mjs ORIGINAL EDIT OUTPUT` dessen exakten Alpha-Kanal übernehmen. Das Skript passt die Ausgabegröße an und bearbeitet Randfarben; deshalb Ergebnis und Federspitzen kontrollieren. Es repariert weder verschobene Flügel noch eine veränderte innere Pose. Bei Geometrieabweichungen die Bildbearbeitung erneut vom Original ausführen, statt sie nur mit dessen Maske zu beschneiden.
5. Neue adulte Originale und Porträts benötigen ihre eigene passende Maske. Die Maske einer anderen Art oder einer abweichenden Pose ist ungeeignet.
6. Freistellung auf hellem, dunklem und farbigem Hintergrund prüfen: keine Schachbrettreste, weißen Säume, Löcher im Gefieder oder abgeschnittenen Federn. Finale PNGs mit echtem Alpha im Projekt speichern.

## Ablauf der Überarbeitung

1. **Bestand erfassen:** alle tatsächlich eingebundenen Arten mit adultem Original, Varianten und Porträt auflisten. Pro Quelle Pfad und Prüfsumme festhalten. Kontaktbögen aus den aktuellen Quellen erstellen; Perspektive, Stil, Ausschnitt, Variantenpassung und Transparenz getrennt beurteilen.
2. **Kleine Pilotserie:** ein korrekturbedürftiges adultes Flugbild mit vorhandenem Jungvogel und gegebenenfalls vorhandener Morphe sowie einige korrekturbedürftige Porträts bearbeiten. Daran Referenzen und Kompositionsraster festlegen. Vorhandene passende Bilder behalten; keine zusätzlichen Varianten erzeugen.
3. **Pro Art arbeiten:** erst adultes Flugoriginal fertigstellen, danach jede Variante direkt daraus. Porträts können unabhängig anhand der festen gemeinsamen Referenz bearbeitet werden. Referenzen während einer Serie nicht stillschweigend austauschen.
4. **Prüfen:** alle Varianten in identischer Größe abwechselnd anzeigen und mit 50-%-Überlagerung vergleichen. Schnabel, Auge, Flügelgelenke, Flügelspitzen und Schwanzende dürfen nicht wandern. Identische Alpha-Masken allein reichen nicht: auch innere Strukturen prüfen. Porträts im gemeinsamen Raster und in tatsächlicher UI-Größe vergleichen; nach dem Audit sind 70 und 54 px sinnvolle Prüfansichten, aktuelle UI-Werte vor der Abnahme nachsehen.
5. **Einbinden:** neue Dateien zunächst versioniert speichern und den bisherigen Stand bis zur erfolgreichen Prüfung erhalten. Erst geprüfte Bilder zuordnen; danach `npm run images` ausführen und die tatsächlichen Produktansichten einschließlich Variantenwechsel prüfen. UI-Anpassungen unterliegen zusätzlich dem Design-System.

Für jede bearbeitete Datei Originalpfad und dessen Prüfsumme, Referenzpfade mit Rollen, finalen Prompt, Generierungsweg, lokale Freistellung, Ausgabepfad und Prüfergebnis dokumentieren. Dadurch bleibt nachvollziehbar, dass jede Variante vom richtigen Original stammt.

## Pflichtbriefing für Subagenten

Jeder delegierte Bildauftrag enthält den folgenden ausgefüllten Block; der Verweis auf Regeln allein ersetzt ihn nicht. Delegation ist keine Erlaubnis, zusätzliche Arten oder Varianten zu erfinden.

```text
Lies AGENTS.md und docs/vogelbild-standard.md. Halte beide verbindlich ein.
Nur vorhandene, korrekturbedürftige Bilder bearbeiten. Keine zusätzlichen
Geschlechtsvarianten oder sonstigen Varianten einbauen. Bereits vorhandene
Geschlechtsvarianten sind nur bei sichtbaren Unterschieden relevant.
Ungeeignete Bilder dürfen vollständig neu erstellt und ersetzt werden.
Bei neuem adultem Flugoriginal die Zielperspektive herstellen; anschließend
vorhandene Varianten direkt daraus bearbeiten, nicht unabhängig generieren.
Auftrag: [Art, Flugbild/Porträt, konkrete Variante, Korrektur/Neuerstellung, Ausgabepfad].
Original/Bearbeitungsziel: [exakter aktiver Dateipfad und Prüfsumme].
Weitere Referenzen: [exakte Pfade; jeweils nur Stil/Komposition oder fachliche Anatomie].
Flugbild: von unten, Blick nach links, Flügelachse unten links → oben rechts.
Flugvariante: ausschließlich direkt aus dem normalen adulten Original bearbeiten;
keine andere Variante als Bearbeitungsbasis. Nur [konkrete Merkmale] ändern.
Bei Morphenänderungen alle vorhandenen Altersstufen einschließlich Jungvögeln
mit aktualisieren. Vollständige Morphen-/Altersmatrix prüfen und dokumentieren.
Pose, Perspektive, Silhouette, Flügel, Schwanz, Leinwand, Maßstab, Position und
Stil des Originals exakt bewahren; kein Springen beim Variantenwechsel.
Porträt: Halbporträt nach links; gemeinsamer Ausschnitt, Kopfgröße, Augenhöhe
und kurzer Halsanteil gemäß [feste Kompositionsreferenz/Raster].
Artspezifische Anatomie bewahren. Keine abgeschnittenen Schnäbel oder Federn.
Echte Transparenz prüfen; eingebranntes Schachbrett lokal freistellen.
Abnahme: [Variantenüberlagerung bzw. Porträtraster], heller/dunkler/farbiger
Hintergrund, tatsächliche Anzeigegröße. Ergebnisse selbst visuell prüfen.
Liefere Datei, Originalnachweis, finalen Prompt, lokale Bearbeitungsschritte
und Prüfergebnis. Nur zugewiesene Dateien bearbeiten.
```

Die Koordination kontrolliert Quellenwahl, Geometrie, Bildsprache und Transparenz nochmals vor der Einbindung. Ein abgeschlossener Subagentenauftrag ersetzt diese gemeinsame Prüfung nicht.

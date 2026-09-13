# Schreiseeadler, Gänsegeier und Schleiereule

Ergänzt am 13. September 2026. Der Katalog umfasst 42 Arten. Alle drei sind mit Suche, wissenschaftlichen Routen, Gruppen, Ökologie, Nahrung, Steckbrief, Quiz, Flugbild, Jungvogelbild, Porträt, Jagdbild, Ruf und Verbreitung verknüpft.

## Artdaten und Quellen

- Schreiseeadler: *Icthyophaga vocifer*; *Haliaeetus vocifer* bleibt als Suchalias erhalten. Maße und Verhalten: [Animal Diversity Web](https://animaldiversity.org/accounts/Haliaeetus_vocifer/). Brut, Lebensspanne und Schutzstatus: [Los Angeles Zoo](https://lazoo.org/explore-your-zoo/our-animals/birds/african-fish-eagle/). Die Lebensspanne wird ohne unbelegte Zuordnung zu Wildbahn/Tierhaltung angezeigt.
- Gänsegeier: *Gyps fulvus*. Maße, Gefieder, Nahrung und Wanderungen: [SEO/BirdLife](https://seo.org/ave/buitre-leonado/). Brut: [Wilhelma](https://www.wilhelma.de/entdecken/tiere/tierart/gaensegeier). Höchstalter in Tierhaltung: [AnAge](https://genomics.senescence.info/species/entry.php?species=Gyps_fulvus). Globaler Status: [Vulture Conservation Foundation](https://4vultures.org/vultures/griffon-vulture/).
- Schleiereule: *Tyto alba* im heutigen westlichen Artumfang (Europa, Afrika, Westasien), ohne *T. furcata* und *T. javanica*. Spannweite/Gewicht: [BirdLife Thurgau](https://vogelschutz-tg.ch/projekte/schleiereulen/). Gelege und Lebenserwartung ab Brutreife: [BTO](https://www.bto.org/learn/about-birds/birdfacts/barn-owl). Merkmale, Verhalten und Nahrung: [Landesverband Eulenschutz Schleswig-Holstein](https://www.eulen.de/unsere-eulen/schleiereule). Flügge Jungvögel sind anhand der Farbe allein nicht zuverlässig von Altvögeln zu unterscheiden; das wird ausdrücklich erklärt.

Spannweiten auf 5 cm gerundet, Gewicht ausschließlich als Grammspanne; keine unbelegten geschlechtsspezifischen Zahlen. Neue Arten haben Altvogel/Jungvogel, keine zusätzlichen Geschlechts- oder Morphenbilder.

## Bilder

Werkzeug: `image_gen.imagegen`. Vollständige Prompts, Referenzpfade und unbearbeitete Werkzeugausgaben: [prompts.json](../output/imagegen/species-additions-20260913/prompts.json).

Dateimuster in `public/birds`: `{id}-20260913.png`, `juvenile-{id}-20260913.png`, `portrait-{id}-20260913.png`, `hunting-{id}-20260913.png`.

Flugoriginale: vollständige Unteransicht, Kopf nach links, diagonale Flügelachse; Schulteransätze, Perspektive und Schwanz mit echten Flugfotos verglichen. Anatomische Referenzen: [Schreiseeadler – Richard Guijt](https://www.richardguijt.com/uploads/webshop/african-fish-eagle-flying.jpg), [Gänsegeier – Jan Ševčík](https://www.naturephoto-cz.com/photos/sevcik/voltor-comu--17x_sup_belohlavy_dsk8922.jpg), [Schleiereule – Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Front_view_of_a_barn_owl_-_Tyto_alba_-_in_flight.jpg). Diese Fotos wurden nicht in die Anwendung übernommen.

Stilreferenz: das eingebundene Habichtsadler-Flugbild; Porträtkomposition: `public/birds/portrait-habicht-20260912.png`. Alle Jungvögel direkt vom jeweiligen neuen Adultoriginal abgeleitet. Eingebrannte Schachbretter der drei Jungvogel-Ausgaben mit `scripts/restore-bird-alpha.mjs` entfernt; deren Alpha ist exakt identisch mit dem jeweiligen Adultoriginal. Kopf, helle Federn und alle Spitzen bleiben erhalten. Alle zwölf Bilder auf echte Transparenz geprüft.

## Verbreitungskarten

Originaldateien und Rasterkopien in `data/ranges/reference-originals`; Quelle, Urheber, Lizenz und SHA-256 in `data/ranges/reference-sources.json`. Reproduzierbare Projektionen, Farbpaletten, Konturen und Prüfpunkte in `data/ranges/reference-vectors`.

| Art | Lizenzierte Ausgangskarte | Projektion | P90 Küstenabweichung bei 1000 px Breite |
| --- | --- | --- | --- |
| Schreiseeadler | [T45614631/WiTo7946; Grundkarte Master Uegly](https://commons.wikimedia.org/wiki/File:Icthyophaga_vocifer_distribution_map.svg), CC BY-SA 4.0 | Equirektangular | 2,02 px |
| Gänsegeier | [The Engineer und Commons-Bearbeiter](https://commons.wikimedia.org/wiki/File:Gyps_fulvus_distribution_map.png), CC BY-SA 3.0 | Robinson, Zentralmeridian 10° | 5,01 px |
| Schleiereule | [Jonathan Hornung](https://commons.wikimedia.org/wiki/File:Schleiereule-Tyto_alba-World.png), gemeinfrei | Robinson, Zentralmeridian 10° | 1,82 px |

Küstenkonturen über die gesamte Vorlage und extrahierte Farbgrenzen visuell verglichen. Registrierung mit zurückgehaltenen Küstenpunkten validiert. Keine lokale Verformung oder frei erfundenen Verbreitungsgrenzen. Das Fragezeichen in Marokko beim Gänsegeier und sieben Inselpfeile bei der Schleiereule sind als Pixelmasken dokumentiert und ausgeschlossen. Orange erloschene Gebiete werden nicht eingebunden. Die Karten sind generalisierte Referenzillustrationen, keine aktuelle Vorkommenserhebung; sehr kleine Inselkomponenten können durch die bestehende Mindestfläche entfallen.

## Rufe

Alle drei Aufnahmen aus dem Tierstimmenarchiv des Museums für Naturkunde Berlin, CC BY-SA 3.0 DE. Original- und Ausgabedatei-Hashes, genaue Quelle und Schnittparameter stehen in `data/audio/sources.json`.

| Art | Archiv-ID / Urheber | Ausschnitt |
| --- | --- | --- |
| Schreiseeadler | TSA:Haliaeetus_vocifer_V_2091_3_1 / Günter Tembrock | 91–99 s |
| Gänsegeier | TSA:Gyps_fulvus_Lue_59_5_1 / Hans Lütgens | 24–30 s |
| Schleiereule | SUB:Tyto_alba_Sub_CD0049_07 / Michael Schubert | 10–18 s |

Beim Gänsegeier ausdrücklich die Schlusssequenz verwendet: Laut Archiv stammen die letzten Laute vom Gänsegeier, frühere auch vom Schneegeier. Zuordnung anhand der Archivbeschreibung; Schnitt anhand Spektrogramm und Pegel geprüft. Keine gehörbasierte fachliche Abnahme behauptet. Normalisierte Mono-MP3, 44,1 kHz/128 kbit/s, unveränderte Tonhöhe/Geschwindigkeit, kurze Schnittblenden. `npm run audio:peaks` hat alle 42 Wellenformen mit je 48 gemessenen Pegeln erzeugt. Der macOS-Decoder benötigt hier Ausführung außerhalb der Sandbox.

## Prüfung

- `npm run lint`, `npm run build`, `npm run maps:build`: erfolgreich.
- `tests/species-additions.test.ts`: beide Integrationstests erfolgreich, einschließlich gleicher Alpha-Masken, Suchalias, Ruf-Hashes und 48 Pegeln.
- Gesamter vorhandener Testlauf: 74/76 erfolgreich. Zwei unveränderte Erwartungen in `birds.test.ts` und `morphs.test.ts` erwarten beim Fischadler `male,female,juvenile`, während der bestehende Katalog `female,male,juvenile` liefert. Gehört nicht zu dieser Artergänzung.
- Vorhandene Arbeitskopie enthält weitere Änderungen; diese wurden nicht zurückgesetzt.
- Browser: alle drei wissenschaftlichen Routen mit vollständig sichtbaren Flugillustrationen, Grammwerten und Rufsteuerung geprüft. Alterswechsel der Schleiereule ohne Silhouettenversatz; ihre Verbreitungskarte lädt mit westlichem Artumfang.

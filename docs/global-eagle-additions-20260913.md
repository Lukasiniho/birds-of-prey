# Schreiadler, Keilschwanzadler und Philippinenadler

Drei ausdrücklich gewünschte neue Arten ergänzen den Katalog auf 45 Arten. Jede erhält einen deutschen Steckbrief, Suchaliase, adulte und juvenile Flugillustration, Porträt, Jagdbild, Rufaufnahme, Verbreitungskarte sowie Nahrung, Jagdweisen, Lebensräume und Quizmerkmale. Keine eigenen Geschlechts- oder Morphenbilder: Beide Geschlechter verwenden das normale adulte Original.

## Daten und Quellen

- **Schreiadler — Clanga pomarina:** `Aquila pomarina`, Pommernadler und Lesser Spotted Eagle als Aliase. [LIFE Schreiadler / LfU Brandenburg](https://www.lifeschreiadler.de/vogelarten/schreiadler/index.html) nennt 145–168 cm Spannweite und 55–65 cm Länge; die Spannweite wird auf 145–170 cm gerundet. Die Gewichtsspanne 1.300–2.200 g folgt der [Deutschen Wildtier Stiftung](https://www.deutschewildtierstiftung.de/wildtiere/schreiadler), deren Spanne von der LIFE-Seite abweicht. [Peregrine Fund](https://peregrinefund.org/explore-raptors-species/eagles/lesser-spotted-eagle): Brut, Jagd, Zug und 26 Jahre Ringfund-Höchstalter. Der globale Status LC folgt [BirdLife](https://www.birdlife.org/list-of-eagle-species/); er ist ausdrücklich nicht mit der Gefährdung in Deutschland gleichzusetzen. Deutschlandstatus: Brut und Durchzug.
- **Keilschwanzadler — Aquila audax:** [Animal Diversity Web](https://animaldiversity.org/accounts/Aquila_audax/) nennt 180–250 cm Spannweite, 100–120 cm Länge, 2.500–5.300 g Gewicht (Männchen 2.500–4.000 g, Weibchen 3.200–5.300 g). Andere Quellen geben teils engere Gewichtsspannen an; hier wird ein zusammenhängender Datensatz verwendet. [BirdLife Australia](https://birdlife.org.au/bird-profiles/wedge-tailed-eagle/) liefert Gefieder, helle Zehen, Nahrung, Brut und global LC. Die stärker bedrohte tasmanische Unterart ändert den Artstatus nicht. [AnAge](https://genomics.senescence.info/species/entry.php?species=Aquila_audax): 40 Jahre Höchstalter in Tierhaltung.
- **Philippinenadler — Pithecophaga jefferyi:** Maße nach dem Fachartikel von Jan Ove Gjershaug / NINA in [Store norske leksikon](https://snl.no/filippiner%C3%B8rn): 184–220 cm Spannweite → 185–220 cm, 86–102 cm Länge, 4.700–8.000 g. [Philippine Eagle Foundation](https://www.philippineeaglefoundation.org/philippine-eagle) zu Waldlebensraum, einem Ei und zweijährigem Brutzyklus. [Peregrine Fund](https://peregrinefund.org/explore-raptors-species/eagles/philippine-eagle) zu Jagd und CR. [Animal Diversity Web](https://animaldiversity.org/accounts/Pithecophaga_jefferyi/) nur für Verbreitung, Alterskleid und Nahrung; dessen widersprüchliche Angaben zum Ausfliegealter werden nicht übernommen. [AnAge](https://genomics.senescence.info/species/entry.php?species=Pithecophaga_jefferyi): Ein bereits adulter Vogel lebte weitere 41 Jahre im Zoo; deshalb „über 41 Jahre“, ausdrücklich Tierhaltung.

Die neue globale Kategorie CR („Vom Aussterben bedroht“) wird in der vorhandenen gemeinsamen IUCN-Anzeige erklärt. Keine neue Farb-, Layout- oder Typografierolle.

## Karten

Lizenzierte Ausgangsbilder in `data/ranges/reference-originals`, Quellen und Prüfsummen in `data/ranges/reference-sources.json`, inverse Mercator-Registrierungen, Farbpaletten und geografische Prüfpunkte in `data/ranges/reference-vectors`. Die Grenzen stammen aus den tatsächlichen Farbflächen der Quellen, ohne frei gezeichnete Vogelverbreitung oder Ersatz durch Länderpolygone.

| Art              | Quelle                                           | Lizenz       | P90 Küstenabweichung / 1000 px |
| ---------------- | ------------------------------------------------ | ------------ | -----------------------------: |
| Schreiadler      | Alexander Kürthy / BirdLife-IUCN, Version 2018.2 | CC BY-SA 3.0 |                        3,90 px |
| Keilschwanzadler | Alexander Kürthy / BirdLife-IUCN, Version 2019.1 | CC BY-SA 3.0 |                        1,95 px |
| Philippinenadler | Kleomarlo, 2008                                  | Gemeinfrei   |                        1,76 px |

Quellenalter und Generalisierung werden im Kartenhinweis offengelegt. Die Keilschwanzadler-Vorlage zeichnet das bekannte Vorkommen im Süden Neuguineas nicht ein; auch diese Auslassung wird ausdrücklich im Kartenhinweis genannt. Saisonale Gebiete sind zusammengefasst. Australien und Philippinen haben einen passenden regionalen Kartenausschnitt. Die P90-Werte messen die kartografische Registrierung, nicht die Genauigkeit biologischer Grenzen.

## Rufe

Drei Aufnahmen von Günter Tembrock / Tierstimmenarchiv, Museum für Naturkunde Berlin. Exakte Archiveinträge, aktuelle Lizenzlinks, Intervalle, Bearbeitungsschritte, Dauer und SHA-256 in `data/audio/sources.json`. Die aktuellen einzelnen Archivseiten nennen ausdrücklich CC BY-SA 3.0 DE. Die älteren ID3-Tags der Downloads nennen abweichend BY-NC-SA 3.0; diese Diskrepanz und die Belege der aktuellen Seiten sind in `docs/global-eagle-assets-20260913/audio-provenance.json` festgehalten.

Mono-MP3 mit 44,1 kHz und 128 kbit/s, kurze Schnittblenden und angepasster Pegel, unveränderte Tonhöhe und Geschwindigkeit. Ausschnitte anhand Spektrogrammen überprüft; keine fachliche gehörbasierte Abnahme behauptet. `npm run audio:peaks` berechnet die 48 Stufen je Aufnahme aus den Audiodateien, einschließlich der drei Ergänzungen.

## Bilder und Abnahme

Zwölf neue Illustrationen: je Art ein adultes Flugoriginal, ein unmittelbar daraus abgeleiteter Jungvogel, ein Porträt und eine Jagdszene. Die Nutzerfreigabe für diese neuen Arten hebt ausschließlich die alte Beschränkung auf vorhandene Arten auf; alle Kompositions-, Anatomie-, Varianten- und Transparenzregeln bleiben bestehen.

Erzeugt über das integrierte Bildwerkzeug. Gemeinsame Stilreferenz: `public/birds/habichtsadler-20260913-v2.png`; gemeinsame Porträtkomposition: `public/birds/portrait-habicht-20260912.png`. Andere Arten dienten nicht als anatomische Vorlage. Erste Flugentwürfe übernahmen zu viel vom Unterflügelmuster der Stilreferenz und wurden vor Festlegung der adulten Originale korrigiert. Echte Flugfotos dienten zur Prüfung von Anatomie, Haltung und Zeichnung.

Die gerenderten Hintergründe wurden lokal anhand zusammenhängender Hintergrundflächen und geschützter Vordergrundmasken entfernt. Helle Federn und neutralgraue Schnäbel wurden gezielt erhalten. Die erste Freistellung entfernte Teile neutralgrauer Schnäbel; lokale Schutzmasken reparierten dies vor Abnahme und Variantenableitung. Keine pauschale Weiß-/Graulöschung. Porträts und Jagdbilder liegen versioniert in `public/birds`; Vorgehen und Datei-Prüfsummen unter `output/imagegen/global-eagles-20260913`.

Visuelle Abnahme umfasst helle, dunkle und farbige Hintergründe, vollständige Schnäbel und Federspitzen sowie Porträtgrößen im gemeinsamen Raster. Auf den tatsächlichen Artseiten wurden adulte Flugbilder, Porträts, Karten, Nahrung und Gewichte geprüft. Beim Keilschwanzadler ändert der Geschlechtsschalter nur das Gewicht, nicht Spannweite oder Illustration; seine Rufaufnahme ließ sich abspielen und pausieren.

Die Jungvögel wurden direkt aus den fertig freigestellten adulten Originalen abgeleitet. Interne Bildmerkmale wurden vor Übernahme des exakten adulten Alpha-Kanals registriert: 131–363 Übereinstimmungen, mediane Verschiebung 0,8–1,1 Pixel bei 1.350 Pixel Bildbreite. Die geschätzte Skalierung liegt jeweils zwischen 0,9993 und 1,0005. Paaransichten und Überlagerungen zeigen keine relevante Veränderung von Haltung, Flügeln, Schwanz, Schnabel oder Auge. Der Philippinenadler bleibt in der Unteransicht bewusst sehr ähnlich. Exakte Prompts, Original- und Ausgabepfade sowie Prüfsummen liegen in den JSON-Protokollen neben den Paaransichten.

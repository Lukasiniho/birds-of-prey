# Gefiedervarianten: Recherche und Bildableitung

Stand: 9. September 2026.

## Fachliche Auswahl

| Art | Umsetzung | Einordnung |
| --- | --- | --- |
| Wespenbussard | Hell, Mittel, Dunkel; jeweils Alt- und Jungvogel | Beispiele fließender individueller Farbvariation, keine festen Unterarten |
| Gaukler | Kastanienbraun und Creme; jeweils Männchen und Weibchen | Seltene cremefarbene Rückenform; Geschlechtsmerkmale am Flügel bleiben erhalten |
| Bartgeier | Rostorange und Weiß beim Altvogel | Äußere Eisenoxidfärbung, keine genetischen Morphen |
| Fischadler | Männchen, Weibchen und Jungvogel | Geschlechts- und Altersunterschiede; keine erfundenen Hell-/Dunkelmorphen |

### Wespenbussard

Das [spanische Umweltministerium](https://des.iepnb.es/areas-tematicas/especies-silvestres/eidos/10739/Pernis%20apivorus) beschreibt eine erhebliche individuelle Variation von sehr hell bis fast melanistisch, mit häufigeren Zwischenformen. [Cornell/eBird](https://ebird.org/species/euhbuz1) dokumentiert auch helle Jungvögel. [Birds in Bulgaria](https://www.birdsinbulgaria.org/birds.php?l=en&semeystvo=13&type=bird&vid=72) beschreibt die altersabhängige Iris- und Wachshautfarbe sowie die gleichmäßigere Bänderung des Jugendkleids. Die Illustrationen zeigen Beispiele; die Bandbreite innerhalb jeder Auswahl bleibt größer als ein Einzelbild.

### Gaukler

Die cremefarbene Rückenform ist durch die [Feldaufnahme von Lip Kee](https://commons.wikimedia.org/wiki/File:Bateleur_cream_backed_morph_(20964420378).jpg) belegt: Rücken cremefarben statt kastanienbraun, Schwanz blasser kastanienfarben. Die dort zitierte HBW-Häufigkeitsangabe wird nicht als gesicherte Populationsstatistik übernommen. [Cornell/eBird](https://ebird.org/species/batele1) beschreibt den breiten schwarzen Unterflügelhinterrand des Männchens und den schmalen des Weibchens. Die Auswahl gilt nur für adulte Vögel; für Jungvögel wird keine unbelegte cremefarbene Variante erstellt.

### Bartgeier

Die [Vulture Conservation Foundation](https://4vultures.org/vultures/bearded-vulture/) erklärt weiße adulte Körperfedern und deren orange Färbung durch eisenoxidhaltige Bäder. [Negro et al. (2019)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6525594/) untersuchen diese kosmetische Färbung. Die Auswahl heißt daher „Gefiederfärbung“. Das dunkle Jugendkleid ist eine Altersstufe und erhält keine Weiß-/Orange-Auswahl.

### Fischadler

[Strandberg (2013), Dutch Birding 35:69–87](https://www.dutchbirding.nl/journal/pdf/DB_2013_35_2.pdf) beschreibt bei Weibchen im Durchschnitt stärkere Brustband- und Unterflügelzeichnung, mit deutlicher Überschneidung zwischen den Geschlechtern. Das vorhandene adulte Bild dient als Beispiel für das schwächer gezeichnete Männchen. Die Weibchenansicht zeigt eine stärker gezeichnete Vertreterin. Das Brustband allein ist kein sicherer Geschlechtsnachweis. Größenunterschiede werden für den ruhigen Bildwechsel nicht durch wechselnde Bildskalierung dargestellt.

## Verbindliche Ausgangsbilder

Alle neuen Dateien entstehen mit dem eingebauten Imagegen-Werkzeug im **Edit-Modus**, direkt aus der aktuell eingebundenen adulten Normalform. Keine Ableitung aus einer anderen Morphe oder einem Jugendbild.

| Art | Ausgangsdatei in `public/birds/` |
| --- | --- |
| Wespenbussard | `wespenbussard-20260907.png` |
| Gaukler | `gaukler.png` |
| Bartgeier | `bartgeier-20260907.png` |
| Fischadler | `fischadler.png` |

Die Edit-Vorgaben erhalten Pose, Flugrichtung, Perspektive, Silhouette, Flügelstellung, Schwanzhaltung, Ausschnitt, Bildgröße, Position und Stil. Nur Gefiederfarbe, Zeichnung und erforderliche Altersmerkmale ändern sich. Originaldateien bleiben erhalten. Die genauen Einzelprompts und Ausgabedateien stehen im [Edit-Manifest](morph-image-edits-20260909.json).

## Lokale Transparenzkorrektur

Der Nutzer hat lokale Freistellung ausdrücklich erlaubt und gewünscht. Die Roh-Edits enthielten ein eingebranntes Schachbrett statt Alpha. `scripts/restore-bird-alpha.mjs` passt die Auflösung ohne Ausschnittsänderung an die jeweilige Vorlage an und übernimmt deren Alphakanal unverändert. Ein schmaler Randbereich erhält benachbarte innere Federfarben, damit keine Schachbrett- oder Weißsäume stehen bleiben. Die Gefiederänderungen selbst stammen ausschließlich aus Imagegen-Edits.

Die Bildprüfung vergleicht Breite, Höhe und jeden Alphawert der neuen Varianten mit der normalen adulten Vorlage. Dadurch bleiben äußere Silhouette und Position beim Umschalten exakt gleich. Zusätzlich werden die Bilder vor hellen und dunklen Hintergründen visuell kontrolliert.

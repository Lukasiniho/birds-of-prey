# Systematik im Atlas

Der wissenschaftliche Bühnenname und das Info-Symbol rechts daneben öffnen
`/<wissenschaftlicher-artname>/systematik` als eigene Vollbildseite.
Alle Atlas-Arten haben direkt aufrufbare, statisch exportierte Systematikseiten.
Der Parameter `?taxon=<wissenschaftlicher-gruppenname>` speichert den geöffneten
Ast; ohne Parameter öffnet sich der Pfad zur ausgewählten Atlas-Art. `?taxon=`
steht für den vollständig eingeklappten Baum. Ungültige Gruppen fallen auf den
Artpfad zurück. Zurück/Vorwärts und Neuladen stellen die Auswahl wieder her.
Beim Schließen wird der Fokus nicht zum Artnamen zurückgesetzt: weder per Maus
noch per Tastatur (einschließlich Escape) bleibt dort ein Fokusrahmen stehen.
Der horizontale Baum verbindet Klasse → Ordnung → Familie → Gattung → Art.
Aufklappbare Knoten sind native Buttons mit `aria-expanded`;
Der Baum zeigt pro Ebene einen geöffneten Pfad in unabhängigen Spalten.
Geschwisterknoten behalten beim Öffnen von Nachkommen Position und Scrollstand.
Geänderte Spalten wechseln mit dem transitions.dev-Panel-reveal: 400 ms öffnen,
350 ms schließen, 12 px Bewegung und 2 px Unschärfe über die zentralen
`--panel-*`-Tokens. Ausblendende Spalten sind inert und für Screenreader verborgen.
Unveränderte Spalten werden nicht neu animiert. `prefers-reduced-motion` schaltet
Übergänge ab. SVG-Verbindungen folgen den sichtbaren Knoten auch während der
Animation, beim Scrollen und bei Größenänderungen.
`node --experimental-strip-types --test tests/taxonomy-routes.test.ts` prüft
alle Art-URLs und sämtliche auswählbaren Äste einschließlich leerer Auswahl.
Geöffnete Knoten und die aktuelle Atlas-Art haben einen Teal-Auswahlrahmen. Beim Öffnen wird der Pfad zur aktuellen Art aufgeklappt
und diese in den sichtbaren Bereich gescrollt. Atlas-Arten verwenden die
vorhandenen Porträt- und Namenskomponenten und navigieren zur Art. Arten ohne
Atlas-Eintrag stehen kleiner mit deutschem und wissenschaftlichem Namen in Grau im Baum.
Jeder Knoten zeigt die rekursiv berechneten Anzahlen im Atlas und insgesamt.

`data/taxonomy.json` enthält alle 589 Arten der fünf vertretenen Ordnungen,
keine Unterarten. Atlas-Einträge werden über ihren wissenschaftlichen Namen
zugeordnet; Namen, Bilder und Ziele stammen weiterhin aus den Atlasdaten.

Quelle: AviList Core Team (2026), AviList: The Global Avian Checklist v2025b,
https://doi.org/10.2173/avilist.v2025b, CC BY 4.0
(https://creativecommons.org/licenses/by/4.0/).
Abgerufen am 23.09.2026 von
https://explore.avilist.org/data/avilist-2025b.json.
Änderungen: auf fünf Ordnungen und vier Ränge reduziert, deutsche Ordnungs-
und Familiennamen ergänzt, für die verschachtelte Darstellung strukturiert.
Die Einträge jeder Ebene sind alphabetisch nach deutschem Namen sortiert;
Gattungen ohne deutschen Namen nach wissenschaftlichem Namen. Die Quelldaten
behalten ihre ursprüngliche Reihenfolge. Der Baum zeigt
die taxonomische Klassifikation, keine zeitlich skalierte Stammesgeschichte.

## Deutsche Namen

`data/taxonomy-names.de.json` steht unter CC BY-SA 4.0
(https://creativecommons.org/licenses/by-sa/4.0/).
Die Namensauswahl wurde aus OpenFauna, Stand
3511422761fb0b36368ae58383c7db13ff21ece4, auf unsere 589 Arten reduziert;
Namenssynonyme wurden aufgelöst. Atlas-Arten behalten ihre redaktionellen Namen.
https://github.com/tphakala/openfauna/blob/3511422761fb0b36368ae58383c7db13ff21ece4/data/locales/de.json

Namensquellen und Urheber: OpenFauna; BirdNET, K. Lisa Yang Center for
Conservation Bioacoustics / Cornell Lab of Ornithology, Chemnitz University of
Technology, Museum für Naturkunde Berlin, Stefan Kahl und BirdNET-Team;
IOC World Bird List, Gill, Donsker & Rasmussen (Hrsg., v15.2, CC BY 3.0).
GBIF und Wikidata ergänzen OpenFauna unter CC0.
https://github.com/tphakala/openfauna/blob/3511422761fb0b36368ae58383c7db13ff21ece4/ATTRIBUTION.md

Die Schreibvariante Tachyspiza haplochrous wurde mit Weißbauchhabicht ergänzt:
https://avibase.bsc-eoc.org/species.jsp?avibaseid=18B4CE0217A7E39A
Die wissenschaftliche Systematik bleibt unverändert aus AviList.

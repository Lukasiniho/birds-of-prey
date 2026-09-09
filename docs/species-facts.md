# Kompakte Artinformationen

Stand: 9. September 2026. Alle 35 Katalogarten erhalten fünf Zeilen im
Steckbrief: Lebenserwartung, Gelegegröße, Gefährdung weltweit, Aktivitätszeit
und Zugverhalten. `lib/species-facts.ts` hält die Werte sowie feldbezogene
Quellen und regionale Hinweise. `components/species-facts.tsx` stellt sie dar.

## Einordnung der Zahlen

- Lebenserwartung ist nicht gleich Höchstalter. Die sichtbare Unterzeile
  nennt die Grundlage. BTO-Werte gelten für Vögel, die das Brutalter erreicht
  haben, und sind keine Lebenserwartung ab Schlupf. Sie stammen überwiegend
  aus britischen Populationen, nicht aus einer weltweiten Kohortenanalyse.
- Cornell nennt belegte Altersrekorde freilebender Ringvögel. Ganze Jahre
  werden nicht aufgerundet: 30 Jahre 8 Monate erscheint als „über 30 Jahre“.
  Diese Rekorde sind keine biologische Obergrenze.
- Beim Aguja ist nur ein Höchstalter in Tierhaltung angegeben. AnAge wird
  hierfür gegenüber widersprüchlichen Zuordnungen in Sekundärtabellen bevorzugt.
- Zooangaben ohne klare Zuordnung zur Wildbahn werden ausdrücklich als
  Lebensspanne laut dem jeweiligen Zoo bezeichnet. Beim Andenkondor bleibt
  das Höchstalter in freier Natur eine Schätzung.
- Gelegegröße bezeichnet Eier pro Brut, nicht ausgeflogene Jungvögel und
  nicht die Jahressumme. „Meist“ bezeichnet typische Werte; andere Spannen
  sind die im jeweiligen Artenporträt angegebenen Gelegegrößen. Extremwerte
  und Populationsmittel unterscheiden sich zwischen Quellen und Regionen.
- Gefährdung ist die globale IUCN/BirdLife-Kategorie, kein Deutschlandstatus.
  Besonders zu beachten: Rotmilan LC, Kronenadler NT (regional teils VU),
  Harpyie und Andenkondor VU, Sekretär/Gaukler/Kampfadler/Steppenadler/Saker EN.
- Standvogel schließt das Abwandern von Jungvögeln nicht aus. Teilzieher
  berücksichtigt Unterschiede zwischen Populationen. Die Notizen im
  Datensatz präzisieren unter anderem Weißstorch, Kaiseradler und Schwarzmilan.

## Hauptquellen

- [BTO BirdFacts](https://www.bto.org/learn/about-birds/birdfacts):
  Lebensdauer ab Brutreife, typische Gelege und globale Gefährdung.
- [BTO-Methodik](https://www.bto.org/learn/about-birds/birdfacts/about-birdfacts/biology).
- [Cornell All About Birds](https://www.allaboutbirds.org/guide/): Gelege,
  Verhalten und dokumentierte Altersrekorde nordamerikanischer Arten.
- [Animal Diversity Web](https://animaldiversity.org/): artspezifische
  Lebensdauer, Aktivität und Zugverhalten; reine Taxonomieeinträge werden
  nicht als Verhaltensbeleg verwendet.
- [BirdLife DataZone](https://datazone.birdlife.org/): globale Gefährdung.
  Ältere wissenschaftliche Namen in Quellen-URLs bleiben erhalten, wenn die
  Quelle sie verwendet (z. B. Phalcoboenus australis).
- Die jeweiligen Artenseiten von NABU, BirdLife Österreich, Peregrine Fund,
  San Diego Zoo, Rosamond Gifford Zoo, Los Angeles Zoo, Beardsley Zoo,
  Falklands Conservation und den LIFE-Projekten ergänzen die Angaben.
  Direkte Links stehen am jeweiligen Datenfeld.

## Gestaltung und Prüfung

Fünf semantische Definitionszeilen ohne eigene Karten. Phosphor-Duotone-Icons
(16 px, Original-SVG-Pfade, Teal mit 20 % Flächendeckkraft), vorhandene Abstands- und Textrollen, Inter-Fließtext,
Werte rechtsbündig mit Gewicht 600. Die Lebensdauer-Einordnung bleibt im title-Attribut; sie erscheint nicht als Zusatzzeile. Labels und Werte dürfen umbrechen. Die Tabs bleiben
außerhalb des Scrollbereichs fixiert. Wiederholte Eizahlen im Bruttext entfallen;
Nestbau, Brutdauer und Aufzucht bleiben erhalten.

`tests/species-facts.test.ts` prüft vollständige Katalogabdeckung, fünf Felder,
Quellen, zulässige Kategorien und die Trennung von Höchstalter/Tierhaltung.

## Veröffentlichung

Nur auf `feat/species-facts` speichern. Kein Merge nach main und kein Deploy
vor ausdrücklicher Freigabe. Der Branch-Commit trägt `[skip netlify]` und
`[skip ci]`; es wird kein Pull Request mit automatischer Deploy Preview erstellt.

Gefährdung: per Hover, Tastaturfokus oder Klick öffnet sich die IUCN-Skala
LC–NT–VU–EN–CR–EW–EX. Die aktive Kategorie wird markiert und erklärt.
DD und NE sind außerhalb der Skala erläutert. Escape oder Klick außerhalb schließt den Tooltip.

Der Gefährdungs-Tooltip blendet ausschließlich über Opazität ein und aus.
Seine Abmessungen bleiben während der Animation konstant, damit die Spitze
ihre Position zum Auslöser behält. Reduced Motion deaktiviert den Übergang.

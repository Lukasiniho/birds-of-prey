# Typografie

Das Projekt verwendet Tailwind CSS 4, shadcn/Base UI und eigene Seiten-Stylesheets.
Die gemeinsame Größen- und Zeilenhöhenskala liegt in `app/typography.css` und wird
einmal über `app/globals.css` geladen. Inter ist die Schrift für Fließtext und
Bedienelemente; Cormorant Garamond bleibt die Schrift für redaktionelle Titel.

## Textrollen

Pixelangaben gelten bei einer Browser-Basisgröße von 16 px. Im Code stehen
relative rem-Werte; die Browser-Schriftgröße bleibt frei wählbar.

| Rolle                                | CSS-Variable            | Größe    |
| ------------------------------------ | ----------------------- | -------- |
| Quellen und Bildnachweise            | `--type-caption`        | 12 px    |
| Tags                                 | `--type-tag`            | 14 px    |
| Filter und sonstige UI-Texte         | `--type-ui`             | 14 px    |
| Buttons und Hauptnavigation          | `--type-button`         | 16 px    |
| Fließtext und Aufgabenbeschreibungen | `--type-body`           | 14 px    |
| Wissenschaftlicher Artname           | `--type-scientific`     | 16 px    |
| Einleitung                           | `--type-lead`           | 18 px    |
| Deutscher Artname                    | `--type-species-common` | 18 px    |
| Überschrift im Detailbereich         | `--type-detail-heading` | 18 px    |
| Karten- und Listentitel              | `--type-card-title`     | 20–24 px |
| Weitere Überschrift                  | `--type-heading`        | 28 px    |
| Große Abschnittsüberschrift          | `--type-section-title`  | 32–40 px |
| Seitentitel                          | `--type-page-title`     | 36–48 px |

## Artnamen als Komponente

Alle eigenständigen Namenspaare verwenden `SpeciesName` aus
`components/species-name.tsx`. Einzelne Namen verwenden `SpeciesCommonName`
oder `SpeciesScientificName`. Semantische Elemente sind über `commonAs`,
`scientificAs` beziehungsweise `as` wählbar; die expliziten Varianten `standard`, `atlas-title`, `sidebar` und `quiz` bewahren die
gewünschte Hierarchie.
Die Atlas-Titelanimation nutzt dieselbe Komponente mit `animated`.

Alle kompakten deutschen Artnamen und rechten Abschnittstitel teilen
`--type-label-heading` (18 px) und `--weight-label-heading` (700). Das gilt
auch für die Quiz-Variante, Auswahlkarten, Ergebnisse und Drag-Vorschauen.
Wissenschaftliche Namen bleiben 16 px/600 und kursiv. Die Atlas-Titelvariante
behält 32–48 px/700; ihr wissenschaftlicher Name ist halb so groß (mindestens
16 px), Gewicht 400. Namen im Fließtext folgen dessen Formatierung.

Die bisherigen 20-px-Namen und 20-px-Detailtitel sowie der zwischenzeitliche
24-px-Quizvorschlag sind durch die gemeinsam abgestimmte 18-px-Rolle ersetzt.

## Regeln für Änderungen

- In Seiten-CSS zentrale Textrollen verwenden; in JSX stehen bestehende Rollen
  auch als Tailwind-Klassen zur Verfügung.
- Keine lokalen Pixelgrößen, `text-[…]`-Sonderwerte oder `clamp()`-Formeln für Text
  ergänzen. Neue Rollen nur in `app/typography.css` definieren und hier dokumentieren.
- Dieselbe Funktion bekommt auf jeder Seite dieselbe Rolle. Mobile Ansichten
  ändern das Layout, nicht die Größe von Fließtext oder Artnamen.
- Fließtext ist auf Nutzerwunsch kompakt mit 14 px. Tags verwenden ebenfalls 14 px (`text-sm`);
  Quellen 12 px. Browser-Zoom bleibt möglich.
- Detailüberschriften im Atlas, in Wissen und Falknerei verwenden dieselbe
  `--type-detail-heading`-Rolle. Tags haben eine einzige gemeinsame CSS-Regel.
- Zeilenhöhen ebenfalls über Tokens wählen: `--leading-display` (1,1),
  `--leading-heading` (1,2), `--leading-compact` (1,4), `--leading-normal` (1,5)
  oder `--leading-relaxed` (1,7).
- Bibliothekskomponenten in `components/ui` behalten ihre Vorlage.
- Abstände, Rahmen, Radien und Schatten folgen dem freigegebenen
  [soften Design-System](design-system.md).

Quiz-Rückmeldungen: Titel 16 px/700 über `--type-feedback-title`; Erklärung
14 px/400 ohne fett hervorgehobene Wörter oder Werte.

Alle Quiz-Fragentitel: `QuizQuestionTitle` und `--type-quiz-question`,
32 px/700, auch mobil. Keine lokalen Fragentitel-Größen ergänzen.

## Aktualisierte Abstimmung

Die rechte Überschriftenrolle beträgt jetzt 24 px/700 und darf von der linken
Artenliste (18 px/700) abweichen. Deutsche Namen in Quiz und Wissen verwenden
die Varianten `quiz` und `knowledge`, beide 24 px/700. Wissenschaftliche Namen
und die große Atlas-Titelvariante behalten ihre Größe und Gewichte. Dies ersetzt
die oben beschriebene gemeinsame 18-px-Rolle für diese Bereiche.

Der gemeinsame Atlas-Außenabstand steigt von 8 auf 12 px; Gruppierung,
Gruppentitel und beide Seiten der Kopfleiste folgen diesem Token. Die drei
Informationstabs bleiben mit deckendem Hintergrund beim Scrollen sichtbar.
„Status in Deutschland“ erscheint nur mit Vorkommensangaben; der Wert
`ausserhalb` wird mitsamt ansonsten leerem Abschnitt ausgeblendet.

Die Kopfleiste endet immer mit dem Hell-Dunkel-Schalter ganz rechts; davor
steht die Navigation. Links stehen Titel und direkt anschließend die Suche.

Deutsche Artnamen in Quiz und Wissen: 24 px/700, über die gemeinsamen
Varianten-Tokens. Die Artenliste bleibt 18 px/700. Messwertleiste: 20 px Radius
(`--radius-surface`). Rechte Atlas-Infospalte auf Desktop: abgerundete Fläche
mit gleichem Radius, 12 px Randabstand oben/rechts/unten auf durchgehendem
Bühnenhintergrund. Scrollen und fixierte Tabs bleiben innerhalb dieser Fläche.

Buttons verwenden `--type-button` (16 px), einschließlich kleiner Buttonvarianten.
Innerhalb von Buttons verweist `--type-ui` auf diese Rolle; explizite Artnamen
und Informationshierarchien behalten ihre eigenen Rollen. Runde Icon-Controls
und pillenförmige Tabs behalten ihre Geometrie.

Entdeckungen: alle Kartentitel in Cormorant Garamond, 24 px/700. Bei Aufgaben
mit mehreren Arten steht der tatsächliche Fragentitel statt einer Artenliste.
Der Untertitel verwendet Inter (Sans Serif), text-sm (14 px), mit 2 px Abstand.

Navbar-Marke: Inter (Sans Serif), `--type-brand` = `text-xl` (20 px), Gewicht 600; das feste Steinadler-Porträt
misst 32 × 32 px. Die übrigen Kopfleisten-Controls behalten ihre Höhe.

Entdeckungen: Fragentyp-Unterzeile ausdrücklich Inter (Sans Serif), text-sm (14 px). Punktzahl rechts
in Inter (Sans Serif), text-sm (14 px)/600; „/ 100“ ebenfalls 14 px, Gewicht 400. Eigene
Klassen verhindern, dass Untertitel und Punktzahl gemeinsame small-Regeln erben.

Gefieder-Auswahl (Altvogel/Jungvogel und Farbformen): Inter, text-sm (14 px),
Gewicht 500. Die Buttonrolle wird hierfür auf die vorhandene Body-Rolle gesetzt.

Atlas-Vogelname: auf Nutzerwunsch responsive von `text-4xl` bis `text-6xl`
(32–48 px), weiterhin Cormorant Garamond/700. Der wissenschaftliche Name
bleibt halb so groß (16–24 px), Gewicht 400. Artenliste und Quiz bleiben unverändert.

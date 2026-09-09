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
| Tags                                 | `--type-tag`            | 13 px    |
| Navigation, Buttons, Filter          | `--type-ui`             | 14 px    |
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
behält 40–64 px/700; ihr wissenschaftlicher Name ist halb so groß (mindestens
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
- Fließtext ist auf Nutzerwunsch kompakt mit 14 px. Tags verwenden 13 px;
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
28 px/700, auch mobil. Keine lokalen Fragentitel-Größen ergänzen.

# Typografie

Stand: 10. September 2026. Dieses Dokument beschreibt den aktuellen Zustand,
keine Änderungshistorie. Die Skala liegt in `app/typography.css` und wird einmal
über `app/globals.css` geladen. Inter ist die Schrift für Fließtext und
Bedienelemente, Source Serif 4 die für redaktionelle Titel. Ergänzend gilt
[docs/design-system.md](design-system.md) für Farben, Abstände und Bewegung.

## Textrollen

Pixelangaben gelten bei einer Browser-Basisgröße von 16 px. Im Code stehen
relative rem-Werte; die Browser-Schriftgröße bleibt frei wählbar.

| Rolle                                   | CSS-Variable               | Größe    |
| --------------------------------------- | -------------------------- | -------- |
| Quellen und Bildnachweise               | `--type-caption`           | 12 px    |
| Filter und sonstige UI-Texte            | `--type-ui`                | 14 px    |
| Fließtext und Aufgabenbeschreibungen    | `--type-body`              | 14 px    |
| Tags                                    | `--type-tag`               | 14 px    |
| Tooltips (alle Varianten, inkl. Inhalt) | `--type-tooltip`           | 14 px    |
| Wissenschaftlicher Artname              | `--type-scientific`        | 16 px    |
| Buttons und Hauptnavigation             | `--type-button`            | 16 px    |
| Unterstrich-Tabs                        | `--type-tab`               | 16 px    |
| Quiz-Rückmeldung                        | `--type-feedback-title`    | 16 px    |
| Kompakte Artnamen (Liste, Falknerei)    | `--type-label-heading`     | 18 px    |
| Einleitung                              | `--type-lead`              | 18 px    |
| Wissenschaftlicher Artname im Quiz      | `--type-scientific-quiz`   | 16–18 px |
| Label-Titel                             | `--type-label-title`       | 20 px    |
| Marke in der Kopfzeile                  | `--type-brand`             | 20 px    |
| Karten- und Listentitel                 | `--type-card-title`        | 20–24 px |
| Detailüberschrift rechts                | `--type-detail-heading`    | 24 px    |
| Deutscher Artname im Quiz               | `--type-species-quiz`      | 20–24 px |
| Deutscher Artname in Wissen             | `--type-species-knowledge` | 24 px    |
| Weitere Überschrift                     | `--type-heading`           | 28 px    |
| Quiz-Fragentitel                        | `--type-quiz-question`     | 24–32 px |
| Seitentitel                             | `--type-page-title`        | 24–32 px |
| Große Abschnittsüberschrift             | `--type-section-title`     | 32–40 px |
| Atlas-Titel                             | `--type-hero`              | 32–48 px |
| Messwert                                | `--type-metric`            | 32 px    |
| Messwert, container-skaliert            | `--type-metric-compact`    | 18–32 px |
| Messwert, ♀/♂ geteilt                   | `--type-metric-split`      | 16–24 px |

Zeilenhöhen ebenfalls über Tokens: `--leading-display` (1,1),
`--leading-heading` (1,2), `--leading-compact` (1,4), `--leading-normal` (1,5)
und `--leading-relaxed` (1,7).

## Schriftstapel, Gewichte und Laufweite

Fallback-Schriften stehen ausschließlich in `--font-stack-body` (Inter) und
`--font-stack-display` (Source Serif 4). Gewichte kommen aus
`--weight-regular`, `--weight-medium`, `--weight-semibold` und `--weight-bold`
(400/500/600/700). Laufweiten kommen aus `--tracking-tight` (Display-Größen),
`--tracking-normal` (Fließtext und UI) und `--tracking-caps` (Versal-Labels).
Keine rohen Zahlen im Seiten-CSS.

## Artnamen als Komponente

Alle eigenständigen Namenspaare verwenden `SpeciesName` aus
`components/species-name.tsx`; einzelne Namen `SpeciesCommonName` oder
`SpeciesScientificName`. Semantische Elemente sind über `commonAs`,
`scientificAs` beziehungsweise `as` wählbar. Die Varianten bewahren die
Hierarchie:

| Variante      | Deutscher Name   | Wissenschaftlicher Name          |
| ------------- | ---------------- | -------------------------------- |
| `standard`    | 18 px / 700      | 16 px / 600, kursiv              |
| `sidebar`     | 18 px / 700      | 16 px / 600, kursiv              |
| `quiz`        | 20–24 px / 700   | 16–18 px, direkt am deutschen Namen |
| `knowledge`   | 24 px / 700      | 16 px / 600, kursiv              |
| `atlas-title` | 32–48 px / 700   | halb so groß (min. 16 px), 400   |

Die Atlas-Titelanimation nutzt dieselbe Komponente mit `animated`. Namen im
Fließtext folgen dessen Formatierung.

## Anwendung

- Detailüberschriften im Atlas, in Wissen und Falknerei verwenden dieselbe
  `--type-detail-heading`-Rolle, ausdrücklich unabhängig von der Artenliste.
  Spezifischere Selektoren und mobile Regeln erzwingen keine größeren Werte.
- Buttons verwenden `--type-button`, einschließlich kleiner Varianten;
  innerhalb von Buttons verweist `--type-ui` auf diese Rolle. Pillen-Tabs und
  die Gefieder-Auswahl verwenden `--type-body` mit `--weight-medium`.
- Die Marke in der Kopfzeile steht in der Display-Schrift, 20 px, Gewicht 500;
  das Steinadler-Porträt misst 32 × 32 px.
- Quiz-Rückmeldungen: Titel 16 px/700, Erklärung 14 px/400 ohne fett
  hervorgehobene Wörter oder Werte. Alle Fragentitel nutzen
  `QuizQuestionTitle` mit `--type-quiz-question` und `--leading-display`,
  auch mehrzeilig. Die Rolle skaliert selbst mit der Viewportbreite
  (24–32 px); die Frage bekommt auf keiner Seite eine eigene mobile Größe.
- Tags haben eine einzige gemeinsame CSS-Regel.
- Bibliothekskomponenten in `components/ui` behalten ihre Vorlage.

## Regeln für Änderungen

- Dieselbe Funktion bekommt auf jeder Seite dieselbe Rolle. Mobile Ansichten
  ändern das Layout; die Größe ändert nur die Rolle selbst, wenn sie mit der
  Viewportbreite skaliert (Quiz-Frage und Quiz-Artnamen). Keine mobilen
  Sondergrößen im Seiten-CSS.
- Artnamen trennen deutsche Komposita mit `hyphens: auto`; der Bruch an
  beliebiger Stelle bleibt die letzte Rettung für sehr enge Spalten.
- Keine lokalen Pixelgrößen, `text-[…]`-Sonderwerte oder eigene `clamp()`-
  Formeln. Neue Rollen nur in `app/typography.css` definieren und hier
  dokumentieren. `npm run lint` meldet rohe Größen mit Fundstelle.
- In Seiten-CSS zentrale Textrollen verwenden; in JSX stehen die Rollen auch als
  Tailwind-Klassen zur Verfügung.
- Fließtext bleibt bewusst kompakt bei 14 px, Quellen bei 12 px. Browser-Zoom
  bleibt möglich; mobile Suchfelder mindestens 16 px gegen Fokus-Zoom.
- Die Musterseite `/styleguide` zeigt jede Textrolle im Vergleich.

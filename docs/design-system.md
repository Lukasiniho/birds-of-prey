# Softes Design-System

Stand: 9. September 2026. Die Rollen wurden mit Lukas abgestimmt. Sie geben
wiederkehrenden Elementen gemeinsame Werte, lassen aber begründete optische und
fachliche Ausnahmen zu. Keine automatische Rundung sämtlicher CSS-Zahlen.

## Quellen und Zuständigkeiten

- `app/design-system.css`: Abstände, Layoutrollen, Radien, Rahmen und Schatten.
- `app/typography.css`: Schriftgrößen, Zeilenhöhen und Artname-Varianten.
- `docs/typography.md`: Anwendung und gewünschte typografische Hierarchie.
- `app/transitions-root.css`: bestehende Animationsparameter.
- `app/globals.css`: gemeinsame Farben für hell/dunkel und Atlas-Komponenten.
- Seiten-CSS: Anordnung, responsive Umbrüche und fachliche Darstellungen.

## Abstände

Abstände werden in rem definiert. Die folgenden Pixelwerte gelten bei 16 px
Browser-Basisschrift. Rahmen und Radien bleiben geometrische px-Werte.

| Token        | Referenzwert | Einsatz                                         |
| ------------ | -----------: | ----------------------------------------------- |
| `--space-2`  |         2 px | Kleine optische Korrektur                       |
| `--space-4`  |         4 px | Eng zusammengehörige Elemente, Tag-Innenabstand |
| `--space-8`  |         8 px | Icon/Text, kleine Listen und Controls           |
| `--space-12` |        12 px | Textanschluss, kompakte Controls                |
| `--space-16` |        16 px | Karten, kompakte Panels, Grid-Abstände          |
| `--space-20` |        20 px | Mittlere Inhaltsabstände, mobiler Seitenrand    |
| `--space-24` |        24 px | Panel-Innenabstand, zusammengehörige Abschnitte |
| `--space-32` |        32 px | Seitenabschnitte und Seitenkopf-Abstand         |
| `--space-40` |        40 px | Seitenrand auf Desktop                          |

Bevorzugt semantische Rollen verwenden:

| Rolle                     | Desktop | Bis 760 px |
| ------------------------- | ------: | ---------: |
| `--page-gutter`           |   40 px |      20 px |
| `--section-gap`           |   32 px |      32 px |
| `--panel-padding`         |   24 px |      16 px |
| `--panel-padding-compact` |   16 px |      16 px |

`.page-content` teilt Seitenabstände zwischen Quiz, Wissen und Falknerei.
`.detail-panel` teilt das Padding zwischen Atlas, Anatomie und Falknerei.
Die Atlas-Bühne bleibt ein flächiges Spaltenlayout; ihre Illustration erhält
keinen zusätzlichen Seitenrand. Die Kopfleiste folgt auf Quiz-/Wissensseiten dem Seitenrand. Im Atlas
richtet sie sich mit `--atlas-gutter` (8 px) an der
linken Artenleiste aus. Gruppierungs- und Gruppenüberschriften bekommen keine
zusätzliche horizontale Einrückung. Vogelkarten verwenden 4 px Innenabstand
und 8 px zwischen Porträt und Name. Das Außenpadding der Artenleiste wird nur
einmal definiert, damit lange Namen möglichst viel Platz behalten.
Die bestehenden maximalen Inhaltsbreiten dürfen sich wegen der Arbeitsflächen
unterscheiden (Quiz 1360 px; Wissen/Falknerei 1440 px).

Im Atlas bilden `--rail-section-gap`, `--rail-content-gap` und
`--rail-caption-gap` Aliase auf 24/16/12 px, keine eigene Skala.

## Radien und Rahmen

| Rolle                |   Wert | Einsatz                                      |
| -------------------- | -----: | -------------------------------------------- |
| `--radius-small`     |   6 px | Kleine Kennzeichnungen, Bildausschnitte      |
| `--radius-control`   |   8 px | Buttons, Eingaben, Auswahlsteuerung          |
| `--radius-card`      |  12 px | Quizkarten, Karten-Vorschauen, Drag-Vorschau |
| `--radius-surface`   |  20 px | Große Arbeitsflächen und Dialoge             |
| `--radius-pill`      | 999 px | Tags und pillenförmige Tabs                  |
| `--border-structure` |   1 px | Flächengrenzen, Trennlinien                  |
| `--border-selection` |   2 px | Interaktive Auswahl und Drop-Ziele           |

Auswahlrahmen reservieren bereits im inaktiven Zustand 2 px. Ein Wechsel der
Auswahl ändert Farbe/Zustand, nicht die Elementgröße. Reine Links und Navigation
brauchen nicht zusätzlich einen Auswahlrahmen. Fokusindikatoren bleiben sichtbar.
Tailwinds vorhandene `--radius-md/lg` sind Aliase auf small/control; die
Bibliotheksdateien in `components/ui` werden nicht verändert.

## Schatten

| Rolle               | Verwendung                                                           |
| ------------------- | -------------------------------------------------------------------- |
| `--shadow-none`     | Normale Karten und große Arbeitsflächen                              |
| `--shadow-subtle`   | Leicht angehobene Controls, aktive Tab-Pille                         |
| `--shadow-floating` | Tooltip, Menü, Drag-Vorschau, schwebende Toolbar, fixe Antwortleiste |

Schatten sind zentral für hell/dunkel definiert. Keine neuen individuellen
Kartenschatten ergänzen. Ringe zur Darstellung von Farbe, Fokus oder Markierung
sind keine dekorative Elevation.

## Typografie und bewahrte Hierarchie

Einheitlichkeit bedeutet gleiche Rolle, nicht gleiche Größe für alle Inhalte.
Die große Atlas-Überschrift behält die vorherige Hierarchie: 40–64 px,
Schriftgewicht 700; wissenschaftlicher Name halb so groß, mindestens 16 px,
Gewicht 400.

Nach der abschließenden Abstimmung verwenden alle kompakten deutschen Artnamen
(Seitenliste, Quiz einschließlich Ergebnisse/Drag-Vorschauen, Wissen und
Falknerei) und die rechten Abschnittsüberschriften dieselbe Rolle:
`--type-label-heading` mit 18 px und `--weight-label-heading` mit 700.
`--type-species-common`, `--type-species-quiz` und `--type-detail-heading` sind
Aliase dieser Rolle. Wissenschaftliche Namen bleiben 16 px/600.
Dies ersetzt die zwischenzeitlichen 20-px- bzw. 24-px-Vorschläge für kompakte
Artnamen. Die Atlas-Titelvariante bleibt eine bewusste eigene Rolle.

Das gilt rechts unter anderem für „Erkennungsmerkmale“, „Farben“, „Lebensweise“,
„Brut & Aufzucht“, „Nahrungsbeispiele“ und „Jagdweise“. Fließtext bleibt 14 px,
Tags 13 px. Spezifischere CSS-Regeln dürfen diese gemeinsamen Rollen nicht
überschreiben.

## Bewusste Ausnahmen

- Vogelbilder, Ausschnitte, Kartenkoordinaten und die Anatomie-Bühne behalten
  ihre fachlich/optisch abgestimmte Geometrie. Insbesondere bleiben die
  Sortierbilder bei 175 px bzw. der bestehenden mobilen Größe von 150 px.
- Kreise verwenden 50 %. Slider-/Radiopunkte, Anatomiemarker, Farbringe,
  Tooltip-Pfeile und Score-Grafiken behalten konstruktive Rand-/Ringstärken.
- Kleine negative Abstände, Text-Baselines, Bildnachweise und Positionswerte
  dürfen optisch abgestimmt bleiben. Eine solche Ausnahme ist kein neuer Token.
- Tab-Pillen messen ihre Position dynamisch; dazugehörige Track-Abstände und
  Animationen bleiben zusammen abgestimmt.
- Die Quiz-Antwortleiste reserviert per ResizeObserver ihre reale Höhe.
  Safe-Area-Abstand und die berechnete horizontale Ausrichtung bleiben dynamisch.
  Unteres Seitenpadding darf an keinem Breakpoint diese Reserve überschreiben.
- Bestehende Breakpoints, Bildgrößen, Seitenbreiten und Interaktionsflächen
  werden nicht pauschal auf die Abstandsskala gerundet.

## Vorgehen bei Änderungen

1. Bestehende Rolle oder Komponente suchen und wiederverwenden.
2. Gleiche Elemente gemeinsam ändern; keine weitere Override-Schicht anhängen.
3. Neue Rolle nur bei einem wiederkehrenden Bedarf zentral definieren und hier
   ergänzen. Eine einzelne Bildkorrektur rechtfertigt keine neue Abstandsstufe.
4. Schriftgrößen und Gewichte nicht im Rahmen einer Abstandsbereinigung ändern.
5. Build und betroffene Interaktionen prüfen. Bei Layoutfehlern auch die
   spezifischeren Selektoren und alle vorhandenen Breakpoints prüfen.

## Quiz-Rückmeldungen

Alle Aufgaben verwenden `QuizFeedback`. Die Überschrift nutzt
`--type-feedback-title` (16 px), Gewicht 700. Erklärungstext bleibt 14 px und
Gewicht 400, auch Antworten oder Messwerte darin werden nicht fett hervorgehoben.
Ein 36-px-Kreis trägt das 24-px-Symbol: grünes Häkchen auf hellem Grün bei
Volltreffern, rotes Kreuz auf hellem Rot bei unvollständigen/falschen Antworten.
Die vorhandenen Erfolgs-/Fehlerfarben berücksichtigen auch den Dunkelmodus.

## Quiz-Aufgaben

Alle sieben Aufgabentypen nutzen `QuizQuestionTitle`: 28 px, Gewicht 700.
Aufgabenbereiche haben links, rechts und unten dasselbe `--panel-padding`
(24 px Desktop, 16 px mobil). In zweispaltigen Aufgaben sitzt die Antwortgruppe
am unteren Innenrand; zusätzliche Höhe wird vor der Gruppe aufgenommen, nicht
als unterschiedlich großer Leerraum unter der letzten Antwort. Die Titelrolle
und diese Abstände gelten vor und nach der Auswertung.

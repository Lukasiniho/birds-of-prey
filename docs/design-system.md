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
richtet sie sich mit `--atlas-gutter` (12 px) an der
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

Die Gefieder-Pills (Altvogel/Jungvogel, Farbmorphen) behalten den Produktionsstil:
48 px Radius (`--radius-tab-pill`), 3 px Schienen-Innenabstand, 30 px Höhe und
4/13 px Button-Padding. `--shadow-active-pill` kombiniert den ursprünglichen
Schatten (0 1px 2px, Schwarz 10 %) mit einer äußeren 1-px-Kontur
(Vordergrundfarbe 10 %). Kein zusätzlicher Border und kein generischer
`--shadow-subtle` auf diesen Pills. Tags und reine Unterstrich-Tabs sind
separate Rollen.

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

Alle sieben Aufgabentypen nutzen `QuizQuestionTitle`: 32 px, Gewicht 700.
Aufgabenbereiche haben links, rechts und unten dasselbe `--panel-padding`
(24 px Desktop, 16 px mobil). In zweispaltigen Aufgaben sitzt die Antwortgruppe
am unteren Innenrand; zusätzliche Höhe wird vor der Gruppe aufgenommen, nicht
als unterschiedlich großer Leerraum unter der letzten Antwort. Die Titelrolle
und diese Abstände gelten vor und nach der Auswertung.

## Gruppierung der Artenleiste

Die Auswahl bietet Gattung, Verbreitung, Lebensraum und Größe. „Region“ entfällt
als redundante geografische Ansicht. Verbreitung verwendet genau eine vorhandene
Verbreitungsangabe pro Art; Lebensraum bleibt bewusst eine Mehrfachzuordnung.

Größe nutzt fünf feste Navigationsklassen, aufsteigend sortiert. Grundlage ist
der Mittelwert einer angegebenen Spannweiten-Spanne in cm oder ein expliziter
Einzelwert. Eine bloße Obergrenze wie „bis 200“ wird nicht als Mittelwert
interpretiert; dann wird das mittlere/angegebene Gewicht herangezogen (kg→g).

| Klasse     | Spannweite      | Ersatzweise Gewicht |
| ---------- | --------------- | ------------------- |
| Sehr klein | <80 cm          | <300 g              |
| Klein      | 80 bis <120 cm  | 300 bis <1.000 g    |
| Mittelgroß | 120 bis <170 cm | 1.000 bis <2.500 g  |
| Groß       | 170 bis <220 cm | 2.500 bis <5.000 g  |
| Sehr groß  | ≥220 cm         | ≥5.000 g            |

Jede Art erscheint genau einmal, leere Klassen werden bei Suchfiltern ausgeblendet.
Fehlen später beide Maße, bleibt die Art unter „Größe nicht bekannt“ auffindbar.
Die fünf Klassen sind Navigationshilfen, keine biologische Klassifikation.
Die Berechnung liegt in `lib/species-size.ts`.

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

Die gemeinsame Kopfleiste platziert die Suche direkt rechts neben dem Titel.
Hell-Dunkel-Schalter und Navigation haben feste Grid-Spalten am rechten Rand,
auch auf Seiten ohne Suche. Alle Seiten verwenden dafür 12 px Außenabstand
und dieselben responsiven Zeilen und Höhen.

Seitenleisten: oberer Innenabstand entspricht dem linken und rechten
Innenabstand (Artenliste 12 px; Detailbereich über `--panel-padding`).
Die Informationstabs erhalten kein zusätzliches oberes Padding.

Die Kopfleiste endet immer mit dem Hell-Dunkel-Schalter ganz rechts; davor
steht die Navigation. Links stehen Titel und direkt anschließend die Suche.

Vergleichskarten im Quiz: Namen oben links, Vogel rechts; kein gestapelter
Namensblock unter dem Bild. Auf schmalen Displays stehen die Karten untereinander.

Quiz-Fragenzahl: 5, 8 (Standard), 12 oder 16. Vor der ersten Antwort wählbar,
in einer begonnenen Runde gesperrt; im Ergebnis für die nächste Runde wählbar.
Ergebnisübersicht: 144-px-Punktekreis, kompakter Titel und kurze Zusammenfassung.

Deutsche Artnamen in Quiz und Wissen: 24 px/700, über die gemeinsamen
Varianten-Tokens. Die Artenliste bleibt 18 px/700. Messwertleiste: 20 px Radius
(`--radius-surface`). Rechte Atlas-Infospalte auf Desktop: abgerundete Fläche
mit gleichem Radius, 12 px Randabstand oben/rechts/unten auf durchgehendem
Bühnenhintergrund. Scrollen und fixierte Tabs bleiben innerhalb dieser Fläche.

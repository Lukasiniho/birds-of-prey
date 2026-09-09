# Softes Design-System

Spannweite und Gewicht: Bei Von-bis-Spannen entfällt „ca.“ in der Anzeige.
Bei Einzelwerten bleibt die Näherungsangabe erhalten; Quelldaten bleiben unverändert.

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
unterscheiden (Quiz und Wissen 1360 px; Falknerei 1440 px).

Im Atlas bilden `--rail-section-gap`, `--rail-content-gap` und
`--rail-caption-gap` Aliase auf 24/16/12 px, keine eigene Skala.

## Radien und Rahmen

| Rolle                |   Wert | Einsatz                                      |
| -------------------- | -----: | -------------------------------------------- |
| `--radius-small`     |   6 px | Kleine Kennzeichnungen, Bildausschnitte      |
| `--radius-control`   |  12 px | Buttons, Eingaben, Auswahlsteuerung          |
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

Größe richtet sich nach dem typischen Gewicht (Mittelwert der angegebenen
Gewichtsspanne oder Einzelwert), nicht nach relativen Häufigkeiten im Katalog.
Spannweite sortiert ausschließlich innerhalb der Gewichtsklasse; lange Flügel
stufen leichte Arten nicht hoch. Jede Art erscheint genau einmal.

| Klasse | Typisches Gewicht |
| --- | --- |
| Sehr klein | <200 g |
| Klein | 200 bis <600 g |
| Mittelgroß | 600 bis <2.000 g |
| Groß | 2.000 bis <5.000 g |
| Sehr groß | ≥5.000 g |

Habicht, Mäusebussard, Rot- und Schwarzmilan: mittelgroß. Steppenadler: groß.
Fehlendes/unklares Gewicht: „Größe nicht bekannt“. Leere Gruppen sind unsichtbar.
Dies sind Navigationsklassen, keine biologische Klassifikation.

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

Dropdowns: Cluster-Auswahl und Fragenzahl teilen `AppSelectTrigger` und
`AppSelectContent`, inklusive Rahmen, Typografie, Popup und Animation. Neue
Dropdowns verwenden dieselbe Komposition; nur die Breite darf sich nach Inhalt
unterscheiden. Kopfleisten-Controls teilen 38 px Höhe; Navigation 20 px
horizontales Padding. Wissenschaftliche Quiz-Namen: 18 px, ohne oberen Abstand
zum deutschen Namen (24 px). Andere wissenschaftliche Namensrollen bleiben bestehen.

Die rechte Desktop-Infokarte hat unten einen 64-px-Verlauf zur Flächenfarbe
mit sanft eingeblendeter 2-px-Unschärfe. Der Verlauf liegt außerhalb des
Scrollinhalts, fängt keine Eingaben ab und respektiert Hell-/Dunkelmodus.
Zusätzliches Endpadding hält den letzten Inhalt vollständig lesbar.

Rechte Desktop-Spalte: 410 px, ab 1600 px Fensterbreite 440 px; auf schmalem
Desktop bis 1190 px 360 px. Die Mitte nimmt den verbleibenden Platz ein.

Messwertleiste: 8 px vertikales Padding auf Desktop, 32-px-Audiobutton mit
gefüllter Primärfarbe und kontrastreichem Symbol. Bild-/Audiohinweise mittig.

Fragenzahl steht in derselben Titelzeile rechts vom Quiz-Titel. Dropdowns
verwenden `--select-background`: Weiß im Hellmodus, Oberflächenfarbe im Dunkelmodus.

Messwert-Rhythmus: alle drei Beschriftungen 14 px, gemeinsame 20-px-Zeile,
2 px Abstand zur Werte-/Play-Zeile. Keine kleinere Sonderrolle für „Stimme“.
Quellenzeile folgt der Box im normalen Layout mit identischem Padding oben
und unten (8 px), ohne absolute Positionierung oder überlappende Außenabstände.

Unterer Verlauf: transparent am Anfang, 15 % Flächenfarbe bei 45 % Höhe und
maximal 55 % am unteren Rand. Blur 2 px, gleichmäßig über die volle Höhe
eingeblendet. Kein deckender Abschluss.

Messwertleiste: auf Wunsch insgesamt 10 px höher durch jeweils 5 px zusätzliches
Padding oben/unten. Die Wertezeile wird für die optische Zentrierung der
Display-Schrift zum Play-Kreis um 3 px angehoben; Beschriftungen bleiben bündig.

Der rechte Außenabstand der Desktop-Infobox wird einmalig am Spaltencontainer
reserviert: 12 px, identisch zu oben und unten. Die Box füllt ihre Spalte ohne
zusätzlichen rechten Margin.

Audiosteuerung ohne sichtbare Beschriftung „Stimme“: gefüllter 38-px-Button,
über beide Zeilen vertikal zentriert. Zugänglicher Play-/Pause-Name bleibt erhalten.

Korrektur zum unteren Verlauf: echte Transparenzmaske auf dem Scrollinhalt,
von voller Sichtbarkeit 64 px vor dem Rand auf 0 % Sichtbarkeit 8 px vor
dem Rand. Unten ist der Inhalt vollständig unsichtbar, die Kartenfläche und
der Rahmen bleiben sichtbar. Keine halbdeckende Farbfläche als Ersatz.

Audio-Spalte: kein zusätzlicher äußerer horizontaler Innenabstand an der
Messwertbox; die Spalte reicht bis zum inneren Boxrand. Der Button ist damit
zwischen Trennlinie und Boxrand zentriert (Spalte Desktop 88 px).
Unterer Fade: insgesamt 58 px, davon die letzten 10 px vollständig transparent;
der eigentliche Übergang umfasst 48 px. Blur bleibt 2 px.

Quiz-Kopf: Titel und Fragenzahl bilden eine gemeinsame Flex-Gruppe mit
24 px Abstand und vertikaler Zentrierung; nur der Fortschritt steht am
rechten Rand. Kein verteilender Leerraum zwischen Titel und Fragenzahl.

Quiz-Ergebnis: Punktekreis 180 px; Auswertung links, Punkte nach Fragentyp
rechts in zwei Spalten. Bis 1100 px stehen beide Bereiche untereinander.

Optische Ausrichtung im Quiz-Kopf: Serifentitel 3 px nach oben versetzt,
weil seine sichtbaren Buchstaben unterhalb der Mitte seiner Zeilenbox liegen.
Dropdown und Fortschrittsanzeige behalten ihre geometrische Zentrierung.

Im Dunkelmodus teilen Infokarte und Messwertkarte `--atlas-card-surface`
(#151e25), heller als der Bühnenhintergrund. Fixierte Informationstabs
verwenden dieselbe Kartenfarbe. Die bisherigen hellen Flächen bleiben erhalten.

Die drei Informationstabs stehen außerhalb von `.info-scroll`. Nur die
Tab-Inhalte scrollen; die Scrollbar beginnt unterhalb des festen Tab-Kopfs.

Messwertbox: Spannweite und Gewicht verwenden je `minmax(0, 1fr)` und
denselben Innenabstand. Keine breitere Gewichtsspalte, auch nicht mobil.

Navigation: Der gemeinsame Markentitel lautet „Greifvogelkompass“. Das mobile
Hamburger-Menü verwendet `modal={false}` ohne Scroll-Lock und dessen Layoutverschiebung.

Quiz-Fußleiste: Desktop 5 rem feste Höhe plus Safe Area, Aktionsbutton vertikal
zentriert und 224 px breit bei allen Beschriftungen, 12 px vertikaler Innenabstand.
Rückmeldungen bleiben kurz: Messwert statt wiederholter Schätzung, Beuteanzahl
statt Namensliste, leichteste Art statt vierteiliger Reihenfolge. Scrollen dient
nur als Rückfall bei sehr schmalen Ansichten oder Textvergrößerung. Mobil ist
die Erklärung auf 6 rem begrenzt und wächst nach oben; der Button
bleibt darunter bei voller Breite und 3 rem Höhe fest verankert. Buttontext wird
mit Flexbox und kompakter Zeilenhöhe zentriert. Das dekorative Pfeil-Icon entfällt.

Spannweitenvergleich: Vogelbilder bleiben vor und nach der Antwort unverändert
sichtbar. Die Spannweite wird im reservierten Bereich unter dem Artnamen eingeblendet.

Spannweitenquiz: Vier verschiedene Arten zur Auswahl. Der gesamte Spannweitenbereich
der richtigen Art liegt oberhalb der Bereiche aller drei Ablenker. Bilder bleiben bei Auflösung sichtbar.

Kopfleiste: ein gemeinsames Grid ohne routenabhängige Größen. Abstände nach Atlas-Referenz: Desktop 74 px;
801–1200 px zwei feste 47-px-Zeilen mit 12 px Außenpadding und 8 px Abstand
(126 px insgesamt). Bis 800 px überall 124 px mit fest reservierter Suchzeile;
Titel, Menü und Theme-Schalter stehen in der ersten Zeile. Die Suche erscheint ausschließlich
im Atlas. Auf anderen Routen bleibt die zweite Zeile frei, ohne unsichtbare
Eingabefelder. `scrollbar-gutter: stable` verhindert seitliches Springen beim
Wechsel zwischen Atlas und scrollenden Seiten. Legacy-Header-Regeln entfallen.

Quiz-Start: keine Ladeanzeige und keine vorübergehende Beispielrunde. Die
Zufallsrunde wird einmal vor dem ersten Client-Paint initialisiert. Die Auswahl
bewertet Kandidaten linear; nur die ausgewählte Vergleichsaufgabe wird gemischt.
Der Dokument-Scrollbereich bleibt routenübergreifend reserviert und sichtbar.

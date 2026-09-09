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
Die große Atlas-Überschrift behält die vorherige Hierarchie: 32–48 px,
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
Tags 14 px (`text-sm`). Spezifischere CSS-Regeln dürfen diese gemeinsamen Rollen nicht
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

Alle Aufgabentypen nutzen `QuizQuestionTitle`: 32 px, Gewicht 700,
Zeilenhöhe `--leading-display` (1,1), auch bei mehrzeiligen Fragen und mobil.
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

| Klasse     | Typisches Gewicht  |
| ---------- | ------------------ |
| Sehr klein | <200 g             |
| Klein      | 200 bis <600 g     |
| Mittelgroß | 600 bis <2.000 g   |
| Groß       | 2.000 bis <5.000 g |
| Sehr groß  | ≥5.000 g           |

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

Kopfleiste: ein gemeinsames Grid ohne routenabhängige Größen. Abstände nach Atlas-Referenz, oben/unten um je 4 px reduziert: Desktop 66 px;
801–1200 px zwei feste 47-px-Zeilen mit 8 px Außenpadding und 8 px Abstand
(118 px insgesamt). Bis 800 px überall 116 px mit fest reservierter Suchzeile;
Titel, Menü und Theme-Schalter stehen in der ersten Zeile. Die Suche erscheint ausschließlich
im Atlas. Auf anderen Routen bleibt die zweite Zeile frei, ohne unsichtbare
Eingabefelder. `scrollbar-gutter: stable` verhindert seitliches Springen beim
Wechsel zwischen Atlas und scrollenden Seiten. Legacy-Header-Regeln entfallen.

Quiz-Start: keine Ladeanzeige und keine vorübergehende Beispielrunde. Die
Zufallsrunde wird einmal vor dem ersten Client-Paint initialisiert. Die Auswahl
bewertet Kandidaten linear; nur die ausgewählte Vergleichsaufgabe wird gemischt.
Der Dokument-Scrollbereich bleibt routenübergreifend reserviert und sichtbar.

## Gemeinsame Hauptfarbe

`--main-color` ist die gemeinsame Teal-Hauptfarbe: `#487878` im Hellmodus,
`#86aaa6` im Dunkelmodus. `--primary`, `--selection-border` und `--ring`
sind semantische Aliase; Quiz-Akzente verwenden ebenfalls `--main-color`.
Auswahlflächen mischen die Hauptfarbe mit der jeweiligen Oberfläche.

Wissen verwendet für Artnamen und wissenschaftliche Namen `SpeciesName`
mit `variant="quiz"`, einschließlich des direkten Textanschlusses. Die
Artenumschaltung teilt die Sans-Serif-Pillenstile der Atlas-Steuerung.

Schätzfragen: Regler und Eingabewert stehen unter dem Fragetext ohne automatischen
oberen Flex-Abstand. Der natürliche Bereich bleibt vor der Auflösung unsichtbar
im Layout und reserviert exakt seinen späteren Platz, auch bei Textumbruch.
Schätzwerte: `text-5xl` (40 px)/700; aufgelöste Werte: `text-2xl` (24 px)/700.

## Gemeinsame Tooltips

`components/ui/tooltip.tsx` ist die zentrale, auf Nutzerwunsch angepasste
Tooltip-Komponente für die gesamte Seite. `app/tooltips.css` gestaltet sie;
keine eigenen Popup-Animationen oder Oberflächen in Seiten-CSS ergänzen.
`compact` verwendet Caption-Text und automatische Breite; `detail` Body-Text
und maximal 320 px. Beide verwenden dieselben Oberflächen- und Motion-Tokens.
Die äußere Messfläche bleibt statisch. Nur die innere Oberfläche skaliert,
während die separat positionierte Spitze mit dem gesamten Tooltip einblendet.
`TooltipHint` ersetzt einfache native Titelhinweise. Der Provider liegt im Layout.

Farbfelder behalten beim Wechsel von Alter/Morphe ihre Position als React-Key.
Ihre Hintergrundfarbe blendet über `--duration-medium` sanft über; neue Felder
blenden ein. Reduced Motion deaktiviert diese Übergänge.

## Artenfakten: erklärende Tooltips

Gefährdung und Zugverhalten öffnen per Hover oder Klick ein `detail`-Tooltip
mit Skala, aktueller Einstufung und Erklärung (`ConservationTooltip`,
`MovementTooltip`). Das Zugverhalten ordnet die Datenwerte auf vier Stufen von
Standvogel bis Langstreckenzieher ein und zeigt darunter die artspezifische
Anmerkung. Auch die Lebenserwartung nutzt diesen Trigger für ihren Kontext-Hinweis. Alle
erklärenden Trigger sind gepunktet unterstrichen und tragen `cursor-help`; die globale Pointer-Regel
für Buttons ist dafür ausgenommen, damit der Fragezeichen-Cursor erscheint.

## Quiz: Art und Ruf erkennen

Die zusätzlichen Erkennungsfragen verwenden dieselben `QuizQuestionTitle`-,
`SpeciesName`- und Antwortgruppen-Rollen wie die Jagdfrage. Die linke
Vogelbühne aller Aufgaben ist einheitlich `--q-stage` (hellgrau); keine
Aufgabe tönt sie teal oder anders ein. Vor der Auflösung
bleiben Name und beim Rufquiz auch Vogelbild verborgen. Der Audio-Player nutzt
die gemeinsame Hauptfarbe, Button-Typografie und Abstandstokens; die Quellen
bleiben in einem per Klick bedienbaren Popover mit zentralem `TooltipHint`.
Die bestehende Fragenzahl-Auswahl, Ergebnis-Typografie und feste Fußleiste gelten
auch für diese Aufgaben. Die übrigen Atlas- und Wissen-Styles bleiben auf main-Stand.

## Einheitliche Icons

Alle Icons verwenden die Familie Phosphor aus `components/icons.tsx` und dem
Paket `@phosphor-icons/react`. Die zentrale Komponente wählt pro Motiv den Schnitt:

- `regular` für Bedienelemente: Pfeile, Chevrons, Drag-Griffe, Plus/Minus,
  Schließen, Menü, Vergrößern, Laden, Häkchen und allgemeine Statushinweise.
- `duotone` ausdrücklich für Suche, Hell-Dunkel-Schalter, Play/Pause und den
  Standort im Quiz. Inhaltliche Fakten- und Quizmotive behalten ebenfalls Duotone.

Standardgröße 24 px; bestehende Größenklassen und CSS-Rollen bleiben wirksam.
Einzelimporte der SSR-Varianten funktionieren auch in Server Components ohne
Context-Provider. Nur verwendete Icons gelangen in den Produktionsbuild.

Alle Duotone-Icons tragen die Teal-Hauptfarbe (`--main-color`), wie die
Quizmotive: eine globale `:where()`-Regel ohne Spezifität in `app/globals.css`
setzt sie; explizite Icon-Farben (gefüllte Buttons wie Play/Pause, Zustände)
gewinnen weiterhin. Regular-Icons erben die bestehende semantische Textfarbe,
einschließlich Erfolg/Fehler. Die zweite Fläche von Duotone verwendet Phosphors
20 % Deckkraft. Keine zweite Icon-Familie ergänzen.

Select-, Combobox- und Dropdown-Menüs zeigen keine Auswahlhäkchen. Die frühere
Häkchenspalte entfällt. Ausgewählte Einträge behalten ihre ARIA-Zustände und
werden über die bestehende Auswahlfläche hervorgehoben; App-Select verwendet
zusätzlich die Teal-Textfarbe. Tastaturfokus und Auswahl bleiben getrennte Zustände.
Eigenständige Checkboxen und Quiz-Rückmeldungen behalten ihr Regular-Häkchen.

Auf ausdrücklichen Nutzerwunsch gelten diese Anpassungen auch in `components/ui`;
das übrige Verhalten der Vorlage bleibt erhalten. `components.json` verwendet
`phosphor` für künftig ergänzte Primitiven, deren Icons ebenfalls über die zentrale
Komponente einzubinden sind. Die Kartengrafik bleibt eine fachliche SVG-Visualisierung.

## Wissen: Bewegung

Die Wissen-Seite verwendet ausschließlich die Motion-Tokens aus
`app/transitions-root.css`. Der Tab-Unterstrich ist die gemessene
transitions.dev-Pille (`useSlidingPill` aus `lib/use-sliding-pill.ts`, geteilt
mit dem Atlas). Tab-Inhalte wechseln bewusst ohne Animation; die rechte Leiste
wechselt beim Auswählen als Text-Swap (`--duration-fast`, `--ease-in-out`,
`--distance-micro`), indem der Scrollbereich pro Auswahl neu gemountet wird.
Hover auf Kartenporträts und Beutekacheln wechselt nur Rahmen, Fläche und
Schatten, ohne Versatz oder Sprung; Farbwechsel
nutzen `--duration-quick`/`--duration-fast`. Reduced Motion schaltet alle
Übergänge und Animationen der Seite ab.

## Wissen: Jagdtiere und Jagdtechniken

Der dritte Wissen-Tab kehrt die Nahrungsangaben der Artenseiten um: links ein
Grid aller illustrierten Beutetiere mit mindestens einem Jäger (`.knowledge-grid`,
sortiert nach Anzahl der Arten), rechts das scrollende Panel mit den Jägern,
getrennt nach Hauptbeute und Gelegenheitsbeute. Die Jägerzeilen teilen die
Rolle `.knowledge-bird` mit den Beizvögeln der Falknerei-Karte; Anmerkungen zur
Beute erscheinen als `TooltipHint`. Beim Hover über einen Jäger markieren sich
alle Kacheln seiner weiteren Beute mit einem halbtransparenten Teal-Rahmen.
Kachel-Hover tönt die Bühne selbst (9 % Hauptfarbe auf `--stage`), damit die
Kachel im Hellmodus nicht zur weißen Karte wird; `--hover` wäre dort unsichtbar
und im Dunkelmodus blaugrau statt Teal.
Die Kachelillustrationen sind 72 px groß, eine Geometrie-Ausnahme zum 105-px-
Rahmen der Artenseite; Daten kommen unverändert aus `lib/ecology.ts`.

Der vierte Tab „Jagdtechniken“ verwendet denselben Bausatz (`.knowledge-tile`,
`.knowledge-group`, `.knowledge-bird`), aber ein festes Raster mit fünf Spalten
(drei unter 760 px), damit die längeren Techniknamen einzeilig bleiben: links die Techniken aus `huntingTypes`
mit der Jagdszene einer Art, deren führende Technik es ist (sonst eine andere
Szene, sonst Porträt), rechts Erklärtext und Arten, getrennt nach „Typische
Technik“ (erste Jagdweise der Art) und „Ergänzend“. Hover auf eine Art markiert
links ihre weiteren Techniken.

## Wissen: Falknerei-Weltkarte

Die Themen Körperbau und Falknerei teilen einen Seitenkopf und Base-UI-Tabs
(`variant="line"`). `.knowledge-tabs` verwendet dieselben Werte wie die
Atlas-Informationstabs (38 px Schiene, 2 px Marker), aber zwei Stufen kleiner
mit `--type-button` (16 px),
linksbündig mit 24 px Abstand. Direkte Themenlinks verwenden
`/wissen#falknerei`; die vorhandene Anatomie bleibt der Standardbereich.
Die Kartenfläche verwendet die gemeinsamen Teal-, Typografie- und Panelrollen;
Beizvögel auf der Weltkarte verwenden `sidebar`, entsprechend der vorhandenen
Falknerei-Hierarchie. Der Übertitel im Regionsfeld folgt einheitlich dem Muster
„Region · Zeit“; es gibt keinen Tag unter der Überschrift, und der Detailtext
ist ein normaler Absatz ohne Zitatbalken.

Die SVG-Karte verwendet dieselben Natural-Earth-Pfade und dieselbe Projektion
wie die Verbreitungskarten. Markerkoordinaten entstehen mit
`scripts/map-projection.mjs`; sie markieren regionale Beispiele und keine
Verbreitungsgebiete. Die Markergrößen (48/40/36 px) und Porträts (40/34/30 px) sind
Geometrie-Ausnahmen für die Kartenfläche.

Die Kopfzeile der Kartenfläche trägt rechts den Pill-Switch `.stage-tabs`
(dieselbe Rolle wie die Beispielvogel-Wahl im Körperbau: `t-tabs`-Schiene,
gedrückter Zustand mit `--tabs-pill-bg` und `--shadow-active-pill`, Schrift
`--type-body` wie die Gefieder-Pills im Atlas). Er wechselt
zwischen „Karte“ und „Zeitstrahl“; ein Kartensymbol gibt es dort nicht mehr.
Der Zeitstrahl (`falconryEras` in `knowledge-data.ts`) ist die zweite Achse zur
Karte: sechs Stationen von den Ursprüngen in der Steppe bis zur UNESCO-
Anerkennung als vertikale Liste mit Datum links, Schiene und Marker in der
Mitte, Name und Einzeiler rechts. Die vier Einzelthemen (Friedrich II.,
Wanderung der Ausrüstung, Falknersprache, Falknerei heute) sind in die
jeweilige Epoche eingearbeitet statt als eigene Kacheln. Die gewählte
Station folgt der Kachel-Rolle (`.knowledge-tile`): Teal-Rahmen
(`--border-selection`) auf `--selected`, Hover tönt wie bei den Jagdtechniken
die Bühne (9 % Hauptfarbe auf `--stage`). Der Stationsname bleibt in der Textfarbe; der Marker trägt die
Hauptfarbe, gefüllt und mit demselben 16-%-Ring wie die Kartenporträts, wenn
die Station gewählt ist. Karte und
Zeitstrahl teilen das rechte Regionsfeld über den Typ `FalconryChapter`
(„Ort · Zeit“, Titel, Beizvögel, zwei Absätze, Quellen); die Regionsauswahl
unter der Karte erscheint nur in der Kartenansicht. Der Info-Popover sitzt im
Zeitstrahl ebenfalls unten links, ohne Basiskarten-Nachweis.

Die Falknerei-Karte umfasst acht regionale Kapitel; die kasachische Adlerjagd
in Kasachstan, Kirgisistan und der Westmongolei ist ein gemeinsames Kapitel. Versetzte Porträts vermeiden
Überlagerungen; Verbindungslinien führen zu den geografischen Ankerpunkten.
Die rechten Leisten aller Wissen-Tabs verwenden `--atlas-info-surface`, dieselbe
Fläche wie die Informationsleiste im Atlas. Das Regionsfeld rechts scrollt innerhalb der Kartenhöhe (absolut positionierter
Inhalt), damit unter der Regionsauswahl keine Leerfläche entsteht; unter 760 px
steht es wieder im normalen Fluss. Die Regionsauswahl unter der Karte verwendet die gemeinsame Tag-Rolle
`.ecology-tags` als Buttons; der gewählte Eintrag ist invertiert: Hauptfarbe als
Fläche, `--primary-foreground` als Schrift. Keine eigenen Rahmen oder Button-Varianten.
Die Regionsnamen stehen dauerhaft in Caption-Größe unter den Porträts und
wechseln bei Auswahl, Hover oder Tastaturfokus in die Hauptfarbe; die
Auswahlliste darunter bleibt vollständig bedienbar.
Kartenquelle und UNESCO-Hinweis liegen wie bei den Verbreitungskarten im
`range-map-source`-Info-Popover unten links in der Karte; es gibt keine eigene
Fußzeile unter der Karte.

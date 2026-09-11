# Design-System

Stand: 10. September 2026. Dieses Dokument ist die aktuelle Spezifikation, keine
Änderungshistorie. Gleiche sichtbare Funktionen bekommen dieselbe Rolle; Rollen
werden zentral definiert und in Seiten-CSS nur verwendet, nicht neu erfunden.
`npm run lint` prüft Farben, Schriftgrößen, Radien und Breakpoints.

## Dateien und Zuständigkeiten

| Datei                      | Inhalt                                                                  |
| -------------------------- | ----------------------------------------------------------------------- |
| `app/globals.css`          | Nur Imports und die Tailwind-`@theme`-Zuordnung                         |
| `app/typography.css`       | Schriftskala, Textrollen, Schriftstapel, Gewichte, Laufweiten, Artnamen |
| `app/colors.css`           | Alle Farbrollen hell/dunkel, Tönungsstufen, Status, Karte, Schatten     |
| `app/design-system.css`    | Abstände, Layoutrollen, Steuerhöhen, Radien, Rahmen, Fokus, Schatten    |
| `app/transitions-root.css` | Bewegungsskala und die Token-Gruppen der genutzten Snippets             |
| `app/tabs.css`             | Die zwei Tab-Rollen                                                     |
| `app/tooltips.css`         | Tooltip-Fläche und -Pfeil                                               |
| `app/base.css`             | Body, Links, Buttons, Überschriften, Fokusring, App-Shell               |
| `app/header.css`           | Kopfzeile: Marke, Suche, Navigation, Aktionen, mobile Anordnung         |
| `app/atlas.css`            | Artenleiste, Bühne, Infobereich, Messwerte, Audio                       |
| `app/motion.css`           | transitions.dev-Snippets: Akkordeon, Textreveal, Zahlen, Icon-Swap, Menü |
| `app/tags.css`             | Art-Tags und Verbreitungsstatus                                         |
| `app/map.css`              | Verbreitungskarte                                                       |
| `app/sections.css`         | Seitenrahmen und Titel für Quiz, Wissen und Falknerei                   |
| Seiten-CSS                 | Anordnung, Umbrüche und fachliche Darstellung einer Seite               |

Die Bibliotheksdateien in `components/ui` werden nicht umgestaltet; nur die
Icon-Imports dürfen angepasst werden. Nicht verwendete Primitive sind entfernt;
neue nur ergänzen, wenn sie tatsächlich importiert werden.

## Checkliste für neue Seiten und Komponenten

1. Farben nur als Rollen aus `app/colors.css`; Tönungen nur mit `--tint-1` bis
   `--tint-6`. Kein Hex, kein rgb(), keine freien Prozentwerte.
2. Text nur über `--type-*`, `--weight-*`, `--tracking-*` und die beiden
   Schriftstapel. Keine lokalen Pixelgrößen.
3. Abstände über `--space-*` und die Layoutrollen; Radien, Rahmen, Schatten und
   Steuerhöhen über ihre Rollen.
4. Tabs nur als `.t-tabs` (Pille) oder `.t-tabs.t-tabs-line` (Unterstrich).
5. Fokus nicht selbst gestalten; der gemeinsame Ring gilt für alle Controls.
6. Bewegung über `--duration-*` und `--ease-*`; neue Snippets bekommen eine
   Token-Gruppe in `transitions-root.css`, keine Literale im Seiten-CSS.
7. Nur die gemeinsamen Breakpoints verwenden.
8. Dropdowns über `AppSelectTrigger`/`AppSelectContent`, Icons aus
   `components/icons.tsx`, Artnamen über `SpeciesName`.
9. Neue Rolle nur bei wiederkehrendem Bedarf, zentral definiert und hier
   dokumentiert. Eine einzelne Bildkorrektur rechtfertigt keine neue Stufe.

## Farben

Alle Farben sind Rollen in `app/colors.css`, der einzigen Datei mit Hex- oder
rgb()-Werten. Seiten definieren keine eigenen Paletten; das Quiz nutzt dieselben
Rollen wie der Atlas.

| Rolle                        | Einsatz                                                |
| ---------------------------- | ------------------------------------------------------ |
| `--background`               | Seite, Kopfzeile, Tab-Pille                            |
| `--surface`                  | Erhabene Fläche: Karten, Menüs, Dropdown-Trigger       |
| `--stage`                    | Vertiefte Fläche: Bild- und Quizbühnen, Kartenwasser   |
| `--muted`                    | Ruhige Nebenfläche                                     |
| `--hover`                    | Zeilen- und Listen-Hover                               |
| `--foreground`               | Text, Anatomiemarker                                   |
| `--muted-foreground`         | Nebentext und Platzhalter auf `--background`/`--surface` |
| `--muted-foreground-stage`   | Nebentext auf Vertieftem: Bühne und Tab-Schiene          |
| `--muted-foreground-faint`   | Nur Nicht-Text: inaktive Schrittpunkte                 |
| `--border`                   | Hairlines und Flächengrenzen                           |
| `--main-color`               | Akzent; `--primary`, `--ring`, `--selection-border` sind Aliase |
| `--primary-foreground`       | Text und Icons auf gefüllten Akzentflächen             |
| `--primary-hover`            | Hover gefüllter Akzentbuttons                          |
| `--selected`                 | Aktive Navigation, Tags, gewählte Zeilen               |
| `--selected-strong`          | Tag-Hover; im Dunkelmodus eine Stufe kräftiger         |
| `--accent-ring`              | Leuchtringe um Marker und Pins                         |
| `--accent-line`              | Akzentrahmen (verwandte Kacheln, aktiver Marker)       |
| `--line-soft`                | Tab-Schiene                                            |
| `--line-tint`                | Feine Rahmen auf Flächen, Farbfeld-Ränder              |
| `--success`, `--success-soft` | Richtige Antworten                                    |
| `--danger`, `--danger-soft`  | Falsche Antworten                                      |
| `--scrim*`, `--on-image*`    | Verläufe und Text auf Fotos, in beiden Themes gleich   |
| `--map-*`                    | Wasser, Land, Umriss und Verbreitung der Karte         |
| `--shadow-color-*`           | Nur von den Schattenrollen verwendet                   |

Tönungen entstehen ausschließlich mit `color-mix` und den Stufen `--tint-1`
bis `--tint-6` (6, 10, 16, 24, 34, 45 %). Im Dunkelmodus wird `--selected`
eine Stufe kräftiger, weil dunkle Flächen die 10-%-Tönung schlucken;
Aufrufstellen brauchen dafür keine eigenen Regeln. Alle Duotone-Icons tragen
`--main-color`; nur Icons auf gefüllten Buttons behalten ihre Kontrastfarbe.
Quiz-Vogelbühnen sind immer `--stage`. Dropdown-Trigger und Menüs sind hell
`--surface`, dunkel `--background` (`--select-background`).

## Typografie

Details in `docs/typography.md`. Kurzfassung: Inter für Fließtext und
Bedienelemente, Source Serif 4 für redaktionelle Titel.

- Schriftstapel nur über `--font-stack-body` und `--font-stack-display`.
- Gewichte nur über `--weight-regular/medium/semibold/bold` (400/500/600/700).
- Laufweite nur über `--tracking-tight` (Display-Größen), `--tracking-normal`
  und `--tracking-caps` (Versal-Labels).
- Fließtext 14 px, Tags 14 px, Tooltips 14 px (alle Varianten, auch Skalen und
  Legenden), Quellen 12 px, Buttons und Unterstrich-Tabs 16 px, Pillen 14 px.
- Deutsche Artnamen: Seitenleiste und Falknerei 18 px/700; Quiz und Wissen
  24 px/700 (Varianten `quiz`, `knowledge`); wissenschaftliche Namen 16 px/600
  kursiv, im Quiz 18 px direkt am deutschen Namen. Die Atlas-Titelvariante
  bleibt 32–48 px/700 mit halb so großem wissenschaftlichen Namen (min. 16 px,
  400). Rechte Detailüberschriften 24 px/700, unabhängig von der Seitenleiste.
- Die große Atlas-Überschrift und die Gewichte der Artenliste (700/600) bleiben.
- Spannweite und Gewicht: bei Von-bis-Spannen entfällt „ca.“ in der Anzeige;
  Einzelwerte behalten die Näherungsangabe. Gewicht immer in Gramm.

## Abstände

Abstände werden in rem definiert; die Pixelwerte gelten bei 16 px
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

| Rolle                     | Desktop | Bis 760 px |
| ------------------------- | ------: | ---------: |
| `--page-gutter`           |   40 px |      20 px |
| `--section-gap`           |   32 px |      32 px |
| `--panel-padding`         |   24 px |      16 px |
| `--panel-padding-compact` |   16 px |      16 px |

`.page-content` teilt Seitenabstände zwischen Quiz, Wissen und Falknerei.
`.detail-panel` teilt das Padding zwischen Atlas, Anatomie und Falknerei. Im
Atlas richten sich Kopfleiste, Gruppierung und Gruppentitel mit
`--atlas-gutter` (12 px) an der Artenleiste aus. Artenzeilen (`.species-row`)
haben überall 4 px Innenabstand und 8 px zwischen Porträt und Name; das
Porträt misst 64 px in Auswahllisten (`--species-row-portrait`) und 48 px im
Fließtext (`--species-row-portrait-inline`, `data-size="inline"`). `--rail-section-gap`,
`--rail-content-gap` und `--rail-caption-gap` sind Aliase auf 24/16/12 px.
Maximale Inhaltsbreiten: Quiz und Wissen 1360 px, Falknerei 1440 px.
Spannweite und Gewicht teilen die Messwertbox in gleich breite Bereiche mit
identischem Innenabstand; die Audio-Spalte ist separat, auch mobil.

## Steuerhöhen, Radien, Rahmen, Fokus

| Rolle                      |   Wert | Einsatz                                       |
| -------------------------- | -----: | --------------------------------------------- |
| `--control-height-compact` |  30 px | Pillen-Tabs, Schalter                         |
| `--control-height`         |  38 px | Kopfzeile, Suche, Selects, Unterstrich-Leiste |
| `--control-height-touch`   |  44 px | Große Aktionsflächen                          |
| `--radius-small`           |   6 px | Kleine Kennzeichnungen, Bildausschnitte       |
| `--radius-control`         |  12 px | Buttons, Eingaben, Auswahlsteuerung           |
| `--radius-card`            |  12 px | Quizkarten, Karten-Vorschauen, Drag-Vorschau  |
| `--radius-surface`         |  20 px | Große Arbeitsflächen und Dialoge              |
| `--radius-pill`            | 999 px | Tags                                          |
| `--radius-tab-pill`        |  48 px | Pillen-Tabs                                   |
| `--border-structure`       |   1 px | Flächengrenzen, Trennlinien                   |
| `--border-selection`       |   2 px | Interaktive Auswahl und Drop-Ziele            |
| `--focus-ring`             |   2 px | `solid var(--ring)`, für alle Controls        |
| `--focus-offset`           |   2 px | Außen; Ausnahmen setzen nur den Offset nach innen |

Auswahlrahmen reservieren bereits im inaktiven Zustand 2 px; ein Wechsel ändert
Farbe, nicht Größe. Der Fokusring ist in `app/base.css` einmal für alle
Controls definiert. Komponenten definieren keinen eigenen; wo eine Fläche ihren
Überlauf beschneidet (Artenzeilen, Bildbühne, Zeitstrahl), verschieben sie nur
den Offset nach innen. Reine Links und Navigation brauchen keinen zusätzlichen
Auswahlrahmen. Suche, Navigationslinks, Theme-Schalter und Info-Menü teilen
`--header-control-height`; Icon-Buttons der Kopfzeile nutzen `.header-action`.

## Schatten

| Rolle                  | Verwendung                                                         |
| ---------------------- | ------------------------------------------------------------------ |
| `--shadow-none`        | Normale Karten und große Arbeitsflächen                            |
| `--shadow-subtle`      | Leicht angehobene Controls                                         |
| `--shadow-floating`    | Tooltip, Menü, Drag-Vorschau, schwebende Toolbar, fixe Antwortleiste |
| `--shadow-active-pill` | Aktive Tab-Pille und Geschlechtsschalter                           |

Schattenfarben kommen aus `--shadow-color-*` in `colors.css`. Keine neuen
individuellen Kartenschatten; Ringe für Farbe, Fokus oder Markierung sind keine
dekorative Elevation.

## Tabs

Es gibt genau zwei Tab-Rollen, beide in `app/tabs.css`; Seiten-CSS positioniert
eine Tab-Leiste nur, es gestaltet sie nicht um.

| Rolle                 | Einsatz                                            | Maße                                         |
| --------------------- | -------------------------------------------------- | -------------------------------------------- |
| `.t-tabs` (Pille)     | Gefieder/Alter, Farbmorphen, Bühnenwahl im Wissen  | 30 px Tab, 3 px Schiene, 4/13 px, 14 px/500  |
| `.t-tabs.t-tabs-line` | Atlas-Infotabs, Wissensbereiche, Falknerei-Kapitel | 38 px Leiste, 24 px Abstand, 16 px, 400/500  |

Die gleitende Markierung `.t-tabs-pill` wird von `lib/use-sliding-pill.ts`
gemessen; Listen ohne Pillenelement (reine Button-Gruppen mit `aria-pressed`)
heben den gedrückten Tab selbst hervor. Bei der Linienrolle ist die Pille der
2-px-Unterstrich. Auf schmalen Bildschirmen scrollt die Linienleiste seitlich
statt umzubrechen. Der Geschlechtsschalter neben dem Gewicht ist die
icongroße Miniaturform derselben Pille. Die drei Atlas-Informationstabs bleiben
beim Scrollen mit deckendem Hintergrund sichtbar. Inaktive Tab-Texte verwenden
`--muted-foreground`, ohne eigene Mischungen oder Opazität.

## Bewegung

Die Skala in `app/transitions-root.css` ist die einzige Quelle für Dauern,
Kurven, Distanzen, Skalierungen und Unschärfe.

| Dauer                  |  Wert | Einsatz                                     |
| ---------------------- | ----: | ------------------------------------------- |
| `--duration-stagger`   | 40 ms | Versatz je Element                          |
| `--duration-micro`     | 80 ms | Kurze Verzögerungen                         |
| `--duration-quick`     | 150 ms | Hover-Farbe, Schließen, Textwechsel, Tooltip |
| `--duration-fast`      | 250 ms | Icon-Swap, Öffnen, Tab-Pille                 |
| `--duration-medium`    | 350 ms | Panel und Toast schließen                    |
| `--duration-slow`      | 400 ms | Panel öffnen, Inhalt einblenden              |
| `--duration-very-slow` | 500 ms | Betonte Momente, Zahlen-Pop-in               |

Kurven: `--ease-smooth-out` (öffnen, schließen, gleiten), `--ease-in-out`
(Icon- und Textwechsel), `--ease-out` (Hover-Farbe, Tooltip), `--ease-linear`
(Shimmer, Spinner) und genau eine Überschwingkurve `--ease-bounce`. Die
Snippet-Gruppen (`--digit-*`, `--dropdown-*`, `--icon-swap-*`, `--tabs-*`,
`--stagger-*`, `--acc-*`, `--stack-*`) verweisen auf diese Skala. Tab-Pillen
messen ihre Position dynamisch; `prefers-reduced-motion` schaltet Übergänge ab.

## Breakpoints

| Wert    | Bedeutung                                              |
| ------- | ------------------------------------------------------ |
| 640 px  | Telefon: einspaltig, Messwerte gestapelt               |
| 760 px  | Tablet hochkant: mobile Kopfzeile, Seitenrand 20 px    |
| 980 px  | Atlas wird einspaltig, Seitenspalten schmaler          |
| 1190 px | Breite Layouts werden kompakter                        |
| 1600 px | Sehr breite Bildschirme: Atlas-Spalten wachsen         |

Zwei Regeln für die kleinsten Telefone (390 px) im Quiz sind eine dokumentierte
Ausnahme. Neue Zwischenwerte sind keine Option; wenn ein Layout an anderer
Stelle bricht, das Layout anpassen, nicht die Skala.

## Bewusste Ausnahmen

- Vogelbilder, Ausschnitte, Kartenkoordinaten und die Anatomie-Bühne behalten
  ihre fachlich abgestimmte Geometrie; Sortierbilder 175 px, mobil 150 px.
- Kreise verwenden 50 %. Slider-/Radiopunkte, Anatomiemarker, Farbringe,
  Tooltip-Pfeile und Score-Grafiken behalten konstruktive Ring- und
  Rahmenstärken.
- Kleine negative Abstände, Text-Baselines, Bildnachweise und Positionswerte
  dürfen optisch abgestimmt bleiben. Eine solche Ausnahme ist kein Token.
- Die Quiz-Antwortleiste reserviert per ResizeObserver ihre reale Höhe;
  unteres Seitenpadding überschreibt diese Reserve an keinem Breakpoint.
- Bestehende Bildgrößen, Seitenbreiten und Interaktionsflächen werden nicht
  pauschal auf die Abstandsskala gerundet.
- Das mobile Navigationsmenü bleibt nicht-modal, damit kein Scroll-Lock die
  Kopfzeile verschiebt. Mobile Suchfelder verwenden mindestens 16 px Schrift.

## Kopfzeile und Seiten

Gemeinsamer Seitentitel: „Greifvogelkompass“. Jede Seite trägt `.page-title` an
derselben Stelle. Die Kopfzeile folgt auf Quiz-, Wissens- und Falknereiseiten
dem Seitenrand, im Atlas dem Atlas-Rand. Das Info-Menü zeigt Autorenlinks und
Impressum unter einer nicht fetten Überschrift mit Projektnamen.

## Dropdowns

Alle Dropdowns verwenden `AppSelectTrigger` und `AppSelectContent` aus
`components/app-select.tsx` mit den gemeinsamen `app-select`-Stilen; die
Cluster-Auswahl ist die visuelle Referenz. Menüs zeigen keine Auswahlhäkchen
und reservieren dafür keine Spalte; der gewählte Eintrag bleibt über Farbe und
ARIA erkennbar.

## Quiz

Alle Aufgaben verwenden `QuizFeedback`: Überschrift `--type-feedback-title`
(16 px, 700), Erklärungstext 14 px/400 ohne fette Hervorhebungen. Ein
36-px-Kreis trägt das 24-px-Symbol: `--success` auf `--success-soft` bei
Volltreffern, `--danger` auf `--danger-soft` sonst. Alle Aufgabentypen nutzen
`QuizQuestionTitle` (32 px, 700, `--leading-display`), auch mehrzeilig und
mobil. Aufgabenbereiche haben links, rechts und unten `--panel-padding`; in
zweispaltigen Aufgaben sitzt die Antwortgruppe am unteren Innenrand. Die
Fragenzahl steht rechts vom Quiz-Titel.

## Artenleiste

Die Gruppierung bietet Gattung, Verbreitung, Lebensraum und Größe. Verbreitung
verwendet genau eine Verbreitungsangabe pro Art; Lebensraum bleibt eine
Mehrfachzuordnung. Größe richtet sich nach dem typischen Gewicht (Mittelwert
der Spanne oder Einzelwert), Spannweite sortiert nur innerhalb der Klasse.
Jede Art erscheint genau einmal; leere Gruppen sind unsichtbar.

| Klasse     | Typisches Gewicht  |
| ---------- | ------------------ |
| Sehr klein | <200 g             |
| Klein      | 200 bis <600 g     |
| Mittelgroß | 600 bis <2.000 g   |
| Groß       | 2.000 bis <5.000 g |
| Sehr groß  | ≥5.000 g           |

Habicht, Mäusebussard, Rot- und Schwarzmilan: mittelgroß. Steppenadler: groß.
Fehlendes Gewicht: „Größe nicht bekannt“. „Status in Deutschland“ erscheint nur
mit Vorkommensangaben; der Wert `ausserhalb` wird ausgeblendet.

## Vorgehen bei Änderungen

1. Bestehende Rolle oder Komponente suchen und wiederverwenden.
2. Gleiche Elemente gemeinsam ändern; keine weitere Override-Schicht anhängen.
3. Neue Rolle nur bei wiederkehrendem Bedarf zentral definieren und hier
   ergänzen.
4. Schriftgrößen und Gewichte nicht im Rahmen einer Abstandsbereinigung ändern.
5. `npm run lint` und `npm run build` ausführen; bei Layoutfehlern die
   spezifischeren Selektoren und alle Breakpoints prüfen.
6. Die Musterseite `/styleguide` zeigt jede Rolle; neue Elemente dort
   vergleichen.

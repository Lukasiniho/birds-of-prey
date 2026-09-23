# Design-System

Stand: 10. September 2026. Dieses Dokument ist die aktuelle Spezifikation, keine
Änderungshistorie. Gleiche sichtbare Funktionen bekommen dieselbe Rolle; Rollen
werden zentral definiert und in Seiten-CSS nur verwendet, nicht neu erfunden.
`npm run lint` prüft Farben, Schriftgrößen, Radien und Breakpoints.
Für eigene CSS-Dateien in `app/` und `components/` gilt zusätzlich ein gemeinsames
Limit von 2.000 Zeilen einschließlich Kommentaren und Leerzeilen. Der Lintlauf
prüft diese Grenze; ungenutzte UI-Komponenten bleiben erhalten.

## Dateien und Zuständigkeiten

| Datei                      | Inhalt                                                                   |
| -------------------------- | ------------------------------------------------------------------------ |
| `app/globals.css`          | Nur Imports und die Tailwind-`@theme`-Zuordnung                          |
| `app/typography.css`       | Schriftskala, Textrollen, Schriftstapel, Gewichte, Laufweiten, Artnamen  |
| `app/colors.css`           | Alle Farbrollen hell/dunkel, Tönungsstufen, Status, Karte, Schatten      |
| `app/design-system.css`    | Abstände, Layoutrollen, Steuerhöhen, Radien, Rahmen, Fokus, Schatten     |
| `app/transitions-root.css` | Bewegungsskala und die Token-Gruppen der genutzten Snippets              |
| `app/tabs.css`             | Die zwei Tab-Rollen                                                      |
| `app/tooltips.css`         | Schwebende Karte (Tooltip und Popover), Pfeil                            |
| `app/base.css`             | Body, Links, Buttons, Überschriften, Fokusring, App-Shell                |
| `app/header.css`           | Kopfzeile: Marke, Suche, Navigation, Aktionen, mobile Anordnung          |
| `app/search.css`           | Gemeinsames Suchfeld: Fläche, Text, Platzhalter und Fokus                 |
| `app/atlas.css`            | Artenleiste, Bühne, Infobereich, Messwerte, Audio                        |
| `app/motion.css`           | transitions.dev-Snippets: Akkordeon, Textreveal, Zahlen, Icon-Swap, Menü |
| `app/tags.css`             | Art-Tags und Verbreitungsstatus                                          |
| `app/map.css`              | Verbreitungskarte                                                        |
| `app/sections.css`         | Seitenrahmen und Titel für Quiz, Wissen und Falknerei                    |
| Seiten-CSS                 | Anordnung, Umbrüche und fachliche Darstellung einer Seite                |

Die Bibliotheksdateien in `components/ui` werden nicht umgestaltet; nur die
Icon-Imports dürfen angepasst werden. Ungenutzte Primitive bleiben im Repo;
`@source not` in `app/globals.css` nimmt ihre Utilities aus dem Tailwind-Scan.
Wird eine solche Komponente eingebunden, muss ihre Ausnahme dort entfallen.

Einfache Layouts verwenden Tailwind direkt an der Komponente. Die Utilities
`gap-2`, `p-4`, `p-panel` und `gap-section` verweisen über `globals.css` auf die
bestehenden Abstandsrollen. Farben bleiben Rollen (`bg-stage`,
`text-muted-foreground`). Eigenes CSS bleibt für gemeinsame Gestaltung,
Zustände und aufwendigere Geometrie. Die Quizkarten teilen `.q-card` für
Auswahlrahmen, Bewertung und Fokus.

Die responsiven Varianten `to-desktop`, `to-compact`, `to-tablet` und `to-phone`
gelten bis einschließlich 1190, 980, 760 und 640 px. `to-small` ist nur für die
bestehende Quiz-Ausnahme bei 390 px vorgesehen. Ihre Reihenfolge folgt von
breit nach schmal, damit die kleinere Ansicht bei Überschneidung gewinnt.
`from-tablet` (ab 761 px), `from-compact` (ab 981 px) und `from-wide`
(ab 1600 px) bilden die bestehenden größeren Ansichten ab.
`stage-compact` und `stage-small` bilden die bisherigen Container-Grenzen der
Atlas-Bühne bei einschließlich 635 und 570 px ab. Sie folgen den Viewport-Regeln,
damit die Messleiste weiterhin anhand ihres tatsächlich verfügbaren Platzes reagiert.

Die Bild-/Kartenpanels in Wissen und Falknerei teilen `explorerStyles` aus
`components/explorer-styles.ts`. Nur die Breite der Falknerei-Spalte weicht über die beiden
`--explorer-aside*`-Variablen ab. Überschriften und Erklärungstexte verwenden
`DetailHeading` und `DetailCopy` aus `components/detail-text.tsx`; Schriftrollen
bleiben damit an einer Stelle. Elementvorgaben für Überschriften und Absatzränder
liegen in der Basis-Ebene, damit explizite Text- und Abstands-Utilities greifen.

`PreyArt` kapselt Zuschnitt und Größenvarianten: `atlas` (88 px), `tile` (72 px),
`choice` (füllt die Quizfläche), `placed` (28 px) und `drag` (80 px). Aufrufstellen
wählen eine Variante, statt Bild und Ersatzsymbol über Elternselektoren separat
zu überschreiben.

Sortier- und Lebensraumaufgaben verwenden `QuizTaskHeading` für ihre Einleitung;
Nahrungs- und Flügelvergleichsaufgaben teilen `QuizChoiceHeading`.
`QuizCardFooter` hält Sortiersteuerung und aufgedecktes Gewicht gleich hoch.
Die Auswertung gestaltet ihr Raster und ihre Textrollen direkt an der Komponente.
Porträtpositionen auf der Quiz-Startseite gehören zu den jeweiligen Bilddaten.

`AtlasSection` teilt die Abschnittsabstände und Trennlinien im Infobereich.
`QuizActionButton` teilt die Maße der Quizaktionen.
`QuizSplit`, `QuizSpecimen` und `QuizBirdSpace` teilen die Bildaufteilung der
Erkennungsaufgaben. `QuizPrompt` hält Aufgabenlabel, Titel und Anleitung zusammen;
Schätzaufgaben reservieren auf Desktop zwei Textzeilen. `QuizAnswerBar` besitzt
das Raster der Antwortleiste, während die mobile Höhenanimation in Quiz-CSS bleibt.
`SearchField` teilt Suche und Löschaktion zwischen Kopfzeile, mobiler
Artenauswahl und Glossar. Die Kopfzeilensuche ist die visuelle Referenz:
überall 38 px Höhe, derselbe Radius, Text, Duotone-Suchsymbol und Löschknopf.
Bis 760 px verwenden alle Suchfelder die 16-px-Buttonrolle gegen iOS-Fokuszoom.
Aufrufstellen setzen nur Suchwert, Beschriftung, Platzhalter und äußeres Layout;
nach dem Leeren bleibt der Fokus im Feld. `npm run lint` verhindert eigene
Suchfelder außerhalb dieser Komponente; `/styleguide` zeigt sie interaktiv.
`KnowledgeBirdGroup` bildet die gemeinsamen Artenlisten in Nahrung und Jagdweisen.
`SpeciesName` hält die Textrollen seiner Varianten direkt an den Namenselementen.
Die Variante `compact` zeigt Arten ohne Atlas-Porträt in Grau mit `--type-body`
für den deutschen Namen und `--type-caption` für den wissenschaftlichen Namen.
`MeasurementStrip` regelt das Raster und die optionale Ruf-Spalte; die Zellen
wählen ihre kompakte Darstellung über `withAudio`. `EcologyTag` teilt die
Geometrie von Statuslabels, Wissenslinks und Regionsauswahl.

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

| Rolle                         | Einsatz                                                                    |
| ----------------------------- | -------------------------------------------------------------------------- |
| `--background`                | Seite, Kopfzeile, Tab-Pille                                                |
| `--surface`                   | Erhabene Fläche: Karten, Menüs, Dropdown-Trigger                           |
| `--stage`                     | Vertiefte Fläche: Bild- und Quizbühnen, Kartenwasser                       |
| `--stage-glow`                | Weicher Lichtkegel hinter der Atlas-Illustration                           |
| `--muted`                     | Ruhige Nebenfläche                                                         |
| `--hover`                     | Zeilen- und Listen-Hover                                                   |
| `--foreground`                | Text, Anatomiemarker                                                       |
| `--muted-foreground`          | Nebentext und Platzhalter auf `--background`/`--surface`                   |
| `--muted-foreground-stage`    | Nebentext auf Vertieftem: Bühne und Tab-Schiene                            |
| `--muted-foreground-faint`    | Nur Nicht-Text: inaktive Schrittpunkte                                     |
| `--border`                    | Hairlines und Flächengrenzen                                               |
| `--main-color`                | Akzent; `--primary`, `--ring`, `--selection-border` sind Aliase            |
| `--primary-foreground`        | Text und Icons auf gefüllten Akzentflächen                                 |
| `--primary-hover`             | Hover gefüllter Akzentbuttons                                              |
| `--selected`                  | Gewählte Zeilen und Kacheln                                                |
| `--nav-current`               | Aktuelle Seite in der Kopfnavigation; dunkel dieselbe Fläche wie der Hover |
| `--selected-strong`           | Kräftige Auswahl; im Dunkelmodus eine Stufe kräftiger                      |
| `--tag-surface`               | Tags; hell auf die Bühne getönt, damit sie überall tragen                  |
| `--tag-surface-hover`         | Tag-Hover                                                                  |
| `--accent-ring`               | Leuchtringe um Marker und Pins                                             |
| `--accent-line`               | Akzentrahmen (verwandte Kacheln, aktiver Marker)                           |
| `--line-soft`                 | Tab-Schiene                                                                |
| `--line-tint`                 | Feine Rahmen auf Flächen, Farbfeld-Ränder                                  |
| `--success`, `--success-soft` | Richtige Antworten                                                         |
| `--danger`, `--danger-soft`   | Falsche Antworten                                                          |
| `--scrim*`, `--on-image*`     | Verläufe und Text auf Fotos, in beiden Themes gleich                       |
| `--map-*`                     | Wasser, Land, Umriss und Verbreitung der Karte                             |
| `--shadow-color-*`            | Nur von den Schattenrollen verwendet                                       |

Tönungen entstehen ausschließlich mit `color-mix` und den Stufen `--tint-1`
bis `--tint-6` (6, 10, 16, 24, 34, 45 %). Im Dunkelmodus wird `--selected`
eine Stufe kräftiger, weil dunkle Flächen die 10-%-Tönung schlucken;
Aufrufstellen brauchen dafür keine eigenen Regeln. Alle Duotone-Icons tragen
`--main-color`; nur Icons auf gefüllten Buttons behalten ihre Kontrastfarbe.
Quiz-Vogelbühnen sind immer `--stage`. Dropdown-Trigger und Menüs sind hell
`--surface`, dunkel `--background` (`--select-background`).

Glossarlinks verwenden `--glossary-link` und beim Hover/Fokus\n`--glossary-link-hover`: gesättigtes Teal, für Hell und Dunkel getrennt\nabgestimmt. Gewicht 600 (`--weight-semibold`) unterscheidet sie zusätzlich\nvom Fließtext; keine Unterstreichung, unveränderte Schriftgröße und der\ngemeinsame Tastatur-Fokusring. Die allgemeinen Akzentfarben bleiben unverändert.\n\n## Typografie

Details in `docs/typography.md`. Kurzfassung: Inter für Fließtext und
Bedienelemente, Source Serif 4 für redaktionelle Titel.

- Schriftstapel nur über `--font-stack-body` und `--font-stack-display`.
- Gewichte nur über `--weight-regular/medium/semibold/bold` (400/500/600/700).
- Laufweite nur über `--tracking-tight` (Display-Größen), `--tracking-normal`
  und `--tracking-caps` (Versal-Labels).
- Fließtext 14 px, Tags 14 px, Quellen 12 px, Buttons und Unterstrich-Tabs
  16 px, Pillen 14 px.
- Schwebende Blasen sind ein einziger Körper: Hover-Hinweis, Detailkarte und
  Klick-Popover teilen Flex-Spalte, `--space-4` Gap, `--space-16` Polster,
  14 px Text (auch Skalen, Legenden und Quellenzeilen) und dasselbe Öffnen.
  Einziger Unterschied: ein Hinweis liegt auf seiner Textbreite, eine
  Detailkarte ist 20 rem breit. Eine Überschrift darin hat die Größe ihres
  Textes und hebt sich allein durch 700 ab (`.app-tooltip-title`) und öffnet
  einen Block: `--space-8` Luft über sich, darunter nur den Spalten-Gap.
  Sonstige Abstände kommen aus dem Gap, nie aus Margins im Inhalt.
- Deutsche Artnamen: Seitenleiste und Falknerei 18 px/700; Quiz und Wissen
  24 px/700 (Varianten `quiz`, `knowledge`); wissenschaftliche Namen 16 px/600
  kursiv, im Quiz 18 px direkt am deutschen Namen. Die Atlas-Titelvariante
  bleibt 32–48 px/700 mit halb so großem wissenschaftlichen Namen (min. 16 px,
  400). Rechte Detailüberschriften 24 px/700, unabhängig von der Seitenleiste;
  Artnamen an dieser Stelle verwenden `variant="detail"`.
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

| Rolle                      |   Wert | Einsatz                                           |
| -------------------------- | -----: | ------------------------------------------------- |
| `--control-height-compact` |  30 px | Pillen-Tabs, Schalter                             |
| `--control-height`         |  38 px | Kopfzeile, Suche, Selects, Unterstrich-Leiste     |
| `--control-height-touch`   |  44 px | Große Aktionsflächen                              |
| `--pill-height-large`      |  38 px | Große Filterpillen; Alias auf `--control-height` |
| `--radius-small`           |   6 px | Kleine Kennzeichnungen, Bildausschnitte           |
| `--radius-control`         |  12 px | Buttons, Eingaben, Auswahlsteuerung               |
| `--radius-card`            |  12 px | Quizkarten, Karten-Vorschauen, Drag-Vorschau      |
| `--radius-surface`         |  20 px | Große Arbeitsflächen und Dialoge                  |
| `--radius-pill`            | 999 px | Tags                                              |
| `--radius-tab-pill`        |  48 px | Pillen-Tabs                                       |
| `--border-structure`       |   1 px | Flächengrenzen, Trennlinien                       |
| `--border-selection`       |   2 px | Interaktive Auswahl und Drop-Ziele                |
| `--focus-ring`             |   2 px | `solid var(--ring)`, für alle Controls            |
| `--focus-offset`           |   2 px | Außen; Ausnahmen setzen nur den Offset nach innen |

`EcologyTag` bietet mit `size="large"` große Filterpillen: mindestens
`--pill-height-large` hoch und mit `--space-16` horizontalem Innenabstand.
Die Glossarfilter verwenden diese Variante und teilen an allen Breakpoints
die Höhe von 38 px mit dem benachbarten Suchfeld. Der Text verwendet `--type-tag-large` (14 px,
Alias auf `--text-sm`), die Stufe zwischen kompakten Tags und Suchfeldtext.
Farben und Pillenradius bleiben gemeinsame Tag-Rollen; die Standardvariante
behält ihre kompakten Maße. Bis 760 px nutzt die große Variante das kompakte
horizontale Padding und `--type-tag` (12 px), behält aber die gemeinsame Suchhöhe.

Auswahlrahmen reservieren bereits im inaktiven Zustand 2 px; ein Wechsel ändert
Farbe, nicht Größe. Der Fokusring ist in `app/base.css` einmal für alle
Controls definiert. Komponenten definieren keinen eigenen; wo eine Fläche ihren
Überlauf beschneidet (Artenzeilen, Bildbühne, Zeitstrahl), verschieben sie nur
den Offset nach innen. Reine Links und Navigation brauchen keinen zusätzlichen
Auswahlrahmen. Suche, Navigationslinks, Theme-Schalter und Info-Menü teilen
`--header-control-height`; Icon-Buttons der Kopfzeile nutzen `.header-action`.

## Schatten

| Rolle                  | Verwendung                                                           |
| ---------------------- | -------------------------------------------------------------------- |
| `--shadow-none`        | Normale Karten und große Arbeitsflächen                              |
| `--shadow-subtle`      | Leicht angehobene Controls                                           |
| `--shadow-floating`    | Tooltip, Menü, Drag-Vorschau, schwebende Toolbar, fixe Antwortleiste |
| `--shadow-active-pill` | Aktive Tab-Pille und Geschlechtsschalter                             |

Schattenfarben kommen aus `--shadow-color-*` in `colors.css`. Keine neuen
individuellen Kartenschatten; Ringe für Farbe, Fokus oder Markierung sind keine
dekorative Elevation.

## Tabs

Es gibt genau zwei Tab-Rollen: `components/tab-styles.ts` teilt ihre Layoutklassen,
`app/tabs.css` hält Farben, Typografie, Zustände und Bewegung. Die Höhe der
Linienleiste bleibt dort, damit die Orientierungsregeln der Bibliothek sie nicht
überschreiben. Seiten-CSS positioniert eine Tab-Leiste nur, es gestaltet sie nicht um.

| Rolle                 | Einsatz                                            | Maße                                        |
| --------------------- | -------------------------------------------------- | ------------------------------------------- |
| `.t-tabs` (Pille)     | Gefieder/Alter, Farbmorphen, Bühnenwahl im Wissen  | 30 px Tab, 3 px Schiene, 4/13 px, 14 px/500 |
| `.t-tabs.t-tabs-line` | Atlas-Infotabs, Wissensbereiche, Falknerei-Kapitel | 38 px Leiste, 24 px Abstand, 16 px, 400/500 |

`SegmentedControl` legt die Pillenschiene in `.t-tabs-scroll`. Nur diese
rechteckige Hülle scrollt bei Platzmangel; 4 px Polster mit ausgleichendem
negativem Außenabstand halten den gemeinsamen äußeren Fokusring vollständig
sichtbar. Die gerundete `.t-tabs`-Schiene selbst darf ihn nicht beschneiden.
Alter und Morphen verwenden dieselbe Komponente und Scroll-Regel.

Die gleitende Markierung `.t-tabs-pill` wird von `lib/use-sliding-pill.ts`
gemessen; Listen ohne Pillenelement (reine Button-Gruppen mit `aria-pressed`)
heben den gedrückten Tab selbst hervor. Alle Tab-Rollen verwenden `data-active`
für die Darstellung: Base UI setzt es automatisch, native Schalter ergänzen es
parallel zu ihrem jeweiligen ARIA-Zustand. Bei der Linienrolle ist die Pille der
2-px-Unterstrich. Auf schmalen Bildschirmen scrollt die Linienleiste seitlich
statt umzubrechen. Der Geschlechtsschalter neben dem Gewicht ist die
icongroße Miniaturform derselben Pille. Die drei Atlas-Informationstabs bleiben
beim Scrollen mit deckendem Hintergrund sichtbar. Inaktive Tab-Texte verwenden
`--muted-foreground`, ohne eigene Mischungen oder Opazität.

## Bewegung

Die Skala in `app/transitions-root.css` ist die einzige Quelle für Dauern,
Kurven, Distanzen, Skalierungen und Unschärfe.

| Dauer                  |   Wert | Einsatz                                      |
| ---------------------- | -----: | -------------------------------------------- |
| `--duration-stagger`   |  40 ms | Versatz je Element                           |
| `--duration-micro`     |  80 ms | Kurze Verzögerungen                          |
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

| Wert    | Bedeutung                                           |
| ------- | --------------------------------------------------- |
| 640 px  | Telefon: einspaltig, Messwerte gestapelt            |
| 760 px  | Tablet hochkant: mobile Kopfzeile, Seitenrand 20 px |
| 980 px  | Atlas wird einspaltig, Seitenspalten schmaler       |
| 1190 px | Breite Layouts werden kompakter                     |
| 1600 px | Sehr breite Bildschirme: Atlas-Spalten wachsen      |

Zwei Regeln für die kleinsten Telefone (390 px) im Quiz sind eine dokumentierte
Ausnahme. Neue Zwischenwerte sind keine Option; wenn ein Layout an anderer
Stelle bricht, das Layout anpassen, nicht die Skala.

## Bewusste Ausnahmen

- Vogelbilder, Ausschnitte, Kartenkoordinaten und die Anatomie-Bühne behalten
  ihre fachlich abgestimmte Geometrie; Sortierbilder nutzen eine quadratische
  Bildfläche bis 280 px Höhe, mobil 128 px (bis 390 px: 108 px).
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

Die Startkarte hat oben denselben Seitenabstand wie links und rechts:
`--page-gutter` (40 px auf Desktop, 20 px bis 760 px).
Der Starttitel nutzt 700 mit der zentralen optischen Display-Betonung
`--display-emphasis-stroke`. Das dekorative Fragezeichen ist ein freies
Phosphor-Regular-Symbol ohne Kreis, Schatten oder Duotone-Hinterlegung.
Die acht Porträts sind asymmetrisch verteilt; die zwei Hintergrundringe bleiben
exakte, konzentrische Kreise im Mittelpunkt der quadratischen Bildfläche.
Eine feine Trennlinie mit je 24 px Abstand trennt Beschreibung und Startbereich.
„Quiz starten“ ist als hervorgehobener Einstieg 64 px hoch
(`--control-height-touch` plus `--space-20`), mit `--type-lead`, Gewicht 600
und 24-px-Pfeil. Er füllt den Platz neben der Fragenzahl; bei Platzmangel
steht er darunter über die volle Breite.

Alle Aufgaben verwenden `QuizFeedback`: Überschrift `--type-feedback-title`
(16 px, 700), Erklärungstext 14 px/400 ohne fette Hervorhebungen. Ein
36-px-Kreis trägt das 24-px-Symbol: `--success` auf `--success-soft` bei
Volltreffern, `--danger` auf `--danger-soft` sonst. Alle Aufgabentypen nutzen
`QuizQuestionTitle` (32 px, 700, `--leading-display`), auch mehrzeilig und
mobil. Aufgabenbereiche haben links, rechts und unten `--panel-padding`; in
zweispaltigen Aufgaben sitzt die Antwortgruppe am unteren Innenrand. Die
Fragenzahl wird auf der Startseite vor dem Start gewählt. Während der Runde
sind Kopfzeile und Seitentitel ausgeblendet. Der Quizbereich nutzt die volle
Seitenbreite mit 32 px Außenabstand links und rechts (`--section-gap`).
Die 24 px hohe Fortschrittszeile sitzt mittig über der Fragebox, mit exakt
8 px Abstand nach oben zum Seitenrand und nach unten zur Box. Mobil ist die
Zeile 30 px hoch: links sitzt Abbrechen als Zurück-Pfeil, der Fortschritt
bleibt mittig. Unten nutzt der rahmenlose Antwortbutton mobil die volle Breite.
Auf Desktop bleibt die Antwortleiste 80 px hoch, zuzüglich Safe Area.
Zurück- und Antwortbutton sind dort gleich hoch (48 px). „Zurück“ ist nur
so breit wie Linkspfeil, Text und Innenabstand; der Antwortbutton bleibt 224 px
breit. „Zurück“ verwendet die neutrale Rahmenvariante. Die Antwortleiste
nutzt 16 px Seitenabstand (`--space-16`), damit beide Buttons nahe an den
äußeren Bildschirmkanten stehen.
Lebensraumangaben unter den Artnamen verwenden die Fließtextrolle
(`--type-body`) mit nur 2 px Abstand zum Namen (`--space-2`).
Die Rückmeldung blendet sich mit transitions.dev-Panel-reveal ein: 400 ms,
12 px von unten und 2 px auslaufende Unschärfe (`--panel-*`). Sie startet bei
jeder eingeblendeten Antwort neu; reduzierte Bewegung schaltet den Übergang ab.
Mobil ist sie vor der Antwort nur so hoch wie ihre Buttons samt Innenabstand;
es wird kein Rückmeldungsplatz reserviert. Beim Prüfen wächst sie mit dem
transitions.dev-Card-resize um 64 px nach oben (250 ms, `--ease-smooth-out`),
beim Weitergehen schrumpft sie. Die Rückmeldung sitzt vertikal mittig zwischen
der oberen Leistenkante und der Oberkante des Buttons. Dieser gesamte Bereich
bildet eine Grid-Zeile ohne zusätzliches Padding oder Gap. Der Button bleibt am unteren Rand. Die
`--resize-*`-Tokens liegen zentral; reduzierte Bewegung deaktiviert den Übergang. Unter dem Statustitel steht
genau eine kompakte Ergebniszeile (maximal 80 Zeichen, keine Merkmalsabsätze).
Bei Platzmangel kürzt die Anzeige mit Ellipse, ohne Zeilenumbruch oder Scrollen;
der vollständige Kurztext bleibt im DOM und als Titel erhalten.
`npm run test:quiz-feedback` prüft die Texte aller Aufgabentypen. „Punkte“
steht ohne zusätzlichen Abstand unter der Zahl und übernimmt deren grüne Farbe.
Der Desktop-Button bleibt vertikal zentriert.

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
   Regeln für denselben Selektor und Gültigkeitsbereich zusammenführen;
   bei überlappenden Media Queries die Reihenfolge der Ausnahmen erhalten.
3. Neue Rolle nur bei wiederkehrendem Bedarf zentral definieren und hier
   ergänzen.
4. Schriftgrößen und Gewichte nicht im Rahmen einer Abstandsbereinigung ändern.
5. `npm run lint` und `npm run build` ausführen; bei Layoutfehlern die
   spezifischeren Selektoren und alle Breakpoints prüfen.
6. Die Musterseite `/styleguide` zeigt jede Rolle; neue Elemente dort
   vergleichen.

# Projektregeln

- Mobile Suchfelder verwenden mindestens 16 px Schriftgröße gegen Fokus-Zoom.
  Browser-Zoom niemals über die Viewport-Einstellungen deaktivieren.

- Inaktive Tab-Texte verwenden durchgängig `--muted-foreground`; keine
  individuellen Farbmischungen oder Opacity-Abschwächungen je Tab-Variante.

- Pill-Switches (`.t-tabs` im Atlas-Gefieder wie `.stage-tabs` im Wissen)
  verwenden einheitlich `--type-body` (14 px); keine größere Tab-Schrift
  auf einzelnen Seiten.
- Maße in den Artdaten sind Zahlenpaare `[min, max]`: Spannweite in cm (auf 5
  gerundet), Gewicht immer in Gramm — nie in Kilogramm speichern. Geschlechts-
  spezifische Werte stehen unter `sexes.male`/`sexes.female`; die Anzeige wählt
  pro Art Gramm (unter 1 kg) oder Kilogramm mit einer Nachkommastelle.
- Tooltips verwenden durchgängig `--type-tooltip` (14 px), auch für Skalen,
  Legenden und Hinweise im Inneren; keine Caption-Größe in Tooltips.
- Quiz-Vogelbühnen (linke Fläche jeder Aufgabe) sind immer hellgrau
  (`--q-stage`); keine teal oder anders getönten Varianten je Aufgabentyp.
- Alle Duotone-Icons tragen die Teal-Hauptfarbe (`--main-color`), wie im Quiz;
  nur Icons auf gefüllten Buttons behalten ihre Kontrastfarbe.

## Einheitliche Vogelbilder

- Die aktuell eingebundene normale adulte Morphe derselben Art ist immer die gemeinsame Ausgangsbasis für alle anderen Morphen und Jungvogelbilder. Die aktuelle Vorlage anhand der Bildzuordnung im Projekt ermitteln.
- Alle Varianten direkt aus dieser normalen adulten Morphe ableiten, auch wenn ein vorhandenes Morphen- oder Jungvogelbild ersetzt wird. Weder eine andere Morphe noch ein altes Jungvogelbild als Bearbeitungsgrundlage verwenden.
- Pose, Flugrichtung, Perspektive, Silhouette, Flügelstellung, Schwanzhaltung, Bildausschnitt, Bildgröße, Position auf der Bildfläche und Darstellungsstil der normalen adulten Morphe beibehalten. Nur morphen- bzw. altersbedingte Merkmale wie Gefiederfarbe und Zeichnung anpassen, damit das Bild beim Wechsel der Variante nicht springt.
- Den transparenten Hintergrund erhalten und den Vogel vollständig im Bild zeigen.
- Diese Vorgabe gilt dauerhaft für alle Arten, sofern der Nutzer für eine konkrete Bearbeitung nicht ausdrücklich etwas anderes verlangt.

## Design-System

- Vor UI-Änderungen `docs/design-system.md` und `docs/typography.md` lesen.
- Gemeinsame Rollen aus `app/design-system.css` und vorhandene Komponenten verwenden.
- Gleiche sichtbare Funktionen erhalten gleiche Rollen; neue lokale Größen oder
  weitere Override-Schichten vermeiden. Optische Geometrie-Ausnahmen dokumentieren.
- Die große Atlas-Titelgröße sowie Schriftgewichte 700/400 im Titel und 700/600
  in der linken Artenliste erhalten. Abstandsbereinigung ändert keine Typografie.
- Rechte Detailüberschriften verwenden `--type-detail-heading`; spezifischere
  Selektoren und mobile Regeln dürfen nicht wieder größere Werte erzwingen.

- Deutsche Artnamen in Quiz und Wissen verwenden ihre expliziten Varianten
  `quiz` bzw. `knowledge`: 24 px/700. Seitenleiste und Falknerei bleiben 18 px/700.
  Wissenschaftliche Namen bleiben 16 px/600; die Atlas-Titelvariante bleibt groß.
- Rechte Detailüberschriften verwenden 24 px/700, ausdrücklich unabhängig
  von der Seitenleiste. Atlas-Außenabstände und Titelleiste verwenden 12 px.
- Die drei Informationstabs bleiben beim Scrollen sichtbar. Deutschlandstatus
  nur bei tatsächlichem Vorkommen anzeigen, niemals den Platzhalter „ausserhalb“.

- Dropdowns verwenden einheitlich `AppSelectTrigger` und `AppSelectContent` aus
  `components/app-select.tsx` sowie die gemeinsamen `app-select`-Stile. Keine
  abweichenden Stile pro Seite; Cluster-Auswahl ist die visuelle Referenz.
- Wissenschaftliche Quiz-Namen: 18 px, direkt am deutschen Namen (24 px).
- Suche, Navigationslinks und Theme-Schalter teilen `--header-control-height`.

- Größenklassen werden nach typischem Gewicht bestimmt, nicht nach Flügelspannweite
  oder Quantilen der vorhandenen Arten. Spannweite sortiert nur innerhalb der Klasse.
  Habicht, Mäusebussard, Rot- und Schwarzmilan sind mittelgroß.

- Dropdown-Trigger und Menüs im Hellmodus weiß (`--select-background`), im
  Dunkelmodus an die Oberfläche angepasst. Fragenzahl rechts vom Quiz-Titel.

- Spannweite und Gewicht teilen die Messwertbox in exakt gleich breite Bereiche
  mit identischem Innenabstand; die Audio-Spalte ist separat. Auch mobil.

- Gemeinsamer Seitentitel: „Greifvogelkompass“. Das mobile Navigationsmenü
  bleibt nicht-modal, damit Scroll-Lock die Kopfzeile nicht verschiebt.

## Icons

- Alle Icons kommen aus `components/icons.tsx`: ausschließlich Phosphor.
- Bedienelemente (Pfeile, Chevrons, Drag-Griffe, Plus/Minus, Schließen, Menü,
  Vergrößern, Laden und Häkchen) verwenden `regular`.
- Suche, Hell-Dunkel-Schalter, Play/Pause und Quiz-Standort verwenden ausdrücklich
  `duotone`. Inhaltliche Fakten- und Quizmotive behalten ihre Duotone-Akzente.
- Select-, Combobox- und Dropdown-Menüs zeigen keine Auswahlhäkchen und reservieren
  dafür keine Spalte. Der gewählte Eintrag bleibt über Farbe und ARIA erkennbar.
- Neue Icons dort aus dem offiziellen `@phosphor-icons/react`-Paket ergänzen;
  keine zweite Icon-Bibliothek oder kopierte SVG-Icon-Pfade einführen.
- Dies gilt ausdrücklich auch für `components/ui`: Die Icon-Imports dürfen
  angepasst werden; Verhalten, Layout und Typografie der Primitiven bleiben erhalten.
- Größen und semantische Farben über vorhandene Rollen bewahren. Keine
  Stroke-/Fill-Overrides für die gefüllten Phosphor-Pfade verwenden.

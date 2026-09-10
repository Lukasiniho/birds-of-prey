# Projektregeln

## Design-System

- Vor jeder UI-Änderung `docs/design-system.md` lesen. Dort stehen alle Rollen
  (Farben, Typografie, Abstände, Steuerhöhen, Radien, Schatten, Fokus, Tabs,
  Bewegung, Breakpoints) und die Checkliste für neue Seiten. `docs/typography.md`
  vertieft die Textrollen.
- Rollen verwenden, nicht neu erfinden: keine eigenen Farben, Größen, Radien,
  Breakpoints oder Tab-Gestaltungen pro Seite. Eine neue Rolle wird zentral
  definiert und dort dokumentiert.
- `npm run lint` prüft Farben, Schriftgrößen, Radien und Breakpoints und nennt
  die Fundstelle. Eine begründete Ausnahme trägt einen `design-lint-allow`-
  Kommentar.
- Die Musterseite `/styleguide` zeigt jede Rolle; neue Elemente dort vergleichen.
- Browser-Zoom niemals über die Viewport-Einstellungen deaktivieren.

## Artdaten

- Maße in den Artdaten sind Zahlenpaare `[min, max]`: Spannweite in cm (auf 5
  gerundet), Gewicht immer in Gramm — nie in Kilogramm speichern. Keine
  Scheingenauigkeit: Gramm unter 1 kg auf 10 g, darüber auf 100 g runden; erreicht
  eine Art 1 kg, werden alle ihre Werte unter 1 kg auf 50 g gerundet (700–1.300 g,
  nie 690–1.300 g). Geschlechtsspezifische Werte gibt es nur für das Gewicht,
  unter `sexes.male`/`sexes.female`; die Spannweite ist immer eine gemeinsame
  Artspanne, der ♀/♂-Schalter neben dem Gewicht ändert nur das Gewicht. Die
  Anzeige zeigt Gewicht immer in Gramm, nie in Kilogramm.

## Einheitliche Vogelbilder

- Die aktuell eingebundene normale adulte Morphe derselben Art ist immer die gemeinsame Ausgangsbasis für alle anderen Morphen und Jungvogelbilder. Die aktuelle Vorlage anhand der Bildzuordnung im Projekt ermitteln.
- Alle Varianten direkt aus dieser normalen adulten Morphe ableiten, auch wenn ein vorhandenes Morphen- oder Jungvogelbild ersetzt wird. Weder eine andere Morphe noch ein altes Jungvogelbild als Bearbeitungsgrundlage verwenden.
- Pose, Flugrichtung, Perspektive, Silhouette, Flügelstellung, Schwanzhaltung, Bildausschnitt, Bildgröße, Position auf der Bildfläche und Darstellungsstil der normalen adulten Morphe beibehalten. Nur morphen- bzw. altersbedingte Merkmale wie Gefiederfarbe und Zeichnung anpassen, damit das Bild beim Wechsel der Variante nicht springt.
- Den transparenten Hintergrund erhalten und den Vogel vollständig im Bild zeigen.
- Diese Vorgabe gilt dauerhaft für alle Arten, sofern der Nutzer für eine konkrete Bearbeitung nicht ausdrücklich etwas anderes verlangt.

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

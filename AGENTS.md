# Projektregeln

- Mobile Suchfelder verwenden mindestens 16 px Schriftgröße gegen Fokus-Zoom.
  Browser-Zoom niemals über die Viewport-Einstellungen deaktivieren.

- Inaktive Tab-Texte verwenden durchgängig `--muted-foreground`; keine
  individuellen Farbmischungen oder Opacity-Abschwächungen je Tab-Variante.

## Einheitliche Vogelbilder

- Jungtierbilder immer aus dem aktuell eingebundenen adulten Bild derselben Art ableiten. Die aktuelle Vorlage anhand der Bildzuordnung im Projekt ermitteln.
- Das adulte Bild ist die Referenz und Bearbeitungsgrundlage, auch wenn ein vorhandenes Jungtierbild ersetzt werden soll. Nicht das alte Jungtierbild als Vorlage verwenden.
- Pose, Flugrichtung, Perspektive, Silhouette, Flügelstellung, Schwanzhaltung, Bildausschnitt und Darstellungsstil des adulten Bildes beibehalten. Nur altersbedingte Merkmale wie Gefiederfarbe und Zeichnung anpassen.
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

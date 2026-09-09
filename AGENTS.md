# Projektregeln

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

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

## Quiz-Rückmeldungen

- Unter „Volltreffer!“, „Fast richtig.“ oder „Noch nicht ganz.“ steht in der
  unteren Antwortleiste höchstens eine Zeile Lösungstext. Nur das knappe
  Ergebnis nennen; keine langen Gefieder-, Morphen- oder Merkmalsbeschreibungen.
- Rückmeldungen zentral über `lib/quiz-feedback.ts` formulieren: höchstens
  80 Zeichen, keine Zeilenumbrüche. Die gemeinsame `QuizFeedback`-Komponente
  verhindert Umbruch auch auf schmalen Bildschirmen und kürzt nötigenfalls
  mit Ellipse; der vollständige Kurztext bleibt im DOM und als Titel erhalten.
- Bei neuen oder geänderten Aufgabentypen `npm run test:quiz-feedback`
  ausführen. Auf Desktop bleiben Leistenhöhe und Buttonposition unverändert.
  Mobil wird kein Platz für Rückmeldungen reserviert: Die unten verankerte
  Leiste wächst beim Prüfen mit dem transitions.dev-Card-resize nach oben und
  schrumpft beim Weitergehen; der Button bleibt am unteren Rand.
  `prefers-reduced-motion` deaktiviert die Bewegung.
- „Punkte“ steht ohne zusätzlichen Abstand direkt unter der Zahl und übernimmt
  deren grüne Farbe.

## Artdaten

- Maße in den Artdaten sind Zahlenpaare `[min, max]`: Spannweite und
  Körperlänge in cm, beide immer auf dem 5-cm-Raster (`npm run lint` prüft das,
  `node scripts/check-measurements.mjs --fix` rundet Abweichungen auf das
  nächste 5er-Increment), Gewicht immer in Gramm — nie in Kilogramm speichern. Keine
  Scheingenauigkeit: Gramm unter 1 kg auf 10 g, darüber auf 100 g runden; erreicht
  eine Art 1 kg, werden alle ihre Werte unter 1 kg auf 50 g gerundet (700–1.300 g,
  nie 690–1.300 g). Geschlechtsspezifische Werte gibt es nur für das Gewicht,
  unter `sexes.male`/`sexes.female`; die Spannweite ist immer eine gemeinsame
  Artspanne, der ♀/♂-Schalter neben dem Gewicht ändert nur das Gewicht. Die
  Anzeige zeigt Gewicht immer in Gramm, nie in Kilogramm.

## Einheitliche Vogelbilder

- Vor jeder Arbeit an Flugbildern oder Porträts `docs/vogelbild-standard.md` lesen. Die Regeln gelten dauerhaft für alle bestehenden Arten und ihre Varianten, auch in Folgeaufgaben und bei Subagenten. Abweichungen nur auf ausdrücklichen Wunsch des Nutzers für die konkrete Bearbeitung.
- Umfang der aktuellen Überarbeitung: ausschließlich vorhandene Bilder hinsichtlich Stil, Freistellung, fachlich korrekter Farben, Perspektive und Ausschnitt korrigieren. Keine zusätzlichen Geschlechtsvarianten oder sonstigen Varianten einbauen. Bereits vorhandene Geschlechtsvarianten nur bei sichtbaren Unterschieden berücksichtigen; das Geschlecht allein begründet kein eigenes Bild.
- Ungeeignete Flugbilder und Porträts bestehender Arten dürfen bei Bedarf vollständig neu erstellt und ersetzt werden, wenn gezielte Korrekturen nicht ausreichen. Beim neuen adulten Flugoriginal gilt die gemeinsame Zielperspektive, nicht die fehlerhafte Geometrie des alten Bildes. Anschließend vorhandene Varianten direkt aus dem neuen Original ableiten; Varianten niemals unabhängig neu generieren. Auch Neuerstellungen erfüllen alle Stil-, Ausschnitt- und Transparenzregeln.
- Flugbilder: immer von unten, Kopf/Blick nach links, Flügelachse im Bild von unten links nach oben rechts. Vollständiger Vogel einschließlich aller Flügel- und Schwanzspitzen, ein gemeinsamer naturalistischer Illustrationsstil.
- Die Fluggeometrie muss anatomisch und räumlich plausibel sein: Körperhaltung, Schulter-/Flügelansätze, Gelenke, Überdeckung und perspektivische Verkürzung anhand echter Flugfotos prüfen. Die diagonale Ausrichtung allein reicht nicht. Fehlerhafte adulte Vorlagen nicht geometrisch konservieren; zuerst ein korrektes Original erstellen. Die Deckungsgleichheit gilt für dessen Varianten, nicht als Pflicht zur Beibehaltung eines anatomisch falschen Altbilds.
- Die aktuell eingebundene normale adulte Morphe derselben Art ist die gemeinsame Ausgangsbasis (Original) für sämtliche Jungvogel-, Morphen- und männlichen/weiblichen Varianten. Die aktuelle Vorlage anhand der Bildzuordnung im Projekt ermitteln, nicht anhand eines vermuteten Dateinamens. Muss das adulte Original vereinheitlicht werden, zuerst dieses fertigstellen und als neue Basis festlegen, dann alle Varianten daraus ableiten.
- Jede Variante direkt aus diesem Original bearbeiten, auch beim Ersetzen einer vorhandenen Variante. Keine Variantenketten: weder eine andere Morphe noch ein altes Jungvogel- oder Geschlechtsbild als Bearbeitungsgrundlage verwenden, auch nicht für Jungvögel einer anderen Morphe.
- Wird eine Morphe überarbeitet, immer alle vorhandenen Altersstufen dieser Morphe mit aktualisieren, einschließlich ihrer Jungvogelbilder. Vor der Einbindung die vollständige Matrix aus Morphen und Altersstufen prüfen; nicht nur die adulten Morphen ersetzen. Jede Kombination trotzdem direkt vom normalen adulten Original ableiten.
- Bei Varianten Pose, Flugrichtung, Perspektive, Silhouette, Flügelstellung, Schwanzhaltung, Bildausschnitt, Bildgröße, Position auf der Bildfläche und Darstellungsstil des Originals beibehalten. Nur die fachlich erforderlichen alters-, morphen- oder geschlechtsspezifischen Merkmale ändern. Keine unabhängigen Zuschnitte oder Größenanpassungen; beim Umschalten darf der Vogel nicht springen.
- Porträts: einheitliches Halbporträt nach links mit Kopf und vergleichbar kurzem Halsansatz; gleicher Bildausschnitt, vergleichbare optische Kopfgröße, Augenhöhe und sichtbarer Halsanteil. Artspezifische Anatomie, Schnabellänge, Hauben und Gesichtsschleier erhalten; keine Einheitskopfform. Eine gemeinsame Kompositionsreferenz verwenden.
- Beide Bildtypen benötigen echte Transparenz. Ein gerendertes Schachbrett ist kein transparenter Hintergrund: bei solchen Ergebnissen lokal freistellen und den Alpha-Kanal prüfen. Federspitzen und helle Gefiederflächen erhalten. Keine pauschale Entfernung weißer/grauer Pixel. Bei Flugbildern den ganzen Vogel, bei Porträts den vollständigen Kopf einschließlich Schnabel und Kopffedern erhalten.
- Jeder delegierte Bildauftrag muss diese Vorgaben ausdrücklich enthalten: Bildtyp, Art/Variante, exakter Originalpfad, Referenzrollen, erlaubte Änderungen, unveränderliche Geometrie, lokale Freistellung und Abnahmekriterien. Subagenten lesen ebenfalls diese Datei und `docs/vogelbild-standard.md`; die Koordination prüft die Ergebnisse vor der Einbindung.

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

## Ruf-Aufnahmen

- Die Wellenform neben dem Ruf-Knopf ist gemessen, nicht erfunden:
  `npm run audio:peaks` liest die Dateien in `public/audio`, rechnet 48
  Lautstärkestufen je Aufnahme aus und schreibt `data/audio/peaks.json`. Der
  Stand ist eingecheckt; der Netlify-Build erzeugt ihn nicht neu.
- Das Skript decodiert mit `afconvert` und läuft daher auf macOS. Nach jeder
  neuen oder ersetzten Aufnahme einmal ausführen und das Ergebnis mitcommitten.

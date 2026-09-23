# Flächen- und Schließen-Audit

Stand: 23. September 2026. Bestandsaufnahme vor der Migration und Zuordnung
zur gemeinsamen Implementierung. Der zusätzliche große Radius ist ausdrücklich
Teil des Systems: bestehende Rollen 6/12/20 px bleiben erhalten, `surface-large`
ergänzt 28 px als ausdrückliche Option. Bestehende Panels bleiben bei 20 px. Kreise und Pillen behalten ihre eigenen Rollen.

## Jede Schließen-/Entfernen-Verwendung

| Verwendung | Vorher | Gemeinsame Implementierung |
| --- | --- | --- |
| Verbreitungskarte | Eigenes X, 32 px, absolut 12 px vom Rand, Titel reserviert 42 px | DialogContent compact, SurfaceHeader, CloseControl |
| Steckbrief-Vollbild | Navigationslink, 32 px, absolut am Panelrand, reservierter Titelbereich | FullscreenPage, SurfaceHeader, CloseLink |
| Systematik-Vollbild | Eigener Link, 32 px, reservierter rechter Titelbereich | FullscreenPage, SurfaceHeader, CloseLink |
| Mobile Artenauswahl | Sheet-X 28 px, absolut 12 px; eigenes 20-px-Polster | SheetContent, gemeinsamer Kopf, CloseControl |
| Standarddialog | X 28 px, absolut 8 px | DialogContent compact, gemeinsamer Kopf, CloseControl |
| Standardsheet | X 28 px, absolut 12 px | SheetContent, gemeinsamer Kopf, CloseControl |
| Toast | X 28 px in eigener Inhaltszeile | SurfaceHeader, CloseControl; 20-px-Außenradius |
| Drawer | Vom Aufrufer selbst zusammengestellte Dismissal-Aktion | Gemeinsamer Kopf und CloseControl; Textaktionen bleiben möglich |
| Command-Dialog | Standardmäßig keine sichtbare Schließen-Aktion | Gemeinsamer Dialogkopf, CloseControl; explizit abschaltbar |
| Header-Suche | 14-px-X als sehr kleines Klickziel | SearchField → FieldClear: 30 px Ziel, 16 px Icon |
| Artenauswahl-Suche | Wie Header-Suche | SearchField → FieldClear |
| Glossar-Suche | Wie Header-Suche | SearchField → FieldClear |
| Styleguide-Suche | Wie Header-Suche | SearchField → FieldClear |
| Combobox leeren | Eigener 24-px-Button | FieldClear |
| Combobox-Chip entfernen | Eigenes X, 24 px | FieldClear; Chip mindestens 30 px hoch |
| Quiz-Nahrung entfernen | Eigenes X im klickbaren Tag | RemovableChip; das gesamte Tag ist das Klickziel |
| Dialog-Fuß „Schließen“ | Textbutton | Bewusst Textaktion im SurfaceFooter, kein zusätzliches X |
| Alert-Dialog „Abbrechen“ | Explizite Textaktion | Beibehalten; bestätigungsbedürftige Dialoge erhalten kein beiläufiges X |
| Mobile Sidebar | X per Nachfahrenselektor versteckt | Explizites showCloseButton=false; vorhandener Sidebar-Trigger bleibt |
| Quiz beenden / Zurück | Navigationspfeil, Desktop mit Text | Bewusst Navigationsaktion, kein X |
| Quiz-Antwortstatus X | Nicht interaktiv, zwischen 16 und 18 px | QuizIncorrectIcon; semantisch getrennt von Dismissal |
| Styleguide-Beispiele | Neu | Echte große/kompakte Dialoge, Sheet und schließbare Karte |

CloseControl und CloseLink: 38 × 38 px Desktop, 44 × 44 px bis 760 px;
20-px-X, 12-px-Radius, Strukturrahmen und zentraler Fokus. Keine Aufrufstelle
bekommt eigene Größen-, Radius- oder Positionsparameter. Fokus-Rückgabe bei
Dialogen, Escape und native Link-Semantik bleiben erhalten.

## Flächen und Köpfe

| Bereich | Vorher | Jetzt |
| --- | --- | --- |
| Große Dialoge, Vollbildseiten, Explorer, Quiz-Arbeitsfläche | Mehrere Wrapper, teilweise andere Dialogradien | Gemeinsame Fläche mit erhaltenem 20-px-Radius; 28 px nur als explizite Variante |
| Kompakte Dialoge | Bibliotheksradius und eigener Footer-Rand | 20 px über compact-Variante |
| Messwertbox | 20 px | 20 px erhalten; kein kleinerer Kartenradius |
| Karten, Quiz-Auswahlkarten, Trivia | 12 px, diverse Wrapper | 12 px erhalten; Surface/Card und gemeinsame Fußzeile |
| Freie Sheet-/Drawer-Ecken | Bibliotheks- und Featureklassen | 20-px-Radiusrolle nur an freien Ecken |
| Atlas-Infopanel und Bildkopf | Direkte Klassen, mehrere individuelle Polster | AtlasInfoPanel, AtlasPanelBody, SpecimenHeader |
| Wissen und Falknerei | Padding u. a. 22+6 / 26 / 28 px, separate Köpfe | ExplorerPanel/Stage/Header/Notes, 24 / 16 px |
| Seitentitel Wissen/Falknerei | Wiederholter Seitenkopf | PageHeader |
| Quiz-Fragen | Unterschiedliche Label-/Titel-/Textabstände | QuizQuestionHeader: 12 px Rhythmus, Textrollen erhalten |
| Bibliothekskomponenten | Tailwind-Radien parallel zu App-Tokens | Explizite semantische Radiusrollen; keine zweite Standardskala |

Große/kompakte Panels teilen 24 px Polster, mobil 16 px. Karten teilen 16 px.
Titel/Beschreibung: 8 px; Dachzeile/Titel: 4 px; Kopf/Inhalt: 16 px.
Medienflächen, Menüzeilen, Tabs, Tooltip-Inhalte, Quiz-Antwortoptionen und die
kompakte Messwertzeile behalten ihre funktionalen Innenlayouts. Das ist kein
Freibrief für neue Radiuswerte oder individuell platzierte Schließen-Aktionen.

## Prüfung

- check-surface-system.mjs scannt app, components einschließlich components/ui,
  hooks und lib ohne Verzeichnisausnahmen. Er prüft Radius-Utilities, CSS,
  Inline-Stile, Aliasdefinitionen, rohe X-Icons und Komponenten-Overrides.
- Negative Scanner-Tests verhindern u. a. berechnete Radien, neue Inline-Radien,
  aliased X-Imports und eigene Schließen-Größen.
- Browser-Prüfung: Dialoge/Sheet mit langen Titeln und langem Inhalt,
  Artenauswahl und Suche, Karte, Steckbrief und Systematik, alle Wissens-Explorer,
  Falknerei und Quiz-Layouts auf Desktop und Mobil. Native Bibliotheksvarianten
  ohne produktive Nutzung sind statisch geprüft; nicht jeder ungenutzte
  Bibliothekszustand ist separat im Browser durchgespielt.

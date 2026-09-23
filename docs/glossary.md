# Glossar

Unter `/wissen#glossar` stehen die Fachbegriffe alphabetisch mit Suche und Themenfiltern. `lib/glossary.ts` ist die gemeinsame Datenquelle für Definitionen, Suchbegriffe und Verlinkungen.

- Direkte Links verwenden `glossaryHref(id)`: `/wissen?begriff=<id>#glossar`. Der Eintrag wird hervorgehoben, in den sichtbaren Bereich gescrollt und für Tastaturnavigation fokussiert.
- Beim Wechsel in einen anderen Wissen-Tab wird `begriff` aus der URL entfernt. Die Rückkehr zum Glossar zeigt dadurch keine alte Auswahl und scrollt nicht erneut zum zuvor gewählten Begriff.
- `GlossaryText` verlinkt den ersten Treffer jedes Begriffs pro Textblock. Angegebene Wortformen bleiben im Wortlaut erhalten. Unicode-Wortgrenzen verhindern zufällige Treffer innerhalb deutscher Zusammensetzungen.
- Vorhandene Links, Buttons und andere interaktive Komponenten bleiben unberührt. Die Komponente wird ausschließlich um Fließtexte verwendet, nicht um ganze interaktive Panels.
- Die gemeinsamen Komponenten `DetailCopy`, `FactTooltip` und `SpeciesTrivia` sowie alle redaktionellen Textfelder im Artenatlas verwenden den Renderer. Neue Fachbegriffe werden dort automatisch aktiv; zusätzliche Wortformen gehören in `aliases`.
- Neue Arten benötigen keine eigenen Verlinkungen. Neue Textfelder außerhalb dieser Komponenten sollten explizit `GlossaryText` verwenden.
- `GlossaryLink` verwendet `Tooltip`, `TooltipTrigger` und `TooltipContent` in der bestehenden Detail-Variante. Hover und Tastaturfokus zeigen die unveränderte Definition über `getGlossaryEntry(id)` aus `lib/glossary.ts`; der Trigger bleibt ein echter Link zum Glossar. Kein zusätzlicher Browser-Titeltooltip und keine duplizierten Erklärungstexte.
- Die Definitionen selbst bleiben ohne automatische Links, damit sie ruhig lesbar sind.

## Fachliche Referenzen

Die Erklärungen sind eigenständig und für Einsteiger formuliert. Zum Abgleich von Anatomie, Flugverhalten und Falknersprache:

- Cornell Lab, [Bird ID Skills: Field Marks](https://www.allaboutbirds.org/news/bird-id-skills-field-marks/)
- Cornell Lab, [Everything You Need to Know About Feathers](https://academy.allaboutbirds.org/feathers-article/)
- NABU, [Faszination Greifvögel](https://www.nabu.de/imperia/md/content/nabude/vogelschutz/27.pdf)
- NABU Leverkusen, [Turmfalke](https://nabu-leverkusen.de/natur-in-leverkusen/voegel/greifvoegel/turmfalke/)
- LBV, [Gewölle](https://lichtenfels.lbv.de/vogelschutz/eule/gew%C3%B6lle/)
- Deutscher Falkenorden, [Falknerei – Begrifflichkeiten](https://d-f-o.de/falknerei/falknerei-begrifflichkeiten/)
- Deutscher Falkenorden, [Häufig gestellte Fragen](https://d-f-o.de/falknerei/haeufig-gestellte-fragen/)

## Prüfung

`node --experimental-strip-types --test tests/glossary.test.ts` prüft Linkziele, alle hinterlegten Wortformen, Wortgrenzen, unveränderte Texte und Suche einschließlich Umlaut-Umschreibungen. Zusätzlich gelten die gemeinsamen Lint- und Build-Prüfungen.

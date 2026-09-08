# Typografie

Das Projekt verwendet Tailwind CSS 4, shadcn/Base UI und eigene Seiten-Stylesheets.
Die gemeinsame Größen- und Zeilenhöhenskala liegt in `app/typography.css` und wird
einmal über `app/globals.css` geladen. Inter ist die Schrift für Fließtext und
Bedienelemente; Cormorant Garamond bleibt die Schrift für redaktionelle Titel.

## Textrollen

Die Pixelangaben dienen der Orientierung bei einer Browser-Basisgröße von 16 px.
Im Code stehen relative `rem`-Werte; die Browser-Schriftgröße bleibt frei wählbar.

| Rolle                                                                 | CSS-Variable           | Tailwind-Klasse      | Größe    |
| --------------------------------------------------------------------- | ---------------------- | -------------------- | -------- |
| Quellen, Bildnachweise                                                | `--type-caption`       | `text-caption`       | 12 px    |
| Mindestgröße wissenschaftlicher Namen; Namenspaare skalieren darüber hinaus | `--type-scientific` | `text-scientific` | 16 px |
| Navigation, Buttons, Filter, kompakte Erklärungen                     | `--type-ui`            | `text-ui`            | 14 px    |
| Fließtext, Aufgabenbeschreibungen                                     | `--type-body`          | `text-body`          | 16 px    |
| Einleitung                                                            | `--type-lead`          | `text-lead`          | 18 px    |
| Karten- und Listentitel                                               | `--type-card-title`    | `text-card-title`    | 20–24 px |
| Überschrift im Detailbereich                                          | `--type-heading`       | `text-heading`       | 28 px    |
| Große Abschnittsüberschrift                                           | `--type-section-title` | `text-section-title` | 32–40 px |
| Seitentitel                                                           | `--type-page-title`    | `text-page-title`    | 36–48 px |
| Artname auf der Hauptbühne, Falknerei-Aufmacher                       | `--type-hero`          | `text-hero`          | 40–64 px |

Zusätzliche Rollen gibt es für das Logo (`--type-brand`), lange Artnamen
(`--type-hero-compact`), Untertitel (`--type-subtitle`), kompakte Listentitel
(`--type-label-title`), Messwerte (`--type-metric`, `--type-metric-compact`) und
große Quiz-Zahlen (`--type-score`). Diese Ausnahmen sind zentral definiert.

## Regeln für Änderungen

- Alle eigenständigen Vogelnamen erhalten `species-common-name`, wissenschaftliche
  Namen `species-scientific-name`. Beide Klassen verwenden zentral Cormorant
  Garamond und Schriftgewicht 600. Deutsche Namen stehen aufrecht in der
  Vordergrundfarbe, wissenschaftliche Namen kursiv in der sekundären Textfarbe
  (`--muted-foreground`). Das gilt auch für Auswahlknöpfe,
  Quizkarten, Drag-Vorschauen und mobile Ansichten. Namen innerhalb von Fließtext
  bleiben Teil der jeweiligen Textformatierung.
  Die deutschen Namen in der Atlas-Seitenliste und im großen Atlas-Kopf verwenden
  auf Nutzerwunsch Schriftstärke 700; wissenschaftliche Namen in der Seitenliste
  bleiben bei 600, im Atlas-Kopf bei 400.
- Namenspaare deklarieren am gemeinsamen Container `--species-common-size` mit
  einer bestehenden Textrolle. Der deutsche Name verwendet diese Größe; der
  wissenschaftliche Name skaliert zentral mit 75 %, mindestens jedoch 16 px.
  Damit gehören beide Namen auch bei großen Überschriften und responsiven
  Größen zusammen (z. B. 24/18, 28/21 und 32/24 px). Keine festen lokalen Größen
  für wissenschaftliche Namen ergänzen. Schriftfamilie, Schriftgewicht und
  Kursivstellung bleiben zentral; auch mobil gibt es keinen Schriftwechsel.
  Im großen Atlas-Kopf gilt auf Nutzerwunsch der ruhigere Größenfaktor 50 %
  (`--species-scientific-scale: 0.5`), weiterhin mit mindestens 16 px, und normale
  Schriftstärke 400 (`--species-scientific-weight: 400`) für den wissenschaftlichen Namen.

- In Seiten-CSS eine Textrolle verwenden, z. B. `font-size: var(--type-body)`.
  In JSX stehen dieselben Rollen als Tailwind-Klassen zur Verfügung.
- Keine neuen Pixelgrößen, `text-[…]`-Sonderwerte oder lokalen `clamp()`-Formeln
  für Text ergänzen. Die normalen Tailwind-Klassen wie `text-sm` und `text-base`
  greifen ebenfalls auf die zentrale Skala zu.
- Dieselbe Funktion bekommt auf jeder Seite dieselbe Textrolle. Mobile Ansichten
  ändern das Layout; die zentralen Titelrollen übernehmen die Größenskalierung.
  Bedienelemente und Fließtext werden auf Mobilgeräten nicht kleiner gesetzt.
- 12 px nur für sekundäre Metadaten, mindestens 14 px für regelmäßig verwendete
  Bedienelemente und 16 px für längere Lesetexte verwenden.
- Wissenschaftliche Namen in der Artenliste sind wichtige Leseinhalte:
  16 px und Schriftgewicht 600 verwenden. Die sekundäre Textfarbe nicht durch
  zusätzliche Transparenz abschwächen.
- Zeilenhöhen ebenfalls über Tokens wählen: `--leading-display` (1,1),
  `--leading-heading` (1,2), `--leading-compact` (1,4), `--leading-normal` (1,5)
  oder `--leading-relaxed` (1,7). `--leading-none` (1) nur für einzeilige Zahlen
  oder kompakte Tabs verwenden.
- Bestehende Bibliothekskomponenten in `components/ui` behalten ihre Vorlage.
  Projektspezifische Anpassungen an der Verwendungsstelle vornehmen.

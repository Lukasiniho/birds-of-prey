# Baumfalke – Freistellungs-Vorschlag

**Status: Vorschlag, noch nicht abnahmefähig.** Schmale helle bzw. grünliche Randverunreinigungen sind reduziert. Auf hellem und petrolfarbenem Grund bleibt rechts unten eine bereits im Original vorhandene breite, halbtransparente Überblendung sichtbar (ungefähr x=930–1020, y=740–850). Deshalb erfüllt die Datei das Kriterium „kein Halo“ noch nicht vollständig. Keine Einbindung vorgenommen.

## Dateien und Herkunft

- Vorschlag: `outputs/proposals/portraits/baumfalke.png`, RGBA, **1172 × 1172 px**, unveränderte Originalleinwand.
- Quelle: `public/birds/portrait-baumfalke-20260913-v3.png`.
- Quellen-SHA256: `a018b6cae8c0f0d49b192cb91801536d45dd89b21d87ad44b8a6d538e787b1fb` – vor der Bearbeitung und im reproduzierbaren Skript geprüft.
- Vorschlags-SHA256: `a377f4550aeb19f5e0ee0e243c8aa8e605b87c91f5b05b2817bc55fb9eba0ddc`.
- Aktive Zuordnung anhand `lib/portrait-images.ts` bestätigt; nicht geändert.
- Vergleich: `outputs/proposals/baumfalke-check.png`, jeweils Original links und Vorschlag rechts auf `#e8e8e4`, `#22282a`, `#2d7f7a`, einschließlich 64- und 48-px-Ansichten. Quelle sind das obige Original und der obige Vorschlag; kein anderes Vogelbild wurde hineinkopiert.
- Vollauflösende Vergleichsansichten: `outputs/proposals/baumfalke-work/{light,dark,teal}-{current,proposal}-full.png`.
- Verarbeitung: `outputs/proposals/baumfalke-work/finish.cjs`.
- Vergleichsbogen-Erstellung: `outputs/proposals/baumfalke-work/contact.cjs`.
- Maschinenprüfungen: `outputs/proposals/baumfalke-work/checks.json`.

## Referenzrollen

- `public/birds/portrait-baumfalke-20260913-v3.png`: einziges Bearbeitungsziel, Identität, Anatomie, Geometrie und ausdrücklich bestätigter Federabschluss.
- `public/birds/portrait-habicht-20260912.png`: ausschließlich Kompositionsreferenz; angesehen, keine Pixel übernommen und keine Neupositionierung vorgenommen.
- `public/birds/portrait-gerfalke-20260913-v2.png`: ausschließlich Rendering und Federabschluss; angesehen, keine Pixel übernommen.
- `docs/portrait-user-refinements-20260913/extract.py`: vorgeschriebene Grün-Entmischungsreferenz gelesen. Für die gewählte lokale Randdekontamination wurde kein neuer Hintergrund erzeugt und keine erneute Freistellung per Farbschlüssel vorgenommen.
- `docs/portrait-user-refinements-20260913/finish-necks.py` und `manifest.json`: zur Ursachenprüfung gelesen; dokumentieren die frühere Überblendung zweier Halsbereiche. Keine Ausführung und keine Änderung.
- Historischer Grün-Matte-Pass `/Users/lukasvonhohnhorst/.codex/generated_images/01a0976f-755f-7be3-bea4-157be9d1dc69/exec-bed42161-4f7c-40ee-a71d-987f7e4c674b.png`: nur zur Ursachenprüfung angesehen, **keine Pixel oder Maske daraus übernommen**.

## Prompts und Generierungsweg

**Keine neue Generierung, keine verwendeten Prompts, keine neuen Generierungspfade (0 von maximal 4 Generationen).** Die ausdrücklich erlaubte lokale Randdekontamination wurde gewählt, um die bestätigte Vogelgeometrie exakt zu erhalten. `docs/image-prompts/portrait.md` wurde gelesen; seine festen Blöcke wurden nicht verändert. Es wird kein unbenutzter Prompt als tatsächlich ausgeführter Prompt ausgegeben.

## Lokale Verarbeitung

1. Original mit vorhandenem `sharp` aus `node_modules` verlustfrei als RGBA eingelesen; Python-Pillow ist nicht installiert.
2. Aus der vorhandenen Transparenz den Abstand zum äußeren Bildrand des Vogels ermittelt. Keine Weiß-/Grau-Freistellung, kein Entfernen heller Gefiederpixel.
3. Ausschließlich Rand-RGB korrigiert: rechts am Nacken innerhalb von weniger als 6 px zum transparenten Außenraum, unten bei eindeutig grün-/cyanbetonten Restfarben innerhalb von weniger als 10 px. Lokale Gefiederfarben aus benachbarten inneren Pixeln werden entfernungsgewichtet übernommen; Übergang über 2 px. Die tatsächlichen Koordinaten und Kriterien sind im Skript festgehalten.
4. Drei lokale Einstellungen geprüft; für den gespeicherten Vorschlag eine gewichtete Farbfortsetzung verwendet, nachdem eine nächste-Nachbar-Fortsetzung sichtbare Stufen erzeugte. Diese Zwischenstände sind nicht die finale PNG.
5. **Kein Alpha-Pixel geändert**, keine Erosion, Skalierung, Verschiebung, Drehung oder neuer Zuschnitt. 11.524 RGB-Pixel geändert; das Bildinnere bleibt unverändert. Schnabel, Auge, Zeichnung und alle vorhandenen Alpha-Federspitzen bleiben exakt erhalten.
6. PNG erneut dekodiert und Alpha-Identität sowie unveränderte Pixel außerhalb des erlaubten Randbereichs per Assertions geprüft. Vergleichsdateien separat erzeugt.

## Sichtprüfung und Grenze

Alle drei Hintergründe in voller Auflösung sowie 64 und 48 px wurden angesehen. Die kleinen Anzeigegrößen entsprechen `app/species-row.css`; keine App-Datei geändert. Schnabel und Federspitzen sind vollständig; keine neuen Löcher, keine Geometrieverschiebung. Der schmale Farbrand ist verbessert.

**Nicht bestanden:** Der breite transparente Überblendungsrest am rechten unteren Hals bleibt in voller Auflösung insbesondere auf hellem/petrolfarbenem Grund sichtbar. Reine Farbdekontamination kann eine solche Alpha-Überblendung nicht beheben. Die unveränderte Alpha-Maske bewahrt zwar sämtliche ursprünglichen Federspitzen, bewahrt damit aber auch diesen Fehler. Eine weitere Matte-Korrektur müsste die betroffene Alpha-Kontur anhand der tatsächlichen Federn rekonstruieren; dieser Vorschlag behauptet keine vollständige Halo-Freiheit.

Es wurden ausschließlich eigene Dateien unter `outputs/proposals/` geschrieben. Keine zusätzlichen Varianten, keine Änderungen an `public/`, `lib/`, `app/`, `tests/`, `docs/` oder Bildzuordnungen.


## Round 2

**Neuer Vorschlag vom 27. Oktober 2026.** Diese Runde ersetzt die PNG aus Runde 1; die oben dokumentierte Ablehnung und deren damalige Prüfergebnisse bleiben als Historie erhalten. Keine Einbindung. Der breite halbtransparente Überblendungsrest rechts unten wurde durch einen lokal eingesetzten Federabschluss ersetzt; die gelb-grünen Randfarben unten wurden lokal dekontaminiert.

### Quellen, Referenzrollen und Ergebnis

- Einzige Bildbasis: `public/birds/portrait-baumfalke-20260913-v3.png`, SHA256 `a018b6cae8c0f0d49b192cb91801536d45dd89b21d87ad44b8a6d538e787b1fb`. Die aktive Zuordnung in `lib/portrait-images.ts` wurde lesend bestätigt.
- Die bestätigte Baumfalke-Vorlage bestimmt Identität, Zeichnung, Größe, Position und vorhandenen Federabschluss. Keine Pixel einer anderen Art verwendet. Die allgemeinen Habicht-/Gerfalke-Referenzen wurden für diesen eng begrenzten Auftrag nicht als zusätzliche Generierungseingaben eingesetzt.
- Ausgabe: `outputs/proposals/portraits/baumfalke.png`, unveränderte **1172 × 1172 px**, RGBA. SHA256: `731d980c84e1e6c37efeb6d2a0351e283fd9328488aac18fb2139595f006c348`.
- Genau **ein Imagegen-Aufruf**, direkt mit dem Original als Eingabe. Rohresultat: `outputs/proposals/baumfalke-work/round2/generated.png`, SHA256 `e1042662345ac1d0f529681466f300ad8c9c685013ced6544f1ff84f9d66620f`. Das Werkzeug erzeugte zunächst automatisch `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec0-31a1-7c23-bbdd-42b8efc24aed/exec-40a81a8b-565a-4211-9024-47407a194efc.png`; die Arbeitskopie liegt im Vorschlagsordner.
- Die Ausgabe des Generators ist **nicht** die fertige PNG: Sie enthält einen grünen Hintergrund und Veränderungen außerhalb des Auftrags, die nicht übernommen wurden.

### Schritte

1. AGENTS.md, Vogelbild-Standard, die verbindlichen Porträt-Promptblöcke und die Grün-Entmischungsvorlage gelesen; Originalprüfsumme geprüft. Der reine lokale Alpha-Schwellwertversuch wurde verworfen, weil er rechts eine unnatürliche Schnittkante erzeugte.
2. Imagegen zeichnete gezielt den unteren rechten Halsrand mit überlappenden dunklen Federspitzen neu. Die festen Promptblöcke 1–3 wurden wörtlich übernommen, Block 4 artspezifisch und Block 5 auftragsbezogen ausgefüllt. Die konkrete Originalleinwand hat im abschließenden Auftragszusatz ausdrücklich Vorrang vor dem generischen 1254-Pixel-Kompositionsblock.
3. Grün-Entmischung mit Node und sharp nach dem Prinzip von `docs/portrait-user-refinements-20260913/extract.py`: gemessene Hintergrundnäherung [4,249,5], Grünüberschuss, Entmischung der RGB-Werte, kleine Hintergrundreste transparent. Keine Weiß-/Grau-Freistellung.
4. Nur die generierte Reparatur wurde von 1254 auf das 1172-Pixel-Originalraster gebracht und um 2 px nach rechts ausgerichtet. Das Original wurde weder skaliert noch verschoben. Ein begrenzter Einsatz rechts unten (Zeilen 720–944) ersetzt den defekten Rand. Die obere Anschlusskontur folgt bis y740 der vorhandenen Kontur und läuft danach in die erste reparierte Feder. RGB-Übergänge ausschließlich zwischen vollständig deckenden Pixeln; **keine Alpha-Überblendung**.
5. Untere Farbsäume anhand des Abstands zum transparenten Außenraum lokal korrigiert. Kontaminierte Randfarben erhalten benachbarte saubere Gefiederfarben; kontaminierte Pixel sind als Farbspender ausgeschlossen. Ein kleiner verbliebener Farbfleck bei x745–765 / y940–960 wurde ebenfalls korrigiert. Die ursprüngliche untere Alpha-Kontur bleibt außerhalb der rechten Reparatur erhalten.
6. Transparente PNG geschrieben, erneut dekodiert und mit Assertions geprüft. Reproduzierbar mit `node outputs/proposals/baumfalke-work/round2/finish.cjs`; Vergleichsbogen mit `node outputs/proposals/baumfalke-work/round2/contact.cjs`.

### Prüfungen

- **Kopf-Pixelidentität bestanden:** alle RGBA-Kanäle für sämtliche Pixel mit y &lt; 700 exakt gleich, einschließlich transparenter Pixel. **0 veränderte Kopf-Pixel.**
- **Leinwand bestanden:** 1172 × 1172 px.
- **Bounding Box bestanden:** bei Alpha > 0 Original [113,161,1060,1012], Vorschlag [113,161,1052,1012]. Nur die rechte Grenze wandert um 8 px nach innen: **0,84 % der ursprünglichen Vogelbreite**, innerhalb der verlangten 1 %. Bei Alpha > 127 beträgt die Abweichung 6 px (0,64 %). Linke, obere und untere Grenze unverändert.
- 30471 RGB-Pixel und 9850 Alpha-Pixel verändert; die ursprüngliche Quelldatei unverändert. Maschinenbericht: `outputs/proposals/baumfalke-work/round2/checks.json`.
- Sichtprüfung der vollen 1172-Pixel-Ansichten auf **#e8e8e4, #22282a und #2d7f7a**, zusätzlich rechter Halsrand vergrößert und komplette untere Spitzen in 1:1. Der breite graue Verlauf rechts unten ist entfernt. Der reparierte Abschluss besteht aus deckenden Federflächen mit schmalen Kantenglättungspixeln; kein flächiges Alpha-Ausblenden. Die gelb-grüne Kontamination unten wurde entfernt; natürliche helle und warme Gefiederfarben bleiben erhalten.
- Die kleinen 64-/48-Pixel-Prüfansichten stehen im aktualisierten `outputs/proposals/baumfalke-check.png`. Vollauflösende Einzelansichten und Detailausschnitte stehen unter `outputs/proposals/baumfalke-work/round2/`.
- **Status: Vorschlag zur visuellen Abnahme durch den Nutzer.** Die neu gezeichneten Federspitzen rechts unten unterscheiden sich lokal vom fehlerhaften Altabschluss; Kopf und übrige unveränderte Bildteile stammen weiter direkt aus dem Original.
- Alle selbst geschriebenen Repository-Dateien liegen unter `outputs/proposals/`. Keine Änderungen an public/, lib/, app/, tests/, docs/, Bildzuordnungen oder Variantenbestand.

### Tatsächlich verwendeter Prompt

Archiv: `outputs/proposals/baumfalke-work/round2/prompt.txt`.

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.

Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Eurasian Hobby (Falco subbuteo), adult.
Identity: dark brown iris, yellow orbital ring and cere, slate-grey crown and nape, strong dark moustachial stripe, cream-white cheek and throat, dark hooked bill. Anatomy from real photographs of this species only.

Edit of input image 1 (the current portrait). Change only: redraw only the lower right neck edge, removing the ghosted translucent feather blend around x930–1020, y740–850; replace it with crisp overlapping dark slate feather tips continuing the existing contour. Remove the yellow-green fringe on bottom feather tips.
Keep everything else pixel-identical in size and position.

Task-specific precedence over generic composition block: preserve the existing 1172x1172 canvas and exact original framing, scale, feather endings and all head pixels above y700. Do not reposition, resize, reframe or repaint the head. Edit only the thin lower neck boundary and the right lower neck ghost area. No partial-alpha fog, soft dissolves, gradient or matte fringe. Background-only pure #00FF00 matte with no spill. Existing input is the confirmed identity, composition, rendering and feather-ending reference for this precise restoration. No extra feathers outside the original bird bounding box, no new bird variants.
```

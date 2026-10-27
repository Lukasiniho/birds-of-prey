# Flugbild-Prompt (verbindliche Vorlage)

Gleicher Aufbau wie `portrait.md`: feste Blöcke wörtlich, nur Art- und
Auftragsblock ändern sich, der verwendete Prompt liegt neben dem Ergebnis.
Ergänzt `docs/vogelbild-standard.md`.

Referenzen (nur Stil, nie Anatomie oder Pose einer anderen Art):
- `public/birds/steinadler.png`, `public/birds/seeadler.png`

## Reihenfolge: Hauptmorphe zuerst, Varianten nur als Bearbeitung

1. Die normale adulte Morphe (aktive Zuordnung in `lib/bird-images.ts`) wird
   zuerst fertiggestellt. Sie ist das Original.
2. Jede weitere Variante (Jungvogel, Weibchen, Morphe, Morphe × Alter) ist eine
   leichte Bearbeitung genau dieses Originals: Eingabebild 1 ist immer das
   Original, nie eine andere Variante. Nur Gefieder, Farbe und Zeichnung ändern.
3. Silhouette, Pose, Flügel, Schwanz, Leinwand, Maßstab und Position bleiben
   deckungsgleich; der Vogel springt beim Umschalten nicht. Prüfung per
   50-%-Überlagerung und Alpha-Vergleich mit dem Original.
4. Wird das Original neu gemacht, werden alle Varianten neu daraus abgeleitet.

## 1 Stil

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.
```

## 2 Perspektive

```text
Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.
```

## 3 Hintergrund

```text
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.
```

Freistellung lokal per Grün-Entmischung, nie per Weiß-/Grau-Key. Leinwandgröße
sowie Größe und Lage des Vogels (Alpha-Begrenzung) entsprechen dem bisher
aktiven Bild der Art (`tests/image-framing.test.mjs`).

## 4 Art

```text
Species: <English name> (<Latin name>), <adult/juvenile, morph>.
Underside identity: <bestimmende Merkmale von unten: Unterflügeldecken,
Schwingen-/Schwanzbänderung, Körperzeichnung, Kopf>. Anatomy and proportions
from real photographs of this species only.
```

## 5 Variante (nur bei Varianten)

```text
Edit of input image 1, the approved adult original of this species. Change only
the plumage to <Variante>: <konkrete Merkmale>. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.
```

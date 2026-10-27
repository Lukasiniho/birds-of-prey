# Porträt-Prompt (verbindliche Vorlage)

Jede Porträt-Generierung setzt sich aus diesen Blöcken zusammen, wörtlich und
in dieser Reihenfolge. Nur der Artblock und gegebenenfalls der Auftragsblock
ändern sich. Der tatsächlich verwendete Prompt wird neben dem Ergebnis
gespeichert. Ergänzt `docs/vogelbild-standard.md`, ersetzt ihn nicht.

Referenzen (nur Komposition und Stil, nie Anatomie):
- Komposition: `public/birds/portrait-habicht-20260912.png`
- Rendering und Federabschluss: `public/birds/portrait-gerfalke-20260913-v2.png`

## 1 Stil

```text
Lifelike natural-history bird portrait with the realism of a high-end studio
photograph of a living bird: soft diffuse daylight from the upper left, natural
matte feathers, fine continuous feather strands and down, subtle volume
shading, a crisp natural eye with one small soft catchlight. Not painterly and
not an engraving: no etched feather outlines, no repeated scale-like feather
patterns, no crunchy sharpening or micro-contrast, no metallic sheen, no
plastic eyes, no glow, no boosted saturation, no airbrushed smoothness.
```

## 2 Komposition

```text
Left-facing slight three-quarter half portrait: head turned about 20-30 degrees
from pure profile toward the viewer, gaze to the left, closed beak. Head with a
short compact neck only; no shoulders, wings or body. Square 1254x1254 canvas.
Eye centre about 32% from the top, lowest feather tips about 87% from the top,
at least 8% empty margin on every side including bill tip and crest. Optical
head size (without crest and neck) comparable to the composition reference.
Lower edge made of individual, naturally irregular overlapping feather tips: no
straight cut, no pedestal, no blur, no fade, no white mist.
```

## 3 Hintergrund

```text
Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.
```

Freistellung lokal per Grün-Entmischung (Vorlage:
`docs/portrait-user-refinements-20260913/extract.py`), nie per Weiß-/Grau-Key.
Danach auf hellem, dunklem und petrolfarbenem Grund prüfen: keine Säume,
Löcher oder abgeschnittenen Federn.

## 4 Art

```text
Species: <English name> (<Latin name>), adult <Geschlecht/Morphe falls relevant>.
Identity: <3-6 bestimmende Kopfmerkmale: Iris, Wachshaut, Schnabel, Zeichnung,
Haube/Ohrbüschel/Schleier>. Anatomy from real photographs of this species only.
```

## 5 Auftrag (nur bei Bearbeitung eines vorhandenen Bildes)

```text
Edit of input image 1 (the current portrait). Change only: <konkrete Korrektur>.
Keep everything else pixel-identical in size and position.
```

# Jagdbild-Prompt (verbindliche Vorlage)

Gleicher Aufbau und gleiche Bildsprache wie `flight.md`: feste Blöcke
wörtlich, nur Art-, Beute- und Auftragsblock ändern sich, der verwendete Prompt
liegt neben dem Ergebnis.

Referenzen:
- Stil: `public/hunting-steinadler.png`, `public/hunting-seeadler.png` (nur
  Rendering, nie Pose oder Anatomie).
- Gefieder und Identität: das aktive adulte Flugbild derselben Art
  (`lib/bird-images.ts`), damit Flug- und Jagdbild denselben Vogel zeigen.

## 1 Stil

Wörtlich Block 1 aus `flight.md`, auf die ganze Szene angewandt (Vogel, Beute,
gegebenenfalls Landschaftsfragment).

## 2 Szene

```text
One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.
```

## 3 Hintergrund

Wörtlich Block 3 aus `flight.md` (flaches #00FF00, lokal per Grün-Entmischung
freistellen). Leinwand 1254×1254; Größe und Lage der Szene (Alpha-Begrenzung)
entsprechen dem bisher aktiven Jagdbild der Art.

## 4 Art und Beute

```text
Raptor: <English name> (<Latin name>), adult, plumage exactly as in input image
<n> (the species' active flight image). Prey: <prey species>.
```

## 5 Auftrag (bei Überarbeitung)

```text
Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct <konkrete Fehler>.
```

# Klippenadler – Jagdbild: Vorschlag

Stand: 27. Oktober 2026. **Nur Vorschlag; keine Einbindung.** AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/hunting.md und docs/image-prompts/flight.md gelesen und angewandt. Genau ein vorhandenes Jagdbild bearbeitet; keine neuen Arten, Alters-, Geschlechts- oder sonstigen Varianten.

## Ergebnis

- RGBA-PNG: [hunting/klippenadler.png](hunting/klippenadler.png), 1254 × 1254 px.
- Vergleich: [klippenadler-hunting-check.png](klippenadler-hunting-check.png), aktuell oben, Vorschlag unten, auf #e8e8e4, #22282a und #2d7f7a, jeweils 440 × 440 px.
- 440 px entspricht `HuntingArt` → `ArtImage displayWidth={440}` in app/raptor-app.tsx. Keine UI geändert.
- Ausgewählt: Generation 03 von insgesamt **3 Generationen** (Limit 4). Built-in `image_gen`, keine CLI/API-Ausweichlösung.
- Fotografischere Oberflächen mit dem Gefieder des akzeptierten Flugbilds: dunkles Körpergefieder, helle Flügelfelder und gedämpfte Bänderung. Rechte Blickrichtung, hochgestellte Flügel, gefächerter Schwanz links unten und Klippschliefer rechts unten bleiben erhalten.

Finale SHA-256: `298c2e69b70c343e1b367b911affddbbd948ff033cd8ccc8692a2547798014f0`.

## Quellen und Referenzrollen

- `public/birds/hunting-klippenadler.png`
  - Bearbeitungsziel; ausschließlich Quelle für Komposition, Pose, Flügelstellung, Beute und Beuteposition.
  - SHA-256: `009c1b56e394a4960dc206dc864094b790c63c61d2c74f48a07c333eb264f6c2`
- `outputs/proposals/flight/klippenadler/male.png`
  - Vom Nutzer akzeptiertes adultes Flugbild; ausschließlich Gefieder und Identität, keine Pose.
  - SHA-256: `bfee02518ad1292e29c66ec6f072cfeb45e37640bedba5d52f9ecac4df67996c`
- `public/hunting-steinadler.png`
  - Nur Rendering/Stil; keine Anatomie, Pose, Beute oder Landschaft übernehmen.
  - SHA-256: `559bde6f567a4479d4add1422bd5f1cd71f0d5e2830d9dd7887a7f298aaebb86`
- `public/hunting-seeadler.png`
  - Nur Rendering/Stil; keine Anatomie, Pose, Beute oder Landschaft übernehmen.
  - SHA-256: `2c7e0193ba86fe21c1cad55096cfe7680991c8d697c201d30c5288c280006f07`

## Generierungsweg

Generation 01 verwendete die vier Originaldateien in der oben genannten Reihenfolge. Das Werkzeug lieferte trotz Grünvorgabe einen transparenten Hintergrund; deshalb verworfen. Der erste Entmischungsversuch auf dieser ungeeigneten Eingabe war ungültig und wurde nicht verwendet. Das lokale Skript verweigert inzwischen Eingaben ohne grünen Hintergrund.

Für Generationen 02 und 03 wurden dieselben Originale in dieser Reihenfolge ausschließlich auf #00FF00 komponiert, ohne Änderung ihrer Geometrie. **Jede Generation ging wieder direkt vom ursprünglichen Jagdbild aus**, nicht von einer vorigen Generation. Eingaben:

1. `outputs/proposals/hunting/klippenadler-work/source-green.png`
2. `outputs/proposals/hunting/klippenadler-work/plumage-green.png`
3. `outputs/proposals/hunting/klippenadler-work/style-golden-green.png`
4. `outputs/proposals/hunting/klippenadler-work/style-white-tailed-green.png`

Generation 02 hatte den richtigen Grünhintergrund, wirkte aber noch zu illustrativ. Generation 03 verstärkte ausschließlich die fotografische Oberflächenbehandlung und wurde ausgewählt.

Das Built-in-Werkzeug speicherte seine Rohdateien automatisch in seinem eigenen Ausgabeverzeichnis; anschließend wurden sie unter outputs/proposals kopiert. Alle lokalen Arbeitsdateien, Prüfungen und Ergebnisse dieser Aufgabe liegen unter outputs/proposals. Keine Änderungen an public/, lib/, app/, tests/ oder docs/.

- Generation 01: `outputs/proposals/hunting/klippenadler-work/generation-01.png`
  - SHA-256: `13ae3c92c45ad9584ef25b2a7def785f61378863e334b5349979431d610c0bce`
  - Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c392-7630-a65b-b1da51a132fc/exec-4a92c56e-d57d-46cf-9e04-7ca17b1e318d.png`
- Generation 02: `outputs/proposals/hunting/klippenadler-work/generation-02.png`
  - SHA-256: `c3078b6bdcfe1082d1c5a33907207f0cbd0e85d74200cb614edb7f50f2cc9893`
  - Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c392-7630-a65b-b1da51a132fc/exec-825f5f85-ec66-409d-85f0-b2f94b0fa9b4.png`
- Generation 03: `outputs/proposals/hunting/klippenadler-work/generation-03.png`
  - SHA-256: `33a82f958ce9f5f7e11e2b8a2bcdbab635804c55d8b77f8ebc600625ce059e8f`
  - Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c392-7630-a65b-b1da51a132fc/exec-166b411a-3f84-4782-81d7-45638a1fa3dc.png`

## Lokale Freistellung und Rahmen

Node + Sharp verwendet, da PIL/Python-Bildbibliotheken fehlen. Grundlage ist die Grün-Entmischung in `docs/portrait-user-refinements-20260913/extract.py`:

1. Randmedian des ausgewählten Renderings gemessen: RGB **[5, 249, 4]**. Der Prompt fordert #00FF00; die tatsächliche Ausgabe weicht geringfügig davon ab. Die Entmischung nutzt den gemessenen Hintergrund.
2. Grünüberschuss `G - max(R,B)` berechnet; Alpha `clamp(1 - excess / 244)`. Bei Überschuss < 10 Alpha = 1, bei Alpha < 0,045 Alpha = 0.
3. Größte zusammenhängende Szene mit 8er-Nachbarschaft erhalten und ihre 5×5-Maskenumgebung bewahrt. Hintergrundrauschen entfernt.
4. RGB über `(RGB - (1-alpha)*background)/alpha` entmischt. **Kein Weiß-/Grau-Key**, keine pauschale Entfernung heller Gefiederflächen.
5. Gesamte Szene einheitlich mit Faktor **1274/1254 = 1,0159489633** skaliert und in die ursprüngliche Leinwand von 1254 × 1254 px zurückgesetzt (Fenster x=11, y=10). Keine unabhängige Verschiebung oder Skalierung von Vogel, Flügeln oder Beute, keine anisotrope Verformung. Automatisch geprüft: **0 nichttransparente Pixel beim Zuschnitt entfernt**. Diese geringe gemeinsame Anpassung hält sowohl die rohe Alpha-Begrenzung als auch die deckenden Szenengrenzen innerhalb der 2-%-Vorgabe. Die Originaldatei enthält sehr schwache Alpha-Restpixel bis zum unteren/rechten Leinwandrand; deshalb werden mehrere Alpha-Schwellen separat dokumentiert.
6. An halbtransparenten Mattenrändern Farben aus dem nächstgelegenen deckenden Inneren fortgesetzt (maximal 7 px Entfernung; Kern mit deckender 5×5-Umgebung). Nur RGB angepasst; Feder- und Fellkonturen im Alpha bleiben erhalten. Verbleibenden Grünüberschuss ausschließlich an halbtransparenten Pixeln auf `max(R,B)` begrenzt.
7. Zwei durch Lanczos entstandene Pixel mit Alpha 1/255 unmittelbar am Leinwandrand entfernt; keine deckenden Federn oder Spitzen entfernt.

Reproduzierbare lokale Schritte:

```sh
node outputs/proposals/hunting/klippenadler-work/finish.cjs outputs/proposals/hunting/klippenadler-work/generation-03.png
node outputs/proposals/hunting/klippenadler-work/finalize.cjs
node outputs/proposals/hunting/klippenadler-work/check.cjs
```

## Prüfung

Automatisierte Messwerte in `hunting/klippenadler-work/checks.json`; lokale Transformation in `final-transform.json`, Entmischung in `extraction.json`.

| Prüfung | Ergebnis |
|---|---|
| Leinwand / Kanäle | 1254 × 1254; RGBA |
| Rohe Alpha-Begrenzung Original, inklusive Restpixel | [0,12]–[1253,1253], 1254 × 1242 |
| Rohe Alpha-Begrenzung Vorschlag | [1,7]–[1252,1224], 1252 × 1218 |
| Größenabweichung, Alpha > 0 | Breite −0,1595 %; Höhe −1,9324 % |
| Mittelpunktabweichung, relativ zur Leinwand | x 0 %; y −1,3557 % |
| Sichtbare Szene, Alpha > 11 | Breite +1,6247 %; Höhe +1,4167 %; Mittelpunkt x 0 %, y +0,1994 % |
| Zusätzliche Schwellen >38, >127, >230 | Größe und Mittelpunkt jeweils innerhalb 2 % |
| Sichtbare Pixel unmittelbar am Leinwandrand | 0 |
| Grünüberschuss >10 bei Alpha >11 | 0 Pixel |
| Silhouetten-IoU bei Alpha >127 | 0,9313; Neurendering, keine Behauptung pixelidentischer Federkonturen |

Visuell kontrolliert: gesamtes Bild bei 1254 × 1254 auf allen drei Hintergründen sowie der direkte Vergleich bei 440 × 440 px. Keine sichtbaren Grünreste, weißen Säume oder ausgeschnittenen Löcher. Alle Flügel- und Schwanzspitzen sowie Beuteextremitäten erhalten. Klippschliefer mit kurzen runden Ohren, kompaktem Körper, kurzen Beinen und ohne langen Schwanz; drei sichtbare Gliedmaßen, die weitere durch den Körper verdeckt, keine zusätzliche Gliedmaße. Beide Adlerfüße liegen plausibel greifend am oberen Rücken der Beute; keine losgelösten oder verschmolzenen Fänge. Komposition, Blickrichtung, Flügelstellung und relative Beuteposition visuell beibehalten; die erlaubte gemeinsame Rahmenanpassung ist oben vollständig angegeben.

Die technische und visuelle Eigenprüfung ist bestanden. Der ästhetische Vorschlag ist noch nicht vom Nutzer angenommen und wurde nicht eingebunden.

Vollansichten liegen als `hunting/klippenadler-work/current-full-{1,2,3}.png` und `proposal-full-{1,2,3}.png` vor; die Nummern entsprechen hell, dunkel, petrol.

## Exakte Prompts

Die Stil- und Hintergrundblöcke 1 und 3 aus `flight.md` sowie der Szenenblock aus `hunting.md` sind wörtlich enthalten. Art-/Beuteblock 4 und Auftragsblock 5 sind ausgefüllt. Nachfolgend die vollständigen tatsächlich übergebenen Prompts; Generation 03 ist der finale Prompt.

### Generation 01

```text
Use case: style-transfer. Edit input image 1 only.
Input 1: current hunting image, immutable composition and pose.
Input 2: user-accepted adult Verreaux's eagle flight image, PLUMAGE AND IDENTITY ONLY, never its pose.
Inputs 3 and 4: golden eagle and white-tailed eagle hunting scenes, RENDERING ONLY, never their anatomy, poses, prey or landscape.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply that photographic rendering to the entire hunting scene, eagle and hyrax alike.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Canvas: square 1254 x 1254. Preserve the original scene's full size, centre and bounding box within 2%. Keep all feather tips and all prey extremities complete, with a narrow green margin. Do not crop.

Raptor: Verreaux's eagle (Aquila verreauxii), adult, plumage exactly as in input image
2 (the species' active flight image). Prey: rock hyrax / dassie (Procavia capensis), exactly the individual and position in input 1.

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted, outlined feather rendering and the mismatched plumage. Match input 2's dark charcoal-black plumage, subtly brown-grey flight feathers with the same pale wing panels and natural muted barring, yellow cere and feet, and dark hooked bill, translated into the unchanged hunting pose.

STRICT INVARIANTS: retain the exact elevated near wing stretching to the upper-left corner, elevated far wing along the right edge, right-facing head, down-left fanned tail, both legs and both feet gripping the hyrax's upper back, and the right-facing hyrax at bottom right. No rotation, mirroring, reposing, landscape, additional animals or objects. Hyrax remains a compact, round-eared, short-legged, tailless rock hyrax, not a rabbit or rodent with a long tail; preserve natural visible limbs and partly occluded far limbs with no extra limbs. Talons must wrap plausibly around its back and flanks. Entire eagle and hyrax in focus. Natural photographic feather and fur texture, no drawn outlines or painterly strokes. The green background is only an extraction matte, not environmental lighting.
```

### Generation 02

```text
Use case: style-transfer. Edit input image 1 only.
Input 1: current hunting image, immutable composition and pose.
Input 2: user-accepted adult Verreaux's eagle flight image, PLUMAGE AND IDENTITY ONLY, never its pose.
Inputs 3 and 4: golden eagle and white-tailed eagle hunting scenes, RENDERING ONLY, never their anatomy, poses, prey or landscape.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply that photographic rendering to the entire hunting scene, eagle and hyrax alike.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Canvas: square 1254 x 1254. Preserve the original scene's full size, centre and bounding box within 2%. Keep all feather tips and all prey extremities complete, with a narrow green margin. Do not crop.

Raptor: Verreaux's eagle (Aquila verreauxii), adult, plumage exactly as in input image
2 (the species' active flight image). Prey: rock hyrax / dassie (Procavia capensis), exactly the individual and position in input 1.

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted, outlined feather rendering and the mismatched plumage. Match input 2's dark charcoal-black plumage, subtly brown-grey flight feathers with the same pale wing panels and natural muted barring, yellow cere and feet, and dark hooked bill, translated into the unchanged hunting pose.

STRICT INVARIANTS: retain the exact elevated near wing stretching to the upper-left corner, elevated far wing along the right edge, right-facing head, down-left fanned tail, both legs and both feet gripping the hyrax's upper back, and the right-facing hyrax at bottom right. No rotation, mirroring, reposing, landscape, additional animals or objects. Hyrax remains a compact, round-eared, short-legged, tailless rock hyrax, not a rabbit or rodent with a long tail; preserve natural visible limbs and partly occluded far limbs with no extra limbs. Talons must wrap plausibly around its back and flanks. Entire eagle and hyrax in focus. Natural photographic feather and fur texture, no drawn outlines or painterly strokes. The green background is only an extraction matte, not environmental lighting.

OUTPUT REQUIREMENT: Render an OPAQUE image with solid RGB (0,255,0) in every background pixel, including gaps between feathers and legs. Keep the vivid green background shown in these inputs. Do not output transparency or a black background. The reference inputs have only been composited on green for extraction; all their original geometry and subject pixels remain the references. Make the result read as a real high-end wildlife photograph, with organically irregular fine feather texture and soft diffuse daylight, removing the current painted feather outlines.
```

### Generation 03 – final

```text
Use case: style-transfer. Edit input image 1 only.
Input 1: current hunting image, immutable composition and pose.
Input 2: user-accepted adult Verreaux's eagle flight image, PLUMAGE AND IDENTITY ONLY, never its pose.
Inputs 3 and 4: golden eagle and white-tailed eagle hunting scenes, RENDERING ONLY, never their anatomy, poses, prey or landscape.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply that photographic rendering to the entire hunting scene, eagle and hyrax alike.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Canvas: square 1254 x 1254. Preserve the original scene's full size, centre and bounding box within 2%. Keep all feather tips and all prey extremities complete, with a narrow green margin. Do not crop.

Raptor: Verreaux's eagle (Aquila verreauxii), adult, plumage exactly as in input image
2 (the species' active flight image). Prey: rock hyrax / dassie (Procavia capensis), exactly the individual and position in input 1.

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted, outlined feather rendering and the mismatched plumage. Match input 2's dark charcoal-black plumage, subtly brown-grey flight feathers with the same pale wing panels and natural muted barring, yellow cere and feet, and dark hooked bill, translated into the unchanged hunting pose.

STRICT INVARIANTS: retain the exact elevated near wing stretching to the upper-left corner, elevated far wing along the right edge, right-facing head, down-left fanned tail, both legs and both feet gripping the hyrax's upper back, and the right-facing hyrax at bottom right. No rotation, mirroring, reposing, landscape, additional animals or objects. Hyrax remains a compact, round-eared, short-legged, tailless rock hyrax, not a rabbit or rodent with a long tail; preserve natural visible limbs and partly occluded far limbs with no extra limbs. Talons must wrap plausibly around its back and flanks. Entire eagle and hyrax in focus. Natural photographic feather and fur texture, no drawn outlines or painterly strokes. The green background is only an extraction matte, not environmental lighting.

OUTPUT REQUIREMENT: Render an OPAQUE image with solid RGB (0,255,0) in every background pixel, including gaps between feathers and legs. Keep the vivid green background shown in these inputs. Do not output transparency or a black background. The reference inputs have only been composited on green for extraction; all their original geometry and subject pixels remain the references. Make the result read as a real high-end wildlife photograph, with organically irregular fine feather texture and soft diffuse daylight, removing the current painted feather outlines.

PHOTOGRAPHIC RECONSTRUCTION PRIORITY: Input 1 is a geometry template, NOT a surface-rendering template. Replace its painted surfaces completely with realistic photographed feather and fur surfaces while retaining its exact silhouette, pose and anatomy. Remove the dark ink-like boundaries around individual coverts and primary shafts. Feathers should merge in soft natural overlapping groups, with fine irregular vane detail only where visible, naturally smooth charcoal areas and realistic gentle light falloff. No regimented leaf-shaped feather scales, no etched lines, no feather-by-feather outlined illustration. Keep black plumage matte black rather than light grey. Use the photographic surface realism of input 2. The hyrax must have real fine fur with softly grouped hairs, natural reflective eyes and short rounded ears. Make this a believable frozen wildlife photograph of the exact input-1 action, isolated against an opaque pure-green extraction matte.
```

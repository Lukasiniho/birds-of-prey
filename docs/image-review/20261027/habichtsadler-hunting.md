# Habichtsadler – Jagdbild-Vorschlag

Stand: 27. Oktober 2026. Nur Vorschlag; keine Einbindung. Eine Generierung von maximal vier verwendet. AGENTS.md, docs/vogelbild-standard.md, docs/image-prompts/hunting.md, docs/image-prompts/flight.md und docs/portrait-user-refinements-20260913/extract.py gelesen.

## Ergebnis

- RGBA-PNG: [hunting/habichtsadler.png](hunting/habichtsadler.png), 1254 × 1254, SHA-256: `c495f19a1ae627b49a0821a47d1635e2b468c0bef5c5f584267f4f7b06e1347f`.
- Vergleich, links aktuell / rechts Vorschlag, jeweils 384 px auf #e8e8e4, #22282a, #2d7f7a: [habichtsadler-hunting-check.png](habichtsadler-hunting-check.png).
- Darstellung: weichere, weniger hart konturierte Federzeichnung; aufgehellte, feiner gefleckte Unterflügeldecken gemäß akzeptiertem Flugbild. Jagdpose und nach rechts gerichteter Blick bleiben erhalten. Kaninchen unverändert als Beute rechts unten. Keine zusätzlichen Varianten.

## Quellen und Referenzrollen

1. `public/birds/hunting-habichtsadler.png`
   - Rolle: Bearbeitungsziel; alleinige Kompositions-, Pose-, Beute- und Rahmenreferenz.
   - SHA-256: `621ebd93b84b9079be332da59459c5e9978314106efbc626844642bcb076d48a`.

2. `outputs/proposals/flight/habichtsadler/male.png`
   - Rolle: Vom Nutzer akzeptiertes adultes Original; ausschließlich Gefieder und Identität, keine Pose.
   - SHA-256: `d2fe8c745f60554134749339e20efc815bc06288c2f50484a4831e480642b350`.

3. `public/hunting-steinadler.png`
   - Rolle: Nur Rendering/Bildsprache; keine Anatomie, Pose oder Beute.
   - SHA-256: `559bde6f567a4479d4add1422bd5f1cd71f0d5e2830d9dd7887a7f298aaebb86`.

4. `public/hunting-seeadler.png`
   - Rolle: Nur Rendering/Bildsprache; keine Anatomie, Pose oder Beute.
   - SHA-256: `2c7e0193ba86fe21c1cad55096cfe7680991c8d697c201d30c5288c280006f07`.

Die beiden vom Nutzer vorgegebenen Prüfsummen stimmen exakt überein. Das Jagdbild ist in lib/hunting-images.ts unter habichtsadler zugeordnet. Das explizit akzeptierte Flugbild wurde entsprechend dem Auftrag gegenüber der allgemeinen Regel zur aktiven Flugzuordnung als Gefiederreferenz verwendet.

## Generierungsweg

Built-in image_gen.imagegen, Bearbeitung mit vier lokalen Referenzen in obiger Reihenfolge. Kein CLI/API-Fallback. Ein Aufruf; danach ausschließlich lokale Freistellung.

- Automatischer Ablagepfad des Bildwerkzeugs: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17ec2-c3b9-7fc1-9add-d74dce1ebb30/exec-6c93ada4-e746-44b9-b36d-097dd90c14f6.png`.
- Lokale unveränderte Generierung: `outputs/proposals/habichtsadler-hunting-work/generation-1.png`.
- Generierung SHA-256: `96a1e22630a82a8c00d7952bde6f80eb16d7a4bd89179b367871634139d16612`.
- Promptdatei: `outputs/proposals/habichtsadler-hunting-work/prompt-1.txt`.
- Alle selbst angelegten Projektdateien liegen unter outputs/proposals/. Der externe Standardablagepfad wird automatisch vom Bildwerkzeug verwaltet.

## Exakter finaler Prompt

Die Blöcke 1 und 3 aus flight.md sowie der Szenenblock aus hunting.md wurden programmgesteuert wörtlich übernommen; Art-/Beute- und Auftragsblock sind ausgefüllt.

```text
Use case: style-transfer. Edit one existing hunting scene; this is a proposal only.
Input image 1: current hunting image, the sole authority for composition, pose, prey position, silhouette and framing.
Input image 2: user-accepted adult Bonelli’s eagle flight image, PLUMAGE AND IDENTITY ONLY, never pose.
Input images 3 and 4: golden eagle and white-tailed eagle hunting images, RENDERING ONLY, never species identity, anatomy, pose or scene elements.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

The preceding photographic style applies to the entire hunting scene, both the raptor and the rabbit.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Bonelli’s eagle (Aquila fasciata), adult, plumage exactly as in input image
2 (the species' user-accepted adult flight image). Prey: European rabbit (Oryctolagus cuniculus).

Re-render of input image 1 (the current hunting image): keep composition, pose,
prey, prey position, wing positions, canvas, scale and position. Change only
the rendering to the style above and correct the overly painted, outlined, high-contrast feather texture and plumage mismatches with input image 2.

PLUMAGE: Match image 2’s natural warm off-white underside with fine separated brown streaking, softly layered mottled brown underwing coverts, naturally grey flight feathers with subdued dark barring and dark tips, brown streaked head, yellow cere and feet, dark hooked beak. Avoid the oversized crisply outlined dark feather plates and heavy repetitive markings of image 1. Do not change anatomical proportions or geometry. Preserve the ORIGINAL rightward gaze; the flight reference must not change it.
COMPOSITION LOCK: Square 1254 x 1254 canvas. Exact original arrangement: broad near wing rising to the upper left, far wing curved up to the upper right; eagle head at centre-right facing right; tail fanned toward lower-left; both yellow feet grip the complete rabbit at lower-right. Keep every primary tip, tail tip, both rabbit ears, its complete hind feet and short tail. Preserve the rabbit’s original position, scale, orientation and natural four-limb anatomy with plausible occlusion. No added limbs, no fused talons, no detached digits. No habitat fragment, no ground, no contact shadow, no new objects. The opaque scene bounds must match input 1: approximately x=35..1234, y=22..1213 on 1254 square, within 2 percent in size and centre. Preserve internal landmarks and silhouettes, not just overall bounds. Match the original close framing without cutting any tip. The green background must be perfectly flat #00FF00 in every empty area and gap, no green light on subjects. No typography, borders or watermark. Output a single complete scene.
```

## Lokale Bearbeitung

Reproduzierbar mit `node outputs/proposals/habichtsadler-hunting-work/process.cjs`. Python-Pillow fehlte; deshalb Node und das bereits installierte sharp. Keine Installation und keine Ausführung des ursprünglichen extract.py, das außerhalb des erlaubten Ausgabebereichs schreiben würde.

1. PNG unverändert von der automatischen Werkzeugablage in den Vorschlags-Arbeitsordner kopiert. Die Generierung hat bereits 1254 × 1254 Pixel. Kein Zuschneiden, Skalieren, Verschieben, Verformen, keine Übernahme einer fremden Alphamaske.
2. Verfahren aus extract.py nach JavaScript übertragen: Randmedian als Hintergrundfarbe, gemessen RGB (5, 248, 5), obwohl reines #00FF00 angefordert war; Grünüberschuss G − max(R,B); Alpha aus 1 − Überschuss/Hintergrundüberschuss; Überschuss < 10 auf deckend, Alpha < 0,045 auf transparent.
3. Größte zusammenhängende Szene bei Alpha > 0,15, 8er-Nachbarschaft, plus 5 × 5 erweiterte Umgebung gegen isoliertes Mattenrauschen.
4. Konturkorrektur: saubere deckende Innenpixel mit einer vollständig deckenden 5 × 5 Umgebung als Farbreferenz; nächste Innenfarbe entlang der Szene ermittelt. Gemischte Randpixel mit deren Grünüberschuss neu entmischt. Hintergrundanteil aus RGB entfernt. Randfarbton aus dieser Innenfarbe rekonstruiert, eigene Luminanz erhalten und auf maximal 105 % der Referenzluminanz begrenzt, um grüne beziehungsweise helle Farbsäume zu vermeiden. Alpha wird dabei nicht erodiert.
5. Transparente Pixel RGB=0; finales PNG mit vier Kanälen. Niemals Weiß-/Grau-Key, keine pauschale Entfernung heller Federn oder Fellbereiche. Mehrere lokale Mattenkorrekturen, keine weiteren Generierungen.
6. Vergleichsbogen und unskalierte Vollansichten für alle drei Hintergründe erzeugt; zusätzliche 256-px-Ansicht sowie 2×-Detailansichten von Spitzen, Kaninchen und Fängen.

## Prüfung und Einschränkung

Visuell bei 1254 × 1254 auf allen drei Hintergründen und bei 384 px geprüft, zusätzlich 256 px und Detailausschnitte: Vogel mit allen Flügel-/Schwanzspitzen vollständig; Kaninchen mit beiden Ohren, vier plausibel angeordneten Gliedmaßen und kurzem Schwanz vollständig. Fänge liegen plausibel um Rücken/Schulterbereich. Keine abgeschnittenen Spitzen, keine sichtbaren Löcher im Körper, keine erkennbaren grünen Hintergrundreste oder flächigen weißen Halos. Die natürlichen hellen Federränder bleiben erhalten. Es handelt sich weiterhin um eine generierte fotografischere Darstellung; keine echte Aufnahme.

Technisch: vier Kanäle, Alpha 0–255; 0 nichttransparente Pixel am Leinwandrand; 0 Pixel mit Alpha > 16 und Grünüberschuss > 10 nach der Entmischung. Diese Zahlen ersetzen nicht die visuelle Prüfung. Komposition und innere Anordnung visuell erhalten; keine behauptete Pixelidentität bei einem Neu-Rendering.

| Messung | Original | Vorschlag | Abweichung |
|---|---|---|---|
| Szenenbegrenzung, Alpha > 16 | x 35–1234; y 22–1213 | x 34–1238; y 19–1218 | Breite +0.417 %, Höhe +0.671 % |
| Mittelpunkt, Alpha > 16 | 634.5, 617.5 | 636, 618.5 | 0.120 % / 0.080 % der Leinwand |
| Gesamte Roh-Alpha-Begrenzung, Alpha > 0 | x 0–1237; y 17–1253 | x 34–1238; y 19–1218 | Breite -2.666 %, Höhe -2.991 % |

**Die 2-%-Vorgabe ist für die sichtbare Szenenbegrenzung erfüllt, für die wörtliche Roh-Alpha-Begrenzung über jeden Wert > 0 jedoch nicht.** Das Original enthält schwach transparente Restpixel außerhalb der sichtbaren Szene bis x=0 und y=1253. Diese wurden nicht künstlich in den Vorschlag eingefügt; auch wurde die Szene nicht vergrößert, um die Restpixelgrenzen nachzuahmen. Deshalb keine uneingeschränkte technische Gesamtabnahme. Die abweichende Roh-Alpha-Messung bleibt ausdrücklich offen.

Messdaten: [metrics.json](habichtsadler-hunting-work/metrics.json), [alpha-check.json](habichtsadler-hunting-work/alpha-check.json). Vollansichten: `habichtsadler-hunting-work/proposal-{light,dark,teal}-full.png`; entsprechende aktuelle Vergleichsbilder liegen daneben.

public/, lib/, app/, tests/ und docs/ wurden nicht bearbeitet. Keine Anwendungseinbindung, kein images-Build und keine neuen Geschlechts-/Alters-/Morphenvarianten.


# Round 2

Runde 1 wurde vom Nutzer mit „still too painted wtf???“ verworfen. Die vorstehenden Bewertungen aus Runde 1 sind keine Abnahme. Diese Runde ist eine vollständige Neuerstellung des vorhandenen Jagdmotivs, ausschließlich als Vorschlag. Keine Änderungen an public/, lib/, app/, tests/ oder docs/, keine neuen Art-, Alters-, Morphen- oder Geschlechtsvarianten. AGENTS.md, docs/vogelbild-standard.md und beide Promptdateien wurden gelesen. Für diesen konkreten Auftrag gelten die ausdrücklich gewünschten fotografische Darstellung, Blickrichtung rechts und erhobenen Flügel.

## Ergebnis und Auswahl

Vier unabhängige Generierungen mit dem eingebauten image_gen-Werkzeug, keine CLI/API-Fallbacks. Keine der vier Generierungen verwendet das alte Jagdbild oder einen zuvor generierten Kandidaten als Bearbeitungsgrundlage. Das alte Jagdbild wurde nur lokal für Motiv und ungefähren Rahmen angesehen. Gewählt wurde **Generierung 4**, gespeichert als [habichtsadler.png](hunting/habichtsadler.png). [Aktualisierter Prüfbogen](habichtsadler-hunting-check.png), [Vergleich aller vier Kandidaten bei 440 px](habichtsadler-hunting-r2/candidates-440.png).

- G1: vollständige Szene; Schwingen zu marmoriert, Halsstruktur zu regelmäßig.
- G2: etwas weichere Ferne, aber weiterhin schwache Querbänderung und betonte Halsfederkanten.
- G3: passendere graue Querbänderung; Kaninchen länglicher und gestreckter, engerer Rahmen.
- G4: beste Gesamtbalance aus fotografischem Fell, vollständiger Beute, plausibler Griffanordnung, dunklem Unterflügelband, grauer Bänderung und passendem Rahmen. Keine lokalen Retuschen an Anatomie oder Gefieder.

**Stilabnahme bleibt offen:** Der Vorschlag fügt sich bei 440 px in Licht, Farbigkeit und Detailgrad der drei vorgegebenen Jagdreferenzen ein. Bei voller Auflösung bleiben besonders an Hals und ferner Flügelschulter regelmäßig hell betonte, teilweise schuppenartig wirkende Federkanten sichtbar. Die absolute Anforderung „keine umrandeten/schuppenartigen Federn, kein Illustrationslook“ ist deshalb nach vier Versuchen nicht vollständig erreicht. Das Limit von vier Generierungen wurde eingehalten; keine uneingeschränkte fotografische Abnahme behauptet. Es handelt sich um das ausgewählte generierte Vorschlagsbild, nicht um eine echte Kameraaufnahme.

## Referenzen und Herkunft

Input 1 in allen Aufrufen: public/birds/habichtsadler-20261027.png, nur Gefieder und Artidentität; aktuelle Zuordnung in lib/bird-images.ts bestätigt. Inputs 2–4 in allen Aufrufen: Klippenadler, Zwergadler, Iberienadler aus outputs/proposals/hunting/, nur Rendering. Input 5 ausschließlich bei G4: vorhandener Browser-Bildnachweis einer echten Aufnahme von Frédéric Pelsy unter outputs/proposals/flight/habichtsadler/work/anatomy-pelsy-browser.png, ergänzend für echte Federtextur und anatomischen Vergleich, nicht als Pose oder Hintergrund. Diese Aufnahme wurde vor G3/G4 visuell betrachtet. Die zusätzliche Web-Bildsuche lieferte Treffer, deren Vollbilder hier nicht abrufbar waren; daraus wurde keine visuelle Prüfung behauptet. Die lokale Pelsy-Aufnahme und die akzeptierte Flugreferenz waren die tatsächlich gesehenen Artvergleiche.

Das aktive alte Jagdbild ist laut lib/hunting-images.ts public/birds/hunting-habichtsadler.png. Beide vom Nutzer genannten SHA256-Werte stimmen vor und nach der Arbeit überein. Vollständige Referenzprüfsummen:

| Quelle | SHA256 |
|---|---|
| public/birds/habichtsadler-20261027.png | d2fe8c745f60554134749339e20efc815bc06288c2f50484a4831e480642b350 |
| public/birds/hunting-habichtsadler.png | 621ebd93b84b9079be332da59459c5e9978314106efbc626844642bcb076d48a |
| outputs/proposals/hunting/klippenadler.png | 298c2e69b70c343e1b367b911affddbbd948ff033cd8ccc8692a2547798014f0 |
| outputs/proposals/hunting/zwergadler.png | bacf6402b6c1ca7f9c176a91769e944b7c782bbe90f928ecac64907f2ee7024f |
| outputs/proposals/hunting/iberienadler.png | c12c0e468a99412f00d83293e0be9d1856e33b2f697307d845b7af5133f941cc |
| outputs/proposals/flight/habichtsadler/work/anatomy-pelsy-browser.png | 5408cc0cd433f9c6ba1987f97bbcad83ccb8254f78ea8fbeaabf04950f11f216 |

Finaler SHA256: a9c3792a8a27fd0d49b7ad5fa65f85ae0ae6a406dcefe908807d90b044911b28.

## Lokale Freistellung und Dateien

1. Die automatisch vom eingebauten Werkzeug gespeicherten Rohbilder wurden unverändert nach habichtsadler-hunting-r2/generation-1.png bis generation-4.png kopiert. Alle expliziten Projekt-Schreiboperationen bleiben unter outputs/proposals/. Die automatische Werkzeugablage liegt technisch unter .codex/generated_images; sie wurde nur gelesen.
2. Alle vier Bilder kamen bereits mit 1254 × 1254 Pixeln. Freistellung mit Node + vorhandenem sharp, reproduzierbar durch process.cjs mit Kandidatennummer 1–4. Keine Installation, kein Weiß-/Grau-Key und keine fremde Alpha-Maske.
3. Hintergrund anhand des Randmedians bestimmt. Bei G4 RGB (5, 249, 3), trotz angefordertem #00FF00. Alpha aus dem Grünüberschuss G − max(R,B), auf den gemessenen Hintergrundüberschuss normiert. Überschuss unter 10 zunächst deckend, Alpha unter 0,045 transparent.
4. Größte verbundene Szene mit Alpha > 0,15 und einer 5 × 5 erweiterten Umgebung erhalten; isoliertes Hintergrundrauschen verworfen. Helle Federn und Fell wurden nicht nach Helligkeit entfernt.
5. Gemischte Konturpixel anhand benachbarter sauberer Innenpixel entmischt. Hintergrundanteil aus RGB entfernt; Konturfarbton aus benachbarter Innenfarbe mit eigener Luminanz und Begrenzung auf 105 % der Referenzluminanz rekonstruiert. Kein globales Weichzeichnen, keine Alpha-Erosion.
6. Volltransparente Pixel auf RGB=0 gesetzt; PNG mit echtem Alpha. Keine Skalierung, kein Zuschnitt, keine Verschiebung oder Verzerrung. G4 wurde ohne weitere Pixeländerung an den geforderten Zielpfad kopiert.
7. finish.cjs erstellt den Prüfbogen, Vollansichten, 440-px-Ansichten, direkte Paarvergleiche mit jeder Stilreferenz und 2×-Detailansichten. qa.json hält Maße, Transparenz und Prüfsummen fest. Die Rohbilder, exakten Prompts und alle vier freigestellten Kandidaten bleiben im R2-Arbeitsordner nachvollziehbar erhalten.

## Prüfung

Selbst visuell geprüft: ausgewähltes Bild bei voller 1254-px-Auflösung auf #e8e8e4, #22282a und #2d7f7a; außerdem bei exakt 440 px auf allen drei Hintergründen. Alle drei Stilreferenzen bei voller Auflösung und als direkte 440-px-Paarvergleiche angesehen. Zusätzliche 2×-Details von Kopf/Hals, Fängen/Kaninchen und Flügelspitzen kontrolliert.

- Vollständiger rechtsgerichteter Adler mit allen Flügel- und Schwanzspitzen, plausible zusammenhängende Flügelansätze und perspektivische Überdeckung. Zwei Füße greifen Rücken/Schulterbereich des Kaninchens.
- Kaninchen mit zwei Ohren, vier Gliedmaßen und kurzem Schwanz vollständig, keine sichtbaren zusätzlichen Gliedmaßen, kein Blut. Fänge liegen über dem Fell und krümmen sich plausibel darum; die Abbildung ersetzt keine fachliche zoologische Einzelabnahme.
- Weißlicher Körper mit feiner dunkler Längsstrichelung; zusammenhängendes dunkles Unterflügelband, graue gebänderte Schwungfedern und heller Schwanz mit dunklem Abschlussband. Kein überwiegend heller Flügel mit isolierten großen braunen Flecken wie bei Runde 1.
- Keine sichtbaren Löcher in Körper oder Beute, keine sichtbaren grünen Säume oder flächigen Hintergrundreste auf den drei Prüffarben. Natürliche helle Feder- und Fellkanten bleiben erhalten. Kleine weiche Strukturen an Flaum und Schnurrhaaren sind nicht als geometrische harte Kontur behandelt.
- Stil-Einschränkung am Hals und an der fernen Flügelschulter ausdrücklich oben festgehalten. Transparenz und Maße sind bestanden; die uneingeschränkte Stilvorgabe nicht.

| Technische Prüfung | Ergebnis |
|---|---|
| Leinwand | 1254 × 1254, RGBA |
| Alpha > 0 | x 34–1226, y 16–1209; 1193 × 1194 = 95,14 % × 95,22 % |
| Alpha > 16 | x 34–1226, y 16–1208; 1193 × 1193 = 95,14 % × 95,14 % |
| Abstand zum Rand, Alpha > 0 | links 34, oben 16, rechts 27, unten 44 px |
| Sichtbare Größe gegenüber altem Motiv | Breite −0,58 %, Höhe +0,08 % |
| Nichttransparente Leinwandrandpixel | 0 |
| Pixel mit Alpha > 16 und Grünüberschuss > 10 | 0 |
| Voll deckend / teilweise transparent / transparent | 657895 / 20648 / 893973 |
| Prompt-Bausteine | flight.md Blöcke 1 und 3 sowie hunting.md Szenenblock in allen vier Prompts wortgleich geprüft |
| Re-render-Block 5 | in keinem Prompt enthalten |

Die gerundete Vorgabe etwa 0,96 × 0,95 wird ohne Verzerrung angenähert. Die gegenüber dem alten Bild minimal geringere Breite bleibt offen ausgewiesen. Die schwachen Roh-Alpha-Streupixel des alten Bildes bis zum Leinwandrand wurden nicht nachgebildet.

Reproduktion: node outputs/proposals/habichtsadler-hunting-r2/process.cjs 4, danach node outputs/proposals/habichtsadler-hunting-r2/finish.cjs. Alle Assertions bestanden. Der abschließende git-status entspricht dem bei Arbeitsbeginn bestehenden Stand außerhalb outputs/proposals/; vorhandene fremde Änderungen wurden belassen.

## Exakte Prompts

Die folgenden Texte sind die vollständigen Tool-Prompts; die Referenzreihenfolge steht jeweils oben und wurde wie dokumentiert über referenced_image_paths übergeben.

### Generierung 1

```text
Use case: photorealistic-natural. NEW GENERATION of a wildlife-photographic hunting scene, not an edit or tracing of any previous hunting picture.
Input image 1: user-accepted Bonelli's Eagle flight image, PLUMAGE AND SPECIES IDENTITY ONLY. Do not copy its pose or flight direction.
Input images 2, 3, 4: accepted hunting photographs of Verreaux's Eagle, Booted Eagle and Spanish Imperial Eagle, RENDERING ONLY. Match their photographic feather texture, optical softness and diffuse lighting; never copy their species features or prey.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic style to the entire scene: eagle, rabbit, feet and fur.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Bonelli's Eagle (Aquila fasciata), adult, plumage exactly as in input image
1 (the species' active flight image). Prey: European rabbit (Oryctolagus cuniculus).

NEW SCENE: A living adult Bonelli's Eagle lifting and carrying one whole European rabbit in both talons. Both wings raised during an upstroke; head and focused gaze point toward image RIGHT. Camera sees the white chest and underside of the nearer raised wing, with coherent three-quarter anatomy and natural far-wing foreshortening. Near wing extends toward upper left, far wing toward upper right, pale fanned tail trails lower left, rabbit hangs below the feet toward lower right. A fresh natural pose, no obligation to copy the exact old pose. One continuous body, anatomically connected shoulders, elbows and wrists. Realistic weight bearing: two feet grip the rabbit's back and shoulders, toes wrap into fur, black talon tips visible without punctures. Rabbit complete with two ears, four anatomically plausible legs (natural partial occlusion permitted), short fluffy tail; ordinary grey-brown European rabbit, realistic size in relation to the eagle. No blood, wounds, gore, ground, landscape fragment, or other objects.

PLUMAGE IS CRITICAL: white/off-white body with fine irregular dark lengthwise streaks, NOT broad brown blotches. A continuous conspicuously DARK BROWN band across the median/greater UNDERWING COVERTS as in input 1, distinctly contrasting with paler finely streaked lesser coverts. Grey flight feathers with subtle darker transverse barring and dark primary tips; pale grey tail with broad dark terminal/subterminal band. Brown finely streaked head, yellow cere, dark hooked bill and yellow feet. Avoid a mostly pale wing with scattered big brown spots. Never substitute the plumage of the three rendering references.

PHOTOGRAPHIC FINISH: a high-resolution professional wildlife camera exposure at 1/2500 sec, soft natural light, feather surfaces merging naturally into fine soft vane texture and irregular down, realistic subtle focus falloff. Absolutely no scale-like contour feathers, no decorative tessellated feather plates, no outlined feathers, no hand-painted brushwork, no stippled illustration, no bright drawn feather borders. Match the photographic series of inputs 2–4 while preserving the identity in input 1.

FRAMING: square canvas 1254x1254. Complete scene occupies about 96% of width and 95% of height, centered around x=634, y=618: target bounds approximately x=33..1235, y=22..1213. Every wingtip, tail tip, rabbit ear and paw fully inside with a small clear green margin. Nothing touches any canvas edge. Background uniformly #00FF00 in all empty spaces and between feathers, no shadows, text, watermark or border. Single image.
```

### Generierung 2

```text
Use case: photorealistic-natural. NEW GENERATION of a wildlife-photographic hunting scene, not an edit or tracing of any previous hunting picture.
Input image 1: user-accepted Bonelli's Eagle flight image, PLUMAGE AND SPECIES IDENTITY ONLY. Do not copy its pose or flight direction.
Input images 2, 3, 4: accepted hunting photographs of Verreaux's Eagle, Booted Eagle and Spanish Imperial Eagle, RENDERING ONLY. Match their photographic feather texture, optical softness and diffuse lighting; never copy their species features or prey.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic style to the entire scene: eagle, rabbit, feet and fur.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Bonelli's Eagle (Aquila fasciata), adult, plumage exactly as in input image
1 (the species' active flight image). Prey: European rabbit (Oryctolagus cuniculus).

NEW SCENE: A living adult Bonelli's Eagle lifting and carrying one whole European rabbit in both talons. Both wings raised during an upstroke; head and focused gaze point toward image RIGHT. Camera sees the white chest and underside of the nearer raised wing, with coherent three-quarter anatomy and natural far-wing foreshortening. Near wing extends toward upper left, far wing toward upper right, pale fanned tail trails lower left, rabbit hangs below the feet toward lower right. A fresh natural pose, no obligation to copy the exact old pose. One continuous body, anatomically connected shoulders, elbows and wrists. Realistic weight bearing: two feet grip the rabbit's back and shoulders, toes wrap into fur, black talon tips visible without punctures. Rabbit complete with two ears, four anatomically plausible legs (natural partial occlusion permitted), short fluffy tail; ordinary grey-brown European rabbit, realistic size in relation to the eagle. No blood, wounds, gore, ground, landscape fragment, or other objects.

PLUMAGE IS CRITICAL: white/off-white body with fine irregular dark lengthwise streaks, NOT broad brown blotches. A continuous conspicuously DARK BROWN band across the median/greater UNDERWING COVERTS as in input 1, distinctly contrasting with paler finely streaked lesser coverts. Grey flight feathers with subtle darker transverse barring and dark primary tips; pale grey tail with broad dark terminal/subterminal band. Brown finely streaked head, yellow cere, dark hooked bill and yellow feet. Avoid a mostly pale wing with scattered big brown spots. Never substitute the plumage of the three rendering references.

PHOTOGRAPHIC FINISH: a high-resolution professional wildlife camera exposure at 1/2500 sec, soft natural light, feather surfaces merging naturally into fine soft vane texture and irregular down, realistic subtle focus falloff. Absolutely no scale-like contour feathers, no decorative tessellated feather plates, no outlined feathers, no hand-painted brushwork, no stippled illustration, no bright drawn feather borders. Match the photographic series of inputs 2–4 while preserving the identity in input 1.

FRAMING: square canvas 1254x1254. Complete scene occupies about 96% of width and 95% of height, centered around x=634, y=618: target bounds approximately x=33..1235, y=22..1213. Every wingtip, tail tip, rabbit ear and paw fully inside with a small clear green margin. Nothing touches any canvas edge. Background uniformly #00FF00 in all empty spaces and between feathers, no shadows, text, watermark or border. Single image.


Priority for this independent NEW generation: make this look like an actual unretouched telephoto camera photograph of a living eagle, not a highly detailed bird illustration. Keep feather boundaries softly merging, especially neck, upperwing and breast. The head and neck must have tiny irregular filament-like streaking, NOT repeated pointed brown diamonds or scale-shaped outlined feathers. No uniform pale rims around feather plates. Fine details should have natural photographic variation, subtle uneven optical sharpness, slightly messy down and matte diffuse surfaces. Broad dark underwing band should read as one softly textured dark band. Show subtle grey flight-feather barring without decorative marbling. Preserve all species, prey, square framing and rightward hunting direction requirements above. Reduce hard engraved texture and feather-by-feather decorative rendering markedly. A real wildlife camera exposure, absolutely no illustration finish.
```

### Generierung 3

```text
Use case: photorealistic-natural. NEW GENERATION of a wildlife-photographic hunting scene, not an edit or tracing of any previous hunting picture.
Input image 1: user-accepted Bonelli's Eagle flight image, PLUMAGE AND SPECIES IDENTITY ONLY. Do not copy its pose or flight direction.
Input images 2, 3, 4: accepted hunting photographs of Verreaux's Eagle, Booted Eagle and Spanish Imperial Eagle, RENDERING ONLY. Match their photographic feather texture, optical softness and diffuse lighting; never copy their species features or prey.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic style to the entire scene: eagle, rabbit, feet and fur.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Bonelli's Eagle (Aquila fasciata), adult, plumage exactly as in input image
1 (the species' active flight image). Prey: European rabbit (Oryctolagus cuniculus).

NEW SCENE: Photograph a living adult Bonelli's Eagle carrying one entire European rabbit securely in both feet, captured during an actual wingbeat with both wings elevated. Eagle head and gaze point RIGHT. Natural three-quarter view showing chest and wing undersides. The eagle is leaning into flight with relaxed, softly ruffled chest plumage, anatomically believable shoulder and wrist joints and natural foreshortening of the distant wing. Rabbit hangs naturally under the feet to the lower right, tail trails lower left. A fresh asymmetric camera-captured pose rather than a heraldic symmetrical display. Plausible weight-bearing feet gripping rabbit back and shoulders. Complete rabbit with two ears, four limbs and short tail; complete eagle. No blood, wounds, ground or other objects.

PLUMAGE IS CRITICAL: white/off-white body with fine irregular dark lengthwise streaks, NOT broad brown blotches. A continuous conspicuously DARK BROWN band across the median/greater UNDERWING COVERTS as in input 1, distinctly contrasting with paler finely streaked lesser coverts. Grey flight feathers with subtle darker transverse barring and dark primary tips; pale grey tail with broad dark terminal/subterminal band. Brown finely streaked head, yellow cere, dark hooked bill and yellow feet. Avoid a mostly pale wing with scattered big brown spots. Never substitute the plumage of the three rendering references.

PHOTOGRAPHIC FINISH: a high-resolution professional wildlife camera exposure at 1/2500 sec, soft natural light, feather surfaces merging naturally into fine soft vane texture and irregular down, realistic subtle focus falloff. Absolutely no scale-like contour feathers, no decorative tessellated feather plates, no outlined feathers, no hand-painted brushwork, no stippled illustration, no bright drawn feather borders. Match the photographic series of inputs 2–4 while preserving the identity in input 1.

FRAMING: square canvas 1254x1254. Complete scene occupies about 96% of width and 95% of height, centered around x=634, y=618: target bounds approximately x=33..1235, y=22..1213. Every wingtip, tail tip, rabbit ear and paw fully inside with a small clear green margin. Nothing touches any canvas edge. Background uniformly #00FF00 in all empty spaces and between feathers, no shadows, text, watermark or border. Single image.


Critical photographic correction: the close left wing flight feathers must be cool GREY with fine narrow transverse DARK BARS, like image 1, never mottled white patches or white marbled shafts from the other species. Neck and small body feathers have soft irregular real feather filaments, not a carpet of diamond-shaped outlined scales. The dark underwing band is deep charcoal brown and has soft overlaps. Soft overcast light, lower microcontrast, no golden edge tracing on any covert. Make it as optically natural and unstylized as a field photographer's camera frame; feather pattern naturally irregular, never ornamental. The rabbit is real camera-textured fur, with larger hindquarters and four articulated legs, no duplicated limbs. Photographic realism is the first selection criterion.
```

### Generierung 4

```text
Use case: photorealistic-natural. NEW GENERATION of a wildlife-photographic hunting scene, not an edit or tracing of any previous hunting picture.
Input image 1: user-accepted Bonelli's Eagle flight image, PLUMAGE AND SPECIES IDENTITY ONLY. Do not copy its pose or flight direction.
Input image 5: real field photograph of Bonelli's Eagle by Frédéric Pelsy. Supporting reference for ACTUAL FEATHER TEXTURE and anatomically coherent wings; ignore its pose, camera direction, sky, black margins and watermark. No part of that photograph is to be composited into the output.
Input images 2, 3, 4: accepted hunting photographs of Verreaux's Eagle, Booted Eagle and Spanish Imperial Eagle, RENDERING ONLY. Match their photographic feather texture, optical softness and diffuse lighting; never copy their species features or prey.

Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Apply this photographic style to the entire scene: eagle, rabbit, feet and fur.

One isolated hunting scene: the raptor in its species-typical hunting action
with anatomically correct, real-size prey of a species it actually takes.
Talons grip the prey plausibly; prey anatomy, fur or feathers equally
photographic. Complete raptor including every wing and tail tip; prey complete.
Optional small natural habitat fragment only where it explains the hunt. No
blood, no gore.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Raptor: Bonelli's Eagle (Aquila fasciata), adult, plumage exactly as in input image
1 (the species' active flight image). Prey: European rabbit (Oryctolagus cuniculus).

NEW SCENE: Photograph a living adult Bonelli's Eagle carrying one entire European rabbit securely in both feet, captured during an actual wingbeat with both wings elevated. Eagle head and gaze point RIGHT. Natural three-quarter view showing chest and wing undersides. The eagle is leaning into flight with relaxed, softly ruffled chest plumage, anatomically believable shoulder and wrist joints and natural foreshortening of the distant wing. Rabbit hangs naturally under the feet to the lower right, tail trails lower left. A fresh asymmetric camera-captured pose rather than a heraldic symmetrical display. Plausible weight-bearing feet gripping rabbit back and shoulders. Complete rabbit with two ears, four limbs and short tail; complete eagle. No blood, wounds, ground or other objects.

PLUMAGE IS CRITICAL: white/off-white body with fine irregular dark lengthwise streaks, NOT broad brown blotches. A continuous conspicuously DARK BROWN band across the median/greater UNDERWING COVERTS as in input 1, distinctly contrasting with paler finely streaked lesser coverts. Grey flight feathers with subtle darker transverse barring and dark primary tips; pale grey tail with broad dark terminal/subterminal band. Brown finely streaked head, yellow cere, dark hooked bill and yellow feet. Avoid a mostly pale wing with scattered big brown spots. Never substitute the plumage of the three rendering references.

PHOTOGRAPHIC FINISH: a high-resolution professional wildlife camera exposure at 1/2500 sec, soft natural light, feather surfaces merging naturally into fine soft vane texture and irregular down, realistic subtle focus falloff. Absolutely no scale-like contour feathers, no decorative tessellated feather plates, no outlined feathers, no hand-painted brushwork, no stippled illustration, no bright drawn feather borders. Match the photographic series of inputs 2–4 while preserving the identity in input 1.

FRAMING: square canvas 1254x1254. Complete scene occupies about 96% of width and 95% of height, centered around x=634, y=618: target bounds approximately x=33..1235, y=22..1213. Every wingtip, tail tip, rabbit ear and paw fully inside with a small clear green margin. Nothing touches any canvas edge. Background uniformly #00FF00 in all empty spaces and between feathers, no shadows, text, watermark or border. Single image.


Critical photographic correction: the close left wing flight feathers must be cool GREY with fine narrow transverse DARK BARS, like image 1, never mottled white patches or white marbled shafts from the other species. Neck and small body feathers have soft irregular real feather filaments, not a carpet of diamond-shaped outlined scales. The dark underwing band is deep charcoal brown and has soft overlaps. Soft overcast light, lower microcontrast, no golden edge tracing on any covert. Make it as optically natural and unstylized as a field photographer's camera frame; feather pattern naturally irregular, never ornamental. The rabbit is real camera-textured fur, with larger hindquarters and four articulated legs, no duplicated limbs. Photographic realism is the first selection criterion.

FINAL PRIORITY: The eagle needs the real, slightly soft, unoutlined surface quality of the real bird in input 5. In previous independent attempts the small feathers on the HEAD, NECK and far-wing shoulder looked like repeated pointed brown tiles, every one outlined in cream: completely eliminate that scale pattern. Render these surfaces as smoothly merging directional fine feather filaments and irregular slender brown streaks, as a real camera sees them. Individual tiny contour feathers should not each get a crisp outline or bevel. Only large actual flight feathers have individually discernible shafts. Lower local contrast on small feathers while keeping the dark underwing BAND and fine grey barring clearly legible. The bird should be a living soft-feathered animal in a documentary wildlife photograph. Fresh realistic wingbeat, right-facing, carrying rabbit, raised wings, whole subjects, same close square framing.
```

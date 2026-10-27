# Iberienadler – Flugbildvorschläge

Status: **Vorschläge zur Nutzerfreigabe, nicht eingebunden.** Bearbeitet wurden ausschließlich die zwei beauftragten bestehenden Flugbilder. `male.png` bezeichnet das normale adulte Original; keine zusätzliche Geschlechtsvariante wurde angelegt. Alle eigenen Dateien liegen unter `outputs/proposals/`. Keine Änderung an öffentlichen Bildern oder Bildzuordnungen.

## Ausgaben und aktive Quellen

| Ausgabe | Aktive Quelle | SHA-256 der Quelle |
|---|---|---|
| `outputs/proposals/flight/iberienadler/male.png` | `public/birds/iberienadler-20260913-v2.png` | `6914e053f7f09734c2c00740613fcdba829bfcd74bf40019b146c0a20a4e5718` |
| `outputs/proposals/flight/iberienadler/juvenile.png` | `public/birds/juvenile-iberienadler-20260913-v2.png` | `75bbf84ce8eae0c4835b5acbd95ab26d07b24b0058cac2493ec70f2dc944381d` |

Die aktiven Einträge wurden in `lib/bird-images.ts` geprüft; zusätzlich wurden `lib/birds.ts` und `lib/morphs.ts` durchsucht. Beide Quellprüfsummen stimmen mit dem Auftrag überein. Keine weitere Variante gehört zum Auftrag.

| Ausgabe | SHA-256 der finalen PNG |
|---|---|
| Adult | `70c51de321e333543098402352580e65d851343ff0ed9f609111141ca7fb795a` |
| Jungvogel | `ea95bff6e5635da8da591ecd3588770274c539520b2f0b7a217d3360b5dc92d5` |

## Referenzen und ihre Rollen

- `public/birds/iberienadler-20260913-v2.png`: recherchierte adulte Gefiedermerkmale und bisheriger Bildrahmen. Ausschließlich in Adult-Versuch 1 als Bildeingabe; ab Versuch 2 Merkmale im Artblock beschrieben. Keine geometrische Bindung an die alte Pose.
- `public/birds/juvenile-iberienadler-20260913-v2.png`: ausschließlich Gefieder/Farbe/Zeichnung der vorhandenen Jungvogelvariante; Eingabebild 2 der Jungvogelbearbeitung, niemals Bearbeitungsbasis.
- `public/birds/steinadler.png` und `public/birds/seeadler.png`: vorgeschriebene Stilreferenzen, visuell gelesen und im ersten Adult-Versuch mitgegeben. Keine Anatomieübernahme. Der erste Entwurf blieb zu gemalt und wurde verworfen; folgende Entwürfe verwendeten echte Fotos, um diese Stilübernahme zu vermeiden.
- `outputs/proposals/flight/iberienadler/work/anatomy-adult-browser.png`: Browseraufnahme eines echten adulten Iberienadlers, ausschließlich Anatomie und reale Flügel-/Körperhaltung. Quelle: [Eaglewatch-Foto](https://www.eaglewatch.nl/roofvogels/Accipitres/Accipitidae/Accipitrinae/Spaanse_keizerarend/Aquila_adalberti-02.jpg). Eingabe für Adult 1 und 2.
- `outputs/proposals/flight/iberienadler/work/anatomy-adult-cornell.png`: Browseraufnahme eines realen fliegenden Aquila adalberti aus Cornell/Macaulay; trotz Dateinamen zeigt das Foto ein immatures Gefieder und dient **nur** der Anatomie und natürlichen Federtextur, nicht als adulte Farbvorlage. Quelle: [Cornell-Foto 271737091](https://cdn.download.ams.birds.cornell.edu/api/v2/asset/271737091/1200), gefunden auf [Birds of the World](https://birdsoftheworld.org/bow/species/spaeag1/cur/multimedia?media=photos). Einzige Bildeingabe für Adult 3.
- `outputs/proposals/flight/iberienadler/work/adult-original-green.png`: fertiggestelltes neues adultes Original auf Grün, **Eingabebild 1 und einzige Bearbeitungsbasis** des Jungvogels. Bereits vor der Variantenbearbeitung endgültig gerahmt. SHA-256: `b41dbd05db62b15adfc7ced485279df90027830ec96fa413956c25685e4890bf`. Es handelt sich um den intern festgelegten Vorschlagsmaster, nicht um eine vorweggenommene Nutzerfreigabe.

Direkte Downloads waren in der Shell nicht erreichbar. Beide echten Flugfotos wurden erfolgreich im Browser angezeigt, selbst visuell geprüft und als lokale Browseraufnahme gesichert. Die Screenshots sind nur Prüf-/Generierungsreferenzen, keine einzubindenden Bilder.

## Generierungsweg

Built-in `image_gen.imagegen`, keine CLI-/API-Ausweichgenerierung. Alle Aufrufe verwendeten die festen Blöcke 1–3 aus `docs/image-prompts/flight.md` wörtlich und in dieser Reihenfolge; danach Art-/Auftragsblock bzw. Variantenblock. Automatischer Präfixvergleich: 4/4 bestanden. Hintergrund bei jedem Aufruf: flaches `#00FF00`.

| Versuch | Lokale Generierung | Bewertung |
|---|---|---|
| Adult 1 | `outputs/proposals/flight/iberienadler/work/adult-generation-1.png` | Verworfen: zu starke Übernahme der gemalten Federstruktur. |
| Adult 2 | `outputs/proposals/flight/iberienadler/work/adult-generation-2.png` | Verworfen: bessere Körperhaltung, aber störende helle Federränder. |
| Adult 3 | `outputs/proposals/flight/iberienadler/work/adult-generation-3.png` | Für Vorschlag gewählt; lokal freigestellt und gerahmt. |
| Jungvogel 1 | `outputs/proposals/flight/iberienadler/work/juvenile-generation-1.png` | Direkte Bearbeitung des neuen adulten Masters; für Vorschlag gewählt. |

Drei adulte Generierungen und eine Jungvogelgenerierung: jeweils unter der Grenze von vier. Keine Variantenkette.

Automatische Tool-Ablage (vom Tool erzeugter Cache, anschließend nach outputs/proposals kopiert):

- `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a9e2-7883-95f7-14b272a7a03f/exec-3d112dc3-53db-4ceb-a5f8-0a10022b9ebe.png`
- `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a9e2-7883-95f7-14b272a7a03f/exec-138482f8-d78b-4557-86e9-67822d16e99e.png`
- `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a9e2-7883-95f7-14b272a7a03f/exec-3fb9ff38-42bd-427e-83af-310689e0e2c1.png`
- `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a9e2-7883-95f7-14b272a7a03f/exec-247b1e19-2121-4962-b882-4767f07d08d3.png`

## Lokale Verarbeitung

1. Grün-Entmischung nach `docs/portrait-user-refinements-20260913/extract.py`, umgesetzt mit vorhandenem Node/Sharp in `outputs/proposals/flight/iberienadler/work/process.cjs`: excess = G − max(R,B), alpha = clamp(1 − excess/255); excess < 10 wird deckend, alpha < 0,045 transparent. Größte zusammenhängende Vogelfläche mit 2-px-Nachbarschaft erhalten, isoliertes Maskenrauschen entfernt. RGB durch Abzug des grünen Hintergrundanteils entmischt. **Kein Weiß-/Grau-Key**, keine pauschale Entfernung heller Federn.
2. Nur das neue adulte Original vor der Variantenbearbeitung um 3° gedreht und einheitlich auf 95,2941 % skaliert, um den bestehenden Rahmen zu treffen. Kein anisotropes Strecken. Auf die alte Leinwand 1254 × 1254 px zentriert. Das ist die Festlegung des neuen Originals, keine unabhängige Variantenanpassung.
3. Partielle Alpha-Randfarben aus nächstgelegenen deckenden Federpixeln rekonstruiert (maximal 4-px-Suchradius, Alpha unverändert): `outputs/proposals/flight/iberienadler/work/edge-colour.cjs`. Ergebnis auf flaches Grün komponiert und als einziges Jungvogel-Bearbeitungsziel gespeichert.
4. Jungvogelgenerierung separat per Grün-Entmischung freigestellt. Vor jeder Alpha-Übernahme 50-%-Überlagerung und Alpha-Vergleich geprüft: kein sichtbares Wandern von Auge, Schnabel, Flügelgelenken, Primärspitzen, Füßen oder Schwanz. Binäre Alpha-IoU vor Randangleichung 0,992769; schmale Antialias-Randabweichungen.
5. Erst nach dieser Geometrieprüfung `node scripts/restore-bird-alpha.mjs outputs/proposals/flight/iberienadler/male.png outputs/proposals/flight/iberienadler/work/juvenile-keyed.png outputs/proposals/flight/iberienadler/juvenile.png` ausgeführt. Exakter adulten Alpha-Kanal übernommen, schmale Randfarben korrigiert. Kein Verschieben/Verzerren/Skalieren des Jungvogels; Leinwand bereits identisch. Das bestehende Skript wurde nur gelesen/ausgeführt, nicht geändert.
6. Abschließend überschüssiges Grün an 80 adulten und 10 juvenilen Rest-Randpixeln neutralisiert (nur G auf max(R,B), Alpha unverändert). Keine Änderung von Pose oder Gefiederzeichnung. Finale PNGs enthalten echtes RGBA.

## Prüfung

- Beide Leinwände: **1254 × 1254 px**, unverändert.
- Alte adulte Alpha-Begrenzung (alpha > 0): x=101, y=101, Breite=1053, Höhe=1034; Mittelpunkt (627; 617,5).
- Beide Vorschläge: x=101, y=104, Breite=1053, Höhe=1028; Mittelpunkt (627; 617,5). Breitenabweichung 0 %, Höhenabweichung −0,58 %, Mittelpunktabweichung 0 %: **innerhalb 2 %**.
- Finale Alpha-Masken: **pixelidentisch**; IoU 1, mittlere absolute Differenz 0, 0 abweichende Pixel bei 1.572.516 Pixeln. Alpha-SHA-256 beider Bilder: `a24196055803338171eef5df673b1251af0e8c404bf235dce6c324c2b7d5ee86`.
- Visuelle Prüfung: neue Ansicht von unten mit Kopf/Blick nach links; durchgehender Körper, natürliche Schulter-/Flügelansätze, diagonal unten links → oben rechts, kompakter angelegter Fußbereich. Reale Flugbilder als Gegenprüfung betrachtet. Das adulte Original wurde nicht zur Deckung mit der alten Fehlvorlage gezwungen.
- Original und Jungvogel in 50-%-Überlagerung geprüft: keine sichtbaren Doppelkonturen an Auge, Schnabel, Flügelgelenken, primären Federkielen oder Schwanz. Die Gefiederfarben wechseln, die Lage bleibt stabil.
- Beide Ergebnisse auf **#e8e8e4**, **#22282a**, **#2d7f7a**, in voller **1254-px-Größe** und im Vergleichsbogen bei **420 px** geprüft. 420 px entsprechen einer repräsentativen mobilen Darstellung (112 % bei 375 px Rahmenbreite); die Bühne im Code ist flexibel und reicht bis 950 px. Zusätzliche 950-px-Renders liegen im work-Ordner.
- Visuell keine Grün-/Weißhalos außerhalb der Federkontur, keine Löcher, keine abgeschnittenen Schnäbel, Flügel- oder Schwanzspitzen. Die weißen adulten Schulterfedern und die helleren natürlichen Federenden wurden erhalten. Kein Grünüberschuss >10 RGB-Stufen mehr in sichtbaren Pixeln.
- Stilprüfung: gegenüber dem Altbestand weichere Federübergänge und weniger hart gezeichnete Federkonturen; Vorschlag zur abschließenden ästhetischen Nutzerprüfung.
- **Ergebnis: als Vorschlag technisch und visuell geprüft; Nutzerfreigabe ausstehend.** Keine Einbindung, keine Änderung der Bildzuordnung und kein Produkt-Build, da ausdrücklich nur Vorschläge angefordert wurden.

Prüfartefakte: `outputs/proposals/iberienadler-check.png` (aktuell/Vorschlag, beide Alter, alle drei Hintergründe), `outputs/proposals/flight/iberienadler/work/overlay-50.png`, `outputs/proposals/flight/iberienadler/work/alpha-diff.png`, `outputs/proposals/flight/iberienadler/work/alpha-before.png`, `outputs/proposals/flight/iberienadler/work/alpha-before.json`, `outputs/proposals/flight/iberienadler/work/alpha-final.json`, `outputs/proposals/flight/iberienadler/work/adult-framing.json`, `outputs/proposals/flight/iberienadler/work/qa.json`. Die Prüfskripte liegen ebenfalls unter work.

## Exakte Prompts aller Aufrufe

### Adult 1 – verworfen

Promptdatei: `outputs/proposals/flight/iberienadler/work/adult-prompt-1.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Spanish Imperial Eagle (Aquila adalberti), normal adult.
Underside identity: dark chocolate-brown body and underwing coverts; pale creamy buff crown and nape, dark face, yellow cere and yellow feet, black hooked bill tip; white shoulder/leading-edge markings; grey-brown flight feathers with subtle dark barring and darker tips, grey-brown tail with dark barring and broad dark end band. Anatomy and proportions from real photographs of this species only.

Task: Create a NEW adult original, correcting the painted look and building a plausible soaring anatomy. Input image 1 (current adult) is a plumage-feature and framing reference ONLY, never a geometry or style template. Input image 2 is a real flight photograph of Aquila adalberti and is the anatomy reference: broad eagle wings, natural joints and primary fingers, compact continuous body. Inputs 3 and 4 are style references only (golden eagle and white-tailed eagle), never their anatomy. Follow the photographic realism specified above, with soft natural feather overlaps and restrained detail. No hard outlined feather rows. Do not trace the old pose. View from below in a shallow bank, head facing left, broad wings on a lower-left to upper-right diagonal, tail continuing right and somewhat down from the body, feet tucked naturally. Keep all feathers fully visible.
Square canvas. Match the old adult framing: bird bounding box approximately x=8.2% to 91.9%, y=8.2% to 90.3%, centre x=50%, y=49.2%. Width 83.7% and height 82.1% of canvas. The two diagonal wings must fill this near-square bounding box naturally, without stretching. No text, labels or second bird.
```

### Adult 2 – verworfen

Promptdatei: `outputs/proposals/flight/iberienadler/work/adult-prompt-2.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Spanish Imperial Eagle (Aquila adalberti), normal adult.
Underside identity: dark chocolate-brown body and underwing coverts; pale creamy buff crown and nape, dark face, yellow cere and yellow feet, black hooked bill tip; white shoulder/leading-edge markings; grey-brown flight feathers with subtle dark barring and darker tips, grey-brown tail with dark barring and broad dark end band. Anatomy and proportions from real photographs of this species only.

Task: NEW photographic adult original. The sole input image is a REAL FLIGHT PHOTOGRAPH of this species used for anatomy and photographic feather realism. Reconstruct the eagle in the requested below-view bank with the wing axis lower left to upper right and gaze left. The bird must look like a real wildlife photograph with naturally soft, slightly irregular feather groups: no illustrated lines and no discrete repeated feather scales on the body. Feathers should merge into a natural textured surface at normal viewing distance. The old project image has overly sharp, painted feather scales and an unnatural posed head, and must not be imitated. Use a streamlined eagle head continuous with its body, broad wings with naturally separated long primary fingers, fully feathered legs and the yellow feet tucked close to the tail base. Keep dark chocolate body and underwing coverts, pale buff nape, white shoulder/leading-edge accents, subtler grey-brown barring in the flight feathers and tail, with a darker tail end band. Tail extends right-down from body. All anatomy must be natural and plausible. No text or labels.
Square canvas. Complete bird inside a bounding box x=8.2% to 91.9%, y=8.2% to 90.3%, centre x=50%, y=49.2%, roughly 83.7% canvas width and 82.1% height. Achieve this through the correct diagonal bank, not stretched anatomy. Natural overcast photographic lighting with soft muted low-contrast feathers, no golden rim light. Background exactly flat #00FF00.
```

### Adult 3 – final

Promptdatei: `outputs/proposals/flight/iberienadler/work/adult-prompt-3.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Spanish Imperial Eagle (Aquila adalberti), normal adult.
Underside identity: dark chocolate-brown body and underwing coverts; pale creamy buff crown and nape, dark face, yellow cere and yellow feet, black hooked bill tip; white shoulder/leading-edge markings; grey-brown flight feathers with subtle dark barring and darker tips, grey-brown tail with dark barring and broad dark end band. Anatomy and proportions from real photographs of this species only.

Task: Create a completely NEW adult Spanish Imperial Eagle in the realism of an actual wildlife photograph, using the attached real flying Aquila adalberti photograph for the broad-winged soaring anatomy and realistic feather texture. The attached bird is immature: use ONLY its realistic anatomy, not its immature plumage. Reorient the soaring bird so its head faces LEFT and its two wings run diagonally lower-left to upper-right. Preserve the natural proportions of a real eagle, compact head, continuous streamlined neck-body-tail, broad wings, short compact fan tail and tucked feet. Adult plumage comes from the species block above, transcribed from the project adult reference: dark brown body, pale buff nape, white shoulder markings, grey-brown subtly barred flight feathers and tail with dark terminal band.
Crucial correction: The previous attempts were still too stylized with outlined overlapping feather scales and bright feather rims. This image MUST look photographic, with naturally irregular soft blended body feathers and unoutlined feather edges, fine low-contrast feather texture, no repeated decorative scallops. No white rim or halo around the bird or the trailing edges of its wings. No edge lighting, no backlight, no glow. Natural dark feather margins must remain dark, while true white shoulder feather areas remain intact. Flat overcast soft front light. No painterly rendering, no digital-painting brushwork, no CGI. No text or labels.
Square canvas. Bird bounding box approximately x=8.1% to 92%, y=8.1% to 90.5%, with width and height almost equal: the angle of the diagonal wings should be about 45 degrees. All primaries, tail and bill fully inside green margins. Flat uniform pure green #00FF00 background.
```

### Jungvogel 1 – final

Promptdatei: `outputs/proposals/flight/iberienadler/work/juvenile-prompt-1.txt`

```text
Lifelike natural-history image of a bird in flight with the realism of a
high-end wildlife photograph: soft diffuse overcast daylight, natural matte
feathers with fine vanes and soft overlaps, subtle volume shading on body and
wings, slight natural translucency in the flight feathers. Not painterly and not
an illustration: no etched feather outlines, no repeated stamped feather
patterns, no crunchy sharpening or high micro-contrast, no flat poster colours,
no boosted saturation, no airbrushed smoothness.

Seen from below, head and gaze to the left, wing axis running from lower left
to upper right of the image. Complete bird including every primary tip, the
tail tip and the feet. Anatomically and spatially plausible soaring/gliding
geometry checked against real flight photographs of this species: one
continuous body, plausible shoulder and wrist joints, correct foreshortening of
the far wing, natural primary separation.

Flat uniform pure green #00FF00 background, no gradient, no shadow, no green
spill or reflection on the bird.

Species: Spanish Imperial Eagle (Aquila adalberti), juvenile.
Underside identity: warm tawny cinnamon-brown head, neck, body and underwing coverts, with darker soft feather centres; no adult white shoulder/leading-edge patch; dark brown flight feathers with the subtle paler barring visible in the supplied current juvenile image; brown-grey barred tail with dark end band; dark eye, yellow cere and feet, dark hooked bill tip. Anatomy and proportions from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: warm tawny cinnamon-brown body, head, neck and underwing coverts, replacing the creamy nape and white adult shoulder/leading-edge markings with tawny-brown feathers; preserve the restrained barring of remiges and tail and dark tips. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input image 1 is the NEW adult original and the ONLY editing base. Input image 2 is the old project juvenile, supplied ONLY as researched plumage reference, never for geometry, framing, pose or style. Make a precise recolouring edit of image 1. Keep every feather edge, bill, eye position, wing joint, primary tip, tail feather, foot and overlap fixed exactly. Do not redraw, rescale, shift, rotate, crop or recompose anything. Preserve the photographic feather texture and soft overcast lighting. Avoid any bright outlines or halos. Keep the exact 1254 x 1254 pixel canvas and uniform #00FF00 background of input 1. The adult is the established proposal master, pending final user approval.
```


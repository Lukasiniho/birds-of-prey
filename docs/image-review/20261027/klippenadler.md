# Klippenadler – Flugbildvorschläge

Status: **Vorschläge zur Nutzerfreigabe, nicht eingebunden.** Nur vorhandenes adultes Original (Schlüssel male) und vorhandener Jungvogel. Keine neue Geschlechts- oder sonstige Variante. AGENTS.md, docs/vogelbild-standard.md und docs/image-prompts/flight.md gelesen und angewendet; der ausdrückliche Auftrag mit grünem Hintergrund hat Vorrang vor der allgemeinen Transparenz-Promptregel.

## Ergebnisse und Quellen

| Ausgabedatei | Aktive Quelle | Quellen-SHA256 | Ergebnis-SHA256 |
|---|---|---|---|
| outputs/proposals/flight/klippenadler/male.png | public/birds/klippenadler-20260913-v3.png | 3dc233a87f1ae8374d2fd2515cbb41ff8c0d285a944bb1de71ffaa26bc7d29cb | bfee02518ad1292e29c66ec6f072cfeb45e37640bedba5d52f9ecac4df67996c |
| outputs/proposals/flight/klippenadler/juvenile.png | public/birds/juvenile-klippenadler-20260913-v3.png | 277c8dd16055c9c47fe560455017d163446330cfad4b4f7d6dffb3c6b5e61d59 | 94505b1b5599f1e06cef870942888da354d2552aaf4789fdf8ceba1ad0f9b7c0 |

Aktive Zuordnung in lib/bird-images.ts, Zeilen 12–13, geprüft. Beide Quelldateien sind unverändert. Das adulte Original wurde vollständig neu erstellt. Der Jungvogel wurde unmittelbar aus dem neuen adulten Original bearbeitet. Beide Jungvogelversuche haben dieselbe adulte Eingabe; keine Variantenkette.

## Referenzen und Rollen

- public/birds/klippenadler-20260913-v3.png: bestehendes adultes Gefieder und verbindlicher Rahmen, keine Geometrie- oder Stilvorlage. Als Bildreferenz nur im verworfenen adulten Versuch 1 enthalten; vor Versuch 2 visuell ausgewertet.
- public/birds/juvenile-klippenadler-20260913-v3.png: vorhandene erforschte Jungvogel-Farbmerkmale; keine Stil- oder Geometrievorlage. Als zusätzliches Bild nur in Jungvogelversuch 1 enthalten; für Versuch 2 in Textmerkmale übersetzt.
- public/birds/steinadler.png und public/birds/seeadler.png: Stil-/Kompositionskontext gemäß flight.md, niemals Anatomie. Visuell gelesen und nur beim verworfenen adulten Versuch 1 als Eingaben verwendet. Die festen fotografischen Stilblöcke sind maßgeblich.
- outputs/proposals/flight/klippenadler/work/photo-tarboton-screenshot.png: echte Unterseiten-Flugfotografie von Warwick Tarboton, Bild H20523, Skilpad, September 2013; ausschließlich artspezifische Anatomie, Körper-/Flügelansätze, Flügelform, Überdeckung, Schwingenzeichnung. [Quellseite](https://www.warwicktarboton.co.za/birdpgs/131VeEgl.html), [Originalfoto](https://www.warwicktarboton.co.za/images/BIRD%20jpgs/resized/131-Verreauxs-Eagle-Skilpad-H20523.jpg). Browser-Screenshot lokal gespeichert, SHA256 ab291feb9147d1c4b1a4c4aef68be6d6cb7e877f145e3dbf8d4fd4d52ff448cc. Das Foto wurde visuell geprüft; es ist die einzige Bildeingabe des akzeptierten adulten Versuchs 2.
- outputs/proposals/flight/klippenadler/work/adult-original-green.png: neue adulte Originalgeometrie und fotografische Federstruktur, Eingabe 1 beider Jungvogelbearbeitungen. Dies ist das bereits freigestellte und gerahmte neue Original auf reinem Grün, ohne geometrische Änderung. SHA256 8cebdd6a61b42169852f5ed9cc3d37d2f94ab1cf60597eb96ae9742542abeb56. Die abschließende Bereinigung von vier grünen Randpixeln in male.png änderte nur RGB, nicht Geometrie oder Alpha.

## Generierung und vollständige Prompts

Werkzeug: integriertes image_gen, kein CLI-/API-Fallback. Zwei adulte und zwei Jungvogelgenerierungen, jeweils unter dem Limit von vier. Alle Prompts enthalten die drei festen Blöcke aus flight.md wörtlich und in Reihenfolge. Tool-Ausgaben entstehen automatisch im Werkzeugverzeichnis; sämtliche projektseitigen Kopien, Bearbeitungen, Hilfsdateien und Endergebnisse wurden ausschließlich unter outputs/proposals/ gespeichert.

### Adult Versuch 1 – verworfen

Altbildstil zu stark übernommen; Hintergrund trotz Grün-Anforderung transparent. Nicht weiterverwendet.

- Werkzeugpfad: /Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a93b-7710-80ee-7712ad2e0ae1/exec-872ab2f2-efe2-4cfc-9d27-a5706992b627.png
- Lokale Rohdatei: outputs/proposals/flight/klippenadler/work/adult-generation-1.png
- Rohdatei-SHA256: 71249b828429c33ec8aab3d65c96690d6a7cc29b5646007999533321bc5b092d
- Promptdatei: outputs/proposals/flight/klippenadler/work/adult-prompt.txt

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

Species: Verreaux's Eagle (Aquila verreauxii), adult normal plumage.
Underside identity: black head, breast, belly, feathered legs and underwing coverts; grey-black flight feathers with pale silvery-white windows at bases of outer primaries, darker tips and subtle bars; dark tail with no white underside rump patch. Yellow cere and toes, dark hooked bill. Anatomy and proportions
from real photographs of this species only.

Task: Create a NEW adult original, a realistic photographic bird cutout on green. Input 1 is the current adult, for species plumage and framing only, NOT its painted texture or flawed geometry. Input 2 is Warwick Tarboton's real Verreaux's eagle underside flight photograph, for anatomy: narrower inner wings, broad outer hand, coherent ventral body and natural shoulder/wrist joints. Mirror its flight direction to the left. Inputs 3 and 4 are style/composition context only (golden eagle and white-tailed eagle), never anatomy; exceed their painted look with the fixed photographic style above. Do not show the dorsal white rump on the ventral abdomen. Wings run diagonally bottom-left to top-right, head left, tail lower-right, feet tucked naturally. Square 1254 x 1254 canvas with whole-bird bounding box x=108..1151 y=104..1126: 83.25% width and 81.58% height, centre (50.24%,49.04%). Leave clear green margins around all tips. Matte black plumage has fine soft feather detail and natural folds, not outlines or scalloped scale-like feathers. This is the new source original for the existing juvenile edit.
```

### Adult Versuch 2 – finales Original

Ausgewählt; neues realistisches adultes Flugoriginal auf Grün.

- Werkzeugpfad: /Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a93b-7710-80ee-7712ad2e0ae1/exec-480700c8-626f-4d62-bbf2-f8907cda4fcf.png
- Lokale Rohdatei: outputs/proposals/flight/klippenadler/work/adult-generation-2.png
- Rohdatei-SHA256: 783e3f1ac891126a44634f4d766adc6409dcda761e5ed83b43bc1ad50a5f45e2
- Promptdatei: outputs/proposals/flight/klippenadler/work/adult-prompt-2.txt

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

Species: Verreaux's Eagle (Aquila verreauxii), adult normal plumage.
Underside identity: black head, breast, belly, feathered legs and underwing coverts; grey-black flight feathers with pale silvery-white windows at bases of outer primaries, darker tips and subtle bars; dark tail with no white underside rump patch. Yellow cere and toes, dark hooked bill. Anatomy and proportions
from real photographs of this species only.

Task: Generate a completely NEW wildlife photograph of this living eagle in flight, not a rendering of an illustration. Input 1 is the real underside flight photo by Warwick Tarboton and is the ONLY visual reference, for anatomy and natural photographic plumage. Reorient its flying eagle to head LEFT and wing axis LOWER LEFT to UPPER RIGHT. Keep the camera BELOW the bird. The black breast and belly form one coherent body, the near wing connects on the lower-left side, the far wing extends upper-right, tail extends lower-right. Natural soft feather texture, no rows of drawn scalloped feathers. Full bird on an OPAQUE solid pure #00FF00 green backdrop; every background pixel is RGB 0,255,0, do not output transparency. No ground or cast shadow. Square image 1254 x 1254. Bird bounding box approximately x=108..1151, y=104..1126. The existing adult's required colour features are black body and coverts, subtly grey-black flight feathers with pale silvery windows toward primary bases, black tips, dark tail, yellow cere and toes. No dorsal white rump visible on this ventral view. All tips and bill complete with margins.
```

### Jungvogel Versuch 1 – verworfen

Zu kupferorange und zu kontrastreich. Nicht als Grundlage des zweiten Versuchs verwendet.

- Werkzeugpfad: /Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a93b-7710-80ee-7712ad2e0ae1/exec-5138365e-da50-4c0e-800b-afe38204dfee.png
- Lokale Rohdatei: outputs/proposals/flight/klippenadler/work/juvenile-generation-1.png
- Rohdatei-SHA256: d347725be0568324457afbcfb5d851501988a95b3aa848078fb13fe72d3ad4ba
- Promptdatei: outputs/proposals/flight/klippenadler/work/juvenile-prompt.txt

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

Species: Verreaux's Eagle (Aquila verreauxii), juvenile.
Underside identity: warm russet-brown breast, belly, neck and underwing coverts; darker brown face and throat, dark brown remiges and tail with subtle barring; buff-cream rather than stark white primary-base windows. Yellow cere and toes, dark hooked bill. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: warm russet-brown breast, belly, neck and underwing coverts, darker brown face/throat, subtly barred dark brown flight feathers and tail, pale buff-cream primary-base windows. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input 1 is the NEW adult original on a green backing, chosen for this proposal series (user approval is pending). This is the only edit target. Input 2 is the old juvenile, for plumage COLOURS and marking distribution only, not pose, geometry, canvas or its painted style. Apply a very slight photographic plumage edit to input 1; keep all its feather positions and soft real-world texture, eye/bill/feet position and the complete outline absolutely unchanged. Keep its entire 1254 x 1254 canvas unchanged with the bird exactly in the same place and at the same size. Do not zoom, crop, translate, rotate, reshape, re-pose or redraw feathers. Retain solid OPAQUE #00FF00 background. Preserve subtle soft feather edges without a luminous rim. Only recolour the relevant plumage to the existing juvenile identity.
```

### Jungvogel Versuch 2 – final

Ausgewählt; direkt aus dem neuen adulten Original, zurückgenommene warme Jungvogelfarben.

- Werkzeugpfad: /Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-a93b-7710-80ee-7712ad2e0ae1/exec-7a5c9b8f-6534-4990-b7d6-b874312a352d.png
- Lokale Rohdatei: outputs/proposals/flight/klippenadler/work/juvenile-generation-2.png
- Rohdatei-SHA256: 7482fd9540ed193c983a2b100c1eee1177a9a7a93c4b84ac65ab1f1c47b50ce5
- Promptdatei: outputs/proposals/flight/klippenadler/work/juvenile-prompt-2.txt

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

Species: Verreaux's Eagle (Aquila verreauxii), juvenile.
Underside identity: muted warm rufous-brown breast, belly, neck and underwing coverts; darker brown face and throat, dark brown remiges and tail with subtle barring; buff-cream rather than stark white primary-base windows. Yellow cere and toes, dark hooked bill. Anatomy and proportions
from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: muted warm rufous-brown breast, belly, neck and underwing coverts, darker brown face/throat, subtly barred dark brown flight feathers and tail, pale buff-cream primary-base windows. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input 1 is the NEW adult original on green, selected for this proposal series (user approval pending), and the ONLY edit target. Make only a subtle natural photographic feather colour edit. The existing juvenile source was reviewed separately: it has a brown body and underwing coverts, dark face and flight feather tips, cream-toned primary windows. Match that identity with restrained realistic colours: a muted cinnamon-brown body, not orange, copper or saturated red; medium dusky brown coverts and grey-brown flight feathers. Retain the exact fine soft feather TEXTURE of input 1: do not enhance contrast, etch edges, sharpen, draw outlines or alter light/shadows. Its precise outline, all feather positions, shoulders, eye, bill, feet and tail are immutable. Keep its 1254 x 1254 canvas unchanged; no zoom, resize, crop, movement or new pose. Background remains opaque flat #00FF00. This is a small recolouring of the adult photograph, not a new bird rendering.
```

## Lokale Verarbeitung

Reproduzierbare Skripte liegen in outputs/proposals/flight/klippenadler/work/process.cjs, qa.cjs und finalize.cjs; Node mit vorhandenem sharp, da Python-PIL/cv2 nicht verfügbar war. Keine Installation.

1. Excess-green-Alpha nach docs/portrait-user-refinements-20260913/extract.py: e = G − max(R,B), a = clamp(1 − e/255); bei e < 10 volle Deckung, a < 0,045 auf 0. Vordergrundfarbe durch Entmischung mit [0,255,0]. Weiß und Grau niemals entfernt.
2. Größte zusammenhängende Vogelmaske, 2-px-Nachbarschaft für weiche Kanten; isoliertes Hintergrundrauschen entfernt. Teiltransparente Randfarben aus nahegelegenen deckenden Vogelpixeln entkontaminiert, ohne Alpha zu erodieren. So bleiben helle Federflächen, Schnabel und feine Spitzen erhalten.
3. Adult: bereinigte Rohbegrenzung [84,48,1102,1140] ausgeschnitten und einmalig auf 1044 × 1023 px skaliert (x 0,947368; y 0,897368), Position [108,104] auf 1254 × 1254 px. Diese dokumentierte leichte Achsenanpassung gehört ausschließlich zur Herstellung des neuen Originals; danach Form nochmals am Foto geprüft. Kein unabhängiges Zuschneiden/Skalieren der Variante.
4. Jungvogel: Grün-Entmischung ohne jede geometrische Transformation. Vor Alpha-Angleichung 50-%-Überlagerung geprüft. Rohe binäre Masken-IoU 98.957 %, mittlere Alphaabweichung 0.6362 von 255 über die gesamte Leinwand. Abweichungen betreffen feine Randpixel; Schnabel, Auge, Schultern, Flügelgelenke, Federschäfte, Füße und Schwanzposition sind visuell stabil.
5. Nach dieser Geometrieprüfung Original-Alpha exakt übernommen, Randfarben lokal ergänzt. Keine Geometrieabweichung durch Beschneiden verdeckt; keine neue Pose erzeugt. Vier verbleibende grüne Randpixel im Adulten chromatisch entmischt. Keine Neutralfarben-Keying-Regel.
6. Finale transparente PNGs, Prüfkomposite und Vergleichsbogen verlustfrei gespeichert.

## Prüfung

- Leinwand beider Ergebnisse: **1254 × 1254 px**, exakt wie aktive adulte Quelle.
- Alpha-Begrenzung (inklusive): **x 108…1151, y 104…1126**; 1044 × 1023 px, Mittelpunkt [629,5;615]. Größe und Mittelpunkt **0 % Abweichung**, somit innerhalb der erlaubten 2 %.
- Finales Alpha **byte-identisch**; SHA256 52375d4d96a45250515fc3d3eb31ad3e856a95deb36735bfd5f45f1af772ce5b.
- Bildrichtung: Unteransicht, Kopf/Blick links, Flügelachse unten links → oben rechts. Ein zusammenhängender Körper, nachvollziehbare Schulter-/Handgelenke und vollständige Flügel-, Schwanz-, Schnabel- und Fußkonturen.
- Individuell visuell geprüft in voller Auflösung 1254 px auf **#e8e8e4, #22282a, #2d7f7a**, zusätzlich bei 360 px Darstellungsgröße im Vergleichsbogen. Keine sichtbaren grünen/weißen Freistellsäume, Löcher, abgeschnittenen Federn, Schnäbel oder Flügelspitzen. Helle natürliche Federkanten bleiben erhalten. Neu gegen alt zeigt weichere, fotografischere Körpertextur.
- Rohe und finale 50-%-Überlagerung: outputs/proposals/flight/klippenadler/work/overlay-raw-50.png und outputs/proposals/flight/klippenadler/work/overlay-final-50.png. Detailvergleich Adult/Jungvogel/Überlagerung: outputs/proposals/flight/klippenadler/work/structure-check.png. Kein sichtbares Springen von Auge, Schnabel, Füßen, Schulteransätzen, Flügeln oder Schwanz.
- Automatischer Check: node outputs/proposals/flight/klippenadler/work/verify.cjs **PASS**. Prüft Quelle unverändert, Leinwand/Alpha-BBox exakt, Alpha-Gleichheit, kein überschüssiges Grün und feste Promptblöcke unverändert in Reihenfolge.
- Vergleichsbogen: **outputs/proposals/klippenadler-check.png** (vier Zeilen: Adult bisher/Vorschlag, Jungvogel bisher/Vorschlag; drei Hintergründe).
- Einzelansichten: outputs/proposals/flight/klippenadler/work/{male,juvenile}-final-{light,dark,teal}.png und -display-{light,dark,teal}.png.

Die Prüfung erfolgt an den Vorschlagsdateien, nicht durch Einbindung in die Anwendung. Nutzerfreigabe steht aus. public/, lib/, app/, tests/, docs/ und Bildzuordnungen wurden nicht verändert.

# Habichtsadler — Flugbild-Vorschläge

**Status: nicht freigabereif.** Die beiden gewünschten Vorschläge sind erstellt, aber die strenge Stil- und Saumabnahme ist nicht vollständig bestanden. Nach vier adulten Generierungen bleiben im besten regelkonform auf Grün erzeugten Entwurf teilweise illustrative Federflächen und stellenweise zu helle Federränder auf dunklem Grund. Das Limit von vier Generierungen pro Bild wurde eingehalten. Keine Einbindung empfohlen, keine Produktionsdateien oder Zuordnungen geändert.

Gelesen: `AGENTS.md`, `docs/vogelbild-standard.md`, `docs/image-prompts/flight.md`, `docs/portrait-user-refinements-20260913/extract.py`. Umsetzung mit eingebautem Imagegen; lokale Verarbeitung mit Node und vorhandenem `sharp`, weil Python-PIL nicht installiert ist. Es wurden genau die vorhandene adulte Normalform (`male` ist der vorgegebene Ausgabename, keine neu erfundene Geschlechtsvariante) und der vorhandene Jungvogel bearbeitet.

## Ausgaben und Herkunft

### `outputs/proposals/flight/habichtsadler/male.png`

- Quelle: `public/birds/habichtsadler-20260913-v2-centered.png`
- Quellen-SHA-256: `d415ab8a37536a636e55b409fd24b9dc9e2dee0e0f965819d9828b6a240cf5dd`
- Ausgabe-SHA-256: `d2fe8c745f60554134749339e20efc815bc06288c2f50484a4831e480642b350`
- Ausgewählte Generierung: `outputs/proposals/flight/habichtsadler/work/adult-generated-3.png`
- Exakter final verwendeter Prompt: `outputs/proposals/flight/habichtsadler/work/adult-prompt-3.txt`

Referenzrollen: adulte Quelldatei nur für textlich übertragene Gefiedermerkmale und Zielrahmen; echtes Flugfoto für die visuelle Anatomieprüfung. Der finale Versuch 3 hatte keine Bildeingabe. Die alte Habichtsadler-Illustration wurde nicht als Stilreferenz verwendet.

Prüfergebnis: Rahmen, Transparenz, vollständige Extremitäten und Varianten-Alpha bestanden; vollständiger Fotorealismus und restlos unauffällige helle Federränder nicht bestanden.

### `outputs/proposals/flight/habichtsadler/juvenile.png`

- Quelle: `public/birds/juvenile-habichtsadler-20260913-v2-centered.png`
- Quellen-SHA-256: `2fa47a043b5928b07bc40a57a361ced6436eb03ecda9eed0dab96468074f5cdf`
- Ausgabe-SHA-256: `563195cef93eae2cd674d8993fa669ec94272e8e5a1dbe2695eca9222f4a2176`
- Ausgewählte Generierung: `outputs/proposals/flight/habichtsadler/work/juvenile-generated-1.png`
- Exakter final verwendeter Prompt: `outputs/proposals/flight/habichtsadler/work/juvenile-prompt-1.txt`

Referenzrollen: `work/adult-original-green.png` ist Eingabebild 1 und einzige Bearbeitungsbasis. Die alte Jungvogeldatei ist Eingabebild 2 nur für Gefieder/Farben. Kein unabhängiges Generieren, keine Variantenkette, keine separate Größen- oder Positionsanpassung.

Prüfergebnis: Rahmen, Transparenz, vollständige Extremitäten und Varianten-Alpha bestanden; vollständiger Fotorealismus und restlos unauffällige helle Federränder nicht bestanden.

## Referenzen mit Rollen

- `public/birds/habichtsadler-20260913-v2-centered.png` — Aktive adulte Zuordnung in lib/bird-images.ts: Gefieder und Rahmen; ausdrücklich keine Stil- oder Geometrievorlage. Nur Versuch 1 als Bildinput, danach Gefiedermerkmale textlich.
  SHA-256: `d415ab8a37536a636e55b409fd24b9dc9e2dee0e0f965819d9828b6a240cf5dd`

- `public/birds/juvenile-habichtsadler-20260913-v2-centered.png` — Aktive Jungvogel-Zuordnung; ausschließlich recherchierte Jungvogel-Gefiederfarben und Zeichnung; zweites Eingabebild beim Jungvogel.
  SHA-256: `2fa47a043b5928b07bc40a57a361ced6436eb03ecda9eed0dab96468074f5cdf`

- `public/birds/steinadler.png` — Von flight.md genannte Stilreferenz, inspiziert und nur im verworfenen adulten Versuch 1 eingespeist; niemals Anatomie.
  SHA-256: `6fb083db67da364d2480c2a8fd1620ce81f9c3fb138d14c15c2012caa6c50e7a`

- `public/birds/seeadler.png` — Von flight.md genannte Stilreferenz, inspiziert und nur im verworfenen adulten Versuch 1 eingespeist; niemals Anatomie.
  SHA-256: `d40e057ea4f943d98b8ce824cf4a9a1237626b169b03bdb11c316ea023da68d5`

- `outputs/proposals/flight/habichtsadler/work/anatomy-pelsy-browser.png` — Browseransicht eines echten adulten Habichtsadlers im Flug, Frédéric Pelsy, frpe369992. Anatomie visuell geprüft: zusammenhängende Schultern, Flügelgelenke, Fingerung, Körper/Schwanz. Nur Versuch 4 nutzt die Aufnahme als Bildinput.
  SHA-256: `5408cc0cd433f9c6ba1987f97bbcad83ccb8254f78ea8fbeaabf04950f11f216`
  Originalseite: [https://www.oiseaux.net/photos/frederic.pelsy/aigle.de.bonelli.4.html](https://www.oiseaux.net/photos/frederic.pelsy/aigle.de.bonelli.4.html)

- `outputs/proposals/flight/habichtsadler/work/adult-original-green.png` — Eingabebild 1 und einzige geometrische Bearbeitungsbasis des Jungvogels: neuer adult3-Entwurf nach Grün-Freistellung und Rahmenanpassung wieder auf #00FF00 gelegt. Entspricht work/adult-before-edge-clean.png; spätere lokale Randfarbreinigung beider Ausgaben ändert keine Geometrie.
  SHA-256: `98890195ee53924b35b552e6cc254bb72163b1220f96bc64c77e1b26a60cb9d6`

## Generierungen und Prompts

Die festen Blöcke 1 Stil, 2 Perspektive und 3 Hintergrund wurden programmatisch aus den Textblöcken von `flight.md` entnommen und in dieser Reihenfolge unverändert verwendet. Anschließend Art-, gegebenenfalls Varianten- und Auftragsblock. Keine zusätzlichen Generationen außerhalb der folgenden Liste.

### adult-1

Verworfen: übernimmt gemalte Federplatten und alte Wirkung.

Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-ab5f-7d01-bfb2-71c8ff32c84a/exec-39c39b5d-717f-46da-904b-02186a08e37a.png`

Lokale Kopie: `outputs/proposals/flight/habichtsadler/work/adult-generated-1.png`

Generierungs-SHA-256: `5218ba70c6939e2038acd38096f3d03b1dc2898d9c2fc9213c82130e853da5fb`

Promptdatei: `outputs/proposals/flight/habichtsadler/work/adult-prompt-1.txt`

Exakter Prompt (im Werkzeug mit abschließendem Zeilenumbruch):

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

Species: Bonelli's Eagle (Aquila fasciata), normal adult.
Underside identity: white to pale cream breast and belly with fine irregular dark brown lengthwise streaking; pale lesser underwing coverts with dark spotting, broad dark brown median/greater covert band; greyish flight feathers with subtle narrow dark bars and dark primary tips; long grey-brown tail with fine barring and a broad dark subterminal band. Brown head, pale streaked throat, yellow cere, dark hooked bill, yellow feet partly tucked into feathered legs. Anatomy and proportions from real photographs of this species only.

Task: Create a NEW adult original, not a repaint of the old geometry. Input image 1 is the old adult solely for researched plumage identity and framing; it is explicitly rejected as a style reference. Inputs 2 and 3 are the project style references only, never anatomy or pose references. The written high-end wildlife-photograph realism takes priority over any painted appearance of these images. Real Bonelli's Eagle flight photograph inspected for anatomy: https://www.oiseaux.net/photos/frederic.pelsy/aigle.de.bonelli.4.html (Frederic Pelsy, adult, frpe369992): connected shoulders, broad wings, naturally separated primaries, compact body and long barred tail. Render a convincing real bird seen obliquely from below with the head pointing left, far wing extending lower left and near wing upper right, both wing undersides visible, body receding to a modestly spread tail toward lower right. No enormous fan-shaped tail, no display pose, no etched feather plates. Square canvas. The complete bird occupies x=7.5%..92.5%, y=8.5%..91.5% with centre (50%,50%); all extremities have green clearance. Output only the bird on flat green. Do not include any text, labels or border.
```

### adult-2

Nicht ausgewählt: noch zu schematisch gemalt.

Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-ab5f-7d01-bfb2-71c8ff32c84a/exec-bcef773a-9f2e-405d-ba94-42d80d1eea9a.png`

Lokale Kopie: `outputs/proposals/flight/habichtsadler/work/adult-generated-2.png`

Generierungs-SHA-256: `2d033175f48128082787dcd7869fdaf9acb8693474636827d95d302b246b679d`

Promptdatei: `outputs/proposals/flight/habichtsadler/work/adult-prompt-2.txt`

Exakter Prompt (im Werkzeug mit abschließendem Zeilenumbruch):

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

Species: Bonelli's Eagle (Aquila fasciata), normal adult.
Underside identity: white to pale cream breast and belly with fine irregular dark brown lengthwise streaking; pale lesser underwing coverts with dark spotting, broad dark brown median/greater covert band; greyish flight feathers with subtle narrow dark bars and dark primary tips; long grey-brown tail with fine barring and a broad dark subterminal band. Brown head, pale streaked throat, yellow cere, dark hooked bill, yellow feet partly tucked into feathered legs. Anatomy and proportions from real photographs of this species only.

Task: Generate a completely new photographic adult bird. No illustration input is supplied because the previous adult has been rejected as too painted. The plumage description above was transcribed from that current adult. Use actual wildlife photograph realism, with organic irregular fine feather texture, soft little body feathers, subtle naturally varying edges, no outlined rows of identical decorative feathers. A real telephoto photograph of a living Bonelli's eagle isolated on chroma green, not a digital painting or a taxidermy specimen. Real flight anatomy reference inspected: https://www.oiseaux.net/photos/frederic.pelsy/aigle.de.bonelli.4.html (Frederic Pelsy, adult frpe369992). Broad wings attached continuously at the shoulders, natural bent wrist, medium-long tail slightly spread, streamlined compact body. Viewed obliquely from below, flying left, wing axis strongly diagonal from bottom left to upper right. The head is left of the body, the near wing reaches upper right, far wing lower left; tail trails lower right, both wing undersides visible. Legs mostly tucked with yellow toes visible. Square canvas. The complete bird occupies x=7.5%..92.5%, y=8.5%..91.5%, centre (50%,50%). Keep clear green margins around every primary tip, bill and tail. Soft diffuse daylight, no rim light. Output only one bird on green, no text or border.
```

### adult-3

Ausgewählter bester Grün-Entwurf, aber strenge Stil-/Saumabnahme nicht bestanden.

Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-ab5f-7d01-bfb2-71c8ff32c84a/exec-3a63b26b-3cd0-4737-9982-6bd89caee5f0.png`

Lokale Kopie: `outputs/proposals/flight/habichtsadler/work/adult-generated-3.png`

Generierungs-SHA-256: `a1959cff01b482ba37580bb199a139bbe09dac53040e02e77fb6e594ea0659df`

Promptdatei: `outputs/proposals/flight/habichtsadler/work/adult-prompt-3.txt`

Exakter Prompt (im Werkzeug mit abschließendem Zeilenumbruch):

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

Species: Bonelli's Eagle (Aquila fasciata), normal adult.
Underside identity: white to pale cream breast and belly with fine irregular dark brown lengthwise streaking; pale lesser underwing coverts with dark spotting, broad dark brown median/greater covert band; greyish flight feathers with subtle narrow dark bars and dark primary tips; long grey-brown tail with fine barring and a broad dark subterminal band. Brown head, pale streaked throat, yellow cere, dark hooked bill, yellow feet partly tucked into feathered legs. Anatomy and proportions from real photographs of this species only.

Task: Generate a completely new photographic adult bird. No illustration input is supplied because the previous adult has been rejected as too painted. The plumage description above was transcribed from that current adult. Use actual wildlife photograph realism, with organic irregular fine feather texture, soft little body feathers, subtle naturally varying edges, no outlined rows of identical decorative feathers. A real telephoto photograph of a living Bonelli's eagle isolated on chroma green, not a digital painting or a taxidermy specimen. Real flight anatomy reference inspected: https://www.oiseaux.net/photos/frederic.pelsy/aigle.de.bonelli.4.html (Frederic Pelsy, adult frpe369992). Broad wings attached continuously at the shoulders, natural bent wrist, medium-long tail slightly spread, streamlined compact body. Viewed obliquely from below, flying left, wing axis strongly diagonal from bottom left to upper right. The head is left of the body, the near wing reaches upper right, far wing lower left; tail trails lower right, both wing undersides visible. Legs mostly tucked with yellow toes visible. Square canvas. The complete bird occupies x=7.5%..92.5%, y=8.5%..91.5%, centre (50%,50%). Keep clear green margins around every primary tip, bill and tail. Soft diffuse daylight, no rim light. Output only one bird on green, no text or border.
The central acceptance criterion is a genuinely photographic texture. Previous attempts were rejected for resembling painted cutouts: do not reproduce their repeated schematic streaks, feather contour strokes, smooth gradient wings or illustration-like face. The result must look like an actual high-resolution camera capture of the eagle in flight, with imperfect fine feather fluff, small irregularities, low-contrast feather barbs and naturally uneven overlapping feathers. Keep the bird sharp but avoid etched texture. Pure chroma background #00FF00, no photographic scenery.
```

### adult-4

Verworfen: Transparenz statt angefordertem Grün; kein zulässiger Ersatz für den Grün-Workflow.

Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-ab5f-7d01-bfb2-71c8ff32c84a/exec-0321807c-6894-4f98-9d5a-0fc9b2dd6458.png`

Lokale Kopie: `outputs/proposals/flight/habichtsadler/work/adult-generated-4.png`

Generierungs-SHA-256: `56bdd3414f903765ce88d712b1c00ad938cd4b3068c4933323ac29b53104b894`

Promptdatei: `outputs/proposals/flight/habichtsadler/work/adult-prompt-4.txt`

Exakter Prompt (im Werkzeug mit abschließendem Zeilenumbruch):

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

Species: Bonelli's Eagle (Aquila fasciata), normal adult.
Underside identity: white to pale cream breast and belly with fine irregular dark brown lengthwise streaking; pale lesser underwing coverts with dark spotting, broad dark brown median/greater covert band; greyish flight feathers with subtle narrow dark bars and dark primary tips; long grey-brown tail with fine barring and a broad dark subterminal band. Brown head, pale streaked throat, yellow cere, dark hooked bill, yellow feet partly tucked into feathered legs. Anatomy and proportions from real photographs of this species only.

Task: NEW adult original. Input image 1 is an actual wildlife photograph by Frederic Pelsy, viewed in a browser, and is supplied ONLY for this species' real anatomy and authentic photographic feather texture. Ignore its black browser margins and watermark. Use the lifelike softness, irregular subtle feather details and actual bird anatomy from this photograph. Change the camera angle to the required oblique underside view with the head and beak pointing LEFT and the wing axis diagonally from lower LEFT to upper RIGHT. Tail trails lower right. Do not copy the front-facing direction of the reference. Do not copy the old painted eagles seen earlier in the conversation. Produce the realism of this actual camera photo on solid green, no illustration, no brushed feather lines, no artificial plastic shading, no light outline or white rim around any feather or body edge. The normal adult plumage described above comes from the existing researched adult file. The body should be slender and streamlined, wings anatomically attached, wrist joints natural and primary fingers clearly separated. Grey-brown flight feathers with fine dark bars, modestly spread long tail with a broad dark subterminal band. Legs tucked with toes partly visible. Complete bird with generous margins. Square canvas, alpha bounding box after extraction targeted to x=7.5%..92.5% and y=8.5%..91.5%. No text, no watermark or shadow; flat #00FF00 background.
```

### juvenile-1

Direkte Gefiederbearbeitung des neuen adulten Originals; übernimmt dessen verbleibende Stil-/Saumprobleme.

Werkzeugpfad: `/Users/lukasvonhohnhorst/.codex/generated_images/01a17a3a-ab5f-7d01-bfb2-71c8ff32c84a/exec-08e6186e-c275-44bb-9b05-8f6070caeb04.png`

Lokale Kopie: `outputs/proposals/flight/habichtsadler/work/juvenile-generated-1.png`

Generierungs-SHA-256: `ddf0218eb38a651be806d16ba07c0cfa840f16fd3c4532b781bf43bb61ce36c2`

Promptdatei: `outputs/proposals/flight/habichtsadler/work/juvenile-prompt-1.txt`

Exakter Prompt (im Werkzeug mit abschließendem Zeilenumbruch):

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

Species: Bonelli's Eagle (Aquila fasciata), juvenile.
Underside identity: warm buff-rufous head, neck, breast, belly and lesser underwing coverts with fine brown streaking; softer brown covert band than in the adult, barred grey-brown flight feathers with dark tips and narrowly pale feather edges; finely banded brownish tail without the adult's bold dark terminal contrast. Yellow cere, dark hooked bill, yellow feet. Anatomy and proportions from real photographs of this species only.

Edit of input image 1, the approved adult original of this species. Change only
the plumage to juvenile: replace the pale cream-white underside with the warm cinnamon-buff and rufous-cream shades shown in input image 2, especially on the throat, neck, chest, abdomen and lesser underwing coverts; retain fine brown lengthwise streaks and the existing flight feather barring, but soften the broad dark adult tail band to the subtler juvenile tail bars. Keep silhouette, pose, wings,
tail, canvas, scale and position pixel-identical.

Task: Input image 1 is the NEW adult original prepared on green, the sole edit target and the sole geometry and realism reference. Input image 2 is the old juvenile ONLY as the researched plumage colour reference. Do not use its painted texture or its anatomy, pose or placement. Perform a slight colour/pattern edit of input 1, keeping every individual feather, primary tip, shoulder joint, eye, beak, toe and tail feather in exactly the same position. Do not regenerate the bird. No resizing, recentering, redrawing, zooming, canvas changes or pose changes. Keep precisely the same 1254 by 1254 canvas. Keep the background flat pure #00FF00 (opaque green, not transparent). Only age-specific plumage colours and pattern contrast change; photographic softness and lighting stay identical. No white or luminous outline.
```

## Lokale Verarbeitung

1. Die auf Grün erzeugten Dateien wurden ausschließlich in `outputs/proposals/flight/habichtsadler/work/` gesichert. Versuch 4 mit vom Werkzeug gelieferter Transparenz wurde verworfen.
2. Grün-Entmischung nach `extract.py`: `excess = G - max(R,B)`, `alpha = clamp(1 - excess/255)`, bei `excess < 10` volle Deckung, bei `alpha < .045` transparent. Hauptkomponente plus zwei Pixel Nachbarschaft erhalten; RGB aus Vorder-/Hintergrundmischung rekonstruiert. Weder Weiß noch Grau wurden ausgekeyt.
3. Randfarben schwach gedeckter Pixel aus benachbarten deckenden Federpixeln stabilisiert, ohne Alpha zu erodieren.
4. Nur das neue adulte Original wurde vor der Variantenproduktion eingerahmt: seine neue Begrenzung `[48,32,1205,1212]` (1158 × 1181) auf 1066 × 1040 skaliert und bei `(94,107)` auf die 1254 × 1254 Leinwand gesetzt. X-/Y-Skalierung ist in `adult-processing.json` dokumentiert; diese leichte Seitenverhältnisanpassung betrifft nur die neue adulte Basis. Die Jungvogelbearbeitung bekam bereits genau diesen Rahmen und wurde nicht unabhängig transformiert.
5. Die eingerahmte adulte Basis wurde für die direkte Jungvogelbearbeitung auf reines Grün gelegt. Jungvogel anschließend mit derselben Grün-Entmischung freigestellt. Vor einer Übernahme der adulten Alpha-Maske wurden rohe Überlagerung und Alpha-Abweichungen geprüft: binäre IoU 99,5216 %, mittlere Alpha-Abweichung 0,3918 von 255. Keine sichtbare Verlagerung von Schnabel, Auge, Gelenken, Schwingen oder Schwanz in der 50-%-Überlagerung. Die geringe Kantenabweichung betrifft Antialiasing.
6. `scripts/restore-bird-alpha.mjs` zunächst unverändert aufgerufen (nur Ausgabepfade unter proposals); dessen harte Randfarbübernahme war lokal streifig. Finale Randreinigung deshalb durch `work/finish.cjs`: gewichtete Nachbarfarben aus mindestens vier Pixel tiefen Federbereichen für die schmale Randzone; kein Entfernen heller Flächen, keine Änderung des adulten Alpha. Jungvogel erhält exakt dessen Alpha. Die verbleibenden hellen, bereits gezeichneten Federränder und die Stilwirkung werden ausdrücklich nicht als behoben ausgegeben.
7. Vergleiche und Messdaten mit `work/qa.cjs` erstellt. Vollständige Verarbeitung liegt nachvollziehbar als `process.cjs`, `finish.cjs`, `qa.cjs` im Vorschlagsordner.

## Prüfung

| Kriterium | Ergebnis |
|---|---|
| Beide Leinwände | 1254 × 1254, exakt wie aktuelles adultes Bild |
| Alpha-BBox, beide | `[94,107,1159,1146]`, exakt wie aktuelles adultes Bild |
| BBox-Größe und Zentrum | 1066 × 1040; (626,5; 626,5), Abweichung 0 % |
| Varianten-Alpha | 0 unterschiedliche Pixel |
| Grünüberschuss > 15 bei sichtbaren Pixeln | 0 in beiden finalen Dateien |
| Vollständigkeit | Schnabel, Kopf, sämtliche Schwingen-/Schwanzspitzen und sichtbare Füße vollständig; kein Randkontakt |
| Perspektive | Unterseite, Kopf/Blick links, Flügelachse unten links → oben rechts; zusammenhängende Schulter-/Körpergeometrie |
| Variantenwechsel | 50-%-Überlagerung ohne erkennbaren Positionssprung; innere Strukturen visuell geprüft, keine Behauptung pixelidentischer RGB-Strukturen |
| Freistellung | Echte Transparenz, kein Schachbrett, keine sichtbaren Löcher im Körper; helle Randwirkung noch nicht vollständig bestanden |
| Fotorealismus | Nicht vollständig bestanden; weiterhin teilweise illustrative Federstruktur |

Selbst angesehen: beide finalen Dateien auf `#e8e8e4`, `#22282a`, `#2d7f7a` bei 1254 px, die 320-px-Anzeigeansichten und der Vergleichsbogen mit 418-px-Zellen; zusätzlich rohe und finale 50-%-Überlagerung sowie rohe Alpha-Differenz. Die Anzeigeansichten sind lokale Komposite, keine Produktintegration. Im Code ist die Flugbildbox responsiv (Bildgrößenhinweis bis 920 px); hier wurden repräsentative kompakte Anzeigegrößen geprüft. Keine Produktseite/Zuordnung wurde verändert.

Prüfdateien:
- `outputs/proposals/habichtsadler-check.png`: aktuelle Dateien links, Vorschläge rechts, pro Alter hell/dunkel/teal.
- `outputs/proposals/flight/habichtsadler/work/*-proposal-*-full.png`: alle sechs finalen Hintergrundansichten in voller Auflösung.
- `outputs/proposals/flight/habichtsadler/work/display-320.png`: beide Varianten auf drei Hintergründen bei 320 px.
- `outputs/proposals/flight/habichtsadler/work/overlay-final-50.png`: 50-%-Überlagerung.
- `outputs/proposals/flight/habichtsadler/work/alpha-difference-final.png`: identische Alpha-Kanäle (schwarze Differenz).
- `outputs/proposals/flight/habichtsadler/work/metrics.json` und `manifest.json`: Messwerte, Prüfsummen, Provenienz.

**Abschluss:** Nur Vorschläge; keine automatische Freigabe. Das adulte Generierungslimit ist ausgeschöpft. Für eine vollständig bestandene Serie wäre ein erneut freigegebenes realistisches adultes Original erforderlich, danach wieder eine direkte Jungvogelbearbeitung daraus.

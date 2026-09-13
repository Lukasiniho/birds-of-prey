# Verbindlicher Arbeitsstand Flugbildüberarbeitung, 13. September 2026

Ziel bleibt der gesamte vorhandene Bestand einschließlich aller vorhandenen Jungvogel-/Morphen-Kombinationen. Keine weiteren Geschlechtsvarianten. Arttypische Anatomie, linker Kopf, Unteransicht, Diagonale linksunten/rechtsoben. Varianten immer direkt vom finalen normalen adulten Original. Lokale Freistellung prüfen; kein eingebranntes Schachbrett. Porträtarbeit läuft in separater Aufgabe; deren Dateien nicht überschreiben.

## Nutzer bestätigt / bewahren
- Rotschwanzbussard, Mäusebussard, Königsbussard: aktuelle Flugbilder bestätigt.
- Wüstenbussard: ausdrücklich super, vollständig unverändert lassen.
- Gerfalke: originale Geometrie bereits gut.
- Riesenseeadler und Seeadler: Altvögel ausdrücklich gut, nicht ändern.
- Weißkopfseeadler: Auftrag nur Jungvogel neu, Adult bewahren.
- Steppenadler adult v2: Nutzer „sieht gut aus“. Gezielte Flügelverkürzung auf Basis seines Originals, nicht der verworfene v1. Jungvogel aus v2 erstellt. Vier Dateien eingebunden als 20260913-v2; PNG-Paarvergleich/Alpha-Prüfung bestanden, npm run images fertig. Im Browser jeweils beide Altersstufen geladen und geprüft.
- Habichtsadler adult v2: Nutzer „hervorragend“, „so soll es sein“. Nur Oberflächenrealismus/Beleuchtung verändert. 89% Bilddarstellung für alle Alter erhalten. Jungvogel aus v2 erstellt. Vier Dateien eingebunden als 20260913-v2; PNG-Paarvergleich/Alpha-Prüfung bestanden, npm run images fertig. Im Browser jeweils beide Altersstufen geladen und geprüft.

## Konkrete offene Aufträge (nicht durch einfaches Bestehen technischer Tests erledigt)
- Habicht sehr helle Form: blaues Jungvogel-Stirnartefakt lokal korrigiert; v2 eingebunden, heller Jungvogel im Browser geladen und geprüft.
- Harpyie: Adult/Juvenil als 20260913-v2 lokal eingebunden und beide Alterswechsel geprüft. Füße gelber, Jungvogel direkt aus neuem Adult erstellt; Chroma-Blau lokal entfernt, ursprüngliche adulte Alpha-Maske erhalten. Kopf/Federränder auf kontrastierenden Hintergründen geprüft.
- Zwergadler: vier vorhandene Bilder als 20260913-v2 überarbeitet und lokal eingebunden, 93% Darstellungsgröße (=7% kleiner), alle vier Umschaltungen im Browser geladen. Nutzerfeedback zur Serie noch ausstehend.
- Kronenadler: neu erstellen; anschließend vorhandenen Jungvogel direkt daraus.
- Weißstorch: komische Proportionen, anhand echter Flugfotos korrigieren; vorhandenen Jungvogel danach aktualisieren.
- Wespenbussard: zu lang, Flügel komisch; zuerst artspezifische Geometrie prüfen/korrigieren, danach komplette vorhandene Alters-/Morphenmatrix.
- Riesenseeadler: Jungvogel 20260913-v2 direkt aus unverändertem Adult erstellt und eingebunden; Browser geladen, Alpha/Leinwand gleich.
- Weißkopfseeadler: Jungvogel neu, Adult bewahren.
- Seeadler: Jungvogel 20260913-v2 direkt aus unverändertem Adult erstellt, lokal freigestellt und eingebunden; Browser geladen, Alpha/Leinwand gleich.
- Kaiseradler: zu große Flügel im Verhältnis zu Kopf/Körper; gezielter Ansatz analog Steppenadler v2, kein generischer Neuerstellungsversuch.
- Iberienadler und Klippenadler: v2 auf Grundlage der eigenen Originale als komplette Adult/Juvenil-Paare eingebunden; Iberien 97% Darstellungsgröße (=3% kleiner), Klippen unveränderte Größe. NEUE Nutzerpräzisierung: Perspektive/Proportionen der bisherigen Originale passen. Nur realistischer, weichere Federn analog bestätigtem Habichtsadler. Iberienadler minimal kleiner. Keine anatomische Neuerfindung. Alle v1-Vollneuerstellungen ausdrücklich verworfen; niemals einbinden oder als Variantenbasis verwenden.
- Falken: nur Flugbilder. Turmfalke eingebundenes v2 bleibt als problematisch markiert (Nutzer Perspektive/Puppenkörper abgelehnt); v3 ebenfalls abgelehnt und nicht eingebunden. Neue gute Anatomie vor Varianten. Weitere Falken prüfen, Gerfalkengeometrie bewahren.
- Restlicher Bestand: vorhandenes Audit fortsetzen, keine pauschale Fertigmeldung.

## Verworfen
Steppenadler v1, Iberienadler v1, Klippenadler v1: in `output/imagegen/eagle-refresh-20260912/rejected/`, im Manifest rejected_by_user. Keine Website-Zuordnung.

## Technischer Hinweis
RGB-Logratio-Matte kann bei stark aufgehellten Vorlagen cyanfarbene Ränder erzeugen. Lab-Chroma-Matte verhindert das, kann aber blaue Schnäbel in braun verwandeln, wenn zu breiter Rand aus Rumpf-Farben abgeleitet wird. Jede konkrete Ausgabe prüfen. Die GrabCut-Erprobung extract-guided.py beschädigte Habichtsadler-Schnabel/Federkanten und wurde NICHT als finale Ausgabe verwendet. Für Habichtsadler v2 und Steppenadler v2 derzeit RGB-Matte mit bewahrtem adulten Alpha; Schnäbel visuell kontrolliert. Identische Alpha-Masken ersetzen keine Prüfung innerer Landmarken.

## Zentrierung und aktuelle Validierung
- Habichtsadler nach Nutzerhinweis: PNG-Ränder oben24/unten43 px, Hauptversatz war 89%-Bildbox oben links in blockförmigem .hero-art. .hero-art jetzt Grid mit place-items:center. Browserzentrum differiert unter0.01 px, gleicher Rahmen für Alt/Jung. Keine erneute Größenänderung.
- Fünf Arten / sieben abhängige Varianten: jeweilige Alpha-Kanäle und Leinwände exakt gleich; Pair-Reviews auf hellem/dunklem Grund geprüft. npm run images fertig (287 Quellen), Design-Lint und bestehender Morphenbildtest bestanden; git diff --check sauber. Breiteres Ziel weiterhin offen.
- Neue Prompts/Quellen/Dateien: approved-v2-provenance.json, style-batch-v2.json, style-variants-v2.json in output/imagegen/eagle-refresh-20260912/. Kein laufender Imagegen-Auftrag mehr.

- Präzise Dateizentrierung: beide Habichtsadler-v2-PNGs verlustfrei 9 px nach unten verschoben, neue `-v2-centered.png` eingebunden. Sichtbare Ränder oben33/unten34 px; gleiche Alpha-Maske und Größe, keine Neugenerierung. Provenienz: habichtsadler-centering.json.

## Harpyie und Seeadler-Serie
- Fünf neue Bilddateien, vier vollständige Alterspaare geprüft. Alle Bilder tatsächlich als optimierte Dateien im Browser geladen. `npm run images`: 309 Quellen; Diff-Check bestanden. Quellen, Prompts, Hashes und Matte-Protokoll: `output/imagegen/eagle-refresh-20260912/harpy-sea-refresh-v2.json`.
- Harpyien-Jungvogel erster Schachbrettversuch verworfen (überhelle Kanten/Restschachbrett); finale Version ist erneuter direkter Adult-Edit auf Blau, lokal freigestellt. Keine Variantenkette.
- Weiter offen: Kronenadler, Weißstorch, Wespenbussard inklusive aller Morphen/Altersstufen, Kaiseradler, Falken und abschließender Gesamtbestand.

## Aktueller Nachtrag: Nutzerkorrekturen und Größen
- Wespenbussard v2 nach Nutzerkritik ersetzt: Kopf näher an Schulter, kürzerer sichtbarer Hals, breiter gefächerter Schwanz nach Nutzerfoto. Neues Adult v3 und alle fünf vorhandenen Varianten direkt daraus erstellt, echte lokale Alpha-Freistellung, gesamte 6er-Matrix im Browser geladen und visuell geprüft. Darstellung 8% kleiner.
- Kaiseradler Adult v2: beide Flügel gezielt gegenüber Kopf/Körper verkürzt, vorhandener Jungvogel direkt aus neuem Adult. Paar lokal eingebunden und im Browser geladen.
- Andenkondor Männchen: ausschließlich Kopfhaut/Kamm rötlicher, lokale Übernahme der Bildgenerierung in Original; restliche Originalpixel/Alpha bewahrt. Bestehende Weibchen/Jungvogelbilder bleiben, da die Farbkorrektur ausdrücklich nur das Männchen betrifft.
- Kronenadler und Weißstorch: v2-Adult und jeweiliger direkt abgeleiteter Jungvogel fertig, sauber freigestellt und beide Altersstufen im Browser geladen.
- Weißkopfseeadler-Jungvogel v2 fertig (ersetzt ältere offene Zeile oben).
- Alle Größen beziehen sich auf die zuletzt angezeigte Darstellung und gelten für alle vorhandenen Alters-/Morphenstufen der Art: Klippen −12%, Iberien −12% (97→85,36%), Weißkopfseeadler −5%, Seeadler −5%, Riesenseeadler +4%, Fischadler −10%, Sekretär −10%, Andenkondor −5%, Wespenbussard −8%, Kronenadler −8%, Zwergadler −5% (93→88,35%), Aguja −5%, Schwarzmilan −10%, Rotmilan −11%, Mäusebussard −5%, Rotschwanzbussard +8%, Königsbussard −5%. Habichtsadler bleibt 89%.
- Vergrößerung zusätzlich mit maxHeight freigegeben, damit CSS sie nicht bei 100% begrenzt. Browser misst Rotschwanz 1,08 und Riesenseeadler 1,04, beide zentriert. Alle weiteren eingetragenen Größen auf ihren Artseiten geprüft.
- Build, Morphenbildtest, Design-Lint, Lint geänderter Quelldateien und Diff-Check erfolgreich. Vollständiges Lint weiterhin vier bestehende Fehler in unberührten carousel.tsx/chart.tsx.
- Bilddateien/Prompts/Quellen/Prüfung: output/imagegen/anatomy-refresh-20260913/user-corrections-v3.json. Kein laufender Imagegen-Auftrag.
- Weiter offen bleibt das Gesamtziel: Falken (Turmfalke v2 weiter abgelehnt), übriger Bestand einschließlich aller vorhandenen Varianten und abschließende Sichtprüfung. Vorherige Listen oben sind historisch, dieser Nachtrag hat Vorrang.

## Falken-Durchgang nach Größenkorrekturen
- Aktive Dateien aller sechs Falkenarten einschließlich 17 Alters-/Morphenbildern erfasst und als Artmatrizen angesehen: output/imagegen/falcon-review-20260913/current-sources.json und *-matrix.jpg.
- Turmfalke: v4-Edit wegen weiter puppenhaftem Rumpf verworfen. Vollständiger neuer Adult v5 direkt anhand des echten Nutzerfotos derselben Art; Weibchen/Jungvogel unmittelbar aus finalem Adult-v5-Master. Alle drei Bilder lokal freigestellt, zentriert und als 20260913-v5 eingebunden. Keine Bussardanatomie als Vorlage. Neue Serie ist technisch und visuell geprüft, Nutzerfeedback dazu noch ausstehend.
- Saker-/Baumfalken-Jungvögel: Konturen/innere Stellung wichen leicht ab (alte Silhouetten-IoU 0,961 bzw. 0,926); direkte Neuedits der jeweiligen vorhandenen Adultbilder, jetzt genaue adulte Alpha-Maske und Landmarken kontrolliert.
- Wanderfalken-Jungvogel: schematische Muster durch direktes Adult-Edit erneuert, altersgerechte Längszeichnung und natürlichere Federn.
- Gerfalke: alle sechs Formen zusammen angesehen; vom Nutzer bestätigte adulte Geometrie behalten, keine neue Serie nötig. Lannerfalke: bestehendes Alterspaar passt im Vergleich, erhalten.
- Sechs neue Dateien im localhost-Browser tatsächlich geladen und Varianten gewechselt; Kantenkontaktbogen auf Weiß/Dunkel/Violett gesehen. Dateinachweise/Prompts in output/imagegen/falcon-review-20260913/edits.json (eingebaute Bildgenerierung, lokale Freistellung).
- Gesamtinventar nun 39 Arten in output/review/current-flight-inventory.json. Die dortige Quelle für Turm-/Wander-/Saker-/Baumfalken muss bei nächstem Gesamtaudit frisch aus lib/bird-images.ts aktualisiert werden, da die Übersicht vor diesem Einbau entstand.
- Nächster verbleibender Schritt: Variantenmatrizen der übrigen 15 Arten (Falklandkarakara, Aguja, Steinadler, Rotmilan, Gaukler, Uhu, Schwarzmilan, Sperber, Virginia-Uhu, Fischadler, Schopfkarakara, Kampfadler, Habicht, Sekretär, Bartgeier) systematisch prüfen, konkrete Abweichungen beheben, danach gesamter Bestand abschließend prüfen. Deren adulte Kontaktbögen remaining-adults-1/2/3.jpg wurden bereits angesehen: grundsätzlich passende Links-/Unteransicht, keine abgeschnittenen Flügel; dies beweist noch nicht saubere Varianten/Detailkanten.

## Abschluss des Gesamtbestands
- Alle 39 Arten / 108 auswählbaren Zustände vollständig als Artmatrizen geprüft. Neun weitere Varianten korrigiert und auf localhost eingebunden, im Browser geladen.
- Aktuelle Befunde, Dateien, Prompts, Hashes und Prüfgrenzen: [flugbilder-abschluss-20260913.md](flugbilder-abschluss-20260913.md). Dieser Abschluss ersetzt sämtliche früheren offenen Restbestandslisten.
- Build und bildbezogene Prüfungen bestanden; vier bestehende Lintfehler in unberührten carousel/chart-Komponenten bleiben unabhängig davon bestehen. Keine offene konkrete Bildkorrektur aus dem aktuellen Prüfdurchgang.

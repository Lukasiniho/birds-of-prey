# Wespenbussard-Porträt

Auf Nutzerwunsch das ältere Original passend zum Produktions-Screenshot wieder eingebunden.

- Vorher: public/birds/portrait-wespenbussard-20260912.png
- Wiederhergestellt aus HEAD:public/birds/portrait-wespenbussard.png
- Ausgabe: public/birds/portrait-wespenbussard.png
- SHA-256: e6946d396bb1263c0081c477d78b9642ebc31bf9f1ac6d466d0c3b1afaf95651
- Referenz: Nutzer-Screenshot vom 13. September 2026, 14:59:22; maßgeblich für den ausdrücklich gewünschten älteren Ausschnitt.
- Keine Generierung, kein Prompt, keine Bildbearbeitung: Original unverändert übernommen, vorhandenen Alpha-Kanal erhalten.
- Freistellung und Darstellung auf hellen, dunklen und farbigen Hintergründen geprüft.

## Präzisierung: ein Zwischending

Das bloße Wiederherstellen war nicht gewünscht. Aktuell ist `public/birds/portrait-wespenbussard-20260913-middle.png` eingebunden: ein schlankerer Kopf und ruhigerer Ausdruck mit mittlerem Halsausschnitt. Mit dem eingebauten Imagegen-Werkzeug vom alten Original bearbeitet; kompakte Version als zweiter Endpunkt, Habicht ausschließlich als Kompositionsreferenz. Finaler Prompt und Quellhashes: `output/imagegen/wespenbussard-middle-20260913/prompt.txt` und `verification.json`. Finale Freistellung: `extract.py` (GrabCut mit geschütztem Innenbereich). `finish.mjs` und `comparison.png` dokumentieren den verworfenen ersten Freistellversuch; maßgeblich ist `final-review.png`.

Abnahme: finale Freistellung auf drei Hintergründen und lokale Artenleiste visuell geprüft. Gleichzeitig Zwergadler von 108 % auf 100 % und Aguja von 100 % auf 110 % angepasst; gemeinsame Porträtbox bleibt unverändert. `npm run images`, `npm run lint` und `npm run build` erfolgreich.

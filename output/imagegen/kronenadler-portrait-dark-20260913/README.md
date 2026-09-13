# Kronenadler: dunkleres adultes Kopfgefieder

Die Farbkorrektur basiert direkt auf dem zuletzt eingebundenen Porträt `public/birds/portrait-kronenadler-20260913-v4.png`, einschließlich seiner Halskorrektur. Das adulte Flugbild `public/birds/kronenadler-20260913-v3.png` dient ausschließlich als Farbreferenz für Kopf und Hals.

Ergebnis: `public/birds/portrait-kronenadler-20260913-v5.png`. Built-in Imagegen mit [exaktem Prompt](final-prompt.txt); anschließend lokale Wiederherstellung des Original-Alphakanals und Randfarbenbereinigung mit `scripts/restore-bird-alpha.mjs`. Keine Änderungen an UI-Maßstab oder Ausschnitt.

[Prüfnachweis und SHA-256](verification.json), [Vorher/nachher auf drei Hintergründen](comparison.png). Die Freistellung ist pixelgenau identisch mit v4. Kopf, Auge, Schnabel, Haube und Halsabschluss wurden im direkten Vergleich visuell geprüft. Das Gefieder ist dunkler, die Federstruktur bleibt sichtbar.

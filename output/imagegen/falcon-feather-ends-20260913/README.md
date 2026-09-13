# Falken: Federabschlüsse

Auf Nutzerwunsch ausschließlich die unteren Federabschlüsse von Lannerfalke, Sakerfalke und Turmfalke korrigiert. Baumfalke und Gerfalke sind bestätigte Referenzen für klar definierte, natürlich unregelmäßige Federspitzen. Kein optischer Blur, kein Ausblenden in Transparenz.

Mit dem eingebauten Imagegen-Werkzeug bearbeitet. Die jeweiligen aktiven Originale waren die Bearbeitungsziele; Referenzarten dienten nur dem Federabschluss. Die vollständigen Prompts liegen in den drei *-prompt.txt-Dateien, sämtliche Quell- und Ausgabehashes in manifest.json. extract.py dokumentiert die lokale Freistellung mit geschütztem Gefiederinneren und einer eigenständigen Maske für die neu gezeichneten Federränder. Keine Skalierung oder Verzerrung.

comparison.png zeigt pro Zeile das alte Bild und die neue Fassung auf hellem, dunklem und grünem Hintergrund.

Abnahme: Alle sechs Falken gemeinsam in der lokalen Artenleiste geprüft. `npm run images`, `npm run lint` und `npm run build` erfolgreich.

Finale Dateien:
- [Lannerfalke](../../../public/birds/portrait-lannerfalke-20260913-feather-ends.png) · [Prompt](lannerfalke-prompt.txt)
- [Sakerfalke](../../../public/birds/portrait-sakerfalke-20260913-feather-ends.png) · [Prompt](sakerfalke-prompt.txt)
- [Turmfalke](../../../public/birds/portrait-turmfalke-20260913-feather-ends.png) · [Prompt](turmfalke-prompt.txt)

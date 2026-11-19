/* vektor.js — VEKTOR · physikalisch · aus achse.csv
   ALT: achse.csv -> achse.js (nur Datei-Name)
   NEU: VEKTOR (physikalisch)
   Vektor = Richtung + Betrag. X HYPE, Y CALC, Z iki2li sind 3 Vektoren.
   CSV erst löschen, wenn VEKTOR läuft + Werte mit CSV übereinstimmen.
   ============================================================ */
'use strict';
const VEKTOR = {
  quelle: 'achse.csv -> vektor.js',
  alt: 'achse.js',
  // 3 Vektoren, wie 3 Achsen im Raum
  vektoren: [
    { achse: 'X', name: 'HYPE',  farbe: '#a78bfa', betrag: 0.5, richtung: [1, 0, 0] },
    { achse: 'Y', name: 'CALC',  farbe: '#4dd0e1', betrag: 0.5, richtung: [0, 1, 0] },
    { achse: 'Z', name: 'iki2li', farbe: '#f5a342', betrag: 0.5, richtung: [0, 0, 1] },
  ],
  get(achse) { return this.vektoren.find(v => v.achse === achse); },
  setBetrag(achse, betrag) {
    const v = this.get(achse);
    if (v) v.betrag = Math.max(0, Math.min(1, betrag));
    return v;
  },
  // Betrag = Länge des Vektors. |v| = sqrt(x²+y²+z²)
  laenge(v) { return Math.sqrt(v.richtung.reduce((s, c) => s + c*c, 0)) * v.betrag; },
  ausCsvZeile(zeile) {
    const [achse, name, farbe, betrag] = zeile.split(',').map(s => s.trim());
    return { achse, name, farbe, betrag: parseFloat(betrag) || 0.5 };
  }
};
if (typeof window !== 'undefined') window.VEKTOR = VEKTOR;
if (typeof module !== 'undefined' && module.exports) module.exports = { VEKTOR };

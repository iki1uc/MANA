/* schwingung.js — SCHWINGUNG · physikalisch · aus zyklus.csv
   ALT: zyklus.csv -> zyklus.js (nur Datei-Name)
   NEU: SCHWINGUNG (physikalisch)
   Schwingung = hin + her, periodisch. Frequenz = wie oft pro Zeit.
   DA -> NE -> BEN -> KI -> DA ist eine Schwingung, keine Hypnose.
   3-6-9-0-3: 3 Start, 6 Bauen, 9 volle Spannung, 0 Reset, 3 Neustart.
   ============================================================ */
'use strict';
const SCHWINGUNG = {
  quelle: 'zyklus.csv -> schwingung.js',
  alt: 'zyklus.js',
  fokus: ['DA', 'NE', 'BEN', 'KI', 'DA'],
  phasen: [
    { wert: 3, name: 'Start',          frequenz: 3, text: '3 = Start, Auslenkung klein' },
    { wert: 6, name: 'Bauen',          frequenz: 6, text: '6 = Bauen, Auslenkung wächst' },
    { wert: 9, name: 'Volle Spannung', frequenz: 9, text: '9 = volle Spannung, Umkehrpunkt' },
    { wert: 0, name: 'Reset',          frequenz: 0, text: '0 = Reset, durch Null' },
    { wert: 3, name: 'Neustart',       frequenz: 3, text: '3 = Neustart, neue Schwingung' },
  ],
  // Auslenkung = sin(2*pi*f*t). f = Frequenz, t = Zeit.
  auslenkung(frequenz, t) { return Math.sin(2 * Math.PI * frequenz * t); },
  schritt(i) {
    const idx = ((i % 4) + 4) % 4;
    return { schritt: this.fokus[idx], naechster: this.fokus[idx + 1] || 'DA' };
  },
  phaseAusMinute(minute) {
    if (minute < 15) return this.phasen[0];
    if (minute < 30) return this.phasen[1];
    if (minute < 45) return this.phasen[2];
    if (minute < 60) return this.phasen[3];
    return this.phasen[4];
  },
  ausCsvZeile(zeile) {
    const [wert, name, text] = zeile.split(',').map(s => s.trim());
    return { wert: parseInt(wert) || 0, name, text };
  }
};
if (typeof window !== 'undefined') window.SCHWINGUNG = SCHWINGUNG;
if (typeof module !== 'undefined' && module.exports) module.exports = { SCHWINGUNG };

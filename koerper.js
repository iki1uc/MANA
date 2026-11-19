/* koerper.js — KÖRPER · physikalisch · aus form.csv
   ALT: form.csv -> form.js (nur Datei-Name)
   NEU: KÖRPER (physikalisch)
   Körper = Form mit Masse + Volumen. Nicht nur Umriss.
   PUNKT hat 0 Ecken, KREUZ hat 4, WÜRFEL hat 8, DIAMANT 6, PYRAMIDE 5.
   ============================================================ */
'use strict';
const KOERPER = {
  quelle: 'form.csv -> koerper.js',
  alt: 'form.js',
  koerper: [
    { id: 'PUNKT',    ecken: 0, masse: 0,   text: '1 Punkt — NC Mitte, keine Ausdehnung' },
    { id: 'KREUZ',    ecken: 4, masse: 4,   text: '4 Stationen — AH HA HÄ ÄH' },
    { id: 'WUERFEL',  ecken: 8, masse: 8,   text: '8 Ecken — NANO-WÜRFEL' },
    { id: 'DIAMANT',  ecken: 6, masse: 6,   text: '6 Spitzen — Diamant' },
    { id: 'PYRAMIDE', ecken: 5, masse: 5,   text: '5 Punkte — Pyramide' },
  ],
  aktiv: 'WUERFEL',
  set(id) { if (this.koerper.find(k => k.id === id)) this.aktiv = id; return this.aktiv; },
  get() { return this.koerper.find(k => k.id === this.aktiv); },
  ausCsvZeile(zeile) {
    const [id, ecken, text] = zeile.split(',').map(s => s.trim());
    return { id, ecken: parseInt(ecken) || 0, text };
  }
};
if (typeof window !== 'undefined') window.KOERPER = KOERPER;
if (typeof module !== 'undefined' && module.exports) module.exports = { KOERPER };

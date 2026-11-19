/* feld.js — FELD · physikalisch · aus raum.csv
   ALT: raum.csv -> raum.js (nur Datei-Name)
   NEU: FELD (physikalisch)
   Feld = Raum mit Wirkung an jedem Ort. Nicht leerer Raum.
   Jeder Ort hat eine Feldstärke: 3 Ursprung, 9 Zone, 27 Ort, 81 Zeit, 243 Träger, 729 Siegel.
   ============================================================ */
'use strict';
const FELD = {
  quelle: 'raum.csv -> feld.js',
  alt: 'raum.js',
  orte: [
    { ort: '3',   name: 'ORG',     feldstaerke: 1.0, text: 'Woher? Ursprung' },
    { ort: '9',   name: 'REORG',   feldstaerke: 0.9, text: 'Zone: Einzug' },
    { ort: '27',  name: 'WO',      feldstaerke: 0.7, text: 'Wo? Ort' },
    { ort: '81',  name: 'WANN',    feldstaerke: 0.5, text: 'Wann? Zeit' },
    { ort: '243', name: 'BEI WEM', feldstaerke: 0.3, text: 'Bei wem? Träger' },
    { ort: '729', name: 'KARTOR',  feldstaerke: 0.0, text: 'Versiegelt. Erinnerung. Feld = 0, nicht anfassen.' },
  ],
  get(ort) { return this.orte.find(o => o.ort === String(ort)); },
  feldstaerke(ort) { const o = this.get(ort); return o ? o.feldstaerke : 0; },
  ausCsvZeile(zeile) {
    const [ort, name, text] = zeile.split(',').map(s => s.trim());
    return { ort, name, text };
  }
};
if (typeof window !== 'undefined') window.FELD = FELD;
if (typeof module !== 'undefined' && module.exports) module.exports = { FELD };

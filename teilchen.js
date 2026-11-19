/* teilchen.js — TEILCHEN · physikalisch · aus punkt.csv
   ALT: punkt.csv -> punkt.js (nur Datei-Name)
   NEU: TEILCHEN (physikalisch)
   Teilchen = Punktmasse mit POS + IMPULS. POS sagt wo, IMPULS sagt wohin.
   POS initiiert neues Setup. Nicht Ori.
   ============================================================ */
'use strict';
const TEILCHEN = {
  quelle: 'punkt.csv -> teilchen.js',
  alt: 'punkt.js',
  pos: { x: 0.5, y: 0.5, z: 0.5 },
  impuls: { x: 0, y: 0, z: 0 },
  setPos(x, y, z) {
    this.pos = {
      x: Math.max(0, Math.min(1, x ?? this.pos.x)),
      y: Math.max(0, Math.min(1, y ?? this.pos.y)),
      z: Math.max(0, Math.min(1, z ?? this.pos.z)),
    };
    return { ...this.pos };
  },
  setImpuls(x, y, z) { this.impuls = { x, y, z }; return { ...this.impuls }; },
  getPos() { return { ...this.pos }; },
  // Abstand = MIRROR_DISTANCE. Wie weit ist Teilchen A von Teilchen B?
  abstand(anderer) {
    const dx = this.pos.x - anderer.x, dy = this.pos.y - anderer.y, dz = this.pos.z - anderer.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  },
  ausCsvZeile(zeile) {
    const [name, x, y, z] = zeile.split(',').map(s => s.trim());
    return { name, x: parseFloat(x) || 0.5, y: parseFloat(y) || 0.5, z: parseFloat(z) || 0.5 };
  }
};
if (typeof window !== 'undefined') window.TEILCHEN = TEILCHEN;
if (typeof module !== 'undefined' && module.exports) module.exports = { TEILCHEN };

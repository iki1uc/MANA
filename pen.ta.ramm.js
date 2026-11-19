/* ============================================================
   pen.ta.ramm.js — PEN.TA.RAMM · physikalisch = STERN
   Pentagramm ist kein Esoterik-Zeichen. Physikalisch ist es ein STERN:
   5 Spitzen, 5 Vektoren, 1 Mitte. MITTE 41. HOME 40.
   5 Spitzen = 5 Kräfte, die sich in der Mitte treffen.
   STERN: jede Spitze ist ein Vektor. Mitte hält alle.
   ============================================================ */
'use strict';
const STERN = {
  name: 'PEN.TA.RAMM',
  physikalisch: 'STERN',
  mitte: 41,
  home: 40,
  // 5 Spitzen — 5 Vektoren, Winkel 72° auseinander (360 / 5)
  spitzen: [
    { id: 1, name: 'OBEN',      winkel: -90, vektor: [0, -1],  text: 'Spitze oben — Richtung' },
    { id: 2, name: 'RECHTS',    winkel: -18, vektor: [1, 0],   text: 'Spitze rechts — Kraft' },
    { id: 3, name: 'UNTEN_R',   winkel: 54,  vektor: [0.5, 1], text: 'Spitze unten-rechts — Halten' },
    { id: 4, name: 'UNTEN_L',   winkel: 126, vektor: [-0.5, 1], text: 'Spitze unten-links — Tragen' },
    { id: 5, name: 'LINKS',     winkel: 162, vektor: [-1, 0],  text: 'Spitze links — Weitergabe' },
  ],
  // Mitte = Mittelwert aller Spitzen. Nicht eingetippt. Gerechnet.
  mitteBerechnen() {
    let x = 0, y = 0;
    for (const s of this.spitzen) { x += s.vektor[0]; y += s.vektor[1]; }
    return { x: x / 5, y: y / 5, mitte: this.mitte, home: this.home };
  },
  // Jede Spitze als Vektor: Betrag + Richtung
  vektor(spitzeId) {
    const s = this.spitzen.find(p => p.id === spitzeId);
    if (!s) return null;
    const betrag = Math.sqrt(s.vektor[0]*s.vektor[0] + s.vektor[1]*s.vektor[1]);
    return { ...s, betrag };
  },
  // STERN zeichnen: 5 Linien, Mitte 41
  // Benutzung: STERN.zeichnen(ctx, cx, cy, R)
  zeichnen(ctx, cx, cy, R) {
    if (!ctx) return null;
    ctx.strokeStyle = 'rgba(255,215,0,0.6)';
    ctx.lineWidth = 1;
    // 5 Spitzen-Positionen aus Winkel
    const punkte = this.spitzen.map(s => {
      const rad = (s.winkel * Math.PI) / 180;
      return { id: s.id, x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R };
    });
    // Stern-Verbindung: 1-3-5-2-4-1 (Pentagramm-Linie)
    const reihenfolge = [0, 2, 4, 1, 3, 0];
    ctx.beginPath();
    reihenfolge.forEach((idx, i) => {
      const p = punkte[idx];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    // Mitte
    ctx.fillStyle = '#ffd700';
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5a6a80';
    ctx.font = '10px Consolas'; ctx.textAlign = 'center';
    ctx.fillText('41', cx, cy + 16);
    return { gezeichnet: true, mitte: this.mitte, punkte };
  }
};
if (typeof window !== 'undefined') { window.STERN = STERN; window.PENTAGRAMM = STERN; }
if (typeof module !== 'undefined' && module.exports) module.exports = { STERN, PENTAGRAMM: STERN };

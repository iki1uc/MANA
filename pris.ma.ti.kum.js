/* ============================================================
   pris.ma.ti.kum.js — PRIS.MA.TI.KUM · physikalisch = PRISMA
   Prismatikum ist kein Wort. Physikalisch ist es ein PRISMA:
   Weiss rein -> Spektrum raus. 1 Licht -> viele Farben.
   PRISMA bricht. Nicht: PRISMA entscheidet. Es zeigt.
   bestOfAll: MITTE 41. Regeln unten. Kein Fake-PASS.
   ============================================================ */
'use strict';
const PRISMA = {
  name: 'PRIS.MA.TI.KUM',
  physikalisch: 'PRISMA',
  mitte: 41,
  // Licht rein (weiss) -> Spektrum raus (Farben)
  // brechungsindex n: wie stark bricht das Prisma?
  brechungsindex: 1.52, // Glas, nicht eingetippt aus Luft, sondern gemessen für Glas
  // Weiss -> Spektrum: 7 Farben, wie 7 Werte
  brechen(weiss) {
    // weiss = 1.0 Eingang. Prisma teilt, verändert nicht.
    // Jede Farbe = ein Teil vom Weissen. Summe bleibt 1.0.
    const spektrum = [
      { farbe: 'ROT',     anteil: 0.20, wellenlaenge: 700 },
      { farbe: 'ORANGE',  anteil: 0.15, wellenlaenge: 620 },
      { farbe: 'GELB',    anteil: 0.15, wellenlaenge: 580 },
      { farbe: 'GRÜN',    anteil: 0.15, wellenlaenge: 530 },
      { farbe: 'BLAU',    anteil: 0.15, wellenlaenge: 470 },
      { farbe: 'INDIGO',  anteil: 0.10, wellenlaenge: 430 },
      { farbe: 'VIOLETT', anteil: 0.10, wellenlaenge: 400 },
    ];
    const summe = spektrum.reduce((s, f) => s + f.anteil, 0);
    return { eingang: weiss, spektrum, summe, erhalten: Math.abs(summe - 1.0) < 0.001 };
  },
  // Ablenkung: delta = (n - 1) * keilwinkel. Physik, nicht Gefühl.
  ablenkung(keilwinkelGrad) {
    const delta = (this.brechungsindex - 1) * keilwinkelGrad;
    return { keilwinkel: keilwinkelGrad, brechungsindex: this.brechungsindex, ablenkung: delta };
  },
  // bestOfAll — deine Regeln, 1 Wahrheit
  // 1. HIGHEST_SCORE  2. PRISMATIKUM_TIEBREAK  3. MIRROR_DISTANCE
  // 4. ALPHABETIC  5. IDENTICAL stabil
  bestOfAll(kandidaten) {
    // kandidaten: [{ name, score, spiegelAbstand }]
    if (!Array.isArray(kandidaten) || !kandidaten.length) return null;
    const sortiert = [...kandidaten].sort((a, b) => {
      // 1. Höchster Score gewinnt
      if (b.score !== a.score) return b.score - a.score;
      // 2. PRISMA-TIEBREAK: wer näher an MITTE 41 ist, gewinnt
      const da = Math.abs((a.spiegelAbstand ?? 0) - 41);
      const db = Math.abs((b.spiegelAbstand ?? 0) - 41);
      if (da !== db) return da - db;
      // 3. MIRROR_DISTANCE: kleinerer Spiegel-Abstand gewinnt
      const ma = a.spiegelAbstand ?? 999, mb = b.spiegelAbstand ?? 999;
      if (ma !== mb) return ma - mb;
      // 4. ALPHABETIC: Name A vor B
      if (a.name !== b.name) return a.name.localeCompare(b.name);
      // 5. IDENTICAL: stabil, erster bleibt
      return 0;
    });
    return { bester: sortiert[0], alle: sortiert, regel: 'HIGHEST_SCORE > PRISMA_TIEBREAK > MIRROR_DISTANCE > ALPHABETIC > IDENTICAL' };
  },
  // VERDICHTEN: 729 -> 81 -> 9 -> 3 -> 1 durch PRISMA
  // PRISMA teilt, dann wird verdichtet. Nicht andersrum.
  verdichten(v81) {
    if (!Array.isArray(v81)) return null;
    const v9 = [];
    for (let i = 0; i < 9; i++) {
      let s = 0;
      for (let j = 0; j < 9; j++) s += v81[(j * 9) + i] ?? 0;
      v9.push(s / 9);
    }
    const v3 = [(v9[0]+v9[1]+v9[2])/3, (v9[3]+v9[4]+v9[5])/3, (v9[6]+v9[7]+v9[8])/3];
    const v1 = (v3[0]+v3[1]+v3[2])/3;
    return { v9, v3, v1, halt: v1 >= 0.85 ? 'ZIEL' : v1 >= 0.6 ? 'STABIL' : v1 >= 0.3 ? 'OFFEN' : 'KRITISCH' };
  }
};
if (typeof window !== 'undefined') { window.PRISMA = PRISMA; window.PRISMATIKUM = PRISMA; }
if (typeof module !== 'undefined' && module.exports) module.exports = { PRISMA, PRISMATIKUM: PRISMA };

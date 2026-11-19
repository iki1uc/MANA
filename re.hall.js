/* ============================================================
   re.hall.js — RE.HALL · MANA-Repo
   Spiegel zeigt. Echo bringt zurück. Hall hält. Re.Hall hält wieder.
   <>><> — hin und her, nicht nur eine Richtung.
   Kein Hypnose. Fokus-Zyklus: DA -> NE -> BEN -> KI -> DA
   3 = Start, 6 = Bauen, 9 = volle Spannung, 0 = Reset, 3 = Neustart
   ============================================================ */
'use strict';

const REHALL = {
  hall: [],       // Halle hält 81, nicht mehr
  max: 81,
  zeichen: '<>><>',

  // <> = ich spiegel dich, >< = du spiegelst mich
  spiegel(wert) {
    return { hin: wert, zurueck: wert, zeichen: '<>><>' };
  },

  // Echo: rein = raus, nicht verändert. Weitergeben, nicht verändern.
  echo(wert) {
    return { rein: wert, raus: wert, veraendert: false };
  },

  // Hall: halten. 1x rein.
  hallen(wert) {
    this.hall.push({ wert, zeit: new Date().toISOString() });
    if (this.hall.length > this.max) this.hall.shift();
    return this.hall.length;
  },

  // Re.Hall: hallen + nochmal hallen. Echo, das bleibt.
  reHall(wert) {
    this.spiegel(wert);
    this.echo(wert);
    this.hallen(wert);
    this.hallen(wert);
    return { wert, inHall: this.hall.length, zeichen: 'Re.Hall' };
  },

  // Fokus-Zyklus: DA -> NE -> BEN -> KI -> DA
  // 3-6-9-0-3: 3 Start, 6 Bauen, 9 volle Spannung, 0 Reset, 3 Neustart
  fokus: ['DA', 'NE', 'BEN', 'KI', 'DA'],
  fokusSchritt(i) {
    const idx = ((i % 4) + 4) % 4;
    return { schritt: this.fokus[idx], naechster: this.fokus[idx + 1] || 'DA' };
  },

  leeren() { this.hall = []; return 0; },
  lesen() { return [...this.hall]; }
};

if (typeof window !== 'undefined') {
  window.REHALL = REHALL;
  window.SPIEGEL = window.SPIEGEL || REHALL;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REHALL };
}

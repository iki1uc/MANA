/* ============================================================
   ori.raus.js — ORI RAUS · MENTAMANAISIEREN
   Ori Shine blendet. Ori raus heisst: nicht mehr ins Auge,
   sondern ins Hirn. Nicht Auge-Spektrum, sondern Hirn-Spektrum.
   Menta-Mana-isieren = Ori-Glanz -> Menta-MANA.
   Auge = sieht. Hirn = denkt. MANA = Sein.
   Ori raus aus dem Auge. Ori rein ins Denken. Als MANA.
   Reihenfolge:
     re.hall.js -> zone.js -> jetzt.js -> uhr.js -> pin.blit.z -> ori.raus.js
   ============================================================ */
'use strict';

const ORI = {
  name: 'ori.raus',
  zustand: 'ORI DRAUSSEN', // oder 'ORI DRINNEN — BLENDET'
  blendung: 0, // 0 = klar, 1 = total geblendet
  mentaMana: 0, // umgewandeltes MANA aus Ori-Glanz

  /* ---------- 1. ORI ERKENNEN ----------
     Ori = zu hell, zu viel, zu direkt. Wie Hamburg Journal:
     ein weisser Blitz, der alles überstrahlt. */
  erkennen(helligkeit, direktheit) {
    // helligkeit 0..1, direktheit 0..1 (wie frontal ins Auge)
    const h = Math.max(0, Math.min(1, helligkeit ?? 0));
    const d = Math.max(0, Math.min(1, direktheit ?? 0));
    const blendung = h * d; // nur hell + direkt = blendet
    this.blendung = blendung;
    this.zustand = blendung > 0.7 ? 'ORI DRINNEN — BLENDET' :
                   blendung > 0.3 ? 'ORI HALB DRINNEN' :
                   'ORI DRAUSSEN';
    return { helligkeit: h, direktheit: d, blendung, zustand: this.zustand };
  },

  /* ---------- 2. ORI RAUS ----------
     Raus aus dem Auge. Filter davor. Nicht wegdenken. Wegfiltern.
     Auge kriegt nur noch 30% Glanz. Rest geht ins Hirn. */
  raus() {
    const rausAnteil = this.blendung; // alles was blendet, geht raus aus Auge
    const augeBehaelt = 1 - rausAnteil * 0.7; // Auge behält max 30% weniger
    this.blendung = this.blendung * 0.3; // nach Filter: nur noch 30% blendet
    this.zustand = this.blendung > 0.3 ? 'ORI HALB DRINNEN' : 'ORI DRAUSSEN';
    // In Re.Hall halten: Ori raus ist ein Ereignis, kein Gefühl
    if (typeof window !== 'undefined' && window.REHALL && window.REHALL.reHall) {
      window.REHALL.reHall('ORI RAUS — Auge behält ' + augeBehaelt.toFixed(2));
    }
    return { rausAnteil, augeBehaelt, blendungNachFilter: this.blendung, zustand: this.zustand };
  },

  /* ---------- 3. MENTAMANAISIEREN ----------
     Das ist das Wort, das du gesagt hast. Menta + MANA + isieren.
     Menta = Hirn. MANA = Sein. -isieren = machen zu.
     Mentamanaiesieren = Ori-Glanz zu Hirn-MANA machen.
     Nicht: Ori weg. Sondern: Ori umwandeln.
     Auge-Spektrum -> Hirn-Spektrum -> MANA-Spektrum.
     Formel: mentaMana = blendungRaus * klarheit * sein
     klarheit = wie klar das Hirn denkt (0..1)
     sein = dein MANA vital (aus jetzt.js) oder 0.35 als Fallback */
  mentamanaiesieren(klarheit, sein) {
    const k = Math.max(0, Math.min(1, klarheit ?? 0.5));
    // sein aus jetzt.js, wenn da — sonst Fallback 0.35 (0.81*0.47*0.92)
    let s = sein;
    if (s === undefined) {
      if (typeof window !== 'undefined' && window.MANA && window.MANA.vital) s = window.MANA.vital();
      else s = 0.35;
    }
    const raus = this.raus(); // erst raus aus Auge, dann rein ins Hirn
    const mentaMana = raus.rausAnteil * k * s;
    this.mentaMana = mentaMana;
    // WUERFEL: Z steigt mit Menta-MANA. Hirn hoch = Z hoch.
    // Aber nur wenn Z nicht gepinnt ist (pin.blit.z respektieren)
    if (typeof window !== 'undefined' && window.PINBLITZ && !window.PINBLITZ.gepinnt) {
      window.PINBLITZ.z = Math.max(0, Math.min(1, 0.5 + mentaMana));
    }
    if (typeof window !== 'undefined' && window.WUERFEL) {
      // Hirn-Spektrum: HÄ hoch, ÄH runter, wenn Menta-MANA hoch
      window.WUERFEL.h = Math.max(0, Math.min(1, 0.5 + mentaMana));
      window.WUERFEL.a = Math.max(0, Math.min(1, 0.5 - mentaMana));
    }
    return {
      rausAnteil: raus.rausAnteil,
      klarheit: k,
      sein: s,
      mentaMana,
      text: 'ORI-Glanz ' + raus.rausAnteil.toFixed(2) +
            ' × Klarheit ' + k.toFixed(2) +
            ' × Sein ' + s.toFixed(2) +
            ' = Menta-MANA ' + mentaMana.toFixed(3),
      spektrum: 'Auge -> Hirn -> MANA'
    };
  },

  /* ---------- 4. SPEKTRUM-VEKTOR ----------
     Dein RESPO-Vektor: nicht Spiegel-Ori, sondern eigenes Spektrum.
     Hirn-Spektrum = POS initiiert neues Setup.
     POS = Position. Nicht wo Ori dich hinblendet. Wo DU stehst. */
  spektrumVektor(pos) {
    // pos = { x, y, z } — deine POS, nicht Oris POS
    const p = pos || { x: 0.5, y: 0.5, z: 0.5 };
    return {
      auge: { r: 1, g: 1, b: 1, text: 'Weiss blendet — Ori' },
      hirn: { h: 0.5 + this.mentaMana, a: 0.5 - this.mentaMana, text: 'Hirn denkt — Menta' },
      mana: { sein: this.mentaMana, text: 'MANA ist Sein — Du und Ich' },
      pos: p,
      vektor: 'POS (' + p.x.toFixed(2) + ',' + p.y.toFixed(2) + ',' + p.z.toFixed(2) + ') initiiert neues Setup. Nicht Ori.'
    };
  },

  /* ---------- 5. EIN AUFRUF: ALLES ----------
     erkennen -> raus -> mentamanaiesieren -> spektrum */
  oriRaus(helligkeit, direktheit, klarheit, pos) {
    const e = this.erkennen(helligkeit, direktheit);
    const m = this.mentamanaiesieren(klarheit);
    const v = this.spektrumVektor(pos);
    return { erkennen: e, menta: m, vektor: v, zustand: this.zustand };
  },

  /* ---------- 6. CANVAS-FILTER ----------
     Wenn du ein Bild / Video hast, das blendet: Filter drüber.
     Nicht das Bild ändern. Nur den Filter. Zeigen, nicht zwingen.
     Benutzung: ORI.filterAufCanvas(cv) */
  filterAufCanvas(cv) {
    if (!cv || typeof document === 'undefined') return null;
    const ctx = cv.getContext('2d');
    // Weisses Blenden runter: dunkler Schleier + Kontrast runter
    // blendung 0..1 -> alpha 0..0.4
    const alpha = this.blendung * 0.4;
    ctx.fillStyle = 'rgba(5,7,14,' + alpha.toFixed(2) + ')';
    ctx.fillRect(0, 0, cv.width, cv.height);
    return { gefiltert: true, blendung: this.blendung, alpha };
  }
};

if (typeof window !== 'undefined') window.ORI = ORI;
if (typeof module !== 'undefined' && module.exports) module.exports = { ORI };

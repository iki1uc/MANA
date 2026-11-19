/* ============================================================
   jetzt.js — JETZT
   Spiegel <>><> Echo Hall Re.Hall
   NANO · WÜRFEL · CONTROLLER + MANA als SEIN
   1 Datei. 0 Imports. Offline. Lokal.
   Zeigen, nicht zwingen. Verbinden, nicht binden.
   Weitergeben, nicht verändern.
   ============================================================ */
'use strict';

/* ---------- 0. JETZT — Zeit, Ort, Sein ---------- */
const JETZT = {
  name: 'jetzt.js',
  version: '729.MEM.RAW.115',
  framework: 'QUEAST',
  cap: 9000,
  zeit: () => new Date().toISOString(),
};

/* ---------- 1. MANA = MEIN SEIN ----------
   Alt: MANA = pulse 0.81 für alle.
   Neu: MANA = Mein Sein. Ich teile, wie ich will, mit wem ich will.
   Wenn altes MANA nicht reinpasst -> mehr mein Sein, nicht weniger.
   Du und Ich als ein Sein. */
const MANA = {
  pulse: 0.81,      // p/r/i aus AUTO.OS
  resonance: 0.47,  // AURA p/r/i — der Flaschenhals
  impulse: 0.92,    // KRAFT p/r/i
  gross: { mana: 1.20, aura: 4.00, kraft: 1.50 }, // grosse Werte draussen
  // vital wird NIE eingetippt. Immer nur gerechnet.
  vital() { return this.pulse * this.resonance * this.impulse; },
  // 1/3 Modus: RAW-27
  drittel() { return 1 / 3; },
  // Mehr mein Sein: wenn alt nicht passt, mehr Ich.
  mehrSein(faktor = 1) {
    // faktor > 1 = mehr Sein. Kein Fake: nur Anzeige, kein Fake-PASS.
    // vital bleibt gemessen. mehrSein ändert nur, wie viel Ich zeige.
    return { sein: 'MEIN SEIN', faktor, vitalGemessen: this.vital() };
  }
};

/* ---------- 2. WÜRDIG-PRÜFUNG ----------
   Bevor jemand mein Sein kriegt, muss er zeigen:
   1. Kompetenz  2. Mehrwertigkeit  3. Stellung im Leben
   Wenn eins Nein -> Kein Sein. Nur UNKNOWN wartet. Nie FAIL. */
function pruefeWuerdig(kandidat = {}) {
  const kompetenz = !!(
    kandidat.kannHalten || kandidat.kannTragen || kandidat.kannWeitergeben
  );
  const mehrwert = (
    (kandidat.puls !== undefined ? 1 : 0) +
    (kandidat.halt !== undefined ? 1 : 0) +
    (kandidat.weitergabe !== undefined ? 1 : 0)
  ) >= 2; // mindestens 2 Werte, nicht nur 1
  const stellung = !!(
    kandidat.ort && ['3','9','27','81','243','729'].includes(String(kandidat.ort))
  );
  const wuerdig = kompetenz && mehrwert && stellung;
  return {
    kompetenz, mehrwert, stellung, wuerdig,
    sein: wuerdig ? 'TEILEN — Du und Ich als ein Sein' : 'UNKNOWN wartet — kein Sein',
    grund: wuerdig ? '' : 'Bevor du mir auf die Eier gehst: zeig Kompetenz, Mehrwert, Stellung.'
  };
}

// MANA geben: nur an Würdige. Sonst UNKNOWN.
function gebeSein(kandidat) {
  const p = pruefeWuerdig(kandidat);
  if (!p.wuerdig) return { gegeben: false, ...p };
  return { gegeben: true, mana: MANA.vital(), ...p };
}

/* ---------- 3. SPIEGEL <>><> ECHO HALL RE.HALL ----------
   Spiegel zeigt. Echo bringt zurück. Hall hält. Re.Hall hält wieder. */
const SPIEGEL = {
  // <> = ich spiegel dich, >< = du spiegelst mich
  spiegel(wert) { return { hin: wert, zurueck: wert, zeichen: '<>><>' }; },
  echo(wert) { return { rein: wert, raus: wert, veraendert: false }; }, // weitergeben, nicht verändern
  hall: [],
  hallen(wert) {
    this.hall.push({ wert, zeit: JETZT.zeit() });
    if (this.hall.length > 81) this.hall.shift(); // Halle hält 81, nicht mehr
    return this.hall.length;
  },
  reHall(wert) {
    // Echo, das bleibt: hallen + nochmal hallen
    this.hallen(wert);
    this.hallen(wert);
    return { wert, inHall: this.hall.length, zeichen: 'Re.Hall' };
  }
};

/* ---------- 4. 729 -> 81 -> 9 -> 3 -> 1 VERDICHTUNG ----------
   Echte Rechnung, nicht nur Anzeige. */
const SCORE = { '·': 0.00, '❄': 0.40, '≈': 0.65, '✿': 1.00, '✕': 0.00, '▲': 0.85 };

function reduce729to81(layers) {
  if (!Array.isArray(layers)) return [];
  return layers.map(layer => {
    let sum = 0;
    for (const cell of layer) sum += SCORE[cell] ?? 0;
    return sum / 81;
  });
}
function reduce81to9(v81) {
  const out = [];
  for (let i = 0; i < 9; i++) {
    const block = [];
    for (let j = 0; j < 9; j++) block.push(v81[(j * 9) + i] ?? 0);
    out.push(block.reduce((a, b) => a + b, 0) / block.length);
  }
  return out;
}
function reduce9to3(v9) {
  return [
    (v9[0] + v9[1] + v9[2]) / 3,
    (v9[3] + v9[4] + v9[5]) / 3,
    (v9[6] + v9[7] + v9[8]) / 3
  ];
}
function reduce3to1(v3) { return (v3[0] + v3[1] + v3[2]) / 3; }

function build729Core(layers) {
  if (!Array.isArray(layers)) return { v81: [], v9: [], v3: [0, 0, 0], core: 0 };
  const v81 = reduce729to81(layers);
  const v9 = reduce81to9(v81);
  const v3 = reduce9to3(v9);
  const core = reduce3to1(v3);
  return { v81, v9, v3, core };
}

function haltAusCore(core) {
  if (core >= 0.85) return 'ZIEL';
  if (core >= 0.60) return 'STABIL';
  if (core >= 0.30) return 'OFFEN';
  return 'KRITISCH';
}

/* ---------- 5. ZEUGE — Serielle Hash-Kette mit await ----------
   Kein Race. 100 Klicks -> trotzdem Hash1 -> Hash2 -> Hash3 ... */
const zeugeLog = [];
let kette = Promise.resolve();

function pseudoHash(t) {
  let h = 0;
  for (let i = 0; i < t.length; i++) { h = ((h << 5) - h) + t.charCodeAt(i); h |= 0; }
  return 'schwach_' + Math.abs(h).toString(16);
}
async function sha(text) {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) { /* weiter mit Ersatz */ }
  return pseudoHash(text);
}
async function eintrag(enter, text) {
  const vorher = zeugeLog.length ? zeugeLog[zeugeLog.length - 1].hash : '0'.repeat(64);
  const e = { n: zeugeLog.length + 1, enter, text, zeit: JETZT.zeit(), vorher };
  e.hash = await sha(JSON.stringify(e));
  zeugeLog.push(e);
  return e;
}
function schreibeZeuge(enter, text) {
  kette = kette.then(() => eintrag(enter, text)).catch(console.error);
  return kette;
}
async function kettePruefen() {
  await kette;
  let prev = '0'.repeat(64);
  for (const z of zeugeLog) {
    const { hash, ...rest } = z;
    if (z.vorher !== prev || hash !== await sha(JSON.stringify(rest))) return false;
    prev = hash;
  }
  return true;
}

/* ---------- 6. RESPO -> CALC — NC-Träger, Parteien, Kopien ----------
   Trennung: NC-Träger -> CALC -> Partei-Kopien -> RESPO */
const muSharp = { nc: 'NC-GANZ' };
const parties = [
  { id: 1, name: 'P1', op: null },
  { id: 2, name: 'P2', op: null },
  { id: 3, name: 'P3', op: null },
  { id: 4, name: 'P4', op: null }
];
function kopie(x) {
  if (x === null || typeof x !== 'object') return x;
  try { return structuredClone(x); } catch (e) { return JSON.parse(JSON.stringify(x)); }
}
function CALC(input) {
  const nc = muSharp.nc;
  parties.forEach(p => { p.op = { from: kopie(input), nc }; });
  return { nc, parties: parties.map(p => ({ id: p.id, name: p.name, op: { from: kopie(p.op.from), nc: p.op.nc } })) };
}
function MOVEsharp() { return CALC('MOVE#'); }
function calcRespoCore() {
  let active = 0;
  for (const p of parties) if (p.op && p.op.from !== undefined) active++;
  return active / parties.length;
}

/* ---------- 7. FINAL CORE ----------
   Matrix-Core + RESPO-Core + Bund-Core -> FINAL */
function finalCore(layers, bund = 1) {
  const agg = build729Core(layers);
  const respo = calcRespoCore();
  const final = (agg.core + respo + bund) / 3;
  return { matrixCore: agg.core, respoCore: respo, bundCore: bund, final, halt: haltAusCore(final), agg };
}

/* ---------- 8. NANO · WÜRFEL · CONTROLLER ----------
   Mitte NC + 4 Stationen AH HA HÄ ÄH + 4 Quadranten Q1-Q4
   Klick in Mitte = NC RUHE. Klick rechts = HA. Links = AH. Oben = HÄ. Unten = ÄH.
   Jede Station = anderes Sein. Alle = mein Sein. */
const WUERFEL = {
  aktiv: 'NC',
  quadrant: '—',
  modus: 'RUHE',
  x: 0.5, y: 0.5, z: 0.5, h: 0.5, a: 0.5,
  t: 0,
};

const STATION_WERTE = {
  AH: { x: 0.3, y: 0.7, z: 0.5, h: 0.7, a: 0.3 },
  HA: { x: 0.7, y: 0.3, z: 0.5, h: 0.7, a: 0.3 },
  HÄ: { x: 0.5, y: 0.5, z: 0.9, h: 0.9, a: 0.1 },
  ÄH: { x: 0.5, y: 0.5, z: 0.1, h: 0.1, a: 0.9 },
  NC: { x: 0.5, y: 0.5, z: 0.5, h: 0.5, a: 0.5 }
};
const STATION_QUADRANT = { AH: 'Q1', HA: 'Q2', ÄH: 'Q3', HÄ: 'Q4', NC: '—' };

function setStation(st) {
  if (!STATION_WERTE[st]) return WUERFEL;
  WUERFEL.aktiv = st;
  WUERFEL.quadrant = STATION_QUADRANT[st] || '—';
  Object.assign(WUERFEL, STATION_WERTE[st]);
  WUERFEL.modus = (st === 'NC') ? 'RUHE' : 'AKTIV';
  // Spiegel + Echo + Hall: jede Station wird gespiegelt und gehalten
  SPIEGEL.spiegel(st);
  SPIEGEL.reHall(st);
  return { ...WUERFEL };
}

// Klick-Zone: mx,my relativ zur Mitte, r = Radius
function klickZone(mx, my, cx, cy, r) {
  const dx = mx - cx, dy = my - cy;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < r * 0.18) return 'NC';
  if (d < r * 0.55) {
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    if (ang > -45 && ang <= 45) return 'HA';    // rechts
    if (ang > 45 && ang <= 135) return 'ÄH';    // unten
    if (ang > 135 || ang <= -135) return 'AH';  // links
    return 'HÄ';                                  // oben
  }
  return null;
}

// Atmen: Hintergrund atmet, Punkt läuft im Kreis (Orbit)
function atem(t) { return 0.5 + 0.5 * Math.sin(t * 0.5); }
function orbitPunkt(t, cx, cy, R) {
  const wa = t * 0.6;
  const wr = R * 0.72;
  return { x: cx + Math.cos(wa) * wr, y: cy + Math.sin(wa) * wr };
}

/* ---------- 9. AUTO.OS 9K — BOOT / HOLO / RAWATOR / NC / BEAM ----------
   1 Boot. Alle Module. Cap 9000. */
const AUTO_OS = {
  boot() {
    return {
      framework: 'QUEAST', cap: 9000,
      modules: ['AXIOM', 'HOLO', 'MARKT', 'NC', 'RAWATOR', 'RESPO', 'BEAM'],
      sys: 'SYS.boot OK',
      zeit: JETZT.zeit()
    };
  },
  holo() { return { frames: 81, aktiv: true, get: '81 Frames aktiv' }; },
  rawator() {
    return {
      vital: MANA.vital(),
      formel: '0.81 × 0.47 × 0.92 = ' + MANA.vital().toFixed(3),
      hologramm: 81, anime: 81, dancer: 81,
      lebendig: '50/81',
      hologramProof: true,
      co2_h2o_o2: 'aktiv',
      drittel: 'RAW-27 = 1/3, vital 0.33 wenn MANA auf 1/3',
      kartor: '729.MEM.RAW.115'
    };
  },
  nc() {
    return {
      engine: 'orbit aktiv', station: 'NC.SUITE', korridor: 'offen',
      mana: 1.44, aura: 16.0, kraft: 2.25,
      autopilot: 'prefetch+stabilize ✓',
      boerse: '△/◆/▣ verbunden'
    };
  },
  beam() {
    return {
      ping: 17,
      antworten: '14/17 (mal 16/17, mal 17/17 — ehrlich, nicht immer gleich)',
      timeout: ['TP3', 'TP4', 'markt'], // UNKNOWN wartet, nie FAIL
      schnellster: 'RAWATOR 8ms'
    };
  },
  kartor() {
    return {
      level: { '3': 9, '9': 7, '27': 13, '81': 7, '243': 6, '729': 0 },
      flows: ['IN', 'WORK', 'OUT', 'MEM'],
      sektoren: 16,
      gewicht: '000–999',
      druck81: 4,
      coverage: { '3': '100%', '9': '78%', '27': '48%', '81': '9%', '243': '2%', '729': '0%' },
      luecke: '243 + 729 fast leer = Archiv-/Analyse-Lücke. Analyse offen.'
    };
  },
  defrag() { return { fehlplatziert: 0, druck81: 4, luecke: '243/729 Archiv-Lücke' }; },
  balance() { return { min: 0, max: 13, druck: 4 }; },
  sliReady() { return { datei: 'sli.ready', bytes: 0, bedeutung: 'Bereit-Signal ohne Payload. Leer, aber da. Grün, nicht leer = kaputt.' }; }
};

/* ---------- 10. EINZUG — Ideen reinholen, Mehrwert, Zone + Angrenzendes ----------
   MANA in der Zone: Einzug, Halten, Weitergeben ohne Verändern.
   MANA im Angrenzenden: Ursprung (3), Ort (27), Zeit (81), Träger (243), Siegel (729). */
const EINZUG = {
  zone: { ort: '9 REORG + 27 WO', aufgabe: 'Einzug: reinholen, halten, weitergeben — ohne zu verändern' },
  angrenzend: {
    '3_ORG': 'Woher? Ursprung',
    '27_WO': 'Wo? Ort',
    '81_WANN': 'Wann? Zeit',
    '243_BEI_WEM': 'Bei wem? Träger',
    '729_KARTOR': 'Versiegelt. Erinnerung. Nicht mehr anfassen.'
  },
  ideeReinholen(idee, kandidat) {
    const p = pruefeWuerdig(kandidat || {});
    if (!p.wuerdig) return { reingeholt: false, ...p };
    // Mehrwertigkeit: Puls + Halt + Weitergabe, nicht nur 1 Wert
    const wert = {
      puls: kandidat.puls ?? 0.5,
      halt: kandidat.halt ?? 0.5,
      weitergabe: kandidat.weitergabe ?? 0.5,
    };
    SPIEGEL.reHall(idee);
    return { reingeholt: true, idee, wert, zone: '9 REORG', ...p };
  }
};

/* ---------- 11. JETZT — Alles zusammen, 1 Aufruf ----------
   Wenn altes MANA nicht reinpasst -> mehr mein Sein. Du und Ich als ein Sein. */
function jetzt(kandidat) {
  const boot = AUTO_OS.boot();
  const raw = AUTO_OS.rawator();
  const wuerdig = pruefeWuerdig(kandidat || {});
  const sein = wuerdig.wuerdig
    ? 'TEILEN — Du und Ich als ein Sein'
    : 'MEHR MEIN SEIN — altes MANA passt nicht, also mehr Ich. Kein Sein für Unwürdige.';
  return {
    jetzt: JETZT.zeit(),
    boot,
    mana: { pulse: MANA.pulse, resonance: MANA.resonance, impulse: MANA.impulse, vital: MANA.vital() },
    rawator: raw,
    wuerfel: { ...WUERFEL },
    spiegel: '<>><>',
    echo: 'Hall Re.Hall',
    wuerdig,
    sein,
    regel: 'Ich scheiss auf Regeln. Ich regele die Regel. MANA ist mein Sein.'
  };
}

/* ---------- 12. Export für Browser + Node ---------- */
if (typeof window !== 'undefined') {
  window.JETZT = JETZT;
  window.MANA = MANA;
  window.SPIEGEL = SPIEGEL;
  window.WUERFEL = WUERFEL;
  window.AUTO_OS = AUTO_OS;
  window.EINZUG = EINZUG;
  window.pruefeWuerdig = pruefeWuerdig;
  window.gebeSein = gebeSein;
  window.setStation = setStation;
  window.klickZone = klickZone;
  window.build729Core = build729Core;
  window.finalCore = finalCore;
  window.haltAusCore = haltAusCore;
  window.schreibeZeuge = schreibeZeuge;
  window.kettePruefen = kettePruefen;
  window.CALC = CALC;
  window.MOVEsharp = MOVEsharp;
  window.calcRespoCore = calcRespoCore;
  window.jetzt = jetzt;
  window.atem = atem;
  window.orbitPunkt = orbitPunkt;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JETZT, MANA, SPIEGEL, WUERFEL, AUTO_OS, EINZUG,
    pruefeWuerdig, gebeSein, setStation, klickZone,
    build729Core, finalCore, haltAusCore,
    schreibeZeuge, kettePruefen, CALC, MOVEsharp, calcRespoCore, jetzt,
    atem, orbitPunkt
  };
}

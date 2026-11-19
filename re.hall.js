/* ============================================================
   zone.js — ZONE · MANA-Repo
   1 Wahrheit für Station + Klick-Zone.
   jetzt.js ruft HIER auf. Nicht andersrum. Kein Doppel.
   Zone = 9 REORG + 27 WO. Einzug: reinholen, halten,
   weitergeben — ohne zu verändern.
   ============================================================ */
'use strict';

/* ---------- WÜRFEL-Zustand — gehört zur Zone ---------- */
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

/* ---------- Station setzen — 1 Funktion, 1 Wahrheit ---------- */
function setStation(st) {
  if (!STATION_WERTE[st]) return { ...WUERFEL };
  WUERFEL.aktiv = st;
  WUERFEL.quadrant = STATION_QUADRANT[st] || '—';
  Object.assign(WUERFEL, STATION_WERTE[st]);
  WUERFEL.modus = (st === 'NC') ? 'RUHE' : 'AKTIV';
  // Spiegel + Re.Hall: jede Station wird gespiegelt und gehalten.
  // Wenn re.hall.js geladen ist, benutzt es das. Sonst nur lokal.
  if (typeof window !== 'undefined' && window.REHALL && window.REHALL.reHall) {
    window.REHALL.reHall(st);
  }
  return { ...WUERFEL };
}

/* ---------- Klick-Zone — Mitte / Rechts / Links / Oben / Unten ---------- */
function klickZone(mx, my, cx, cy, r) {
  const dx = mx - cx, dy = my - cy;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < r * 0.18) return 'NC'; // ganz Mitte
  if (d < r * 0.55) {
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    if (ang > -45 && ang <= 45) return 'HA';    // rechts
    if (ang > 45 && ang <= 135) return 'ÄH';    // unten
    if (ang > 135 || ang <= -135) return 'AH';  // links
    return 'HÄ';                                  // oben
  }
  return null; // ausserhalb — kein Klick, kein Sein
}

/* ---------- Klick auf Canvas -> Station ----------
   Benutzung in deinem HTML:
   cv.addEventListener('click', e => {
     const r = cv.getBoundingClientRect();
     const st = klickZone(e.clientX - r.left, e.clientY - r.top, W/2, H/2, R);
     if (st) setStation(st);
   });
*/
function klickAufWuerfel(e, cv, W, H) {
  const r = cv.getBoundingClientRect();
  const mx = e.clientX - r.left;
  const my = e.clientY - r.top;
  const rad = Math.min(W, H) * 0.4;
  const st = klickZone(mx, my, W / 2, H / 2, rad);
  if (st) return setStation(st);
  return null;
}

/* ---------- Zone: Einzug + Angrenzendes ----------
   3 Ursprung, 27 Ort, 81 Zeit, 243 Träger, 729 Siegel */
const ZONE = {
  ort: '9 REORG + 27 WO',
  aufgabe: 'Einzug: reinholen, halten, weitergeben — ohne zu verändern',
  angrenzend: {
    '3_ORG': 'Woher? Ursprung',
    '27_WO': 'Wo? Ort',
    '81_WANN': 'Wann? Zeit',
    '243_BEI_WEM': 'Bei wem? Träger',
    '729_KARTOR': 'Versiegelt. Erinnerung. Nicht mehr anfassen.'
  }
};

function atem(t) { return 0.5 + 0.5 * Math.sin(t * 0.5); }
function orbitPunkt(t, cx, cy, R) {
  const wa = t * 0.6;
  const wr = R * 0.72;
  return { x: cx + Math.cos(wa) * wr, y: cy + Math.sin(wa) * wr };
}

if (typeof window !== 'undefined') {
  window.WUERFEL = WUERFEL;
  window.ZONE = ZONE;
  window.STATION_WERTE = STATION_WERTE;
  window.STATION_QUADRANT = STATION_QUADRANT;
  window.setStation = setStation;
  window.klickZone = klickZone;
  window.klickAufWuerfel = klickAufWuerfel;
  window.atem = atem;
  window.orbitPunkt = orbitPunkt;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WUERFEL, ZONE, STATION_WERTE, STATION_QUADRANT, setStation, klickZone, klickAufWuerfel, atem, orbitPunkt };
}

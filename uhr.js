/* ============================================================
   uhr.js — UHR · KUCK.KUCK · MANA
   Clock time. Kuck.kuck.
   Zeigt Zeit. Ruft zur vollen Stunde. Hält im Re.Hall.
   1 Datei. 0 Imports. Offline.
   Reihenfolge im HTML:
     <script src="re.hall.js"></script>
     <script src="zone.js"></script>
     <script src="jetzt.js"></script>
     <script src="uhr.js"></script>
   ============================================================ */
'use strict';

const UHR = {
  name: 'KUCK.KUCK',
  zone: 'Europe/Berlin',

  // JETZT-Zeit — echte Zeit, nicht eingetippt
  jetzt() {
    const d = new Date();
    return {
      date: d,
      iso: d.toISOString(),
      stunde: d.getHours(),
      minute: d.getMinutes(),
      sekunde: d.getSeconds(),
      // DE-Format: 14:47:03
      uhr: String(d.getHours()).padStart(2, '0') + ':' +
           String(d.getMinutes()).padStart(2, '0') + ':' +
           String(d.getSeconds()).padStart(2, '0'),
      // kurz: 14:47
      kurz: String(d.getHours()).padStart(2, '0') + ':' +
            String(d.getMinutes()).padStart(2, '0'),
      datum: d.toLocaleDateString('de-DE'),
    };
  },

  // Kuck.kuck — nur zur vollen Stunde, so oft wie die Stunde
  // 14:00 -> 14x Kuck. 2x pro Stunde? Nein: 1x pro Stunde-Stand.
  // 14 Uhr = 14x Kuck, aber gekürzt: 1x Kuck + Zahl, sonst nervt es.
  kuckuck(d = new Date()) {
    if (d.getMinutes() !== 0 || d.getSeconds() !== 0) {
      return { kuck: false, grund: 'Noch nicht volle Stunde. Kuck wartet.' };
    }
    let h = d.getHours() % 12;
    if (h === 0) h = 12;
    const rufe = [];
    for (let i = 0; i < h; i++) rufe.push('Kuck.kuck');
    // In Re.Hall halten, wenn da
    if (typeof window !== 'undefined' && window.REHALL && window.REHALL.reHall) {
      window.REHALL.reHall('KUCK.KUCK ' + h + 'x — ' + d.toLocaleTimeString('de-DE'));
    }
    return { kuck: true, stunde: h, rufe, text: rufe.join(' ') };
  },

  // Ticken: jede Sekunde 1 Tick. Fokus-Zyklus DA -> NE -> BEN -> KI -> DA
  // 3 Start, 6 Bauen, 9 volle Spannung, 0 Reset, 3 Neustart
  fokusAusSekunde(sekunde) {
    const zyklus = ['DA', 'NE', 'BEN', 'KI'];
    return zyklus[sekunde % 4];
  },

  // 3-6-9-0-3 aus der Minute
  dreiSechsNeunNullDrei(minute) {
    if (minute < 15) return { phase: 3, name: 'Start' };
    if (minute < 30) return { phase: 6, name: 'Bauen' };
    if (minute < 45) return { phase: 9, name: 'Volle Spannung' };
    if (minute < 60) return { phase: 0, name: 'Reset' };
    return { phase: 3, name: 'Neustart' };
  },

  // Uhr starten: schreibt jede Sekunde in #uhr, #kuck, #fokus
  // Benutzung: UHR.starten()
  _timer: null,
  _letzteStunde: -1,
  starten() {
    if (this._timer) return 'Läuft schon.';
    const tick = () => {
      const j = this.jetzt();
      const elUhr = (typeof document !== 'undefined') ? document.getElementById('uhr') : null;
      const elKuck = (typeof document !== 'undefined') ? document.getElementById('kuck') : null;
      const elFokus = (typeof document !== 'undefined') ? document.getElementById('fokus') : null;
      if (elUhr) elUhr.textContent = j.uhr + ' · ' + j.datum;
      if (elFokus) elFokus.textContent = this.fokusAusSekunde(j.sekunde) + ' · ' + this.dreiSechsNeunNullDrei(j.minute).name;
      // Volle Stunde? Einmal rufen, nicht 60x.
      if (j.minute === 0 && j.sekunde === 0 && j.stunde !== this._letzteStunde) {
        this._letzteStunde = j.stunde;
        const k = this.kuckuck(j.date);
        if (elKuck) elKuck.textContent = k.text;
        else console.log(k.text);
      }
      return j;
    };
    tick();
    this._timer = setInterval(tick, 1000);
    return 'UHR läuft. Kuck.kuck zur vollen Stunde.';
  },
  stoppen() {
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
    return 'UHR gestoppt.';
  }
};

if (typeof window !== 'undefined') window.UHR = UHR;
if (typeof module !== 'undefined' && module.exports) module.exports = { UHR };

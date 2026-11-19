/* ============================================================
   pin.blit.z — PIN · BLIT · Z
   Pin = festmachen. Blit = Bild rüberkopieren. Z = iki2li-Achse.
   Der Würfel wird einmal auf Offscreen gezeichnet,
   dann per Blit auf den echten Canvas gepinnt.
   Kein Flackern. Kein Neu-Rechnen jedes Mal. Z bleibt fest.
   Reihenfolge:
     re.hall.js -> zone.js -> jetzt.js -> uhr.js -> pin.blit.z
   ============================================================ */
'use strict';

const PINBLITZ = {
  name: 'pin.blit.z',
  z: 0.5,          // Z-Achse: iki2li. 0 = unten, 1 = oben, 0.5 = Mitte
  gepinnt: false,
  off: null,       // Offscreen-Canvas
  ctxOff: null,

  // PIN: Z festmachen. Wenn du Z pinnst, bleibt der Würfel auf der Höhe.
  pin(z) {
    if (z !== undefined) this.z = Math.max(0, Math.min(1, z));
    this.gepinnt = true;
    // WUERFEL aus zone.js auch pinnen, wenn da
    if (typeof window !== 'undefined' && window.WUERFEL) window.WUERFEL.z = this.z;
    return { gepinnt: true, z: this.z, text: 'Z gepinnt auf ' + this.z.toFixed(2) };
  },
  unpin() {
    this.gepinnt = false;
    return { gepinnt: false, z: this.z, text: 'Z losgelassen. Würfel atmet wieder.' };
  },

  // OFFSCREEN: einmal zeichnen, dann immer wieder blitten
  offscreenAnlegen(w, h) {
    if (typeof document === 'undefined') return null;
    this.off = document.createElement('canvas');
    this.off.width = w; this.off.height = h;
    this.ctxOff = this.off.getContext('2d');
    return this.off;
  },

  // BLIT: Offscreen -> echter Canvas. 1 Kopie. Schnell. Kein Flackern.
  blit(cv) {
    if (!this.off || !cv) return { geblittet: false, grund: 'Kein Offscreen oder kein Canvas.' };
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(this.off, 0, 0);
    return { geblittet: true, z: this.z };
  },

  // Z-ZEICHNEN: Würfel auf Offscreen mit gepinntem Z
  // cx, cy = Mitte, R = Radius, station = 'NC' / 'AH' / 'HA' / 'HÄ' / 'ÄH'
  zeichneZ(w, h, station) {
    if (!this.ctxOff) this.offscreenAnlegen(w, h);
    const ctx = this.ctxOff;
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.4;
    ctx.clearRect(0, 0, w, h);
    // Hintergrund atmet — aber Z bleibt gepinnt
    const t = (typeof window !== 'undefined' && window.WUERFEL) ? window.WUERFEL.t : 0;
    const atem = 0.5 + 0.5 * Math.sin(t * 0.5);
    ctx.fillStyle = `rgb(${5 + atem * 3}, ${7 + atem * 5}, ${14 + atem * 8})`;
    ctx.fillRect(0, 0, w, h);
    // Achsen-Kreuz
    ctx.strokeStyle = 'rgba(90,106,128,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
    ctx.stroke();
    // Z-Kreis: Radius wächst mit Z. Gepinnt = fest. Nicht gepinnt = atmet mit.
    const z = this.gepinnt ? this.z : (0.5 + 0.2 * Math.sin(t * 0.5));
    const zR = R * (0.3 + z * 0.5);
    ctx.strokeStyle = `rgba(255,215,0,${0.15 + z * 0.3})`;
    ctx.beginPath(); ctx.arc(cx, cy, zR, 0, Math.PI * 2); ctx.stroke();
    // Mitte NC
    const ncR = 26 + z * 8;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, ncR * 2);
    g.addColorStop(0, `rgba(255,215,0,${0.4 + z * 0.4})`);
    g.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, ncR * 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffd700';
    ctx.beginPath(); ctx.arc(cx, cy, ncR * 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 11px Consolas';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('NC', cx, cy);
    // Station-Label + Z-Wert
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 11px Consolas';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('◈ PIN.BLIT.Z · ' + (station || 'NC'), 16, 14);
    ctx.fillStyle = '#5a6a80';
    ctx.font = '10px Consolas';
    ctx.fillText('Z = ' + z.toFixed(2) + (this.gepinnt ? ' · GEPPINNT' : ' · FREI'), 16, 30);
    return { gezeichnet: true, z, station: station || 'NC' };
  },

  // 1 Aufruf: zeichnen + blitten. Das ist der Loop.
  frame(cv, station) {
    if (!cv) return null;
    // Canvas-Grösse einmal angleichen
    const r = cv.getBoundingClientRect();
    if (cv.width !== r.width) cv.width = r.width;
    if (cv.height !== r.height) cv.height = r.height;
    this.zeichneZ(cv.width, cv.height, station);
    return this.blit(cv);
  },

  // LOOP starten: 60fps Blit, Z bleibt wo du ihn gepinnt hast
  _loop: null,
  starten(cv, stationFn) {
    if (this._loop) return 'Läuft schon.';
    const step = () => {
      const st = (typeof stationFn === 'function') ? stationFn() : (stationFn || 'NC');
      this.frame(cv, st);
      this._loop = requestAnimationFrame(step);
    };
    step();
    return 'PIN.BLIT.Z läuft. Z = ' + this.z.toFixed(2);
  },
  stoppen() {
    if (this._loop) cancelAnimationFrame(this._loop);
    this._loop = null;
    return 'PIN.BLIT.Z gestoppt.';
  }
};

if (typeof window !== 'undefined') window.PINBLITZ = PINBLITZ;
if (typeof module !== 'undefined' && module.exports) module.exports = { PINBLITZ };

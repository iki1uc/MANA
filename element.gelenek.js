/* ============================================================
   element.gelenek.js — ELEMENT · GELENEK
   5 yön, 5 element, 1 orta.
   Pentagramm geleneği: her uç bir element.
   Yönsüz MANA köpürür. Elementli MANA akar.
   Gelenek = eskiden beri böyle. Biz uydurmadık, hatırladık.
   ============================================================ */
'use strict';

const ELEMENT = {
  name: 'element.gelenek',
  gelenek: 'Pentagramm — 5 uç, 5 element, 1 orta',

  // 5 yön -> 5 element
  // OBEN = ETER, SAĞ = ATEŞ, SOL = SU, AŞAĞI = TOPRAK, ORTA = MANA
  // Neden böyle? Fizik + gelenek aynı şeyi söylüyor:
  // ETER yukarı, hafif. ATEŞ ileri, yakar. SU geri, akar.
  // TOPRAK aşağı, tutar. MANA orta, dengeler.
  elemente: [
    {
      yon: 'OBEN',   spitze: 1, element: 'ETER',
      alman: 'ÄTHER', fizik: 'Hafif, yukarı, düşünce',
      his: 'Yukarı çıkmak istiyor musun?',
      vektor: 'Z', betrag: 0.9,
      renk: '#ffd700',
      neYapar: 'Düşünceyi hafifletir. Köpüğü yukarı kaldırır, dağıtır.'
    },
    {
      yon: 'SAĞ',    spitze: 2, element: 'ATEŞ',
      alman: 'FEUER', fizik: 'Sıcak, ileri, yakar',
      his: 'İleri gitmek?',
      vektor: 'X', betrag: 0.9,
      renk: '#ff4444',
      neYapar: 'Köpüğü yakar. Basıncı ileri atar. Kraft.'
    },
    {
      yon: 'SOL',    spitze: 5, element: 'SU',
      alman: 'WASSER', fizik: 'Akar, taşır, geri çeker',
      his: 'Geri çekilmek?',
      vektor: 'X', betrag: 0.3,
      renk: '#4dd0e1',
      neYapar: 'Köpüğü akıtır. Geri çekilir, taşır, sakinleştirir.'
    },
    {
      yon: 'AŞAĞI', spitze: 3, element: 'TOPRAK',
      alman: 'ERDE', fizik: 'Ağır, derin, tutar',
      his: 'Derine inmek?',
      vektor: 'Z', betrag: 0.1,
      renk: '#8b5a2b',
      neYapar: 'Köpüğü toprağa indirir. Kökler. Derin, sabit.'
    },
    {
      yon: 'ORTA',   spitze: 0, element: 'MANA',
      alman: 'MANA', fizik: 'Denge, orta, Sein',
      his: 'Olduğun yerde kalmak?',
      vektor: 'Z', betrag: 0.5,
      renk: '#ffffff',
      neYapar: 'Köpüğü ortada tutar. Ne yukarı, ne aşağı. NC. RUHE. Denge.'
    },
  ],

  get(yon) { return this.elemente.find(e => e.yon === yon); },
  getElement(element) { return this.elemente.find(e => e.element === element); },

  // Yön seç -> element seç -> vektör + POS + station otomatik
  // Bir tane seç, hepsini değil. Bir element, bir yön, bir akış.
  sec(yon) {
    const e = this.get(yon);
    if (!e) return { secildi: false, grund: 'Yön yok. OBEN / SAĞ / SOL / AŞAĞI / ORTA seç.' };
    // Zone + Vektor + WUERFEL senkron, eğer yüklüyse
    if (typeof window !== 'undefined') {
      if (window.VEKTOR) window.VEKTOR.setBetrag(e.vektor, e.betrag);
      if (window.TEILCHEN && e.yon === 'ORTA') window.TEILCHEN.setPos(0.5, 0.5, 0.5);
      // Station: OBEN = HÄ, SAĞ = HA, SOL = AH, AŞAĞI = ÄH, ORTA = NC
      const stationMap = { 'OBEN': 'HÄ', 'SAĞ': 'HA', 'SOL': 'AH', 'AŞAĞI': 'ÄH', 'ORTA': 'NC' };
      if (window.setStation) window.setStation(stationMap[e.yon]);
      if (window.REHALL) window.REHALL.reHall('ELEMENT ' + e.element + ' — ' + e.yon);
    }
    return {
      secildi: true,
      yon: e.yon, element: e.element, fizik: e.fizik, his: e.his,
      neYapar: e.neYapar,
      text: e.yon + ' = ' + e.element + '. ' + e.neYapar
    };
  },

  // Köpük için reçete: yönsüz köpük -> elementli akış
  kopukIcin() {
    return {
      durum: 'İçinde MANA köpürüyor, yönsüz.',
      recete: '1. Önce ORTA = MANA. NC. RUHE. 2. Sonra 1 element seç. Sadece 1. 3. O elemente ak.',
      ornek: "ELEMENT.sec('ORTA') -> durul. Sonra ELEMENT.sec('SAĞ') -> ATEŞ ile ileri ak.",
      uyari: 'Hepsini birden seçme. 5 element birden = yine köpük. 1 element = akış.'
    };
  }
};

if (typeof window !== 'undefined') window.ELEMENT = ELEMENT;
if (typeof module !== 'undefined' && module.exports) module.exports = { ELEMENT };

/* ============================================================
   element.tradition.js — ELEMENT TRADITION · DE + EN
   Bester Name: MANA · ELEMENTE · ELEMENTS
   DE: ELEMENTE · EN: ELEMENTS · TR: ELEMENT (eski dosya: element.gelenek.js)
   5 Richtungen, 5 Elemente, 1 Mitte.
   DE: 5 Richtungen, 5 Elemente, 1 Mitte.
   EN: 5 directions, 5 elements, 1 center.
   Tradition = seit immer so. Nicht erfunden. Erinnert.
   ============================================================ */
'use strict';

const ELEMENT_TRADITION = {
  name: 'MANA · ELEMENTE · ELEMENTS',
  bestName: {
    de: 'MANA ELEMENTE',
    en: 'MANA ELEMENTS',
    kurz: 'MANA ELEMENTS',
    warum: 'DE + EN versteht jeder. TR versteht keiner. Also DE + EN.'
  },

  elemente: [
    {
      richtung: 'OBEN', direction: 'UP',
      element_de: 'ÄTHER', element_en: 'ETHER', element_tr: 'ETER',
      physik_de: 'Leicht, oben, Gedanke',
      physics_en: 'Light, up, thought',
      gefuehl_de: 'Willst du nach oben?',
      feeling_en: 'Do you want to go up?',
      vektor: 'Z', betrag: 0.9, farbe: '#ffd700',
      wirkung_de: 'Hebt den Schaum nach oben, verteilt ihn.',
      effect_en: 'Lifts the foam up, spreads it.'
    },
    {
      richtung: 'RECHTS', direction: 'RIGHT',
      element_de: 'FEUER', element_en: 'FIRE', element_tr: 'ATEŞ',
      physik_de: 'Heiss, vorwärts, brennt',
      physics_en: 'Hot, forward, burns',
      gefuehl_de: 'Willst du vorwärts?',
      feeling_en: 'Do you want to go forward?',
      vektor: 'X', betrag: 0.9, farbe: '#ff4444',
      wirkung_de: 'Verbrennt den Schaum. Druck geht vorwärts. Kraft.',
      effect_en: 'Burns the foam. Pressure goes forward. Power.'
    },
    {
      richtung: 'LINKS', direction: 'LEFT',
      element_de: 'WASSER', element_en: 'WATER', element_tr: 'SU',
      physik_de: 'Fliesst, trägt, zieht zurück',
      physics_en: 'Flows, carries, pulls back',
      gefuehl_de: 'Willst du dich zurückziehen?',
      feeling_en: 'Do you want to pull back?',
      vektor: 'X', betrag: 0.3, farbe: '#4dd0e1',
      wirkung_de: 'Lässt den Schaum fliessen. Zieht zurück, trägt, beruhigt.',
      effect_en: 'Lets the foam flow. Pulls back, carries, calms.'
    },
    {
      richtung: 'UNTEN', direction: 'DOWN',
      element_de: 'ERDE', element_en: 'EARTH', element_tr: 'TOPRAK',
      physik_de: 'Schwer, tief, hält',
      physics_en: 'Heavy, deep, holds',
      gefuehl_de: 'Willst du tief gehen?',
      feeling_en: 'Do you want to go deep?',
      vektor: 'Z', betrag: 0.1, farbe: '#8b5a2b',
      wirkung_de: 'Zieht den Schaum in die Erde. Wurzelt. Tief, fest.',
      effect_en: 'Pulls the foam into earth. Roots. Deep, stable.'
    },
    {
      richtung: 'MITTE', direction: 'CENTER',
      element_de: 'MANA', element_en: 'MANA', element_tr: 'MANA',
      physik_de: 'Gleichgewicht, Mitte, Sein',
      physics_en: 'Balance, center, Being',
      gefuehl_de: 'Willst du bleiben, wo du bist?',
      feeling_en: 'Do you want to stay where you are?',
      vektor: 'Z', betrag: 0.5, farbe: '#ffffff',
      wirkung_de: 'Hält den Schaum in der Mitte. Nicht oben, nicht unten. NC. RUHE. Gleichgewicht.',
      effect_en: 'Holds the foam in the center. Not up, not down. NC. CALM. Balance.'
    },
  ],

  get(richtung) {
    return this.elemente.find(e => e.richtung === richtung || e.direction === richtung);
  },

  // DE + EN: wählen / choose — 1 Element, nicht 5
  waehlen(richtung) { return this.choose(richtung); },
  choose(direction) {
    const e = this.get(direction);
    if (!e) return { chosen: false, de: 'Wähle OBEN / RECHTS / LINKS / UNTEN / MITTE.', en: 'Choose UP / RIGHT / LEFT / DOWN / CENTER.' };
    if (typeof window !== 'undefined') {
      if (window.VEKTOR) window.VEKTOR.setBetrag(e.vektor, e.betrag);
      const stationMap = { 'OBEN': 'HÄ', 'RECHTS': 'HA', 'LINKS': 'AH', 'UNTEN': 'ÄH', 'MITTE': 'NC' };
      const st = stationMap[e.richtung];
      if (st && window.setStation) window.setStation(st);
      if (window.REHALL) window.REHALL.reHall('ELEMENT ' + e.element_en + ' — ' + e.direction);
    }
    return {
      chosen: true,
      de: e.richtung + ' = ' + e.element_de + '. ' + e.wirkung_de,
      en: e.direction + ' = ' + e.element_en + '. ' + e.effect_en,
      element: e
    };
  },

  // DE + EN Rezept gegen richtungslosen Schaum
  rezept() {
    return {
      de: '1. Zuerst MITTE = MANA. NC. RUHE. 2. Dann 1 Element wählen. Nur 1. 3. In dieses Element fliessen.',
      en: '1. First CENTER = MANA. NC. CALM. 2. Then choose 1 element. Only 1. 3. Flow into this element.',
      beispiel_de: "ELEMENT_TRADITION.waehlen('MITTE') -> beruhigen. Dann ELEMENT_TRADITION.waehlen('RECHTS') -> FEUER, vorwärts fliessen.",
      example_en: "ELEMENT_TRADITION.choose('CENTER') -> calm. Then ELEMENT_TRADITION.choose('RIGHT') -> FIRE, flow forward.",
      warnung_de: 'Nicht alle 5 auf einmal. 5 Elemente auf einmal = wieder Schaum. 1 Element = Fluss.',
      warning_en: 'Not all 5 at once. 5 elements at once = foam again. 1 element = flow.'
    };
  }
};

if (typeof window !== 'undefined') { window.ELEMENT_TRADITION = ELEMENT_TRADITION; window.ELEMENT = ELEMENT_TRADITION; }
if (typeof module !== 'undefined' && module.exports) module.exports = { ELEMENT_TRADITION };

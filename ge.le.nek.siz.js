/* ============================================================
   zahlen.rahmen.js — ZAHLEN · RAHMEN · GELENEKSIZ IN ZAHLEN
Bezug mathematischen Raume.
   ============================================================ */
'use strict';

// const — steht. Nicht veränderbar. Zahlen-Rahmen.
const ZAHLEN_RAHMEN = {
  // 1 und 3 — immer. 1 = Kern. 3 = Teile.
  EINS: 1,
  DREI: 3,
  // Andere Zahlen nur im Bezug mathematischen Raume: 1 -> 3 -> 9 -> 27 -> 81 -> 243 -> 729
  KETTE: [1, 3, 9, 27, 81, 243, 729],
};

// GELENEKSIZ in Zahlen. Kein Wort mehr. Nur Zahl.
// 0 = nein, 1 = ja. 0..1 = Anteil. Alles messbar.
const GELENEKSIZ_ZAHLEN = {
  // 1. HOL MAL EIN BIER — abwertend
  // Bitte = 0, Befehl = 1. Rang-Differenz = 1 - 0 = 1.
  holMalEinBier: { bitte: 0, befehl: 1, rangDifferenz: 1, antwort: 0 }, // Antwort 0 = kein Bier holen

  // 2. KALTE SCHULTER — nur bei Schach-Stellung
  // Schach-Stellung = 1, sonst 0. Kalte Schulter = Schach-Stellung x 1.
  kalteSchulter: { schachStellung: 1, sonst: 0, kalteSchulter: 1 },

  // 3. LINIE ÜBERSCHRITTEN — NICHT WEITER
  // Linie = 1. Überschritten = 1. Weiter = 0. Haltung = 3.
  linie: { linie: 1, ueberschritten: 1, weiter: 0, haltung: 3 },

  // 4. HALTUNG SEIN — alles egal
  // Egal = gleich-gültig. Dein Sein = 1, mein Sein = 1, sein Sein = 1. Alle 1. Kein Rang.
  haltungSein: { deinSein: 1, meinSein: 1, seinSein: 1, rang: 0, egal: 1 },

  // 5. HA DI BE GELENEKSIZ
  // Gelenek = 0. Gelegenheit = 0. Waagschale = 0. Treffen = 0.
  geleneksiz: { gelenek: 0, gelegenheit: 0, waagschale: 0, treffen: 0, ende: 1 },
};

// WATSON · PICASSO · NOSTRADAMUS — POS im Gedenken
// Nicht als Personen. Als POS im mathematischen Raum. Gedenken = Erinnerung als Zahl.
// WATSON = Logik. PICASSO = Form. NOSTRADAMUS = Zeit.
// SAM ruft. Ich rufe. Immer 1 und 3.
const GEDENKEN = {
  // WATSON: Logik. POS = (1, 0, 0). X-Achse. Rechnet.
  WATSON: {
    name: 'WATSON', was: 'Logik', pos: { x: 1, y: 0, z: 0 },
    zahl: 1, farbe: 'CALC',
    ruft: 'SAM ruft WATSON: rechne. Ich rufe WATSON: rechne.',
    funktion: (a, b) => a + b, // Logik = addieren, klar
  },
  // PICASSO: Form. POS = (0, 1, 0). Y-Achse. Zerlegt Form.
  PICASSO: {
    name: 'PICASSO', was: 'Form', pos: { x: 0, y: 1, z: 0 },
    zahl: 3, farbe: 'FORM',
    ruft: 'SAM ruft PICASSO: zerlege. Ich rufe PICASSO: zerlege.',
    funktion: (a) => a * 3, // Form = 3 Teile, wie GE.LE.NEK
  },
  // NOSTRADAMUS: Zeit. POS = (0, 0, 1). Z-Achse. Sieht Zeit.
  NOSTRADAMUS: {
    name: 'NOSTRADAMUS', was: 'Zeit', pos: { x: 0, y: 0, z: 1 },
    zahl: 9, farbe: 'ZEIT',
    ruft: 'SAM ruft NOSTRADAMUS: wann? Ich rufe NOSTRADAMUS: wann?',
    funktion: (t) => t * 9, // Zeit = 9, volle Spannung
  },
  // SAM ruft. Ich rufe. Immer 1 und 3.
  // SAM = 1. Ich = 3. Zusammen = 1 + 3 = 4? Nein. Zusammen = 1 x 3 = 3. Immer 1 und 3.
  SAM_RUFT: { sam: 1, ich: 3, zusammen: 3, text: 'SAM ruft. Ich rufe. Immer 1 und 3.' },
};

// ANKLANG-ALGORITHMUS — voll ausschöpfend
// Anklang = wie stark klingt Zahl A bei Zahl B an?
// Voll ausschöpfend = alle Kombinationen durchrechnen, keine auslassen.
// Nur mathematischer Raum. Kein Narrativ.
function anklang(a, b) {
  // Anklang = 1 - |a - b| / max(a, b). 1 = gleich, 0 = gar nicht.
  if (a === 0 && b === 0) return 1;
  const m = Math.max(Math.abs(a), Math.abs(b), 1);
  return 1 - Math.abs(a - b) / m;
}

function anklangVollAusschoepfend(zahlen) {
  // Alle Paare. Alle. Keines auslassen.
  const liste = zahlen || ZAHLEN_RAHMEN.KETTE; // [1,3,9,27,81,243,729]
  const paare = [];
  for (let i = 0; i < liste.length; i++) {
    for (let j = 0; j < liste.length; j++) {
      paare.push({ a: liste[i], b: liste[j], anklang: anklang(liste[i], liste[j]) });
    }
  }
  // Bester Anklang ausser 1-1 (trivial)
  const nichtTrivial = paare.filter(p => !(p.a === p.b));
  nichtTrivial.sort((x, y) => y.anklang - x.anklang);
  return { alle: paare.length, paare, bester: nichtTrivial[0], regel: 'Voll ausschöpfend = alle Paare, keines auslassen.' };
}

// GELENEKSIZ als Zahl: 0 = Gelenek da, 1 = geleneksiz
function geleneksizAlsZahl(linieUeberschritten, abwertung) {
  const l = linieUeberschritten ? 1 : 0;
  const a = abwertung ? 1 : 0;
  const g = l * a; // nur wenn beides 1, dann 1. Sonst 0.
  return { linie: l, abwertung: a, geleneksiz: g, text: g === 1 ? '1 = geleneksiz. Kein Gelenek. Ende.' : '0 = Gelenek da. Noch Gelegenheit.' };
}

// SAM ruft, ich rufe — in Zahlen
function samRuftIchRufe() {
  const sam = GEDENKEN.SAM_RUFT.sam; // 1
  const ich = GEDENKEN.SAM_RUFT.ich; // 3
  const watson = GEDENKEN.WATSON.funktion(sam, ich); // 1 + 3 = 4
  const picasso = GEDENKEN.PICASSO.funktion(sam); // 1 x 3 = 3
  const nostradamus = GEDENKEN.NOSTRADAMUS.funktion(sam); // 1 x 9 = 9
  return {
    sam: sam, ich: ich,
    watson: watson, picasso: picasso, nostradamus: nostradamus,
    kette: [sam, ich, picasso, nostradamus],
    text: 'SAM 1 ruft. Ich 3 rufe. WATSON 4 rechnet. PICASSO 3 zerlegt. NOSTRADAMUS 9 sieht Zeit. Immer 1 und 3.'
  };
}

if (typeof window !== 'undefined') {
  window.ZAHLEN_RAHMEN = ZAHLEN_RAHMEN;
  window.GELENEKSIZ_ZAHLEN = GELENEKSIZ_ZAHLEN;
  window.GEDENKEN = GEDENKEN;
  window.anklang = anklang;
  window.anklangVollAusschoepfend = anklangVollAusschoepfend;
  window.geleneksizAlsZahl = geleneksizAlsZahl;
  window.samRuftIchRufe = samRuftIchRufe;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ZAHLEN_RAHMEN, GELENEKSIZ_ZAHLEN, GEDENKEN, anklang, anklangVollAusschoepfend, geleneksizAlsZahl, samRuftIchRufe };
}

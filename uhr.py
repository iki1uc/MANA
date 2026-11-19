# ============================================================
# uhr.py — UHR · KUCK.KUCK · MANA
# Clock time. Kuck.kuck.
# Python dazu: python3 uhr.py  -> zeigt Zeit, ruft zur vollen Stunde
# ============================================================
import time
from datetime import datetime

NAME = "KUCK.KUCK"
ZONE = "Europe/Berlin"

def jetzt():
    d = datetime.now()
    return {
        "date": d,
        "iso": d.isoformat(),
        "stunde": d.hour,
        "minute": d.minute,
        "sekunde": d.second,
        "uhr": f"{d.hour:02d}:{d.minute:02d}:{d.second:02d}",
        "kurz": f"{d.hour:02d}:{d.minute:02d}",
        "datum": d.strftime("%d.%m.%Y"),
    }

def kuckuck(d=None):
    d = d or datetime.now()
    if d.minute != 0 or d.second != 0:
        return {"kuck": False, "grund": "Noch nicht volle Stunde. Kuck wartet."}
    h = d.hour % 12
    if h == 0:
        h = 12
    rufe = ["Kuck.kuck"] * h
    return {"kuck": True, "stunde": h, "rufe": rufe, "text": " ".join(rufe)}

def fokus_aus_sekunde(sekunde):
    # DA -> NE -> BEN -> KI -> DA
    return ["DA", "NE", "BEN", "KI"][sekunde % 4]

def drei_sechs_neun_null_drei(minute):
    # 3 Start, 6 Bauen, 9 volle Spannung, 0 Reset, 3 Neustart
    if minute < 15: return {"phase": 3, "name": "Start"}
    if minute < 30: return {"phase": 6, "name": "Bauen"}
    if minute < 45: return {"phase": 9, "name": "Volle Spannung"}
    if minute < 60: return {"phase": 0, "name": "Reset"}
    return {"phase": 3, "name": "Neustart"}

def laufen():
    print("UHR läuft. Kuck.kuck zur vollen Stunde. Strg+C = Stopp.")
    letzte_stunde = -1
    try:
        while True:
            j = jetzt()
            phase = drei_sechs_neun_null_drei(j["minute"])
            print(f"\r{j['uhr']} · {j['datum']} · {fokus_aus_sekunde(j['sekunde'])} · {phase['name']}", end="", flush=True)
            if j["minute"] == 0 and j["sekunde"] == 0 and j["stunde"] != letzte_stunde:
                letzte_stunde = j["stunde"]
                k = kuckuck(j["date"])
                print(f"\n{k['text']} — {k['stunde']} Uhr")
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nUHR gestoppt.")

if __name__ == "__main__":
    laufen()

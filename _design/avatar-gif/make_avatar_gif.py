"""Animowany awatar „R." do Gmaila — wariant „Receply pisze…".

Kropka z logo zamienia się w trzy kropki pisania, faluje i wraca do „R.".
Pierwsza i ostatnia klatka to pełne logo w spoczynku, więc pętla jest bez
przeskoku. Kolory to wyłącznie przejście niebieski → biały, dlatego paleta
jest liczona wprost z pokrycia piksela (bez kwantyzacji i ditheringu).

Uruchomienie (wymaga Pillow):  python make_avatar_gif.py
"""

import math
import re
from pathlib import Path

from PIL import Image, ImageDraw

OUT_DIR = Path(__file__).parent
SIZE = 512
SS = 4                     # supersampling dla wygładzenia krawędzi
FPS = 25                   # 4 cs na klatkę — GIF trzyma czas dokładnie
DURATION = 3.6             # s, cała pętla
SCALE = 0.88               # ile kadru zajmuje siatka 32×32 z icon.svg
LEVELS = 32                # liczba odcieni niebieski → biały

BLUE = (0x21, 0x3B, 0xDF)
WHITE = (0xFF, 0xFF, 0xFF)

# Litera R i kropka z public/icon.svg (siatka 32×32).
R_PATH = (
    "M6.35-11.71L1.22-11.71L1.22 0L3.75 0L3.75-4.27L5.92-4.27C7.29-4.27 "
    "7.84-3.94 7.92-2.95L8.13 0L10.68 0L10.40-3.35C10.28-4.60 9.72-5.21 "
    "8.50-5.38C9.74-5.74 10.58-6.72 10.58-8.20C10.58-10.46 8.78-11.71 "
    "6.35-11.71ZM3.75-6.40L3.75-9.59L6.01-9.59C7.28-9.59 7.99-9.03 "
    "7.99-7.99C7.99-6.96 7.28-6.40 6.01-6.40Z"
)
R_OFFSET = (7.35, 22.16)
DOT = (21.33, 20.06)
DOT_R = 2.1

TYPING_R = 1.3             # promień kropek pisania
TYPING_GAP = 3.2           # odstęp między kropkami
SHIFT = -2.2               # przesunięcie całości w lewo, żeby trzy kropki były w centrum
HOP = 1.1                  # wysokość podskoku kropek

# Oś czasu (s)
SPLIT = (0.6, 1.0)         # kropka dzieli się na trzy
WAVES = (1.0, 1.65)        # starty dwóch fal
HOP_LEN = 0.42
HOP_STAGGER = 0.14
MERGE = (2.4, 2.8)         # trzy kropki wracają do jednej


def parse_path(d):
    """Zwraca listę podścieżek jako listy punktów (krzywe spłaszczone)."""
    tokens = re.findall(r"[MLCZ]|-?\d*\.?\d+", d)
    subpaths, pts, i, cmd = [], [], 0, None
    while i < len(tokens):
        t = tokens[i]
        if t in "MLCZ":
            cmd = t
            i += 1
            if cmd == "Z":
                subpaths.append(pts)
                pts = []
            continue
        if cmd in "ML":
            pts.append((float(tokens[i]), float(tokens[i + 1])))
            i += 2
        elif cmd == "C":
            p0 = pts[-1]
            c = [float(v) for v in tokens[i:i + 6]]
            p1, p2, p3 = (c[0], c[1]), (c[2], c[3]), (c[4], c[5])
            for s in range(1, 25):
                u = s / 24
                a, b, cc, dd = (1 - u) ** 3, 3 * u * (1 - u) ** 2, 3 * u * u * (1 - u), u ** 3
                pts.append((a * p0[0] + b * p1[0] + cc * p2[0] + dd * p3[0],
                            a * p0[1] + b * p1[1] + cc * p2[1] + dd * p3[1]))
            i += 6
    return subpaths


R_SUBPATHS = [[(x + R_OFFSET[0], y + R_OFFSET[1]) for x, y in sp] for sp in parse_path(R_PATH)]


def ease(u):
    u = min(max(u, 0.0), 1.0)
    return 4 * u ** 3 if u < 0.5 else 1 - (-2 * u + 2) ** 3 / 2


def progress(t):
    """0 = logo w spoczynku, 1 = trzy kropki pisania."""
    if t < SPLIT[0]:
        return 0.0
    if t < SPLIT[1]:
        return ease((t - SPLIT[0]) / (SPLIT[1] - SPLIT[0]))
    if t < MERGE[0]:
        return 1.0
    if t < MERGE[1]:
        return 1 - ease((t - MERGE[0]) / (MERGE[1] - MERGE[0]))
    return 0.0


def hop(t, i):
    y = 0.0
    for start in WAVES:
        p = (t - start - i * HOP_STAGGER) / HOP_LEN
        if 0 <= p <= 1:
            y -= HOP * math.sin(math.pi * p)
    return y


def render(t):
    k = SIZE * SS * SCALE / 32
    c = SIZE * SS / 2
    p = progress(t)
    dx = SHIFT * p

    def tx(x, y):
        return (c + (x + dx - 16) * k, c + (y - 16) * k)

    mask = Image.new("L", (SIZE * SS, SIZE * SS), 0)
    draw = ImageDraw.Draw(mask)
    outer, counter = R_SUBPATHS
    draw.polygon([tx(*pt) for pt in outer], fill=255)
    draw.polygon([tx(*pt) for pt in counter], fill=0)

    def dot(x, y, r):
        if r <= 0.01:
            return
        (px, py), rr = tx(x, y), r * k
        draw.ellipse((px - rr, py - rr, px + rr, py + rr), fill=255)

    # Kropki 2 i 3 wyjeżdżają z kropki 1 i rosną od zera.
    dot(DOT[0], DOT[1] + hop(t, 0), DOT_R + (TYPING_R - DOT_R) * p)
    for i in (1, 2):
        dot(DOT[0] + TYPING_GAP * i * p, DOT[1] + hop(t, i), TYPING_R * p)

    cov = mask.resize((SIZE, SIZE), Image.LANCZOS)
    frame = cov.point(lambda v: round(v * (LEVELS - 1) / 255)).convert("P")
    palette = []
    for n in range(LEVELS):
        a = n / (LEVELS - 1)
        palette += [round(BLUE[ch] + (WHITE[ch] - BLUE[ch]) * a) for ch in range(3)]
    frame.putpalette(palette)
    return frame


def main():
    n = round(DURATION * FPS)
    frames = [render(i / FPS) for i in range(n)]
    gif = OUT_DIR / "receply-avatar-pisze.gif"
    frames[0].save(gif, save_all=True, append_images=frames[1:], duration=1000 // FPS,
                   loop=0, optimize=False, disposal=1)
    frames[0].convert("RGB").save(OUT_DIR / "receply-avatar-statyczny.png")
    print(f"{gif.name}: {gif.stat().st_size / 1024:.0f} KB, {n} klatek, {DURATION}s")


if __name__ == "__main__":
    main()

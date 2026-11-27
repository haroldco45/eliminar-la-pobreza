import subprocess, math
from comun import *

W, H, FPS = 1080, 1920, 30
# (tipo, foto, segundos, etiqueta, grande, sub, color, contador)
ESC = [
    ('foto', 'foto2.jpg', 4.4, 'CASA DE NARIÑO · 26 NOV 2026', 'MESA DE EQUIDAD', 'El Gobierno instaló la Mesa de Equidad para el Milagro Social', BLANCO, None),
    ('foto', 'foto7.jpg', 4.8, 'LA META A 2030', '28 % → 20 %', 'bajar ocho puntos la pobreza monetaria en Colombia', VERDE2, None),
    ('foto', 'foto9.jpg', 4.8, 'PERSONAS FUERA DE LA POBREZA', '3.600.000', 'cerca de 900.000 por año, de 2026 a 2030', AMBAR, 3600000),
    ('barras', None, 5.4, 'DÓNDE DUELE MÁS · DANE 2025', '', '', BLANCO, None),
    ('foto', 'foto2.jpg', 4.6, 'VERIFICADO HOY POR EL DANE', '0', 'El primer dato de pobreza de este gobierno sale a mediados de 2027', ROJO, None),
    ('foto', 'foto7.jpg', 4.6, 'USTED PUEDE PREGUNTAR', 'PETICIÓN', 'Plan, presupuesto y metas por región: a 7 entidades de una sola vez', BLANCO, None),
]
FIN = 5.5
XF = 0.45
BARRAS = [('Sucre', 51.8), ('Córdoba', 44.0), ('Nacional', 28.0), ('Antioquia', 19.2)]

fotos = {f: cover(Image.open(F + f).convert('RGB'), int(W * 1.18), int(H * 1.18)) for _, f, *_ in ESC if f}
fEt = font(FIRAB, 40); fSub = font(FIRASB, 50); fCred = font(FIRA, 26); fMarca = font(FIRAB, 34)
def fGrande(txt):
    s = 230
    while font(ANTON, s).getlength(txt) > W - 140: s -= 6
    return font(ANTON, s)
degr = Image.new('L', (1, H))
for y in range(H):
    u = max(0, min(1, (y / H - 0.3) / 0.45)); degr.putpixel((0, y), int(255 * (0.22 + 0.74 * u * u * (3 - 2 * u))))
degr = degr.resize((W, H))
FONDO = Image.new('RGB', (W, H), NOCHE)
def ease(x): x = max(0, min(1, x)); return 1 - (1 - x) ** 3

def cabecera(d):
    logo(d, 60, 90)
    d.text((152, 126), 'Eliminar la Pobreza al Día', font=fMarca, fill=BLANCO, anchor='lm')

def etiqueta(im, et, a, y0):
    d = ImageDraw.Draw(im); w = d.textlength(et, font=fEt)
    lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
    dl.rounded_rectangle((70, y0, 70 + w + 44, y0 + 70), 35, fill=VERDE + (int(255 * a),))
    dl.text((92, y0 + 35), et, font=fEt, fill=NOCHE + (int(255 * a),), anchor='lm')
    im.paste(lay, (int(-40 * (1 - a)), 0), lay)

def escena_barras(i, t):
    _, _, dur, et, *_ = ESC[i]
    im = Image.new('RGB', (W, H), NOCHE); d = ImageDraw.Draw(im)
    for r in range(1000, 0, -40):
        a = int(30 * (1 - r / 1000)); d.ellipse((-r // 2, H - r, r, H + r), fill=(11 + a // 2, 16 + a, 32 + a // 2))
    cabecera(d)
    etiqueta(im, et, ease((t - .1) / .5), 330)
    d = ImageDraw.Draw(im)
    d.text((70, 440), 'Pobreza monetaria por departamento', font=fSub, fill=(220, 225, 240))
    mx = 60
    for k, (n, v) in enumerate(BARRAS):
        y = 600 + k * 255; a = ease((t - .5 - k * .25) / 1.2)
        col = (230, 235, 245) if n == 'Nacional' else (VERDE if n == 'Antioquia' else (AMBAR if n == 'Córdoba' else ROJO))
        d.text((70, y), n, font=font(FIRAB, 56), fill=BLANCO)
        d.rounded_rectangle((70, y + 110, W - 70, y + 190), 22, fill=(30, 38, 66))
        ww = int((W - 140) * v / mx * a)
        if ww > 44: d.rounded_rectangle((70, y + 110, 70 + ww, y + 190), 22, fill=col)
        d.text((W - 70, y + 10), f"{v * a:.1f} %".replace('.', ','), font=font(ANTON, 72), fill=col, anchor='ra')
    d.text((70, 1660), 'Fuente: DANE, pobreza monetaria 2025', font=fCred, fill=(170, 178, 200))
    d.rectangle((0, H - 10, int(W * t / dur), H), fill=VERDE)
    return im

def escena(i, t):
    tipo, f, dur, et, gr, sub, col, cont = ESC[i]
    if tipo == 'barras': return escena_barras(i, t)
    base = fotos[f]; p = t / dur; z = 1.0 + 0.12 * p
    cw = int(W * 1.18 / z); ch = int(H * 1.18 / z)
    dx = (base.width - cw) * (0.5 + 0.25 * math.sin(i * 1.7) * p); dy = (base.height - ch) * 0.45
    im = base.crop((int(dx), int(dy), int(dx) + cw, int(dy) + ch)).resize((W, H), Image.BILINEAR)
    im = Image.composite(FONDO, im, degr)
    d = ImageDraw.Draw(im); cabecera(d)
    a1, a2, a3 = ease((t - .15) / .5), ease((t - .4) / .6), ease((t - .8) / .6)
    y0 = 1060
    if a1 > 0: etiqueta(im, et, a1, y0)
    txt = gr
    if cont: txt = f"{int(cont * ease((t - .4) / 1.8)):,}".replace(',', '.')
    fg = fGrande(gr)
    if a2 > 0:
        lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
        dl.text((70, y0 + 110 + int(60 * (1 - a2))), txt, font=fg, fill=col + (int(255 * a2),))
        im.paste(lay, (0, 0), lay)
    gh = fg.getbbox(gr)[3]
    if a3 > 0:
        lay = Image.new('RGBA', (W, H)); dl = ImageDraw.Draw(lay)
        yy = y0 + 140 + gh
        dl.rectangle((70, yy, 70 + int(140 * a3), yy + 8), fill=VERDE + (255,))
        for k, ln in enumerate(wrap(dl, sub, fSub, W - 150)):
            dl.text((70, yy + 40 + k * 66), ln, font=fSub, fill=BLANCO + (int(240 * a3),))
        im.paste(lay, (0, 0), lay)
    d = ImageDraw.Draw(im)
    d.text((W - 50, H - 60), 'Foto: ' + CRED.get(f, ''), font=fCred, fill=(200, 205, 220), anchor='rs')
    d.rectangle((0, H - 10, int(W * p), H), fill=VERDE)
    return im

QR = qr(520)
def final(t):
    im = Image.new('RGB', (W, H), NOCHE); d = ImageDraw.Draw(im)
    for r in range(900, 0, -30):
        a = int(40 * (1 - r / 900)); d.ellipse((W - r, -r // 2, W + r, r * 3 // 2 - r), fill=(11, 16 + a, 32 + a // 2))
    a = ease(t / .6)
    logo(d, W // 2 - 70, 230, 140)
    d.text((W // 2, 470), 'Eliminar la Pobreza', font=font(ANTON, 112), fill=BLANCO, anchor='mm')
    d.text((W // 2, 590), 'AL DÍA', font=font(ANTON, 110), fill=VERDE, anchor='mm')
    d.text((W // 2, 700), 'Seguimiento ciudadano a la Mesa de Equidad', font=font(FIRASB, 46), fill=(220, 225, 240), anchor='mm')
    s = int(520 * (0.85 + 0.15 * a)); q = QR.resize((s, s))
    pad = 28; x = (W - s) // 2; y = 790 + (520 - s) // 2
    d.rounded_rectangle((x - pad, y - pad, x + s + pad, y + s + pad), 36, fill=BLANCO); im.paste(q, (x, y))
    d.text((W // 2, 1420), URL, font=font(FIRAB, 52), fill=VERDE2, anchor='mm')
    for k, ln in enumerate(['Noticias que se actualizan solas cada 30 minutos', 'Español e inglés · Derecho de petición']):
        d.text((W // 2, 1510 + k * 62), ln, font=font(FIRA, 42), fill=(210, 215, 230), anchor='mm')
    d.text((W // 2, 1720), 'Vibras Positivas HM', font=font(FIRAB, 46), fill=BLANCO, anchor='mm')
    d.text((W // 2, 1782), 'Caucasia, Antioquia · WhatsApp 311 770 0431', font=font(FIRA, 36), fill=(190, 196, 214), anchor='mm')
    return im

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'eliminar-la-pobreza.mp4')
ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
                       '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
inicios = []; acc = 0
for e in ESC: inicios.append(acc); acc += e[2]
n = int((acc + FIN) * FPS)
for k in range(n):
    t = k / FPS
    if t >= acc:
        fr = final(t - acc)
        if t - acc < XF: fr = Image.blend(escena(len(ESC) - 1, ESC[-1][2] - 0.001), fr, (t - acc) / XF)
    else:
        i = max(j for j, s in enumerate(inicios) if s <= t)
        fr = escena(i, t - inicios[i])
        nxt = inicios[i] + ESC[i][2]
        if nxt - t < XF:
            sig = escena(i + 1, 0) if i + 1 < len(ESC) else final(0)
            fr = Image.blend(fr, sig, 1 - (nxt - t) / XF)
    ff.stdin.write(fr.tobytes())
ff.stdin.close(); ff.wait()
print('listo', acc + FIN, 's')

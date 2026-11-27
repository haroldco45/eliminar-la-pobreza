from PIL import Image, ImageDraw, ImageFont
import qrcode, json, subprocess, os
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'fotos') + '/'
CRED = {x['archivo'].split('/')[-1]: x['fuente'] for x in json.load(open(F + 'creditos.json'))}
def fpath(fam, style=''):
    return subprocess.run(['fc-match', '-f', '%{file}', f'{fam}:{style}'], capture_output=True, text=True).stdout
ANTON = fpath('Anton'); ARCH = fpath('Archivo Black'); FIRA = fpath('Fira Sans', 'style=Regular'); FIRAB = fpath('Fira Sans', 'style=Bold'); FIRASB = fpath('Fira Sans', 'style=SemiBold')
def font(p, s): return ImageFont.truetype(p, s)
NOCHE = (11, 16, 32); VERDE = (34, 211, 154); VERDE2 = (125, 255, 201); ROJO = (255, 110, 110); AMBAR = (255, 196, 70); BLANCO = (255, 255, 255)
URL = 'eliminar-la-pobreza.netlify.app'
def qr(size):
    q = qrcode.QRCode(border=2, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data('https://' + URL + '/'); q.make()
    return q.make_image(fill_color=NOCHE, back_color='white').convert('RGB').resize((size, size), Image.NEAREST)
def cover(im, w, h):
    r = max(w / im.width, h / im.height); im = im.resize((int(im.width * r + 1), int(im.height * r + 1)), Image.LANCZOS)
    x = (im.width - w) // 2; y = (im.height - h) // 2; return im.crop((x, y, x + w, y + h))
def wrap(d, txt, f, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines
def logo(d, x, y, s=72):
    d.rounded_rectangle((x, y, x + s, y + s), int(s * .25), fill=VERDE)
    d.text((x + s / 2, y + s / 2), 'EP', font=font(ARCH, int(s * .42)), fill=NOCHE, anchor='mm')

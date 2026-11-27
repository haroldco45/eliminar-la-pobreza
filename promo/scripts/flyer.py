from comun import *
W, H = 1080, 1350
FOTO = 'foto2.jpg'
im = Image.new('RGB', (W, H), NOCHE)
foto = cover(Image.open(F + FOTO).convert('RGB'), W, 780)
im.paste(foto, (0, 0))
g = Image.new('L', (1, 780))
for y in range(780):
    u = max(0, min(1, (y / 780 - 0.25) / 0.75)); g.putpixel((0, y), int(255 * (0.25 + 0.75 * u * u * (3 - 2 * u))))
im.paste(Image.new('RGB', (W, 780), NOCHE), (0, 0), g.resize((W, 780)))
d = ImageDraw.Draw(im)
logo(d, 50, 50)
d.text((140, 86), 'Vibras Positivas HM', font=font(FIRAB, 32), fill=BLANCO, anchor='lm')
et = 'SEGUIMIENTO CIUDADANO · MESA DE EQUIDAD'; f = font(FIRAB, 28); w = d.textlength(et, font=f)
d.rounded_rectangle((60, 380, 60 + w + 40, 434), 27, fill=VERDE); d.text((80, 407), et, font=f, fill=NOCHE, anchor='lm')
d.text((56, 440), 'ELIMINAR LA', font=font(ANTON, 132), fill=BLANCO)
d.text((56, 590), 'POBREZA', font=font(ANTON, 132), fill=BLANCO)
fa = font(ANTON, 132); xa = 56 + d.textlength('POBREZA ', font=fa)
d.text((xa, 625), 'AL DÍA', font=font(ANTON, 92), fill=VERDE)
d.text((60, 772), '¿Se cumple la meta? La seguimos con datos oficiales.', font=font(FIRASB, 34), fill=(225, 230, 242), anchor='lm')
cajas = [('28 % → 20 %', 'meta de pobreza monetaria a 2030', VERDE2), ('3,6 M', 'personas a sacar de la pobreza', AMBAR), ('0', 'verificadas hoy por el DANE', ROJO)]
x = 50; cw = (W - 100 - 2 * 20) // 3
for n, t, c in cajas:
    d.rounded_rectangle((x, 805, x + cw, 978), 24, fill=(22, 29, 54), outline=(50, 60, 95), width=2)
    fs = 66
    while font(ANTON, fs).getlength(n) > cw - 40: fs -= 2
    d.text((x + 22, 822), n, font=font(ANTON, fs), fill=c)
    for k, l in enumerate(wrap(d, t, font(FIRA, 26), cw - 44)): d.text((x + 22, 902 + k * 32), l, font=font(FIRA, 26), fill=(205, 210, 228))
    x += cw + 20
d.rounded_rectangle((50, 1000, W - 50, 1308), 28, fill=BLANCO)
im.paste(qr(250), (80, 1029))
d = ImageDraw.Draw(im)
d.text((360, 1028), 'Escanee y abra la app', font=font(FIRAB, 40), fill=NOCHE)
for k, l in enumerate(['Cifras oficiales del DANE', 'Noticias solas cada 30 minutos', '¿Mi hogar cuenta como pobre?', 'Derecho de petición a 7 entidades']):
    d.rectangle((362, 1097 + k * 38, 374, 1109 + k * 38), fill=VERDE); d.text((388, 1087 + k * 38), l, font=font(FIRA, 28), fill=(40, 46, 66))
d.text((360, 1286), URL, font=font(FIRAB, 34), fill=(10, 120, 90), anchor='ls')
d.text((W - 50, 1335), 'Foto: ' + CRED[FOTO] + '  ·  WhatsApp 311 770 0431  ·  Caucasia, Antioquia', font=font(FIRA, 22), fill=(160, 168, 190), anchor='rs')
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
im.save(out + '/flyer-eliminar-la-pobreza.png'); im.save(out + '/flyer-eliminar-la-pobreza.jpg', quality=92)
print('flyer listo')

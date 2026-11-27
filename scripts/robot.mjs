// Robot de noticias de Eliminar la Pobreza al Día — Vibras Positivas HM
// Corre en GitHub Actions cada 30 minutos. Node 22, sin dependencias obligatorias.
import { readFile, writeFile } from 'node:fs/promises';

const ARCHIVO = 'data/noticias.json';
const MAX_ITEMS = 250;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const CONSULTAS = [
  '"Mesa de Equidad"',
  '"Milagro Social" pobreza',
  '"Mesa de Equidad" pobreza 2030',
  'pobreza monetaria Colombia',
  'Prosperidad Social pobreza',
  'DANE pobreza',
  'pobreza Antioquia',
  'pobreza Córdoba',
  'pobreza Bajo Cauca',
  'Sammy Azout milagro social'
];

const RELEVANTE = /pobreza|mesa de equidad|milagro social|prosperidad social|desigualdad|renta ciudadana|asistencialismo/i;

// Solo Colombia: medios colombianos, dominios .co o títulos que hablen de Colombia
const MEDIOS_CO = /el tiempo|el espectador|semana|portafolio|la rep[uú]blica|el colombiano|el heraldo|el universal|el pa[ií]s cali|caracol|rcn|la fm|blu radio|w radio|valora|cambio|pulzo|kienyke|las2orillas|minuto30|minuto60|telemedell[ií]n|teleantioquia|teleca[rr]ibe|publimetro colombia|el nuevo siglo|vanguardia liberal|la opini[oó]n.*c[uú]cuta|el meridiano|chica ?noticias|hoy diario del magdalena|colombia\.com|presidencia|prosperidad social|dane|dnp|la silla vac[ií]a|la patria|el informador.*santa marta|el nuevo d[ií]a \(colombia\)|diario del sur|bogota\.gov|alcald[ií]a de medell[ií]n|gobernaci[oó]n de antioquia|canal campotv|agroverdad|revistametro|ifm ?noticias|hsb noticias|estrella digital colombia|bloomberg l[ií]nea colombia|infobae colombia|ayudas 10|mi bolsillo|el resaltador|la cheverona|zona cero|semana rural|contexto ganadero|el pilón|diario del huila|la naci[oó]n neiva|q'?hubo|digame|diario del cauca|enfoque teve|el olfato|alerta (bogot|caribe|paisa)|tropicana|la voz de yopal|el diario \(pereira\)/i;
const TITULO_CO = /colombia|colombian|\bdane\b|prosperidad social|renta ciudadana|mesa de equidad|milagro social|de la espriella|antioquia|bogot[aá]|medell[ií]n|caucasia|bajo cauca|ibagu[eé]|pereira|manizales|armenia\b|villavicencio|neiva|pasto\b|popay[aá]n|quibd[oó]|riohacha|valledupar|sincelejo|sucre|chocó|choc[oó]|la guajira|barranquilla|cartagena|monter[ií]a|cali\b|bucaramanga|c[uú]cuta|santa marta|magdalena|cesar|bol[ií]var|nari[nñ]o|cauca\b|huila|tolima|boyac[aá]|cundinamarca|santander|meta\b|caquet[aá]|putumayo|amazonas|urab[aá]/i;
const NO_CO = /argentin|m[eé]xic|per[uú]\b|chile|venezuel|ecuador|espa[nñ]a|vietnam|honduras|guatemala|panam[aá]|el papa|rep[uú]blica dominicana|puerto rico|\.ar\b|\.mx\b|\.pe\b|\.cl\b|\.es\b/i;
function esColombia(it) {
  let host = '';
  try { host = new URL(it.url).hostname; } catch {}
  const txt = `${it.titulo} ${it.fuente}`;
  if (NO_CO.test(txt) || NO_CO.test(host)) return false;
  if (/\.co$|\.gov\.co$|\.com\.co$|\.org\.co$|\.edu\.co$/.test(host)) return true;
  if (/\/colombia\//i.test(it.url)) return true;
  return MEDIOS_CO.test(it.fuente) || TITULO_CO.test(it.titulo);
}

function limpiar(t = '') {
  return t
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ').trim();
}

function tag(xml, nombre) {
  const m = xml.match(new RegExp(`<${nombre}[^>]*>([\\s\\S]*?)</${nombre}>`, 'i'));
  return m ? limpiar(m[1]) : '';
}

async function traer(url, ms = 15000) {
  const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'es-CO,es;q=0.9' }, signal: AbortSignal.timeout(ms), redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r;
}

function parsearRSS(xml, origen) {
  const out = [];
  for (const bloque of xml.split(/<item>/i).slice(1)) {
    let titulo = tag(bloque, 'title');
    let url = tag(bloque, 'link');
    let fuente = tag(bloque, 'source') || '';
    const fecha = tag(bloque, 'pubDate');
    if (origen === 'bing') {
      try { const u = new URL(url); url = u.searchParams.get('url') || url; } catch {}
      fuente = fuente || tag(bloque, 'News:Source');
    }
    if (origen === 'google' && / - [^-]+$/.test(titulo)) {
      const i = titulo.lastIndexOf(' - ');
      if (!fuente) fuente = titulo.slice(i + 3);
      titulo = titulo.slice(0, i);
    }
    if (!titulo || !url) continue;
    const d = new Date(fecha);
    out.push({ titulo, url, fuente: fuente || new URL(url).hostname.replace(/^www\./, ''), fecha: isNaN(d) ? new Date().toISOString() : d.toISOString(), imagen: '' });
  }
  return out;
}

async function buscar(q) {
  const res = [];
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:30d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(q)}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  for (const [u, o] of [[g, 'google'], [b, 'bing']]) {
    try { res.push(...parsearRSS(await (await traer(u)).text(), o)); }
    catch (e) { console.log('fallo', o, q, e.message); }
  }
  return res;
}

async function resolverGoogle(url) {
  if (!/news\.google\.com/.test(url)) return url;
  try { const r = await traer(url, 10000); return r.url || url; } catch { return url; }
}

async function ogImagen(url) {
  try {
    const r = await traer(url, 12000);
    const html = (await r.text()).slice(0, 400000);
    const m = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)(?::src)?["'][^>]*content=["']([^"']+)["']/i)
           || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i);
    if (!m) return { img: '', final: r.url };
    return { img: new URL(m[1].replace(/&amp;/g, '&'), r.url).href, final: r.url };
  } catch { return { img: '', final: url }; }
}

const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim().slice(0, 90);

async function main() {
  let previo = { items: [] };
  try { previo = JSON.parse(await readFile(ARCHIVO, 'utf8')); } catch {}
  const mapa = new Map(previo.items.map(i => [clave(i.titulo), i]));

  const nuevos = [];
  for (const q of CONSULTAS) {
    for (const it of await buscar(q)) {
      if (!RELEVANTE.test(it.titulo) || !esColombia(it)) continue;
      const k = clave(it.titulo);
      if (mapa.has(k)) continue;
      mapa.set(k, it); nuevos.push(it);
    }
  }
  console.log('nuevas noticias:', nuevos.length);

  // Fotos reales: og:image de cada nota (las que aún no tienen)
  const sinFoto = [...mapa.values()].filter(i => !i.imagen && !i._intentado).slice(0, 45);
  let hechos = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (sinFoto.length) {
      const it = sinFoto.shift();
      it.url = await resolverGoogle(it.url);
      const { img, final } = await ogImagen(it.url);
      if (final && !/news\.google\.com/.test(final)) it.url = final;
      if (img && !/googleusercontent|gstatic|logo|favicon/i.test(img)) { it.imagen = img; hechos++; }
      else it._intentado = true;
    }
  }));
  console.log('fotos nuevas:', hechos);

  const items = [...mapa.values()]
    .filter(i => RELEVANTE.test(i.titulo) && esColombia(i))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, MAX_ITEMS);

  await writeFile(ARCHIVO, JSON.stringify({ actualizado: new Date().toISOString(), items }, null, 1));
  await portada(items);
}

// Una foto real tiene pocos píxeles blancos planos; las infografías y tablas tienen muchos
async function esFoto(sharp, buf) {
  const { data, info } = await sharp(buf).resize(64, 64, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let blancos = 0, total = info.width * info.height;
  for (let i = 0; i < data.length; i += 3) if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) blancos++;
  const { width, height } = await sharp(buf).metadata();
  return blancos / total < 0.18 && width >= 500 && height >= 280;
}

// Imagen de vista previa (la que sale al compartir el enlace) con foto real
async function portada(items) {
  let sharp;
  try { sharp = (await import('sharp')).default; } catch { console.log('sin sharp, no se rehace portada'); return; }
  let meta = {};
  try { meta = JSON.parse(await readFile('data/portada.json', 'utf8')); } catch {}
  const candidatas = items.filter(i => i.imagen && !/infograf|grafic|logo|banner/i.test(i.imagen)).slice(0, 12);
  for (const c of candidatas) {
    if (meta.imagen === c.imagen) return; // ya está al día
    try {
      const buf = Buffer.from(await (await traer(c.imagen, 15000)).arrayBuffer());
      if (!(await esFoto(sharp, buf))) { console.log('descarto (parece gráfico):', c.imagen); continue; }
      const base = sharp(buf).resize(1200, 630, { fit: 'cover', position: 'attention' });
      const capa = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.25" stop-color="#0b1020" stop-opacity="0.05"/><stop offset="1" stop-color="#0b1020" stop-opacity="0.95"/></linearGradient></defs>
        <rect width="1200" height="630" fill="url(#g)"/>
        <rect x="60" y="440" width="12" height="130" fill="#22d39a"/>
        <text x="96" y="500" font-family="DejaVu Sans, Arial" font-weight="700" font-size="64" fill="#ffffff">Eliminar la Pobreza al Día</text>
        <text x="96" y="556" font-family="DejaVu Sans, Arial" font-size="30" fill="#7dffc9">Meta 2030: del 28 % al 20 %. Seguimiento ciudadano</text>
        <text x="1140" y="600" text-anchor="end" font-family="DejaVu Sans, Arial" font-size="22" fill="#cfd6e6">Vibras Positivas HM</text>
      </svg>`);
      await base.composite([{ input: capa }]).jpeg({ quality: 84 }).toFile('portada.jpg');
      await writeFile('data/portada.json', JSON.stringify({ imagen: c.imagen, fuente: c.fuente, url: c.url, fecha: new Date().toISOString() }, null, 1));
      console.log('portada nueva desde', c.fuente);
      return;
    } catch (e) { console.log('portada falló con', c.imagen, e.message); }
  }
}

main().catch(e => { console.error(e); process.exit(1); });

/* Eliminar la Pobreza al Día — Vibras Positivas HM */
'use strict';
const URL_APP = 'https://eliminar-la-pobreza.netlify.app/';
const TZ = 'America/Bogota';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu, '').replace(/\s{2,}/g, ' ').trim().replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pesos = n => '$' + Math.round(n).toLocaleString('es-CO');

/* ---------- Idioma ---------- */
const T = {
  es: {
    nav_hoy:'Hoy', nav_mesa:'La Mesa', nav_sem:'Semáforo', nav_region:'Mi región', nav_peticion:'Petición', actualizar:'Actualizar',
    pildora:'Mesa de Equidad instalada el 26 de noviembre de 2026',
    hero_titulo:'¿Se cumple la meta contra la pobreza?',
    hero_sub:'El Gobierno prometió bajar la pobreza monetaria del 28 % al 20 % en 2030 y sacar de ella a 3,6 millones de colombianos. Aquí seguimos cada paso con datos oficiales, sin aplausos ni ataques: solo resultados.',
    m_meta:'Meta: salir de la pobreza a 2030', m_meta_n:'personas, según el Gobierno', m_hoy:'Pobres hoy (DANE 2025)', m_ext:'En pobreza extrema', m_verif:'Salidos y verificados por el DANE desde la Mesa',
    dias_meta:'días para el 31 de diciembre de 2030', dias_dane:'días aprox. para el dato DANE de 2026 (mediados de 2027)', por_anio:'personas por año tienen que salir de la pobreza',
    hoy_t:'Hoy', hoy_i:'Lo último sobre la Mesa de Equidad y la pobreza en Colombia. Se actualiza cada vez que usted entra y el robot trae noticias nuevas cada 30 minutos.',
    buscar_ph:'Buscar en vivo: Renta Ciudadana, Córdoba, empleo…', buscar:'Buscar',
    mesa_t:'¿Qué es la Mesa de Equidad?', mesa_i:'Lo que dijo el Gobierno al instalarla, explicado en sencillo.',
    num_t:'La pobreza en números', num_i:'Cifras oficiales del DANE para 2025, publicadas en junio de 2026. Es el punto de partida de la meta.',
    his_t:'De dónde venimos y a dónde quieren llegar', his_i:'Pobreza monetaria nacional, en porcentaje de la población. La línea punteada es la meta del Gobierno.',
    his_n:'Para llegar al 20 % hay que bajar unos 1,6 puntos por año entre 2026 y 2030. Entre 2024 y 2025 bajó 3,8 puntos; entre 2019 y 2020, con la pandemia, subió 6,8.',
    meta:'Meta',
    cal_t:'¿Mi hogar cuenta como pobre?', cal_i:'Ponga lo que entra al mes a su casa y cuántas personas viven ahí. La comparamos con la línea nacional de pobreza del DANE para 2025. No se guarda nada.',
    cal_ing:'Ingresos de todo el hogar al mes (pesos)', cal_per:'Personas que viven en el hogar', cal_nota:'Es una guía. El DANE usa líneas distintas por región y cuenta todos los ingresos, incluidas ayudas del Estado.',
    cal_vacio:'Escriba los ingresos del hogar', cal_vacio_d:'Con eso le decimos cuánto le toca a cada persona y cómo queda frente a la línea de pobreza.',
    cal_porp:'Le tocan {v} por persona al mes.', cal_lin:'Línea de pobreza: {p} por persona. Línea de pobreza extrema: {e}.',
    cal_ext:'Por debajo de la línea de pobreza extrema', cal_ext_d:'Con ese ingreso el DANE contaría a su hogar en pobreza extrema: no alcanza para la canasta básica de alimentos.',
    cal_pob:'Por debajo de la línea de pobreza', cal_pob_d:'Su hogar contaría entre los pobres monetarios. Es justo la población a la que apunta la meta de 2030.',
    cal_vul:'Por encima, pero vulnerable', cal_vul_d:'Su hogar no es pobre según el DANE, pero está en la franja de vulnerabilidad: un golpe (desempleo, enfermedad) lo puede devolver.',
    cal_ok:'Por encima de la línea de pobreza', cal_ok_d:'Según la línea nacional, su hogar no está en pobreza monetaria ni en la franja vulnerable.',
    cal_falta:'Le faltan {v} al mes al hogar para salir de la línea.',
    sem_t:'Semáforo de compromisos', sem_i:'Lo que el Gobierno prometió al instalar la Mesa. Cuando algo se cumpla, cambiamos la luz con la fuente.',
    'est_cumplido':'Cumplido', 'est_en-curso':'En curso', 'est_pendiente':'Pendiente', fuente:'Fuente',
    re_t:'Dónde duele más la pobreza', re_i:'Pobreza monetaria por departamento en 2025 (DANE). Resaltamos Antioquia, Córdoba y Sucre, donde trabajamos.',
    rk_nuestro:'nuestra región',
    bajo_txt:'El DANE no publica pobreza monetaria por municipio cada año, así que no hay dato oficial para Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá o Nechí. Lo pedimos en la petición y contamos aquí cada noticia que nombre a la subregión.',
    bajo_si:'Ya hay noticias de pobreza o de la Mesa de Equidad que mencionan al Bajo Cauca. Búsquelas abajo en "Todas las noticias". Igual seguimos pidiendo metas para la subregión.',
    bajo_menc:'noticias que mencionan al Bajo Cauca', sem_sin:'Sin metas', sem_con:'Hay menciones',
    vi_t:'Videos reales', vi_i:'Lo que se ha dicho sobre la Mesa de Equidad y la pobreza, en video. El robot busca videos nuevos cada 30 minutos.',
    pr_t:'Lo que vamos a vigilar',
    pe_t:'Derecho de petición: que nos digan cómo lo van a lograr',
    pe_i:'Llene sus datos y envíe una sola petición a todas las entidades a la vez. La ley les da 15 días hábiles para responder (artículo 23 de la Constitución y Ley 1755 de 2015).',
    pe_nombre:'Nombre completo', pe_cc:'Cédula', pe_ciudad:'Ciudad', pe_correo:'Su correo para la respuesta', pe_tel:'Celular (opcional)',
    pe_dest:'Se envía a', pe_enviar:'Enviar a todas las entidades', pe_gmail:'Abrir en Gmail', pe_copiar:'Copiar texto',
    pe_nota:'La app no guarda sus datos: el correo sale desde su propia cuenta. Revise los correos de las entidades antes de enviar; pueden cambiar.',
    fu_t:'Todas las noticias', fu_of:'Fuentes oficiales', ver_mas:'Ver más',
    pie_txt:'App ciudadana independiente. No es del Gobierno ni de ningún partido. Los datos vienen del DANE, de comunicados oficiales y de medios, siempre con su fuente.',
    compartir:'Compartir por WhatsApp',
    hoy_ultimas:'Hoy no hay notas nuevas todavía. Estas son las últimas:', robot:'Robot: última búsqueda {h} (hora Colombia)',
    busc_cargando:'Buscando en vivo en los medios…', busc_ok:'{n} noticias en vivo encontradas', busc_nada:'La búsqueda en vivo no respondió. Mostramos lo que trajo el robot.',
    nueva:'NUEVA', hace_min:'hace {n} min', hace_h:'hace {n} h', hace_d:'hace {n} d',
    sin_videos:'El robot todavía no trae videos. Se llenan solos en la próxima búsqueda.', buscar_yt:'Ver videos en YouTube',
    copiado:'Texto copiado', compartir_txt:'Seguimiento ciudadano a la Mesa de Equidad: ¿se cumple la meta de bajar la pobreza del 28 % al 20 % en 2030? Datos del DANE y noticias que se actualizan solas:'
  },
  en: {
    nav_hoy:'Today', nav_mesa:'The Board', nav_sem:'Tracker', nav_region:'My region', nav_peticion:'Petition', actualizar:'Refresh',
    pildora:'Equity Board (Mesa de Equidad) installed on November 26, 2026',
    hero_titulo:'Is the anti-poverty target being met?',
    hero_sub:'The government promised to cut monetary poverty from 28% to 20% by 2030 and lift 3.6 million Colombians out of it. We track every step with official data, no cheering and no attacks: just results.',
    m_meta:'Target: out of poverty by 2030', m_meta_n:'people, according to the government', m_hoy:'Poor today (DANE 2025)', m_ext:'In extreme poverty', m_verif:'Out of poverty and verified by DANE since the Board',
    dias_meta:'days to December 31, 2030', dias_dane:'approx. days to DANE\'s 2026 figure (mid-2027)', por_anio:'people per year need to leave poverty',
    hoy_t:'Today', hoy_i:'The latest on the Equity Board and poverty in Colombia. It refreshes every time you open the app, and the robot brings new stories every 30 minutes.',
    buscar_ph:'Live search: Renta Ciudadana, Córdoba, jobs…', buscar:'Search',
    mesa_t:'What is the Mesa de Equidad?', mesa_i:'What the government said when it was installed, in plain words.',
    num_t:'Poverty in numbers', num_i:'Official DANE figures for 2025, published in June 2026. This is the target\'s starting point.',
    his_t:'Where we come from and where they want to go', his_i:'National monetary poverty, as a share of the population. The dotted line is the government target.',
    his_n:'Reaching 20% means cutting about 1.6 points a year from 2026 to 2030. Between 2024 and 2025 it fell 3.8 points; between 2019 and 2020, with the pandemic, it rose 6.8.',
    meta:'Target',
    cal_t:'Does my household count as poor?', cal_i:'Enter your household\'s monthly income and how many people live there. We compare it with DANE\'s 2025 national poverty line. Nothing is stored.',
    cal_ing:'Total household income per month (pesos)', cal_per:'People living in the household', cal_nota:'This is a guide. DANE uses different lines by region and counts all income, including state aid.',
    cal_vacio:'Enter the household income', cal_vacio_d:'We will show how much each person gets and how it compares with the poverty line.',
    cal_porp:'That is {v} per person per month.', cal_lin:'Poverty line: {p} per person. Extreme poverty line: {e}.',
    cal_ext:'Below the extreme poverty line', cal_ext_d:'With that income DANE would count your household in extreme poverty: it does not cover the basic food basket.',
    cal_pob:'Below the poverty line', cal_pob_d:'Your household would count as monetarily poor. This is exactly the group the 2030 target aims at.',
    cal_vul:'Above, but vulnerable', cal_vul_d:'Your household is not poor by DANE\'s measure, but it is in the vulnerable band: one shock (job loss, illness) could push it back.',
    cal_ok:'Above the poverty line', cal_ok_d:'By the national line, your household is neither poor nor in the vulnerable band.',
    cal_falta:'The household is {v} a month short of the line.',
    sem_t:'Commitment tracker', sem_i:'What the government promised when installing the Board. When something is delivered, we switch the light with the source.',
    'est_cumplido':'Done', 'est_en-curso':'In progress', 'est_pendiente':'Pending', fuente:'Source',
    re_t:'Where poverty hurts most', re_i:'Monetary poverty by department in 2025 (DANE). Antioquia, Córdoba and Sucre, where we work, are highlighted.',
    rk_nuestro:'our region',
    bajo_txt:'DANE does not publish yearly monetary poverty by town, so there is no official figure for Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá or Nechí. We request it in the petition and count every story naming the subregion here.',
    bajo_si:'There are now poverty or Equity Board stories mentioning Bajo Cauca. Find them in "All news" below. We still ask for targets for the subregion.',
    bajo_menc:'stories mentioning Bajo Cauca', sem_sin:'No targets', sem_con:'Mentioned',
    vi_t:'Real videos', vi_i:'What has been said about the Equity Board and poverty, on video. The robot looks for new videos every 30 minutes.',
    pr_t:'What we will watch',
    pe_t:'Right of petition: tell us how you will do it',
    pe_i:'Fill in your details and send one petition to every agency at once. By law they have 15 business days to answer (Article 23 of the Constitution, Law 1755 of 2015).',
    pe_nombre:'Full name', pe_cc:'ID number (cédula)', pe_ciudad:'City', pe_correo:'Your email for the reply', pe_tel:'Mobile (optional)',
    pe_dest:'Sent to', pe_enviar:'Send to all agencies', pe_gmail:'Open in Gmail', pe_copiar:'Copy text',
    pe_nota:'The app does not store your data: the email goes out from your own account. Check the agency addresses before sending; they may change. The petition itself is in Spanish, as Colombian agencies require.',
    fu_t:'All news', fu_of:'Official sources', ver_mas:'Show more',
    pie_txt:'Independent citizen app. Not affiliated with the government or any party. Data comes from DANE, official statements and media, always with its source.',
    compartir:'Share on WhatsApp',
    hoy_ultimas:'No new stories today yet. Here are the latest:', robot:'Robot: last search {h} (Colombia time)',
    busc_cargando:'Searching live across the media…', busc_ok:'{n} live stories found', busc_nada:'Live search did not respond. Showing what the robot found.',
    nueva:'NEW', hace_min:'{n} min ago', hace_h:'{n} h ago', hace_d:'{n} d ago',
    sin_videos:'The robot has not brought videos yet. They fill in on the next search.', buscar_yt:'See videos on YouTube',
    copiado:'Text copied', compartir_txt:'Citizen tracking of Colombia\'s Equity Board: will poverty fall from 28% to 20% by 2030? DANE data and auto-updating news:'
  }
};
let LANG = 'es';
try { LANG = localStorage.getItem('ep_lang') || (navigator.language || 'es').slice(0, 2); } catch {}
if (!T[LANG]) LANG = 'es';
const t = (k, v = {}) => (T[LANG][k] ?? T.es[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
function aplicarIdioma() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#btnLang').textContent = LANG === 'es' ? 'EN' : 'ES';
}

/* ---------- Fechas en hora de Colombia ---------- */
const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const diaCO = d => fmtDia.format(new Date(d));
const hoyCO = () => diaCO(Date.now());
function fechaLarga(d, conHora) {
  return new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: TZ, day: 'numeric', month: 'short', year: conHora ? undefined : 'numeric', hour: conHora ? 'numeric' : undefined, minute: conHora ? '2-digit' : undefined }).format(new Date(d));
}
function hace(d) {
  const m = Math.max(1, Math.round((Date.now() - new Date(d)) / 60000));
  if (m < 60) return t('hace_min', { n: m });
  if (m < 1440) return t('hace_h', { n: Math.round(m / 60) });
  return t('hace_d', { n: Math.round(m / 1440) });
}
const diasHasta = iso => Math.max(0, Math.ceil((new Date(iso) - Date.now()) / 864e5));

/* ---------- Datos ---------- */
let D = { mesa: null, noticias: { items: [] }, videos: { items: [] } };
let enVivo = [];
async function cargarJSON(ruta) {
  const r = await fetch(`${ruta}?t=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(ruta);
  return r.json();
}
async function cargarTodo() {
  const [a, n, v] = await Promise.allSettled([cargarJSON('data/mesa.json'), cargarJSON('data/noticias.json'), cargarJSON('data/videos.json')]);
  if (a.status === 'fulfilled') D.mesa = a.value;
  if (n.status === 'fulfilled') D.noticias = n.value;
  if (v.status === 'fulfilled') D.videos = v.value;
}

/* ---------- Búsqueda en vivo (Google News + Bing por proxies) ---------- */
const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
];
async function traerProxy(u) {
  for (const p of PROXIES) {
    try {
      const r = await fetch(p(u), { signal: AbortSignal.timeout(9000) });
      if (r.ok) { const txt = await r.text(); if (txt.includes('<item')) return txt; }
    } catch {}
  }
  throw new Error('proxies');
}
function parsearRSS(xml, bing) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return [...doc.querySelectorAll('item')].map(it => {
    let titulo = it.querySelector('title')?.textContent?.trim() || '';
    let url = it.querySelector('link')?.textContent?.trim() || '';
    let fuente = it.querySelector('source')?.textContent?.trim() || '';
    if (bing) { try { url = new URL(url).searchParams.get('url') || url; } catch {} }
    else if (titulo.includes(' - ')) { const i = titulo.lastIndexOf(' - '); fuente = fuente || titulo.slice(i + 3); titulo = titulo.slice(0, i); }
    const f = new Date(it.querySelector('pubDate')?.textContent || Date.now());
    let foto = '';
    const media = [...it.getElementsByTagName('*')].find(e => /content|thumbnail|Image/i.test(e.localName) && (e.getAttribute('url') || /^https?:/.test(e.textContent)));
    if (media) foto = media.getAttribute('url') || media.textContent;
    if (/bing\.com\/th/.test(foto)) foto = '';
    if (!fuente) { try { fuente = new URL(url).hostname.replace(/^www\./, ''); } catch {} }
    return { titulo, url, fuente, fecha: isNaN(f) ? new Date().toISOString() : f.toISOString(), imagen: foto, vivo: true };
  }).filter(x => x.titulo && x.url);
}
const RX_TEMA = /pobreza|mesa de equidad|milagro social|prosperidad social|desigualdad|renta ciudadana/i;
// Solo Colombia: medios colombianos, dominios .co o títulos que hablen de Colombia
const MEDIOS_CO = /el tiempo|el espectador|semana|portafolio|la rep[uú]blica|el colombiano|el heraldo|el universal|el pa[ií]s cali|caracol|rcn|la fm|blu radio|w radio|valora|cambio|pulzo|kienyke|las2orillas|minuto30|minuto60|telemedell[ií]n|teleantioquia|teleca[rr]ibe|publimetro colombia|el nuevo siglo|vanguardia liberal|la opini[oó]n.*c[uú]cuta|el meridiano|chica ?noticias|hoy diario del magdalena|colombia\.com|presidencia|prosperidad social|dane|dnp|la silla vac[ií]a|la patria|el informador.*santa marta|el nuevo d[ií]a \(colombia\)|diario del sur|bogota\.gov|alcald[ií]a de medell[ií]n|gobernaci[oó]n de antioquia|canal campotv|agroverdad|revistametro|ifm ?noticias|hsb noticias|estrella digital colombia|bloomberg l[ií]nea colombia|infobae colombia|ayudas 10|mi bolsillo|el resaltador|la cheverona|zona cero|semana rural|contexto ganadero|el pilón|diario del huila|la naci[oó]n neiva|q'?hubo|digame|diario del cauca|enfoque teve|el olfato|alerta (bogot|caribe|paisa)|tropicana|la voz de yopal|el diario \(pereira\)/i;
const TITULO_CO = /\b(?:colombia|colombian|dane\b|prosperidad social|renta ciudadana|mesa de equidad|milagro social|de la espriella|antioquia|bogot[aá]|medell[ií]n|caucasia|bajo cauca|ibagu[eé]|pereira|manizales|armenia\b|villavicencio|neiva|pasto\b|popay[aá]n|quibd[oó]|riohacha|valledupar|sincelejo|sucre\b|chocó|choc[oó]|la guajira|barranquilla|cartagena|monter[ií]a|cali\b|bucaramanga|c[uú]cuta|santa marta|magdalena|cesar\b|bol[ií]var|nari[nñ]o|cauca\b|huila\b|tolima\b|boyac[aá]|cundinamarca|santander|antioque|caquet[aá]|putumayo|amazonas|urab[aá])/i;
const NO_CO = /argentin|m[eé]xic|per[uú]\b|chile|venezuel|ecuador|espa[nñ]a|vietnam|honduras|guatemala|panam[aá]|el papa|le[oó]n xiv|mar del plata|rep[uú]blica dominicana|puerto rico|\.ar\b|\.mx\b|\.pe\b|\.cl\b|\.es\b/i;
function esColombia(it) {
  let host = '';
  try { host = new URL(it.url).hostname; } catch {}
  const txt = `${it.titulo} ${it.fuente}`;
  if (NO_CO.test(txt) || NO_CO.test(host)) return false;
  if (/\.co$|\.gov\.co$|\.com\.co$|\.org\.co$|\.edu\.co$/.test(host)) return true;
  if (/\/colombia\//i.test(it.url)) return true;
  return MEDIOS_CO.test(it.fuente) || TITULO_CO.test(it.titulo);
}

async function buscarEnVivo(q) {
  const qq = q ? (RX_TEMA.test(q) ? `${q} Colombia` : `pobreza ${q} Colombia`) : '"Mesa de Equidad" OR "Milagro Social" OR "pobreza monetaria"';
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(qq + ' when:7d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(q ? qq : 'Mesa de Equidad pobreza')}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  const res = await Promise.allSettled([traerProxy(g).then(x => parsearRSS(x, false)), traerProxy(b).then(x => parsearRSS(x, true))]);
  const out = res.flatMap(r => r.status === 'fulfilled' ? r.value : []);
  return out.filter(x => esColombia(x) && (q || RX_TEMA.test(x.titulo)));
}
const claveT = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').slice(0, 80);
function mezclar(...listas) {
  const m = new Map();
  for (const l of listas) for (const it of l) {
    const k = claveT(it.titulo);
    const prev = m.get(k);
    if (!prev) m.set(k, it); else if (!prev.imagen && it.imagen) prev.imagen = it.imagen;
  }
  return [...m.values()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

/* ---------- Pintar ---------- */
function tarjeta(n, grande) {
  const nueva = Date.now() - new Date(n.fecha) < 6 * 3600e3;
  const etq = `<span class="tj-hace ${nueva ? 'nueva' : ''}">${nueva ? t('nueva') + ' · ' : ''}${hace(n.fecha)}</span>`;
  const foto = n.imagen
    ? `<div class="tj-foto" style="background-image:url('${esc(n.imagen)}')">${etq}</div>`
    : `<div class="tj-foto sin">${etq}${esc(n.fuente)}</div>`;
  return `<a class="tj rv ${grande ? 'grande' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener">${foto}<div class="tj-cuerpo"><span class="tj-fuente">${esc(n.fuente)}</span><h3>${esc(n.titulo)}</h3></div></a>`;
}

function pintarHero() {
  const fotos = mezclar(enVivo, D.noticias.items).filter(n => n.imagen).slice(0, 6);
  const cont = $('#heroFotos');
  if (fotos.length && cont.dataset.n !== String(fotos.length)) {
    cont.dataset.n = fotos.length;
    cont.innerHTML = fotos.map((f, i) => `<div class="${i ? '' : 'on'}" style="background-image:url('${esc(f.imagen)}')"></div>`).join('');
  }
  $('#diasMeta').textContent = diasHasta('2031-01-01T00:00:00-05:00').toLocaleString('es-CO');
  $('#diasDane').textContent = diasHasta('2027-06-15T00:00:00-05:00').toLocaleString('es-CO');
  const pct = D.mesa?.serie?.at(-1)?.pct ?? 28;
  const pos = Math.min(100, Math.max(0, (pct - 15) / 30 * 100));
  requestAnimationFrame(() => { $('#mpHoy').style.left = pos + '%'; });
}
function animarCuentas() {
  document.querySelectorAll('.cuenta').forEach(el => {
    const fin = +el.dataset.fin || 0, ini = performance.now(), dur = 1800;
    const paso = ahora => {
      const p = Math.min(1, (ahora - ini) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(fin * e).toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}
let rotador;
function rotarHero() {
  clearInterval(rotador);
  rotador = setInterval(() => {
    const fs = [...document.querySelectorAll('#heroFotos div')];
    if (fs.length < 2) return;
    const i = fs.findIndex(f => f.classList.contains('on'));
    fs[i].classList.remove('on'); fs[(i + 1) % fs.length].classList.add('on');
  }, 6000);
}
function pintarCinta() {
  const items = mezclar(enVivo, D.noticias.items).slice(0, 14);
  const html = items.map(n => `<a href="${esc(n.url)}" target="_blank" rel="noopener"><b>${esc(n.fuente)}</b>${esc(n.titulo)}</a>`).join('');
  $('#cinta').innerHTML = html + html;
}
function pintarHoy() {
  const todas = mezclar(enVivo, D.noticias.items);
  let lista = todas.filter(n => diaCO(n.fecha) === hoyCO());
  let pre = '';
  if (lista.length < 3) { pre = `<p class="intro" style="grid-column:1/-1;margin:0">${t('hoy_ultimas')}</p>`; lista = todas.slice(0, 7); }
  $('#hoyFecha').textContent = fechaLarga(Date.now(), true);
  $('#hoyLista').innerHTML = pre + lista.slice(0, 9).map((n, i) => tarjeta(n, i === 0)).join('');
  revelar();
}

function pintarMesa() {
  const m = D.mesa; if (!m) return;
  $('#hechos').innerHTML = m.hechos.map(h => { const [a, b] = h[LANG] || h.es; return `<div class="hecho rv"><h3>${esc(a)}</h3><p>${esc(b)}</p></div>`; }).join('');
  $('#datos').innerHTML = m.datos.map(d => `<div class="dato rv"><b>${esc(d.num)}</b><span>${esc(d[LANG] || d.es)}</span><small>${esc(d.fuente)}</small></div>`).join('');
  $('#compromisos').innerHTML = m.compromisos.map(c => { const [a, b] = c[LANG] || c.es; return `<div class="comp ${c.estado} rv"><span class="luz"></span><div><h3>${esc(a)}</h3><p>${esc(b)}${c.url ? ` <a href="${esc(c.url)}" target="_blank" rel="noopener">${t('fuente')}</a>` : ''}</p></div><span class="est">${t('est_' + c.estado)}</span></div>`; }).join('');
  const max = Math.max(...m.departamentos.map(d => d.pct));
  $('#ranking').innerHTML = m.departamentos.map(d => `<div class="rk rv ${d.nuestro ? 'nuestro' : ''} ${d.nac ? 'nac' : ''}"><span>${esc(d.n)}${d.nuestro ? `<small>${t('rk_nuestro')}</small>` : ''}</span><div class="rk-b"><i data-w="${d.pct / max * 100}"></i></div><b>${d.pct.toLocaleString('es-CO')} %</b></div>`).join('');
  $('#oficiales').innerHTML = m.fuentes.map(f => `<a class="lf" href="${esc(f.url)}" target="_blank" rel="noopener"><time>DANE · Gob.</time><div><b>${esc(f.t)}</b></div></a>`).join('');
  pintarGrafica();
}

function pintarGrafica() {
  const m = D.mesa; if (!m) return;
  const W = 760, H = 320, L = 44, R = 20, Tp = 24, B = 36;
  const anios = [...m.serie.map(s => s.anio), 2026, 2027, 2028, 2029, 2030];
  const x = a => L + (a - anios[0]) / (2030 - anios[0]) * (W - L - R);
  const y = p => Tp + (45 - p) / (45 - 15) * (H - Tp - B);
  const pts = m.serie.map(s => `${x(s.anio)},${y(s.pct)}`).join(' ');
  const ult = m.serie.at(-1);
  let g = '';
  for (const p of [15, 20, 25, 30, 35, 40, 45]) g += `<line class="eje" x1="${L}" x2="${W - R}" y1="${y(p)}" y2="${y(p)}"/><text x="${L - 8}" y="${y(p) + 4}" text-anchor="end">${p}%</text>`;
  for (const a of anios) g += `<text x="${x(a)}" y="${H - 12}" text-anchor="middle">${a}</text>`;
  g += `<polyline class="meta-lin" points="${x(ult.anio)},${y(ult.pct)} ${x(2030)},${y(m.meta.meta_pct)}"/>`;
  g += `<polyline class="lin" points="${pts}"/>`;
  g += m.serie.map(s => `<circle class="pto" cx="${x(s.anio)}" cy="${y(s.pct)}" r="5"/><text class="val" x="${x(s.anio)}" y="${y(s.pct) - 12}" text-anchor="middle">${s.pct.toLocaleString('es-CO')}</text>`).join('');
  g += `<circle class="pto meta" cx="${x(2030)}" cy="${y(m.meta.meta_pct)}" r="7"/><text class="val" x="${x(2030) - 4}" y="${y(m.meta.meta_pct) - 14}" text-anchor="end">${t('meta')} ${m.meta.meta_pct} %</text>`;
  $('#graf').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pobreza monetaria 2018-2025 y meta 2030">${g}</svg>`;
}

function pintarCalc() {
  const L = D.mesa?.lineas_2025; if (!L) return;
  const ing = +($('#cIng').value || '').replace(/\D/g, '');
  const per = Math.max(1, +$('#cPer').value || 1);
  const res = $('#calcRes');
  if (!ing) { res.className = 'calc-res'; res.innerHTML = `<h3>${t('cal_vacio')}</h3><p>${t('cal_vacio_d')}</p><p class="mini" style="margin-top:14px">${t('cal_lin', { p: pesos(L.pobreza_persona), e: pesos(L.extrema_persona) })}</p>`; return; }
  const pp = ing / per;
  let k, cls;
  if (pp < L.extrema_persona) { k = 'cal_ext'; cls = 'pobre'; }
  else if (pp < L.pobreza_persona) { k = 'cal_pob'; cls = 'pobre'; }
  else if (pp < L.vulnerable_hasta) { k = 'cal_vul'; cls = 'vuln'; }
  else { k = 'cal_ok'; cls = 'ok'; }
  const tope = L.vulnerable_hasta * 1.15;
  const falta = pp < L.pobreza_persona ? `<p style="margin-top:8px"><b>${t('cal_falta', { v: pesos((L.pobreza_persona - pp) * per) })}</b></p>` : '';
  res.className = 'calc-res ' + cls;
  res.innerHTML = `<h3>${t(k)}</h3><p>${t('cal_porp', { v: pesos(pp) })}</p>
    <div class="barra-ing"><i style="width:${Math.min(100, pp / tope * 100)}%"></i><em style="left:${L.extrema_persona / tope * 100}%"></em><em style="left:${L.pobreza_persona / tope * 100}%"></em></div>
    <p>${t(k + '_d')}</p>${falta}<p class="mini" style="margin-top:14px">${t('cal_lin', { p: pesos(L.pobreza_persona), e: pesos(L.extrema_persona) })}</p>`;
}

const RX_BAJO = /bajo cauca|caucasia|el bagre|zaragoza|nech[ií]|taraz[aá]|c[aá]ceres/i;
function pintarBajo() {
  const menc = mezclar(enVivo, D.noticias.items).filter(n => RX_BAJO.test(n.titulo));
  $('#bajoCuenta').textContent = menc.length;
  const sem = $('#semBajo');
  sem.textContent = menc.length ? t('sem_con') : t('sem_sin');
  sem.className = 'semaforo' + (menc.length ? ' verde' : '');
  $('#bajoTexto').textContent = menc.length ? t('bajo_si') : t('bajo_txt');
}

function pintarVideos() {
  const vs = D.videos.items || [];
  const rep = $('#reproductor');
  if (!vs.length) {
    rep.innerHTML = `<div style="text-align:center;padding:20px"><p>${t('sin_videos')}</p><p style="margin-top:12px"><a class="btn-prim" style="display:inline-block;text-decoration:none" href="https://www.youtube.com/results?search_query=Mesa+de+Equidad+pobreza+Colombia&sp=CAI%253D" target="_blank" rel="noopener">${t('buscar_yt')}</a></p></div>`;
    $('#listaVideos').innerHTML = ''; return;
  }
  const poner = id => {
    rep.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen title="video"></iframe>`;
    document.querySelectorAll('.vd').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  };
  $('#listaVideos').innerHTML = vs.slice(0, 12).map(v => `<button class="vd rv" data-id="${esc(v.id)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt=""><div>${esc(v.titulo)}<small>${esc(v.canal)} · ${esc(v.hace)}</small></div></button>`).join('');
  document.querySelectorAll('.vd').forEach(b => b.onclick = () => { poner(b.dataset.id); rep.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  poner(vs[0].id);
}

const PREG = {
  es: [
    ['¿Con qué plata?', 'La meta no trae presupuesto público todavía. Vamos a buscar cuánto se asigna en 2027 y de qué rubros sale.'],
    ['¿Empleo o subsidios?', 'El Gobierno dice que la apuesta es empleo y emprendimiento, no solo asistencialismo. Seguiremos qué pasa con Renta Ciudadana y los demás programas.'],
    ['¿Dónde primero?', 'Chocó, La Guajira y Sucre pasan del 50 %. Córdoba está en 44 %. Vigilamos si las metas regionales empiezan por donde más duele.'],
    ['¿Qué hace cada ministerio?', 'El Presidente pidió a cada ministro decir qué, dónde, con cuánto y cuándo. Publicaremos esos planes apenas salgan.'],
    ['¿Y el campo?', 'En el campo la pobreza es 39,5 %, casi 15 puntos más que en las ciudades. Sin el campo la meta no se cumple.'],
    ['¿Qué aportan las empresas?', 'Seguiremos los acuerdos que consiga el embajador ad honorem con empresas, fundaciones y cooperación internacional.'],
    ['¿Cómo se mide?', 'Con el dato oficial del DANE, que sale una vez al año. Lo compararemos con la meta cada junio.'],
    ['¿Qué pasa con el Bajo Cauca?', 'No hay dato municipal anual de pobreza. Pedimos metas y acciones para Caucasia y la subregión.']
  ],
  en: [
    ['With what money?', 'The target has no public budget yet. We will check how much is assigned in 2027 and from which lines.'],
    ['Jobs or subsidies?', 'The government says the bet is jobs and entrepreneurship, not only handouts. We will track Renta Ciudadana and other programs.'],
    ['Where first?', 'Chocó, La Guajira and Sucre are above 50%. Córdoba is at 44%. We watch whether regional targets start where it hurts most.'],
    ['What does each ministry do?', 'The President asked every minister to say what, where, how much and when. We will publish those plans as soon as they come out.'],
    ['What about rural areas?', 'Rural poverty is 39.5%, almost 15 points above cities. Without the countryside the target will not be met.'],
    ['What do companies bring?', 'We will follow the agreements the ad honorem ambassador secures with companies, foundations and international cooperation.'],
    ['How is it measured?', 'With DANE\'s official figure, released once a year. We will compare it with the target every June.'],
    ['What about Bajo Cauca?', 'There is no yearly town-level poverty figure. We ask for targets and actions for Caucasia and the subregion.']
  ]
};
function pintarPreguntas() {
  $('#listaPreguntas').innerHTML = PREG[LANG].map(([h, p]) => `<div class="pg rv"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('');
}

/* ---------- Derecho de petición ---------- */
const ENTIDADES = [
  ['Presidencia de la República (DAPRE)', 'contacto@presidencia.gov.co'],
  ['Departamento Administrativo para la Prosperidad Social', 'servicioalciudadano@prosperidadsocial.gov.co'],
  ['Departamento Nacional de Planeación', 'servicioalciudadano@dnp.gov.co'],
  ['Ministerio del Trabajo', 'solucionesmintrabajo@mintrabajo.gov.co'],
  ['Ministerio de Hacienda y Crédito Público', 'relacionciudadano@minhacienda.gov.co'],
  ['Departamento Administrativo Nacional de Estadística (DANE)', 'contacto@dane.gov.co'],
  ['Contraloría General de la República (para su conocimiento)', 'cgr@contraloria.gov.co']
];
const ASUNTO = 'Derecho de petición — plan, presupuesto y metas de la Mesa de Equidad para el Milagro Social';
function textoPeticion() {
  const f = Object.fromEntries(new FormData($('#formPet')));
  const fecha = new Intl.DateTimeFormat('es-CO', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  return `${f.ciudad || '[Ciudad]'}, ${fecha}

Señores
${ENTIDADES.map(e => e[0]).join('\n')}

Asunto: ${ASUNTO}

Yo, ${f.nombre || '[Nombre completo]'}, identificado(a) con cédula de ciudadanía No. ${f.cc || '[Cédula]'}, en ejercicio del derecho fundamental de petición (artículo 23 de la Constitución Política y Ley 1755 de 2015) y del derecho de acceso a la información pública (Ley 1712 de 2014), respetuosamente solicito, en lo que corresponda a cada entidad:

1. Copia del decreto, resolución o acto administrativo que crea o reglamenta la Mesa de Equidad para el Milagro Social, instalada el 26 de noviembre de 2026, con la lista de sus integrantes, su secretaría técnica y la frecuencia de sus sesiones.
2. El documento técnico que soporta la meta de reducir la pobreza monetaria del 28 % al 20 % en 2030 y sacar de esa condición a cerca de 3,6 millones de personas, incluida la trayectoria anual esperada 2026-2030.
3. El plan de acción de cada ministerio y entidad del orden nacional para esa meta: acciones, municipios y departamentos donde se ejecutarán, recursos asignados, responsables y fecha en que se esperan los primeros resultados.
4. El presupuesto total destinado a la meta para 2027 y para el cuatrienio, discriminado por entidad, programa y fuente de financiación.
5. Las metas desagregadas por departamento y, si existen, por municipio, en especial para Antioquia, Córdoba y Sucre.
6. Las acciones previstas para la subregión del Bajo Cauca antioqueño (Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá y Nechí) y si existe o se construirá una medición de pobreza para esos municipios.
7. Qué pasará con los programas de transferencias vigentes (entre ellos Renta Ciudadana, Colombia Mayor y Devolución del IVA) dentro de la estrategia, y cómo se combinarán con las acciones de empleo, emprendimiento y formación para el trabajo.
8. Las funciones, el acto de designación y el alcance del embajador ad honorem del Milagro Social, y la lista de empresas, fundaciones u organismos de cooperación que hayan suscrito acuerdos, con su objeto y su valor.
9. Los indicadores, la periodicidad y el mecanismo público con el que el Gobierno informará el avance de la meta a la ciudadanía.
10. Al DANE: el calendario de publicación de las cifras de pobreza monetaria de 2026 y si se contempla publicar resultados para subregiones o municipios.

Si alguna de estas solicitudes no es de su competencia, solicito darle traslado a la entidad competente dentro del término previsto en el artículo 21 de la Ley 1755 de 2015 e informarme de ello.

Recibiré respuesta en el correo electrónico ${f.correo || '[correo]'}${f.tel ? ' y en el celular ' + f.tel : ''}.

Atentamente,

${f.nombre || '[Nombre completo]'}
C.C. ${f.cc || '[Cédula]'}
${f.ciudad || '[Ciudad]'}`;
}
function pintarPeticion() {
  $('#destinos').innerHTML = ENTIDADES.map(([n, c]) => `<li>${esc(n)} — <span>${esc(c)}</span></li>`).join('');
  $('#petTexto').textContent = textoPeticion();
}

/* ---------- Todas las noticias ---------- */
let cuantas = 20;
function pintarTodas() {
  const todas = mezclar(enVivo, D.noticias.items);
  $('#todas').innerHTML = todas.slice(0, cuantas).map(n => `<a class="lf" href="${esc(n.url)}" target="_blank" rel="noopener"><time>${fechaLarga(n.fecha)}</time><div><span>${esc(n.fuente)}</span><b>${esc(n.titulo)}</b></div></a>`).join('');
  $('#btnMas').style.display = todas.length > cuantas ? '' : 'none';
  const h = D.noticias.actualizado;
  $('#robotHora').textContent = h ? t('robot', { h: fechaLarga(h, true) }) : '';
}

/* ---------- Animaciones al bajar ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('ya');
  e.target.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w + '%');
  io.unobserve(e.target);
}), { threshold: .12 }) : null;
function revelar() {
  document.querySelectorAll('.rv:not(.ya)').forEach(el => {
    if (io) io.observe(el);
    else { el.classList.add('ya'); el.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w + '%'); }
  });
}

function pintarTodo() {
  aplicarIdioma(); pintarHero(); pintarCinta(); pintarHoy(); pintarMesa(); pintarCalc();
  pintarBajo(); pintarVideos(); pintarPreguntas(); pintarPeticion(); pintarTodas(); revelar();
}

async function vivo(q) {
  const est = $('#estadoBusq');
  est.textContent = t('busc_cargando');
  try {
    const r = await buscarEnVivo(q);
    if (!r.length) throw new Error('vacio');
    enVivo = mezclar(enVivo, r);
    est.textContent = t('busc_ok', { n: r.length });
    if (q) { $('#hoyLista').innerHTML = mezclar(r).slice(0, 12).map((n, i) => tarjeta(n, i === 0)).join(''); revelar(); }
    else { pintarHoy(); pintarCinta(); pintarHero(); pintarBajo(); pintarTodas(); }
  } catch { est.textContent = t('busc_nada'); }
}

async function actualizar() {
  const b = $('#btnActualizar');
  b.classList.add('cargando');
  await cargarTodo();
  pintarTodo(); animarCuentas();
  await vivo($('#q').value.trim());
  b.classList.remove('cargando');
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  aplicarIdioma();
  await cargarTodo();
  pintarTodo(); animarCuentas(); rotarHero();
  vivo('');  // búsqueda en vivo al abrir

  $('#btnActualizar').onclick = actualizar;
  $('#btnLang').onclick = () => { LANG = LANG === 'es' ? 'en' : 'es'; try { localStorage.setItem('ep_lang', LANG); } catch {} pintarTodo(); };
  $('#btnBuscar').onclick = () => vivo($('#q').value.trim());
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter') vivo($('#q').value.trim()); });
  $('#cIng').addEventListener('input', e => {
    const n = e.target.value.replace(/\D/g, '');
    e.target.value = n ? (+n).toLocaleString('es-CO') : '';
    pintarCalc();
  });
  $('#cPer').addEventListener('input', pintarCalc);
  $('#btnMas').onclick = () => { cuantas += 20; pintarTodas(); };
  $('#formPet').addEventListener('input', () => $('#petTexto').textContent = textoPeticion());
  $('#formPet').addEventListener('submit', e => {
    e.preventDefault();
    const to = ENTIDADES.map(x => x[1]).join(',');
    location.href = `mailto:${to}?subject=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`;
  });
  $('#btnGmail').onclick = () => {
    if (!$('#formPet').reportValidity()) return;
    const to = ENTIDADES.map(x => x[1]).join(',');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`, '_blank');
  };
  $('#btnCopiar').onclick = async () => {
    try { await navigator.clipboard.writeText(textoPeticion()); $('#btnCopiar').textContent = t('copiado'); setTimeout(() => $('#btnCopiar').textContent = t('pe_copiar'), 2000); } catch {}
  };
  $('#btnCompartir').onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(t('compartir_txt') + ' ' + URL_APP)}`, '_blank');

  setInterval(actualizar, 10 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') actualizar(); });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});

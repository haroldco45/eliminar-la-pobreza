// Robot de videos reales de YouTube para Eliminar la Pobreza al Día
import { readFile, writeFile } from 'node:fs/promises';

const ARCHIVO = 'data/videos.json';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const CONSULTAS = ['Mesa de Equidad Milagro Social', 'De la Espriella pobreza 2030', 'pobreza monetaria Colombia DANE', 'Mesa de Equidad Prosperidad Social'];
const RELEVANTE = /pobreza|equidad|milagro social|prosperidad social|renta ciudadana|sisb[eé]n/i;
// Solo Colombia y el tema: tiene que nombrar al Gobierno, la Mesa o Colombia
const COLOMBIA = /colombia|colombian|espriella|abelardo|mesa de equidad|milagro social|prosperidad social|\bdane\b|renta ciudadana|sisb[eé]n|el tiempo|caracol|rcn|semana|blu radio|la fm|noticias uno|cambio|telemedell|teleantioquia|canal 1/i;

function buscarRenderers(nodo, out) {
  if (!nodo || typeof nodo !== 'object') return;
  if (nodo.videoRenderer) out.push(nodo.videoRenderer);
  for (const v of Object.values(nodo)) buscarRenderers(v, out);
}

async function main() {
  let previo = { items: [] };
  try { previo = JSON.parse(await readFile(ARCHIVO, 'utf8')); } catch {}
  const mapa = new Map(previo.items.map(v => [v.id, v]));
  for (const q of CONSULTAS) {
    try {
      const r = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=CAI%253D`, { headers: { 'user-agent': UA, 'accept-language': 'es-CO,es;q=0.9' }, signal: AbortSignal.timeout(15000) });
      const html = await r.text();
      const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
      if (!m) { console.log('sin ytInitialData', q); continue; }
      const lista = []; buscarRenderers(JSON.parse(m[1]), lista);
      for (const v of lista) {
        const titulo = (v.title?.runs?.map(x => x.text).join('') || '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
        const canal = v.ownerText?.runs?.[0]?.text || '';
        if (!v.videoId || !RELEVANTE.test(titulo) || !COLOMBIA.test(`${titulo} ${canal}`)) continue;
        const hace = v.publishedTimeText?.simpleText || '';
        if (!mapa.has(v.videoId)) mapa.set(v.videoId, {
          id: v.videoId, titulo,
          canal: v.ownerText?.runs?.[0]?.text || '',
          hace, duracion: v.lengthText?.simpleText || '',
          visto: new Date().toISOString()
        });
      }
    } catch (e) { console.log('fallo', q, e.message); }
  }
  const VIEJO = /\b(19|20[01]\d|202[0-4])\b/;           // títulos con años viejos
  // Recientes: horas, días, semanas o hasta 6 meses ("hace 2 a" = años, "hace 5 m" = meses)
  const RECIENTE = h => {
    if (!h || /\b\d+\s*(a|años?|years?)\b/i.test(h)) return false;
    const m = h.match(/(\d+)\s*(m|mes|meses|months?)\b/i);
    return !m || +m[1] <= 6;
  };
  const PRIORIDAD = /mesa de equidad|milagro social|espriella|abelardo|3,6 millones/i;
  const items = [...mapa.values()]
    .filter(v => RELEVANTE.test(v.titulo) && COLOMBIA.test(`${v.titulo} ${v.canal}`) && !VIEJO.test(v.titulo) && RECIENTE(v.hace))
    .sort((a, b) => (PRIORIDAD.test(b.titulo) - PRIORIDAD.test(a.titulo)) || (new Date(b.visto) - new Date(a.visto))).slice(0, 30);
  await writeFile(ARCHIVO, JSON.stringify({ actualizado: new Date().toISOString(), items }, null, 1));
  console.log('videos:', items.length);
}
main().catch(e => { console.error(e); process.exit(1); });

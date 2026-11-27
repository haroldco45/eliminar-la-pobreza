# Eliminar la Pobreza al Día

App ciudadana (PWA) de **Vibras Positivas HM** para seguir la **Mesa de Equidad para el Milagro Social** (instalada el 26 nov 2026) y la meta del Gobierno: bajar la pobreza monetaria del 28 % al 20 % en 2030 (cerca de 3,6 millones de personas).

- `data/mesa.json` — meta, cifras DANE, departamentos, qué es la Mesa y el **semáforo de compromisos** (se edita a mano: `pendiente` → `en-curso` → `cumplido`, con `url` de la fuente).
- `data/noticias.json`, `data/videos.json` — los llena el robot.
- `.github/workflows/robot.yml` — robot cada 30 min: noticias, fotos reales (og:image), videos de YouTube y la imagen de vista previa `portada.jpg`.
- Calculadora "¿Mi hogar cuenta como pobre?" con las líneas DANE 2025. Derecho de petición a 7 entidades de una vez. Español e inglés.

Publicada en Netlify: https://eliminar-la-pobreza.netlify.app

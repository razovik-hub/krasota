import { defineConfig } from 'astro/config';

// Один исходник — несколько сайтов.
//   BASE_NAME=krasota    → хаб со ссылками на три варианта (репо razovik-hub/krasota)
//   BASE_NAME=krasota-a  → самостоятельный сайт варианта A (репо razovik-hub/krasota-a)
//   ...и так же -b, -c
// Локально base=/ и собирается всё сразу: /, /a/, /b/, /c/.
// ⚠️ Имена репозиториев рабочие. Когда будет финальное название продукта —
// победивший вариант переезжает в репо с нормальным именем, здесь меняется дефолт.
const isGhPages = process.env.DEPLOY === 'ghpages';
const baseName = process.env.BASE_NAME || 'krasota';

export default defineConfig({
  site: isGhPages ? 'https://razovik-hub.github.io' : 'http://localhost:4321',
  base: isGhPages ? `/${baseName}` : '/',
  server: { port: 4321, host: true },
});

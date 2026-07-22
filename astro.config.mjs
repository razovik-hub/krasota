import { defineConfig } from 'astro/config';

// GitHub Pages (env DEPLOY=ghpages): site=razovik-hub.github.io, base=/krasota
// Локально: base=/
// ⚠️ `krasota` — рабочее имя репозитория. Когда будет финальное название продукта,
// меняется здесь + в .github/workflows/deploy.yml не нужно (base берётся отсюда).
const isGhPages = process.env.DEPLOY === 'ghpages';

export default defineConfig({
  site: isGhPages ? 'https://razovik-hub.github.io' : 'http://localhost:4321',
  base: isGhPages ? '/krasota' : '/',
  server: { port: 4321, host: true },
});

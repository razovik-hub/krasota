// Нормализует путь к ассету под все таргеты:
//  - локально: base=/
//  - GitHub Pages: base=/krasota-<id>
//  - Vercel (ASSET_HOST задан): абсолютный URL — статика (фото) раздаётся
//    с GitHub Pages хаба, чтобы не таскать бинарники в каждый деплой
export const asset = (p: string) => {
  const host = import.meta.env.ASSET_HOST;
  const clean = p.replace(/^\//, '');
  if (host) return `${String(host).replace(/\/$/, '')}/${clean}`;
  const b = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${b}/${clean}`;
};

// ⚠️ в значении поля — это заглушка, а не путь и не текст. Такие поля не рендерим как данные.
export const isTodo = (v?: string) => !v || v.trim().startsWith('⚠️');

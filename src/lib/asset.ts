// Нормализует путь под оба таргета: локально base=/, на GitHub Pages base=/krasota
export const asset = (p: string) => {
  const b = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${b}/${p.replace(/^\//, '')}`;
};

// ⚠️ в значении поля — это заглушка, а не путь и не текст. Такие поля не рендерим как данные.
export const isTodo = (v?: string) => !v || v.trim().startsWith('⚠️');

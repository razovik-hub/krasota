import { getCollection, getEntry } from 'astro:content';

// Единый загрузчик контента. Все три визуальных направления читают ОДНИ И ТЕ ЖЕ .md —
// отличается только подача. Меняем текст в одном месте — меняется во всех вариантах.
export async function loadSite() {
  const [hero, problem, audience, blocksIntro, expertsIntro, format, tariffsIntro, cta] =
    await Promise.all([
      getEntry('page', 'hero'),
      getEntry('page', 'problem'),
      getEntry('page', 'audience'),
      getEntry('page', 'blocks-intro'),
      getEntry('page', 'experts-intro'),
      getEntry('page', 'format'),
      getEntry('page', 'tariffs-intro'),
      getEntry('page', 'cta'),
    ]);

  const blocks = (await getCollection('blocks')).sort((a, b) => a.data.order - b.data.order);
  const experts = (await getCollection('experts')).sort((a, b) => a.data.order - b.data.order);
  const tariffs = (await getCollection('tariffs')).sort((a, b) => a.data.order - b.data.order);

  const blocksRendered = await Promise.all(
    blocks.map(async (b) => ({ data: b.data, Body: (await b.render()).Content }))
  );
  const expertsRendered = await Promise.all(
    experts.map(async (e) => ({ data: e.data, Body: (await e.render()).Content }))
  );

  return {
    hero: hero.data,
    problem: { data: problem.data, Body: (await problem.render()).Content },
    audience: { data: audience.data, Body: (await audience.render()).Content },
    blocksIntro: blocksIntro.data,
    expertsIntro: expertsIntro.data,
    format: format.data,
    tariffsIntro: tariffsIntro.data,
    cta: cta.data,
    blocks: blocksRendered,
    experts: expertsRendered,
    tariffs: tariffs.map((t) => t.data),
  };
}

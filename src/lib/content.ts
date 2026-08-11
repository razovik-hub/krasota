import { getCollection, getEntry } from 'astro:content';

// Единый загрузчик контента. Все три визуальных направления читают ОДНИ И ТЕ ЖЕ .md —
// отличается только подача. Меняем текст в одном месте — меняется во всех вариантах.
export async function loadSite() {
  const [hero, problem, audience, partsIntro, extras, expertsIntro, format, tariffsIntro, cta] =
    await Promise.all([
      getEntry('page', 'hero'),
      getEntry('page', 'problem'),
      getEntry('page', 'audience'),
      getEntry('page', 'parts-intro'),
      getEntry('page', 'extras'),
      getEntry('page', 'experts-intro'),
      getEntry('page', 'format'),
      getEntry('page', 'tariffs-intro'),
      getEntry('page', 'cta'),
    ]);

  const parts = (await getCollection('parts')).sort((a, b) => a.data.order - b.data.order);
  const experts = (await getCollection('experts')).sort((a, b) => a.data.order - b.data.order);
  const tariffs = (await getCollection('tariffs')).sort((a, b) => a.data.order - b.data.order);

  const partsRendered = await Promise.all(
    parts.map(async (p) => ({ data: p.data, Body: (await p.render()).Content }))
  );
  const expertsRendered = await Promise.all(
    experts.map(async (e) => ({ data: e.data, Body: (await e.render()).Content }))
  );

  const lectureCount = parts.reduce((n, p) => n + p.data.lectures.length, 0);

  return {
    hero: hero.data,
    problem: { data: problem.data, Body: (await problem.render()).Content },
    audience: { data: audience.data, Body: (await audience.render()).Content },
    partsIntro: partsIntro.data,
    extras: extras.data,
    expertsIntro: expertsIntro.data,
    format: format.data,
    tariffsIntro: tariffsIntro.data,
    cta: cta.data,
    parts: partsRendered,
    lectureCount,
    experts: expertsRendered,
    tariffs: tariffs.map((t) => t.data),
  };
}

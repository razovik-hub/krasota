// Собирает три САМОСТОЯТЕЛЬНЫХ сайта — по одному на визуальное направление.
// Каждый со своим base (/krasota-a, /krasota-b, /krasota-c), своим index.html
// и без служебной обвязки: для Марины это должен быть законченный сайт, а не демо.
//
// Контент у всех трёх один и тот же — src/content/*.md. Правка текста = правка в одном месте.
//
//   node scripts/build-variants.mjs        собрать в out/{a,b,c}
//   node scripts/build-variants.mjs --push собрать и выложить в razovik-hub/krasota-{a,b,c}

import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const VARIANTS = [
  { id: 'a', component: 'A', name: 'Клиника' },
  { id: 'b', component: 'B', name: 'Глянец' },
  { id: 'c', component: 'C', name: 'Тактильный нюд' },
];

const INDEX = 'src/pages/index.astro';
const push = process.argv.includes('--push');
const run = (cmd, args, env) =>
  execFileSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } });

// index.astro в репозитории — это хаб. На время сборки варианта подменяем его
// на страницу этого варианта, после — возвращаем как было (в том числе при падении).
const hub = readFileSync(INDEX, 'utf8');

try {
  for (const v of VARIANTS) {
    console.log(`\n── ${v.id.toUpperCase()} · ${v.name} ─────────────────`);
    writeFileSync(
      INDEX,
      `---\nimport Variant from '../variants/${v.component}.astro';\n---\n<Variant />\n`
    );
    run('npx', ['astro', 'build'], { DEPLOY: 'ghpages', BASE_NAME: `krasota-${v.id}` });

    const out = `out/${v.id}`;
    rmSync(out, { recursive: true, force: true });
    mkdirSync(out, { recursive: true });
    cpSync('dist', out, { recursive: true });

    // В самостоятельном сайте страницы-дубли /a/, /b/, /c/ не нужны
    for (const dead of VARIANTS) rmSync(`${out}/${dead.id}`, { recursive: true, force: true });

    // Без .nojekyll GitHub Pages выбросит каталог _astro — он начинается с подчёркивания
    writeFileSync(`${out}/.nojekyll`, '');
  }
} finally {
  writeFileSync(INDEX, hub);
}

if (!push) {
  console.log('\nГотово: out/a, out/b, out/c. Выложить — с флагом --push');
  process.exit(0);
}

for (const v of VARIANTS) {
  const repo = `razovik-hub/krasota-${v.id}`;
  const out = `out/${v.id}`;
  console.log(`\n── выкладываю ${repo} ─────────────────`);
  const git = (...args) => run('git', ['-C', out, ...args]);

  rmSync(`${out}/.git`, { recursive: true, force: true });
  git('init', '-q', '-b', 'main');
  git('add', '-A');
  git(
    '-c', 'user.name=Sergey Vasilyev',
    '-c', 'user.email=razovik@gmail.com',
    'commit', '-q', '-m', `Сборка сайта: вариант ${v.id.toUpperCase()} «${v.name}»`
  );
  git('remote', 'add', 'origin', `https://github.com/${repo}.git`);
  git('push', '-q', '-f', 'origin', 'main');
}

console.log('\nВыложено:');
for (const v of VARIANTS) console.log(`  https://razovik-hub.github.io/krasota-${v.id}/`);

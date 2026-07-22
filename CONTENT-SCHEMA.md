# Схема контента

Четыре коллекции. Из этого файла один в один пишется `src/content/config.ts`, когда развернём Astro.

## `page` — синглтоны страницы

Один файл = одна секция. Все поля опциональны, каждый файл берёт нужное.

| файл | что это |
|---|---|
| `hero.md` | обложка. `altTitles` — варианты заголовка на выбор, на сайт не идут |
| `problem.md` | «вы уже всё это пробовали» — боль, тело файла = список |
| `audience.md` | для кого, тело файла = список |
| `blocks-intro.md` | шапка секции с программой |
| `experts-intro.md` | шапка секции с экспертами |
| `format.md` | ⚠️ формат и даты, весь файл — заглушка |
| `tariffs-intro.md` | шапка секции с тарифами |
| `cta.md` | финальный блок с кнопкой |

Поля: `eyebrow`, `title`, `subtitle`, `titleMain`, `titleAccent`, `titleTail`, `badge`, `ctaPrimary`, `ctaSecondary`, `button`, `note`, `trust[]`, `stats[{value,label}]`, `items[{label,value}]`, `altTitles[]`.

## `blocks` — программа, 6 файлов

```yaml
order: number      # порядок, 1–6
title: string      # «Кожа»
tag: string        # короткая подпись: «Тон · плотность · поры»
outcome: string    # что участница получает на выходе — обязательно, это суть продукта
```

Тело — 2 абзаца описания.

## `experts` — несколько, не синглтон

Главное отличие от «Алхимии молодости», где эксперт был один.

```yaml
order: number
lead: boolean          # true только у Марины — ведущий эксперт, карточка крупнее
name: string
badge: string          # «Ведущий эксперт» / «Приглашённый эксперт»
role: string           # специальности через ·
blocks: string         # какие блоки ведёт
photo: string          # путь к фото в /public
credentials: string[]  # пилюли с регалиями
```

Тело — биография.

## `tariffs`

```yaml
order: number
name: string
price: string
badge?: string    # «Популярный» — выделенная карточка
limit?: string    # «только N мест» — дефицит
features: string[]
cta: string
```

## Правила

- Контент **строго здесь**, не в `.astro` и не в CSS.
- ⚠️ в значении поля — это заглушка, а не текст. Такой файл **нельзя публиковать**, пока Сергей не подтвердит данные.
- Комментарии в frontmatter (`# ...`) YAML игнорирует — ими помечены заглушки.

# Blog Receply — kontrakt wpisów

Wpisy dopisuje agent `receply-marketing` przez pull requesty. Strony bloga
generuje `scripts/build-blog.mjs` (uruchamiany w `npm run build` po `vite build`)
jako statyczny HTML: `dist/blog/`, `dist/blog/<slug>/`, `dist/blog/rss.xml`,
`dist/sitemap.xml` i linia `Sitemap:` w `dist/robots.txt`.

Adresy: lista `https://receply.com/blog/`, wpis `https://receply.com/blog/<slug>/`.

## Plik

- `content/blog/<slug>.md` — nazwa pliku = slug.
- Slug: `^[a-z0-9]+(-[a-z0-9]+)*$` (małe litery, cyfry, pojedyncze myślniki,
  bez polskich znaków), np. `ile-kosztuje-nieodebrany-telefon`.
- Ten plik (`README.md`) jest pomijany.

## Frontmatter

Proste pary `klucz: "wartość"` między liniami `---`, wartości w cudzysłowach
(cudzysłów w treści: `\"`).

```markdown
---
title: "Ile kosztuje nieodebrany telefon w salonie fryzjerskim?"
seo_title: "Ile kosztuje nieodebrany telefon? | Receply"
description: "Policzyliśmy, ile traci mały salon, gdy nie odbiera telefonów w trakcie pracy. Proste wyliczenie, tabela i trzy sposoby, by przestać tracić klientów."
date: "2026-11-03"
author: "Zespół Receply"
minutes: "6"
image: ""
---
```

| Pole | Wymagane | Zasada (pilnuje build) |
|---|---|---|
| `title` | tak | H1 wpisu, maks. 80 znaków |
| `seo_title` | tak | `<title>`, maks. 60 znaków, kończy się na ` \| Receply` |
| `description` | tak | meta description, 120–160 znaków (pokazywany też jako lead) |
| `date` | tak | `RRRR-MM-DD`, data publikacji |
| `author` | tak | np. `"Zespół Receply"`, maks. 80 znaków |
| `minutes` | tak | czas czytania, liczba całkowita 1–60 (`"6"` lub `6`) |
| `image` | nie | `"/blog/plik.jpg"` (plik w `public/blog/`) albo `""`; jpg, png, webp, avif, gif, svg |

Znaki liczone są jako znaki Unicode (polskie litery = 1 znak). Nieznane pola
dają ostrzeżenie i są ignorowane.

## Treść

Markdown (GFM): `##` i `###` śródtytuły, listy, **pogrubienia**, tabele,
cytaty, linki. Bez `#` (H1 to `title`) i bez `<script>`, `<iframe>`, `<style>`,
`<form>`. Śródtytuły `##`/`###` dostają automatyczne `id` (np. `#ile-telefonow-ucieka`).

### Linki wewnętrzne (sprawdzane w buildzie)

- inny wpis: `/blog/<slug>/` — z ukośnikiem na końcu; wpis musi istnieć
  i nie może mieć późniejszej daty niż wpis linkujący,
- lista bloga: `/blog/`,
- sekcja landingu: `/#<id>` — tylko z listy poniżej,
- plik z `public/` (np. `/blog/wykres.png`).

Kotwice landingu (z `src/components/sections`, build czyta je automatycznie):

| Kotwica | Sekcja |
|---|---|
| `/#problem` | Problem — nieodebrane telefony |
| `/#kalkulator` | Kalkulator strat |
| `/#demo` | Posłuchaj — przykładowe rozmowy |
| `/#funkcje` | Funkcje |
| `/#dla-kogo` | Dla kogo (branże) |
| `/#jak-to-dziala` | Wdrożenie krok po kroku |
| `/#cennik` | Cennik i wczesny dostęp |
| `/#faq` | FAQ |
| `/#cta` | Umów bezpłatną rozmowę (główne CTA) |

## Zasada przyszłej daty

Wpis z `date` późniejszą niż dzisiejsza data (strefa Europe/Warsaw) **nie jest
publikowany** — build go pomija (lista, strona wpisu, RSS, sitemap). Można więc
scalić PR wcześniej. Wpis pojawi się przy pierwszym buildzie w dniu publikacji
lub później, więc strona potrzebuje codziennego przebudowania (np. Netlify build
hook wywoływany przez cron).

W deploy preview Netlify (`CONTEXT=deploy-preview` / `branch-deploy`) albo z
`BLOG_INCLUDE_FUTURE=1` zaplanowane wpisy są widoczne z plakietką
„Zaplanowany” i `noindex` — do przeglądu PR. `BLOG_TODAY=RRRR-MM-DD` nadpisuje
dzisiejszą datę (testy).

## Walidacja

```bash
npm run blog:check
```

Sama walidacja, bez builda: wypisuje błędy po polsku i kończy się kodem 1, gdy
cokolwiek łamie kontrakt; przy sukcesie listuje wpisy opublikowane
i zaplanowane oraz dostępne kotwice. `npm run build` wykonuje tę samą walidację
i przerywa się przy błędzie.

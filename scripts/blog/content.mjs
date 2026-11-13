// Wczytywanie i walidacja wpisów bloga (content/blog/<slug>.md).
// Kontrakt opisany w content/blog/README.md — agent receply-marketing
// opiera się na nim, więc zmiany tutaj = zmiana kontraktu.
import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';

export const SITE = 'https://receply.pl';
export const CONTACT_EMAIL = 'kontakt@receply.pl';
// Spółka prowadząca Receply (stopka). Kopia w src/lib/site.ts; pełne dane także w content/legal.
export const COMPANY = {
  name: 'GETFORCE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
  address: 'ul. Dzięcieliny 12/3, 04-709 Warszawa',
  nip: '9522184038',
  krs: '0000739712',
};
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const REQUIRED = ['title', 'seo_title', 'description', 'date', 'author', 'minutes'];
export const OPTIONAL = ['image'];
export const LIMITS = {
  titleMax: 80,
  seoTitleMax: 60,
  seoTitleSuffix: ' | Receply',
  descriptionMin: 120,
  descriptionMax: 160,
  authorMax: 80,
  minutesMin: 1,
  minutesMax: 60,
};
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

const len = (s) => [...s].length;

/** Dzisiejsza data w strefie Europe/Warsaw (RRRR-MM-DD); BLOG_TODAY nadpisuje (testy). */
export function today() {
  const forced = process.env.BLOG_TODAY;
  if (forced) {
    if (!isValidDate(forced)) throw new Error(`BLOG_TODAY="${forced}" nie jest datą RRRR-MM-DD.`);
    return forced;
  }
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export function isValidDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Kotwice sekcji landingu: <Section id="..."> / <section id="..."> w src/components/sections. */
export function landingAnchors(root) {
  const dir = path.join(root, 'src/components/sections');
  const ids = new Set();
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.tsx')) continue;
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of src.matchAll(/<[Ss]ection\b[^>]*?\bid="([a-z0-9-]+)"/g)) ids.add(m[1]);
  }
  return [...ids];
}

/** Prosty parser frontmattera: pary `klucz: "wartość"` między liniami `---`. */
export function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (!m) return { error: 'brak frontmattera — plik musi zaczynać się od linii "---" i mieć zamykające "---".' };
  const data = {};
  const errors = [];
  m[1].split('\n').forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    const kv = line.match(/^([a-z_]+):[ \t]*(.*?)[ \t]*$/);
    if (!kv) {
      errors.push(`frontmatter, linia ${i + 2}: nie rozumiem "${line}" (oczekiwane: klucz: "wartość").`);
      return;
    }
    const [, key, rawVal] = kv;
    let val = rawVal;
    if (val.startsWith('"')) {
      try {
        val = JSON.parse(val);
        if (typeof val !== 'string') throw new Error();
      } catch {
        errors.push(`frontmatter, pole "${key}": niepoprawny cudzysłów w ${rawVal} (cudzysłów w treści zapisz jako \\").`);
        return;
      }
    } else if (val.startsWith("'")) {
      if (!val.endsWith("'") || val.length < 2) {
        errors.push(`frontmatter, pole "${key}": niezamknięty apostrof w ${rawVal}.`);
        return;
      }
      val = val.slice(1, -1).replace(/''/g, "'");
    }
    if (key in data) errors.push(`frontmatter: pole "${key}" występuje więcej niż raz.`);
    data[key] = val;
  });
  return { data, errors, body: text.slice(m[0].length) };
}

export function slugifyHeading(text) {
  const map = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
  return (
    text
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (c) => map[c])
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&[a-z]+;|&#\d+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'sekcja'
  );
}

/** Renderuje Markdown do HTML i zbiera linki/obrazy/nagłówki do walidacji. */
export function renderMarkdown(body) {
  const links = [];
  const images = [];
  const h1 = [];
  const rawHtml = [];
  const usedIds = new Map();
  const marked = new Marked({
    gfm: true,
    walkTokens(t) {
      if (t.type === 'link') links.push(t.href);
      if (t.type === 'image') images.push(t.href);
      if (t.type === 'heading' && t.depth === 1) h1.push(t.text);
      if (t.type === 'html') rawHtml.push(t.text);
    },
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth > 3) return `<h${depth}>${inner}</h${depth}>\n`;
        let id = slugifyHeading(inner);
        const n = usedIds.get(id) || 0;
        usedIds.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  // Tabele owinięte w .table-wrap — poziome przewijanie na wąskich ekranach.
  const html = marked
    .parse(body)
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
  return { html, links, images, h1, rawHtml };
}

/**
 * Wczytuje wszystkie wpisy, waliduje kontrakt.
 * Zwraca { posts, errors, warnings } — posts posortowane od najnowszych.
 */
export function loadPosts(root) {
  const dir = path.join(root, 'content/blog');
  const errors = [];
  const warnings = [];
  const posts = [];
  if (!fs.existsSync(dir)) return { posts, errors, warnings };
  const anchors = new Set(landingAnchors(root));
  const publicDir = path.join(root, 'public');

  for (const file of fs.readdirSync(dir).sort()) {
    const rel = `content/blog/${file}`;
    const full = path.join(dir, file);
    if (file.startsWith('.') || fs.statSync(full).isDirectory()) continue;
    if (file === 'README.md') continue;
    if (!file.endsWith('.md')) {
      warnings.push(`${rel}: pomijam — to nie jest plik .md (obrazy trzymaj w public/blog/).`);
      continue;
    }
    const slug = file.slice(0, -3);
    const err = (msg) => errors.push(`${rel}: ${msg}`);
    if (!SLUG_RE.test(slug)) {
      err(`nazwa pliku "${slug}" nie jest poprawnym slugiem — tylko małe litery a–z, cyfry i pojedyncze myślniki (bez polskich znaków, spacji, "--" i myślnika na końcu), np. "jak-nie-tracic-klientow".`);
      continue;
    }
    const fm = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    if (fm.error) {
      err(fm.error);
      continue;
    }
    fm.errors.forEach(err);
    const d = fm.data;

    for (const k of REQUIRED) {
      if (d[k] === undefined) err(`brak wymaganego pola "${k}" we frontmatterze.`);
      else if (!String(d[k]).trim()) err(`pole "${k}" jest puste.`);
    }
    for (const k of Object.keys(d)) {
      if (!REQUIRED.includes(k) && !OPTIONAL.includes(k)) warnings.push(`${rel}: nieznane pole "${k}" — zostanie zignorowane.`);
    }

    const title = (d.title || '').trim();
    const seoTitle = (d.seo_title || '').trim();
    const description = (d.description || '').trim();
    const author = (d.author || '').trim();
    const date = (d.date || '').trim();

    if (title && len(title) > LIMITS.titleMax) err(`"title" ma ${len(title)} znaków (limit ${LIMITS.titleMax}).`);
    if (seoTitle) {
      if (len(seoTitle) > LIMITS.seoTitleMax) err(`"seo_title" ma ${len(seoTitle)} znaków (limit ${LIMITS.seoTitleMax}, razem z " | Receply").`);
      if (!seoTitle.endsWith(LIMITS.seoTitleSuffix)) err(`"seo_title" musi kończyć się na "${LIMITS.seoTitleSuffix}" (jest: "${seoTitle}").`);
    }
    if (description) {
      const n = len(description);
      if (n < LIMITS.descriptionMin || n > LIMITS.descriptionMax)
        err(`"description" ma ${n} znaków (wymagane ${LIMITS.descriptionMin}–${LIMITS.descriptionMax}).`);
    }
    if (author && len(author) > LIMITS.authorMax) err(`"author" ma ${len(author)} znaków (limit ${LIMITS.authorMax}).`);
    if (date && !isValidDate(date)) err(`"date" = "${date}" nie jest poprawną datą RRRR-MM-DD.`);

    let minutes = NaN;
    if (d.minutes !== undefined && String(d.minutes).trim()) {
      const ms = String(d.minutes).trim();
      minutes = /^\d+$/.test(ms) ? Number(ms) : NaN;
      if (!Number.isInteger(minutes) || minutes < LIMITS.minutesMin || minutes > LIMITS.minutesMax)
        err(`"minutes" = "${ms}" — oczekiwana liczba całkowita ${LIMITS.minutesMin}–${LIMITS.minutesMax}.`);
    }

    let image = '';
    if (d.image !== undefined && d.image.trim()) {
      image = d.image.trim().replace(/^\/?public(?=\/)/, '');
      if (!image.startsWith('/')) image = `/${image}`;
      if (!image.startsWith('/blog/')) err(`"image" = "${d.image}" — obraz musi leżeć w public/blog/ (wpisz "/blog/plik.jpg").`);
      else if (!IMAGE_EXT.test(image)) err(`"image" = "${d.image}" — dozwolone rozszerzenia: jpg, jpeg, png, webp, avif, gif, svg.`);
      else if (!fs.existsSync(path.join(publicDir, image))) err(`"image": plik public${image} nie istnieje.`);
    }

    if (!fm.body.trim()) err('treść wpisu jest pusta.');
    const md = renderMarkdown(fm.body);
    if (md.h1.length) err(`treść zawiera nagłówek H1 ("# ${md.h1[0]}") — H1 to "title"; w treści używaj ## i ###.`);
    for (const h of md.rawHtml) {
      if (/<\s*(script|iframe|style|object|embed|form)\b/i.test(h)) err(`treść zawiera niedozwolony HTML (${h.trim().slice(0, 40)}…) — używaj samego Markdownu.`);
    }

    posts.push({
      slug,
      file: rel,
      title,
      seoTitle,
      description,
      date,
      author,
      minutes,
      image,
      html: md.html,
      links: md.links,
      images: md.images,
    });
  }

  // Linki wewnętrzne — po wczytaniu wszystkich wpisów.
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  for (const p of posts) {
    const err = (msg) => errors.push(`${p.file}: ${msg}`);
    for (const rawHref of p.links) {
      let href = rawHref.trim();
      if (/^(javascript|data|vbscript):/i.test(href)) {
        err(`niedozwolony link "${rawHref}".`);
        continue;
      }
      if (/^https?:\/\/(www\.)?receply\.com(?=\/|$)/i.test(href)) {
        href = href.replace(/^https?:\/\/(www\.)?receply\.com/i, '') || '/';
        warnings.push(`${p.file}: link "${rawHref}" — dla linków wewnętrznych używaj ścieżek względnych ("${href}").`);
      }
      if (!href.startsWith('/') || href.startsWith('//')) continue; // zewnętrzne, mailto:, #kotwice
      const [pathPart, hash] = href.split('#');
      if (pathPart === '/' || pathPart === '') {
        if (hash !== undefined && hash !== '' && !anchors.has(hash))
          err(`link "${rawHref}" — landing nie ma sekcji #${hash}. Dostępne: ${[...anchors].map((a) => '/#' + a).join(', ')}.`);
        continue;
      }
      if (pathPart === '/blog/' || pathPart === '/blog/rss.xml') continue;
      const bm = pathPart.match(/^\/blog\/([^/]+)(\/?)$/);
      if (bm && !IMAGE_EXT.test(bm[1]) && !bm[1].includes('.')) {
        const target = bySlug.get(bm[1]);
        if (!bm[2]) err(`link "${rawHref}" — dodaj ukośnik na końcu: "/blog/${bm[1]}/".`);
        if (!target) err(`link "${rawHref}" — nie ma wpisu content/blog/${bm[1]}.md.`);
        else if (p.date && target.date && target.date > p.date)
          err(`link "${rawHref}" — wpis docelowy ma późniejszą datę publikacji (${target.date}) niż ten (${p.date}), więc link byłby martwy do tego czasu.`);
        continue;
      }
      if (!fs.existsSync(path.join(publicDir, pathPart))) err(`link wewnętrzny "${rawHref}" prowadzi donikąd (dozwolone: /, /#sekcja, /blog/, /blog/<slug>/ albo plik z public/).`);
    }
    for (const src of p.images) {
      if (src.startsWith('/') && !src.startsWith('//') && !fs.existsSync(path.join(publicDir, src.split(/[?#]/)[0])))
        err(`obraz "${src}" — plik public${src} nie istnieje.`);
    }
  }

  posts.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
  return { posts, errors, warnings };
}

/**
 * Strony prawne z content/legal/*.md: frontmatter title, seo_title, description, updated.
 * draft: "true" = szkic, poza produkcją (w podglądzie wdrożenia z noindex).
 */
export function loadLegal(root) {
  const dir = path.join(root, 'content/legal');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8'));
      const missing = ['title', 'seo_title', 'description', 'updated'].filter((k) => !fm.data?.[k]);
      if (fm.error || fm.errors?.length || missing.length) {
        throw new Error(`content/legal/${f}: ${fm.error ?? [...fm.errors, ...missing.map((k) => `brak pola "${k}"`)].join('; ')}`);
      }
      return {
        slug: f.replace(/\.md$/, ''),
        title: fm.data.title,
        seoTitle: fm.data.seo_title,
        description: fm.data.description,
        updated: fm.data.updated,
        draft: fm.data.draft === 'true',
        html: renderMarkdown(fm.body).html,
      };
    });
}

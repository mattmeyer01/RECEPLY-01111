#!/usr/bin/env node
// Blog Receply: generuje statyczne strony z content/blog/*.md do dist/
// (po `vite build`), żeby Google widział treść bez JS.
//
//   node scripts/build-blog.mjs           → walidacja + build (npm run build)
//   node scripts/build-blog.mjs --check   → sama walidacja   (npm run blog:check)
//
// Zmienne środowiskowe:
//   BLOG_TODAY=RRRR-MM-DD    nadpisuje „dziś” (testy zasady przyszłej daty)
//   BLOG_INCLUDE_FUTURE=1    pokazuje wpisy z przyszłą datą (noindex, poza sitemap/RSS);
//                            włączane automatycznie w deploy preview Netlify (CONTEXT)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadLegal, loadPosts, today as getToday, landingAnchors, SITE } from './blog/content.mjs';
import { renderIndex, renderLegal, renderPost, renderRss, renderSitemap } from './blog/templates.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const CHECK_ONLY = process.argv.includes('--check');
const PREVIEW =
  process.env.BLOG_INCLUDE_FUTURE === '1' || ['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT || '');

// Polska odmiana: 1 wpis, 2–4 wpisy, 5+ wpisów (12–14 → wpisów).
const pl = (n, one, few, many) =>
  n === 1 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? few : many;

const today = getToday();
const { posts, errors, warnings } = loadPosts(ROOT);

for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length) {
  console.error(`\n✖ Blog: ${errors.length} ${pl(errors.length, 'błąd', 'błędy', 'błędów')} w content/blog — popraw i uruchom ponownie (npm run blog:check):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error('');
  process.exit(1);
}

const published = posts.filter((p) => p.date <= today);
const scheduled = posts.filter((p) => p.date > today);
const visible = PREVIEW ? posts : published;

if (CHECK_ONLY) {
  console.log(`✓ Blog: ${posts.length} ${pl(posts.length, 'wpis zgodny', 'wpisy zgodne', 'wpisów zgodnych')} z kontraktem (dziś: ${today}, strefa Europe/Warsaw).`);
  for (const p of published) console.log(`  opublikowany  ${p.date}  /blog/${p.slug}/`);
  for (const p of scheduled) console.log(`  zaplanowany   ${p.date}  /blog/${p.slug}/  (pominięty w buildzie do tej daty)`);
  console.log(`  Kotwice landingu: ${landingAnchors(ROOT).map((a) => '/#' + a).join(', ')}`);
  process.exit(0);
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('✖ Blog: brak dist/index.html — uruchom najpierw `vite build` (npm run build).');
  process.exit(1);
}

// CSS z hashem w adresie — zmiana stylów omija cache przeglądarki.
const blogDir = path.join(DIST, 'blog');
fs.rmSync(blogDir, { recursive: true, force: true });
fs.mkdirSync(blogDir, { recursive: true });
const css = fs.readFileSync(path.join(ROOT, 'scripts/blog/blog.css'), 'utf8');
const cssHash = crypto.createHash('sha256').update(css).digest('hex').slice(0, 10);
fs.writeFileSync(path.join(blogDir, 'blog.css'), css);
const cssHref = `/blog/blog.css?v=${cssHash}`;

fs.writeFileSync(path.join(blogDir, 'index.html'), renderIndex({ posts: visible, today, cssHref, noindex: false }));
for (const post of visible) {
  const related = visible.filter((p) => p.slug !== post.slug).slice(0, 3);
  const dir = path.join(blogDir, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPost({ post, related, today, cssHref, noindex: post.date > today }));
}

// Strony prawne: szkice tylko w podglądzie wdrożenia, z noindex.
const legal = loadLegal(ROOT);
for (const page of legal) {
  if (page.draft && !PREVIEW) continue;
  const dir = path.join(DIST, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderLegal({ page, today, cssHref, noindex: page.draft }));
}

// RSS i sitemap tylko z opublikowanych treści (także w deploy preview).
fs.writeFileSync(path.join(blogDir, 'rss.xml'), renderRss(published));
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), renderSitemap(published, legal.filter((p) => !p.draft)));

const robotsPath = path.join(DIST, 'robots.txt');
let robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : 'User-agent: *\nAllow: /\n';
const sitemapLine = `Sitemap: ${SITE}/sitemap.xml`;
if (!robots.includes(sitemapLine)) robots = `${robots.replace(/\s*$/, '\n')}\n${sitemapLine}\n`;
fs.writeFileSync(robotsPath, robots);

console.log(
  `✓ Blog: ${published.length} ${pl(published.length, 'opublikowany', 'opublikowane', 'opublikowanych')}, ${scheduled.length} ${pl(scheduled.length, 'zaplanowany', 'zaplanowane', 'zaplanowanych')}${PREVIEW && scheduled.length ? ' (widoczne w podglądzie, noindex)' : ''} → dist/blog/, dist/blog/rss.xml, dist/sitemap.xml, dist/robots.txt`
);

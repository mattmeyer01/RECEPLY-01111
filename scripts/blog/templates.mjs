// Szablony HTML bloga — czysty HTML + jeden plik CSS, bez bundla Reacta.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPANY, CONTACT_EMAIL, loadLegal, SITE } from './content.mjs';

// Linki do stron prawnych pojawiają się w stopce (jak na landingu: przy ©), gdy strona przestaje być szkicem.
const LEGAL_LINKS = loadLegal(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'))
  .filter((p) => !p.draft)
  .map((p) => [`/${p.slug}/`, p.title]);

const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function plDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const DEFAULT_IMAGE = `${SITE}/og.jpg`;
const PUBLISHER = {
  '@type': 'Organization',
  name: 'Receply',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/icon.svg` },
};

function head({ title, description, canonical, ogType, image, extra = '', cssHref, noindex }) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:site_name" content="Receply">
<meta property="og:locale" content="pl_PL">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<meta name="theme-color" content="#f5f4f1">
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="alternate" type="application/rss+xml" title="Blog Receply" href="${SITE}/blog/rss.xml">
<link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-latin-ext-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="${cssHref}">
<script defer data-domain="receply.com" src="https://plausible.io/js/script.js"></script>
<script>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="mailto:"]');if(a)plausible('Kontakt e-mail')});</script>
${extra}
</head>`;
}

function nav(current) {
  return `<a class="skip" href="#tresc">Przejdź do treści</a>
<div class="nav-wrap">
  <nav class="nav" aria-label="Główna">
    <a class="nav-logo" href="/"><img src="/logo.svg" alt="Receply — strona główna" width="104" height="23"></a>
    <div class="nav-right">
      <a class="nav-link" href="/blog/"${current === 'blog' ? ' aria-current="page"' : ''}>Blog</a>
      <a class="btn" href="/#cta"><span class="btn-long">Umów bezpłatną rozmowę</span><span class="btn-short">Umów rozmowę</span></a>
    </div>
  </nav>
</div>`;
}

function footer(year) {
  const links = [
    ['/', 'Strona główna'],
    ['/blog/', 'Blog'],
    ['/#demo', 'Posłuchaj'],
    ['/#funkcje', 'Funkcje'],
    ['/#cennik', 'Cennik'],
    ['/#faq', 'FAQ'],
    ['/blog/rss.xml', 'RSS'],
  ];
  const legal = LEGAL_LINKS.map(([h, l]) => ` · <a href="${h}">${l}</a>`).join('');
  return `<footer>
  <div class="frame">
    <div class="foot">
      <div class="foot-brand">
        <img src="/logo.svg" alt="Receply" width="100" height="22">
        <p>AI recepcjonista dla małych firm w Polsce. Odbiera telefony i odpisuje na Instagramie, gdy Ty pracujesz.</p>
      </div>
      <div>
        <div class="foot-label">Strona</div>
        <ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
      </div>
      <div>
        <div class="foot-label">Kontakt</div>
        <a class="foot-mail" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        <p class="foot-note">Odpowiadamy tego samego dnia.</p>
        <address class="foot-company">Receply prowadzi ${esc(COMPANY.name)}<br>${esc(COMPANY.address)}<br>NIP ${COMPANY.nip} · KRS ${COMPANY.krs}</address>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${year} Receply · receply.pl${legal}</span>
      <span>Produkt we wczesnym dostępie.</span>
    </div>
  </div>
</footer>`;
}

function cta() {
  return `<aside class="cta" aria-labelledby="cta-title">
  <h2 id="cta-title">Każdy telefon odebrany. Każda wizyta w kalendarzu.</h2>
  <p>Receply odbiera połączenia i odpisuje na wiadomości, gdy Ty pracujesz. Sprawdź na 15-minutowej rozmowie, jak zadziała w Twojej firmie.</p>
  <a class="btn" href="/#cta">Umów bezpłatną rozmowę →</a>
</aside>`;
}

function postList(posts, today, headingTag = 'h2') {
  return `<ul class="posts">
${posts
  .map(
    (p) => `  <li class="post-row"><a href="/blog/${p.slug}/">
    <time class="post-date" datetime="${p.date}">${plDate(p.date)}</time>
    <div>
      <${headingTag}>${esc(p.title)}${p.date > today ? `<span class="badge">ZAPLANOWANY</span>` : ''}</${headingTag}>
      <p>${esc(p.description)}</p>
      <div class="post-meta">${p.minutes} min czytania</div>
    </div>
    <span class="post-arrow" aria-hidden="true">→</span>
  </a></li>`
  )
  .join('\n')}
</ul>`;
}

export function renderIndex({ posts, today, cssHref, noindex }) {
  const canonical = `${SITE}/blog/`;
  const title = 'Blog — porady dla małych firm | Receply';
  const description =
    'Praktyczne porady dla małych firm: jak odbierać każdy telefon, szybciej odpowiadać klientom na Instagramie i zapełniać kalendarz wizyt bez dodatkowego etatu.';
  const ld = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Receply',
    url: canonical,
    inLanguage: 'pl-PL',
    description,
    publisher: PUBLISHER,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE}/blog/${p.slug}/`,
      datePublished: p.date,
    })),
  });
  const body = posts.length
    ? postList(posts, today)
    : `<div class="empty">
      <div class="empty-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <h2>Wkrótce pierwsze wpisy</h2>
      <p>Piszemy o tym, jak małe firmy mogą odbierać każdy telefon, odpowiadać klientom szybciej i nie tracić rezerwacji. Zajrzyj tu niedługo.</p>
      <a class="btn" href="/">Poznaj Receply</a>
    </div>`;
  return `${head({ title, description, canonical, ogType: 'website', image: DEFAULT_IMAGE, extra: ld, cssHref, noindex })}
<body>
${nav('blog')}
<main id="tresc">
  <div class="frame">
    <header class="hero">
      <span class="eyebrow">Blog</span>
      <h1>Blog Receply. <span>Mniej straconych telefonów.</span></h1>
      <p>Praktycznie o tym, jak mała firma może odbierać każde połączenie, odpisywać szybciej i zapełniać kalendarz — bez zatrudniania recepcji.</p>
    </header>
    ${body}
    ${cta()}
  </div>
</main>
${footer(today.slice(0, 4))}
</body>
</html>
`;
}

export function renderPost({ post: p, related, today, cssHref, noindex }) {
  const canonical = `${SITE}/blog/${p.slug}/`;
  const image = p.image ? `${SITE}${p.image}` : DEFAULT_IMAGE;
  const isOrg = /receply/i.test(p.author);
  const ld = jsonLd([
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      image,
      datePublished: p.date,
      dateModified: p.date,
      inLanguage: 'pl-PL',
      timeRequired: `PT${p.minutes}M`,
      author: isOrg ? { '@type': 'Organization', name: p.author, url: `${SITE}/` } : { '@type': 'Person', name: p.author },
      publisher: PUBLISHER,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      url: canonical,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Receply', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
        { '@type': 'ListItem', position: 3, name: p.title, item: canonical },
      ],
    },
  ]);
  const extra = `<meta property="article:published_time" content="${p.date}">
${ld}`;
  return `${head({ title: p.seoTitle, description: p.description, canonical, ogType: 'article', image, extra, cssHref, noindex })}
<body>
${nav('post')}
<main id="tresc">
  <div class="frame">
    <article>
      <header class="article-head">
        <a class="back" href="/blog/">← Wszystkie wpisy</a><br>
        <span class="eyebrow"><a href="/blog/">Blog</a>&nbsp;·&nbsp;<time datetime="${p.date}">${plDate(p.date)}</time>${
          p.date > today ? '<span class="badge">ZAPLANOWANY</span>' : ''
        }</span>
        <h1>${esc(p.title)}</h1>
        <p class="lead">${esc(p.description)}</p>
        <div class="byline"><span><strong>${esc(p.author)}</strong></span><span>${p.minutes} min czytania</span></div>
      </header>
      ${p.image ? `<figure class="cover"><img src="${esc(p.image)}" alt="" loading="eager"></figure>` : ''}
      <div class="prose">
${p.html}
      </div>
    </article>
    ${cta()}
    ${
      related.length
        ? `<section class="related" aria-labelledby="related-title">
      <h2 id="related-title">Czytaj też</h2>
      ${postList(related, today, 'h3')}
    </section>`
        : ''
    }
  </div>
</main>
${footer(today.slice(0, 4))}
</body>
</html>
`;
}

// /usuwanie-danych?kod=…: tu Meta odsyła po żądaniu usunięcia danych (receply-app, funkcja
// meta-data-deletion). Bez kodu w adresie ramka zostaje ukryta. Kod trafia na stronę jako tekst
// i tylko w formacie identyfikatora, więc link nie podłoży stronie cudzej treści.
function deletionConfirmation() {
  return `<div class="notice" id="potwierdzenie" role="status" hidden>
        <span class="notice-label">Żądanie wykonane</span>
        <p class="notice-title">Odłączyliśmy konto Instagram od Receply</p>
        <p>Przetworzyliśmy Twoje żądanie usunięcia danych. Połączone konto Instagram zostało odłączone, a jego token dostępu usunięty, więc Receply nie odbiera już wiadomości z tego konta i nie może na nie odpowiadać.</p>
        <p class="notice-code">Kod żądania: <code id="kod-zadania"></code></p>
        <p class="notice-note">Zachowaj kod i podaj go, jeśli zechcesz zapytać nas o to żądanie. Jak usunąć także historię rozmów, opisujemy <a href="#historia-rozmow-i-pozostale-dane-firmy">niżej</a>.</p>
      </div>
      <script>(function () {
        var kod = new URLSearchParams(location.search).get('kod');
        if (!kod || !/^[A-Za-z0-9-]{4,64}$/.test(kod)) return;
        document.getElementById('kod-zadania').textContent = kod;
        document.getElementById('potwierdzenie').hidden = false;
      })();</script>`;
}

export function renderLegal({ page, today, cssHref, noindex }) {
  const canonical = `${SITE}/${page.slug}/`;
  return `${head({ title: page.seoTitle, description: page.description, canonical, ogType: 'website', image: DEFAULT_IMAGE, cssHref, noindex })}
<body>
${nav('legal')}
<main id="tresc">
  <div class="frame">
    <article>
      <header class="article-head">
        <h1>${esc(page.title)}</h1>
        <div class="byline"><span>Ostatnia aktualizacja: ${plDate(page.updated)}</span></div>
      </header>
      ${page.slug === 'usuwanie-danych' ? deletionConfirmation() : ''}
      <div class="prose">
${page.html}
      </div>
    </article>
  </div>
</main>
${footer(today.slice(0, 4))}
</body>
</html>
`;
}

export function renderRss(posts) {
  const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rfc822 = (iso) => new Date(`${iso}T08:00:00Z`).toUTCString();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}/</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xml(p.description)}</description>
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Receply</title>
    <link>${SITE}/blog/</link>
    <description>Porady dla małych firm: telefony, wiadomości i rezerwacje bez straconych klientów.</description>
    <language>pl</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${posts.length ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;
}

export function renderSitemap(posts, legal = []) {
  const url = (loc, lastmod) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[url(`${SITE}/`), url(`${SITE}/blog/`, posts[0]?.date), ...posts.map((p) => url(`${SITE}/blog/${p.slug}/`, p.date)), ...legal.map((p) => url(`${SITE}/${p.slug}/`, p.updated))].join('\n')}
</urlset>
`;
}

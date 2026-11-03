#!/usr/bin/env node
// Po `vite build`: wstawia wyrenderowaną treść landingu i dane strukturalne do
// dist/index.html. Dzięki temu tekst strony widzą też roboty bez JavaScriptu,
// a React po załadowaniu tylko „ożywia” gotowy HTML (src/main.tsx).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR_DIR = path.join(ROOT, 'node_modules/.cache/receply-ssr');
const INDEX = path.join(ROOT, 'dist/index.html');
const ROOT_DIV = '<div id="root"></div>';

await build({
  root: ROOT,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: SSR_DIR,
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});
const { render, structuredData } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.mjs')).href);

let html = fs.readFileSync(INDEX, 'utf8');
if (!html.includes(ROOT_DIV)) {
  console.error('✖ Prerender: nie ma pustego kontenera #root w dist/index.html.');
  process.exit(1);
}
const jsonLd = structuredData()
  .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  .join('\n');
// Funkcje zamiast tekstu: „$” w treści nie może być czytany jako wzorzec zamiany.
html = html.replace(ROOT_DIV, () => `<div id="root">${render()}</div>`).replace('</head>', () => `${jsonLd}\n</head>`);
fs.writeFileSync(INDEX, html);
fs.rmSync(SSR_DIR, { recursive: true, force: true });
console.log(`✓ Prerender: dist/index.html, ${Math.round(html.length / 1024)} KB gotowego HTML`);

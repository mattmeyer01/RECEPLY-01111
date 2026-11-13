import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

// Opublikowane strony prawne: pliki content/legal/*.md bez draft: "true". Liczone przy starcie
// Vite, żeby do paczki JS landingu trafiła lista adresów, a nie treść dokumentów
// (w `vite dev` zmiana pola draft wymaga restartu serwera).
const legalDir = path.resolve(__dirname, 'content/legal');
const legalPages = fs
  .readdirSync(legalDir)
  .filter((f) => f.endsWith('.md') && !/^draft:\s*"true"/m.test(fs.readFileSync(path.join(legalDir, f), 'utf8')))
  .map((f) => f.slice(0, -'.md'.length));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __LEGAL_PAGES__: JSON.stringify(legalPages),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

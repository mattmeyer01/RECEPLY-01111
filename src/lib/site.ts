// Adresy i kontakt w jednym miejscu. Główna domena to receply.pl.
// Blog buduje się bez Vite i ma własną kopię w scripts/blog/content.mjs.
export const SITE_URL = 'https://receply.pl';
export const CONTACT_EMAIL = 'kontakt@receply.pl';
export const APP_URL = 'https://app.receply.pl';
// Panel na danych przykładowych, bez logowania.
export const PANEL_DEMO_URL = `${APP_URL}/?demo=1`;

// Polityka prywatności pojawia się w linkach, gdy w jej pliku nie ma już draft: "true".
const policy = Object.values(
  import.meta.glob('/content/legal/polityka-prywatnosci.md', { query: '?raw', import: 'default', eager: true }),
)[0] as string;
export const PRIVACY_URL = /^draft:\s*"true"/m.test(policy) ? null : '/polityka-prywatnosci/';

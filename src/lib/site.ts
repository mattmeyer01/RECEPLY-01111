// Adresy i kontakt w jednym miejscu. Główna domena to receply.pl.
// Blog buduje się bez Vite i ma własną kopię w scripts/blog/content.mjs.
export const SITE_URL = 'https://receply.pl';
export const CONTACT_EMAIL = 'kontakt@receply.pl';
export const APP_URL = 'https://app.receply.pl';
// Panel na danych przykładowych, bez logowania.
export const PANEL_DEMO_URL = `${APP_URL}/?demo=1`;

// Spółka prowadząca Receply (stopka). Kopia w scripts/blog/content.mjs; pełne dane także w content/legal.
export const COMPANY = {
  name: 'GETFORCE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
  address: 'ul. Dzięcieliny 12/3, 04-709 Warszawa',
  nip: '9522184038',
  krs: '0000739712',
};

// Strony prawne pojawiają się w linkach, gdy w ich pliku w content/legal nie ma draft: "true"
// (listę liczy vite.config.ts).
const legalUrl = (slug: string) => (__LEGAL_PAGES__.includes(slug) ? `/${slug}/` : null);
export const PRIVACY_URL = legalUrl('polityka-prywatnosci');
export const DELETION_URL = legalUrl('usuwanie-danych');

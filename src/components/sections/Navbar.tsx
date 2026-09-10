// Nawigacja: pływający pasek-pigułka z blur (wzorzec BYQ Truebase Navigation Bar 1),
// zaadaptowany: logo rec[ply], linki sekcji, CTA jako czarna pigułka Nextwell.
import * as React from 'react';

const LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#demo', label: 'Jak wygląda' },
  { href: '#funkcje', label: 'Funkcje' },
  { href: '#kalkulator', label: 'Kalkulator' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] px-4">
      <nav className="max-w-[1060px] mx-auto rounded-[999px] bg-white/70 backdrop-blur-xl border border-ink/8 shadow-[0_8px_32px_rgba(17,17,16,0.06)] px-5 py-2.5 flex items-center justify-between max-[900px]:rounded-3xl">
        <a href="#" className="flex items-center no-underline">
          <img src="/logo.svg" alt="Receply" className="h-5 w-auto" />
        </a>

        <div className="flex items-center gap-7 max-[900px]:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/64 hover:text-ink transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="inline-flex items-center rounded-full bg-ink text-cream text-sm font-medium px-5 py-2.5 no-underline transition-colors duration-300 hover:bg-blu"
          >
            Umów bezpłatną rozmowę
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="hidden max-[900px]:flex items-center justify-center w-10 h-10 rounded-full border border-ink/16 text-ink bg-transparent cursor-pointer"
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-[900px]:block hidden max-w-[1060px] mx-auto mt-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-ink/8 p-5">
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink/88 no-underline text-[15px]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

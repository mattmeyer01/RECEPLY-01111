// Stopka w ramce strony: marka i kontakt, nawigacja po sekcjach, uczciwa
// informacja o wczesnym etapie produktu i duży, wyblakły znak Receply.
const NAV = [
  { href: '#problem', label: 'Problem' },
  { href: '#demo', label: 'Posłuchaj' },
  { href: '#funkcje', label: 'Funkcje' },
  { href: '#dla-kogo', label: 'Dla kogo' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/8">
      <div className="max-w-[1180px] mx-auto px-6 min-[1240px]:px-10 min-[1240px]:border-x border-ink/8 pt-16 pb-8 overflow-hidden">
        <div className="grid grid-cols-12 gap-10 max-[767px]:grid-cols-1">
          <div className="col-span-5 max-[767px]:col-span-1">
            <img src="/logo.svg" alt="Receply" className="h-[22px] w-auto" />
            <p className="text-[15px] text-ink/64 leading-relaxed mt-5 max-w-[340px]">
              AI recepcjonista dla małych firm w Polsce. Odbiera telefony i odpisuje na Instagramie, gdy Ty pracujesz.
            </p>
          </div>
          <div className="col-span-3 max-[767px]:col-span-1">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink/40 mb-4">Strona</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 list-none p-0 m-0">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-ink/72 no-underline hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 max-[767px]:col-span-1">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink/40 mb-4">Kontakt</div>
            <a href="mailto:kontakt@receply.com" className="text-[15px] text-ink no-underline hover:text-blu">
              kontakt@receply.com
            </a>
            <p className="text-[14px] text-ink/48 mt-2">Odpowiadamy tego samego dnia.</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap mt-14 pt-6 border-t border-ink/8 text-[13px] text-ink/48">
          <span>© 2026 Receply · receply.com</span>
          <span>Produkt we wczesnym dostępie. Rozmowy i dane na tej stronie są przykładowe.</span>
        </div>

        <img src="/logo.svg" alt="" aria-hidden className="w-full h-auto mt-12 -mb-[6%] opacity-[0.06] select-none" />
      </div>
    </footer>
  );
}

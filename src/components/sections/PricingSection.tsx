// Cennik: adaptacja BYQ Nextwell Pricing 2 — ciemna sekcja z teksturą
// (tu: gradient CSS zamiast obrazka avif), duży dwutonowy nagłówek,
// dwie kontrastowe karty: jasna (#ebeae7) i czarna z wejściem fade-up.
// Jeden płatny pakiet zgodnie z briefem; druga karta to warunki
// wczesnego dostępu, nie zmyślony drugi plan.
import { Reveal } from '@/lib/ui';

const START_FEATURES = [
  'Odbieranie połączeń telefonicznych 24/7',
  'Odpowiedzi na wiadomości i komentarze na Instagramie',
  'Umawianie wizyt w Twoim kalendarzu',
  'Baza wiedzy o Twojej firmie (cennik, godziny, FAQ)',
  'Podsumowania rozmów i powiadomienia o ważnych sprawach',
  'Wdrożenie 1:1 z zespołem Receply',
  'Brak umowy długoterminowej',
];

const EARLY_FEATURES = [
  'Cena 299 zł/mies. zablokowana na stałe',
  'Bezpośredni kontakt z zespołem produktu',
  'Realny wpływ na rozwój funkcji',
  'Rezygnacja w każdej chwili, bez kar umownych',
  'Bez prepaidów i doładowań z góry',
];

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg className="flex-none mt-1" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2.5 8.5L6.5 12.5L13.5 4.5" stroke={light ? '#f5f4f1' : '#111110'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PricingSection() {
  return (
    <section
      id="cennik"
      className="py-28 max-[767px]:py-16 text-cream"
      style={{
        background:
          'radial-gradient(90% 60% at 15% 100%, rgba(33,59,223,0.35) 0%, transparent 60%), radial-gradient(80% 55% at 90% 100%, rgba(123,229,84,0.16) 0%, transparent 60%), linear-gradient(165deg, #101012 0%, #17171a 100%)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="max-w-[700px] mx-auto text-center mb-16 max-[767px]:mb-10">
          <h2 className="font-normal text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] tracking-[-0.03em]">
            Jedna cena.{' '}
            <span className="text-cream/56">Zero kombinowania, prepaidów i ukrytych opłat.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
          {/* Karta jasna — Pakiet Start */}
          <div className="rounded-lg bg-lift text-ink p-14 max-[991px]:p-8 max-[767px]:p-6 flex flex-col justify-between gap-8 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blu text-white text-xs font-semibold px-4 py-1.5">
              Cena promocyjna dla pierwszych 20 firm
            </span>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-normal text-[2rem] leading-tight tracking-[-0.03em] m-0">Pakiet Start</h3>
                <div className="text-ink/64 mt-1">Dla małych firm, które nie chcą tracić klientów</div>
              </div>
              <div className="flex flex-col gap-3">
                {START_FEATURES.map((f) => (
                  <div key={f} className="flex gap-2.5 items-start">
                    <Check />
                    <span className="text-ink/88 text-[15px] leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8 flex-wrap max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-5">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream font-medium text-[15px] px-6 py-3 no-underline transition-colors duration-300 hover:bg-blu"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Zarezerwuj miejsce
              </a>
              <div>
                <div className="font-medium text-ink/88">
                  299 zł / <span className="text-ink/64">miesiąc</span>
                </div>
                <div className="text-sm text-ink/64 line-through">docelowo 399 zł / mies.</div>
              </div>
            </div>
          </div>

          {/* Karta ciemna — warunki wczesnego dostępu (fade-up jak w Nextwell) */}
          <Reveal>
            <div className="h-full rounded-lg bg-black text-cream p-14 max-[991px]:p-8 max-[767px]:p-6 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-normal text-[2rem] leading-tight tracking-[-0.03em] m-0">Wczesny dostęp</h3>
                  <div className="text-cream/56 mt-1">Warunki dla pierwszych klientów — bez gwiazdek</div>
                </div>
                <div className="flex flex-col gap-3">
                  {EARLY_FEATURES.map((f) => (
                    <div key={f} className="flex gap-2.5 items-start">
                      <Check light />
                      <span className="text-cream/88 text-[15px] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-8 flex-wrap max-[479px]:flex-col max-[479px]:items-start max-[479px]:gap-5">
                <a
                  href="mailto:kontakt@receply.com?subject=Receply%20—%20wczesny%20dostęp"
                  className="inline-flex items-center gap-2 rounded-full bg-cream text-ink font-medium text-[15px] px-6 py-3 no-underline transition-colors duration-300 hover:bg-blu hover:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Napisz do nas
                </a>
                <div className="text-sm text-cream/56 max-w-[220px]">
                  Liczba miejsc w cenie promocyjnej ograniczona do pierwszych 20 firm.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

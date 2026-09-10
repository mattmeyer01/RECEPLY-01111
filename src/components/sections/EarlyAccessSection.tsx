// Wczesny dostęp: adaptacja BYQ Truebase Bento 1 — asymetryczna siatka bento
// (duża karta z listą korzyści, karta statystyki z animowanym count-up,
// ciemna karta, mała karta), wejścia fade-up. Zamiast social proof (produkt
// bez klientów) — uczciwe korzyści programu early access.
import { Reveal, CountUp } from '@/lib/ui';

const PERKS = [
  'Cena promocyjna 299 zł/mies. zablokowana na stałe — także po podwyżce',
  'Bezpośredni kontakt z zespołem, który buduje produkt (nie z infolinią)',
  'Realny wpływ na rozwój funkcji — budujemy pod Twoje potrzeby',
  'Wdrożenie 1:1 z naszą pomocą od początku do końca',
];

export function EarlyAccessSection() {
  return (
    <section id="wczesny-dostep" className="py-28 max-[767px]:py-16">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="max-w-[640px] mx-auto text-center mb-14 max-[767px]:mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-grn" />
            <span className="font-mono text-xs font-medium tracking-[0.15em] uppercase text-ink/64">
              Wczesny dostęp
            </span>
          </div>
          <h2 className="font-normal text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.2] tracking-[-0.02em]">
            Dlaczego warto wejść teraz?{' '}
            <span className="text-ink/40">Receply jest na wczesnym etapie — i to jest Twoja przewaga.</span>
          </h2>
        </Reveal>

        {/* Bento (Truebase): 6 kolumn, duża karta 2x2 + kafle */}
        <div className="grid grid-cols-6 auto-rows-[minmax(150px,auto)] gap-4 max-[900px]:grid-cols-2">
          <Reveal className="col-span-3 row-span-2 max-[900px]:col-span-2">
            <div className="h-full rounded-2xl bg-white border border-ink/8 p-9 max-[767px]:p-6 flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-xl font-medium mb-5">Program wczesnego dostępu</h3>
                <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
                  {PERKS.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] text-ink/64 leading-relaxed">
                      <svg className="flex-none mt-1" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M2.5 8.5L6.5 12.5L13.5 4.5" stroke="#213bdf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#cennik"
                className="self-start inline-flex items-center gap-2 rounded-full bg-ink text-cream font-medium text-[15px] px-6 py-3 no-underline transition-colors duration-300 hover:bg-blu"
              >
                Zobacz cennik
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="col-span-3 row-span-1 max-[900px]:col-span-2">
            <div className="h-full rounded-2xl bg-blu text-white p-9 max-[767px]:p-6 flex flex-col justify-between gap-4">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-white/72">
                Miejsca w cenie promocyjnej
              </span>
              <div className="flex items-end gap-3">
                <span className="font-medium text-[3.4rem] leading-none tracking-[-0.03em]">
                  #1–<CountUp to={20} />
                </span>
                <span className="text-white/72 text-sm pb-1.5">dla pierwszych firm</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180} className="col-span-2 row-span-1 max-[900px]:col-span-1">
            <div className="h-full rounded-2xl bg-ink text-cream p-8 max-[767px]:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-cream/64">
                Cena na stałe
              </span>
              <div>
                <div className="text-2xl font-medium">299 zł/mies.</div>
                <div className="text-cream/64 text-sm mt-1">zamiast docelowych 399 zł</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260} className="col-span-1 row-span-1">
            <div className="h-full rounded-2xl bg-lift p-8 max-[767px]:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/64">Umowa</span>
              <div className="text-2xl font-medium">0<span className="text-ink/40 text-base font-normal"> zobowiązań</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

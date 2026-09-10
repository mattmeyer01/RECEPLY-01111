// FAQ: adaptacja BYQ Reforma FAQ 1 („Centered FAQ Accordion Section") —
// wycentrowany nagłówek, karty akordeonu ~42.5rem z pigułkowym plusem
// (pionowa kreska znika/obraca się przy otwarciu), max-height transition,
// wejścia fade-up nagłówka i bloku z opóźnieniem.
import * as React from 'react';
import { Reveal } from '@/lib/ui';

const FAQS = [
  {
    q: 'Czy klienci zorientują się, że rozmawiają z AI?',
    a: 'Receply mówi naturalnym głosem i prowadzi płynną rozmowę po polsku, więc rozmowa brzmi jak z dobrą recepcją. Nie ukrywamy jednak, że to asystent — jeśli klient zapyta wprost, Receply odpowiada szczerze. W praktyce klientom zależy na jednym: szybko załatwić sprawę i dostać termin. To dostają.',
  },
  {
    q: 'Ile trwa wdrożenie?',
    a: 'Zwykle kilka dni roboczych. Zaczynamy od 30-minutowej rozmowy o Twojej firmie, potem konfigurujemy Receply, wspólnie testujemy przykładowe rozmowy i dopiero wtedy startujemy na żywo. Z Twojej strony to łącznie 1–2 godziny zaangażowania.',
  },
  {
    q: 'Czy mogę zrezygnować w dowolnym momencie?',
    a: 'Tak. Nie podpisujesz umowy długoterminowej — płacisz miesiąc do miesiąca i możesz zrezygnować w każdej chwili, bez okresu wypowiedzenia i bez kar umownych. Jeśli Receply nie zarabia na siebie, nie powinieneś za niego płacić.',
  },
  {
    q: 'Co jeśli przekroczę limit rozmów w pakiecie?',
    a: 'Nic złego się nie stanie — Receply nie przestanie nagle odbierać. Jeśli Twoja firma regularnie generuje więcej rozmów, niż zakłada pakiet, po prostu się odezwiemy i wspólnie dobierzemy warunki. Żadnych automatycznych dopłat ani niespodzianek na fakturze.',
  },
];

export function FaqSection() {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <section id="faq" className="py-32 max-[767px]:py-20">
      <div className="px-6">
        <Reveal className="max-w-[680px] mx-auto mb-14 text-center max-[767px]:mb-10">
          <h2 className="font-normal text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.15] tracking-[-0.03em] m-0">
            Masz pytania?
            <br />
            Dobrze, że pytasz.
          </h2>
        </Reveal>

        <Reveal delay={150} className="w-full max-w-[680px] mx-auto flex flex-col gap-4 max-[767px]:gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-depth rounded-xl p-6 max-[767px]:p-5 cursor-pointer"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex justify-between items-center gap-6 max-[767px]:gap-4">
                  <div className="text-lg max-[767px]:text-base font-medium m-0">{faq.q}</div>
                  <div className="relative flex-none flex justify-center items-center w-12 h-10 max-[767px]:w-9 max-[767px]:h-9 rounded-full bg-ink/8">
                    <div className="absolute bg-ink rounded-[1px] w-3 h-[1.5px]" />
                    <div
                      className={`absolute bg-ink rounded-[1px] w-[1.5px] h-3 transition-all duration-300 ${
                        isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                      }`}
                    />
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <p className="text-ink/64 leading-relaxed m-0 pt-6 max-[767px]:pt-4 text-[15px]">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={250} className="text-center mt-10">
          <span className="text-ink/64 text-[15px]">
            Nie znalazłeś swojego pytania?{' '}
            <a href="mailto:kontakt@receply.com" className="text-blu underline-offset-2 hover:underline">
              kontakt@receply.com
            </a>{' '}
            — odpowiadamy tego samego dnia.
          </span>
        </Reveal>
      </div>
    </section>
  );
}

// FAQ: dwie kolumny — po lewej przyklejony nagłówek z kartą kontaktu, po
// prawej akordeon z obiekcjami z badań (robot, RODO, „co jeśli nie wie",
// wdrożenie, rezygnacja, limit). Odpowiedzi tylko z faktów ze strony.
import * as React from 'react';
import { Mail, Plus } from 'lucide-react';
import { Card, PillButton, Reveal, Section, SectionHeading } from '@/lib/ui';

const FAQS = [
  {
    q: 'Czy klienci zorientują się, że rozmawiają z AI?',
    a: 'Receply mówi naturalnym głosem i prowadzi płynną rozmowę po polsku, więc rozmowa brzmi jak z dobrą recepcją. Nie ukrywamy jednak, że to asystent — jeśli klient zapyta wprost, Receply odpowiada szczerze. W praktyce klientom zależy na jednym: szybko załatwić sprawę i dostać termin. To dostają.',
  },
  {
    q: 'Co z danymi moich klientów i RODO?',
    a: 'Dane Twoje i Twoich klientów są przetwarzane w UE, szyfrowane i nie są nikomu odsprzedawane. Umowa powierzenia przetwarzania danych jest w standardzie.',
  },
  {
    q: 'Co, jeśli Receply nie zna odpowiedzi?',
    a: 'Ważne i nietypowe sprawy Receply przekazuje bezpośrednio Tobie — dostajesz powiadomienie z podsumowaniem rozmowy, żeby oddzwonić albo odpisać. Zakres tego, co Receply załatwia samodzielnie, ustalamy razem na wdrożeniu.',
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
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid grid-cols-12 gap-x-16 gap-y-10 max-[991px]:grid-cols-1">
        <div className="col-span-5 max-[991px]:col-span-1">
          <div className="sticky top-28">
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Pytania, które słyszymy"
              muted="najczęściej."
            />
            <Reveal delay={100}>
              <Card className="p-6 mt-10 max-[991px]:mt-8">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-blu/10 text-blu flex items-center justify-center flex-none">
                    <Mail size={16} strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <div className="text-[15px] font-medium">Nie ma Twojego pytania?</div>
                    <div className="text-[13.5px] text-ink/64">Odpowiadamy tego samego dnia.</div>
                  </div>
                </div>
                <PillButton href="mailto:kontakt@receply.com" variant="ghost" className="mt-5 w-full">
                  kontakt@receply.com
                </PillButton>
              </Card>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} className="col-span-7 max-[991px]:col-span-1">
          <div className="border-t border-ink/8">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-b border-ink/8">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left text-[17px] font-medium cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blu"
                    >
                      {faq.q}
                      <span
                        className={`flex-none w-8 h-8 rounded-full border border-ink/12 flex items-center justify-center transition-[rotate,background-color,color,border-color] duration-300 ${
                          isOpen ? 'rotate-45 bg-ink text-cream border-ink' : 'text-ink'
                        }`}
                      >
                        <Plus size={15} strokeWidth={2} aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] text-ink/64 leading-relaxed pb-6 pr-14 max-[767px]:pr-0">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

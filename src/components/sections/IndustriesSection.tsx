// Dla kogo: zakładki branż zamiast marquee chipów — po wybraniu branży
// zdanie z jej codzienności, sprawy, które Receply załatwia, i przykładowa
// wymiana zdań. Odwiedzający widzi swoją firmę, a nie ogólnik.
import * as React from 'react';
import { Car, Check, Dumbbell, HeartPulse, Scissors, Sparkles, Stethoscope, Wrench, type LucideIcon } from 'lucide-react';
import { Card, DOTS, Reveal, Section, SectionHeading } from '@/lib/ui';

const INDUSTRIES: {
  id: string;
  icon: LucideIcon;
  name: string;
  pain: string;
  tasks: string[];
  chat: { from: 'klient' | 'receply'; text: string }[];
}[] = [
  {
    id: 'beauty',
    icon: Sparkles,
    name: 'Salony beauty',
    pain: 'Telefon dzwoni, kiedy masz ręce w farbie.',
    tasks: ['Rezerwacje i zmiany terminów', 'Pytania o ceny i czas zabiegów', 'Wiadomości na Instagramie po godzinach', 'Przypomnienia o wizytach'],
    chat: [
      { from: 'klient', text: 'Dzień dobry, ile trwa koloryzacja i czy macie coś w sobotę?' },
      { from: 'receply', text: 'Koloryzacja trwa około 2 godzin, cena od 250 zł. W sobotę mamy wolne o 10:00 — zapisać panią?' },
    ],
  },
  {
    id: 'barber',
    icon: Scissors,
    name: 'Barberzy',
    pain: 'Kolejka na fotelu, a telefon nie przestaje dzwonić.',
    tasks: ['Szybkie zapisy na strzyżenie i brodę', 'Wolne terminy jeszcze na dziś', 'Odwołania i przełożenia', 'Ceny usług'],
    chat: [
      { from: 'klient', text: 'Siema, macie dziś coś wolnego na brodę?' },
      { from: 'receply', text: 'Hej! Dziś o 18:30 jest wolne u Kuby. Wpisuję Cię?' },
    ],
  },
  {
    id: 'gabinety',
    icon: Stethoscope,
    name: 'Gabinety i kliniki',
    pain: 'Rejestracja kończy o 16:00, pacjenci dzwonią do 20:00.',
    tasks: ['Rejestracja na wizyty', 'Informacje o przygotowaniu do wizyty', 'Przypomnienia dla pacjentów', 'Pilne sprawy od razu do recepcji'],
    chat: [
      { from: 'klient', text: 'Chciałbym się zapisać na przegląd, najlepiej rano.' },
      { from: 'receply', text: 'Najbliższy poranny termin to wtorek 8:30. Czy mogę prosić o imię i nazwisko?' },
    ],
  },
  {
    id: 'fizjo',
    icon: HeartPulse,
    name: 'Fizjoterapia',
    pain: 'W trakcie terapii nie odbierzesz telefonu.',
    tasks: ['Zapisy na pierwszą wizytę i kontynuację', 'Ceny zabiegów i pakietów', 'Zmiany terminów', 'Przypomnienia przed wizytą'],
    chat: [
      { from: 'klient', text: 'Czy jest wolny termin na masaż sportowy w czwartek?' },
      { from: 'receply', text: 'W czwartek mamy 16:00 i 17:30. Masaż trwa 60 minut i kosztuje 180 zł. Który termin?' },
    ],
  },
  {
    id: 'silownie',
    icon: Dumbbell,
    name: 'Siłownie i trenerzy',
    pain: 'Prowadzisz trening, a ktoś pyta o karnet.',
    tasks: ['Pytania o karnety i cennik', 'Zapisy na treningi personalne', 'Godziny otwarcia i zajęć', 'Wiadomości z Instagrama'],
    chat: [
      { from: 'klient', text: 'Ile kosztuje trening personalny i kiedy macie wolne?' },
      { from: 'receply', text: 'Pojedynczy trening to 150 zł. Jutro trener ma wolne 7:00 i 19:00 — rezerwujemy?' },
    ],
  },
  {
    id: 'warsztaty',
    icon: Car,
    name: 'Warsztaty',
    pain: 'Spod auta nie odbierzesz telefonu.',
    tasks: ['Umawianie przeglądów i wymiany opon', 'Ceny usług z Twojego cennika', 'Wolne terminy na stanowisku', 'Nietypowe sprawy do mechanika'],
    chat: [
      { from: 'klient', text: 'Dzień dobry, chciałbym wymienić opony na zimowe.' },
      { from: 'receply', text: 'Mamy wolne w piątek o 8:00 i 11:00. Wymiana kół to 120 zł. Który termin pasuje?' },
    ],
  },
  {
    id: 'fachowcy',
    icon: Wrench,
    name: 'Fachowcy',
    pain: 'Na zleceniu nie odbierasz — klient dzwoni do następnego z Google.',
    tasks: ['Zgłoszenia, gdy jesteś na zleceniu', 'Adres i opis problemu od klienta', 'Umawianie terminu wizyty', 'Pilne sprawy od razu do Ciebie'],
    chat: [
      { from: 'klient', text: 'Cieknie mi kran w kuchni, kiedy ktoś może przyjechać?' },
      { from: 'receply', text: 'Mogę zapisać wizytę na jutro między 9 a 11. Proszę podać adres i krótko opisać usterkę.' },
    ],
  },
];

export function IndustriesSection() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const ind = INDUSTRIES[active];

  // Strzałki przełączają zakładki (wzorzec ARIA tabs)
  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + INDUSTRIES.length) % INDUSTRIES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="dla-kogo" tone="white" labelledBy="dla-kogo-title">
      <SectionHeading
        id="dla-kogo-title"
        eyebrow="Dla kogo"
        title="Dla firm, do których klienci dzwonią i piszą."
        muted="Receply mówi językiem Twojej branży."
      />

      <Reveal delay={80} className="mt-12 max-[767px]:mt-8">
        <div
          role="tablist"
          aria-label="Branże"
          onKeyDown={onKey}
          className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 min-[768px]:mx-0 min-[768px]:px-0 min-[768px]:flex-wrap [scrollbar-width:none]"
        >
          {INDUSTRIES.map((it, i) => {
            const Icon = it.icon;
            const selected = i === active;
            return (
              <button
                key={it.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${it.id}`}
                aria-selected={selected}
                aria-controls={`panel-${it.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex-none inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu ${
                  selected ? 'bg-ink text-cream' : 'bg-cream text-ink/72 hover:text-ink border border-ink/8'
                }`}
              >
                <Icon size={15} strokeWidth={1.75} aria-hidden />
                {it.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${ind.id}`}
          aria-labelledby={`tab-${ind.id}`}
          className="grid grid-cols-12 gap-4 mt-6 max-[991px]:grid-cols-1"
        >
          <Card key={`${ind.id}-copy`} className="col-span-5 max-[991px]:col-span-1 p-8 max-[767px]:p-6 flex flex-col animate-fade-in">
            <p className="text-[clamp(1.4rem,2.2vw,1.75rem)] leading-[1.2] font-medium tracking-[-0.025em] text-balance">
              „{ind.pain}”
            </p>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/48 mt-8 mb-4">
              Receply załatwia
            </div>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {ind.tasks.map((t) => (
                <li key={t} className="flex gap-3 text-[15px]">
                  <span className="flex-none w-5 h-5 rounded-full bg-blu/10 text-blu flex items-center justify-center mt-px">
                    <Check size={12} strokeWidth={2.5} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <div
            key={`${ind.id}-chat`}
            className="col-span-7 max-[991px]:col-span-1 rounded-[20px] bg-cream border border-ink/8 p-8 max-[767px]:p-5 flex items-center justify-center animate-fade-in"
            style={DOTS}
          >
            <div className="w-full max-w-[460px] rounded-xl bg-white border border-ink/8 shadow-[0_16px_40px_-20px_rgba(17,17,16,0.22)] p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48 mb-1">
                <span>Przykładowa rozmowa</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-grn" /> Receply
                </span>
              </div>
              {ind.chat.map((m) => (
                <div
                  key={m.text}
                  className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.from === 'receply'
                      ? 'self-end bg-blu text-white rounded-br-md'
                      : 'self-start bg-depth rounded-bl-md'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// Panel: jedyna sekcja z prawdziwymi ekranami produktu (app.receply.pl na danych
// przykładowych). Zakładki przełączają zrzuty, a przycisk otwiera działający podgląd.
// Na telefonie zrzuty z mobilnej wersji panelu, bo pełny ekran byłby nieczytelny.
import * as React from 'react';
import { CalendarDays, LayoutGrid, MessageCircle, type LucideIcon } from 'lucide-react';
import { PANEL_DEMO_URL } from '@/lib/site';
import { PillButton, Reveal, Section, SectionHeading } from '@/lib/ui';

const SCREENS: { id: string; label: string; icon: LucideIcon; desc: string; alt: string }[] = [
  {
    id: 'pulpit',
    label: 'Pulpit',
    icon: LayoutGrid,
    desc: 'Liczby z dziś, kalendarz zespołu i sprawy, które czekają na Ciebie.',
    alt: 'Pulpit panelu Receply: liczba dzisiejszych wizyt, kalendarz zespołu i sprawy do decyzji właścicielki salonu.',
  },
  {
    id: 'rozmowy',
    label: 'Rozmowy',
    icon: MessageCircle,
    desc: 'Każda rozmowa z podsumowaniem. Gdy sprawa wymaga Ciebie, przejmujesz ją jednym kliknięciem.',
    alt: 'Rozmowy w panelu Receply: lista klientów, wątek z Instagrama, podsumowanie i przycisk przejęcia rozmowy.',
  },
  {
    id: 'kalendarz',
    label: 'Kalendarz',
    icon: CalendarDays,
    desc: 'Wizyty całego zespołu, dzień albo tydzień. Od razu widać te umówione przez Receply.',
    alt: 'Kalendarz w panelu Receply: wizyty trzech osób z zespołu, nowe wizyty wyróżnione kolorem.',
  },
];

export function PanelSection() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Strzałki przełączają zakładki (wzorzec ARIA tabs)
  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + SCREENS.length) % SCREENS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="panel" labelledBy="panel-title">
      <SectionHeading
        id="panel-title"
        eyebrow="Panel"
        title="Wszystko, co załatwia Receply, masz w jednym miejscu."
        muted="Zaglądasz, kiedy chcesz."
        sub="Rozmowy z podsumowaniami, kalendarz zespołu i sprawy, które czekają na Twoją decyzję. Gdy trzeba, przejmujesz rozmowę jednym kliknięciem."
      />

      <Reveal delay={80} className="mt-12 max-[767px]:mt-8">
        <div className="flex items-center gap-x-6 gap-y-3 flex-wrap">
          <div role="tablist" aria-label="Ekrany panelu" onKeyDown={onKey} className="flex gap-2 flex-wrap">
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`ekran-${s.id}`}
                  aria-selected={selected}
                  aria-controls="ekran-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium cursor-pointer transition-colors ${
                    selected ? 'bg-ink text-cream' : 'bg-white text-ink/72 hover:text-ink border border-ink/8'
                  }`}
                >
                  <Icon size={15} strokeWidth={1.75} aria-hidden />
                  {s.label}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-[15px] text-ink/64 leading-relaxed">
            {SCREENS[active].desc}
          </p>
        </div>

        <div
          role="tabpanel"
          id="ekran-panel"
          aria-labelledby={`ekran-${SCREENS[active].id}`}
          className="grid mt-6 max-[767px]:max-w-[320px] max-[767px]:mx-auto rounded-[20px] max-[767px]:rounded-[28px] overflow-hidden border border-ink/8 bg-cream shadow-[0_1px_2px_rgba(17,17,16,0.04),0_32px_64px_-32px_rgba(17,17,16,0.24)]"
        >
          {/* Ekrany w jednej komórce siatki: przełączenie jest natychmiastowe, bez doczytywania. */}
          {SCREENS.map((s, i) => (
            <picture
              key={s.id}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            >
              <source media="(max-width: 767px)" srcSet={`/panel/${s.id}-m.webp`} width={780} height={1560} />
              <img
                src={`/panel/${s.id}.webp`}
                width={2160}
                height={1350}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
            </picture>
          ))}
        </div>

        <div className="flex items-center gap-x-5 gap-y-3 flex-wrap mt-8">
          <PillButton
            href={PANEL_DEMO_URL}
            external
            variant="dark"
            onClick={() => window.plausible?.('Podgląd panelu')}
            className="py-3.5"
          >
            Zobacz panel
          </PillButton>
          <span className="text-[14px] text-ink/48">Działający podgląd na danych przykładowych, bez logowania.</span>
        </div>
      </Reveal>
    </Section>
  );
}

// Wdrożenie: trzy kroki jako karty z mini-makietami (rozmowa, konfiguracja,
// start na żywo) — pokazują, że po stronie właściciela to 1–2 godziny.
import * as React from 'react';
import { CalendarDays, Check, Phone } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';
import { Card, Chip, DOTS, Reveal, Section, SectionHeading } from '@/lib/ui';

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[280px] rounded-xl bg-white border border-ink/8 shadow-[0_16px_40px_-20px_rgba(17,17,16,0.22)] p-4">
    {children}
  </div>
);

function KickoffMock() {
  return (
    <Panel>
      <div className="flex items-center justify-between mb-3.5">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <CalendarDays size={14} strokeWidth={2} className="text-blu" aria-hidden />
          Rozmowa wdrożeniowa
        </span>
        <Chip>30 min</Chip>
      </div>
      <div className="flex flex-col gap-2">
        {['Usługi i cennik', 'Godziny otwarcia', 'Jak umawiasz wizyty'].map((t) => (
          <div key={t} className="flex items-center gap-2.5 rounded-lg bg-cream px-3 py-2 text-[12.5px]">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/32" />
            {t}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SetupMock() {
  const items = ['Baza wiedzy', 'Kalendarz', 'Numer telefonu', 'Instagram'];
  return (
    <Panel>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-medium">Konfiguracja</span>
        <span className="font-mono text-[11px] text-ink/48 tabular-nums">4/4</span>
      </div>
      <div className="h-1 rounded-full bg-blu mb-3.5" />
      <div className="flex flex-col gap-2 mb-3.5">
        {items.map((t) => (
          <div key={t} className="flex items-center gap-2.5 text-[12.5px]">
            <span className="w-4 h-4 rounded-full bg-blu text-white flex items-center justify-center">
              <Check size={10} strokeWidth={3} aria-hidden />
            </span>
            {t}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-ink/8 pt-3">
        <span className="text-[12.5px] text-ink/64">Testowe rozmowy</span>
        <Chip tone="green">Brzmi jak my</Chip>
      </div>
    </Panel>
  );
}

function Toggle() {
  return (
    <span className="w-8 h-[18px] rounded-full bg-blu p-0.5 flex justify-end" aria-hidden>
      <span className="w-[14px] h-[14px] rounded-full bg-white" />
    </span>
  );
}

function LiveMock() {
  return (
    <Panel>
      <div className="flex items-center justify-between mb-3.5">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <img src="/icon.svg" alt="" className="w-5 h-5 rounded-[6px]" />
          Receply
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#1d5c0c]">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-grn animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-grn" />
          </span>
          Na żywo
        </span>
      </div>
      <div className="flex flex-col gap-2.5 mb-3.5">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="flex items-center gap-2">
            <Phone size={13} strokeWidth={2} className="text-ink/64" aria-hidden /> Telefon
          </span>
          <Toggle />
        </div>
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="flex items-center gap-2">
            <InstagramIcon size={13} className="text-ink/64" /> Instagram
          </span>
          <Toggle />
        </div>
      </div>
      <div className="rounded-lg bg-cream px-3 py-2 text-[12px] text-ink/64">
        Pierwsze połączenie odebrane · <span className="font-mono tabular-nums">9:02</span>
      </div>
    </Panel>
  );
}

const STEPS = [
  {
    title: 'Krótka rozmowa wdrożeniowa',
    desc: 'Opowiadasz nam o firmie: usługi, cennik, godziny, jak umawiasz wizyty. 30 minut wystarczy.',
    mock: KickoffMock,
  },
  {
    title: 'Konfiguracja i test',
    desc: 'Ustawiamy Receply pod Twoją firmę i testujemy razem przykładowe rozmowy, aż powiesz „brzmi jak my”.',
    mock: SetupMock,
  },
  {
    title: 'Start na żywo',
    desc: 'Receply zaczyna odbierać telefony i odpisywać na Instagramie. Ty dostajesz podsumowania i pełną kontrolę.',
    mock: LiveMock,
  },
];

export function ProcessSection() {
  return (
    <Section id="jak-to-dziala" labelledBy="wdrozenie-title">
      <SectionHeading
        id="wdrozenie-title"
        eyebrow="Wdrożenie"
        title="Startujesz w kilka dni, nie miesięcy."
        muted="Z Twojej strony to 1–2 godziny."
        sub="Nie musisz niczego ustawiać sam. Prowadzimy Cię za rękę — od pierwszej rozmowy po pierwszy odebrany telefon."
      />

      <div className="grid grid-cols-3 gap-4 mt-14 max-[767px]:mt-10 max-[991px]:grid-cols-1">
        {STEPS.map((s, i) => {
          const Mock = s.mock;
          return (
            <Reveal key={s.title} delay={i * 120}>
              <Card className="h-full flex flex-col overflow-hidden">
                <div
                  className="m-2 mb-0 rounded-[14px] bg-cream border border-ink/[0.06] min-h-[250px] flex items-center justify-center p-6"
                  style={DOTS}
                >
                  <Mock />
                </div>
                <div className="px-7 pt-6 pb-7 max-[767px]:px-5">
                  <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-blu mb-2.5">
                    Krok {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="text-[15px] text-ink/64 leading-relaxed mt-1.5">{s.desc}</p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

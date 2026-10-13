// Kalkulator strat: trzy suwaki po lewej, po prawej ciemny panel z wynikiem
// (miesięcznie i rocznie) oraz progiem zwrotu Receply liczonym z danych
// użytkownika — bez obiecywania przychodu.
import * as React from 'react';
import { Card, PillButton, Reveal, Section, SectionHeading } from '@/lib/ui';

const PRICE = 299;

function Slider({
  label,
  hint,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <span className="text-[15px] font-medium">{label}</span>
        <output className="font-mono text-[15px] font-medium text-blu tabular-nums">{display}</output>
      </div>
      <div className="text-[13px] text-ink/48 mb-4">{hint}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="range"
        style={{ '--p': `${p}%` } as React.CSSProperties}
      />
    </label>
  );
}

const zl = (n: number) => `${n.toLocaleString('pl-PL')} zł`;

export function CalculatorSection() {
  const [missed, setMissed] = React.useState(4);
  const [percent, setPercent] = React.useState(30);
  const [value, setValue] = React.useState(150);

  const monthly = Math.round(missed * (percent / 100) * value * 30);
  const payback = Math.max(1, Math.ceil(PRICE / value));

  return (
    <Section id="kalkulator" tone="white" labelledBy="kalkulator-title">
      <SectionHeading
        id="kalkulator-title"
        eyebrow="Kalkulator"
        title="Policz, ile kosztuje Cię cisza w słuchawce."
        muted="Trzy suwaki, dziesięć sekund."
      />

      <Reveal delay={100} className="mt-14 max-[767px]:mt-10">
        <div className="grid grid-cols-12 gap-4 max-[991px]:grid-cols-1">
          <Card className="col-span-7 max-[991px]:col-span-1 p-10 max-[767px]:p-6 flex flex-col gap-9">
            <Slider
              label="Nieodebrane telefony i wiadomości"
              hint="Ile kontaktów dziennie zostaje bez odpowiedzi"
              value={missed}
              display={`${missed} dziennie`}
              min={1}
              max={20}
              onChange={setMissed}
            />
            <Slider
              label="Realni klienci"
              hint="Jaki procent z nich chciał się umówić lub kupić"
              value={percent}
              display={`${percent}%`}
              min={5}
              max={100}
              step={5}
              onChange={setPercent}
            />
            <Slider
              label="Wartość klienta"
              hint="Średnia kwota jednej wizyty lub zlecenia"
              value={value}
              display={zl(value)}
              min={30}
              max={1000}
              step={10}
              onChange={setValue}
            />
            <p className="text-[13px] text-ink/48 border-t border-ink/8 pt-6 -mb-1">
              Wzór: nieodebrane dziennie × % realnych klientów × wartość klienta × 30 dni.
            </p>
          </Card>

          <div className="col-span-5 max-[991px]:col-span-1 rounded-[20px] bg-ink text-cream p-10 max-[767px]:p-6 flex flex-col">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-cream/56">
              Szacunkowo tracisz
            </span>
            <div className="mt-4 flex items-baseline gap-2 flex-wrap">
              <span className="text-[clamp(2.8rem,5vw,4rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                {zl(monthly)}
              </span>
              <span className="text-cream/56">/ mies.</span>
            </div>
            <div className="mt-3 text-cream/64 tabular-nums">
              czyli ok. <span className="text-cream">{zl(monthly * 12)}</span> rocznie
            </div>

            <div className="border-t border-cream/12 mt-8 pt-8 text-[15px] leading-relaxed text-cream/72">
              Receply kosztuje {PRICE} zł miesięcznie. Zwraca się już przy{' '}
              <span className="text-cream font-medium">
                {payback === 1 ? 'jednym odzyskanym kliencie' : `${payback} odzyskanych klientach`}
              </span>{' '}
              w miesiącu.
            </div>

            <div className="mt-auto pt-10">
              <PillButton href="#cta" variant="light">
                Odzyskaj tych klientów
              </PillButton>
              <p className="text-xs text-cream/40 mt-5">
                Uproszczony szacunek na podstawie Twoich danych, nie gwarancja przychodu.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

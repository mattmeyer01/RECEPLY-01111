// Kalkulator strat: interakcja wymagana w briefie, obudowana w język wizualny
// widgetów BYQ Nextwell (karta na gradientowym kaflu, mono etykiety, tagi).
import * as React from 'react';
import { Reveal } from '@/lib/ui';

function Slider({
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-2.5 gap-4">
        <span className="text-[15px]">{label}</span>
        <output className="font-mono text-[13px] font-medium text-blu">{display}</output>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-depth accent-blu"
      />
    </label>
  );
}

export function CalculatorSection() {
  const [missed, setMissed] = React.useState(4);
  const [percent, setPercent] = React.useState(30);
  const [value, setValue] = React.useState(150);

  const monthly = Math.round(missed * (percent / 100) * value * 30);
  const fmt = (n: number) => n.toLocaleString('pl-PL') + ' zł';

  return (
    <section id="kalkulator" className="py-28 max-[767px]:py-16">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal className="max-w-[720px] mx-auto text-center mb-14 max-[767px]:mb-8">
          <h2 className="font-normal text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.2] tracking-[-0.02em]">
            Ile tracisz miesięcznie na nieodebranych kontaktach?{' '}
            <span className="text-ink/40">Przesuń suwaki i policz sam.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="rounded-lg p-10 max-[767px]:p-5"
            style={{ background: 'radial-gradient(140% 140% at 15% 0%, #dbe3ff 0%, #c3cef9 40%, #8ba1ef 100%)' }}
          >
            <div className="rounded-lg bg-cream overflow-hidden grid grid-cols-[1.2fr_0.8fr] max-[900px]:grid-cols-1">
              <div className="p-9 max-[767px]:p-6 flex flex-col gap-7 border-r border-ink/16 max-[900px]:border-r-0 max-[900px]:border-b">
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[15px]">Kalkulator nieodebranych kontaktów</span>
                </div>
                <Slider
                  label="Nieodebrane telefony / wiadomości dziennie"
                  value={missed} display={String(missed)} min={1} max={20}
                  onChange={setMissed}
                />
                <Slider
                  label="Ile % z nich to realny klient"
                  value={percent} display={`${percent}%`} min={5} max={100} step={5}
                  onChange={setPercent}
                />
                <Slider
                  label="Średnia wartość klienta"
                  value={value} display={fmt(value)} min={30} max={1000} step={10}
                  onChange={setValue}
                />
              </div>
              <div className="p-9 max-[767px]:p-6 flex flex-col items-center justify-center text-center gap-2">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/64">
                  Szacunkowo tracisz miesięcznie
                </span>
                <div className="font-medium text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.03em] text-blu">
                  {fmt(monthly)}
                </div>
                <span className="text-sm text-ink/64">przy 30 dniach w miesiącu</span>
                <span className="text-xs text-ink/40 mt-3 max-w-[260px]">
                  To uproszczony szacunek na podstawie Twoich danych, nie gwarancja przychodu.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

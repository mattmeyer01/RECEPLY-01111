// Jak to działa: adaptacja BYQ Kelvin Process 1 („Numbered Process Steps
// Timeline") — dwutonowy nagłówek, pozioma linia z animowanym wypełnieniem
// i węzłami, mono numery 01–03, wejścia schodkowane; szanuje reduced motion.
import * as React from 'react';
import { Reveal } from '@/lib/ui';

const STEPS = [
  {
    num: '01',
    title: 'Krótka rozmowa wdrożeniowa',
    desc: 'Opowiadasz nam o firmie: usługi, cennik, godziny, jak umawiasz wizyty. 30 minut wystarczy.',
  },
  {
    num: '02',
    title: 'Konfiguracja i test',
    desc: 'Ustawiamy Receply pod Twoją firmę i testujemy razem przykładowe rozmowy, aż powiesz „brzmi jak my".',
  },
  {
    num: '03',
    title: 'Start na żywo',
    desc: 'Receply zaczyna odbierać telefony i odpisywać na Instagramie. Ty dostajesz podsumowania i pełną kontrolę.',
  },
];

export function ProcessSection() {
  const lineRef = React.useRef<HTMLDivElement>(null);
  const [filled, setFilled] = React.useState(false);

  React.useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilled(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFilled(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="jak-to-dziala" className="py-28 max-[767px]:py-16 bg-white border-y border-ink/8">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-grn" />
            <span className="font-mono text-xs font-medium tracking-[0.15em] uppercase text-ink/64">Wdrożenie</span>
          </div>
          <h2 className="font-medium text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.12] tracking-[-0.02em]">
            <span className="text-ink/40">Start w kilka dni,</span> nie miesięcy.
          </h2>
        </Reveal>

        {/* Linia-oś czasu z wypełnieniem (Kelvin) */}
        <div ref={lineRef} className="relative h-px bg-ink/8 mt-16 mb-10 max-[767px]:hidden">
          <div
            className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-[1200ms] ease-out"
            style={{ width: filled ? '100%' : '0%' }}
          />
        </div>

        <div className="grid grid-cols-3 gap-10 max-[767px]:grid-cols-1 max-[767px]:mt-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 150} className="relative">
              <div className="absolute -top-[45px] w-2.5 h-2.5 rounded-full bg-ink border-2 border-white max-[767px]:hidden" />
              <div className="font-mono font-medium text-[2rem] text-ink/24 mb-3">{s.num}</div>
              <h3 className="text-xl font-medium mb-2.5">{s.title}</h3>
              <p className="text-[15px] text-ink/64 leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

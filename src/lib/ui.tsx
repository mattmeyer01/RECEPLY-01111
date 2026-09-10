// Wspólne klocki wywiedzione z komponentów BYQ Supply:
// - Reveal: animacja wejścia fade-up / blur-in na IntersectionObserver (wzorzec Nextwell/Evermind)
// - CountUp: licznik animowany na scroll (wzorzec Truebase Bento 1, bez GSAP)
// - Eyebrow: mono etykieta z kropką (wzorzec Kelvin/Evermind)
// - PillButton: pigułkowy przycisk ze strzałką (wzorzec Nextwell cta_primary)
import * as React from 'react';

export function Reveal({
  blur = false,
  delay = 0,
  className = '',
  children,
}: {
  blur?: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${blur ? 'reveal-blur' : 'reveal'} ${visible ? 'visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function CountUp({ to, className = '' }: { to: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-2 h-2 rounded-full bg-grn" />
      <span
        className={`font-mono text-xs font-medium tracking-[0.15em] uppercase ${
          light ? 'text-cream' : 'text-ink/64'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function PillButton({
  href,
  children,
  variant = 'dark',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'blue' | 'light' | 'ghost';
  className?: string;
}) {
  const styles: Record<string, string> = {
    dark: 'bg-ink text-cream hover:bg-ink/88',
    blue: 'bg-blu text-white hover:bg-ink',
    light: 'bg-cream text-ink hover:bg-cream/88',
    ghost: 'border border-ink/16 text-ink hover:bg-ink hover:text-cream',
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-[15px] no-underline transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      <Arrow />
      {children}
    </a>
  );
}

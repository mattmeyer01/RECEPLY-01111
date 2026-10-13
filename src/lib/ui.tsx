// Wspólne klocki strony.
// - Reveal: animacja wejścia fade-up / blur-in na IntersectionObserver (wzorzec BYQ Nextwell/Evermind)
// - Eyebrow: mono etykieta z kropką (wzorzec BYQ Kelvin/Evermind) — używana w hero
// - PillButton: pigułkowy przycisk (wzorzec Nextwell cta_primary)
// - Section / SectionHeading / Card / Chip: system sekcji poniżej hero —
//   wspólna ramka z liniami włoskowymi, mono etykiety i białe karty-widżety
//   w tym samym języku co pływające karty w hero.
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
  arrow = true,
  onClick,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'blue' | 'light' | 'ghost' | 'ghost-light';
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const styles: Record<string, string> = {
    dark: 'bg-ink text-cream hover:bg-blu',
    blue: 'bg-blu text-white hover:bg-ink',
    light: 'bg-white text-ink hover:bg-cream',
    ghost: 'border border-ink/16 text-ink hover:bg-ink hover:text-cream',
    'ghost-light': 'border border-white/30 text-white hover:bg-white hover:text-ink',
  };
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-[15px] no-underline transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {arrow && <Arrow />}
      {children}
    </a>
  );
}

function Corner({ side, dark }: { side: 'left' | 'right'; dark: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-[5px] ${side === 'left' ? '-left-[5px]' : '-right-[5px]'} w-[9px] h-[9px] hidden min-[1240px]:block`}
    >
      <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${dark ? 'bg-cream/40' : 'bg-ink/32'}`} />
      <span className={`absolute top-1/2 left-0 w-full h-px -translate-y-1/2 ${dark ? 'bg-cream/40' : 'bg-ink/32'}`} />
    </span>
  );
}

// Ramka strony: każda sekcja dzieli wspólny kontener z pionowymi liniami
// włoskowymi i znacznikami „+" w narożnikach (desktop), więc całość czyta
// się jak jedna konstrukcja, a nie zbiór szablonów.
export function Section({
  id,
  labelledBy,
  tone = 'light',
  className = '',
  innerClassName = '',
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: 'light' | 'white' | 'dark';
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const dark = tone === 'dark';
  const bg = dark ? 'bg-ink text-cream border-cream/10' : tone === 'white' ? 'bg-white border-ink/8' : 'border-ink/8';
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative border-t ${bg} ${className}`}>
      <div
        className={`relative max-w-[1180px] mx-auto px-6 min-[1240px]:px-10 py-28 max-[767px]:py-16 min-[1240px]:border-x ${
          dark ? 'min-[1240px]:border-cream/10' : 'min-[1240px]:border-ink/8'
        } ${innerClassName}`}
      >
        <Corner side="left" dark={dark} />
        <Corner side="right" dark={dark} />
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  muted,
  sub,
  id,
  align = 'left',
  tone = 'light',
  className = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  muted?: React.ReactNode;
  sub?: React.ReactNode;
  id?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const center = align === 'center';
  const dark = tone === 'dark';
  return (
    <Reveal className={`max-w-[760px] ${center ? 'mx-auto text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-2 mb-5 ${center ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blu" />
        <span
          className={`font-mono text-xs font-medium tracking-[0.15em] uppercase ${
            dark ? 'text-cream/64' : 'text-ink/64'
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        id={id}
        className="font-medium text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance"
      >
        {title}
        {muted && (
          <>
            {' '}
            <span className={dark ? 'text-cream/40' : 'text-ink/40'}>{muted}</span>
          </>
        )}
      </h2>
      {sub && (
        <p
          className={`text-[17px] leading-relaxed mt-5 max-w-[580px] text-pretty ${center ? 'mx-auto' : ''} ${
            dark ? 'text-cream/64' : 'text-ink/64'
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[20px] bg-white border border-ink/8 shadow-[0_1px_2px_rgba(17,17,16,0.04),0_12px_32px_-16px_rgba(17,17,16,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: 'neutral' | 'green' | 'blue' | 'red';
  className?: string;
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-ink/[0.05] text-ink/64',
    green: 'bg-grn-tint text-[#1d5c0c]',
    blue: 'bg-blu/10 text-blu',
    red: 'bg-red/10 text-red',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.06em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

// Delikatna siatka kropek z hero, do paneli z wizualizacjami w kartach
export const DOTS: React.CSSProperties = {
  backgroundImage: 'radial-gradient(rgba(17,17,16,0.07) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

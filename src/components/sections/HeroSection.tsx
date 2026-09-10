// Hero: adaptacja BYQ Evermind Hero 5 („Hero About with Floating Images")
// — wycentrowany nagłówek z eyebrow, wokół pływające karty reagujące na mysz
// (parallax przez data-depth, wzorzec Babka Image Gallery 4), wejście blur-in.
// Zamiast zdjęć: karty produktowego UI Receply w stylu widgetów Nextwell,
// jak na arini.ai (voice call / DM / rezerwacja / przypomnienie).
import * as React from 'react';
import { Reveal, Eyebrow } from '@/lib/ui';

function WidgetShell({
  title,
  icon,
  children,
  className = '',
  depth,
  floatDelay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  depth: number;
  floatDelay?: number;
}) {
  return (
    <div
      data-depth={depth}
      className={`absolute rounded-xl bg-white border border-ink/8 shadow-[0_16px_48px_rgba(17,17,16,0.08)] overflow-hidden will-change-transform animate-floaty max-[991px]:hidden ${className}`}
      style={{ animationDelay: `${floatDelay}s` }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/8">
        <span className="text-ink/64">{icon}</span>
        <span className="text-[13px] font-medium text-ink">{title}</span>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

const Waveform = () => (
  <div className="flex items-center gap-[3px] h-8" aria-hidden>
    {[0.5, 0.9, 0.6, 1, 0.7, 0.95, 0.45, 0.8, 0.6, 1, 0.5, 0.85, 0.65].map((h, i) => (
      <div
        key={i}
        className="wave-bar w-[3px] rounded-full bg-blu"
        style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
      />
    ))}
  </div>
);

const PhoneIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CameraIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
  </svg>
);

const CalIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BellIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function HeroSection() {
  const stageRef = React.useRef<HTMLDivElement>(null);

  // Parallax myszy (wzorzec Babka: data-depth 0.45–1.0, wyłączony <992px)
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(max-width: 991px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = stage.querySelectorAll<HTMLElement>('[data-depth]');
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cards.forEach((card) => {
          const depth = parseFloat(card.dataset.depth || '0.5');
          card.style.translate = `${-x * 36 * depth}px ${-y * 24 * depth}px`;
        });
      });
    };
    stage.addEventListener('mousemove', onMove);
    return () => {
      stage.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="relative min-h-[820px] max-[767px]:min-h-0 overflow-hidden flex items-center justify-center pt-40 pb-24 max-[767px]:pt-32 max-[767px]:pb-14"
      style={{
        backgroundImage: 'radial-gradient(rgba(17,17,16,0.10) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Pływające karty UI (Evermind: scattered collage, blur-in z opóźnieniem) */}
      <Reveal blur delay={200} className="absolute inset-0 pointer-events-none">
        <WidgetShell title="Połączenie przychodzące" icon={PhoneIcon} depth={0.9} floatDelay={0.4}
          className="top-[14%] left-[6%] w-[240px]">
          <div className="text-xs text-ink/64 mb-2">Salon Beauty · dziś 18:42</div>
          <Waveform />
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink/64 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-grn inline-block" />
            Receply odbiera · 00:37
          </div>
        </WidgetShell>

        <WidgetShell title="Wiadomość na Instagramie" icon={CameraIcon} depth={0.6} floatDelay={1.2}
          className="top-[55%] left-[10%] w-[250px]">
          <div className="flex flex-col gap-1.5">
            <div className="self-start bg-depth rounded-2xl rounded-bl-md px-3 py-1.5 text-[13px]">
              Ile kosztuje hybryda? 💅
            </div>
            <div className="self-end bg-blu/10 border border-blu/20 rounded-2xl rounded-br-md px-3 py-1.5 text-[13px]">
              120 zł, ok. 60 min. Zarezerwować środę 9:00?
            </div>
          </div>
        </WidgetShell>

        <WidgetShell title="Rezerwacja" icon={CalIcon} depth={0.8} floatDelay={0.8}
          className="top-[16%] right-[6%] w-[230px]">
          <div className="text-[13px] font-medium">Strzyżenie · jutro 17:00</div>
          <div className="text-xs text-ink/64 mb-2">Pani Karolina · tel. potwierdzony</div>
          <span className="inline-block font-mono text-[10px] font-medium uppercase tracking-[0.08em] bg-grn-tint text-ink rounded-full px-2 py-1">
            ✓ Zapisano w kalendarzu
          </span>
        </WidgetShell>

        <WidgetShell title="Przypomnienie wysłane" icon={BellIcon} depth={0.5} floatDelay={1.6}
          className="top-[58%] right-[9%] w-[220px]">
          <div className="text-[13px]">„Do zobaczenia jutro o 17:00!"</div>
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink/64 mt-1.5">
            SMS · 24h przed wizytą
          </div>
        </WidgetShell>
      </Reveal>

      {/* Centralny blok nagłówka (Evermind: blur-in) */}
      <div className="relative z-10 max-w-[880px] mx-auto px-5 text-center">
        <Reveal blur>
          <div className="mb-6">
            <Eyebrow>AI recepcjonista · Telefon + Instagram</Eyebrow>
          </div>
          <h1 className="font-medium text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.06] tracking-[-0.03em] max-w-[760px] mx-auto">
            Ani jeden klient nie ucieka, bo nie zdążyłeś odebrać telefonu
          </h1>
          <p className="text-ink/64 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed max-w-[560px] mx-auto mt-6">
            Receply odbiera połączenia i odpisuje na Instagramie, gdy Ty pracujesz. Umawia wizyty
            prosto do Twojego kalendarza — 24/7, naturalnym głosem, po polsku.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex items-center justify-center gap-3 flex-wrap mt-10">
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-blu text-white font-medium text-[15px] px-7 py-3.5 no-underline transition-colors duration-300 hover:bg-ink"
            >
              Umów bezpłatną rozmowę
            </a>
            <a
              href="#demo"
              className="inline-flex items-center rounded-full border border-ink/16 text-ink font-medium text-[15px] px-7 py-3.5 no-underline transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              Zobacz przykładową rozmowę
            </a>
          </div>
          <div className="flex items-center justify-center gap-2.5 flex-wrap mt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/8 px-4 py-2 text-[13px] text-ink/64">
              📞 Połączenia telefoniczne
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink/8 px-4 py-2 text-[13px] text-ink/64">
              📷 Wiadomości na Instagramie
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

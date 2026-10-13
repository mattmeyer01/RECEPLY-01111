// Finalne CTA: niebieska karta (kolor głównego przycisku z hero) z siatką
// kropek i dwiema pływającymi kartami-widgetami jak w hero — domknięcie
// strony tym samym językiem, którym się zaczyna. Dwa wyjścia: rozmowa
// z zespołem albo odsłuchanie przykładowej rozmowy.
import * as React from 'react';
import { CalendarCheck, PhoneIncoming, Play } from 'lucide-react';
import { PLAY_CALL_EVENT } from '@/components/sections/DemoSection';
import { PillButton, Reveal, Section } from '@/lib/ui';

function FloatCard({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className={`absolute w-[200px] rounded-xl bg-white text-ink border border-white/40 shadow-[0_24px_48px_-16px_rgba(10,20,90,0.45)] p-4 animate-floaty hidden min-[1280px]:block ${className}`}
    >
      {children}
    </div>
  );
}

export function FinalCtaSection() {
  return (
    <Section id="cta" labelledBy="cta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-blu text-white px-8 py-24 max-[767px]:px-6 max-[767px]:py-16 text-center">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-white/10 blur-3xl"
          />

          <FloatCard className="left-6 top-12 -rotate-[4deg]">
            <div className="flex items-center gap-2 text-[13px] font-medium mb-2">
              <PhoneIncoming size={14} strokeWidth={2} className="text-blu" />
              Połączenie odebrane
            </div>
            <div className="flex items-center gap-[3px] h-6">
              {[0.5, 0.9, 0.6, 1, 0.7, 0.95, 0.45, 0.8, 0.6, 1, 0.5, 0.85].map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-blu" style={{ height: `${h * 100}%` }} />
              ))}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/48 mt-2">Niedziela · 21:15</div>
          </FloatCard>

          <FloatCard className="right-6 bottom-12 rotate-[3deg] [animation-delay:1.2s]">
            <div className="flex items-center gap-2 text-[13px] font-medium mb-1.5">
              <CalendarCheck size={14} strokeWidth={2} className="text-blu" />
              Wizyta zapisana
            </div>
            <div className="text-[13px] text-ink/64">Strzyżenie · jutro 17:00</div>
            <span className="inline-block mt-2.5 rounded-full bg-grn-tint px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-[#1d5c0c]">
              ✓ W kalendarzu
            </span>
          </FloatCard>

          <div className="relative max-w-[640px] mx-auto">
            <h2
              id="cta-title"
              className="font-medium text-[clamp(2.2rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.04em] text-balance"
            >
              Przestań tracić klientów, których już masz na linii.
            </h2>
            <p className="text-white/80 text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed mt-6 max-w-[540px] mx-auto">
              Napisz do nas — odpowiemy tego samego dnia i umówimy krótką, bezpłatną rozmowę o Twojej firmie.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap mt-10">
              <PillButton
                href="mailto:kontakt@receply.com?subject=Receply%20—%20bezpłatna%20rozmowa"
                variant="light"
                className="px-7 py-3.5"
              >
                Umów bezpłatną rozmowę
              </PillButton>
              <PillButton
                href="#rozmowa"
                variant="ghost-light"
                arrow={false}
                onClick={() => window.dispatchEvent(new Event(PLAY_CALL_EVENT))}
                className="px-7 py-3.5"
              >
                <Play size={14} fill="currentColor" strokeWidth={0} aria-hidden />
                Posłuchaj rozmowy
              </PillButton>
            </div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white/56 mt-8">
              kontakt@receply.com · bez zobowiązań
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

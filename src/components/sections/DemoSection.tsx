// Demo: adaptacja BYQ Nextwell Value & Features 3 — wycentrowany dwutonowy
// nagłówek, 3 kafle z gradientowym tłem i kartami-widgetami produktowego UI,
// podpisy pod kaflami, na dole pasek CTA (bez zmyślonych awatarów klientów —
// produkt jest przedsprzedażowy, więc pasek mówi o rozmowie z zespołem).
import * as React from 'react';
import { Reveal } from '@/lib/ui';

function WidgetTop({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="px-5 py-4 flex items-center justify-between border-b border-ink/16 gap-4">
      <div className="flex items-center gap-2.5">
        <span className="text-ink">{icon}</span>
        <span className="text-[15px]">{title}</span>
      </div>
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink/40">
        Przykład
      </span>
    </div>
  );
}

function Tag({ children, green = false }: { children: React.ReactNode; green?: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded-full font-mono text-[10px] font-medium uppercase tracking-[0.05em] ${
        green ? 'bg-grn-tint' : 'bg-lift'
      }`}
    >
      {children}
    </span>
  );
}

const PhoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CameraIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
  </svg>
);

const CalIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function DemoSection() {
  return (
    <section id="demo" className="py-28 max-[767px]:py-16 bg-cream">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Nagłówek (Nextwell: dwutonowy H2) */}
        <Reveal className="max-w-[820px] mx-auto mb-16 text-center max-[767px]:mb-10">
          <h2 className="font-normal text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.2] tracking-[-0.02em]">
            Tak wygląda dzień z Receply —{' '}
            <span className="text-ink/40">
              telefon odebrany, DM-y obsłużone, kalendarz zapełniony. Poniżej przykładowe rozmowy.
            </span>
          </h2>
        </Reveal>

        {/* Siatka 3 kafli-widgetów */}
        <div className="grid grid-cols-3 gap-4 mb-20 max-[991px]:grid-cols-1 max-[991px]:gap-10 max-[767px]:mb-12">
          {/* Kafel 1 — rozmowa telefoniczna */}
          <Reveal className="grid grid-rows-[1fr_auto] gap-6">
            <div
              className="rounded-lg p-8 flex items-center max-[767px]:p-5"
              style={{ background: 'radial-gradient(120% 120% at 20% 10%, #dbe3ff 0%, #b9c6f8 45%, #7d95ec 100%)' }}
            >
              <div className="rounded-lg bg-cream w-full overflow-hidden">
                <WidgetTop icon={PhoneIcon} title="Połączenie · Salon Anna" />
                <div className="px-5 py-5 flex flex-col gap-2.5">
                  <div className="self-end max-w-[90%] bg-blu/10 border border-blu/20 rounded-2xl rounded-br-md px-3.5 py-2 text-[13px]">
                    Salon Anna, dzień dobry! W czym mogę pomóc?
                  </div>
                  <div className="self-start max-w-[90%] bg-depth rounded-2xl rounded-bl-md px-3.5 py-2 text-[13px]">
                    Chciałabym umówić strzyżenie, macie coś jutro po południu?
                  </div>
                  <div className="self-end max-w-[90%] bg-blu/10 border border-blu/20 rounded-2xl rounded-br-md px-3.5 py-2 text-[13px]">
                    Jutro wolne 15:30 i 17:00. Który termin pasuje?
                  </div>
                  <div className="self-start max-w-[90%] bg-depth rounded-2xl rounded-bl-md px-3.5 py-2 text-[13px]">
                    17:00 będzie idealnie.
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[13px] font-medium">Strzyżenie · jutro 17:00</span>
                    <Tag green>✓ Umówiona</Tag>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed m-0">
              Rozmowy telefoniczne{' '}
              <span className="text-ink/64">
                brzmią naturalnie i kończą się terminem w kalendarzu, nie karteczką „oddzwonić".
              </span>
            </p>
          </Reveal>

          {/* Kafel 2 — Instagram DM */}
          <Reveal delay={100} className="grid grid-rows-[1fr_auto] gap-6">
            <div
              className="rounded-lg p-8 flex items-center max-[767px]:p-5"
              style={{ background: 'radial-gradient(120% 120% at 80% 10%, #d7f5e9 0%, #a9e8cf 45%, #5ec9a4 100%)' }}
            >
              <div className="rounded-lg bg-cream w-full overflow-hidden">
                <WidgetTop icon={CameraIcon} title="Instagram · Studio Paznokci" />
                <div className="px-5 py-5 flex flex-col gap-2.5">
                  <div className="self-start max-w-[90%] bg-depth rounded-2xl rounded-bl-md px-3.5 py-2 text-[13px]">
                    Hej, ile kosztuje manicure hybrydowy? 💅
                  </div>
                  <div className="self-end max-w-[90%] bg-blu/10 border border-blu/20 rounded-2xl rounded-br-md px-3.5 py-2 text-[13px]">
                    Cześć! 120 zł, ok. 60 minut. Sprawdzić wolne terminy w tym tygodniu?
                  </div>
                  <div className="self-start max-w-[90%] bg-depth rounded-2xl rounded-bl-md px-3.5 py-2 text-[13px]">
                    Tak, najlepiej środa rano
                  </div>
                  <div className="self-end max-w-[90%] bg-blu/10 border border-blu/20 rounded-2xl rounded-br-md px-3.5 py-2 text-[13px]">
                    W środę wolne 9:00 i 10:30 — rezerwuję którąś? 😊
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[13px] font-medium">Manicure · środa 9:00</span>
                    <Tag green>✓ Umówiona</Tag>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed m-0">
              Instagram na autopilocie{' '}
              <span className="text-ink/64">
                — odpowiedź w kilka sekund, o 21:15 w niedzielę też. DM zamienia się w rezerwację.
              </span>
            </p>
          </Reveal>

          {/* Kafel 3 — kalendarz / podsumowania */}
          <Reveal delay={200} className="grid grid-rows-[1fr_auto] gap-6">
            <div
              className="rounded-lg p-8 flex items-center max-[767px]:p-5"
              style={{ background: 'radial-gradient(120% 120% at 50% 0%, #ffe9d6 0%, #f8cfa9 45%, #eba36a 100%)' }}
            >
              <div className="rounded-lg bg-cream w-full overflow-hidden">
                <WidgetTop icon={CalIcon} title="Twój kalendarz" />
                <div className="px-5 py-5 flex flex-col gap-3">
                  {[
                    { t: 'Strzyżenie — 17:00', s: 'z telefonu · wczoraj 18:42', tag: 'Umówiona', green: true },
                    { t: 'Manicure — śr 9:00', s: 'z Instagrama · niedziela 21:15', tag: 'Umówiona', green: true },
                    { t: 'Pytanie o trwałą', s: 'przekazano właścicielce', tag: 'Dla Ciebie', green: false },
                  ].map((row) => (
                    <div key={row.t}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[13px] font-medium">{row.t}</div>
                          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-ink/40 mt-0.5">
                            {row.s}
                          </div>
                        </div>
                        <Tag green={row.green}>{row.tag}</Tag>
                      </div>
                      <div className="h-px bg-ink/16 mt-3 last:hidden" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed m-0">
              Podsumowania i kalendarz{' '}
              <span className="text-ink/64">
                — po każdej rozmowie krótkie streszczenie, a do Ciebie trafiają tylko ważne sprawy.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Pasek CTA (Nextwell: tekst + czarna pigułka ze strzałkami) */}
        <div className="flex items-center justify-center gap-10 flex-wrap max-[767px]:gap-5">
          <Reveal className="text-center min-[768px]:text-left">
            <div className="text-[15px] font-medium">Chcesz usłyszeć, jak Receply zabrzmi w Twojej firmie?</div>
            <div className="text-sm text-ink/64">Bezpłatna rozmowa z zespołem — bez zobowiązań.</div>
          </Reveal>
          <Reveal delay={150}>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-cream font-medium text-[15px] px-6 py-3 no-underline transition-colors duration-300 hover:bg-blu"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Umów rozmowę
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

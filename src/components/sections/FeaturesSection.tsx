// Funkcje: adaptacja BYQ Nextwell Value & Features 7 („Sticky Headline with
// Feature Cards Grid") — lewa kolumna z przyklejonym nagłówkiem i CTA,
// prawa: pionowy stos kart z kafelkami ikon; na mobile jedna kolumna.
import * as React from 'react';
import { Reveal } from '@/lib/ui';

const FEATURES: { icon: string; title: string; desc: string }[] = [
  {
    icon: '📞',
    title: 'Rozmowy telefoniczne AI',
    desc: 'Naturalny głos po polsku. Odbiera każde połączenie, odpowiada na pytania o ceny, godziny i usługi — bez kolejki i bez „proszę czekać".',
  },
  {
    icon: '📷',
    title: 'Instagram na autopilocie',
    desc: 'Odpowiada na wiadomości prywatne i komentarze w kilka sekund, o każdej porze. Klient z DM-ów zamienia się w klienta z rezerwacją.',
  },
  {
    icon: '📅',
    title: 'Umawianie terminów',
    desc: 'Sprawdza wolne godziny w Twoim kalendarzu i zapisuje wizytę od razu, w trakcie rozmowy. Bez oddzwaniania i bez podwójnych rezerwacji.',
  },
  {
    icon: '🧠',
    title: 'Baza wiedzy o Twojej firmie',
    desc: 'Receply zna Twój cennik, godziny otwarcia, usługi i najczęstsze pytania. Odpowiada tak, jak Ty byś odpowiedział — tylko szybciej.',
  },
  {
    icon: '📋',
    title: 'Podsumowania rozmów',
    desc: 'Po każdej rozmowie dostajesz krótkie streszczenie. Ważne i nietypowe sprawy Receply przekazuje bezpośrednio Tobie.',
  },
  {
    icon: '🔒',
    title: 'Zgodność z RODO',
    desc: 'Dane Twoje i Twoich klientów są przetwarzane w UE, szyfrowane i nie są nikomu odsprzedawane. Umowa powierzenia w standardzie.',
  },
];

export function FeaturesSection() {
  return (
    <section id="funkcje" className="py-28 max-[767px]:py-16">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-[5fr_1fr_6fr] max-[900px]:grid-cols-1 max-[900px]:gap-10">
          {/* Lewa: sticky nagłówek (Nextwell VF-7) */}
          <div>
            <Reveal className="sticky top-28 max-[900px]:static">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-blu" />
                <span className="font-mono text-xs font-medium tracking-[0.15em] uppercase text-ink/64">Funkcje</span>
              </div>
              <h2 className="font-medium text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.12] tracking-[-0.02em]">
                Wszystko, czego potrzebuje{' '}
                <span className="text-ink/40">Twoja „recepcja".</span>
              </h2>
              <p className="text-ink/64 mt-5 max-w-[380px]">
                Receply nie jest infolinią z nagraniem. Prowadzi prawdziwe rozmowy i załatwia sprawy
                do końca — od pytania o cennik po wpis w kalendarzu.
              </p>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 mt-7 rounded-full bg-ink text-cream font-medium text-[15px] px-6 py-3 no-underline transition-colors duration-300 hover:bg-blu"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Porozmawiaj z nami
              </a>
            </Reveal>
          </div>

          <div className="max-[900px]:hidden" />

          {/* Prawa: stos kart */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <div className="rounded-2xl bg-white border border-ink/8 p-8 max-[767px]:p-6">
                  <div className="w-11 h-11 rounded-[10px] bg-lift flex items-center justify-center text-xl mb-10 max-[767px]:mb-5 shadow-[inset_0_-1px_0_rgba(17,17,16,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                  <p className="text-[15px] text-ink/64 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

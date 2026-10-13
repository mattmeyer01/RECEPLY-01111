// Problem: ból pokazany w języku produktu — po lewej „centrum powiadomień"
// z kontaktami, które jednego dnia zostały bez odpowiedzi, po prawej trzy
// liczby z uczciwymi przypisami (bez zmyślonych statystyk).
import { PhoneMissed } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';
import { Card, Chip, Reveal, Section, SectionHeading } from '@/lib/ui';

const MISSED: { kind: 'call' | 'dm'; who: string; what: string; time: string }[] = [
  { kind: 'call', who: 'Nieodebrane połączenie', what: '+48 512 *** 204', time: '9:47' },
  { kind: 'dm', who: 'anna.k', what: 'Macie jutro coś wolnego na hybrydę?', time: '11:15' },
  { kind: 'call', who: 'Nieodebrane połączenie (2)', what: '+48 600 *** 117', time: '13:05' },
  { kind: 'call', who: 'Nieodebrane połączenie', what: '+48 793 *** 552', time: '17:32' },
  { kind: 'dm', who: 'kasia.wnuk', what: 'Ile kosztuje koloryzacja?', time: '21:47' },
];

const STATS = [
  {
    value: '60%+',
    title: 'klientów nie próbuje drugi raz',
    desc: 'Gdy nikt nie odbiera, większość dzwoniących wybiera następny numer z Google — czyli Twoją konkurencję.',
    note: 'Wartość powszechnie cytowana w branży, nie oficjalna statystyka.',
  },
  {
    value: '24/7',
    title: 'tyle dziś oczekują klienci',
    desc: 'Ludzie piszą i dzwonią wieczorami, w weekendy i w święta. Kto odpowiada pierwszy, ten dostaje rezerwację.',
    note: 'Obserwacja z rynku usług lokalnych, nie zweryfikowane badanie.',
  },
  {
    value: '0',
    title: 'osób na etacie do telefonu i DM-ów',
    desc: 'W małej firmie nikt nie siedzi przy słuchawce. Odbierasz między klientami — albo wcale. Recepcjonistka na etat to kilka tysięcy złotych miesięcznie.',
    note: null,
  },
];

function MissedFeed() {
  return (
    <Card className="p-2">
      <div className="flex items-center justify-between px-4 pt-3 pb-3.5">
        <span className="text-[15px] font-medium">Powiadomienia · dziś</span>
        <Chip tone="red">5 bez odpowiedzi</Chip>
      </div>
      <div className="flex flex-col gap-1.5">
        {MISSED.map((m, i) => (
          <Reveal key={m.time} delay={i * 90}>
            <div className="flex items-center gap-3 rounded-xl bg-cream px-3.5 py-3">
              <span
                className={`flex-none w-9 h-9 rounded-full flex items-center justify-center ${
                  m.kind === 'call' ? 'bg-red/10 text-red' : 'bg-ink/[0.06] text-ink'
                }`}
              >
                {m.kind === 'call' ? (
                  <PhoneMissed size={16} strokeWidth={2} aria-hidden />
                ) : (
                  <InstagramIcon size={16} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium truncate">{m.who}</div>
                <div className="text-[13px] text-ink/64 truncate">{m.what}</div>
              </div>
              <span className="font-mono text-[11px] text-ink/40 tabular-nums">{m.time}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="px-4 pt-3.5 pb-2.5 text-[13px] text-ink/64">
        Każdy z tych kontaktów mógł być wizytą.
      </div>
    </Card>
  );
}

export function ProblemSection() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <SectionHeading
        id="problem-title"
        eyebrow="Problem"
        title="Nieodebrany telefon to klient,"
        muted="który właśnie dzwoni do konkurencji."
        sub="Telefon dzwoni, kiedy masz ręce w farbie. Wiadomości z Instagrama czekają do wieczora. A klient nie czeka — umawia się tam, gdzie ktoś odebrał."
      />

      <div className="grid grid-cols-12 gap-x-16 gap-y-12 mt-16 max-[767px]:mt-10 max-[991px]:grid-cols-1">
        <div className="col-span-5 max-[991px]:col-span-1">
          <MissedFeed />
        </div>

        <div className="col-span-7 max-[991px]:col-span-1 flex flex-col">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 120}>
              <div
                className={`grid grid-cols-[minmax(0,180px)_1fr] gap-x-8 gap-y-3 py-8 max-[600px]:grid-cols-1 ${
                  i ? 'border-t border-ink/8' : 'pt-2'
                }`}
              >
                <div className="text-[clamp(2.75rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                  {s.value}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1.5">{s.title}</h3>
                  <p className="text-[15px] text-ink/64 leading-relaxed">{s.desc}</p>
                  {s.note && <p className="text-xs text-ink/40 mt-3">* {s.note}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

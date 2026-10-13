// Funkcje: siatka bento z makietami produktu w języku kart z hero — dziennik
// połączeń, wiadomości na Instagramie, kalendarz, baza wiedzy i powiadomienia
// dla właściciela. Dane w makietach są przykładowe. Pod siatką pasek
// mniejszych możliwości.
import * as React from 'react';
import { AudioLines, BellRing, Clock, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '@/components/icons';
import { Card, Chip, DOTS, Reveal, Section, SectionHeading } from '@/lib/ui';

function BentoCard({
  title,
  desc,
  className = '',
  delay = 0,
  children,
}: {
  title: string;
  desc: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Card className="h-full flex flex-col overflow-hidden">
        <div
          className="relative flex-1 m-2 mb-0 rounded-[14px] bg-cream border border-ink/[0.06] overflow-hidden min-h-[260px] flex items-center justify-center p-6 max-[767px]:p-4"
          style={DOTS}
        >
          {children}
        </div>
        <div className="px-7 pt-6 pb-7 max-[767px]:px-5">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-[15px] text-ink/64 leading-relaxed mt-1.5">{desc}</p>
        </div>
      </Card>
    </Reveal>
  );
}

const Panel = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={`w-full rounded-xl bg-white border border-ink/8 shadow-[0_16px_40px_-20px_rgba(17,17,16,0.22)] ${className}`}
  >
    {children}
  </div>
);

const CALLS: {
  time: string;
  num: string;
  intent: string;
  dur: string;
  status: { tone: 'green' | 'blue' | 'neutral'; label: string };
  late?: boolean;
}[] = [
  { time: '9:12', num: '+48 512 *** 204', intent: 'Rezerwacja', dur: '0:41', status: { tone: 'green', label: 'Umówiona' } },
  { time: '10:47', num: '+48 600 *** 117', intent: 'Pytanie o cenę', dur: '0:28', status: { tone: 'neutral', label: 'Odpowiedziano' } },
  { time: '13:05', num: '+48 793 *** 552', intent: 'Zmiana terminu', dur: '0:52', status: { tone: 'blue', label: 'Przełożona' } },
  { time: '18:31', num: '+48 501 *** 930', intent: 'Rezerwacja', dur: '0:37', status: { tone: 'green', label: 'Umówiona' } },
  { time: '21:08', num: '+48 664 *** 018', intent: 'Godziny otwarcia', dur: '0:19', status: { tone: 'neutral', label: 'Odpowiedziano' }, late: true },
];

function CallLog() {
  return (
    <Panel className="max-w-[560px]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-ink/8">
        <span className="text-[13px] font-medium">Połączenia · dziś</span>
        <Chip tone="green">0 nieodebranych</Chip>
      </div>
      <div className="divide-y divide-ink/[0.06]">
        {CALLS.map((c) => (
          <div key={c.time} className="grid grid-cols-[44px_1fr_auto_auto] items-center gap-3 px-4 py-2.5 max-[560px]:grid-cols-[36px_1fr_auto] max-[560px]:gap-2 max-[560px]:px-3">
            <span className="font-mono text-[11px] text-ink/48 tabular-nums">{c.time}</span>
            <div className="min-w-0">
              <div className="text-[13px] font-medium leading-snug min-[561px]:truncate">{c.intent}</div>
              <div className="text-[12px] text-ink/48 truncate flex items-center gap-1.5">
                {c.num}
                {c.late && <span className="text-blu max-[560px]:hidden">· po godzinach</span>}
              </div>
            </div>
            <span className="font-mono text-[11px] text-ink/40 tabular-nums max-[560px]:hidden">{c.dur}</span>
            <Chip tone={c.status.tone}>{c.status.label}</Chip>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DmThread() {
  return (
    <Panel className="max-w-[300px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/8">
        <InstagramIcon size={14} className="text-ink/64" />
        <span className="text-[13px] font-medium">anna.k</span>
        <span className="ml-auto font-mono text-[10px] text-ink/40">21:14</span>
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        <div className="self-start max-w-[85%] bg-depth rounded-2xl rounded-bl-md px-3 py-2 text-[12.5px]">
          Hej, ile kosztuje manicure hybrydowy? 💅
        </div>
        <div className="self-end max-w-[88%] bg-blu text-white rounded-2xl rounded-br-md px-3 py-2 text-[12.5px]">
          Cześć! 120 zł, ok. 60 min. W środę mamy wolne 9:00 lub 10:30 — rezerwuję?
        </div>
        <div className="self-start max-w-[85%] bg-depth rounded-2xl rounded-bl-md px-3 py-2 text-[12.5px]">
          9:00 poproszę 🙏
        </div>
        <div className="self-end mt-1">
          <Chip tone="green">Umówiona · śr 9:00</Chip>
        </div>
      </div>
    </Panel>
  );
}

const SLOTS = [
  { from: 14 * 60, to: 15 * 60 + 30, label: 'Koloryzacja · Ewa', fresh: false },
  { from: 15 * 60 + 45, to: 16 * 60 + 30, label: 'Strzyżenie · Marek', fresh: false },
  { from: 17 * 60, to: 17 * 60 + 45, label: 'Strzyżenie · Tomasz', fresh: true },
];

function DayView() {
  const start = 14 * 60;
  const end = 18 * 60 + 15;
  const pct = (m: number) => ((m - start) / (end - start)) * 100;
  return (
    <Panel className="max-w-[300px] p-3.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-medium">Jutro</span>
        <span className="font-mono text-[10px] text-ink/40 uppercase tracking-[0.06em]">Fotel 1</span>
      </div>
      <div className="relative h-[176px] ml-9">
        {[14, 15, 16, 17, 18].map((h) => (
          <div key={h} className="absolute left-0 right-0 border-t border-ink/[0.07]" style={{ top: `${pct(h * 60)}%` }}>
            <span className="absolute -left-9 -top-[7px] font-mono text-[10px] text-ink/40 tabular-nums">{h}:00</span>
          </div>
        ))}
        {SLOTS.map((s) => (
          <div
            key={s.label}
            className={`absolute left-1 right-0 rounded-md px-2 py-1 text-[11px] font-medium overflow-hidden ${
              s.fresh
                ? 'bg-blu text-white shadow-[0_0_0_4px_rgba(33,59,223,0.14)]'
                : 'bg-ink/[0.06] text-ink/64'
            }`}
            style={{ top: `${pct(s.from)}%`, height: `${pct(s.to) - pct(s.from)}%` }}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="truncate">{s.label}</span>
              {s.fresh && <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-white/80">Nowa</span>}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

const PRICES = [
  ['Strzyżenie damskie', '120 zł'],
  ['Strzyżenie męskie', '70 zł'],
  ['Koloryzacja', 'od 250 zł'],
  ['Manicure hybrydowy', '120 zł'],
];

function KnowledgeBase() {
  return (
    <Panel className="max-w-[300px] p-3.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-medium">Baza wiedzy</span>
        <Chip tone="blue">Aktualna</Chip>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink/40 mb-1.5">Cennik</div>
      <div className="flex flex-col gap-1.5 mb-3">
        {PRICES.map(([name, price]) => (
          <div key={name} className="flex items-baseline gap-2 text-[12.5px]">
            <span>{name}</span>
            <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-3px]" />
            <span className="tabular-nums font-medium">{price}</span>
          </div>
        ))}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink/40 mb-1.5">Godziny</div>
      <div className="text-[12.5px]">pn–pt 9:00–19:00 · sob 9:00–14:00</div>
    </Panel>
  );
}

const NOTES = [
  {
    time: '13:07',
    title: 'Podsumowanie rozmowy',
    body: 'Pani Karolina przełożyła wizytę z wtorku na czwartek, 15:00.',
    chip: null,
  },
  {
    time: '16:22',
    title: 'Do oddzwonienia',
    body: 'Klientka pyta o trwałą ondulację i prosi o kontakt z właścicielką.',
    chip: 'Dla Ciebie',
  },
];

function OwnerInbox() {
  return (
    <div className="w-full max-w-[300px] flex flex-col gap-2.5">
      {NOTES.map((n) => (
        <Panel key={n.time} className="p-3.5">
          <div className="flex items-center gap-2 mb-1.5">
            <img src="/icon.svg" alt="" className="w-5 h-5 rounded-[6px]" />
            <span className="text-[12px] font-medium">Receply</span>
            <span className="font-mono text-[10px] text-ink/40 tabular-nums">{n.time}</span>
            {n.chip && (
              <Chip tone="blue" className="ml-auto">
                {n.chip}
              </Chip>
            )}
          </div>
          <div className="text-[12.5px] font-medium">{n.title}</div>
          <div className="text-[12.5px] text-ink/64 leading-snug mt-0.5">{n.body}</div>
        </Panel>
      ))}
    </div>
  );
}

const EXTRAS = [
  { icon: AudioLines, title: 'Naturalny polski głos', desc: 'Płynna rozmowa, bez „wciśnij 1”.' },
  { icon: BellRing, title: 'Przypomnienia SMS', desc: 'Mniej zapomnianych wizyt.' },
  { icon: Clock, title: '24/7, także w święta', desc: 'Wieczory i weekendy w cenie.' },
  { icon: ShieldCheck, title: 'Dane w UE, zgodnie z RODO', desc: 'Szyfrowane, nikomu nieodsprzedawane.' },
];

export function FeaturesSection() {
  return (
    <Section id="funkcje" labelledBy="funkcje-title">
      <SectionHeading
        id="funkcje-title"
        eyebrow="Funkcje"
        title="Jedna recepcja na telefon, Instagram i kalendarz."
        muted="Bez etatu, urlopów i grafiku."
        sub="Receply nie jest infolinią z nagraniem. Prowadzi prawdziwe rozmowy i załatwia sprawy do końca — od pytania o cennik po wpis w kalendarzu."
      />

      <div className="grid grid-cols-3 gap-4 mt-14 max-[767px]:mt-10 max-[991px]:grid-cols-2 max-[680px]:grid-cols-1">
        <BentoCard
          className="col-span-2 max-[680px]:col-span-1"
          title="Odbiera każde połączenie"
          desc="Także wtedy, gdy masz ręce w farbie, jesteś u klienta albo jest 21:00. Odpowiada na pytania i od razu umawia."
        >
          <CallLog />
        </BentoCard>
        <BentoCard
          delay={80}
          className="max-[991px]:col-span-2 max-[680px]:col-span-1"
          title="Instagram na autopilocie"
          desc="Odpisuje na wiadomości w kilka sekund, o każdej porze. DM zamienia się w rezerwację."
        >
          <DmThread />
        </BentoCard>
        <BentoCard
          title="Umawia prosto do kalendarza"
          desc="Sprawdza wolne godziny i zapisuje wizytę w trakcie rozmowy. Bez podwójnych rezerwacji."
        >
          <DayView />
        </BentoCard>
        <BentoCard
          delay={80}
          title="Zna Twoją firmę"
          desc="Cennik, godziny, usługi i najczęstsze pytania. Odpowiada tak, jak Ty — tylko od razu."
        >
          <KnowledgeBase />
        </BentoCard>
        <BentoCard
          delay={160}
          className="max-[991px]:col-span-2 max-[680px]:col-span-1"
          title="Ważne sprawy trafiają do Ciebie"
          desc="Po każdej rozmowie krótkie podsumowanie. Nietypowe sprawy Receply przekazuje bezpośrednio Tobie."
        >
          <OwnerInbox />
        </BentoCard>
      </div>

      <Reveal className="mt-4">
        <div className="grid grid-cols-4 rounded-[20px] border border-ink/8 bg-white overflow-hidden max-[991px]:grid-cols-2 max-[480px]:grid-cols-1">
          {EXTRAS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3.5 p-6 -ml-px -mt-px border-l border-t border-ink/8"
            >
              <Icon size={18} strokeWidth={1.75} className="text-blu flex-none mt-0.5" aria-hidden />
              <div>
                <div className="text-[15px] font-medium">{title}</div>
                <div className="text-[13.5px] text-ink/64 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

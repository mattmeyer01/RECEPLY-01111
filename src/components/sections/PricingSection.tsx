// Cennik: jedyna ciemna sekcja strony. Jasna karta jedynego pakietu (cena
// promocyjna dla pierwszych 20 firm), obok uczciwe porównanie z etatem
// i pocztą głosową, pod spodem warunki wczesnego dostępu — dawna osobna
// sekcja bento połączona z cennikiem, żeby oferta była w jednym miejscu.
import { Check, DoorOpen, Handshake, Lock, MessagesSquare, Minus, X } from 'lucide-react';
import { Chip, PillButton, Reveal, Section, SectionHeading } from '@/lib/ui';

const START_FEATURES = [
  'Odbieranie połączeń telefonicznych 24/7',
  'Odpowiedzi na wiadomości i komentarze na Instagramie',
  'Umawianie wizyt w Twoim kalendarzu',
  'Baza wiedzy o Twojej firmie (cennik, godziny, FAQ)',
  'Podsumowania rozmów i powiadomienia o ważnych sprawach',
  'Wdrożenie 1:1 z zespołem Receply',
];

type Cell = { kind: 'yes' | 'no' | 'part'; note?: string } | { kind: 'text'; text: string; strong?: boolean };

const COMPARE: { label: string; cells: [Cell, Cell, Cell] }[] = [
  {
    label: 'Odbiera 24/7, także w weekendy',
    cells: [{ kind: 'yes' }, { kind: 'no', note: 'w godzinach pracy' }, { kind: 'part', note: 'tylko nagrywa' }],
  },
  {
    label: 'Rozmawia i umawia wizyty',
    cells: [{ kind: 'yes' }, { kind: 'yes' }, { kind: 'no' }],
  },
  {
    label: 'Odpisuje na Instagramie',
    cells: [{ kind: 'yes' }, { kind: 'part', note: 'gdy ma czas' }, { kind: 'no' }],
  },
  {
    label: 'Bez urlopów i zwolnień',
    cells: [{ kind: 'yes' }, { kind: 'no' }, { kind: 'yes' }],
  },
  {
    label: 'Koszt miesięczny',
    cells: [
      { kind: 'text', text: '299 zł', strong: true },
      { kind: 'text', text: 'kilka tysięcy zł' },
      { kind: 'text', text: '0 zł + utraceni klienci' },
    ],
  },
];

const PERKS = [
  { icon: Lock, title: 'Cena na stałe', desc: '299 zł zablokowane także po podwyżce do 399 zł.' },
  { icon: MessagesSquare, title: 'Kontakt z zespołem', desc: 'Rozmawiasz z ludźmi, którzy budują produkt.' },
  { icon: Handshake, title: 'Wpływ na rozwój', desc: 'Budujemy kolejne funkcje pod Twoje potrzeby.' },
  { icon: DoorOpen, title: 'Bez kar i prepaidów', desc: 'Rezygnujesz w każdej chwili, bez okresu wypowiedzenia.' },
];

function CellView({ cell }: { cell: Cell }) {
  if (cell.kind === 'text') {
    return <span className={cell.strong ? 'text-cream font-medium' : 'text-cream/64'}>{cell.text}</span>;
  }
  const icon =
    cell.kind === 'yes' ? (
      <span className="w-5 h-5 rounded-full bg-grn/20 text-grn flex items-center justify-center">
        <Check size={12} strokeWidth={3} aria-label="tak" />
      </span>
    ) : cell.kind === 'no' ? (
      <span className="w-5 h-5 rounded-full bg-cream/[0.06] text-cream/40 flex items-center justify-center">
        <X size={12} strokeWidth={3} aria-label="nie" />
      </span>
    ) : (
      <span className="w-5 h-5 rounded-full bg-cream/[0.06] text-cream/64 flex items-center justify-center">
        <Minus size={12} strokeWidth={3} aria-label="częściowo" />
      </span>
    );
  return (
    <span className="flex items-center gap-2">
      {icon}
      {cell.note && <span className="text-[12.5px] text-cream/48">{cell.note}</span>}
    </span>
  );
}

export function PricingSection() {
  return (
    <Section id="cennik" tone="dark" labelledBy="cennik-title">
      <SectionHeading
        id="cennik-title"
        tone="dark"
        eyebrow="Cennik"
        title="Jedna cena."
        muted="Bez prepaidów, doładowań i ukrytych opłat."
        sub="Płacisz miesiąc do miesiąca. Bez umowy długoterminowej — rezygnujesz w każdej chwili, bez kar umownych."
      />

      <div className="grid grid-cols-12 gap-4 mt-14 max-[767px]:mt-10 max-[991px]:grid-cols-1">
        {/* Pakiet */}
        <Reveal className="col-span-5 max-[991px]:col-span-1">
          <div className="h-full rounded-[20px] bg-white text-ink p-9 max-[767px]:p-6 flex flex-col">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-[22px] font-medium tracking-[-0.02em]">Pakiet Start</h3>
              <Chip tone="blue">Pierwsze 20 firm</Chip>
            </div>
            <p className="text-ink/64 text-[15px] mt-1">Dla małych firm, które nie chcą tracić klientów.</p>

            <div className="flex items-baseline gap-3 mt-8">
              <span className="text-[64px] leading-none font-medium tracking-[-0.05em] tabular-nums">299 zł</span>
              <span className="text-ink/48">/ mies.</span>
            </div>
            <div className="text-[14px] text-ink/48 mt-2">
              <span className="line-through">399 zł</span> — cena docelowa po wczesnym dostępie
            </div>

            <PillButton href="#cta" variant="blue" className="mt-8 w-full py-3.5">
              Zarezerwuj miejsce
            </PillButton>

            <ul className="flex flex-col gap-3 list-none p-0 m-0 mt-8 pt-8 border-t border-ink/8">
              {START_FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <Check size={16} strokeWidth={2.25} className="text-blu flex-none mt-[3px]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Porównanie */}
        <Reveal delay={120} className="col-span-7 max-[991px]:col-span-1">
          <div className="h-full rounded-[20px] border border-cream/10 bg-cream/[0.03] overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-[14px]">
              <caption className="text-left px-7 pt-7 pb-5 text-cream/64 text-[15px]">
                Porównaj z tym, co masz dziś.
              </caption>
              <thead>
                <tr className="text-left">
                  <th className="px-7 pb-4 font-normal w-[34%]" />
                  <th className="px-4 pb-4 font-medium text-cream bg-blu/20 rounded-t-xl">
                    <span className="flex items-center gap-2">
                      <img src="/icon.svg" alt="" className="w-5 h-5 rounded-[6px]" />
                      Receply
                    </span>
                  </th>
                  <th className="px-4 pb-4 font-normal text-cream/64">Recepcjonistka na etat</th>
                  <th className="px-4 pb-4 font-normal text-cream/64">Poczta głosowa</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, r) => (
                  <tr key={row.label} className="border-t border-cream/10">
                    <th scope="row" className="px-7 py-4 text-left font-normal text-cream/88">
                      {row.label}
                    </th>
                    {row.cells.map((c, i) => (
                      <td
                        key={i}
                        className={`px-4 py-4 ${i === 0 ? 'bg-blu/20' : ''} ${
                          i === 0 && r === COMPARE.length - 1 ? 'rounded-b-xl' : ''
                        }`}
                      >
                        <CellView cell={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-7 py-5 text-[12px] text-cream/40">
              Porównanie poglądowe. Koszt etatu zależy od miasta i wymiaru pracy.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Warunki wczesnego dostępu */}
      <Reveal className="mt-4">
        <div className="rounded-[20px] border border-cream/10 overflow-hidden">
          <div className="flex items-center justify-between gap-4 flex-wrap px-7 py-5 border-b border-cream/10">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-cream/64">
              Wczesny dostęp · warunki dla pierwszych 20 firm
            </span>
            <a href="mailto:kontakt@receply.com?subject=Receply%20—%20wczesny%20dostęp" className="text-[14px] text-cream/72 hover:text-cream">
              Pytania? kontakt@receply.com
            </a>
          </div>
          <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[480px]:grid-cols-1">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3.5 px-7 py-6 -ml-px -mt-px border-l border-t border-cream/10">
                <Icon size={18} strokeWidth={1.75} className="text-cream/72 flex-none mt-0.5" aria-hidden />
                <div>
                  <div className="text-[15px] font-medium">{title}</div>
                  <div className="text-[13.5px] text-cream/56 mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

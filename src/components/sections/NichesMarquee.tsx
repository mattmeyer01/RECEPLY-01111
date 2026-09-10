// „Dla kogo": zapętlony marquee chipów branż z gradientowymi maskami na
// krawędziach (wzorzec BYQ Truebase Value & Features 1 — logo marquee),
// zamiast logotypów klientów (produkt przedsprzedażowy) — nisze docelowe.
import { Reveal } from '@/lib/ui';

const NICHES = [
  '💇 Salony fryzjerskie i kosmetyczne',
  '🏋️ Siłownie i trenerzy personalni',
  '🔧 Warsztaty samochodowe',
  '🦷 Gabinety stomatologiczne i medyczne',
  '📸 Fotografowie',
  '🏨 Hotele i pokoje na wynajem',
  '🎂 Cukiernie i catering',
  '🔨 Hydraulicy, elektrycy i inni fachowcy',
];

function ChipSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex gap-3 flex-none pr-3" aria-hidden={ariaHidden}>
      {NICHES.map((n) => (
        <span
          key={n}
          className="inline-flex items-center whitespace-nowrap rounded-full bg-white border border-ink/8 px-5 py-2.5 text-[14px]"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

export function NichesMarquee() {
  return (
    <section id="dla-kogo" className="py-20 max-[767px]:py-12 border-y border-ink/8">
      <Reveal className="text-center mb-10">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink/64">
          Zbudowany dla firm, do których klienci dzwonią i piszą
        </span>
      </Reveal>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-cream to-transparent pointer-events-none" />
        <div className="flex animate-marquee w-max">
          <ChipSet />
          <ChipSet ariaHidden />
        </div>
      </div>
    </section>
  );
}

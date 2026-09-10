// Problem: adaptacja wzorca BYQ Kelvin Process 1 — eyebrow z kropką,
// dwutonowy nagłówek, kolumny z dużymi mono liczbami i przygaszonym opisem.
import { Reveal } from '@/lib/ui';

const STATS = [
  {
    value: '60%+',
    title: 'klientów nie próbuje drugi raz',
    desc: 'Gdy nikt nie odbiera, większość dzwoniących wybiera następny numer z Google — czyli Twoją konkurencję.',
    note: '* Wartość powszechnie cytowana w branży, nie oficjalna statystyka.',
  },
  {
    value: '24/7',
    title: 'tyle dziś oczekują klienci',
    desc: 'Ludzie piszą i dzwonią wieczorami, w weekendy, w święta. Kto odpowiada pierwszy, ten zgarnia rezerwację.',
    note: '* Obserwacja z rynku usług lokalnych, nie zweryfikowane badanie.',
  },
  {
    value: '0 osób',
    title: 'na etacie do telefonu i DM-ów',
    desc: 'W małej firmie nikt nie siedzi przy słuchawce. Odbierasz między klientami — albo wcale. Recepcjonistka na etat to kilka tysięcy miesięcznie.',
    note: null,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-28 max-[767px]:py-16">
      <div className="max-w-[1140px] mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-blu" />
            <span className="font-mono text-xs font-medium tracking-[0.15em] uppercase text-ink/64">Problem</span>
          </div>
          <h2 className="font-medium text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.12] tracking-[-0.02em] max-w-[720px]">
            Nieodebrany telefon <span className="text-ink/40">to klient, który dzwoni do konkurencji.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-10 mt-16 max-[900px]:grid-cols-1 max-[900px]:gap-10 border-t border-ink/8 pt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 120}>
              <div className="font-mono font-medium text-[3rem] leading-none tracking-[-0.02em] text-blu mb-4">
                {s.value}
              </div>
              <h3 className="text-lg font-medium mb-2">{s.title}</h3>
              <p className="text-[15px] text-ink/64 leading-relaxed">{s.desc}</p>
              {s.note && <p className="text-xs text-ink/40 mt-4">{s.note}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

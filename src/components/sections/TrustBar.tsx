// Pasek zaufania: mono etykiety w jednej linii (wzorzec labeli IBM Plex Mono
// z kolekcji Nextwell/Kelvin — uppercase, tracking, kropkowe separatory).
// Ikony liniowe Lucide zamiast emoji — emoji renderują się różnie na każdym
// systemie (np. flaga UE na Windowsie to same litery „EU").
import { CalendarX, Globe, Lock, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/lib/ui';

const ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Globe, label: 'Dane przetwarzane w UE' },
  { icon: ShieldCheck, label: 'Zgodność z RODO' },
  { icon: Lock, label: 'Szyfrowana komunikacja' },
  { icon: CalendarX, label: 'Brak umowy długoterminowej' },
];

export function TrustBar() {
  return (
    <div className="border-t border-ink/8">
      <Reveal className="max-w-[1180px] mx-auto px-6 min-[1240px]:px-10 min-[1240px]:border-x border-ink/8 py-5 flex items-center justify-between gap-4 flex-wrap max-[767px]:justify-start">
        {ITEMS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/64"
          >
            <Icon size={14} strokeWidth={1.75} className="text-blu flex-none" aria-hidden />
            {label}
          </span>
        ))}
      </Reveal>
    </div>
  );
}

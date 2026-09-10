// Pasek zaufania: mono etykiety w jednej linii (wzorzec labeli IBM Plex Mono
// z kolekcji Nextwell/Kelvin — uppercase, tracking, kropkowe separatory).
import { Reveal } from '@/lib/ui';

const ITEMS = ['🇪🇺 Dane przetwarzane w UE', '🔒 Zgodność z RODO', '🛡️ Szyfrowana komunikacja', '📄 Brak umowy długoterminowej'];

export function TrustBar() {
  return (
    <div className="border-y border-ink/8 py-5">
      <Reveal className="max-w-[1140px] mx-auto px-6 flex items-center justify-between gap-4 flex-wrap max-[767px]:justify-start">
        {ITEMS.map((item) => (
          <span key={item} className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/64">
            {item}
          </span>
        ))}
      </Reveal>
    </div>
  );
}

// Demo: „Posłuchaj" — główny dowód na „naturalny głos po polsku" z hero.
// Cztery nagrania w zakładkach (rezerwacja, cena, przełożenie, po godzinach);
// klik w zakładkę od razu odtwarza rozmowę. Odtwarzacz z prawdziwą falą
// nagrania (kolor = kto mówi, klik przewija), transkrypcja z podświetlaniem
// bieżącej kwestii (klik w kwestię odtwarza ją), a po prawej „Po rozmowie" —
// skutki zapalają się w rytmie nagrania. Bez interakcji wszystko jest widoczne.
import * as React from 'react';
import { Pause, PhoneIncoming, Play } from 'lucide-react';
import { CALLS } from '@/components/sections/demoCalls';
import { Card, Chip, Reveal, Section, SectionHeading } from '@/lib/ui';

// Przycisk „Posłuchaj przykładowej rozmowy" w hero wysyła to zdarzenie,
// a odtwarzacz startuje bieżące nagranie (w ramach tego samego kliknięcia).
export const PLAY_CALL_EVENT = 'receply:play-call';

// Zaokrąglanie (nie obcinanie), żeby długość w zakładce zgadzała się z „26 s"
const formatTime = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

export function DemoSection() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(CALLS[0].duration);
  const call = CALLS[active];
  const started = playing || time > 0;
  const ended = !playing && time >= duration - 0.05;

  // Źródło ustawiane imperatywnie: zmiana atrybutu src przez React w trakcie
  // przełączania zakładki przerwałaby odtwarzanie rozpoczęte w kliknięciu.
  React.useEffect(() => {
    if (audioRef.current) audioRef.current.src = CALLS[0].audio;
  }, []);

  // Płynny postęp: rAF tylko w trakcie odtwarzania
  React.useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      if (audioRef.current) setTime(audioRef.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const play = React.useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false));
  }, []);

  React.useEffect(() => {
    window.addEventListener(PLAY_CALL_EVENT, play);
    return () => window.removeEventListener(PLAY_CALL_EVENT, play);
  }, [play]);

  // Klik w zakładkę od razu odtwarza rozmowę; strzałki tylko przełączają
  const select = (i: number, andPlay = true) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (i !== active) {
      audio.pause();
      audio.src = CALLS[i].audio;
      setActive(i);
      setTime(0);
      setDuration(CALLS[i].duration);
    }
    if (andPlay) play();
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  };

  const seek = (t: number, andPlay = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(t, 0), duration);
    setTime(audio.currentTime);
    if (andPlay) play();
  };

  const onWaveClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - rect.left) / rect.width) * duration);
  };

  const onWaveKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -2, ArrowRight: 2, ArrowDown: -2, ArrowUp: 2 };
    if (e.key in steps) seek(time + steps[e.key]);
    else if (e.key === 'Home') seek(0);
    else if (e.key === 'End') seek(duration);
    else if (e.key === ' ' || e.key === 'Enter') toggle();
    else return;
    e.preventDefault();
  };

  // Strzałki przełączają zakładki (wzorzec ARIA tabs)
  const onTabKey = (e: React.KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + CALLS.length) % CALLS.length;
    tabRefs.current[next]?.focus();
    select(next, false);
  };

  // Indeks kwestii, która właśnie brzmi (w przerwie — ostatnia wypowiedziana)
  let current = -1;
  if (started) {
    call.lines.forEach((line, i) => {
      if (line.start <= time) current = i;
    });
  }
  const speakerAt = (t: number) => call.lines.find((l) => t >= l.start && t <= l.end)?.from ?? null;

  const status = playing
    ? 'Receply rozmawia'
    : ended
      ? 'Posłuchaj jeszcze raz'
      : started
        ? 'Wstrzymano'
        : 'Posłuchaj rozmowy';

  return (
    <Section id="demo" labelledBy="demo-title">
      <SectionHeading
        id="demo-title"
        align="center"
        eyebrow="Posłuchaj"
        title="Brzmi jak Twoja najlepsza recepcjonistka."
        muted="Tylko nigdy nie ma wolnego."
        sub="Cztery przykładowe rozmowy z salonem fryzjerskim. Wybierz sytuację — od telefonu do wpisu w kalendarzu w niecałe pół minuty."
      />

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={(e) => {
          setPlaying(false);
          setTime(e.currentTarget.currentTime);
        }}
        onEnded={(e) => {
          setPlaying(false);
          setTime(e.currentTarget.duration);
        }}
      />

      <Reveal delay={80} className="mt-12 max-[767px]:mt-8">
        <div
          role="tablist"
          aria-label="Przykładowe rozmowy"
          onKeyDown={onTabKey}
          className="grid grid-cols-4 gap-2 max-[991px]:flex max-[991px]:overflow-x-auto max-[991px]:-mx-6 max-[991px]:px-6 [scrollbar-width:none]"
        >
          {CALLS.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`call-tab-${c.id}`}
                aria-selected={selected}
                aria-controls="rozmowa"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={`flex-none flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blu ${
                  selected ? 'bg-white border border-blu/40 shadow-[0_0_0_3px_rgba(33,59,223,0.08)]' : 'border border-ink/8 hover:bg-white/60'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-none ${
                      selected ? 'bg-blu text-white' : 'bg-ink/[0.06] text-ink/64'
                    }`}
                  >
                    {selected && playing ? (
                      <span className="flex items-center gap-[2px] h-3" aria-hidden>
                        {[0.6, 1, 0.7].map((h, b) => (
                          <span key={b} className="wave-bar w-[2px] rounded-full bg-white" style={{ height: `${h * 100}%`, animationDelay: `${b * 0.12}s` }} />
                        ))}
                      </span>
                    ) : (
                      <Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-px" aria-hidden />
                    )}
                  </span>
                  <span className="text-[14px] font-medium whitespace-nowrap">{c.tab}</span>
                </span>
                <span className="font-mono text-[11px] text-ink/40 tabular-nums">{formatTime(c.duration)}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        id="rozmowa"
        role="tabpanel"
        aria-labelledby={`call-tab-${call.id}`}
        className="scroll-mt-28 grid grid-cols-12 gap-4 mt-4 max-[991px]:grid-cols-1"
      >
        {/* Odtwarzacz + transkrypcja */}
        <Reveal className="col-span-8 max-[991px]:col-span-1">
          <Card className="overflow-hidden h-full">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-ink/8 max-[767px]:px-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex-none w-9 h-9 rounded-full bg-blu/10 text-blu flex items-center justify-center">
                  <PhoneIncoming size={16} strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="text-[15px] font-medium truncate">Połączenie przychodzące</div>
                  <div className="text-[13px] text-ink/48 truncate">Salon Anna · {call.caller}</div>
                </div>
              </div>
              <Chip>Przykład</Chip>
            </div>

            <div className="flex items-center gap-5 px-6 py-6 max-[767px]:px-5 max-[767px]:gap-4">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? 'Wstrzymaj nagranie rozmowy' : 'Odtwórz nagranie rozmowy'}
                className="flex-none w-14 h-14 rounded-full bg-blu text-white flex items-center justify-center cursor-pointer shadow-[0_8px_20px_-6px_rgba(33,59,223,0.55)] transition-[background-color,transform] duration-300 hover:bg-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blu"
              >
                {playing ? (
                  <Pause size={20} fill="currentColor" strokeWidth={0} aria-hidden />
                ) : (
                  <Play size={20} fill="currentColor" strokeWidth={0} className="translate-x-px" aria-hidden />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 font-mono text-[11px] max-[480px]:text-[10px] font-medium uppercase tracking-[0.08em] max-[480px]:tracking-[0.04em] text-ink/64 mb-2.5 whitespace-nowrap">
                  <span className="truncate">{status}</span>
                  <span className="tabular-nums text-ink/48">
                    {formatTime(time)} / {formatTime(duration)}
                  </span>
                </div>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Przewiń nagranie rozmowy"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration)}
                  aria-valuenow={Math.round(time)}
                  aria-valuetext={`${formatTime(time)} z ${formatTime(duration)}`}
                  onClick={onWaveClick}
                  onKeyDown={onWaveKey}
                  className="flex items-center gap-px min-[480px]:gap-[2px] h-12 cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blu"
                >
                  {call.wave.map((h, i) => {
                    const t = ((i + 0.5) / call.wave.length) * duration;
                    const who = speakerAt(t);
                    const played = started && t <= time;
                    const color =
                      who === 'receply'
                        ? played
                          ? 'bg-blu'
                          : 'bg-blu/25'
                        : who === 'klient'
                          ? played
                            ? 'bg-ink'
                            : 'bg-ink/20'
                          : 'bg-ink/12';
                    return (
                      <span
                        key={i}
                        className={`flex-1 min-w-px rounded-full transition-colors duration-150 ${color}`}
                        style={{ height: `${h * 100}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blu" /> Receply
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink" /> Klient
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-ink/8 px-3 py-3 max-[767px]:px-2">
              {call.lines.map((line, i) => {
                const upcoming = started && i > current;
                const now = started && i === current;
                return (
                  <button
                    key={`${call.id}-${i}`}
                    type="button"
                    onClick={() => seek(line.start, true)}
                    className={`w-full grid grid-cols-[72px_1fr] max-[480px]:grid-cols-[58px_1fr] gap-4 max-[480px]:gap-3 text-left rounded-xl px-3 py-2.5 cursor-pointer transition-colors duration-300 hover:bg-cream focus-visible:outline-2 focus-visible:outline-blu ${
                      now ? 'bg-cream' : ''
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-medium uppercase tracking-[0.08em] pt-[5px] ${
                        line.from === 'receply' ? 'text-blu' : 'text-ink/48'
                      }`}
                    >
                      {line.from === 'receply' ? 'Receply' : 'Klient'}
                    </span>
                    <span
                      className={`text-[15px] leading-relaxed transition-colors duration-300 ${
                        upcoming ? 'text-ink/28' : 'text-ink'
                      }`}
                    >
                      {line.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </Reveal>

        {/* Skutki rozmowy */}
        <Reveal delay={120} className="col-span-4 max-[991px]:col-span-1 flex flex-col gap-4">
          <Card className="p-6 max-[767px]:p-5 flex-1">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/48 mb-5">
              Po rozmowie
            </div>
            <ol key={call.id} className="relative flex flex-col gap-5 list-none p-0 m-0">
              <span aria-hidden className="absolute left-[17px] top-4 bottom-4 w-px bg-ink/8" />
              {call.outcomes.map((o) => {
                const done = !started || time >= o.at;
                const Icon = o.icon;
                return (
                  <li key={o.title} className="relative flex gap-3.5">
                    <span
                      className={`relative flex-none w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-500 ${
                        done ? 'bg-blu text-white' : 'bg-cream text-ink/28 border border-ink/8'
                      }`}
                    >
                      <Icon size={16} strokeWidth={2} aria-hidden />
                    </span>
                    <div className={`min-w-0 pt-0.5 transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-40'}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-medium">{o.title}</span>
                        {done && <Chip tone={o.chip.tone}>{o.chip.label}</Chip>}
                      </div>
                      <div className="text-[13.5px] text-ink/64 mt-0.5">{o.detail}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card className="p-6 max-[767px]:p-5">
            <div className="text-[44px] leading-none font-medium tracking-[-0.045em] tabular-nums">{call.stat.value}</div>
            <p className="text-[15px] text-ink/64 mt-3 leading-relaxed">{call.stat.text}</p>
          </Card>
        </Reveal>
      </div>

      <p className="text-center text-[13px] text-ink/48 mt-6">
        Przykładowe rozmowy przygotowane na potrzeby strony.
      </p>
    </Section>
  );
}

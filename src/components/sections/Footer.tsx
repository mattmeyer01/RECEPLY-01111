// Stopka: prosty wariant w języku wizualnym Nextwell — logo, mono metryczki,
// linki, linia podziału.
export function Footer() {
  return (
    <footer className="border-t border-ink/8 py-10">
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between gap-4 flex-wrap max-[767px]:flex-col max-[767px]:text-center">
        <a href="#" className="flex items-center no-underline">
          <img src="/logo.svg" alt="Receply" className="h-[18px] w-auto" />
        </a>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/40">
          AI recepcjonista dla małych firm w Polsce
        </span>
        <span className="text-sm text-ink/64">
          © 2026 Receply ·{' '}
          <a href="https://receply.com" className="hover:text-ink">receply.com</a> ·{' '}
          <a href="mailto:kontakt@receply.com" className="hover:text-ink">kontakt@receply.com</a>
        </span>
      </div>
    </footer>
  );
}

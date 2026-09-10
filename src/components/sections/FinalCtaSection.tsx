// Finalne CTA: adaptacja BYQ Babka CTA 3 — zaokrąglona karta z pełnym tłem
// obrazkowym (ilustracja hero z Higgsfield), ciemny scrim, parallax obrazu
// przy scrollu, wielki biały nagłówek i frosted-glass pasek z pigułkowym CTA.
import * as React from 'react';

export function FinalCtaSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [btnHovered, setBtnHovered] = React.useState(false);

  // Parallax obrazu (Babka: przesunięcie ~60px zależne od scrolla)
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      if (!imgRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      imgRef.current.style.transform = `scale(1.12) translateY(${progress * 60}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const enter = (delay: number) =>
    ({
      transitionDelay: `${delay}ms`,
    }) as React.CSSProperties;

  return (
    <section ref={sectionRef} id="cta" className="py-28 max-[767px]:py-16">
      <div className="max-w-[1240px] mx-auto px-6 max-[767px]:px-4">
        <div className="relative overflow-hidden rounded-[20px] min-h-[640px] max-[767px]:min-h-[560px] flex flex-col justify-center">
          <img
            ref={imgRef}
            src="/hero.jpg"
            alt="Ilustracja: AI recepcjonista Receply odbiera połączenie i odpowiada na wiadomości na Instagramie"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.12)' }}
          />
          <div className="absolute inset-0 bg-black/45" />

          <div ref={innerRef} className="relative z-[1] py-20 px-8 max-[479px]:px-5">
            <div className="flex flex-col items-center text-center gap-4 max-w-[880px] mx-auto">
              <h2
                className={`m-0 text-white font-medium leading-[1.05] text-[clamp(2.2rem,5vw,4.4rem)] tracking-[-0.03em] transition-all duration-700 ease-out ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={enter(0)}
              >
                Przestań tracić klientów,
                <br />
                których już masz na linii.
              </h2>
              <p
                className={`m-0 text-white/88 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed max-w-[560px] transition-all duration-700 ease-out ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={enter(120)}
              >
                Napisz do nas — odpowiemy tego samego dnia i umówimy krótką, bezpłatną rozmowę
                o Twojej firmie.
              </p>

              {/* Frosted-glass pasek CTA (Babka) */}
              <div
                className={`flex flex-row justify-between items-center w-full gap-6 mt-16 max-[767px]:mt-10 backdrop-blur-[16px] bg-white/12 border border-white/18 rounded-full py-3 pl-8 pr-3 max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:rounded-[20px] max-[767px]:p-4 max-[767px]:gap-4 transition-all duration-700 ease-out ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={enter(240)}
              >
                <img
                  src="/logo-white.svg"
                  alt="Receply"
                  className="h-6 w-auto max-[767px]:h-5 max-[767px]:mx-auto"
                />
                <div className="flex flex-row flex-wrap items-center gap-4 max-[767px]:flex-col max-[767px]:items-stretch">
                  <div className="text-white/72 text-[15px] max-[767px]:text-center">
                    kontakt@receply.com · bez zobowiązań
                  </div>
                  <a
                    href="mailto:kontakt@receply.com?subject=Receply%20—%20bezpłatna%20rozmowa"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    className={`inline-flex justify-center items-center gap-2 font-medium text-[15px] text-white no-underline rounded-full px-7 py-3.5 transition-colors duration-300 ${
                      btnHovered ? 'bg-black' : 'bg-blu'
                    }`}
                  >
                    Umów bezpłatną rozmowę
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

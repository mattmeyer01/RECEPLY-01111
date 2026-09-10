// Landing Receply — każda sekcja zaadaptowana z komponentu BYQ Supply:
// Navbar        → Truebase Navigation Bar 1 (pływająca pigułka z blur)
// HeroSection   → Evermind Hero 5 + parallax z Babka Image Gallery 4
// TrustBar      → mono etykiety (Nextwell/Kelvin labels)
// ProblemSection→ Kelvin Process 1 (mono liczby, dwutonowy nagłówek)
// DemoSection   → Nextwell Value & Features 3 (kafle z widgetami UI)
// FeaturesSection→ Nextwell Value & Features 7 (sticky headline + karty)
// NichesMarquee → Truebase Value & Features 1 (logo marquee)
// CalculatorSection → widget w języku Nextwell (interakcja z briefu)
// ProcessSection→ Kelvin Process 1 (oś czasu z wypełnieniem)
// EarlyAccessSection → Truebase Bento 1 (bento + count-up)
// PricingSection→ Nextwell Pricing 2 (jasna + czarna karta na ciemnym tle)
// FaqSection    → Reforma FAQ 1 (wycentrowany akordeon)
// FinalCtaSection → Babka CTA 3 (karta z obrazem, scrim, frosted bar)
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { NichesMarquee } from '@/components/sections/NichesMarquee';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { EarlyAccessSection } from '@/components/sections/EarlyAccessSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <DemoSection />
        <FeaturesSection />
        <NichesMarquee />
        <CalculatorSection />
        <ProcessSection />
        <EarlyAccessSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}

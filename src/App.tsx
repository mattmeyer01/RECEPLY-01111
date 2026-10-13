// Landing Receply. Hero (BYQ Evermind Hero 5 + parallax z Babka Image
// Gallery 4) zostaje bez zmian; wszystko poniżej to jeden system sekcji
// z src/lib/ui.tsx — wspólna ramka z liniami włoskowymi, mono etykiety
// i białe karty-widgety z makietami produktu w języku pływających kart z hero.
// Kolejność: problem → koszt → dowód (nagranie) → funkcje → branże →
// wdrożenie → oferta → obiekcje → CTA.
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
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
        <CalculatorSection />
        <DemoSection />
        <FeaturesSection />
        <IndustriesSection />
        <ProcessSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}

import {
  CreativeFusionHero,
  ServicesSection,
  HorizontalPortfolioSection,
  ClientsSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="bg-core-black">
      <CreativeFusionHero />
      <ServicesSection />
      <HorizontalPortfolioSection />
      <ClientsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

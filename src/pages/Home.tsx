import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { SpecialsSection } from "@/components/sections/SpecialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ReservationsSection } from "@/components/sections/ReservationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { CartPanel } from "@/components/cart/CartPanel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartPanel />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <SpecialsSection />
        <GallerySection />
        <ReservationsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
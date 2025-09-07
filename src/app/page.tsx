import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ArtistsSection from '@/components/sections/artists-section';
import GallerySection from '@/components/sections/gallery-section';
import ContactSection from '@/components/sections/contact-section';
import LocationSection from '@/components/sections/location-section';
import FaqSection from '@/components/sections/faq-section';
import { getHeroText } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroText = await getHeroText();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection heroText={heroText} />
        <AboutSection />
        <ArtistsSection />
        <GallerySection />
        <ContactSection />
        <LocationSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

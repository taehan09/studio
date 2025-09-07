import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ArtistsSection from '@/components/sections/artists-section';
import GallerySection from '@/components/sections/gallery-section';
import ContactSection from '@/components/sections/contact-section';
import LocationSection from '@/components/sections/location-section';
import FaqSection from '@/components/sections/faq-section';
import { getHeroText as getHeroTextServer } from '@/lib/firebase-admin';

// Fetch initial data on the server to avoid flickering on the client.
// The client will then subscribe to real-time updates.
export default async function Home() {
  const initialHeroText = await getHeroTextServer();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection initialHeroText={initialHeroText} />
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

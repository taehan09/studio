import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center text-white">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Tattoo studio ambiance"
        data-ai-hint="tattoo studio"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-lg">
          InkFlow Studio
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
          Where art and skin become one. Crafting timeless tattoos with passion and precision.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">
            <Link href="#contact">Book a Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

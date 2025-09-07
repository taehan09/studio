import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mouse } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center text-white">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Tattoo studio ambiance"
        data-ai-hint="tattoo studio dark"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">
          Ashgray Ink, a Tattoo and Piercing Studio in Toronto
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
          Experience world-class tattoo art in Toronto with internationally recognized artists.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors duration-300">
            <Link href="#contact">MAKE AN APPOINTMENT</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2">
        <span className="text-sm tracking-widest">SCROLL DOWN</span>
        <div className="w-6 h-10 border-2 rounded-full flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

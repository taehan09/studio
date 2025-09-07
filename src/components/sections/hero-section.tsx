import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col text-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/ashgrayink-shop.firebasestorage.app/o/Hero%20Section%2Fu9865814416_A_cinematic_scene_of_a_tattoo_artist_at_work_in_a_7bbc8082-d8c1-4443-8107-69830af6d702_0.mp4?alt=media&token=c88369ab-bb9e-4bf6-b759-23f34f4196b8" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4">
        <div className="transform translate-y-20">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight font-headline">
            Ashgray Ink
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-none">
            Experience world-class tattoo art in Toronto with internationally recognized artists.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
          <div className="flex-grow-[3] flex items-center justify-center">
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-base font-semibold tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                  <Link href="#contact">MAKE AN APPOINTMENT</Link>
              </Button>
          </div>
          <div className="w-full pb-12 flex-grow-[0.5] flex flex-col items-center justify-end">
              <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm tracking-widest">SCROLL DOWN</span>
                  <div className="w-6 h-10 border-2 rounded-full flex justify-center items-start p-1">
                      <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;

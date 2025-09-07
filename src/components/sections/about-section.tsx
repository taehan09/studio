import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="wow-outer">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Image
                  src="https://picsum.photos/600/700"
                  alt="Inside of the tattoo studio"
                  data-ai-hint="tattoo shop"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </CardContent>
            </Card>
          </div>
          <div className="wow-outer">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg text-foreground/80 mb-4">
              Founded in 2010, InkFlow Studio was born from a passion for transformative art. We believe that a tattoo is more than just ink; it's a personal story, a mark of individuality, and a piece of art that you carry forever.
            </p>
            <p className="text-foreground/70 mb-4">
              Our philosophy is rooted in collaboration and craftsmanship. We work closely with each client to bring their vision to life, ensuring a unique and meaningful experience from consultation to final touch-up.
            </p>
            <p className="text-foreground/70">
              We are committed to the highest standards of safety and hygiene, creating a clean, comfortable, and welcoming environment for everyone who walks through our doors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
    { value: '10+', label: 'Years of Excellence' },
    { value: '8,000+', label: 'Satisfied Clients' },
    { value: '5', label: 'World-Class Artists' },
    { value: '5', label: 'Client Rated', icon: Star },
];


const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="wow-outer md:col-span-2">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h2>
            <div className="text-foreground/80 space-y-4 text-base">
                <p>
                Founded in 2010, Ashgray Ink has become a cornerstone of the Toronto tattoo scene. We are a collective of passionate, multi-award-winning artists dedicated to creating unique, high-quality tattoos in a clean, welcoming, and professional environment. Our artists specialize in a wide range of styles, from traditional and neo-traditional to blackwork, realism, and fine-line.
                </p>
                <p>
                We believe that every tattoo tells a story, and we are committed to making the journey as memorable as the art itself. From the initial consultation where we turn your ideas into a custom design, to our meticulous aftercare guidance, we ensure a collaborative and safe experience. Our strict adherence to the highest standards of hygiene and safety is our promise to you.
                </p>
                <p>
                Are you ready to transform your vision into a work of art? We invite you to explore our portfolios and book a consultation. Let's create something beautiful together.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                    <div key={stat.label}>
                    <p className="text-4xl font-bold text-primary flex items-center justify-center">
                        {stat.value}
                        {stat.icon && <stat.icon className="w-6 h-6 ml-1 fill-current" />}
                    </p>
                    <p className="text-sm text-foreground/70 mt-2 tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>
          </div>
          <div className="wow-outer md:col-span-3">
            <Card className="overflow-hidden shadow-lg border-border relative bg-card">
              <CardContent className="p-0">
                <Image
                  src="https://picsum.photos/600/800"
                  alt="Tattoo artist working on a black and gray realism tattoo"
                  data-ai-hint="tattoo artist realism"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <p className="text-2xl font-semibold text-white/80 tracking-widest">BLACK & GRAY</p>
                    <h3 className="text-6xl font-bold text-white mt-2">REALISM</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

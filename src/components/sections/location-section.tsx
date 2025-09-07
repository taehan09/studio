import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LocationSection = () => {
  return (
    <section id="location" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Visit our studio in the heart of the city.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <Card className="shadow-lg border-border">
            <CardContent className="p-8 flex flex-col justify-center">
              <h3 className="font-headline text-2xl font-semibold text-primary mb-6">Ashgray Ink</h3>
              <div className="space-y-4 text-foreground/80">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 text-accent flex-shrink-0" />
                  <span>123 Artistry Avenue, Toronto, ON M5V 2H2</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-4 text-accent" />
                  <span>(416) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-4 text-accent" />
                  <span>contact@ashgray.ink</span>
                </div>
              </div>
               <h4 className="font-headline text-xl font-semibold text-primary mt-8 mb-4">Hours</h4>
               <ul className="space-y-1 text-foreground/80">
                  <li>Tuesday - Saturday: 11am - 8pm</li>
                  <li>Sunday & Monday: Closed</li>
               </ul>
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-lg border-border">
             <Image
                src="https://picsum.photos/800/600"
                alt="Map showing location of Ashgray Ink Studio"
                data-ai-hint="city map"
                width={800}
                height={600}
                className="w-full h-full object-cover"
             />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

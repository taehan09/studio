import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InfoBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h4 className="font-headline text-lg font-semibold text-primary tracking-widest mb-3">{title}</h4>
        <div className="space-y-2 text-foreground/80">
            {children}
        </div>
    </div>
);

const LocationSection = () => {
  return (
    <section id="location" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary">VISIT OUR STUDIO</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Visit us at our flagship studio in the heart of downtown Toronto.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Map */}
          <div className="w-full h-[400px] lg:h-[600px] relative">
             <Image
                src="https://firebasestorage.googleapis.com/v0/b/ashgrayink-shop.firebasestorage.app/o/KakaoTalk_20250908_014322186.png?alt=media&token=71929ef1-c374-495d-bf3f-bede62d9216c"
                alt="Map view of 123 Yonge Street, Toronto"
                data-ai-hint="city map"
                fill
                className="w-full h-full object-cover rounded-lg shadow-lg"
             />
          </div>

          {/* Right Column: Info */}
          <div className="space-y-10">
            <div className='grid sm:grid-cols-2 gap-10'>
                <InfoBlock title="ADDRESS">
                    <p>123 Yonge Street, <br/>Toronto, ON M5C 2V6</p>
                </InfoBlock>

                <InfoBlock title="HOURS">
                    <div className='flex justify-between'><span>Monday - Saturday</span> <span>10:00 AM - 9:00 PM</span></div>
                    <div className='flex justify-between'><span>Sunday</span> <span>Closed</span></div>
                    <div className='flex justify-between'><span>Consultations</span> <span>By Appointment Only</span></div>
                </InfoBlock>
            </div>
            
             <InfoBlock title="CONTACT">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                  <span>(416) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                  <span>contact@ashgray.ink</span>
                </div>
            </InfoBlock>

            <InfoBlock title="ADDITIONAL CONTACT">
                <p>Inquiries: inquiries@ashgray.ink</p>
                <p>Artists: artists@ashgray.ink</p>
                <p>Careers: careers@ashgray.ink</p>
            </InfoBlock>

             <InfoBlock title="GETTING HERE">
                <p><b>Subway:</b> Steps from Dundas Station</p>
                <p><b>Parking:</b> Nearby paid garages available</p>
                <p><b>Walking:</b> In the heart of downtown Toronto</p>
            </InfoBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

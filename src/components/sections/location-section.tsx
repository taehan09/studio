// src/components/sections/location-section.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { getLocationInfo, type LocationInfo } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const InfoBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h4 className="font-headline text-lg font-semibold text-primary tracking-widest mb-3">{title}</h4>
        <div className="space-y-2 text-foreground/80">
            {children}
        </div>
    </div>
);

const defaultLocationInfo: LocationInfo = {
    title: "VISIT OUR STUDIO",
    subtitle: "Visit us at our flagship studio in the heart of downtown Toronto.",
    address: "123 Yonge Street, \nToronto, ON M5C 2V6",
    hoursMonSat: "10:00 AM - 9:00 PM",
    hoursSun: "Closed",
    hoursConsultations: "By Appointment Only",
    phone: "(416) 123-4567",
    email: "contact@ashgray.ink",
    inquiriesEmail: "inquiries@ashgray.ink",
    artistsEmail: "artists@ashgray.ink",
    careersEmail: "careers@ashgray.ink",
    subwayInfo: "Steps from Dundas Station",
    parkingInfo: "Nearby paid garages available",
    walkingInfo: "In the heart of downtown Toronto",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/ashgrayink-shop.firebasestorage.app/o/KakaoTalk_20250908_014322186.png?alt=media&token=71929ef1-c374-495d-bf3f-bede62d9216c",
    imageHint: "city map street"
};


const LocationSection = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getLocationInfo((info) => {
      setLocationInfo(info ?? defaultLocationInfo);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const currentInfo = locationInfo ?? defaultLocationInfo;
  
  if (loading) {
    return (
        <section id="location" className="py-20 lg:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Skeleton className="h-14 w-3/4 mx-auto" />
                    <Skeleton className="h-7 w-1/2 mx-auto mt-4" />
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
                    <Skeleton className="w-full h-[400px] lg:h-[600px] rounded-lg" />
                    <div className="space-y-10">
                        {Array.from({length: 4}).map((_, i) => (
                           <div key={i} className="space-y-3">
                             <Skeleton className="h-6 w-1/3" />
                             <Skeleton className="h-5 w-full" />
                             <Skeleton className="h-5 w-5/6" />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
  }

  return (
    <section id="location" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary">{currentInfo.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            {currentInfo.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Map */}
          <div className="w-full h-[400px] lg:h-[600px] relative">
             <Image
                src={currentInfo.imageUrl}
                alt={`Map view of ${currentInfo.address.split('\n')[0]}`}
                data-ai-hint={currentInfo.imageHint}
                fill
                className="w-full h-full object-cover rounded-lg shadow-lg"
             />
          </div>

          {/* Right Column: Info */}
          <div className="space-y-10">
            <div className='grid sm:grid-cols-2 gap-10'>
                <InfoBlock title="ADDRESS">
                    <p className="whitespace-pre-line">{currentInfo.address}</p>
                </InfoBlock>

                <InfoBlock title="HOURS">
                    <div className='flex justify-between'><span>Monday - Saturday</span> <span>{currentInfo.hoursMonSat}</span></div>
                    <div className='flex justify-between'><span>Sunday</span> <span>{currentInfo.hoursSun}</span></div>
                    <div className='flex justify-between'><span>Consultations</span> <span>{currentInfo.hoursConsultations}</span></div>
                </InfoBlock>
            </div>
            
             <InfoBlock title="CONTACT">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                  <span>{currentInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                  <span>{currentInfo.email}</span>
                </div>
            </InfoBlock>

            <InfoBlock title="ADDITIONAL CONTACT">
                <p>Inquiries: {currentInfo.inquiriesEmail}</p>
                <p>Artists: {currentInfo.artistsEmail}</p>
                <p>Careers: {currentInfo.careersEmail}</p>
            </InfoBlock>

             <InfoBlock title="GETTING HERE">
                <p><b>Subway:</b> {currentInfo.subwayInfo}</p>
                <p><b>Parking:</b> {currentInfo.parkingInfo}</p>
                <p><b>Walking:</b> {currentInfo.walkingInfo}</p>
            </InfoBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

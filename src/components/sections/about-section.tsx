
// src/components/sections/about-section.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getAboutText, type AboutText } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const stats = [
    { value: '10+', label: 'Years of Excellence' },
    { value: '8,000+', label: 'Satisfied Clients' },
    { value: '5', label: 'World-Class Artists' },
    { value: '5', label: 'Client Rated', icon: Star },
];

const defaultAboutText: AboutText = {
  title: 'Our Story',
  description: 'Founded in 2010, Ashgray Ink has become a cornerstone of the Toronto tattoo scene. We are a collective of passionate, multi-award-winning artists dedicated to creating unique, high-quality tattoos in a clean, welcoming, and professional environment. Our artists specialize in a wide range of styles, from traditional and neo-traditional to blackwork, realism, and fine-line.\n\nWe believe that every tattoo tells a story, and we are committed to making the journey as memorable as the art itself. From the initial consultation where we turn your ideas into a custom design, to our meticulous aftercare guidance, we ensure a collaborative and safe experience. Our strict adherence to the highest standards of hygiene and safety is our promise to you.\n\nAre you ready to transform your vision into a work of art? We invite you to explore our portfolios and book a consultation. Let\'s create something beautiful together.',
  imageUrl: 'https://picsum.photos/600/800',
};

const AboutSection = () => {
  const [aboutText, setAboutText] = useState<AboutText | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAboutText((text) => {
      setAboutText(text ?? defaultAboutText);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentText = aboutText ?? defaultAboutText;

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden shadow-lg border-border bg-card">
            <CardContent className="p-8 lg:p-12">
                <div className="grid md:grid-cols-2 items-stretch gap-12">
                  <div className="wow-outer flex flex-col justify-center">
                    <div>
                      {loading ? (
                        <Skeleton className="h-12 w-3/4 mb-6" />
                      ) : (
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">{currentText.title}</h2>
                      )}
                      <div className="text-foreground/80 space-y-4 text-base leading-relaxed">
                        {loading ? (
                          <>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-11/12" />
                            <Skeleton className="h-6 w-full mt-4" />
                            <Skeleton className="h-6 w-10/12" />
                            <Skeleton className="h-6 w-full mt-4" />
                            <Skeleton className="h-6 w-9/12" />
                          </>
                        ) : (
                          currentText.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))
                        )}
                      </div>
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
                  <div className="wow-outer">
                    <Card className="h-full overflow-hidden border-accent">
                      <CardContent className="relative h-full p-4 min-h-[400px] md:min-h-0">
                         {loading ? (
                            <Skeleton className="w-full h-full" />
                         ) : (
                            <Image
                                src={currentText.imageUrl}
                                alt="Tattoo artist working on a black and gray realism tattoo"
                                data-ai-hint="tattoo artist realism"
                                fill
                                className="object-cover"
                            />
                         )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;

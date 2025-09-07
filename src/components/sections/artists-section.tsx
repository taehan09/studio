
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getArtists, type Artist } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

const ArtistsSection = () => {
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getArtists((data) => {
      setArtists(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="artists" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">ARTISTS</h2>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-foreground/70">
            Meet our world-renowned team of tattoo artists, each bringing their unique style and expertise to create extraordinary works of art.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="bg-transparent border-none shadow-none text-center">
                <CardContent className="p-0 flex flex-col h-full">
                   <Skeleton className="relative w-full h-[300px] rounded-lg" />
                   <div className="mt-6 flex-grow flex flex-col">
                      <Skeleton className="h-8 w-3/4 mx-auto" />
                      <Skeleton className="h-4 w-1/2 mx-auto my-2" />
                      <Skeleton className="h-12 w-full mx-auto mt-2" />
                      <div className="mt-4">
                        <Skeleton className="h-8 w-32 mx-auto" />
                      </div>
                      <div className="mt-2">
                        <Skeleton className="h-10 w-48 mx-auto" />
                      </div>
                   </div>
                </CardContent>
              </Card>
            ))
          ) : (
            artists?.map((artist) => (
              <Card key={artist.id} className="bg-transparent border-none shadow-none text-center">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                      <Image
                      src={artist.imageUrl}
                      alt={`Portrait of ${artist.name}`}
                      data-ai-hint={artist.imageHint}
                      fill
                      className="object-cover"
                      />
                  </div>
                  <div className="mt-6 flex-grow flex flex-col">
                      <h3 className="text-2xl font-semibold tracking-widest text-primary">{artist.name}</h3>
                      <p className="text-sm text-foreground/80 my-1">{artist.specialty}</p>
                      <p className="text-foreground/60 text-sm max-w-xs mx-auto mt-2 flex-grow">
                          {artist.bio}
                      </p>
                      <div className='mt-4'>
                          <Button asChild variant="link" className="text-foreground/80 tracking-widest">
                              <Link href="#">VIEW GALLERY</Link>
                          </Button>
                      </div>
                       <div className="mt-2">
                          <Button asChild variant="outline" className="text-chart-3 border-chart-3 hover:bg-chart-3/10 hover:text-chart-3 tracking-widest">
                              <Link href="#contact">MAKE AN APPOINTMENT</Link>
                          </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;

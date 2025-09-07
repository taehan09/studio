// src/components/sections/gallery-section.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getGalleryImages, type GalleryImage } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

const filterCategories = ['ALL', 'REALISM', 'TRADITIONAL', 'BLACKWORK', 'FINE-LINE', 'COLOR', 'JAPANESE', 'GEOMETRIC'];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getGalleryImages((data) => {
      setImages(data ?? []);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredImages = activeFilter === 'ALL'
    ? images
    : images.filter(image => image.category.toUpperCase() === activeFilter).slice(0, 7);

  const renderSkeletons = () => (
    Array.from({ length: 7 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-full aspect-square rounded-none" />
    ))
  );

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">GALLERY</h2>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-foreground/70">
            Explore our portfolio of exceptional tattoo artistry. Each piece represents the skill, creativity, and attention to detail that defines our studio.
          </p>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-2 mb-12">
          {filterCategories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? "secondary" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "font-semibold tracking-widest",
                activeFilter === category ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent/50"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {loading ? renderSkeletons() : (
            filteredImages.map((image) => (
              <Card 
                key={image.id}
                className="overflow-hidden group animate-fade-in border-none shadow-none rounded-none cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <CardContent className="p-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image.hint}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          <DialogContent className="p-0 border-none bg-transparent max-w-2xl h-auto shadow-2xl">
             <DialogTitle className="sr-only">Enlarged gallery image</DialogTitle>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Enlarged gallery image"
                width={1200}
                height={1200}
                className="w-full h-auto object-contain rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default GallerySection;

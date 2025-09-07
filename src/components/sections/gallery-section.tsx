// src/components/sections/gallery-section.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: 'https://picsum.photos/500/500?random=11', alt: 'Minimalist tattoo design', hint: 'tattoo minimalist', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=12', alt: 'Traditional tattoo design', hint: 'tattoo traditional', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=13', alt: 'Watercolor tattoo design', hint: 'tattoo watercolor', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=14', alt: 'Geometric tattoo design', hint: 'tattoo geometric', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=15', alt: 'Realism tattoo design', hint: 'tattoo realism', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=16', alt: 'Blackwork tattoo design', hint: 'tattoo blackwork', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=17', alt: 'Japanese style tattoo', hint: 'tattoo japanese', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=18', alt: 'Abstract tattoo design', hint: 'tattoo abstract', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=19', alt: 'Fine-line tattoo design', hint: 'tattoo fineline', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=20', alt: 'Realism color tattoo', hint: 'tattoo realism color', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=21', alt: 'Blackwork portrait', hint: 'tattoo blackwork portrait', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=22', alt: 'Traditional eagle tattoo', hint: 'tattoo traditional eagle', category: 'Traditional' },
];

const filterCategories = ['ALL', 'REALISM', 'TRADITIONAL', 'BLACKWORK', 'FINE-LINE', 'COLOR'];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredImages = activeFilter === 'ALL'
    ? galleryImages
    : galleryImages.filter(image => image.category.toUpperCase() === activeFilter);

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <Card key={`${image.src}-${index}`} className="overflow-hidden group animate-fade-in">
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;

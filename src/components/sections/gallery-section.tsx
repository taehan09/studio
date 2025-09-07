// src/components/sections/gallery-section.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: 'https://picsum.photos/500/500?random=11', alt: 'Minimalist tattoo design', hint: 'tattoo minimalist', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=12', alt: 'Traditional tattoo design', hint: 'tattoo traditional', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=13', alt: 'Watercolor tattoo design', hint: 'tattoo watercolor', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=14', alt: 'Geometric tattoo design', hint: 'tattoo geometric', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=15', alt: 'Realism tattoo design', hint: 'tattoo realism', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=16', alt: 'Blackwork tattoo design', hint: 'tattoo blackwork', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=17', alt: 'Japanese style tattoo', hint: 'tattoo japanese', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=18', alt: 'Abstract tattoo design', hint: 'tattoo abstract', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=19', alt: 'Fine-line tattoo design', hint: 'tattoo fineline', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=20', alt: 'Realism color tattoo', hint: 'tattoo realism color', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=21', alt: 'Blackwork portrait', hint: 'tattoo blackwork portrait', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=22', alt: 'Traditional eagle tattoo', hint: 'tattoo traditional eagle', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=23', alt: 'Geometric sleeve tattoo', hint: 'tattoo geometric sleeve', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=24', alt: 'Japanese dragon tattoo', hint: 'tattoo japanese dragon', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=25', alt: 'Fine-line script tattoo', hint: 'tattoo fineline script', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=26', alt: 'Color realism portrait', hint: 'tattoo color realism', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=27', alt: 'Blackwork geometric pattern', hint: 'tattoo blackwork geometric', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=28', alt: 'Traditional ship tattoo', hint: 'tattoo traditional ship', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=29', alt: 'Watercolor flower tattoo', hint: 'tattoo watercolor flower', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=30', alt: 'Japanese koi fish tattoo', hint: 'tattoo japanese koi', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=31', alt: 'Geometric animal tattoo', hint: 'tattoo geometric animal', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=32', alt: 'Fine-line tattoo design', hint: 'tattoo minimalist', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=33', alt: 'Traditional tattoo design', hint: 'tattoo traditional', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=34', alt: 'Watercolor tattoo design', hint: 'tattoo watercolor', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=35', alt: 'Geometric tattoo design', hint: 'tattoo geometric', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=36', alt: 'Realism tattoo design', hint: 'tattoo realism', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=37', alt: 'Blackwork tattoo design', hint: 'tattoo blackwork', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=38', alt: 'Japanese style tattoo', hint: 'tattoo japanese', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=39', alt: 'Abstract tattoo design', hint: 'tattoo abstract', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=40', alt: 'Fine-line tattoo design', hint: 'tattoo fineline', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=41', alt: 'Realism color tattoo', hint: 'tattoo realism color', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=42', alt: 'Blackwork portrait', hint: 'tattoo blackwork portrait', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=43', alt: 'Traditional eagle tattoo', hint: 'tattoo traditional eagle', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=44', alt: 'Geometric sleeve tattoo', hint: 'tattoo geometric sleeve', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=45', alt: 'Japanese dragon tattoo', hint: 'tattoo japanese dragon', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=46', alt: 'Fine-line script tattoo', hint: 'tattoo fineline script', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=47', alt: 'Color realism portrait', hint: 'tattoo color realism', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=48', alt: 'Blackwork geometric pattern', hint: 'tattoo blackwork geometric', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=49', alt: 'Traditional ship tattoo', hint: 'tattoo traditional ship', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=50', alt: 'Watercolor flower tattoo', hint: 'tattoo watercolor flower', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=51', alt: 'Japanese koi fish tattoo', hint: 'tattoo japanese koi', category: 'Japanese' },
  { src: 'https://picsum.photos/500/500?random=52', alt: 'Geometric animal tattoo', hint: 'tattoo geometric animal', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=53', alt: 'Fine-line floral tattoo', hint: 'tattoo fine-line floral', category: 'Fine-line' },
  { src: 'https://picsum.photos/500/500?random=54', alt: 'Traditional rose tattoo', hint: 'tattoo traditional rose', category: 'Traditional' },
  { src: 'https://picsum.photos/500/500?random=55', alt: 'Color splash tattoo', hint: 'tattoo color splash', category: 'Color' },
  { src: 'https://picsum.photos/500/500?random=56', alt: 'Geometric wolf tattoo', hint: 'tattoo geometric wolf', category: 'Geometric' },
  { src: 'https://picsum.photos/500/500?random=57', alt: 'Realism eye tattoo', hint: 'tattoo realism eye', category: 'Realism' },
  { src: 'https://picsum.photos/500/500?random=58', alt: 'Blackwork snake tattoo', hint: 'tattoo blackwork snake', category: 'Blackwork' },
  { src: 'https://picsum.photos/500/500?random=59', alt: 'Japanese mask tattoo', hint: 'tattoo japanese mask', category: 'Japanese' },
];

const filterCategories = ['ALL', 'REALISM', 'TRADITIONAL', 'BLACKWORK', 'FINE-LINE', 'COLOR', 'JAPANESE', 'GEOMETRIC'];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeFilter === 'ALL'
    ? galleryImages
    : galleryImages.filter(image => image.category.toUpperCase() === activeFilter).slice(0, 7);

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
          {filteredImages.map((image, index) => (
            <Card 
              key={`${image.src}-${index}`} 
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
          ))}
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

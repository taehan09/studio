import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  { src: 'https://picsum.photos/500/500?random=11', alt: 'Minimalist tattoo design', hint: 'tattoo minimalist' },
  { src: 'https://picsum.photos/500/500?random=12', alt: 'Traditional tattoo design', hint: 'tattoo traditional' },
  { src: 'https://picsum.photos/500/500?random=13', alt: 'Watercolor tattoo design', hint: 'tattoo watercolor' },
  { src: 'https://picsum.photos/500/500?random=14', alt: 'Geometric tattoo design', hint: 'tattoo geometric' },
  { src: 'https://picsum.photos/500/500?random=15', alt: 'Realism tattoo design', hint: 'tattoo realism' },
  { src: 'https://picsum.photos/500/500?random=16', alt: 'Blackwork tattoo design', hint: 'tattoo blackwork' },
  { src: 'https://picsum.photos/500/500?random=17', alt: 'Japanese style tattoo', hint: 'tattoo japanese' },
  { src: 'https://picsum.photos/500/500?random=18', alt: 'Abstract tattoo design', hint: 'tattoo abstract' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            A glimpse into the artistry and skill of our resident tattooists.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden group">
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

        <div className="text-center mt-12">
            <Card className="inline-block bg-card border-border shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div>
                        <h3 className="font-headline text-xl font-semibold text-primary">Have a new design?</h3>
                        <p className="text-muted-foreground">Use our AI to categorize it.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin">
                            Categorize New Design <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;

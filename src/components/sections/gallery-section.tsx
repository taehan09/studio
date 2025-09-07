import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TattooUploadForm from '@/components/tattoo-upload-form';

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

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
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
          </TabsContent>
          <TabsContent value="admin">
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Categorize New Design</h3>
                <p className="text-muted-foreground mb-6">
                  Upload a tattoo design to automatically categorize its style using our AI tool. This feature is for administrative purposes.
                </p>
                <TattooUploadForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default GallerySection;


import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const artists = [
  {
    name: 'TK_ASHGRAYINK',
    specialty: 'Traditional & Neo-Traditional',
    bio: 'Specializing in bold traditional and neo-traditional designs with a modern twist.',
    imageUrl: 'https://picsum.photos/seed/tk/400/500',
    imageHint: 'tattoo artist working',
  },
  {
    name: 'OLIVIA',
    specialty: 'Fine-line & Realism & Watercolor',
    bio: 'Master of fine-line and realism, creating delicate and detailed masterpieces.',
    imageUrl: 'https://picsum.photos/seed/olivia/400/500',
    imageHint: 'person in cafe',
  },
  {
    name: 'NOAH',
    specialty: 'Geometric & Blackwork & Tribal',
    bio: 'Expert in geometric and blackwork, focusing on symmetry and abstract patterns.',
    imageUrl: 'https://picsum.photos/seed/noah/400/500',
    imageHint: 'winding road mountain',
  },
  {
    name: 'EMMA',
    specialty: 'Watercolor & New School & Japanese',
    bio: 'Loves vibrant colors and expressive art, focusing on watercolor and new school styles.',
    imageUrl: 'https://picsum.photos/seed/emma/400/500',
    imageHint: 'spiderweb foggy field',
  },
];

const ArtistsSection = () => {
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
          {artists.map((artist) => (
            <Card key={artist.name} className="bg-transparent border-none shadow-none text-center">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;

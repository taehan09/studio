import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const artists = [
  {
    name: 'Alex "Inksmith" Rivera',
    specialty: 'Realism & Blackwork',
    bio: 'With over a decade of experience, Alex specializes in bringing photorealistic designs and intricate blackwork patterns to life.',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    imageHint: 'artist portrait',
  },
  {
    name: 'Jasmine "Jay" Chen',
    specialty: 'Watercolor & Abstract',
    bio: 'Jay is a master of color, creating vibrant watercolor tattoos and unique abstract pieces that flow with the body.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    imageHint: 'artist portrait',
  },
  {
    name: 'Marcus "Rook" Thorne',
    specialty: 'Neo-Traditional & Japanese',
    bio: 'Marcus blends bold lines with modern color palettes, putting a contemporary spin on traditional and Japanese styles.',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    imageHint: 'artist portrait',
  },
];

const ArtistsSection = () => {
  return (
    <section id="artists" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Meet Our Artists</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Talented professionals dedicated to the art of ink.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card key={artist.name} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={artist.imageUrl}
                  alt={`Portrait of ${artist.name}`}
                  data-ai-hint={artist.imageHint}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl text-primary">{artist.name}</CardTitle>
                <p className="text-accent font-semibold my-2">{artist.specialty}</p>
                <CardDescription>{artist.bio}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;

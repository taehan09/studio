
// src/app/admin/page.tsx
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TattooUploadForm from '@/components/tattoo-upload-form';
import { Button } from '@/components/ui/button';
import HeroTextEditor from '@/components/hero-text-editor';
import AboutSectionEditor from '@/components/about-section-editor';
import ArtistsSectionEditor from '@/components/artists-section-editor';
import { getHeroText, getAboutText, getArtists } from '@/lib/firebase-admin';
import LogoutButton from '@/components/logout-button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export const revalidate = 0;

export default async function AdminPage() {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Some admin features might not work correctly.");
  }
  
  const heroText = await getHeroText();
  const aboutText = await getAboutText();
  const artists = await getArtists();

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex justify-between items-center">
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <LogoutButton />
        </header>
        <main className="flex-1 flex items-start justify-center">
            <Card className="w-full max-w-2xl mx-auto shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl">Admin Panel</CardTitle>
                    <CardDescription>Manage your tattoo designs and studio content.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-4">
                    {!serviceAccountKey && (
                        <Alert variant="destructive" className="mb-8">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Missing Firebase Credentials</AlertTitle>
                          <AlertDescription>
                            The `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable is not set. Server-side features requiring Firebase will not work. Please check your `.env` file and restart the server.
                          </AlertDescription>
                        </Alert>
                    )}

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="hero-section">
                            <AccordionTrigger className="text-2xl font-semibold text-chart-3 hover:no-underline">Edit Hero Section</AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <p className="text-muted-foreground mb-6">
                                    Update the main title and subtitle displayed on the home page hero section.
                                </p>
                                <HeroTextEditor initialData={heroText} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="about-section">
                            <AccordionTrigger className="text-2xl font-semibold text-chart-3 hover:no-underline">Edit About Section</AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <p className="text-muted-foreground mb-6">
                                    Update the title, paragraphs, and image in the "Our Story" section.
                                </p>
                                <AboutSectionEditor initialData={aboutText} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="artists-section">
                            <AccordionTrigger className="text-2xl font-semibold text-chart-3 hover:no-underline">Edit Artists Section</AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <p className="text-muted-foreground mb-6">
                                    Manage the artists featured on your website. You can add, edit, and remove artists.
                                </p>
                                <ArtistsSectionEditor initialData={artists} />
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="categorize-design">
                            <AccordionTrigger className="text-2xl font-semibold text-chart-3 hover:no-underline">Categorize New Design</AccordionTrigger>
                            <AccordionContent className="pt-4">
                                <p className="text-muted-foreground mb-6">
                                    Upload a tattoo design to automatically categorize its style using our AI tool.
                                </p>
                                <TattooUploadForm />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}

// src/app/admin/page.tsx
import Link from 'next/link';
import { ArrowLeft, LogOut, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TattooUploadForm from '@/components/tattoo-upload-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import HeroTextEditor from '@/components/hero-text-editor';
import { getHeroText } from '@/lib/firebase-server';
import LogoutButton from '@/components/logout-button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default async function AdminPage() {
  // Check if the environment variable is set.
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return (
      <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <main className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-2xl mx-auto shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl md:text-4xl text-destructive flex items-center">
                      <AlertTriangle className="mr-4 h-8 w-8" /> Configuration Needed
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <Alert variant="destructive">
                    <AlertTitle>Missing Firebase Credentials</AlertTitle>
                    <AlertDescription>
                      <p>The `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable is not set.</p>
                      <p className="mt-2">Please follow the setup instructions to generate a service account key from your Firebase project settings and add it to the `.env` file in the root of this project.</p>
                    </AlertDescription>
                  </Alert>
                  <Button asChild variant="outline" className="mt-4">
                      <Link href="/">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Home
                      </Link>
                  </Button>
                </CardContent>
            </Card>
        </main>
      </div>
    )
  }
  
  const heroText = await getHeroText();

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
                    <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Admin Panel</CardTitle>
                    <CardDescription>Manage your tattoo designs and studio content.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-8">
                    <div>
                        <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Edit Hero Section</h3>
                        <p className="text-muted-foreground mb-6">
                            Update the main title and subtitle displayed on the home page hero section.
                        </p>
                        <HeroTextEditor initialData={heroText} />
                    </div>
                    
                    <Separator />

                    <div>
                        <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Categorize New Design</h3>
                        <p className="text-muted-foreground mb-6">
                            Upload a tattoo design to automatically categorize its style using our AI tool.
                        </p>
                        <TattooUploadForm />
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}

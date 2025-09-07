import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TattooUploadForm from '@/components/tattoo-upload-form';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
            <Button asChild variant="outline">
                <Link href="/#gallery">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Gallery
                </Link>
            </Button>
        </header>
        <main className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-2xl mx-auto shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Admin Panel</CardTitle>
                    <CardDescription>Manage your tattoo designs and studio content.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Categorize New Design</h3>
                    <p className="text-muted-foreground mb-6">
                    Upload a tattoo design to automatically categorize its style using our AI tool.
                    </p>
                    <TattooUploadForm />
                </CardContent>
            </Card>
        </main>
    </div>
  );
}

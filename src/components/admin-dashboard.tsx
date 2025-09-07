// src/components/admin-dashboard.tsx
"use client";

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Edit, Users, Image as ImageIcon, Tag, Inbox, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/logout-button';
import HeroTextEditor from '@/components/hero-text-editor';
import AboutSectionEditor from '@/components/about-section-editor';
import ArtistsSectionEditor from '@/components/artists-section-editor';
import TattooUploadForm from '@/components/tattoo-upload-form';
import GallerySectionEditor from '@/components/gallery-section-editor';
import ContactSubmissionsViewer from '@/components/contact-submissions-viewer';
import type { HeroText, AboutText, Artist, GalleryImage, AppointmentRequest } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

type AdminDashboardProps = {
  initialHeroText: HeroText;
  initialAboutText: AboutText;
  initialArtists: Artist[];
  initialGalleryImages: GalleryImage[];
  initialAppointmentRequests: AppointmentRequest[];
};

type View = 'hero' | 'about' | 'artists' | 'gallery' | 'categorize' | 'appointments';

const viewConfig = {
    hero: {
        title: "Edit Hero Section",
        description: "Update the main title and subtitle displayed on the home page hero section.",
        icon: Edit,
    },
    about: {
        title: "Edit About Section",
        description: "Update the title, paragraphs, and image in the 'Our Story' section.",
        icon: Edit,
    },
    artists: {
        title: "Edit Artists Section",
        description: "Manage the artists featured on your website. You can add, edit, and remove artists.",
        icon: Users,
    },
    gallery: {
        title: "Edit Gallery Section",
        description: "Manage the images displayed in your gallery. You can add, edit, and remove images by category.",
        icon: ImageIcon,
    },
    categorize: {
        title: "Categorize New Design",
        description: "Upload a tattoo design to automatically categorize its style using our AI tool.",
        icon: Tag,
    },
    appointments: {
        title: "Appointment Requests",
        description: "View and manage submitted appointment requests from clients.",
        icon: Inbox,
    }
}

export default function AdminDashboard({
  initialHeroText,
  initialAboutText,
  initialArtists,
  initialGalleryImages,
  initialAppointmentRequests,
}: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<View>('hero');

  const renderContent = () => {
    const config = viewConfig[activeView];
    
    let editorComponent;
    switch (activeView) {
      case 'hero':
        editorComponent = <HeroTextEditor initialData={initialHeroText} />;
        break;
      case 'about':
        editorComponent = <AboutSectionEditor initialData={initialAboutText} />;
        break;
      case 'artists':
        editorComponent = <ArtistsSectionEditor initialData={initialArtists} />;
        break;
      case 'gallery':
        editorComponent = <GallerySectionEditor initialData={initialGalleryImages} />;
        break;
      case 'categorize':
        editorComponent = <TattooUploadForm />;
        break;
      case 'appointments':
        editorComponent = <ContactSubmissionsViewer initialData={initialAppointmentRequests} />;
        break;
      default:
        return null;
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl my-8">
            <CardHeader>
                <CardTitle className="text-3xl md:text-4xl flex items-center gap-4">
                   <config.icon className="h-8 w-8 text-primary" />
                   {config.title}
                </CardTitle>
                <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                {editorComponent}
            </CardContent>
        </Card>
    )
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <Home /> Admin Panel
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('hero')} isActive={activeView === 'hero'} tooltip="Edit Hero Section">
                    <Edit />
                    <span>Hero Section</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('about')} isActive={activeView === 'about'} tooltip="Edit About Section">
                    <ImageIcon />
                    <span>About Section</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('artists')} isActive={activeView === 'artists'} tooltip="Edit Artists Section">
                    <Users />
                    <span>Artists Section</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('gallery')} isActive={activeView === 'gallery'} tooltip="Edit Gallery Section">
                    <ImageIcon />
                    <span>Gallery Section</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('appointments')} isActive={activeView === 'appointments'} tooltip="Appointment Requests">
                    <Inbox />
                    <span>Appointment Requests</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('categorize')} isActive={activeView === 'categorize'} tooltip="Categorize Design">
                    <Tag />
                    <span>Categorize Design</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <LogoutButton />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
             <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

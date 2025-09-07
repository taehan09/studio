// src/app/admin/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHeroText, getAboutText, getArtists, getGalleryImages } from '@/lib/firebase-admin';
import LogoutButton from '@/components/logout-button';
import AdminDashboard from '@/components/admin-dashboard';


export const revalidate = 0;

export default async function AdminPage() {
  
  const heroText = await getHeroText();
  const aboutText = await getAboutText();
  const artists = await getArtists();
  const galleryImages = await getGalleryImages();
  

  return (
    <AdminDashboard
        initialHeroText={heroText}
        initialAboutText={aboutText}
        initialArtists={artists}
        initialGalleryImages={galleryImages}
    />
  );
}

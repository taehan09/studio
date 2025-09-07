// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import type { HeroText, AboutText, Artist, GalleryImage, AppointmentRequest } from './firebase';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function getAdminApp(): App | null {
    if (!serviceAccountKey) {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK cannot be initialized.");
        return null;
    }
    
    if (getApps().length > 0) {
        return getApp();
    }
    
    try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        return initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ashgrayink-shop-default-rtdb.firebaseio.com"
        });
    } catch (error) {
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY or initializing app:", error);
        return null;
    }
}

const defaultHeroText: HeroText = {
    title: "Ashgray Ink",
    subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists.",
};

const defaultAboutText: AboutText = {
  title: 'Our Story',
  description: 'Founded in 2010, Ashgray Ink has become a cornerstone of the Toronto tattoo scene. We are a collective of passionate, multi-award-winning artists dedicated to creating unique, high-quality tattoos in a clean, welcoming, and professional environment. Our artists specialize in a wide range of styles, from traditional and neo-traditional to blackwork, realism, and fine-line.\n\nWe believe that every tattoo tells a story, and we are committed to making the journey as memorable as the art itself. From the initial consultation where we turn your ideas into a custom design, to our meticulous aftercare guidance, we ensure a collaborative and safe experience. Our strict adherence to the highest standards of hygiene and safety is our promise to you.\n\nAre you ready to transform your vision into a work of art? We invite you to explore our portfolios and book a consultation. Let\'s create something beautiful together.',
  imageUrl: 'https://picsum.photos/600/800',
};

const defaultArtists: Artist[] = [
  {
    id: '1',
    name: 'TK_ASHGRAYINK',
    specialty: 'Traditional & Neo-Traditional',
    bio: 'Specializing in bold traditional and neo-traditional designs with a modern twist.',
    imageUrl: 'https://picsum.photos/seed/tk/400/500',
    imageHint: 'tattoo artist working',
  },
  {
    id: '2',
    name: 'OLIVIA',
    specialty: 'Fine-line & Realism & Watercolor',
    bio: 'Master of fine-line and realism, creating delicate and detailed masterpieces.',
    imageUrl: 'https://picsum.photos/seed/olivia/400/500',
    imageHint: 'person in cafe',
  },
  {
    id: '3',
    name: 'NOAH',
    specialty: 'Geometric & Blackwork & Tribal',
    bio: 'Expert in geometric and blackwork, focusing on symmetry and abstract patterns.',
    imageUrl: 'https://picsum.photos/seed/noah/400/500',
    imageHint: 'winding road mountain',
  },
  {
    id: '4',
    name: 'EMMA',
    specialty: 'Watercolor & New School & Japanese',
    bio: 'Loves vibrant colors and expressive art, focusing on watercolor and new school styles.',
    imageUrl: 'https://picsum.photos/seed/emma/400/500',
    imageHint: 'spiderweb foggy field',
  },
];

const defaultGalleryImages: GalleryImage[] = [
  { id: '1', src: 'https://picsum.photos/500/500?random=11', alt: 'Minimalist tattoo design', hint: 'tattoo minimalist', category: 'Fine-line' },
  { id: '2', src: 'https://picsum.photos/500/500?random=12', alt: 'Traditional tattoo design', hint: 'tattoo traditional', category: 'Traditional' },
  { id: '3', src: 'https://picsum.photos/500/500?random=13', alt: 'Watercolor tattoo design', hint: 'tattoo watercolor', category: 'Color' },
  { id: '4', src: 'https://picsum.photos/500/500?random=14', alt: 'Geometric tattoo design', hint: 'tattoo geometric', category: 'Geometric' },
  { id: '5', src: 'https://picsum.photos/500/500?random=15', alt: 'Realism tattoo design', hint: 'tattoo realism', category: 'Realism' },
  { id: '6', src: 'https://picsum.photos/500/500?random=16', alt: 'Blackwork tattoo design', hint: 'tattoo blackwork', category: 'Blackwork' },
  { id: '7', src: 'https://picsum.photos/500/500?random=17', alt: 'Japanese style tattoo', hint: 'tattoo japanese', category: 'Japanese' },
];


export async function getHeroText(): Promise<HeroText> {
    const adminApp = getAdminApp();
    if (!adminApp) return defaultHeroText;
    
    try {
        const db = getDatabase(adminApp);
        const heroRef = db.ref("site_content/hero_section");
        const snapshot = await heroRef.get();
        if (snapshot.exists()) {
            return snapshot.val() as HeroText;
        } else {
            await heroRef.set(defaultHeroText);
            return defaultHeroText;
        }
    } catch (error) {
        console.error("Error fetching hero text with Admin SDK:", error);
        return defaultHeroText;
    }
}

export async function getAboutText(): Promise<AboutText> {
    const adminApp = getAdminApp();
    if (!adminApp) return defaultAboutText;

    try {
        const db = getDatabase(adminApp);
        const aboutRef = db.ref("site_content/about_section");
        const snapshot = await aboutRef.get();
        if (snapshot.exists()) {
            return snapshot.val() as AboutText;
        } else {
            await aboutRef.set(defaultAboutText);
            return defaultAboutText;
        }
    } catch (error) {
        console.error("Error fetching about text with Admin SDK:", error);
        return defaultAboutText;
    }
}

export async function getArtists(): Promise<Artist[]> {
    const adminApp = getAdminApp();
    if (!adminApp) return defaultArtists;

    try {
        const db = getDatabase(adminApp);
        const artistsRef = db.ref("site_content/artists_section");
        const snapshot = await artistsRef.get();
        if (snapshot.exists()) {
            return snapshot.val() as Artist[];
        } else {
            await artistsRef.set(defaultArtists);
            return defaultArtists;
        }
    } catch (error) {
        console.error("Error fetching artists with Admin SDK:", error);
        return defaultArtists;
    }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
    const adminApp = getAdminApp();
    if (!adminApp) return defaultGalleryImages;

    try {
        const db = getDatabase(adminApp);
        const galleryRef = db.ref("site_content/gallery_section");
        const snapshot = await galleryRef.get();
        if (snapshot.exists()) {
            return snapshot.val() as GalleryImage[];
        } else {
            await galleryRef.set(defaultGalleryImages);
            return defaultGalleryImages;
        }
    } catch (error) {
        console.error("Error fetching gallery images with Admin SDK:", error);
        return defaultGalleryImages;
    }
}

export async function getAppointmentRequests(): Promise<AppointmentRequest[]> {
    const adminApp = getAdminApp();
    if (!adminApp) return [];

    try {
        const db = getDatabase(adminApp);
        const requestsRef = db.ref("appointment_requests");
        const snapshot = await requestsRef.get();
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Convert object of objects to array
            return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching appointment requests with Admin SDK:", error);
        return [];
    }
}

export { getAdminApp };

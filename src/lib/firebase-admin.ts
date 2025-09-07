
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import type { HeroText, AboutText } from './firebase';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function getAdminApp(): App {
    if (getApps().length > 0) {
        return getApp();
    }
    
    if (!serviceAccountKey) {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK cannot be initialized.");
        // Return a proxy that will warn when used, preventing hard crashes
        return new Proxy({}, {
            get(target, prop) {
                if (prop === 'then') return undefined; // Prevent Next.js from treating this as a promise
                console.error(`Firebase Admin SDK not initialized. Call to '${String(prop)}' will fail.`);
                return () => { throw new Error("Firebase Admin SDK not initialized."); };
            }
        }) as App;
    }
    
    const serviceAccount = JSON.parse(serviceAccountKey);
    return initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ashgrayink-shop-default-rtdb.firebaseio.com"
    });
}

const defaultHeroText: HeroText = {
    title: "Ashgray Ink",
    subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists.",
};

const defaultAboutText: AboutText = {
  title: 'Our Story',
  paragraph1: 'Founded in 2010, Ashgray Ink has become a cornerstone of the Toronto tattoo scene. We are a collective of passionate, multi-award-winning artists dedicated to creating unique, high-quality tattoos in a clean, welcoming, and professional environment. Our artists specialize in a wide range of styles, from traditional and neo-traditional to blackwork, realism, and fine-line.',
  paragraph2: 'We believe that every tattoo tells a story, and we are committed to making the journey as memorable as the art itself. From the initial consultation where we turn your ideas into a custom design, to our meticulous aftercare guidance, we ensure a collaborative and safe experience. Our strict adherence to the highest standards of hygiene and safety is our promise to you.',
  paragraph3: 'Are you ready to transform your vision into a work of art? We invite you to explore our portfolios and book a consultation. Let\'s create something beautiful together.',
  imageUrl: 'https://picsum.photos/600/800',
};

export async function getHeroText(): Promise<HeroText> {
    try {
        const adminApp = getAdminApp();
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
    try {
        const adminApp = getAdminApp();
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

export { getAdminApp };

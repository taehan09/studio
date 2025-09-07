// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import type { HeroText } from './firebase';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function getAdminApp(): App | null {
    if (!serviceAccountKey) {
        return null;
    }
    
    if (getApps().length > 0) {
        return getApp();
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

export async function getHeroText(): Promise<HeroText> {
    const adminApp = getAdminApp();
    
    if (!adminApp) {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK is not initialized. Falling back to default hero text.");
        return defaultHeroText;
    }

    const db = getDatabase(adminApp);

    try {
        const heroRef = db.ref("site_content/hero_section");
        const snapshot = await heroRef.get();
        if (snapshot.exists()) {
            return snapshot.val() as HeroText;
        } else {
            // Data doesn't exist, so create it with default text
            await heroRef.set(defaultHeroText);
            return defaultHeroText;
        }
    } catch (error) {
        console.error("Error fetching hero text with Admin SDK:", error);
        // Fallback to default text on error
        return defaultHeroText;
    }
}


export { getAdminApp };

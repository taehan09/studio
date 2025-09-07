// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import type { HeroText } from './firebase';

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function initializeAdminApp() {
    if (serviceAccountKey && !getApps().length) {
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin SDK:', error);
            return null;
        }
    }
    return getApps().length > 0 ? getApp() : null;
}

const adminApp = initializeAdminApp();
const adminDb = adminApp ? getFirestore(adminApp) : null;

const defaultHeroText: HeroText = {
    title: "Ashgray Ink",
    subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists.",
};

export async function getHeroText(): Promise<HeroText> {
    if (!adminDb) {
        console.error("Firebase Admin SDK is not initialized. Falling back to default hero text.");
        return defaultHeroText;
    }
    try {
        const heroDocRef = adminDb.collection("site_content").doc("hero_section");
        const docSnap = await heroDocRef.get();
        if (docSnap.exists) {
            return docSnap.data() as HeroText;
        } else {
            // Document doesn't exist, create it with default text
            await heroDocRef.set(defaultHeroText);
            return defaultHeroText;
        }
    } catch (error) {
        console.error("Error fetching hero text with Admin SDK:", error);
        // Fallback to default text on error
        return defaultHeroText;
    }
}


export { adminDb };

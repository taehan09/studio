// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { HeroText } from './firebase';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App;
let db: admin.firestore.Firestore | null = null;

if (!getApps().length) {
    if (serviceAccountKey) {
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            adminApp = initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            db = getFirestore(adminApp);
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin SDK:', error);
        }
    } else {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK will not be initialized.");
    }
} else {
    adminApp = getApp();
    db = getFirestore(adminApp);
}


const defaultHeroText: HeroText = {
    title: "Ashgray Ink",
    subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists.",
};

export async function getHeroText(): Promise<HeroText> {
    if (!db) {
        console.error("Firebase Admin SDK is not initialized. Falling back to default hero text.");
        return defaultHeroText;
    }
    try {
        const heroDocRef = db.collection("site_content").doc("hero_section");
        const docSnap = await heroDocRef.get();
        if (docSnap.exists) {
            return docSnap.data() as HeroText;
        } else {
            // Document doesn't exist, so create it with default text
            await heroDocRef.set(defaultHeroText);
            return defaultHeroText;
        }
    } catch (error) {
        console.error("Error fetching hero text with Admin SDK:", error);
        // Fallback to default text on error
        return defaultHeroText;
    }
}


export { db };

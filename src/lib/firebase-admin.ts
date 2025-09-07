// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getApps, initializeApp, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { HeroText } from './firebase';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let adminApp: App | null = null;

function initializeAdminApp() {
    if (getApps().length > 0) {
        return getApp();
    }
    
    if (serviceAccountKey) {
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            return initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } catch (error) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin SDK:', error);
            return null;
        }
    } else {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK will not be initialized.");
    }
    return null;
}

adminApp = initializeAdminApp();

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
            await heroDocRef.set(defaultHeroText);
            return defaultHeroText;
        }
    } catch (error) {
        console.error("Error fetching hero text with Admin SDK:", error);
        return defaultHeroText;
    }
}


export { adminDb };

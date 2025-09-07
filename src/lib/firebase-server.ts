// src/lib/firebase-server.ts
import 'server-only';
import { adminDb } from './firebase-admin';
import type { HeroText } from './firebase';

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

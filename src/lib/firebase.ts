// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue, type DatabaseReference } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW5y_qS5_Abqbp7EkROk7lbJyQvMrzauk",
  authDomain: "ashgrayink-shop.firebaseapp.com",
  databaseURL: "https://ashgrayink-shop-default-rtdb.firebaseio.com",
  projectId: "ashgrayink-shop",
  storageBucket: "ashgrayink-shop.firebasestorage.app",
  messagingSenderId: "600881043133",
  appId: "1:600881043133:web:78a3f8a670f45b988609d4"
};

// Initialize Firebase for the client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const auth = getAuth(app);

// Data types
export type HeroText = {
  title: string;
  subtitle: string;
};

export type AboutText = {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

// This function is called from the client-side editor
export async function updateHeroText(text: HeroText): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be logged in to save changes.");
  }
  const heroRef = ref(db, "site_content/hero_section");
  await set(heroRef, text);
}

// This function is called from the client-side to read data
export function getHeroText(callback: (text: HeroText) => void): () => void {
    const heroRef: DatabaseReference = ref(db, 'site_content/hero_section');
    // onValue returns an unsubscribe function that we can call to detach the listener
    const unsubscribe = onValue(heroRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            // Provide default text if nothing is in the database
            callback({
                title: "Ashgray Ink",
                subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists."
            });
        }
    });
    
    return unsubscribe;
}

export async function updateAboutText(text: AboutText): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("You must be logged in to save changes.");
  }
  const aboutRef = ref(db, "site_content/about_section");
  await set(aboutRef, text);
}

export function getAboutText(callback: (text: AboutText | null) => void): () => void {
    const aboutRef: DatabaseReference = ref(db, 'site_content/about_section');
    const unsubscribe = onValue(aboutRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback(null);
        }
    });
    
    return unsubscribe;
}

export { app, db, auth };

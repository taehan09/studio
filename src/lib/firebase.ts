// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
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

// Firestore functions
export type HeroText = {
  title: string;
  subtitle: string;
};

// This function is called from the client-side editor
export async function updateHeroText(text: HeroText): Promise<void> {
  const heroRef = ref(db, "site_content/hero_section");
  await set(heroRef, text);
}

export { app, db, auth };

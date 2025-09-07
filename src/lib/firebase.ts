// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "ashgrayink-shop",
  "appId": "1:600881043133:web:688a3f08fb3bbe238609d4",
  "storageBucket": "ashgrayink-shop.firebasestorage.app",
  "apiKey": "AIzaSyDW5y_qS5_Abqbp7EkROk7lbJyQvMrzauk",
  "authDomain": "ashgrayink-shop.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "600881043133"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Firestore functions for Hero Section
export type HeroText = {
  title: string;
  subtitle: string;
};

const heroDocRef = doc(db, "site_content", "hero_section");

export async function getHeroText(): Promise<HeroText> {
  const docSnap = await getDoc(heroDocRef);
  if (docSnap.exists()) {
    return docSnap.data() as HeroText;
  } else {
    // Return default text if document doesn't exist
    return {
      title: "Ashgray Ink",
      subtitle: "Experience world-class tattoo art in Toronto with internationally recognized artists.",
    };
  }
}

export async function updateHeroText(text: HeroText): Promise<void> {
  await setDoc(heroDocRef, text);
}


export { app, db, auth };

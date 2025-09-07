
// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue, type DatabaseReference } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


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
const storage = getStorage(app);

// Data types
export type HeroText = {
  title: string;
  subtitle: string;
};

export type AboutText = {
  title: string;
  description: string;
  imageUrl: string;
}

export type Artist = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  imageHint: string;
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

export async function uploadAboutImage(file: File): Promise<string> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to upload images.");
    }
    const filePath = `site_content/about_section/${new Date().toISOString()}_${file.name}`;
    const imageRef = storageRef(storage, filePath);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

export async function updateArtists(artists: Artist[]): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to save changes.");
    }
    const artistsRef = ref(db, "site_content/artists_section");
    await set(artistsRef, artists);
}

export function getArtists(callback: (artists: Artist[] | null) => void): () => void {
    const artistsRef: DatabaseReference = ref(db, 'site_content/artists_section');
    const unsubscribe = onValue(artistsRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback(defaultArtists);
        }
    });
    return unsubscribe;
}

export async function uploadArtistImage(file: File, artistId: string): Promise<string> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to upload images.");
    }
    const filePath = `site_content/artists_section/${artistId}/${new Date().toISOString()}_${file.name}`;
    const imageRef = storageRef(storage, filePath);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}


export { app, db, auth };

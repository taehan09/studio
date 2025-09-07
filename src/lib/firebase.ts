// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue, push, serverTimestamp, type DatabaseReference } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


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

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    hint: string;
    category: string;
};

export type AppointmentRequest = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    preferredArtist: string;
    tattooStyle: string;
    tattooDescription: string;
    budgetRange: string;
    preferredTimeframe: string;
    submittedAt: string;
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

const defaultGalleryImages: GalleryImage[] = [
  // रियलिज्म
  { id: 'g1', src: 'https://picsum.photos/500/500?random=1', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g2', src: 'https://picsum.photos/500/500?random=2', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g3', src: 'https://picsum.photos/500/500?random=3', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g4', src: 'https://picsum.photos/500/500?random=4', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g5', src: 'https://picsum.photos/500/500?random=5', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g6', src: 'https://picsum.photos/500/500?random=6', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  { id: 'g7', src: 'https://picsum.photos/500/500?random=7', alt: 'Realism tattoo', hint: 'tattoo realism', category: 'REALISM' },
  
  // पारंपरिक
  { id: 'g8', src: 'https://picsum.photos/500/500?random=8', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g9', src: 'https://picsum.photos/500/500?random=9', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g10', src: 'https://picsum.photos/500/500?random=10', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g11', src: 'https://picsum.photos/500/500?random=11', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g12', src: 'https://picsum.photos/500/500?random=12', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g13', src: 'https://picsum.photos/500/500?random=13', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },
  { id: 'g14', src: 'https://picsum.photos/500/500?random=14', alt: 'Traditional tattoo', hint: 'tattoo traditional', category: 'TRADITIONAL' },

  // ब्लैकवर्क
  { id: 'g15', src: 'https://picsum.photos/500/500?random=15', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g16', src: 'https://picsum.photos/500/500?random=16', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g17', src: 'https://picsum.photos/500/500?random=17', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g18', src: 'https://picsum.photos/500/500?random=18', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g19', src: 'https://picsum.photos/500/500?random=19', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g20', src: 'https://picsum.photos/500/500?random=20', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  { id: 'g21', src: 'https://picsum.photos/500/500?random=21', alt: 'Blackwork tattoo', hint: 'tattoo blackwork', category: 'BLACKWORK' },
  
  // फाइन-लाइन
  { id: 'g22', src: 'https://picsum.photos/500/500?random=22', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g23', src: 'https://picsum.photos/500/500?random=23', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g24', src: 'https://picsum.photos/500/500?random=24', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g25', src: 'https://picsum.photos/500/500?random=25', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g26', src: 'https://picsum.photos/500/500?random=26', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g27', src: 'https://picsum.photos/500/500?random=27', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },
  { id: 'g28', src: 'https://picsum.photos/500/500?random=28', alt: 'Fine-line tattoo', hint: 'tattoo fine-line', category: 'FINE-LINE' },

  // रंग
  { id: 'g29', src: 'https://picsum.photos/500/500?random=29', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g30', src: 'https://picsum.photos/500/500?random=30', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g31', src: 'https://picsum.photos/500/500?random=31', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g32', src: 'https://picsum.photos/500/500?random=32', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g33', src: 'https://picsum.photos/500/500?random=33', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g34', src: 'https://picsum.photos/500/500?random=34', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },
  { id: 'g35', src: 'https://picsum.photos/500/500?random=35', alt: 'Color tattoo', hint: 'tattoo color', category: 'COLOR' },

  // जापानी
  { id: 'g36', src: 'https://picsum.photos/500/500?random=36', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g37', src: 'https://picsum.photos/500/500?random=37', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g38', src: 'https://picsum.photos/500/500?random=38', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g39', src: 'https://picsum.photos/500/500?random=39', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g40', src: 'https://picsum.photos/500/500?random=40', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g41', src: 'https://picsum.photos/500/500?random=41', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },
  { id: 'g42', src: 'https://picsum.photos/500/500?random=42', alt: 'Japanese tattoo', hint: 'tattoo japanese', category: 'JAPANESE' },

  // जियोमेट्रिक
  { id: 'g43', src: 'https://picsum.photos/500/500?random=43', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g44', src: 'https://picsum.photos/500/500?random=44', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g45', src: 'https://picsum.photos/500/500?random=45', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g46', src: 'https://picsum.photos/500/500?random=46', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g47', src: 'https://picsum.photos/500/500?random=47', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g48', src: 'https://picsum.photos/500/500?random=48', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
  { id: 'g49', src: 'https://picsum.photos/500/500?random=49', alt: 'Geometric tattoo', hint: 'tattoo geometric', category: 'GEOMETRIC' },
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

export async function updateGalleryImages(images: GalleryImage[]): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to save changes.");
    }
    const galleryRef = ref(db, "site_content/gallery_section");
    await set(galleryRef, images);
}

export function getGalleryImages(callback: (images: GalleryImage[] | null) => void): () => void {
    const galleryRef: DatabaseReference = ref(db, 'site_content/gallery_section');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback(defaultGalleryImages);
        }
    });
    return unsubscribe;
}

export async function uploadGalleryImage(file: File, category: string): Promise<string> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to upload images.");
    }
    const filePath = `site_content/gallery_section/${category}/${new Date().toISOString()}_${file.name}`;
    const imageRef = storageRef(storage, filePath);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

export async function deleteGalleryImage(imageUrl: string): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("You must be logged in to delete images.");
    }
    // Only try to delete the image if it's a Firebase Storage URL
    if (!imageUrl.includes('firebasestorage.googleapis.com')) {
        return; 
    }
    try {
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
    } catch (error: any) {
        // It's okay if the file doesn't exist (e.g., placeholder images that were never uploaded)
        if (error.code !== 'storage/object-not-found') {
            console.error("Failed to delete image from storage:", error);
            throw new Error("Failed to delete image from storage.");
        }
    }
}

export async function saveAppointmentRequest(requestData: Omit<AppointmentRequest, 'id' | 'submittedAt'>): Promise<void> {
    const requestsRef = ref(db, 'appointment_requests');
    const newRequestRef = push(requestsRef);
    const fullRequestData = {
        ...requestData,
        submittedAt: new Date().toISOString(),
    };
    await set(newRequestRef, fullRequestData);
}

export function getAppointmentRequests(callback: (requests: AppointmentRequest[]) => void): () => void {
    const requestsRef = ref(db, 'appointment_requests');
    const unsubscribe = onValue(requestsRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const requestsArray = Object.keys(data)
                .map(key => ({ id: key, ...data[key] }))
                .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            callback(requestsArray);
        } else {
            callback([]);
        }
    });
    return unsubscribe;
}

export { app, db, auth };

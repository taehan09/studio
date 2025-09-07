// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

export { app, db, auth };

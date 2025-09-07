// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "ashgrayink-shop",
  "appId": "1:600881043133:web:0b90b9d0b0b767b88609d4",
  "storageBucket": "ashgrayink-shop.firebasestorage.app",
  "apiKey": "AIzaSyDW5y_qS5_Abqbp7EkROk7lbJyQvMrzauk",
  "authDomain": "ashgrayink-shop.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "600881043133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

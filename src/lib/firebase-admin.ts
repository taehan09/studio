
// src/lib/firebase-admin.ts
import 'dotenv/config';
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Read the service account key directly from environment variables
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Some features will be disabled.');
}

// Initialize Firebase Admin SDK only if it's not already initialized
if (serviceAccountKey && !getApps().length) {
  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin SDK:', error);
  }
}

const adminDb = getApps().length ? admin.firestore() : null;

export { adminDb };

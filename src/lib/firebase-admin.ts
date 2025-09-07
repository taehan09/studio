// src/lib/firebase-admin.ts
import 'dotenv/config';
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import getConfig from 'next/config';

// Use next/config to get server-side environment variables
const { serverRuntimeConfig } = getConfig() || { serverRuntimeConfig: {} };
const serviceAccountKey = serverRuntimeConfig.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Some features will be disabled.');
}

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

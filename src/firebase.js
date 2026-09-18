// ---------------------------------------------------------------------------
// Firebase project config + shared app instance
// ---------------------------------------------------------------------------
// Values are read from a local .env file (see .env.example in the project
// root) so they aren't hardcoded in this source file.
//
// Note: these values are NOT secret — Firebase config is safe to expose in
// a browser and will always be visible to visitors via DevTools once the
// site is live, regardless of this .env setup. Keeping them in .env is just
// good hygiene for your GitHub repo (no hardcoded values in source/history);
// it is not what makes the app secure. Real security comes from Firebase
// Authentication + Firestore Security Rules + Authorized domains.
//
// `app` is created once here and reused by AdminContext.jsx (Auth) and
// galleryImages.js (Firestore) — creating it more than once throws a
// "Firebase App named '[DEFAULT]' already exists" error.
// ---------------------------------------------------------------------------

import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

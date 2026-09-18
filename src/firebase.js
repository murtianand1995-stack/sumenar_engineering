// ---------------------------------------------------------------------------
// Firebase project config
// ---------------------------------------------------------------------------
// Values are read from a local .env file (see .env.example in the project
// root) so they aren't hardcoded in this source file.
//
// Note: these values are NOT secret — Firebase config is safe to expose in
// a browser and will always be visible to visitors via DevTools once the
// site is live, regardless of this .env setup. Keeping them in .env is just
// good hygiene for your GitHub repo (no hardcoded values in source/history);
// it is not what makes the app secure. Real security comes from Firebase
// Authentication + the Authorized domains list in the Firebase console.
// ---------------------------------------------------------------------------

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

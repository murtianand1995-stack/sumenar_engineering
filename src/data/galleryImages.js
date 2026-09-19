// ---------------------------------------------------------------------------
// Gallery image store — LOCAL UPLOADS ONLY, synced via Firebase Firestore
// ---------------------------------------------------------------------------
// Every photo is uploaded from the admin's own computer via the /admin page.
// It is compressed in the browser, then saved as a Firestore document (the
// compressed image is stored as a base64 string field on the document).
// Because it lives in Firestore rather than localStorage, every visitor on
// every device sees the same photos — not just the device that uploaded them.
//
// Visitors can only view (Firestore rules: read: true). Add / delete only
// works for a logged-in admin (Firestore rules: write requires auth).
// ---------------------------------------------------------------------------

import { app } from '../firebase'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { fileToCompressedDataURL } from '../utils/imageCompress'

// Re-exported so existing imports of fileToCompressedDataURL from this file
// keep working unchanged.
export { fileToCompressedDataURL }

export const db = getFirestore(app)
const COLLECTION_NAME = 'galleryImages'

/** Categories offered in the upload form and used as gallery filters. */
export const GALLERY_CATEGORIES = [
  'Magnetic Lifters',
  'Magnetic Separators',
  'Manufacturing',
  'Assembly',
  'On-Site',
]

/** Kept for backwards compatibility — intentionally empty (no seeded photos). */
export const DEFAULT_GALLERY_IMAGES = []

// Firestore caps a single document around 1 MB. Base64 text is ~33% bigger
// than the original binary, so we leave headroom below that cap.
const MAX_DATA_URL_BYTES = 900 * 1024

// --- read (one-time fetch, rarely needed since subscribeGallery covers live use) ---
export async function loadGalleryImages() {
  const q = query(collection(db, COLLECTION_NAME), orderBy('uploadedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Subscribe to gallery changes in real time — fires immediately with the
 * current photos, then again whenever any device adds/removes one.
 * Returns an unsubscribe function.
 */
export function subscribeGallery(callback) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('uploadedAt', 'desc'))
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => console.error('Gallery sync error:', err)
  )
}

// --- add (admin only — enforced by Firestore rules) -------------------------
export async function addGalleryImage({ src, category, caption }) {
  if (src.length > MAX_DATA_URL_BYTES) {
    throw new Error(
      'This image is still too large after compression. Please choose a smaller photo.'
    )
  }
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    src,
    category: category || GALLERY_CATEGORIES[0],
    caption: (caption || '').trim() || 'Sumenar Engineering equipment',
    uploadedAt: Timestamp.now(),
  })
  return { id: docRef.id }
}

// --- delete (admin only — enforced by Firestore rules) ----------------------
export async function deleteGalleryImage(id) {
  await deleteDoc(doc(db, COLLECTION_NAME, id))
}


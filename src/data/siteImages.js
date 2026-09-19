// ---------------------------------------------------------------------------
// Site images — admin-controlled photos used on Home, About, Services and
// Contact (NOT the growable Gallery, which has its own store).
// ---------------------------------------------------------------------------
// Each "slot" below is a fixed spot on the site (e.g. the Home page hero
// photo). Until an admin uploads a replacement, the slot's `fallback` image
// is shown. Once uploaded, the photo is stored in Firestore (collection
// "siteImages", one document per slot key) so every visitor on every device
// sees the same image — same pattern as the Gallery.
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react'
import { app } from '../firebase'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'

const db = getFirestore(app)
const COLLECTION_NAME = 'siteImages'

// Firestore caps a single document around 1 MB; base64 text runs ~33% bigger
// than the original binary, so keep uploads comfortably under that.
const MAX_DATA_URL_BYTES = 900 * 1024

/**
 * Every editable image slot on the site. `label` is what the admin sees,
 * `fallback` is shown until that slot has an admin-uploaded photo.
 */
export const SITE_IMAGE_SLOTS = [
  {
    key: 'home-hero',
    label: 'Home — Hero Photo',
    fallback: 'https://picsum.photos/seed/sumenar-hero-main/900/1000',
  },
  {
    key: 'home-intro-1',
    label: 'Home — Intro Photo 1',
    fallback: 'https://picsum.photos/seed/sumenar-intro-1/500/620',
  },
  {
    key: 'home-intro-2',
    label: 'Home — Intro Photo 2',
    fallback: 'https://picsum.photos/seed/sumenar-intro-2/500/620',
  },
  {
    key: 'about-1',
    label: 'About Us — Photo 1',
    fallback: 'https://picsum.photos/seed/sumenar-about-1/500/650',
  },
  {
    key: 'about-2',
    label: 'About Us — Photo 2',
    fallback: 'https://picsum.photos/seed/sumenar-about-2/500/650',
  },
  {
    key: 'product-lifter',
    label: 'Product Photo — Magnetic Lifter (Home + Services)',
    fallback: 'https://picsum.photos/seed/sumenar-product-lifter/900/700',
  },
  {
    key: 'product-separator',
    label: 'Product Photo — Drum Magnetic Separator (Home + Services)',
    fallback: 'https://picsum.photos/seed/sumenar-product-separator/900/700',
  },
  {
    key: 'contact-facility',
    label: 'Contact Page — Facility Photo',
    fallback: 'https://picsum.photos/seed/sumenar-contact-facility/700/420',
  },
]

const FALLBACK_MAP = Object.fromEntries(SITE_IMAGE_SLOTS.map((s) => [s.key, s.fallback]))

/**
 * React hook: returns a live map of { [slotKey]: src }, merged with
 * fallbacks for any slot the admin hasn't uploaded yet. Updates in real
 * time on every device when the admin changes a photo.
 */
export function useSiteImages() {
  const [images, setImages] = useState(FALLBACK_MAP)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION_NAME),
      (snap) => {
        const overrides = {}
        snap.forEach((d) => { overrides[d.id] = d.data().src })
        setImages({ ...FALLBACK_MAP, ...overrides })
      },
      (err) => console.error('Site images sync error:', err)
    )
    return unsubscribe
  }, [])

  return images
}

/** Admin only (enforced by Firestore rules): upload/replace a slot's photo. */
export async function setSiteImage(key, src) {
  if (src.length > MAX_DATA_URL_BYTES) {
    throw new Error(
      'This image is still too large after compression. Please choose a smaller photo.'
    )
  }
  await setDoc(doc(db, COLLECTION_NAME, key), { src, updatedAt: Timestamp.now() })
}

/** Admin only (enforced by Firestore rules): remove a slot's photo, reverting to the fallback. */
export async function resetSiteImage(key) {
  await deleteDoc(doc(db, COLLECTION_NAME, key))
}

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

// A plain "No Preview" placeholder, built as an inline SVG data URI — it
// renders instantly (no network request), unlike an external stock-photo
// URL, so there's no flash of an unrelated random image before the admin's
// real photo (or this placeholder) appears.
const NO_PREVIEW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#E4E8EE"/>
  <rect x="330" y="228" width="140" height="104" rx="8" fill="none" stroke="#AEB8C4" stroke-width="6"/>
  <circle cx="368" cy="262" r="12" fill="#AEB8C4"/>
  <path d="M330 320 L378 274 L410 302 L442 266 L470 320 Z" fill="#AEB8C4"/>
  <text x="400" y="378" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#7E8A99" text-anchor="middle">No Preview</text>
</svg>
`.trim()

const NO_PREVIEW_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(NO_PREVIEW_SVG)}`

// Shown briefly while the very first Firestore response hasn't arrived yet
// (e.g. on a slow connection) — an animated spinner, so it reads as "still
// loading" rather than "nothing here". Uses a native SVG animation, which
// keeps animating even used as a plain <img src="...">.
const LOADING_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#E4E8EE"/>
  <g transform="translate(400,300)">
    <circle r="34" fill="none" stroke="#CBD3DD" stroke-width="8"/>
    <path d="M 0 -34 A 34 34 0 0 1 34 0" fill="none" stroke="#7E8A99" stroke-width="8" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="0.8s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>
`.trim()

const LOADING_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(LOADING_SVG)}`

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
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'home-intro-1',
    label: 'Home — Intro Photo 1',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'home-intro-2',
    label: 'Home — Intro Photo 2',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'about-1',
    label: 'About Us — Photo 1',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'about-2',
    label: 'About Us — Photo 2',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'product-lifter',
    label: 'Product Photo — Magnetic Lifter (Home + Services)',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'product-separator',
    label: 'Product Photo — Drum Magnetic Separator (Home + Services)',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
  {
    key: 'contact-facility',
    label: 'Contact Page — Facility Photo',
    fallback: NO_PREVIEW_PLACEHOLDER,
  },
]

const FALLBACK_MAP = Object.fromEntries(SITE_IMAGE_SLOTS.map((s) => [s.key, s.fallback]))
const LOADING_MAP = Object.fromEntries(SITE_IMAGE_SLOTS.map((s) => [s.key, LOADING_PLACEHOLDER]))

/**
 * React hook: returns a live map of { [slotKey]: src }. Shows a loading
 * spinner for every slot until the first Firestore response arrives, then
 * switches to the admin's uploaded photo, or the "No Preview" placeholder
 * for any slot that's genuinely never been set. Updates in real time on
 * every device when the admin changes a photo.
 */
export function useSiteImages() {
  const [images, setImages] = useState(LOADING_MAP)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION_NAME),
      (snap) => {
        const overrides = {}
        snap.forEach((d) => { overrides[d.id] = d.data().src })
        setImages({ ...FALLBACK_MAP, ...overrides })
      },
      (err) => {
        console.error('Site images sync error:', err)
        setImages(FALLBACK_MAP) // stop spinning and show placeholders if sync fails
      }
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

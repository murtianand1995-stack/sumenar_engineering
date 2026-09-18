// ---------------------------------------------------------------------------
// Gallery image store — LOCAL UPLOADS ONLY
// ---------------------------------------------------------------------------
// There are no default/remote/random images any more. Every photo in the
// gallery is uploaded from the admin's own computer via the /admin page and
// stored in the browser's localStorage as a compressed data URL.
//
// Visitors can only view. Add / delete happens on the Admin page.
// To move to a real backend later, swap the four functions marked [STORE]
// for API calls — the rest of the app does not need to change.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'sumenar_gallery_images'
const CHANGE_EVENT = 'sumenar-gallery-changed'

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

/** Max pixel size + JPEG quality used when compressing an uploaded file. */
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82

// --- [STORE] read ----------------------------------------------------------
export function loadGalleryImages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// --- [STORE] write ---------------------------------------------------------
function persist(images) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
  } catch (err) {
    // localStorage is usually capped around 5 MB per site.
    throw new Error(
      'Storage full. Delete a few older photos before uploading new ones.'
    )
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
  return images
}

// --- [STORE] add -----------------------------------------------------------
export function addGalleryImage({ src, category, caption }) {
  const image = {
    id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    src,
    category: category || GALLERY_CATEGORIES[0],
    caption: (caption || '').trim() || 'Sumenar Engineering equipment',
    uploadedAt: new Date().toISOString(),
  }
  const next = [image, ...loadGalleryImages()]
  persist(next)
  return image
}

// --- [STORE] delete --------------------------------------------------------
export function deleteGalleryImage(id) {
  const next = loadGalleryImages().filter((img) => img.id !== id)
  persist(next)
  return next
}

/**
 * Subscribe to gallery changes (same tab + other tabs).
 * Returns an unsubscribe function.
 */
export function subscribeGallery(callback) {
  const handler = () => callback(loadGalleryImages())
  window.addEventListener(CHANGE_EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

/**
 * Read a File picked from the local system and return a compressed data URL.
 * Downscaling keeps localStorage from filling up after a handful of photos.
 */
export function fileToCompressedDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That image could not be opened.'))
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        try {
          resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
        } catch {
          resolve(reader.result) // fall back to the original data URL
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

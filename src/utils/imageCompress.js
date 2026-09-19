// ---------------------------------------------------------------------------
// Shared helper: compress a locally-picked image file into a data URL small
// enough to store as a single Firestore document field.
// ---------------------------------------------------------------------------

const MAX_DIMENSION = 1200
const JPEG_QUALITY = 0.75

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

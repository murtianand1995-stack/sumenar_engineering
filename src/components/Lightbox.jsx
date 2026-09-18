import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null)
  const image = images[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!image) return null

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) onPrev()
    else if (delta < -50) onNext()
    touchStartX.current = null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || 'Gallery image'}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen image"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-sm border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X size={22} />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-sm border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-6"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-sm border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6"
      >
        <ChevronRight size={24} />
      </button>

      <div
        className="flex max-h-full max-w-5xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={image.id}
          src={image.src}
          alt={image.caption || 'Sumenar Engineering gallery image'}
          className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain shadow-panel animate-[fadeIn_0.25s_ease-out]"
        />
        <div className="text-center text-metal-200">
          {image.caption && <p className="text-sm sm:text-base">{image.caption}</p>}
          <p className="mt-1 text-xs tracking-wide text-metal-500">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

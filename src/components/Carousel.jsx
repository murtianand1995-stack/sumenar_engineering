import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({ images, intervalMs = 5000 }) {
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const timerRef = useRef(null)

  const next = () => setActive((i) => (i + 1) % images.length)
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)

  useEffect(() => {
    timerRef.current = setInterval(next, intervalMs)
    return () => clearInterval(timerRef.current)
  }, [intervalMs, images.length])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, intervalMs)
  }

  const handleTouchStart = (e) => {
    pause()
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 40) prev()
    else if (delta < -40) next()
    touchStartX.current = null
    resume()
  }

  if (!images.length) return null

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm shadow-panel"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured gallery images"
    >
      <div className="relative h-64 w-full sm:h-80 lg:h-[26rem]">
        {images.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.caption || 'Sumenar Engineering equipment'}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-5 py-4 sm:px-8 sm:py-6">
          <p className="font-body text-sm text-metal-100 sm:text-base">{images[active].caption}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-sm bg-navy-950/60 text-white transition-colors hover:bg-navy-950/85 sm:left-4"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-sm bg-navy-950/60 text-white transition-colors hover:bg-navy-950/85 sm:right-4"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-forge-500' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

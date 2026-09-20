import { useEffect, useMemo, useState } from 'react'
import { ImageOff, Images } from 'lucide-react'
import SEO from '../components/SEO'
import Lightbox from '../components/Lightbox'
import Carousel from '../components/Carousel'
import { subscribeGallery } from '../data/galleryImages'

// This page is view-only. Photos are uploaded and removed by an admin on
// the /admin page; visitors can only browse them.

export default function Gallery() {
  const [images, setImages] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => subscribeGallery(setImages), [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  )

  // If the only photo in the active category gets removed, fall back to All
  useEffect(() => {
    if (!categories.includes(activeCategory)) setActiveCategory('All')
  }, [categories, activeCategory])

  const filteredImages = useMemo(
    () =>
      activeCategory === 'All'
        ? images
        : images.filter((i) => i.category === activeCategory),
    [images, activeCategory]
  )

  const featuredForCarousel = useMemo(() => images.slice(0, 6), [images])

  const openLightboxAt = (imgId) => {
    const idx = filteredImages.findIndex((i) => i.id === imgId)
    if (idx !== -1) setLightboxIndex(idx)
  }

  return (
    <>
      <SEO
        title="Gallery | Sumenar Engineering"
        description="Browse photos of Sumenar Engineering's magnetic lifters, drum magnetic separators, manufacturing floor and on-site installations."
      />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">Sumenar Engineering</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
            Equipment &amp; Facility Gallery
          </h1>
          <p className="mt-5 max-w-xl text-base text-metal-300">
            A look at our magnetic lifters, drum separators, manufacturing floor and
            completed on-site installations.
          </p>
        </div>
      </section>

      {/* Featured carousel — only rendered once photos exist */}
      {featuredForCarousel.length > 0 && (
        <section className="section-pad bg-white !pb-10">
          <div className="container-x">
            <Carousel images={featuredForCarousel} />
          </div>
        </section>
      )}

      {/* Gallery grid */}
      <section className="section-pad bg-metal-100 !pt-6">
        <div className="container-x">
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-sm border px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    activeCategory === cat
                      ? 'border-forge-500 bg-forge-500 text-white'
                      : 'border-metal-300 bg-white text-navy-700 hover:border-forge-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredImages.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 py-20 text-metal-500">
              <ImageOff size={36} />
              <p className="text-sm">No photos have been added to the gallery yet.</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((img, idx) => (
                <figure
                  key={img.id}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-image ring-1 ring-navy-900/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() => openLightboxAt(img.id)}
                    className="block w-full"
                    aria-label={`Open ${img.caption} in fullscreen`}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </button>

                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-semibold tracking-wide text-forge-400">
                      {img.category}
                    </p>
                    <p className="text-sm text-white">{img.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <p className="mt-10 flex items-center gap-2 text-xs text-metal-500">
            <Images size={14} /> Photos shown are uploaded and curated by Sumenar Engineering.
          </p>
        </div>
      </section>

      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <Lightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length)
          }
          onNext={() => setLightboxIndex((i) => (i + 1) % filteredImages.length)}
        />
      )}
    </>
  )
}

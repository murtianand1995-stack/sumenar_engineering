import { NavLink } from 'react-router-dom'
import { ShieldCheck, Zap, HardHat, Cog, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import { PRODUCTS, WHY_CHOOSE_US } from '../data/catalog'
import { COMPANY } from '../data/siteData'
import { useSiteImages } from '../data/siteImages'

const FEATURES = [
  { icon: ShieldCheck, title: 'Safe & Reliable Lifting', desc: 'Dual safety margins and tested holding force on every unit we build.' },
  { icon: Zap, title: 'Strong Magnetic Force', desc: 'High-grade magnetic circuits engineered for consistent, dependable power.' },
  { icon: HardHat, title: 'Rugged Construction', desc: 'Heavy-gauge steel builds that hold up to daily industrial punishment.' },
  { icon: Cog, title: 'Ideal for Industrial Use', desc: 'Purpose-built for steel yards, foundries and heavy fabrication floors.' },
]

export default function Home() {
  const siteImages = useSiteImages()
  return (
    <>
      <SEO
        title="Sumenar Engineering | Magnetic Solutions for Heavy Industry"
        description="Sumenar Engineering builds heavy-duty magnetic lifters (1–35 ton) and drum magnetic separators, plus custom machine manufacturing and assembly for industrial plants."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="absolute -right-24 top-0 h-full w-1/2 bg-gradient-to-l from-navy-800/60 to-transparent" />
        <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <span className="eyebrow">Sumenar Engineering &mdash; Industrial Magnetic Systems</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Magnetic strength engineered for the heaviest lifts on your floor.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-metal-300 sm:text-lg">
              We design, manufacture and assemble heavy-duty magnetic lifters, drum magnetic
              separators and custom industrial equipment built to run safely at full capacity,
              shift after shift.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <NavLink to="/services" className="btn-primary">
                Explore Products
              </NavLink>
              <NavLink to="/contact" className="btn-secondary">
                Get a Quote
              </NavLink>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <dt className="text-xs text-metal-400">Lifting Capacity</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">1&ndash;35 Ton</dd>
              </div>
              <div>
                <dt className="text-xs text-metal-400">Built &amp; Assembled</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">In-House</dd>
              </div>
              <div>
                <dt className="text-xs text-metal-400">Focus</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">Industrial</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="diagonal-cut overflow-hidden rounded-sm shadow-panel">
              <img
                src={siteImages['home-hero']}
                alt="Heavy-duty magnetic lifter handling a steel plate in an industrial facility"
                className="h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[34rem]"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-sm border border-white/10 bg-navy-800/95 p-5 shadow-panel sm:block">
              <p className="font-display text-3xl font-bold text-forge-400">35 Ton</p>
              <p className="mt-1 text-sm text-metal-300">Maximum lifting capacity on our heavy-duty range</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-pad bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Precision magnetic engineering, built by people who work the floor.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-700/80">
              {COMPANY.name} manufactures and assembles heavy-duty magnetic lifters and drum
              magnetic separators for foundries, steel yards and fabrication plants. Every unit
              is engineered in-house, from magnetic circuit design through final assembly and
              load testing, so what leaves our facility is ready for real industrial work.
            </p>
            <ul className="mt-6 space-y-3">
              {['In-house design, manufacturing and assembly', 'Custom engineering for non-standard loads', 'Load-tested before every dispatch'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-800">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-forge-500" />
                  {item}
                </li>
              ))}
            </ul>
            <NavLink to="/about" className="btn-outline-dark mt-8">
              More About Us
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={siteImages['home-intro-1']} alt="Fabrication of magnetic lifting equipment" className="h-full w-full rounded-sm object-cover shadow-panel" loading="lazy" />
            <img src={siteImages['home-intro-2']} alt="Assembly of an industrial magnetic separator" className="mt-8 h-full w-full rounded-sm object-cover shadow-panel" loading="lazy" />
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHTS */}
      <section className="section-pad bg-metal-100">
        <div className="container-x">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">What We Build</span>
              <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Product Highlights</h2>
            </div>
            <NavLink to="/services" className="hidden items-center gap-1.5 text-sm font-semibold text-forge-500 hover:text-forge-600 sm:flex">
              View all services <ArrowUpRight size={16} />
            </NavLink>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-sm bg-white shadow-panel">
                <div className="overflow-hidden">
                  <img
                    src={siteImages[`product-${p.id}`] || p.image}
                    alt={p.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-navy-900">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-forge-500">{p.spec}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-navy-700/85">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-steel-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <NavLink to="/contact" className="btn-outline-dark mt-6">
                    Enquire Now
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="section-pad bg-navy-900 text-white">
        <div className="container-x">
          <span className="eyebrow">Why It Holds Up</span>
          <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
            Built for the moments where equipment can&rsquo;t be the weak link.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-t-2 border-forge-500 pt-5">
                <f.icon size={26} className="text-forge-400" />
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-metal-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US preview */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <span className="eyebrow">The Sumenar Standard</span>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Why Plants Choose Us</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-sm border border-metal-300 bg-metal-100 p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{item.desc}</p>
              </div>
            ))}
          </div>
          <NavLink to="/about" className="btn-outline-dark mt-8">
            See All Reasons
          </NavLink>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-forge-500">
        <div className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Need a lifting or separation solution built to spec?
            </h2>
            <p className="mt-2 text-sm text-white/90">Talk to our engineering team about your application.</p>
          </div>
          <NavLink to="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white shadow-panel transition-colors hover:bg-navy-800">
            Get a Quote
          </NavLink>
        </div>
      </section>
    </>
  )
}

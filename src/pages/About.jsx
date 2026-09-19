import { NavLink } from 'react-router-dom'
import { ShieldCheck, Repeat, Zap, HardHat, Settings2, Headphones } from 'lucide-react'
import SEO from '../components/SEO'
import { WHY_CHOOSE_US, PROCESS_STEPS } from '../data/catalog'
import { COMPANY } from '../data/siteData'
import { useSiteImages } from '../data/siteImages'

const ICONS = [ShieldCheck, Repeat, Zap, HardHat, Settings2, Headphones]

export default function About() {
  const siteImages = useSiteImages()
  return (
    <>
      <SEO
        title="About Us | Sumenar Engineering"
        description="Learn about Sumenar Engineering's expertise in magnetic lifting, magnetic separation, machine manufacturing, assembly and custom industrial engineering."
      />

      {/* Page header */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">About {COMPANY.name}</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
            Engineering built around the way industrial floors actually work.
          </h1>
        </div>
      </section>

      {/* Company intro */}
      <section className="section-pad bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Our Expertise</span>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Magnetic lifting, separation and custom machine building under one roof.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-700/80">
              {COMPANY.name} specializes in the design, manufacturing and assembly of heavy-duty
              magnetic lifters and drum magnetic separators, alongside custom industrial machine
              manufacturing and assembly. Our engineering team works directly with plant
              operators to understand the material, the load and the environment before a single
              component is cut.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-700/80">
              From magnetic circuit design and coil winding to final assembly and load testing,
              every stage happens in-house. That control lets us hold tight tolerances on
              magnetic performance while building equipment rugged enough for continuous
              industrial-grade duty &mdash; from 1-ton precision lifts to 35-ton heavy plate handling.
            </p>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <img src={siteImages['about-1']} alt="Engineer inspecting a magnetic lifter component" className="h-full w-full rounded-sm object-cover shadow-panel" loading="lazy" />
            <img src={siteImages['about-2']} alt="Sumenar Engineering fabrication floor" className="mt-10 h-full w-full rounded-sm object-cover shadow-panel" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-pad bg-metal-100">
        <div className="container-x">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
            Six reasons plants trust us with critical lifts.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <div
                  key={item.title}
                  className="rounded-sm border border-metal-300 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-panel"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-sm bg-navy-900 text-forge-400">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-navy-900 text-white">
        <div className="container-x">
          <span className="eyebrow">How We Work</span>
          <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">From assessment to a tested unit on your floor.</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s) => (
              <li key={s.step} className="border-t-2 border-forge-500 pt-5">
                <span className="font-display text-4xl font-bold text-forge-400">{String(s.step).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-metal-400">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-forge-500">
        <div className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Have a load or line we haven&rsquo;t seen yet?</h2>
            <p className="mt-2 text-sm text-white/90">We take on non-standard lifting and separation challenges.</p>
          </div>
          <NavLink to="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white shadow-panel transition-colors hover:bg-navy-800">
            Talk to Our Engineers
          </NavLink>
        </div>
      </section>
    </>
  )
}

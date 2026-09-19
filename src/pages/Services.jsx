import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import SEO from '../components/SEO'
import { SERVICES, PRODUCTS } from '../data/catalog'
import { useSiteImages } from '../data/siteImages'

export default function Services() {
  const siteImages = useSiteImages()
  return (
    <>
      <SEO
        title="Services | Sumenar Engineering"
        description="Magnetic lifting solutions, heavy-duty magnetic equipment, machine manufacturing & assembly, magnetic separation and custom industrial engineering services."
      />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">What We Do</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
            Industrial magnetic solutions, end to end.
          </h1>
          <p className="mt-5 max-w-xl text-base text-metal-300">
            From a single magnetic lifter to a full custom-engineered handling system, our
            services cover design, manufacturing, assembly and support.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = Icons[s.icon] || Icons.Settings
            return (
              <article
                key={s.id}
                className="group rounded-sm border border-metal-300 bg-metal-100 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-forge-500 hover:shadow-panel"
              >
                <span className="grid h-12 w-12 place-items-center rounded-sm bg-navy-900 text-forge-400 transition-colors duration-200 group-hover:bg-forge-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{s.desc}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Product spec section */}
      <section className="section-pad bg-metal-100">
        <div className="container-x">
          <span className="eyebrow">Core Equipment</span>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Our Flagship Product Lines</h2>

          <div className="mt-10 space-y-10">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                className="grid gap-8 overflow-hidden rounded-sm bg-white shadow-panel lg:grid-cols-2"
              >
                <img
                  src={siteImages[`product-${p.id}`] || p.image}
                  alt={p.name}
                  className={`h-72 w-full object-cover lg:h-full ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                  loading="lazy"
                />
                <div className={`flex flex-col justify-center p-8 ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h3 className="font-display text-2xl font-bold text-navy-900">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-forge-500">{p.spec}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-navy-700/85">
                        <Icons.CheckCircle2 size={16} className="mt-0.5 shrink-0 text-steel-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <NavLink to="/contact" className="btn-primary mt-7 w-fit">
                    Request a Quote
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forge-500">
        <div className="container-x flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Not sure which solution fits?</h2>
            <p className="mt-2 text-sm text-white/90">Describe your application and we&rsquo;ll recommend the right equipment.</p>
          </div>
          <NavLink to="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white shadow-panel transition-colors hover:bg-navy-800">
            Contact Our Team
          </NavLink>
        </div>
      </section>
    </>
  )
}

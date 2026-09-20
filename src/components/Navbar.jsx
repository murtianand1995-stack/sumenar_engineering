import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Magnet } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the viewport grows back to desktop size
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
      isActive ? 'text-forge-400' : 'text-white/85 hover:text-white'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block w-full rounded-sm px-4 py-3 text-base font-semibold transition-colors duration-200 ${
      isActive ? 'bg-forge-500 text-white' : 'text-white/90 hover:bg-navy-700'
    }`

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'bg-navy-900/97 shadow-panel backdrop-blur' : 'bg-navy-900'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-forge-500 text-white lg:h-11 lg:w-11">
            <Magnet size={20} strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide text-white lg:text-xl">
              {COMPANY.name.toUpperCase()}
            </span>
            <span className="block font-body text-[11px] font-medium tracking-[0.12em] text-steel-300">
              {COMPANY.tagline.toUpperCase()}
            </span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink to="/contact" className="btn-primary">
            Let’s Connect
          </NavLink>
        </div>

        {/* Hamburger — hidden on desktop, shown on tablet/mobile */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-sm border border-white/20 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden bg-navy-800 transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={mobileLinkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            Get a Quote
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Magnet, Lock, LogOut } from 'lucide-react'
import { COMPANY, NAV_LINKS, SOCIALS } from '../data/siteData'
import { useAdmin } from '../context/AdminContext'

const SOCIAL_ICON = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, youtube: Youtube }

export default function Footer() {
  const { isAdmin, login, logout } = useAdmin()
  const [showLogin, setShowLogin] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  const submitLogin = (e) => {
    e.preventDefault()
    if (login(passcode)) {
      setShowLogin(false)
      setPasscode('')
      setError('')
    } else {
      setError('Incorrect passcode.')
    }
  }

  return (
    <footer className="bg-navy-950 text-metal-300">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-forge-500 text-white">
              <Magnet size={18} strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-wide text-white">
                {COMPANY.name.toUpperCase()}
              </span>
              <span className="block text-[11px] font-medium tracking-[0.12em] text-steel-300">
                {COMPANY.tagline.toUpperCase()}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-metal-400">
            Heavy-duty magnetic lifters, drum magnetic separators and custom industrial equipment, engineered and assembled for demanding plant floors.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="transition-colors hover:text-white">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-forge-400" />
              <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white break-all">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-forge-400" />
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-forge-400" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICON[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-sm border border-white/15 text-metal-300 transition-colors duration-200 hover:border-forge-500 hover:bg-forge-500 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              )
            })}
          </div>
          {/* <NavLink to="/contact" className="btn-secondary mt-6 w-fit">
            Get a Quote
          </NavLink> */}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-metal-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>{COMPANY.tagline}</p>
            {isAdmin ? (
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 text-metal-500 transition-colors hover:text-forge-400"
              >
                <LogOut size={13} /> Admin logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogin((v) => !v)}
                aria-label="Admin access"
                className="grid h-6 w-6 place-items-center text-metal-600 transition-colors hover:text-metal-400"
              >
                <Lock size={13} />
              </button>
            )}
          </div>
        </div>

        {showLogin && !isAdmin && (
          <div className="border-t border-white/10 bg-navy-900">
            <form onSubmit={submitLogin} className="container-x flex flex-wrap items-center gap-3 py-4">
              <label htmlFor="admin-pass" className="text-xs text-metal-400">
                Admin passcode
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="rounded-sm border border-white/15 bg-navy-800 px-3 py-1.5 text-sm text-white outline-none focus:border-forge-500"
                placeholder="Enter passcode"
              />
              <button type="submit" className="rounded-sm bg-forge-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-forge-600">
                Unlock
              </button>
              {error && <span className="text-xs text-forge-400">{error}</span>}
            </form>
          </div>
        )}
      </div>
    </footer>
  )
}

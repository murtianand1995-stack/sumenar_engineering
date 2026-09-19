import { useState, useEffect } from 'react'
import { Lock, LogOut, Upload, Trash2, ImageOff, ShieldCheck, KeyRound, Mail, RotateCcw, Image as ImageIcon } from 'lucide-react'
import SEO from '../components/SEO'
import { useAdmin } from '../context/AdminContext'
import {
  GALLERY_CATEGORIES,
  loadGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
  subscribeGallery,
  fileToCompressedDataURL,
} from '../data/galleryImages'
import { SITE_IMAGE_SLOTS, useSiteImages, setSiteImage, resetSiteImage } from '../data/siteImages'

export default function Admin() {
  const { isAdmin, checkingAuth, logout } = useAdmin()

  if (checkingAuth) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-navy-500">
        Checking session…
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Admin | Sumenar Engineering"
        description="Admin area for managing Sumenar Engineering gallery photos."
      />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="container-x relative py-14 sm:py-16">
          <span className="eyebrow">Sumenar Engineering</span>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold sm:text-4xl">Gallery Admin</h1>
            {isAdmin && (
              <button type="button" onClick={logout} className="btn-secondary w-fit">
                <LogOut size={16} /> Log out
              </button>
            )}
          </div>
          <p className="mt-4 max-w-xl text-base text-metal-300">
            Upload photos from this computer or remove existing ones. Visitors can
            only view the gallery.
          </p>
        </div>
      </section>

      <section className="section-pad bg-metal-100">
        <div className="container-x">{isAdmin ? <AdminPanel /> : <AuthCard />}</div>
      </section>
    </>
  )
}

// ---------------------------------------------------------------------------
// Login / Forgot password
// ---------------------------------------------------------------------------

function AuthCard() {
  const { login, sendResetEmail } = useAdmin()
  const [mode, setMode] = useState('login') // 'login' | 'forgot'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const resetFeedback = () => { setError(''); setMessage('') }

  const handleLogin = async (e) => {
    e.preventDefault()
    resetFeedback()
    setBusy(true)
    const res = await login(email, password)
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      setPassword('')
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    resetFeedback()
    setBusy(true)
    const res = await sendResetEmail(email)
    setBusy(false)
    if (res.ok) {
      setMessage('Reset link sent — check your email inbox (and spam folder).')
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-sm bg-white p-7 shadow-panel">
      <div className="flex items-center gap-2 text-navy-900">
        <Lock size={18} />
        <h2 className="font-display text-xl font-bold">
          {mode === 'login' ? 'Admin Login' : 'Reset Password'}
        </h2>
      </div>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <Field label="Email" id="login-email" type="email" autoComplete="username"
                 value={email} onChange={(v) => { setEmail(v); resetFeedback() }} />
          <Field label="Password" id="login-pass" type="password" autoComplete="current-password"
                 value={password} onChange={(v) => { setPassword(v); resetFeedback() }} />

          {error && <p className="text-sm font-medium text-forge-600">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            <ShieldCheck size={18} /> {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => { setMode('forgot'); resetFeedback() }}
            className="w-full text-center text-xs font-semibold text-navy-500 hover:text-forge-600 underline"
          >
            Forgot password?
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgot} className="mt-5 space-y-4">
          <p className="text-sm text-navy-600">
            Enter your admin email — we'll send a link to reset your password.
          </p>
          <Field label="Email" id="forgot-email" type="email" autoComplete="username"
                 value={email} onChange={(v) => { setEmail(v); resetFeedback() }} />

          {error && <p className="text-sm font-medium text-forge-600">{error}</p>}
          {message && <p className="text-sm font-medium text-steel-600">{message}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            <Mail size={18} /> {busy ? 'Sending…' : 'Send reset link'}
          </button>

          <button
            type="button"
            onClick={() => { setMode('login'); resetFeedback() }}
            className="w-full text-center text-xs font-semibold text-navy-500 hover:text-forge-600 underline"
          >
            Back to login
          </button>
        </form>
      )}
    </div>
  )
}

function Field({ label, id, type, autoComplete, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-navy-700">{label}</label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-sm border border-metal-300 px-3 py-2 text-sm outline-none focus:border-forge-500"
        required
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Logged-in admin panel: change password + manage photos
// ---------------------------------------------------------------------------

function AdminPanel() {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [tab, setTab] = useState('gallery') // 'gallery' | 'site-images'

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('gallery')}
            className={`rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'gallery' ? 'bg-navy-900 text-white' : 'bg-white text-navy-700 border border-metal-300'
            }`}
          >
            Gallery Photos
          </button>
          <button
            type="button"
            onClick={() => setTab('site-images')}
            className={`rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'site-images' ? 'bg-navy-900 text-white' : 'bg-white text-navy-700 border border-metal-300'
            }`}
          >
            Site Images
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowChangePassword((v) => !v)}
          className="btn-outline-dark w-fit"
        >
          <KeyRound size={16} /> {showChangePassword ? 'Hide' : 'Change Password'}
        </button>
      </div>

      {showChangePassword && <ChangePasswordForm onDone={() => setShowChangePassword(false)} />}

      {tab === 'gallery' ? <ManagePhotos /> : <ManageSiteImages />}
    </div>
  )
}

function ChangePasswordForm({ onDone }) {
  const { changePassword } = useAdmin()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword.length < 6) {
      setError('New password should be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setBusy(true)
    const res = await changePassword(currentPassword, newPassword)
    setBusy(false)

    if (res.ok) {
      setMessage('Password updated.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setError(res.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm rounded-sm bg-white p-7 shadow-panel">
      <h3 className="font-display text-lg font-bold text-navy-900">Change Password</h3>
      <div className="mt-4 space-y-4">
        <Field label="Current password" id="cp-current" type="password" autoComplete="current-password"
               value={currentPassword} onChange={setCurrentPassword} />
        <Field label="New password" id="cp-new" type="password" autoComplete="new-password"
               value={newPassword} onChange={setNewPassword} />
        <Field label="Confirm new password" id="cp-confirm" type="password" autoComplete="new-password"
               value={confirmPassword} onChange={setConfirmPassword} />

        {error && <p className="text-sm font-medium text-forge-600">{error}</p>}
        {message && <p className="text-sm font-medium text-steel-600">{message}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Photo upload / delete (unchanged from before)
// ---------------------------------------------------------------------------

function ManagePhotos() {
  const [images, setImages] = useState([])
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0])
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  useEffect(() => subscribeGallery(setImages), [])

  useEffect(() => {
    if (!file) { setPreview(''); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleUpload = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!file) {
      setError('Choose an image from your computer first.')
      return
    }

    setBusy(true)
    try {
      const src = await fileToCompressedDataURL(file)
      await addGalleryImage({ src, category, caption })
      setFile(null)
      setCaption('')
      e.target.reset()
      setMessage('Photo added to the gallery.')
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    setError('')
    try {
      await deleteGalleryImage(confirmId)
      setMessage('Photo removed.')
    } catch (err) {
      setError(err.message || 'Delete failed. Please try again.')
    } finally {
      setConfirmId(null)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      {/* Upload form */}
      <form onSubmit={handleUpload} className="h-fit rounded-sm bg-white p-7 shadow-panel">
        <h2 className="font-display text-xl font-bold text-navy-900">Add a Photo</h2>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="up-file" className="text-xs font-semibold text-navy-700">
              Image file
            </label>
            <input
              id="up-file"
              type="file"
              accept="image/*"
              onChange={(e) => { setFile(e.target.files?.[0] || null); setError(''); setMessage('') }}
              className="mt-1.5 w-full text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
            />
          </div>

          {preview && (
            <img src={preview} alt="Selected preview" className="h-40 w-full rounded-sm object-cover" />
          )}

          <div>
            <label htmlFor="up-cat" className="text-xs font-semibold text-navy-700">Category</label>
            <select
              id="up-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-metal-300 px-3 py-2 text-sm outline-none focus:border-forge-500"
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="up-cap" className="text-xs font-semibold text-navy-700">Caption</label>
            <input
              id="up-cap"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Short description"
              className="mt-1.5 w-full rounded-sm border border-metal-300 px-3 py-2 text-sm outline-none focus:border-forge-500"
            />
          </div>

          {error && <p className="text-sm font-medium text-forge-600">{error}</p>}
          {message && <p className="text-sm font-medium text-steel-600">{message}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            <Upload size={18} /> {busy ? 'Uploading…' : 'Upload Photo'}
          </button>
        </div>
      </form>

      {/* Existing photos */}
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold text-navy-900">
            Gallery Photos
          </h2>
          <span className="text-xs font-semibold text-metal-500">
            {images.length} {images.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>

        {images.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-sm bg-white py-16 text-metal-500 shadow-panel">
            <ImageOff size={34} />
            <p className="text-sm">No photos yet. Upload one to get started.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img) => (
              <figure key={img.id} className="relative overflow-hidden rounded-sm bg-white shadow-panel">
                <img src={img.src} alt={img.caption} className="h-36 w-full object-cover" />
                <figcaption className="p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-forge-600">{img.category}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-navy-700">{img.caption}</p>
                </figcaption>
                <button
                  type="button"
                  onClick={() => setConfirmId(img.id)}
                  aria-label={`Delete ${img.caption}`}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-sm bg-navy-950/80 text-white transition-colors hover:bg-forge-600"
                >
                  <Trash2 size={14} />
                </button>
              </figure>
            ))}
          </div>
        )}
      </div>

      {confirmId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 p-4"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="w-full max-w-sm rounded-sm bg-white p-7 text-center shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-navy-800">
              Remove this photo from the gallery? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => setConfirmId(null)} className="btn-outline-dark">
                Cancel
              </button>
              <button type="button" onClick={handleDelete} className="btn-primary">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Site images: Home / About / Services / Contact photos (fixed slots)
// ---------------------------------------------------------------------------

function ManageSiteImages() {
  const images = useSiteImages()

  return (
    <div>
      <div className="flex items-center gap-2 text-navy-900">
        <ImageIcon size={20} />
        <h2 className="font-display text-xl font-bold">Home / About / Services / Contact Photos</h2>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-navy-600">
        Each photo below appears on a specific page. Upload a replacement from your
        computer, or reset it to remove your upload and go back to the placeholder image.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_IMAGE_SLOTS.map((slot) => (
          <SiteImageCard key={slot.key} slot={slot} currentSrc={images[slot.key]} />
        ))}
      </div>
    </div>
  )
}

function SiteImageCard({ slot, currentSrc }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const src = await fileToCompressedDataURL(file)
      await setSiteImage(slot.key, src)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setBusy(false)
      e.target.value = '' // allow picking the same file again later
    }
  }

  const handleReset = async () => {
    setError('')
    setBusy(true)
    try {
      await resetSiteImage(slot.key)
    } catch (err) {
      setError(err.message || 'Reset failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-panel">
      <img src={currentSrc} alt={slot.label} className="h-40 w-full object-cover" />
      <div className="p-4">
        <p className="text-xs font-semibold text-navy-800">{slot.label}</p>

        {error && <p className="mt-2 text-xs font-medium text-forge-600">{error}</p>}

        <div className="mt-3 flex items-center gap-2">
          <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-navy-900/30 px-3 py-2 text-xs font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
            <Upload size={14} />
            {busy ? 'Working…' : 'Replace'}
            <input type="file" accept="image/*" onChange={handleFile} disabled={busy} className="hidden" />
          </label>
          <button
            type="button"
            onClick={handleReset}
            disabled={busy}
            title="Reset to default placeholder"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-metal-300 text-navy-600 transition-colors hover:border-forge-400 hover:text-forge-600 disabled:opacity-60"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import { COMPANY } from '../data/siteData'
import { useSiteImages } from '../data/siteImages'

const initialForm = { name: '', email: '', phone: '', company: '', message: '' }

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!/^[+()\-\s\d]{7,}$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!form.message.trim()) errors.message = 'Please tell us about your requirement.'
  return errors
}

export default function Contact() {
  const siteImages = useSiteImages()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState('')
  const [sending, setSending] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendError('')
    const foundErrors = validate(form)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    setSending(true)
    try {
      // 1) Email — sent for real via EmailJS, lands directly in the inbox.
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            company: form.company || '—',
            message: form.message,
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        )
      }

      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Enquiry send failed:', err)
      setSendError('Something went wrong while sending your message. Please try again, or reach us directly by phone or WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact Us | Sumenar Engineering"
        description="Get in touch with Sumenar Engineering for magnetic lifter and magnetic separator enquiries, custom equipment quotes and support."
      />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-field-lines" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">Let&rsquo;s talk about your lifting or separation need.</h1>
          <p className="mt-5 max-w-xl text-base text-metal-300">
            Send us your requirement and our engineering team will get back to you with the
            right solution and a quote.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">Contact Details</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy-900 text-forge-400">
                  <Mail size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy-500">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm font-medium text-navy-900 hover:text-forge-500">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy-900 text-forge-400">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy-500">Phone</p>
                  <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="text-sm font-medium text-navy-900 hover:text-forge-500">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy-900 text-forge-400">
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy-500">Address</p>
                  <p className="text-sm font-medium text-navy-900">{COMPANY.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy-900 text-forge-400">
                  <Clock size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-navy-500">Working Hours</p>
                  <p className="text-sm font-medium text-navy-900">Mon &ndash; Sat, 9:00 AM &ndash; 6:30 PM</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-sm shadow-panel">
              <img
                src={siteImages['contact-facility']}
                alt="Sumenar Engineering facility exterior"
                className="h-52 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-sm border border-metal-300 bg-metal-100 p-7 sm:p-9">
            {submitted && (
              <div className="mb-6 flex items-start gap-3 rounded-sm border border-steel-400 bg-white p-4">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-forge-500" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Message has been sent successfully.</p>
                  <p className="mt-0.5 text-sm text-navy-700/80">
                    Thank you for reaching out — our team will get back to you shortly.
                  </p>
                </div>
              </div>
            )}

            {sendError && (
              <div className="mb-6 flex items-start gap-3 rounded-sm border border-forge-400 bg-white p-4">
                <AlertCircle size={20} className="mt-0.5 shrink-0 text-forge-500" />
                <p className="text-sm text-navy-800">{sendError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  className={inputClass(errors.name)}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className={inputClass(errors.email)}
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  className={inputClass(errors.phone)}
                  placeholder="+91 00000 00000"
                />
              </Field>
              <Field label="Company Name" error={errors.company}>
                <input
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  className={inputClass(errors.company)}
                  placeholder="Company (optional)"
                />
              </Field>
              <Field label="Message" error={errors.message} full>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={5}
                  className={inputClass(errors.message)}
                  placeholder="Tell us about the load, application or equipment you need"
                />
              </Field>

              <button type="submit" disabled={sending} className="btn-primary sm:col-span-2 w-fit disabled:opacity-60">
                {sending ? 'Sending…' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function inputClass(error) {
  return `w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus:border-forge-500 ${
    error ? 'border-forge-500' : 'border-metal-300'
  }`
}

function Field({ label, error, full, children }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs font-semibold text-navy-700">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1 block text-xs font-medium text-forge-500">{error}</span>}
    </label>
  )
}

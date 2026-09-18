import { NavLink } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Sumenar Engineering" description="The page you are looking for could not be found." />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-6xl font-bold text-forge-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-navy-700/80">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <NavLink to="/" className="btn-primary mt-8">
          Back to Home
        </NavLink>
      </section>
    </>
  )
}

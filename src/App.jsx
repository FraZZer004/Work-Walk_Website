import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Backdrop from './components/Backdrop'
import CookieBanner from './components/CookieBanner'
import FloatingActions from './components/FloatingActions'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Footer from './sections/Footer'
import Home from './pages/Home'
import { useLang } from './i18n'

// Secondary pages are only downloaded when they are visited.
const Privacy = lazy(() => import('./pages/Privacy'))
const Support = lazy(() => import('./pages/Support'))

/** A new page starts at the top; a link to a section (/#pro) scrolls to it. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

function PageLoader() {
  const { t } = useLang()
  return (
    <main id="main" className="flex min-h-[100svh] items-center justify-center" role="status" aria-label={t.a11y.loading}>
      <div className="spinner" />
    </main>
  )
}

function NotFound() {
  const { t } = useLang()
  return (
    <main id="main" tabIndex={-1} className="page mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-5 text-center outline-none">
      <p className="display text-flame text-[6rem]">404</p>
      <h1 className="title mt-2 text-3xl">{t.notFound.title}</h1>
      <Link to="/" className="mt-6 font-semibold text-accent">{t.notFound.back}</Link>
    </main>
  )
}

export default function App() {
  const { t } = useLang()

  const skipToContent = (event) => {
    event.preventDefault()
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
    main?.scrollIntoView({ behavior: 'instant' })
  }

  return (
    <>
      <a href="#main" onClick={skipToContent} className="skip-link rounded-full bg-accent px-5 py-3 font-semibold text-white">{t.a11y.skip}</a>
      <Backdrop />
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <p className="print-only px-5 pt-4 text-sm">Work&amp;Walk — https://workandwalk.eu</p>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingActions />
      <CookieBanner />
    </>
  )
}

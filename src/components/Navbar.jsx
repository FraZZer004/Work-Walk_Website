import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import AppStoreBadge from './AppStoreBadge'
import { asset } from '../utils/asset'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Health', href: '/#health' },
    { label: 'Salary', href: '/#salary' },
    { label: 'Support', href: '/support' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={asset('/app-icon.jpg')}
            alt="Work&Walk"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-display font-bold text-base tracking-tight">
            Work<span className="text-gradient-orange">&</span>Walk
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <AppStoreBadge compact />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#1C1C1E]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="page-container py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-white/70"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-white/70"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <AppStoreBadge />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

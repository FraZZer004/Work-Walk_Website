import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-12 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#080808' }}
    >
      <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link to="/" className="flex items-center gap-2">
            <img src="/app-icon.jpg" alt="Work&Walk" className="w-6 h-6 rounded-lg object-cover" />
            <span className="font-display font-bold text-sm">
              Work<span className="text-gradient-orange">&</span>Walk
            </span>
          </Link>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Every step at work counts.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <Link to="/privacy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
          <a href="/privacy#terms" className="hover:text-white transition-colors duration-200">
            Terms of Use
          </a>
          <Link to="/support" className="hover:text-white transition-colors duration-200">
            Support
          </Link>
          <a
            href="mailto:workandwalkapp@gmail.com"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs order-last sm:order-none" style={{ color: 'var(--text-tertiary)' }}>
          © {year} Work&Walk
        </p>
      </div>
    </footer>
  )
}

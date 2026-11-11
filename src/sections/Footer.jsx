/* global __BUILD_DATE__ */
import { Link } from 'react-router-dom'
import { SUPPORT_EMAIL } from '../components/FloatingActions'
import { useLang } from '../i18n'

export default function Footer() {
  const { t, lang } = useLang()

  const built = new Date(__BUILD_DATE__)
  const updated = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long', timeZone: 'Europe/Paris' }).format(built)
  const link = 'text-left transition-colors duration-150 hover:text-ink'

  return (
    <footer className="border-t border-hairline pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <img src="/icon-192.jpg" alt="" width="30" height="30" loading="lazy" className="h-[1.875rem] w-[1.875rem] rounded-[8px]" />
            <span>Work&amp;Walk</span>
          </Link>
          <p className="mt-3 text-sm text-muted">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.nav} className="no-print grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm text-muted">
          <Link to="/privacy" className={link}>{t.footer.privacy}</Link>
          <Link to="/support" className={link}>{t.footer.support}</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={link}>{t.footer.contact}</a>
          <button type="button" onClick={() => window.print()} className={link}>{t.footer.print}</button>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-faint">
        <p>© {built.getFullYear()} Work&amp;Walk. {t.footer.rights}</p>
        <p className="mt-1">{t.footer.apple}</p>
        <p className="mt-1">{t.footer.updated} <time dateTime={__BUILD_DATE__}>{updated}</time>.</p>
      </div>
    </footer>
  )
}

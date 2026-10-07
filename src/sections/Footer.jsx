/* global __BUILD_DATE__ */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { SUPPORT_EMAIL } from '../components/FloatingActions'
import { useConsent } from '../consent'
import { useLang } from '../i18n'

export default function Footer() {
  const { t, lang, resetLang } = useLang()
  const consent = useConsent()
  const [confirming, setConfirming] = useState(false)
  const [cleared, setCleared] = useState(false)

  const updated = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' }).format(new Date(__BUILD_DATE__))
  const link = 'text-left transition-colors duration-150 hover:text-ink'

  const clearPreferences = () => {
    setConfirming(false)
    resetLang()
    consent.reset()
    setCleared(true)
  }

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

        <nav aria-label={t.footer.nav} className="no-print grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm text-muted sm:grid-cols-3">
          <Link to="/privacy" className={link}>{t.footer.privacy}</Link>
          <Link to="/support" className={link}>{t.footer.support}</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={link}>{t.footer.contact}</a>
          <button type="button" onClick={consent.reopen} className={link}>{t.footer.cookies}</button>
          <button type="button" onClick={() => window.print()} className={link}>{t.footer.print}</button>
          <button type="button" onClick={() => { setCleared(false); setConfirming(true) }} className={link}>{t.footer.reset}</button>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-faint">
        <p role="status" className="mb-2 text-muted">{cleared ? t.footer.resetDone : ''}</p>
        <p>© {new Date().getFullYear()} Work&amp;Walk. {t.footer.rights}</p>
        <p className="mt-1">{t.footer.apple}</p>
        <p className="mt-1">{t.footer.updated} <time dateTime={__BUILD_DATE__}>{updated}</time>.</p>
      </div>

      <ConfirmDialog
        open={confirming}
        title={t.confirm.resetTitle}
        text={t.confirm.resetText}
        confirmLabel={t.confirm.resetOk}
        cancelLabel={t.confirm.cancel}
        onConfirm={clearPreferences}
        onCancel={() => setConfirming(false)}
      />
    </footer>
  )
}

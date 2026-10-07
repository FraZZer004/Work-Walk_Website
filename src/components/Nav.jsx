import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AppStoreButton from './AppStoreButton'
import { useLang } from '../i18n'

function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`h-10 items-center rounded-full bg-white/[0.07] p-1 text-[0.8125rem] font-semibold ${className}`} role="group" aria-label={t.a11y.language}>
      {['fr', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`pressable h-8 rounded-full px-3 uppercase ${lang === code ? 'bg-white/[0.16] text-ink' : 'text-muted hover:text-ink'}`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function Brand({ onClick }) {
  const { t } = useLang()
  return (
    <Link to="/" onClick={onClick} aria-label={t.a11y.home} className="pressable flex items-center gap-2.5 font-semibold tracking-tight">
      <img src="/icon-192.jpg" alt="" width="30" height="30" className="h-[1.875rem] w-[1.875rem] rounded-[8px]" />
      <span>Work&amp;Walk</span>
    </Link>
  )
}

/** The bar that stays at the top of every page, and the full menu it opens on small screens. */
export default function Nav() {
  const { t } = useLang()
  const { pathname, hash } = useLocation()
  const menuRef = useRef(null)

  const closeMenu = () => { if (menuRef.current?.open) menuRef.current.close() }
  useEffect(() => { if (menuRef.current?.open) menuRef.current.close() }, [pathname, hash])

  // A section link scrolls even when its hash is already in the address bar.
  const toSection = (id) => () => {
    closeMenu()
    if (pathname === '/') document.getElementById(id)?.scrollIntoView()
  }
  const sections = [
    { id: 'features', label: t.nav.features },
    { id: 'devices', label: t.nav.devices },
    { id: 'pro', label: t.nav.pro },
  ]

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 px-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
      <nav aria-label={t.a11y.main} className="glass mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full pl-4 pr-2">
        <Brand />

        <div className="ml-6 hidden items-center gap-6 text-sm text-muted md:flex">
          {sections.map((section) => (
            <Link key={section.id} to={`/#${section.id}`} onClick={toSection(section.id)} className="transition-colors duration-150 hover:text-ink">
              {section.label}
            </Link>
          ))}
          <Link to="/support" className="transition-colors duration-150 hover:text-ink">{t.nav.support}</Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitch className="hidden sm:flex" />
          <AppStoreButton compact placement="nav" />
          <button
            type="button"
            onClick={() => menuRef.current?.showModal()}
            aria-label={t.a11y.menu}
            aria-haspopup="dialog"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <dialog
        ref={menuRef}
        aria-label={t.a11y.main}
        onClick={(event) => { if (event.target === menuRef.current) closeMenu() }}
        className="sheet menu glass inset-x-3 bottom-auto top-[calc(0.75rem+env(safe-area-inset-top))] m-0 w-[calc(100%-1.5rem)] max-w-none rounded-[28px] p-0 text-ink"
      >
        <div className="p-4 pb-5">
          <div className="flex items-center justify-between">
            <Brand onClick={closeMenu} />
            <button type="button" autoFocus onClick={closeMenu} aria-label={t.a11y.close} className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07]">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-5">
            {sections.map((section, index) => (
              <li key={section.id} className="menu-item border-b border-white/[0.07]" style={{ '--i': index }}>
                <Link to={`/#${section.id}`} onClick={toSection(section.id)} className="title block py-3.5 text-[1.625rem]">{section.label}</Link>
              </li>
            ))}
            <li className="menu-item border-b border-white/[0.07]" style={{ '--i': 3 }}>
              <Link to="/support" onClick={closeMenu} className="title block py-3.5 text-[1.625rem]">{t.nav.support}</Link>
            </li>
            <li className="menu-item" style={{ '--i': 4 }}>
              <Link to="/privacy" onClick={closeMenu} className="title block py-3.5 text-[1.625rem]">{t.footer.privacy}</Link>
            </li>
          </ul>

          <div className="menu-item mt-4 flex items-center justify-between gap-3" style={{ '--i': 5 }}>
            <LanguageSwitch className="flex" />
            <AppStoreButton compact placement="menu" />
          </div>
        </div>
      </dialog>
    </header>
  )
}

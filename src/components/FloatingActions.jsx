import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Check, Copy, LifeBuoy, Mail, MessageCircle, X } from 'lucide-react'
import { useConsent } from '../consent'
import { useScroll } from '../hooks/useScroll'
import { useLang } from '../i18n'

export const SUPPORT_EMAIL = 'workandwalkapp@gmail.com'

/** Bottom-right corner: the contact button with its panel, and "back to top" once the page has scrolled. */
export default function FloatingActions() {
  const { t } = useLang()
  const { bannerOpen } = useConsent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef(null)
  const toggleRef = useRef(null)

  const update = useCallback(() => setScrolled(window.scrollY > window.innerHeight * 0.8), [])
  useScroll(update)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* clipboard unavailable: the address is written just above */ }
  }

  const row = 'pressable flex h-12 w-full items-center gap-3 rounded-2xl bg-white/[0.07] px-4 text-left text-[0.9375rem] font-semibold hover:bg-white/[0.12]'

  return (
    <div
      ref={rootRef}
      className={`no-print fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 ${bannerOpen ? 'max-sm:hidden' : ''}`}
    >
      <div
        id="contact-panel"
        role="dialog"
        aria-label={t.contact.title}
        data-hidden={!open}
        inert={!open}
        className="pop glass w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-[26px] p-5"
      >
        <h2 className="title text-xl">{t.contact.title}</h2>
        <p className="mt-1.5 text-[0.9375rem] text-muted">{t.contact.text}</p>
        <p className="mt-3 select-all break-all text-sm text-faint">{SUPPORT_EMAIL}</p>
        <div className="mt-4 space-y-2">
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Work%26Walk`} className={row}>
            <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            {t.contact.email}
          </a>
          <button type="button" onClick={copy} className={row}>
            {copied ? <Check className="h-5 w-5 text-accent" aria-hidden="true" /> : <Copy className="h-5 w-5 text-accent" aria-hidden="true" />}
            <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
          <Link to="/support" onClick={() => setOpen(false)} className={row}>
            <LifeBuoy className="h-5 w-5 text-accent" aria-hidden="true" />
            {t.contact.faq}
          </Link>
        </div>
      </div>

      {/* Side by side on phones, so only a thin strip at the bottom is covered */}
      <div className="flex flex-row items-center gap-3 md:flex-col">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label={t.a11y.top}
        data-hidden={!scrolled}
        inert={!scrolled}
        className="pop glass flex h-12 w-12 items-center justify-center rounded-full active:scale-95"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t.a11y.close : t.contact.button}
        aria-expanded={open}
        aria-controls="contact-panel"
        className="btn flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_34px_-12px_rgba(255,149,0,0.9)]"
      >
        <span className="sheen" aria-hidden="true" />
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </button>
      </div>
    </div>
  )
}

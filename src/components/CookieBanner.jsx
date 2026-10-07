import { Link } from 'react-router-dom'
import { useConsent } from '../consent'
import { useLang } from '../i18n'

/** Refusing takes one tap, exactly like accepting. Nothing is stored about the visit until then. */
export default function CookieBanner() {
  const { bannerOpen, decide } = useConsent()
  const { t } = useLang()

  return (
    <section
      aria-label={t.cookies.title}
      data-hidden={!bannerOpen}
      inert={!bannerOpen}
      className="pop glass no-print fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-[45] rounded-[26px] p-4 sm:right-auto sm:max-w-md sm:p-5"
    >
      <h2 className="font-semibold tracking-tight">{t.cookies.title}</h2>
      <p className="mt-1.5 text-sm text-muted sm:text-[0.9375rem]">
        {t.cookies.text}{' '}
        <Link to="/privacy" className="font-medium text-ink underline decoration-white/30 underline-offset-4 hover:decoration-accent">{t.cookies.more}</Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => decide('denied')} className="pressable h-11 rounded-2xl bg-white/[0.09] font-semibold hover:bg-white/[0.15]">
          {t.cookies.decline}
        </button>
        <button type="button" onClick={() => decide('granted')} className="pressable h-11 rounded-2xl bg-accent font-semibold text-white hover:bg-[#ffa21f]">
          {t.cookies.accept}
        </button>
      </div>
    </section>
  )
}

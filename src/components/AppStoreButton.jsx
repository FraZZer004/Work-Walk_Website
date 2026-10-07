import { useConsent } from '../consent'
import { useLang } from '../i18n'
import { storeUrl } from '../utils/tracking'

function AppleLogo({ className }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
  )
}

/**
 * The main call to action. `placement` says where on the site the button sits, so that
 * downloads can be traced back to it. `compact` is the short version of the navigation bar.
 */
export default function AppStoreButton({ placement, compact = false, className = '' }) {
  const { t } = useLang()
  const { campaign } = useConsent()
  const href = storeUrl(placement, campaign)

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-white ${className}`}
      >
        <span className="sheen" aria-hidden="true" />
        {t.nav.download}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.store.aria}
      className={`btn inline-flex h-[3.75rem] items-center gap-3 rounded-2xl bg-ink px-6 text-bg ${className}`}
    >
      <span className="sheen" aria-hidden="true" />
      <AppleLogo className="h-7 w-7" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[0.6875rem] font-medium opacity-70">{t.store.small}</span>
        <span className="mt-1 text-xl font-semibold tracking-tight">{t.store.big}</span>
      </span>
    </a>
  )
}

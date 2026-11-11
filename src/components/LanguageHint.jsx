import { useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Languages, X } from 'lucide-react'
import { useLang } from '../i18n'
import { browserLang, savedLang, subscribeLang } from '../langPreference'

// Written in the language it suggests, since that is the one the visitor reads.
const COPY = {
  fr: { go: 'Voir cette page en français', close: 'Rester sur la version anglaise' },
  en: { go: 'Read this page in English', close: 'Stay on the French version' },
}

/**
 * A visitor whose browser speaks the other language is offered the same page in it, once, without being redirected
 * (search engines must be able to read both versions). Following it or closing it remembers the choice.
 */
export default function LanguageHint() {
  const { lang, alternate, rememberLang } = useLang()
  const { hash } = useLocation()
  // Nothing on the server or during hydration: the browser's language is only known here.
  const suggested = useSyncExternalStore(subscribeLang, () => (savedLang() ? null : browserLang()), () => null)
  if (!suggested || suggested === lang) return null
  const copy = COPY[suggested]

  return (
    <aside
      lang={suggested}
      aria-label={copy.go}
      className="pop glass no-print fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-[5.5rem] z-[45] flex items-center gap-1 rounded-full p-1.5 sm:right-auto"
    >
      <Link
        to={alternate + hash}
        state={{ keepScroll: true }}
        onClick={() => rememberLang(suggested)}
        hrefLang={suggested}
        className="pressable flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-full pl-3 pr-4 text-[0.9375rem] font-semibold hover:bg-white/[0.08]"
      >
        <Languages className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate">{copy.go}</span>
      </Link>
      <button
        type="button"
        onClick={() => rememberLang(lang)}
        aria-label={copy.close}
        className="pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] hover:bg-white/[0.13]"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  )
}

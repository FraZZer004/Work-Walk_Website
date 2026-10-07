import { useEffect, useMemo, useState } from 'react'
import { LangContext } from './i18n'
import { fr } from './content/fr'
import { en } from './content/en'

const dictionaries = { fr, en }
const STORAGE_KEY = 'ww-lang'

// French for French browsers, English for everyone else — same rule as the app.
const browserLanguage = () => ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en')

function detectLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'fr' || saved === 'en') return saved
  } catch { /* storage unavailable: fall through */ }
  return browserLanguage()
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo(() => ({
    lang,
    t,
    setLang: (next) => {
      setLangState(next)
      try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    },
    resetLang: () => {
      try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
      setLangState(browserLanguage())
    },
  }), [lang, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

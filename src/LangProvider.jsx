import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { LangContext } from './i18n'
import { rememberLang } from './langPreference'
import { langOf, pageOf, pathOf, translatePath } from './routes'
import { dictionaries, pageMeta } from './seo'

/** The language comes from the address: French at the root, English under /en/. */
export function LangProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langOf(pathname)
  const t = dictionaries[lang]

  // Each prerendered page arrives with the right title; moving between pages in the browser updates it.
  useEffect(() => {
    const meta = pageMeta(lang, pageOf(pathname))
    document.documentElement.lang = lang
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [lang, pathname])

  const value = useMemo(() => ({
    lang,
    t,
    /** The address of one of the site's pages in the current language, with an optional #section. */
    to: (page, hash = '') => pathOf(lang, page) + hash,
    /** The current page in the other language. */
    alternate: translatePath(pathname, lang === 'fr' ? 'en' : 'fr'),
    /** Remembers the language the visitor picked, for their next visits. */
    rememberLang,
  }), [lang, t, pathname])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

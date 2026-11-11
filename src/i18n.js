import { createContext, useContext } from 'react'
import { fr } from './content/fr'

export const LangContext = createContext({ lang: 'fr', t: fr, to: () => '/', alternate: '/en/', rememberLang: () => {} })

/** The current language, its dictionary, and the addresses of the site's pages in it. */
export const useLang = () => useContext(LangContext)

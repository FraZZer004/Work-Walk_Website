import { createContext, useContext } from 'react'
import { en } from './content/en'

export const LangContext = createContext({ lang: 'en', t: en, setLang: () => {} })

/** Current language, its dictionary, and its setter. */
export const useLang = () => useContext(LangContext)

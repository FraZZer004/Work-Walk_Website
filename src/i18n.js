import { createContext, useContext } from 'react'
import { en } from './content/en'

export const LangContext = createContext({ lang: 'en', t: en, setLang: () => {}, resetLang: () => {} })

/** Current language, its dictionary, and the setters. */
export const useLang = () => useContext(LangContext)

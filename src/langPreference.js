/**
 * The language the visitor picked, kept in the browser. It is the only thing the site stores: index.html reads it
 * before the page is drawn and opens the same page in that language. Nothing is stored until the visitor picks.
 */
const KEY = 'ww-lang'
const listeners = new Set()

export function savedLang() {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'fr' || value === 'en' ? value : null
  } catch { return null }
}

export function rememberLang(lang) {
  try { localStorage.setItem(KEY, lang) } catch { /* storage unavailable */ }
  listeners.forEach((listener) => listener())
}

export function subscribeLang(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** French for French browsers, English for everyone else: the same rule as the app. */
export const browserLang = () => ((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en')

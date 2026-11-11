/**
 * The site's pages and their addresses. French lives at the root (/, /privacy, /support),
 * English under /en/ (/en/, /en/privacy, /en/support). Each address is a real HTML file (see scripts/prerender.js).
 */
export const SITE_URL = 'https://workandwalk.eu'
export const LANGS = ['fr', 'en']
export const PAGES = ['home', 'privacy', 'support']

const SLUGS = { home: '', privacy: 'privacy', support: 'support' }

/** The language of an address: English under /en, French everywhere else. */
export const langOf = (pathname) => (/^\/en(\/|$)/.test(pathname) ? 'en' : 'fr')

/** The address of a page in a language: pathOf('en', 'privacy') is '/en/privacy'. */
export function pathOf(lang, page) {
  const slug = SLUGS[page]
  if (lang === 'en') return slug ? `/en/${slug}` : '/en/'
  return `/${slug}`
}

/** The page an address shows, or null when there is none. */
export function pageOf(pathname) {
  const slug = pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '')
  return PAGES.find((page) => SLUGS[page] === slug) ?? null
}

/** The same page in another language (its home page when the address shows no page). */
export const translatePath = (pathname, lang) => pathOf(lang, pageOf(pathname) ?? 'home')

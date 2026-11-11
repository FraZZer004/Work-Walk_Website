import { fr } from './content/fr'
import { en } from './content/en'
import { LANGS, pathOf, SITE_URL } from './routes'
import { APP_STORE_URL } from './utils/tracking'

export const dictionaries = { fr, en }

/** Title and description of a page (page null: the "page not found" page). */
export function pageMeta(lang, page) {
  const t = dictionaries[lang]
  switch (page) {
    case 'home': return { title: t.meta.title, description: t.meta.description }
    case 'privacy': return { title: `${t.policy.title} — Work&Walk`, description: t.meta.privacy }
    case 'support': return { title: `${t.support.title} — Work&Walk`, description: t.meta.support }
    default: return { title: `${t.notFound.title} — Work&Walk`, description: t.meta.description }
  }
}

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON inside a <script> must never close it.
const json = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

/** What search engines read about the app (schema.org), and the questions of the help page. */
function structuredData(lang, page) {
  const t = dictionaries[lang]
  const data = [{
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Work&Walk',
    operatingSystem: 'iOS',
    applicationCategory: 'HealthApplication',
    description: t.meta.description,
    url: SITE_URL + pathOf(lang, 'home'),
    downloadUrl: APP_STORE_URL,
    inLanguage: LANGS,
    image: `${SITE_URL}/app-icon.jpg`,
    screenshot: ['home', 'schedule', 'analysis', 'salary'].map((id) => `${SITE_URL}/screens/${id}-${lang}.webp`),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }]
  if (page === 'support') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.support.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    })
  }
  return data
}

/** The <head> tags of a prerendered page: title, description, its address in each language, link previews. */
export function headTags(lang, page) {
  const t = dictionaries[lang]
  const meta = pageMeta(lang, page)
  const url = page ? SITE_URL + pathOf(lang, page) : null
  // Link previews (messages, social networks): the header of the app's page, in the page's language.
  const image = `${SITE_URL}/og-${lang}.jpg`

  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
  ]
  if (url) {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      ...LANGS.map((code) => `<link rel="alternate" hreflang="${code}" href="${SITE_URL + pathOf(code, page)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${SITE_URL + pathOf('fr', page)}" />`,
    )
  } else {
    tags.push('<meta name="robots" content="noindex" />')
  }
  tags.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Work&amp;Walk" />',
    `<meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_GB'}" />`,
    `<meta property="og:title" content="${escape(page === 'home' ? t.meta.share : meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:type" content="image/jpeg" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escape(t.meta.shareAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  )
  if (url) tags.push(`<meta property="og:url" content="${url}" />`)
  if (page) tags.push(`<script type="application/ld+json">${json(structuredData(lang, page))}</script>`)
  return tags.join('\n    ')
}

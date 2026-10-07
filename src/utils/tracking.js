export const APP_STORE_URL = 'https://apps.apple.com/app/work-walk/id6759506295'

// Your provider ID, from App Store Connect > Analytics > Campaign links. Apple only
// attributes downloads to the `ct` campaign token when this is filled in.
const APPLE_PROVIDER_ID = ''

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const token = (value) => String(value).toLowerCase().replace(/[^a-z0-9_.-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)

/** The UTM parameters of the link that brought the visitor here, if any. */
export function readCampaignFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const campaign = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) campaign[key] = token(value)
  }
  return Object.keys(campaign).length ? campaign : null
}

/**
 * The App Store link, tagged with where it was clicked (`placement`) and, when the
 * visitor agreed to it, with the campaign that brought them to the site.
 */
export function storeUrl(placement, campaign) {
  const url = new URL(APP_STORE_URL)
  const origin = campaign ? [campaign.utm_source, campaign.utm_campaign].filter(Boolean).join('-') : 'site'
  url.searchParams.set('utm_source', campaign?.utm_source ?? 'workandwalk.eu')
  url.searchParams.set('utm_medium', campaign?.utm_medium ?? 'website')
  url.searchParams.set('utm_campaign', campaign?.utm_campaign ?? 'site')
  url.searchParams.set('utm_content', placement)
  if (APPLE_PROVIDER_ID) url.searchParams.set('pt', APPLE_PROVIDER_ID)
  url.searchParams.set('ct', token(`${origin}-${placement}`))
  url.searchParams.set('mt', '8')
  return url.toString()
}

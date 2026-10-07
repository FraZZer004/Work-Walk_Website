import { useEffect, useMemo, useState } from 'react'
import { ConsentContext } from './consent'
import { readCampaignFromUrl } from './utils/tracking'

const CONSENT_KEY = 'ww-consent'
const CAMPAIGN_KEY = 'ww-utm'

function storedConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch { return null }
}

// The campaign of this visit: from the address bar, or kept from an earlier page of the same visit.
function initialCampaign() {
  try {
    return readCampaignFromUrl() ?? JSON.parse(sessionStorage.getItem(CAMPAIGN_KEY))
  } catch { return null }
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(storedConsent)
  const [bannerOpen, setBannerOpen] = useState(() => storedConsent() === null)
  const [campaign] = useState(initialCampaign)

  // Nothing about the visit is written to the browser until the visitor has agreed.
  useEffect(() => {
    try {
      if (consent === 'granted' && campaign) sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(campaign))
      else sessionStorage.removeItem(CAMPAIGN_KEY)
    } catch { /* storage unavailable */ }
  }, [consent, campaign])

  const value = useMemo(() => ({
    consent,
    bannerOpen,
    campaign: consent === 'granted' ? campaign : null,
    decide: (answer) => {
      setConsent(answer)
      setBannerOpen(false)
      try { localStorage.setItem(CONSENT_KEY, answer) } catch { /* ignore */ }
    },
    reopen: () => setBannerOpen(true),
    reset: () => {
      setConsent(null)
      setBannerOpen(true)
      try { localStorage.removeItem(CONSENT_KEY) } catch { /* ignore */ }
    },
  }), [consent, bannerOpen, campaign])

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

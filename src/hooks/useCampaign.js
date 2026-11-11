import { useSyncExternalStore } from 'react'
import { readCampaignFromUrl } from '../utils/tracking'

// The campaign of this visit: the UTM parameters of the link that brought the visitor here.
// It is read once from the address bar and only kept in memory, so nothing about the visit is written to the browser.
let campaign
const read = () => {
  if (campaign === undefined) campaign = readCampaignFromUrl()
  return campaign
}
const subscribe = () => () => {}

/** The visit's campaign, or null. Null while the prerendered page is being hydrated, which has none. */
export const useCampaign = () => useSyncExternalStore(subscribe, read, () => null)

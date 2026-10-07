import { createContext, useContext } from 'react'

export const ConsentContext = createContext({
  consent: null, bannerOpen: false, campaign: null, decide: () => {}, reopen: () => {}, reset: () => {},
})

/** The visitor's answer to the cookie banner, and the campaign they came from once they agreed. */
export const useConsent = () => useContext(ConsentContext)

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './LangProvider'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
)

// Every page arrives as finished HTML (scripts/prerender.js): React takes it over as it is. When the HTML is not the
// page of this address (the dev server, or the 404 page shown for an unknown one), React draws the page itself.
const page = (path) => path.replace(/\/+$/, '') || '/'
if (root.dataset.path && page(root.dataset.path) === page(window.location.pathname)) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}

// Earlier versions of the site kept the cookie banner's answer and the visit's campaign in the browser: tidy them up.
try {
  localStorage.removeItem('ww-consent')
  sessionStorage.removeItem('ww-utm')
} catch { /* storage unavailable */ }

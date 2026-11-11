import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './LangProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Earlier versions of the site kept the cookie banner's answer and the visit's campaign in the browser: tidy them up.
try {
  localStorage.removeItem('ww-consent')
  sessionStorage.removeItem('ww-utm')
} catch { /* storage unavailable */ }

// The loading screen of index.html leaves once the page has painted.
requestAnimationFrame(() => {
  const boot = document.getElementById('boot')
  if (!boot) return
  boot.classList.add('is-done')
  setTimeout(() => boot.remove(), 450)
})

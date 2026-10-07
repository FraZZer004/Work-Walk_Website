import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './LangProvider'
import { ConsentProvider } from './ConsentProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LangProvider>
        <ConsentProvider>
          <App />
        </ConsentProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)

// The loading screen of index.html leaves once the page has painted.
requestAnimationFrame(() => {
  const boot = document.getElementById('boot')
  if (!boot) return
  boot.classList.add('is-done')
  setTimeout(() => boot.remove(), 450)
})

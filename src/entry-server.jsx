import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { LangProvider } from './LangProvider'

export { LANGS, PAGES, SITE_URL, pathOf } from './routes'
export { headTags } from './seo'

/** The HTML of the page at `url`, once every lazy part of it has loaded. Used by scripts/prerender.js. */
export async function render(url) {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <LangProvider>
          <App />
        </LangProvider>
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}

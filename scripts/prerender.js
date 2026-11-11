/**
 * Writes every page of the site as finished HTML, in French and in English, so that it shows before any script has
 * run, answers with a real page (not a 404) at its own address, and can be read by search engines and link previews.
 * Runs after the two builds of `npm run build`: the browser one (dist/) and the server one (dist-ssr/).
 *
 *   dist/index.html  dist/privacy.html  dist/support.html          French: /, /privacy, /support
 *   dist/en/index.html  dist/en/privacy.html  dist/en/support.html  English: /en/, /en/privacy, /en/support
 *   dist/404.html, dist/sitemap.xml
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverBuild = join(root, 'dist-ssr')

const { render, headTags, LANGS, PAGES, SITE_URL, pathOf } = await import(pathToFileURL(join(serverBuild, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const fileOf = (path) => (path.endsWith('/') ? `${path}index.html` : `${path}.html`).slice(1)

function page({ lang, path, head, html }) {
  const filled = template
    .replace('<html lang="fr">', `<html lang="${lang}">`)
    .replace(/<!--page-->[\s\S]*?<!--\/page-->/, head)
    .replace('<div id="root"></div>', `<div id="root" data-path="${path}">${html}</div>`)
  if (filled === template || !filled.includes(`data-path="${path}"`)) throw new Error(`The template of index.html has changed: ${path} could not be written.`)
  return filled
}

async function write(file, content) {
  await mkdir(dirname(join(dist, file)), { recursive: true })
  await writeFile(join(dist, file), content)
  console.log(`  ${file}`)
}

console.log('Prerendering:')
for (const lang of LANGS) {
  for (const name of PAGES) {
    const path = pathOf(lang, name)
    await write(fileOf(path), page({ lang, path, head: headTags(lang, name), html: await render(path) }))
  }
}

// Any other address: GitHub Pages answers with 404.html (and a 404 status).
await write('404.html', page({ lang: 'fr', path: '/404', head: headTags('fr', null), html: await render('/404') }))

const lastmod = new Date().toISOString().slice(0, 10)
const urls = PAGES.flatMap((name) => LANGS.map((lang) => [
  '  <url>',
  `    <loc>${SITE_URL + pathOf(lang, name)}</loc>`,
  `    <lastmod>${lastmod}</lastmod>`,
  ...LANGS.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL + pathOf(code, name)}" />`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL + pathOf('fr', name)}" />`,
  '  </url>',
].join('\n')))
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`)

await rm(serverBuild, { recursive: true, force: true })

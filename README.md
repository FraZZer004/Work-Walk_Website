# Work&Walk — Website

Marketing website for the **Work&Walk** iOS app, served at [workandwalk.eu](https://workandwalk.eu).

## Stack

- Vite + React 19, every page prerendered to HTML at build time and hydrated in the browser
- Tailwind CSS v3 (design tokens mirror the app's dark theme)
- React Router v7
- Three.js for the 3D iPhone and Apple Watch (in a worker where the browser allows it)
- Lucide icons
- No animation library: CSS transitions and one `IntersectionObserver` hook

## Languages and addresses

French lives at the root, English under `/en/`. Each address is a real HTML file, so it answers with a 200 and can be indexed in both languages (with `hreflang` links between them).

| French | English | Page |
|---|---|---|
| `/` | `/en/` | Landing page (hero and app tour, details, watch and widget, PRO, privacy, FAQ) |
| `/privacy` | `/en/privacy` | Privacy policy (same text as in the app, plus a section about the website) |
| `/support` | `/en/support` | FAQ and contact |

The FR / EN switch opens the same page in the other language and remembers the choice (`ww-lang` in `localStorage`, the only thing the site stores). On later visits, `index.html` sends the visitor to their language before anything is drawn. A visitor whose browser speaks the other language is offered a link to it, never redirected. All copy lives in `src/content/fr.js` and `src/content/en.js`.

No cookies and no analytics. Links to the App Store carry where they were clicked (`placement`) and, when the visitor arrived through a link with UTM parameters, that campaign. The campaign is only kept in memory (`src/hooks/useCampaign.js`).

## Development

```bash
npm install
npm run dev      # http://localhost:5173 (pages are drawn in the browser, not prerendered)
npm run build    # browser build, server build, then scripts/prerender.js
npm run preview
npm run lint
```

## Build

`npm run build` runs three steps:

1. `vite build`: the browser bundle in `dist/`.
2. `vite build --ssr src/entry-server.jsx`: the same app for Node, in `dist-ssr/`.
3. `scripts/prerender.js`: renders each page in each language into `dist/` (`index.html`, `privacy.html`, `support.html`, `en/…`), plus `404.html` and `sitemap.xml`, then deletes `dist-ssr/`. The stylesheet (about 8 kB compressed) is written into each page, so the first paint needs no other file. Titles, descriptions, `hreflang`, link previews and schema.org data come from `src/seo.js`.

Code that runs while rendering must give the same result on the server and in the browser: anything that depends on the browser (window size, storage, language, the campaign) is read in effects or through `useSyncExternalStore` with a server value.

## Deployment

Pushing to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). GitHub Pages serves `privacy.html` at `/privacy`, and `404.html` for any other unknown address.

## Screenshots

App screenshots are in `public/screens/` as WebP, one per screen and language (`home-fr.webp`, `home-en.webp`, …). They are taken from the iOS simulator with the app's guided-tour sample data.

## Structure

```
index.html         page template; the inline script applies the remembered language before the page is drawn
scripts/
  prerender.js     writes the HTML of every page
src/
  content/         fr.js, en.js — all copy
  components/      Nav, AppStoreButton, LanguageHint, FloatingActions, WatchCanvas, WidgetTile, …
  hooks/           useInView, useScroll, useCampaign
  pages/           Home, Privacy, Support
  sections/        Showcase (hero and app tour), Details, Devices, Pro, PrivacyStrip, HomeFaq, FinalCTA, Footer
  three/           the 3D phone and watch
  routes.js        addresses of the pages in each language
  seo.js           titles, descriptions and <head> tags of each page
  LangProvider.jsx language of the current address
  main.jsx         browser entry (hydrates the prerendered page)
  entry-server.jsx server entry (used by scripts/prerender.js)
```

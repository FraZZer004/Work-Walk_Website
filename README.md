# Work&Walk — Website

Marketing website for the **Work&Walk** iOS app, served at [workandwalk.eu](https://workandwalk.eu).

## Stack

- Vite + React 19
- Tailwind CSS v3 (design tokens mirror the app's dark theme)
- React Router v7
- Lucide icons
- No animation library: CSS transitions and one `IntersectionObserver` hook

## Languages

French and English. The site follows the browser language (French for French browsers, English otherwise) and remembers the visitor's choice. All copy lives in `src/content/fr.js` and `src/content/en.js`.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page (hero, app tour, details, watch and widget, goals, PRO, privacy) |
| `/privacy` | Privacy policy (same text as in the app) |
| `/support` | FAQ and contact |

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Deployment

Pushing to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). `public/404.html` redirects deep links back to the single-page app.

## Screenshots

App screenshots are in `public/screens/` as WebP, one per screen and language (`home-fr.webp`, `home-en.webp`, …). They are taken from the iOS simulator with the app's guided-tour sample data.

## Structure

```
src/
  content/         fr.js, en.js — all copy
  components/      Nav, AppStoreButton, Phone, Reveal
  hooks/           useInView
  sections/        Hero, Tour, Details, Devices, Goals, Pro, PrivacyStrip, FinalCTA, Footer
  pages/           Home, Privacy, Support
  LangProvider.jsx language detection and persistence
  i18n.js          useLang hook
```

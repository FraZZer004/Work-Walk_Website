# Work&Walk — Marketing Website

Official marketing website for the **Work&Walk** iOS app. Built with Vite + React, Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Vite + React 19 (no Next.js required)
- **Styling**: Tailwind CSS v3 + CSS custom properties
- **Animations**: Framer Motion v12
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Fonts**: Syne (display) + DM Sans (body) + DM Mono (numbers)

## Pages

| Route | Description |
|---|---|
| `/` | Landing page (Hero → Features → Showcases → Trophies → Premium → CTA) |
| `/privacy` | Privacy Policy |
| `/support` | FAQ + contact form |

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Before going live

1. **App Store URL** — update `APP_STORE_URL` in `src/components/AppStoreBadge.jsx`
2. **Domain** — update URLs in `public/sitemap.xml` and `public/robots.txt`
3. **Contact email** — already set to `alan2004.krieger@gmail.com` in Footer and Support

## Deploy to Vercel

The `vercel.json` at the root configures SPA routing rewrites so that `/privacy` and `/support` work correctly on reload.

```bash
# One-click deploy
npx vercel
```

Or connect the GitHub repo to Vercel — it auto-detects Vite and runs `npm run build`.

## Assets

All images are in `public/`:

| File | Description |
|---|---|
| `app-icon.jpg` | App icon (rounded square) — used as favicon + OG image |
| `app-logo.jpg` | Full logo asset |
| `screenshot-home.png` | Dashboard tab screenshot |
| `screenshot-analyse.png` | Analytics tab screenshot |
| `screenshot-schedule.png` | Schedule tab screenshot |
| `screenshot-salary.png` | Salary tab screenshot |
| `screenshot-profile.png` | Profile/Health tab screenshot |

## Project structure

```
src/
  components/
    Navbar.jsx          Sticky navbar with blur + mobile menu
    DeviceFrame.jsx     CSS iPhone 16 Pro mockup
    AnimatedCounter.jsx Scroll-triggered number animation
    AppStoreBadge.jsx   App Store download button
  sections/
    Hero.jsx            Full-screen hero with device frame
    Features.jsx        3-column glass card highlights
    ShowcaseSection.jsx Reusable alternating showcase layout
    Trophies.jsx        Achievement grid (5 categories)
    Premium.jsx         Premium features card with crown
    FinalCTA.jsx        Final App Store call to action
    Footer.jsx          Footer with links
  pages/
    Home.jsx            Assembles all sections
    Privacy.jsx         Privacy policy
    Support.jsx         FAQ + contact
  App.jsx               React Router routes
  main.jsx              BrowserRouter entry
  index.css             Global styles, design tokens, grain overlay
```

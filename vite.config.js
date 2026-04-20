import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE_PATH is set by the GitHub Actions workflow for GitHub Pages.
// For local dev and Vercel, it defaults to '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
})

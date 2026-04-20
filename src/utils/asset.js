// Prefix a public/ asset path with Vite's BASE_URL so it works on
// both localhost (base = '/') and GitHub Pages (base = '/Work-Walk_Website/').
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

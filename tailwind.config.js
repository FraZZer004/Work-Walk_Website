/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // :hover only where a real pointer can hover (no sticky hover after a tap)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        // System font: on Apple devices this is SF Pro, the app's own typeface
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        rounded: ['ui-rounded', '"SF Pro Rounded"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Same tokens as the app's dark theme (Theme.swift)
        bg: '#0a0908',
        surface: '#1d1c1a',
        raised: '#272624',
        hairline: 'rgba(255,255,255,0.10)',
        ink: '#f5f2ee',
        muted: 'rgba(245,242,238,0.62)',
        faint: 'rgba(245,242,238,0.38)',
        accent: '#ff9500',
      },
      borderRadius: {
        card: '22px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}

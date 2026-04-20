/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#FF8000',
          bright: '#FF9900',
          gold: '#FFDD00',
          dark: '#CC6600',
          deep: '#994C00',
          streak: '#FF7200',
        },
        card: {
          DEFAULT: '#1C1C1E',
          light: '#2C2C2E',
        },
        bg: '#0A0A0A',
        trophy: {
          health: '#FF9500',
          session: '#FF6666',
          time: '#FFBF00',
          money: '#CC6600',
          streak: '#FF7200',
        },
        metric: {
          steps: '#FF9500',
          'cal-start': '#FF3B30',
          'cal-end': '#FF9500',
          'dist-start': '#34C759',
          'dist-end': '#00C7BE',
          'hr-start': '#FF2D55',
          'hr-end': '#AF52DE',
          'floors-start': '#32ADE6',
          'floors-end': '#007AFF',
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #FFDD00 0%, #FF9900 100%)',
        'gradient-fire': 'linear-gradient(135deg, #FF8000 0%, #FF3B30 100%)',
        'gradient-health': 'linear-gradient(135deg, #34C759 0%, #00C7BE 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF8000 0%, #FF9900 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

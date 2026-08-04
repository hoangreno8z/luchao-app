/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      colors: {
        'bg-dark': '#0f0a05',
        'bg-card': 'rgba(22, 15, 8, 0.85)',
        gold: {
          DEFAULT: '#dfb15b',
          dark: '#aa8033',
          glow: 'rgba(223, 177, 91, 0.4)',
        },
        ancient: {
          red: '#8b0000',
        },
        muted: '#bda287',
        border: '#3d2a19',
      },
    },
  },
  plugins: [],
}

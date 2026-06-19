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
        sans: ['var(--font-inter)'],
        display: ['var(--font-syne)'],
      },
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        accent: {
          DEFAULT: '#B4FF4F',
          light: '#C8FF7A',
          dark: '#8FCC2A',
          muted: '#B4FF4F22',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.700'),
            a: { color: theme('colors.accent.DEFAULT') },
            h1: { color: theme('colors.stone.900'), fontFamily: theme('fontFamily.display').join(', ') },
            h2: { color: theme('colors.stone.900'), fontFamily: theme('fontFamily.display').join(', ') },
            h3: { color: theme('colors.stone.900') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

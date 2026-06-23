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
        sans: ['var(--font-barlow)', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
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
      fontSize: {
        'giant': ['clamp(4rem,12vw,10rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'huge':  ['clamp(2.5rem,7vw,6rem)',  { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.300'),
            a: { color: theme('colors.accent.DEFAULT') },
            h1: { color: theme('colors.white'), fontFamily: 'var(--font-barlow-condensed)', fontWeight: '700', textTransform: 'uppercase' },
            h2: { color: theme('colors.white'), fontFamily: 'var(--font-barlow-condensed)', fontWeight: '700', textTransform: 'uppercase' },
            h3: { color: theme('colors.white'), fontFamily: 'var(--font-barlow-condensed)', fontWeight: '600' },
            strong: { color: theme('colors.white') },
            blockquote: { borderLeftColor: theme('colors.accent.DEFAULT'), color: theme('colors.stone.300') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

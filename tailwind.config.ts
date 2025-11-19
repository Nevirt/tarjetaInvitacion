import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores pastel inspirados en la tarjeta
        'paper': '#FAF7F2',
        'rose': '#F4E4E1',
        'peach': '#F8E5D6',
        'beige': '#E8DDD4',
        'sage': '#D4D9C7',
        'accent-rose': '#E8B8B0',
        'accent-peach': '#F0C9A8',
        'text-primary': '#5A4A42',
        'text-secondary': '#8B7A6F',
      },
      fontFamily: {
        'serif': ['var(--font-playfair)'],
        'script': ['var(--font-great-vibes)'],
        'sans': ['var(--font-inter)'],
        'handwriting': ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('/paper-texture.png')",
      },
    },
  },
  plugins: [],
}
export default config


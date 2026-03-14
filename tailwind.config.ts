import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // DreamEstate Brand Palette
        brand: {
          coral:      '#C0392B',
          'coral-light': '#FADBD8',
          teal:       '#148F77',
          'teal-light': '#D1F2EB',
          navy:       '#0D1B2A',
          'navy-mid': '#1A2E44',
          gold:       '#D4AC0D',
          'gold-light': '#FEF9E7',
          cream:      '#FAF7F0',
        },
        // Semantic aliases
        primary:   '#C0392B',
        secondary: '#148F77',
        dark:      '#0D1B2A',
        muted:     '#4A5568',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':  'linear-gradient(135deg, #0D1B2A 0%, #1A2E44 60%, #0D1B2A 100%)',
        'card-gradient':  'linear-gradient(180deg, rgba(13,27,42,0) 0%, rgba(13,27,42,0.85) 100%)',
        'coral-gradient': 'linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)',
      },
      boxShadow: {
        'card':   '0 4px 24px rgba(0,0,0,0.12)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.22)',
        'glow':   '0 0 24px rgba(192,57,43,0.35)',
        'gold-glow': '0 0 20px rgba(212,172,13,0.4)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'slide-in':  'slideIn 0.5s ease-out forwards',
        'pulse-slow':'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config

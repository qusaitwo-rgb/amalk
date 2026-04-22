/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        arabic: ['Noto Kufi Arabic', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0D1B3E',
          mid: '#112255',
          light: '#1A3068',
          lighter: '#1E3A7A',
          deep: '#080F24',
        },
        orange: {
          DEFAULT: '#F05A00',
          light: '#FF7A2F',
          dark: '#C44A00',
          muted: 'rgba(240,90,0,0.15)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D060',
          dark: '#B8960C',
          muted: 'rgba(212,175,55,0.15)',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          hover: 'rgba(255,255,255,0.08)',
          active: 'rgba(255,255,255,0.12)',
        },
        glass: {
          border: 'rgba(255,255,255,0.12)',
          'border-gold': 'rgba(212,175,55,0.25)',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #B8960C 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F05A00 0%, #FF7A2F 50%, #C44A00 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0D1B3E 0%, #112255 50%, #0D1B3E 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(17,34,85,0.9) 0%, #0D1B3E 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'draw-line': 'drawLine 2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.4s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)',
        'gold-lg': '0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)',
        'orange': '0 0 20px rgba(240,90,0,0.35), 0 0 40px rgba(240,90,0,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.12)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.18)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      // Enterprise System Fonts
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },

      // Enterprise Color Palette - Conservative & Predictable
      colors: {
        // Primary Brand Color - Single green only
        primary: {
          DEFAULT: '#3d8f6a',
          50: '#f0f9f5',
          100: '#d9f0e5',
          200: '#b6e2cc',
          300: '#88cfad',
          400: '#5bb68b',
          500: '#3d8f6a',
          600: '#2f7556',
          700: '#265d45',
          800: '#204a38',
          900: '#1b3e2f',
        },
      },

      // Minimal Border Radius
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },

      // Subtle Shadows Only
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },

      // State Transitions Only - No Decorative Animation
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

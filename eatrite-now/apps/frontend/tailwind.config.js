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
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // EatRite Premium Brand Typography
      fontFamily: {
        'heading': ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'body': ['"Inter"', '"Nunito"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['"JetBrains Mono"', '"Fira Code"', 'Monaco', 'monospace'],
      },

      // EatRite Premium Brand Colors
      colors: {
        // Brand Primary Colors
        brand: {
          gold: '#D4B46A',
          'dark-green': '#0F2B1E',
          'soft-black': '#0A0A0A',
          'off-white': '#F5F2E8',
        },
        
        // Surface Colors
        surface: {
          primary: '#0F2B1E',
          secondary: '#152D22',
          tertiary: '#1A3327',
          overlay: '#0A0A0A',
          accent: '#D4B46A',
        },

        // Text Colors
        text: {
          primary: '#F5F2E8',
          secondary: '#E0DDD5',
          tertiary: '#B8B5AD',
          accent: '#D4B46A',
          inverse: '#0A0A0A',
        },

        // Status Colors
        success: '#4A7C59',
        warning: '#D4B46A',
        error: '#CC4444',
        info: '#5A8A7A',

        // Legacy colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Premium Border Radius
      borderRadius: {
        'premium': '0.875rem',  // 14px - matches logo aesthetic
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Premium Shadows with Gold Glow
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 180, 106, 0.3)',
        'gold-glow-md': '0 0 30px rgba(212, 180, 106, 0.4)',
        'gold-glow-lg': '0 0 40px rgba(212, 180, 106, 0.5)',
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'premium-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      },

      // Premium Animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gold-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(212, 180, 106, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(212, 180, 106, 0.6)" 
          },
        },
        "gentle-float": {
          "0%, 100%": { 
            transform: "translateY(0px)" 
          },
          "50%": { 
            transform: "translateY(-10px)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gold-pulse": "gold-pulse 2s ease-in-out infinite",
        "gentle-float": "gentle-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================
      // CORES CUSTOMIZADAS (Baseada nas imagens)
      // ============================================
      colors: {
        // Roxo Primário (cor principal da marca)
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Roxo principal
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Rosa/Magenta (complementar)
        rose: {
          50: '#fff7ed',
          100: '#ffe4d6',
          200: '#ffd4c4',
          300: '#ffa48d',
          400: '#ff8a5b',
          500: '#ff6b35',
          600: '#e85d2f',
          700: '#c4521e',
          800: '#a3471c',
          900: '#83341c',
        },
        // Ouro/Amarelo (destaque)
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutro (backgrounds e texts)
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716b',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },

      // ============================================
      // TIPOGRAFIA CUSTOMIZADA
      // ============================================
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },

      // ============================================
      // ANIMAÇÕES CUSTOMIZADAS
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce-light': 'bounceLightAnimation 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceLightAnimation: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },

      // ============================================
      // SPACING CUSTOMIZADO
      // ============================================
      spacing: {
        '128': '32rem',
        '144': '36rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },

      // ============================================
      // SOMBRAS CUSTOMIZADAS
      // ============================================
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hard': '0 12px 32px rgba(0, 0, 0, 0.16)',
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-rose': '0 0 20px rgba(255, 107, 53, 0.3)',
      },

      // ============================================
      // BORDER RADIUS CUSTOMIZADO
      // ============================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ============================================
      // BACKDROP FILTERS
      // ============================================
      backdropBlur: {
        'xs': '2px',
      },

      // ============================================
      // GRADIENTES CUSTOMIZADOS
      // ============================================
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
        'gradient-rose': 'linear-gradient(135deg, #ff6b35 0%, #ff8a5b 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        'gradient-soft': 'linear-gradient(180deg, #faf5ff 0%, #fae8ff 100%)',
      },

      // ============================================
      // TRANSIÇÕES
      // ============================================
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [
    // ============================================
    // PLUGIN CUSTOMIZADO PARA SCROLLBAR
    // ============================================
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

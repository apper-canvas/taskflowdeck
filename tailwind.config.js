/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B47E0',
        secondary: '#8B7FE8',
        accent: '#FFB547',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        background: '#F7F9FC',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      scale: {
        '102': '1.02'
      },
      animation: {
        'checkbox': 'checkbox 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in': 'fadeIn 200ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite'
      },
      keyframes: {
        checkbox: {
          '0%': { transform: 'scale(0) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(180deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
}
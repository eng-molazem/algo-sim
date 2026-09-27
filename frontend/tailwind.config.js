/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#b9d0ff',
          300: '#8bb0ff',
          400: '#5c88ff',
          500: '#3a63f7',
          600: '#2947db',
          700: '#2237b0',
          800: '#1f318c',
          900: '#1e2c70',
          950: '#141b47',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#2b0a45',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(58, 99, 247, 0.55)',
        'glow-accent': '0 0 40px -8px rgba(168, 85, 247, 0.55)',
        elevated: '0 10px 30px -10px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3a63f7 0%, #9333ea 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #eef4ff 0%, #f3e8ff 100%)',
        'mesh-dark': 'radial-gradient(at 20% 0%, rgba(58,99,247,0.25) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(147,51,234,0.25) 0px, transparent 50%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

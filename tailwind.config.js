export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:       { DEFAULT: '#0A1828', light: '#0d2137', deep: '#060f18' },
        turquoise:  { DEFAULT: '#178582', light: '#1fa8a4', dark: '#0f5c5a' },
        gold:       { DEFAULT: '#BFA181', light: '#d4b896', dark: '#8a7358' },
      },
      backgroundImage: {
        'gradient-main':   'linear-gradient(135deg, #0A1828 0%, #0d2137 60%, #0A1828 100%)',
        'gradient-accent': 'linear-gradient(135deg, #178582 0%, #BFA181 100%)',
        'gradient-hero':   'linear-gradient(135deg, #0A1828 0%, #0f2a3a 50%, #178582 100%)',
      },
      boxShadow: {
        'glass':          '0 8px 32px rgba(23,133,130,0.15)',
        'glow-turquoise': '0 0 24px rgba(23,133,130,0.45)',
        'glow-gold':      '0 0 24px rgba(191,161,129,0.35)',
      },
    },
  },
  plugins: [],
}

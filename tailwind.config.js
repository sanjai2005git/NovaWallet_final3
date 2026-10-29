/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nova: {
          dark: '#080A0F',
          card: '#0D111A',
          cardHover: '#131926',
          panel: '#101623',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
          borderGlow: 'rgba(0, 242, 157, 0.3)',
          mint: '#00F29D',
          mintHover: '#00D68A',
          mintDark: '#059669',
          cyan: '#00D2FF',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          gold: '#F59E0B',
          red: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace']
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 242, 157, 0.15)',
        'glow': '0 0 24px rgba(0, 242, 157, 0.22)',
        'glow-lg': '0 0 45px rgba(0, 242, 157, 0.32)',
        'card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mint-gradient': 'linear-gradient(135deg, #00F29D 0%, #00D68A 100%)',
        'cyber-gradient': 'linear-gradient(180deg, rgba(0, 242, 157, 0.15) 0%, rgba(13, 17, 26, 0) 100%)',
      }
    },
  },
  plugins: [],
}

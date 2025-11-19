/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-panel': '#1E1E1E',
        'dark-border': '#2D2D2D',
        'accent-blue': '#3B82F6',
        'accent-green': '#10B981',
        'accent-yellow': '#F59E0B',
        'accent-red': '#EF4444',
        'accent-orange': '#F97316',
        'text-light': '#E5E7EB',
        'text-muted': '#9CA3AF',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0)' },
        },
        'pulse-yellow': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 15px 5px rgba(245, 158, 11, 0)' },
        },
        'pulse-blue': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0)' },
        },
      },
      animation: {
        'pulse-green': 'pulse-green 2s infinite',
        'pulse-yellow': 'pulse-yellow 2s infinite',
        'pulse-blue': 'pulse-blue 2s infinite',
      },
      boxShadow: {
        'glow-green': '0 0 20px 5px rgba(16, 185, 129, 0.3)',
        'glow-yellow': '0 0 20px 5px rgba(245, 158, 11, 0.3)',
        'glow-blue': '0 0 20px 5px rgba(59, 130, 246, 0.3)',
        'glow-red': '0 0 20px 5px rgba(239, 68, 68, 0.3)',
        'glow-orange': '0 0 20px 5px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}

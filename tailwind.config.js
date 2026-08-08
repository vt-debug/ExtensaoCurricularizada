/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maranata: {
          red: '#DC2626',
          brightRed: '#E50914',
          darkRed: '#B91C1C',
          deepRed: '#991B1B',
          lightRed: '#FEF2F2',
          softRed: '#FEE2E2',
          borderRed: '#FCA5A5',
          white: '#FFFFFF',
          bgLight: '#F8FAFC',
          cardWhite: '#FFFFFF',
          textDark: '#0F172A',
          textMuted: '#64748B'
        }
      },
      boxShadow: {
        'card-glow': '0 10px 35px -5px rgba(220, 38, 38, 0.08), 0 4px 15px -3px rgba(0, 0, 0, 0.04)',
        'red-glow': '0 12px 35px -5px rgba(220, 38, 38, 0.35)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "#f8fafc",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
        },
        accent: "#2563eb",
        textMain: "#0f172a",
        textMuted: "#64748b",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

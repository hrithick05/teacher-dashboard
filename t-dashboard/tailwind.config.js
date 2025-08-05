module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // blue
        secondary: "#16a34a", // green
        accent: "#d97706", // amber
        background: "#f3f4f6", // light gray
        foreground: "#1f2937", // dark gray
        muted: "#6b7280", // gray
        destructive: "#ef4444", // red
      },
      borderColor: {
        border: "#d1d5db", // gray border
      },
    },
  },
  plugins: [],
}

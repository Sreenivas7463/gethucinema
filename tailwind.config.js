/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Use class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // indigo-600
        secondary: "#7C3AED", // violet-600
        background: "var(--background)",
        text: "var(--text)",
        card: "var(--card)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

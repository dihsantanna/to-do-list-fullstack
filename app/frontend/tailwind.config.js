/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "checkmark": "checkmark 1s ease-in-out",
      },
      keyframes: {
        checkmark: {
          "0%": {
            fill: "#9ca3af"
          },
          "100%": {
            fill: "#4ade80"
          },
        }
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

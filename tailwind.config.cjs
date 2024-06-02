/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "slate": {
          50: "#f4f4f7",
          100: "#e4e5e9",
          200: "#ccced5",
          300: "#a5a7b4",
          400: "#9091a0",
          500: "#737485",
          600: "#484958",
          700: "#312f3a",
          800: "#252529",
          900: "#141417",
          950: "#0b0b0d",
        }
      }
    }
  },
  plugins: []
};

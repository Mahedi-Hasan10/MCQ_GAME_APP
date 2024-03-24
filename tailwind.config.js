/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#FFC107",
        success: "#28A745",
        danger: "#DC3545",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

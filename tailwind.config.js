/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: false, // Set this to false temporarily to see if CSS is being removed incorrectly
  theme: {
    extend: {colors: {
      'wine-red': '#8B0000', // Deep wine color
      'wine-light': '#B22222', // Lighter shade of wine color for hover effects
    },},
  },
  plugins: [],
};
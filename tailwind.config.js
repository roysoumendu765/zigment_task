/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#f59e0b',
        },
        gray: {
          100: '#f7fafc', 
          200: '#edf2f7', 
          600: '#4a5568',
        },
      },
      transitionProperty: {
        'all': 'all 0.3s ease',
      },
    },
  },
  plugins: [],
}


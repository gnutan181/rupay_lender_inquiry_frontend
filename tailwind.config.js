/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter : 'Inter'
      },
      screens: {
        'xs': '450px',
        '3xl': '1700px',
        '4xl' : '2000px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}


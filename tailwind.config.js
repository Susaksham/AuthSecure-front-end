/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily : {
      'bebas' : ['Bebas Neue', 'cursive'],
      'Anton': ['Anton', 'sans-serif'],
      'Syne' : ['Syne Mono', "monospace"]
    },
    screens:{
      'mobile':'300px',
      'tablet': '640px',
      

      'laptop': '1024px',


      'desktop': '1280px',
    }
  },
  plugins: [],
}

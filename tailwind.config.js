/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue, js, ts, jsx, tsx}', './src/components/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      colors: {
        "at-light-green": "#44ba9f",
        "at-green": "#286d5d",
        "light-grey": "#f1f1f1",
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },  
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },

    fontFamily: {
      'clash-variable': 'ClashDisplay-Variable',
      'clash-extralight': 'ClashDisplay-Extralight',
      'clash-light': 'ClashDisplay-Light',
      'clash-regular': 'ClashDisplay-Regular',
      'clash-medium': 'ClashDisplay-Medium',
      'clash-semibold': 'ClashDisplay-Semibold',
      'clash-bold': 'ClashDisplay-Bold',

    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      "2xl": '1.563rem',
      "3xl": '1.953rem',
      "4xl": '2.441rem',
      "5xl": '3.052rem',
      "6xl": '3.621rem',
      "7xl": '4.352rem',

    },

    extend: {
      colors: {
        'tangerine': '#e57b07',
        'tangerine-light': '#f2bd83',
        'yellow-light': '#EFAF00',
      },
      
    },
  },
  plugins: [],
}

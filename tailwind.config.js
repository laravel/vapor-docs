const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
import config from './node_modules/pilgrim-theme/tailwind.config.js'

const primary = {
//   50: '#f2f9ff',
//   100: '#e6f3ff',
//   200: '#bfdeff',
//   300: '#99c9ff',
//   400: '#4da0ff',
  500: '#4099DE',
//   600: '#006ee6',
//   700: '#0059bf',
//   800: '#004599',
//   900: '#003872',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('./node_modules/pilgrim-theme/tailwind.config.js')
  ],
  
  content: [
    ...config.content,
    // './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: { primary },
    },
  },
}

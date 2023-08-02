const defaultTheme = require('tailwindcss/defaultTheme')
import tailwindConfig from '@hempworks/pilgrim/tailwind.config'

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
    tailwindConfig,
  ],
  
  content: [
    ...tailwindConfig.content,
    // './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: { primary },
    },
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FB536A',
        // accent: '#9c79fd',
        accent : '#8866Ff',
        dark: '#2F2E41',
        darkText: '#eee',
        white: '#fff',
        link: '#9c79fd',
        grey: 'grey',
        black: 'black',
        darkInputBg: '#1a1a1a',
        inputBg: '#f2f2f4',
        transparent: 'transparent',
        routine_bg: '#f5f5f5',
        routine_border: '#ededed',
        routine_bg_dark: '#1a1a1a',
        routine_border_dark: '#282828',
      }
    },
  },
  plugins: [

  ],
  darkMode: 'class'
}
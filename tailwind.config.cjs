/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      pink: '#FB536A',
      accent: '#9c79fd',
      dark: '#2F2E41',
      darkText: '#eee',
      white: '#fff',
      link: '#9c79fd',
      gray: 'gray',
      black: 'black',
      darkInputBg: '#1a1a1a',
      inputBg: '#f2f2f4',
      transparent: 'transparent',
    }
  },
  plugins: [],
  darkMode: 'class'
}
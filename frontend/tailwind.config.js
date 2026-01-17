/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        secondary: '#27AE60',
        accent: '#FFC107',
      },
    },
  },
  plugins: [],
}

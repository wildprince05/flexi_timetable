/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
        sidebar: '#2A3038',
        sidebarText: '#B1B3B9',
      }
    },
  },
  plugins: [],
}

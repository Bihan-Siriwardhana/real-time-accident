/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable manual dark mode switching via `class="dark"`
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        primaryHover: '#535bf2',
        buttonBgLight: '#f9f9f9',
        buttonBgDark: '#1a1a1a',
        textLight: '#213547',
        textDark: 'rgba(255, 255, 255, 0.87)',
        bgLight: '#ffffff',
        bgDark: '#242424',
      },
      fontFamily: {
        system: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

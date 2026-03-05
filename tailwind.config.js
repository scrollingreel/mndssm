/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f5',
          100: '#fce8eb',
          200: '#f9d5db',
          300: '#f4b4be',
          400: '#ec8999',
          500: '#dc5472',
          600: '#c93d5b',
          700: '#a92d49',
          800: '#8d2841',
          900: '#78263c',
        },
        gold: {
          50: '#fdfaed',
          100: '#faf2cb',
          200: '#f5e392',
          300: '#f0d05a',
          400: '#ebbe34',
          500: '#d9a01e',
          600: '#bc7c17',
          700: '#9c5b17',
          800: '#81481a',
          900: '#6c3c1a',
        }
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

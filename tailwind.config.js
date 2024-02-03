/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
        95: '0.95',
      },
      colors: {
        'peach-pink': '#fee2bb',
        'fruit-category': '#FF5064',
      },
    },
  },
  plugins: [],
};

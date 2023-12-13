/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/HomeScreen.{js,jsx,ts,tsx}',
    './screens/WelcomeScreen.{js,jsx,ts,tsx}',

    './screens/NoteScreen.{js,jsx,ts,tsx}',
    './screens/SearchScreen.{js,jsx,ts,tsx}',
    './screens/SearchInfoScreen.{js,jsx,ts,tsx}',
    './screens/BookInfoScreen.{js,jsx,ts,tsx}',
    './screens/BookCategoryScreen.{js,jsx,ts,tsx}',
    './screens/AddNoteScreen.{js,jsx,ts,tsx}',
    './screens/EditNoteScreen.{js,jsx,ts,tsx}',

    './components/EmptyList.{js,jsx,ts,tsx}',
    './components/Loading.{js,jsx,ts,tsx}',
    './components/BookWithTitle.{js,jsx,ts,tsx}',
    './components/Features.{js,jsx,ts,tsx}',
    './components/ScreenWrapper.{js,jsx,ts,tsx}',
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

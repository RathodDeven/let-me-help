/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // here d is for dark mode color
        'p-text': '#000000',
        'p-text-d': '#c3c7c9',
        's-text': '#687684',
        's-text-d': '#9197ae',
        'p-hover': '#e7e7e7',
        'p-hover-d': '#1e1e1e',
        'p-bg': '#ffffff',
        'p-bg-d': '#1a1a1b',
        's-bg': '#e5e5e7',
        's-bg-d': '#2a2a2b',
        'p-border': '#e5e5e7',
        'p-border-d': '#343536',
        brand: '#007AFF'
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode': {
          'bg': '#1e1e1e',
          'fg': '#d4d4d4',
          'input': '#3c3c3c',
          'border': '#474747',
          'focus': '#007fd4',
        }
      }
    },
  },
  plugins: [],
} 
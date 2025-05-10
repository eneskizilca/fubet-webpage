/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#78123e',
        secondary: '#172c5c',
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  safelist: [
    {
      pattern: /text-\[#\d+\]/, // Hex renkleri koru
    },
  ],
  plugins: [],
} 
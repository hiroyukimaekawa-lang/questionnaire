/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#4a7a95',
        'brand-border': '#b0c4d0',
        'panel-bg': '#f5f5f5',
      },
      fontFamily: {
        noto: ['NotoSansJP'],
      },
    },
  },
  plugins: [],
};

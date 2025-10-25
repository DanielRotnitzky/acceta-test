/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#181C4F',
        secondary: '#095EAD',
        accent: '#FFC906',
        success: '#149E4B',
        'text-primary': '#0E112F',
        'text-secondary': '#464972',
        'text-muted': '#747795',
        border: '#D1D2DC',
        background: '#F8F8FA',
        'background-alt': '#E8E8ED',
        placeholder: '#A3A4B9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

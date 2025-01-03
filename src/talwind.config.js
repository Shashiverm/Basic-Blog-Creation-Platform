/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        scale: {
          '102': '1.02',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in',
          'slide-up': 'slideUp 0.5s ease-out',
        },
      },
    },
    plugins: [],
  };
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'blue-light': '#d0eaff', 
        'blue-dark': '#1e3a8a', 
        'gray-light': '#f7f7f7', 
        'gray-dark': '#333', 
        'teal-light': '#64b6b8', 
      },
      boxShadow: {
        'xl': '0 10px 15px rgba(0, 0, 0, 0.3)', 
        'glow': '0 0 20px rgba(0, 150, 255, 0.5)', 
        'soft': '0 4px 10px rgba(0, 0, 0, 0.15)', 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
      textShadow: {
        md: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
      });
    }),
  ],
};

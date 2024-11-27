const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan ini mencakup semua file React kamu
  ],
  theme: {
    extend: {
      colors: {
        'blue-light': '#d0eaff', // Warna tambahan untuk nuansa biru
        'blue-dark': '#1e3a8a', // Warna biru gelap yang lebih elegan
        'gray-light': '#f7f7f7', // Warna latar belakang lembut
        'gray-dark': '#333', // Warna teks lebih gelap untuk kontras
        'teal-light': '#64b6b8', // Warna teal lembut untuk elemen khusus
      },
      boxShadow: {
        'xl': '0 10px 15px rgba(0, 0, 0, 0.3)', // Bayangan lebih tebal
        'glow': '0 0 20px rgba(0, 150, 255, 0.5)', // Efek glow biru
        'soft': '0 4px 10px rgba(0, 0, 0, 0.15)', // Soft shadow
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Font Poppins untuk elegansi
      },
      textShadow: {
        md: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Bayangan teks
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

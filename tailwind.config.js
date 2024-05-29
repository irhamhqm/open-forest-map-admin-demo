/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'sidebar': '300px', // Ubah nilai sesuai kebutuhan Anda
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors:{
      'idms':'#ec7211',
      'midnight': '#121063',
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
} 
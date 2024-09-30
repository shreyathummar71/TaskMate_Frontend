/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#273343", // Your primary color
        secondary: "#F7D552", // Your secondary color
        tertiary: "#B7BABF", // Your tertiary color
      },
      fontFamily: {
        primary: ['"Inknut Antiqua"', "sans-serif"], // Your primary font
        secondary: ['"poppins"', "serif"], // Your secondary font
        tertiary: ['"Kumar One"', "cursive"],
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 1.5s ease-out',
      },
    },
  },
  plugins: [daisyui],
};

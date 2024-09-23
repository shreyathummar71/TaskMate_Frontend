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
        secondary: ['"Kalnia"', "serif"], // Your secondary font
      },
    },
  },
  plugins: [daisyui],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F49B33", 
        secondary: "#2B2B2B", 
        tertiary: "#5E5E5E", 

      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], 
  },
};

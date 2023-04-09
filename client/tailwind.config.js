/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        av: "850px",
      },
      colors: {
        footer: "#F2F2F2",
        overlay: "#00000038",
        fade: "#3131317d",
        gray: "#222222;",
        price: "#CD2026",
        link: "rgb(78, 73, 73)",
        red: "red",
        green: "green",
      },
      minWidth: {
        cart: "250px",
      },
      width: {
        300: "50rem",
      },
      height: {
        44: "44rem",
      },
    },
  },
  plugins: [],
};

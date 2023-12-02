/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "400px",
      sm: "600px",
      md: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1680px",
      "4xl": "2200px",
    },
    extend: {
      fontFamily: {
        poppins: "poppins",
        questrial: "Questrial",
      },
      colors: {
        // primary: "#0bab7c",
        primary: "#710280",
        // "primary-light": "#07ae7133",
        "primary-light": "#5C038C",
        // secondaryLightGreen: "#C7F4C2",
        secondaryLightGreen: "#967BB6",
        secondaryLightPurple: "#D7D0FF",
        secondaryLightYellow: "#FDDD8C",
        secondaryLightRed: "#FFBBD7",
        // secondaryGreen: "#0BAB7C",
        secondaryGreen: "#896FBC",
        secondaryRed: "#FC615C",
        "hover-btn-color": "#420264",
        "hover-btn-color2": "#C55FFC",
        "hover-color": "#2d2d39",
        "dark-light": "#393948",
        "purple-haze":"#EFDCF9",
        "main-white": "#ccc",
      },
      backgroundColor: {
        main: "#f5f5f9",
        "dark-main": "#13131A",
        "dark-card": "#1C1C24",
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('https://res.cloudinary.com/midefulness/image/upload/v1694111835/SkillGate/hero-bg.png')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-muted": {
          opacity: 0.8,
        },
        ".transition-a": {
          transition: "all 0.3s ease-in-out",
        },
        ".card-shadow": {
          boxShadow: " 0 0 0.375rem 0.25rem rgb(161 172 184 / 15%)",
        },
        ".shadow-light": {
          boxShadow: "0 0.3rem 0.6rem .2rem rgba(0, 0, 0, 0.1)",
        },
        ".border-light": {
          border: "1px solid rgba(46, 46, 46, 0.1)",
        },
        ".input-shadow": {
          boxShadow: "0 0 0 1000px #f5f5f9 inset !important",
        },
        ".input-dark-shadow": {
          boxShadow: "0 0 0 1000px #13131A inset !important",
        },
        ".inputAutofillColor": {
          "-webkit-text-fill-color": "#ccc",
        },
        ".flex-center-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-align-center": {
          display: "flex",
          alignItems: "center",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};

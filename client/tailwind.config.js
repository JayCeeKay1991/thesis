/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      tapeYellow: "#FED837",
      tapePink: "#FF93CD",
      tapeOrange: "#FC782E",
      tapeRed: "#F02930",
      tapeCream: "#F4E6E3",
      tapeBlack: "#151515",
      tapeOffBlack: "#1B1B1B",
      tapeWhite: "#FFFFFF",
      tapeGray: "#767676",
      tapeDarkGrey: "#909090",
      tapeDarkBlack: "#0C0C0C",
    },
    fontFamily: {
      sans: ["Archivo"],
    },
    extend: {
      gradient: {},
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

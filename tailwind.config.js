const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#18181b",
      white: "#fff",
      //primary colours
      primary: colors.cyan,
      success: colors.emerald,
      warning: colors.amber,
      danger: colors.rose,
      neutral: colors.zinc,
      //secondary colours
      red: colors.red,
      orange: colors.orange,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      teal: colors.teal,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
    },
    extend: {
      fontFamily: {
        display: ["'CircularStd'", "sans-serif"],
        body: ["'Barlow'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
  important: true,
};

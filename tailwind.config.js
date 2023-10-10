const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      //primary colours
      primary: colors.cyan,
      success: colors.emerald,
      warning: colors.amber,
      danger: colors.rose,
      neutral: colors.neutral,
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
    transitionDuration: {
      DEFAULT: "200ms", // to match ant design defaults
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.645, 0.045, 0.355, 1)", // to match ant design defaults
    },
    extend: {
      fontFamily: {
        display: ["'CircularStd'", "sans-serif"],
        body: ["'Barlow'", "sans-serif"],
        shop: [
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
        ],
      },
      colors: {
        title: colors.zinc["900"],
        body: colors.zinc["800"],
        subtitle: colors.zinc["500"],
        "subtitle-light": colors.zinc["400"],
        icon: colors.zinc["400"],
        placeholder: colors.zinc["400"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
  important: true,
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: false,
  },
};

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      //brand colours
      "brand-primary": "#29B8CC",
      "brand-secondary": "#ff8636",
      "brand-gray": "#4d4d4d",
      //primary colours
      primary: {
        50: "#effbfc",
        100: "#d6f5f7",
        200: "#b2eaef",
        300: "#7dd9e3",
        400: "#40c0d0",
        500: "#29b8cc",
        600: "#1f91a8",
        700: "#216b7d",
        800: "#235967",
        900: "#214a58",
        950: "#11303b",
      },
      success: colors.emerald,
      warning: colors.amber,
      danger: colors.rose,
      info: colors.sky,
      neutral: colors.slate,
      //secondary colours
      red: colors.red,
      orange: colors.orange,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      teal: colors.teal,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      //only for calendar colours
      emerald: colors.emerald,
      amber: colors.amber,
      rose: colors.rose,
      sky: colors.sky,
      slate: colors.slate,
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
        title: colors.slate["900"],
        body: colors.slate["800"],
        subtitle: colors.slate["500"],
        "subtitle-light": colors.slate["400"],
        icon: colors.slate["400"],
        placeholder: colors.slate["400"],
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

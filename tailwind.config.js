const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    colors: {
      transparent: "var(--color-transparent)",
      current: "var(--color-current)",
      black: ({ opacityValue }) =>
        `rgba(var(--color-black), ${opacityValue ?? 1})`,
      white: ({ opacityValue }) =>
        `rgba(var(--color-white), ${opacityValue ?? 1})`,
      //brand colours
      "brand-primary": ({ opacityValue }) =>
        `rgba(var(--color-brand-primary), ${opacityValue ?? 1})`,
      "brand-secondary": ({ opacityValue }) =>
        `rgba(var(--color-brand-secondary), ${opacityValue ?? 1})`,
      "brand-gray": ({ opacityValue }) =>
        `rgba(var(--color-brand-gray), ${opacityValue ?? 1})`,
      //primary colours
      primary: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-primary-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-primary-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-primary-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-primary-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-primary-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-primary-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-primary-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-primary-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-primary-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-primary-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-primary-950), ${opacityValue ?? 1})`,
      },
      success: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-emerald-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-emerald-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-emerald-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-emerald-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-emerald-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-emerald-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-emerald-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-emerald-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-emerald-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-emerald-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-emerald-950), ${opacityValue ?? 1})`,
      },
      warning: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-amber-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-amber-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-amber-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-amber-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-amber-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-amber-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-amber-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-amber-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-amber-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-amber-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-amber-950), ${opacityValue ?? 1})`,
      },
      danger: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-rose-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-rose-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-rose-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-rose-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-rose-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-rose-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-rose-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-rose-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-rose-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-rose-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-rose-950), ${opacityValue ?? 1})`,
      },
      info: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-sky-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-sky-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-sky-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-sky-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-sky-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-sky-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-sky-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-sky-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-sky-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-sky-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-sky-950), ${opacityValue ?? 1})`,
      },
      neutral: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-neutral-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-neutral-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-neutral-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-neutral-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-neutral-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-neutral-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-neutral-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-neutral-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-neutral-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-neutral-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-neutral-950), ${opacityValue ?? 1})`,
      },
      //secondary colours
      red: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-red-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-red-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-red-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-red-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-red-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-red-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-red-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-red-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-red-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-red-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-red-950), ${opacityValue ?? 1})`,
      },
      orange: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-orange-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-orange-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-orange-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-orange-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-orange-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-orange-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-orange-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-orange-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-orange-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-orange-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-orange-950), ${opacityValue ?? 1})`,
      },
      yellow: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-yellow-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-yellow-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-yellow-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-yellow-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-yellow-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-yellow-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-yellow-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-yellow-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-yellow-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-yellow-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-yellow-950), ${opacityValue ?? 1})`,
      },
      lime: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-lime-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-lime-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-lime-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-lime-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-lime-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-lime-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-lime-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-lime-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-lime-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-lime-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-lime-950), ${opacityValue ?? 1})`,
      },
      green: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-green-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-green-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-green-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-green-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-green-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-green-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-green-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-green-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-green-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-green-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-green-950), ${opacityValue ?? 1})`,
      },
      teal: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-teal-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-teal-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-teal-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-teal-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-teal-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-teal-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-teal-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-teal-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-teal-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-teal-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-teal-950), ${opacityValue ?? 1})`,
      },
      blue: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-blue-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-blue-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-blue-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-blue-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-blue-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-blue-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-blue-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-blue-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-blue-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-blue-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-blue-950), ${opacityValue ?? 1})`,
      },
      indigo: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-indigo-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-indigo-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-indigo-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-indigo-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-indigo-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-indigo-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-indigo-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-indigo-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-indigo-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-indigo-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-indigo-950), ${opacityValue ?? 1})`,
      },
      violet: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-violet-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-violet-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-violet-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-violet-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-violet-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-violet-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-violet-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-violet-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-violet-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-violet-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-violet-950), ${opacityValue ?? 1})`,
      },
      purple: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-purple-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-purple-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-purple-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-purple-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-purple-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-purple-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-purple-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-purple-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-purple-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-purple-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-purple-950), ${opacityValue ?? 1})`,
      },
      fuchsia: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-fuchsia-950), ${opacityValue ?? 1})`,
      },
      pink: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-pink-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-pink-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-pink-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-pink-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-pink-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-pink-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-pink-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-pink-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-pink-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-pink-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-pink-950), ${opacityValue ?? 1})`,
      },
      stone: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-stone-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-stone-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-stone-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-stone-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-stone-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-stone-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-stone-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-stone-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-stone-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-stone-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-stone-950), ${opacityValue ?? 1})`,
      },
      // for calendar colours
      cyan: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-cyan-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-cyan-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-cyan-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-cyan-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-cyan-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-cyan-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-cyan-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-cyan-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-cyan-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-cyan-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-cyan-950), ${opacityValue ?? 1})`,
      },
      emerald: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-emerald-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-emerald-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-emerald-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-emerald-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-emerald-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-emerald-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-emerald-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-emerald-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-emerald-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-emerald-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-emerald-950), ${opacityValue ?? 1})`,
      },
      amber: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-amber-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-amber-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-amber-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-amber-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-amber-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-amber-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-amber-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-amber-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-amber-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-amber-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-amber-950), ${opacityValue ?? 1})`,
      },
      rose: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-rose-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-rose-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-rose-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-rose-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-rose-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-rose-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-rose-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-rose-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-rose-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-rose-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-rose-950), ${opacityValue ?? 1})`,
      },
      sky: {
        50: ({ opacityValue }) =>
          `rgba(var(--color-sky-50), ${opacityValue ?? 1})`,
        100: ({ opacityValue }) =>
          `rgba(var(--color-sky-100), ${opacityValue ?? 1})`,
        200: ({ opacityValue }) =>
          `rgba(var(--color-sky-200), ${opacityValue ?? 1})`,
        300: ({ opacityValue }) =>
          `rgba(var(--color-sky-300), ${opacityValue ?? 1})`,
        400: ({ opacityValue }) =>
          `rgba(var(--color-sky-400), ${opacityValue ?? 1})`,
        500: ({ opacityValue }) =>
          `rgba(var(--color-sky-500), ${opacityValue ?? 1})`,
        600: ({ opacityValue }) =>
          `rgba(var(--color-sky-600), ${opacityValue ?? 1})`,
        700: ({ opacityValue }) =>
          `rgba(var(--color-sky-700), ${opacityValue ?? 1})`,
        800: ({ opacityValue }) =>
          `rgba(var(--color-sky-800), ${opacityValue ?? 1})`,
        900: ({ opacityValue }) =>
          `rgba(var(--color-sky-900), ${opacityValue ?? 1})`,
        950: ({ opacityValue }) =>
          `rgba(var(--color-sky-950), ${opacityValue ?? 1})`,
      },
    },
    transitionDuration: {
      DEFAULT: "200ms", // to match ant design defaults
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.645, 0.045, 0.355, 1)", // to match ant design defaults
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-in-long": {
          "0%, 25%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 350ms linear 1 forwards",
        "fade-in-long": "fade-in-long 700ms linear 1 forwards",
      },
      fontFamily: {
        display: ["'CircularStd'", "sans-serif"],
        body: ["'Barlow'", "sans-serif"],
        shop: [
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
        ],
      },
      colors: {
        title: colors.slate["950"],
        body: colors.slate["800"],
        subtitle: colors.slate["500"],
        "subtitle-light": colors.slate["400"],
        icon: colors.slate["400"],
        placeholder: colors.slate["400"],
      },
      zIndex: {
        max: 2147483647,
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

const options = require("./config"); //options from config.js

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customPurple1: 'rgb(159, 30, 251)',
        customPurple2: 'rgb(122, 23, 191)',
        'blue': 'rgb(34, 136, 254)',
        'pot-black': 'rgb(23, 22, 22)',
        'block-bg-20': 'rgba(255, 255, 255, 0.24)',
      }
    },
    fontFamily: {
      'sans': ['"Poppins"', 'sans-serif'],
      'display': ['Poppins'],
      'body': ['"Poppins"']
    }
  },
  plugins: plugins,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/public/img/hero.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      'discordbg': '#18191C',
      'discordbtn': '#4F545C',
      'discordtext': '#A7A9AD'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
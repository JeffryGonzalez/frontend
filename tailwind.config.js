module.exports = {
  purge: {
    enabled: true,
    content: [
        './apps/admin/**/*.{html,ts}',
        './libs/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': { propList: ['*'], rootValue: 16, minPixelValue: 50 },
  },
};

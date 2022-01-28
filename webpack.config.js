//Webpack requires this to work with directories
const path =  require('path');

// This is main configuration object that tells Webpackw what to do.
module.exports = {
  //path to entry paint
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'index.js',
    libraryTarget: 'umd',
  },

  //default mode is production
}

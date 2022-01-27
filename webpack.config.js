//Webpack requires this to work with directories
const path =  require('path');

// This is main configuration object that tells Webpackw what to do.
module.exports = {
  //path to entry paint
  entry: './src/index.js',
  //path and filename of the final output
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'index.js',
    library: {
      name: 'colorGenerator',
      type: 'umd',
    },
  },

  //default mode is production
}

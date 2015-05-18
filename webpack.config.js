var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src', 'js'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'collapsr'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.scss/, loader: 'style!css!sass', exclude: /node_modules/},
      {test: /\.handlebars$/, loader: 'handlebars', exclude: /node_modules/},
    ]
  }
};

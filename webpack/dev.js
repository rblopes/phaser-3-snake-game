/*
 * `dev.js`
 * ========
 *
 * Development environment settings for Webpack.
 */

'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  context: paths.context,
  entry: {
    vendor: ['phaser'],
    app: './scripts/index.js'
  },

  output: {
    filename: '[name]-[chunkhash].bundle.js',
    path: paths.dist
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules|vendor/
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: paths.public,
    compress: true,
    port: 3000
  }
};

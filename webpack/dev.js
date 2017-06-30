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
  entry: './scripts/index.js',

  output: {
    filename: 'app.js',
    path: paths.dist
  },

  module: {
    rules: [{
      test: paths.libs.p2,
      loader: 'expose-loader?p2'
    }, {
      test: paths.libs.PIXI,
      loader: 'expose-loader?PIXI'
    }, {
      test: paths.libs.Phaser,
      loader: 'expose-loader?Phaser'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    })
  ],

  resolve: {
    alias: paths.libs
  },

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: paths.public,
    compress: true,
    port: 3000
  }
};

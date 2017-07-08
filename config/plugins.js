/*
 * `plugins` module
 * ================
 *
 * General Webpack plugin configuration.
 */

'use strict';

const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const Dashboard = require('webpack-dashboard/plugin');
const HTML = require('html-webpack-plugin');
const babel = require('./babel');
const paths = require('./paths');
// const uglify = require('./uglify');

module.exports = isProduction => {
  const plugins = [
    new Clean([paths.dist], paths.root),
    new Copy([{context: paths.public, from: '**/*.*'}]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HTML({
      title: 'Phaser 3 Demo Project',
      template: './index.html'
    }),
    new webpack.LoaderOptionsPlugin({options: {babel}})
  ];

  if (isProduction) {
    // babel.presets.push('babili');

    // plugins.push(new webpack.optimize.UglifyJsPlugin(uglify));
  }
  else {
    plugins.push(new Dashboard());
  }

  return plugins;
};

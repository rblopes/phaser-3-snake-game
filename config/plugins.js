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
const UglifyJS = require('uglifyjs-webpack-plugin');
const HTML = require('html-webpack-plugin');
const babel = require('./babel');
const paths = require('./paths');
const uglify = require('./uglify');

module.exports = isProduction => {
  const plugins = [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: true,
      WEBGL_RENDERER: true
    }),
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
    plugins.push(
      new Clean([paths.dist], paths.root),
      new Copy([{context: paths.public, from: '**/*.*'}]),
      new UglifyJS(uglify)
    );
  }

  return plugins;
};

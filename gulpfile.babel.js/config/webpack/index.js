/*
 * Webpack configuration.
 */

import {src, dest} from '../paths';
import babelConfig from '../babel';
import plugins from './plugins';

export default (env = 'development') => ({
  context: src,

  entry: {
    vendor: ['phaser'],
    app: ['./scripts/']
  },

  output: {
    filename:
      env === 'production'
        ? '[name]-[chunkhash].bundle.js'
        : '[name].bundle.js',
    path: dest
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: src,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      }
    ]
  },

  plugins: plugins(env),

  devtool: env === 'development' ? 'eval-source-map' : 'source-map'
});

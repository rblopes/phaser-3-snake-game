/*
 * Webpack configuration.
 */

import {src, dest} from '../paths';
import plugins from './plugins';

export default (env = 'development') => ({
  context: src,

  entry: {
    vendor: ['phaser'],
    app: ['./scripts/']
  },

  output: {
    filename: '[name]-[chunkhash].bundle.js',
    path: dest
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: src,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: 'last 2 versions'
                  },
                  useBuiltIns: 'usage'
                }
              ]
            ]
          }
        }
      }
    ]
  },

  plugins: plugins(env),

  devtool: env === 'development' ? 'eval-source-map' : 'source-map'
});

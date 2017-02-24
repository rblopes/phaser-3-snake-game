/*
 * Webpack plugins.
 */

import webpack from 'webpack';
import UglifyJS from 'uglifyjs-webpack-plugin';
import HTML from 'html-webpack-plugin';
import uglifyOptions from './uglify';

export default (env = 'development') =>
  [
    //  Required by Phaser: Enable Canvas and WebGL renderers.
    new webpack.DefinePlugin({
      CANVAS_RENDERER: true,
      WEBGL_RENDERER: true
    }),

    //  Split the compiled JavaScript bundle.
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    //  Enable Hot Module Replacement during development.
    env === 'development' && new webpack.HotModuleReplacementPlugin(),

    //  Needed for HMR error handling.
    env === 'development' && new webpack.NamedModulesPlugin(),

    //  Process the HTML template.
    new HTML({
      title: 'Phaser 3 Demo Project',
      template: './index.html'
    }),

    //  Minify bundled JavaScript for distribution.
    env === 'production' && new UglifyJS(uglifyOptions)
  ].filter(Boolean);

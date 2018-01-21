/*
 * Webpack middlewares for Browsersync.
 */

import devMiddleware from 'webpack-dev-middleware';

export default function(compiler) {
  return [
    devMiddleware(compiler, {
      quiet: true,
      stats: {
        colors: true,
        modules: false
      }
    })
  ];
}

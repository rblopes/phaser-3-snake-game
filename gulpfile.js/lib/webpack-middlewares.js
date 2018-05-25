/*
 *  Webpack Middlewares
 *  ===================
 *
 *  Configures Webpack Middlewares for use with Browsersync.
 */

import devMiddleware from 'webpack-dev-middleware';

export default compiler => [
  devMiddleware(compiler, {
    quiet: true,
    stats: {
      colors: true,
      modules: false
    }
  })
];

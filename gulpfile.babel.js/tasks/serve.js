/*
 * `server` task
 * =============
 *
 * Creates a Browsersync Web server instance for live development. Makes use of
 * some Webpack middlewares to enable live reloading features.
 */

import browsersync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/browsersync';
import webpack from '../lib/webpack';

const server = browsersync.create();

const serve = () => {
  const compiler = webpack('development');

  config.middleware = [
    webpackDevMiddleware(compiler, {
      quiet: true,
      stats: {
        colors: true,
        modules: false
      }
    }),
    webpackHotMiddleware(compiler, {
      log: () => {}
    })
  ];

  server.init(config);
};
serve.description = `Create a Browsersync instance for live development.`;

export default serve;

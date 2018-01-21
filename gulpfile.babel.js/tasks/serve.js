/*
 * `server` task
 * =============
 *
 * Creates a Browsersync Web server instance for live development. Makes use of
 * some Webpack middlewares to enable live reloading features.
 */

import config from '../config/browsersync';
import server from '../lib/server';
import webpack from '../lib/webpack';
import webpackMiddlewares from '../lib/webpack-middlewares';

const serve = () => {
  const compiler = webpack('development');

  config.middleware.push(...webpackMiddlewares(compiler));

  server.init(config);
};
serve.description = `Create a Browsersync instance for live development.`;

export default serve;

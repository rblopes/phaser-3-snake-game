/*
 * `compile` task
 * ==============
 *
 * Compile scripts in production mode using Webpack.
 */

import logger from 'gulplog';
import PluginError from 'plugin-error';
import webpack from '../lib/webpack';

const compile = done => {
  return webpack('production').run((err, stats) => {
    if (err) {
      throw new PluginError('webpack', err);
    }
    logger.info(
      `[webpack]\n${stats.toString({
        colors: true,
        modules: false
      })}`
    );
    done();
  });
};
compile.description = `Compile scripts in production mode using Webpack.`;

export default compile;

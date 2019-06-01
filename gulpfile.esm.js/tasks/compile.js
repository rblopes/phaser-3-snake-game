/*
 *  `compile` task
 *  ==============
 *
 *  Compile scripts in production mode using Webpack.
 */

import log from 'fancy-log';
import PluginError from 'plugin-error';
import webpack from '../lib/webpack';

export const compile = done => {
  return webpack('production').run((err, stats) => {
    if (err) {
      throw new PluginError('webpack', err);
    }

    log.info(
      `[webpack]\n${stats.toString({
        colors: true,
        modules: false
      })}`
    );
    done();
  });
};

compile.description = `Compile scripts in production mode using Webpack.`;

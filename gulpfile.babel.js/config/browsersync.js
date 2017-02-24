/*
 * Basic settings for Browsersync Web server.
 */

import {dirs} from './paths';

export default {
  ui: false,
  notify: false,
  ghostMode: false,
  server: {
    baseDir: [dirs.static]
  },
  watchOptions: {
    ignoreInitial: true
  },
  files: [`${dirs.static}/**`]
};

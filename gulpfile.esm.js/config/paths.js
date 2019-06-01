/*
 *  `paths` module
 *  ==============
 *
 *  Describes the project working tree for its consumer modules.
 */

import {resolve} from 'path';

//  Exports the root directory path, hosting the project contents.
export const root = process.cwd();

//  Where application resources are kept.
export const src = resolve(root, 'app/');

//  The destination diretory of production builds.
export const dest = resolve(root, 'dist/');

//  Paths to specific directories.
export const dirs = {
  //  From where static assets should be served during development and copied
  //  from in distribution builds.
  static: resolve(src, 'static/'),

  //  Where application modules that require compilation are kept.
  scripts: resolve(src, 'scripts/')
};

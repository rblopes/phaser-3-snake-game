/*
 * Describes the project working tree.
 */

import path from 'path';

export const root = process.cwd();
export const src = path.resolve(root, 'app/');
export const dest = path.resolve(root, 'dist/');

export const dirs = {
  static: path.resolve(root, 'app/static/')
};

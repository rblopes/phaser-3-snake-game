/*
 * `dist` task
 * ===========
 *
 * Bundle the application contents for distribution.
 */

import gulp from 'gulp';
import clean from './clean';
import compile from './compile';
import copyAssets from './copy-assets';

const dist = gulp.series(clean, gulp.parallel(copyAssets, compile));
dist.description = `Bundle the application contents for distribution.`;

export default dist;

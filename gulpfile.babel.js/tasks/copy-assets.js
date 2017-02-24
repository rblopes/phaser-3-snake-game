/*
 * `copy-assets` task
 * ==================
 *
 * Copy static application assets for distribution.
 */

import gulp from 'gulp';
import {dest, dirs} from '../config/paths';

const copyAssets = () => gulp.src(`${dirs.static}/**`).pipe(gulp.dest(dest));
copyAssets.description = `Copy static assets from ${dirs.static}`;

export default copyAssets;

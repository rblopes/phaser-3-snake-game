/*
 * `clean` task
 * ============
 *
 * Uses `del` to dispose the contents found in the `dest` directory before
 * creating a fresh distribution build.
 */

import del from 'del';
import {dest} from '../config/paths';

const clean = () => del([dest]);
clean.description = `Dispose of contents from '${dest}' directory.`;

export default clean;

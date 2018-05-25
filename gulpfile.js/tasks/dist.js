/*
 *  `dist` task
 *  ===========
 *
 *  Bundle the application contents for distribution.
 */

import {series} from 'gulp';
import {clean} from './clean';
import {compile} from './compile';

export const dist = series(clean, compile);
dist.description = `Bundle application contents for distribution.`;

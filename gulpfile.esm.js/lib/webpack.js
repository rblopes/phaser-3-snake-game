/*
 *  Creates a configured Webpack instance.
 */

import webpack from 'webpack';
import config from '../config/webpack';

export default (env = 'development') => webpack(config(env));

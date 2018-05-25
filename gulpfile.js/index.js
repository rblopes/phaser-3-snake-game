/*
 *  `esm` entry point
 *  =================
 *
 *  Transitional entry point for native modules (a.k.a. ECMAScript 2015
 *  modules) support.
 */

const esm = require('esm')(module, {mode: 'all'});
module.exports = esm('./main');

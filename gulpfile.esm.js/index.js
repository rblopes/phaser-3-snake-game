/*
 *  `gulpfile.js` index module
 *  ==========================
 *
 *  Rather than managing one big file containing multiple Gulp tasks and
 *  helper functions, the whole collection has been split and organized under
 *  the `tasks/` directory. User tasks are exposed below.
 */

//  Expose user tasks and make `serve` the default task.
export {clean} from './tasks/clean';
export {compile} from './tasks/compile';
export {dist} from './tasks/dist';
export {serve as default} from './tasks/serve';

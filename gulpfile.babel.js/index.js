import clean from './tasks/clean';
import compile from './tasks/compile';
import copyAssets from './tasks/copy-assets';
import dist from './tasks/dist';
import serve from './tasks/serve';

export {clean, compile, copyAssets, dist, serve as default};

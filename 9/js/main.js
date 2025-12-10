import { getPosts } from './data.js';
import { renderPictures } from './miniatures.js';
import { initBigPicture } from './big-picture.js';

const posts = getPosts();
renderPictures(posts);
initBigPicture(posts);

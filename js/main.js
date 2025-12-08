import { getPosts } from './data.js';
import { renderPictures } from './miniatures.js';

const posts = getPosts();
renderPictures(posts);

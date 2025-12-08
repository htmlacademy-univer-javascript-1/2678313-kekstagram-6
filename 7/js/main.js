import { getPosts } from './data.js';
import { renderPictures } from './miniatures.js';

const Posts = getPosts();
renderPictures(Posts);

import { getPosts } from './data.js';
import { renderPictures } from './miniatures.js';
import { initBigPicture } from './big-picture.js';
import { initImageForm } from './form.js';

const posts = getPosts();
renderPictures(posts);
initBigPicture(posts);
initImageForm();

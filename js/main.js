import { renderPictures } from './miniatures.js';
import { initBigPicture } from './big-picture.js';
import { initImageForm } from './form.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './util.js';

getData()
  .then((posts) => {
    renderPictures(posts);
    initBigPicture(posts);
  })
  .catch((err) => {
    showLoadErrorMessage(err.message);
  });

initImageForm();

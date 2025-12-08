function initBigPicture(posts) {
  const picturesContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigImg = bigPicture.querySelector('img');
  const likesCountEl = bigPicture.querySelector('.likes-count');
  const commentsCountEl = bigPicture.querySelector('.comments-count');
  const socialCommentsEl = bigPicture.querySelector('.social__comments');
  const socialCaptionEl = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const closeSelectors = bigPicture.querySelector('.big-picture__cancel');


  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }

  function onCloseClick(evt) {
    evt.preventDefault();
    closeModal();
  }

  const openModal = (post) => {
    bigImg.src = post.url;
    bigImg.alt = post.description;

    likesCountEl.textContent = String(post.likes);
    commentsCountEl.textContent = String(post.comments.length);
    socialCaptionEl.textContent = post.description;

    const fragment = document.createDocumentFragment();
    (post.comments).forEach((c) => {
      const li = document.createElement('li');
      li.className = 'social__comment';

      const img = document.createElement('img');
      img.className = 'social__picture';
      img.src = c.avatar;
      img.alt = c.name;
      img.width = 35;
      img.height = 35;

      const p = document.createElement('p');
      p.className = 'social__text';
      p.textContent = c.message;

      li.appendChild(img);
      li.appendChild(p);
      fragment.appendChild(li);
    });
    socialCommentsEl.appendChild(fragment);

    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    closeSelectors.addEventListener('click', onCloseClick);
  };

  function closeModal(){
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentKeydown);
    closeSelectors.removeEventListener('click', onCloseClick);

    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  picturesContainer.addEventListener('click', (evt) => {
    const pictureCurrent = evt.target.closest('.picture');
    const postId = Number(pictureCurrent.dataset.postId);
    const post = posts.find((p) => p.id === postId);
    evt.preventDefault();
    openModal(post);
  });
}

export {initBigPicture};
